import { camelCase, capitalize, flatten, isNil } from 'lodash';

import { Diagnostic } from '@codemirror/lint';

import { BibtexEntryConfig } from '../providers/ConfigProvider';
import { BibtexEntryType, BibtexFieldType } from './bibtex-definitions';
import * as BibtexEntries from './bibtex-entries';
import * as BibtexFields from './bibtex-fields';

export class RootNode {
  type = 'root' as const;
  constructor(public init: number, public children: (TextNode | BlockNode)[] = []) {}
}

export class TextNode {
  type = 'text' as const;
  constructor(public init: number, public parent: RootNode, public text: string) {
    parent.children.push(this);
  }
}
export class BlockNode {
  type = 'block' as const;
  public command: string = '';
  public block?: CommentNode | PreambleNode | StringNode | EntryNode;
  constructor(public init: number, public parent: RootNode) {
    parent.children.push(this);
  }
}
export class CommentNode {
  type = 'comment' as const;
  constructor(
    public init: number,
    public parent: BlockNode,
    public raw: string,
    public braces: number,
    public parens: number
  ) {
    parent.block = this;
  }
}
export class PreambleNode {
  type = 'preamble' as const;
  constructor(
    public init: number,
    public parent: BlockNode,
    public raw: string,
    public braces: number,
    public parens: number
  ) {
    parent.block = this;
  }
}
class StringNode {
  type = 'string' as const;
  constructor(
    public init: number,
    public parent: BlockNode,
    public raw: string,
    public braces: number,
    public parens: number
  ) {
    parent.block = this;
  }
}
export class EntryNode {
  type = 'entry' as const;
  key?: string;
  fields: FieldNode[];
  constructor(public init: number, public parent: BlockNode) {
    parent.block = this;
    this.fields = [];
  }
}
export class FieldNode {
  type = 'field' as const;
  /** Each value is concatenated */
  value: ConcatNode;
  constructor(public init: number, public parent: EntryNode, public name: string = '') {
    this.value = new ConcatNode(init, this);
  }
}
class ConcatNode {
  type = 'concat' as const;
  concat: (LiteralNode | BracedNode | QuotedNode)[];
  canConsumeValue: boolean = true;
  constructor(public init: number, public parent: FieldNode) {
    this.concat = [];
  }

  toString() {
    return this.concat
      .map((cn) => cn.value)
      .join('')
      .trim();
  }
}
class LiteralNode {
  type = 'literal' as const;
  constructor(public init: number, public parent: ConcatNode, public value: string) {
    parent.concat.push(this);
  }
}
class BracedNode {
  type = 'braced' as const;
  value: string = '';
  /** Used to count opening and closing braces */
  depth: number = 0;
  constructor(public init: number, public parent: ConcatNode) {
    parent.concat.push(this);
  }
}
class QuotedNode {
  type = 'quoted' as const;
  value: string = '';
  /** Used to count opening and closing braces */
  depth: number = 0;
  constructor(public init: number, public parent: ConcatNode) {
    parent.concat.push(this);
  }
}

export type Node =
  | RootNode
  | TextNode
  | BlockNode
  | EntryNode
  | CommentNode
  | PreambleNode
  | StringNode
  | FieldNode
  | ConcatNode
  | LiteralNode
  | BracedNode
  | QuotedNode;

export function generateAST(
  input: string,
  config?: BibtexEntryConfig[]
): [RootNode] | [RootNode, Diagnostic[]] {
  const diagnostic = Array<Diagnostic>();
  const keys = new Set<string>();
  const rootNode = new RootNode(0);
  let node: Node = rootNode;
  let line = 1;
  let column = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const prev = input[i - 1];

    if (char === '\n') {
      line++;
      column = 0;
    }
    column++;

    switch (node.type) {
      case 'root': {
        node = char === '@' ? new BlockNode(i, node) : new TextNode(i, node, char);
        break;
      }

      case 'text': {
        // Whitespace or closing curly brace should precede an entry. This might
        // not be correct but allows parsing of "valid" bibtex files in the
        // wild.
        if (char === '@' && /[\s\r\n}]/.test(prev)) {
          node = new BlockNode(i, node.parent);
        } else {
          node.text += char;
        }
        break;
      }

      case 'block': {
        if (char === '@') {
          // everything prior to this was a comment
          const prevNode = node.parent.children[node.parent.children.length - 2];
          if (prevNode?.type === 'text') {
            prevNode.text += '@' + node.command;
          } else {
            // insert text node 1 from the end
            node.parent.children.pop();
            new TextNode(i, node.parent, '@' + node.command);
            node.parent.children.push(node);
          }
          node.command = '';
        } else if (char === '{' || char === '(') {
          const commandTrimmed = node.command.trim();
          if (commandTrimmed === '' || /\s/.test(commandTrimmed)) {
            // A block without a command is invalid. It's sometimes used in comments though, e.g. @(#)
            // replace the block node
            node.parent.children.pop();
            node = new TextNode(i, node.parent, '@' + node.command + char);
          } else {
            node.command = commandTrimmed;
            const command: string = node.command.toLowerCase();

            const [braces, parens] = char === '{' ? [1, 0] : [0, 1];
            const raw = '@' + command + char;
            switch (command) {
              case 'string':
                node = new StringNode(i, node, raw, braces, parens);
                break;
              case 'preamble':
                node = new PreambleNode(i, node, raw, braces, parens);
                break;
              case 'comment':
                node = new CommentNode(i, node, raw, braces, parens);
                break;
              default:
                node = new EntryNode(i + 1, node);
                break;
            }
          }
        } else if (char.match(/[=#,})\[\]]/)) {
          // replace the block node
          node.parent.children.pop();
          node = new TextNode(i, node.parent, '@' + node.command + char);
        } else {
          node.command += char;
        }
        break;
      }

      case 'comment':
      case 'string':
      case 'preamble':
        if (char === '{') {
          node.braces++;
        } else if (char === '}') {
          node.braces--;
        } else if (char === '(') {
          node.parens++;
        } else if (char === ')') {
          node.parens--;
        }
        node.raw += char;
        if (node.braces === 0 && node.parens === 0) {
          node = node.parent.parent; // root
        }
        break;

      case 'entry': {
        if (char === '}' || char === ')') {
          node = node.parent.parent; // root
        } else if (char === ',') {
          node = new FieldNode(i + 1, node);
        } else if (char === '=') {
          // no key, this is a field name
          if (!node.key) {
            throw new BibTeXSyntaxError(input, node, i, line, column);
          }
          const field: FieldNode = new FieldNode(i + 1, node, node.key);
          node.fields.push(field);
          node.key = undefined;
          node = field.value;
        } else if (isWhitespace(char)) {
          //TODO
        } else if (char.match(/[=#,{}()\[\]]/)) {
          throw new BibTeXSyntaxError(input, node, i, line, column);
        } else {
          node.key = (node.key ?? '') + char;
        }
        break;
      }

      case 'field': {
        const data = config?.find(
          (ec) => ec.entry === (node as FieldNode).parent.parent.command.trim().toLocaleLowerCase()
        );

        if (char === '}' || char === ')') {
          node.name = node.name.trim();
          node = node.parent.parent.parent; // root
        } else if (char === '=') {
          node.name = node.name.trim();
          node = node.value;
        } else if (char === ',') {
          node.name = node.name.trim();
          node = new FieldNode(i + 1, node.parent);
        } else if (/[=,{}()\[\]]/.test(char)) {
          throw new BibTeXSyntaxError(input, node, i, line, column);
        } else if (!node.name) {
          if (!isWhitespace(char)) {
            node.parent.fields.push(node);
            node.name = char;
          } else {
            node.init += 1;
          }
        } else {
          node.name += char;
        }
        break;
      }

      case 'concat': {
        if (isWhitespace(char)) {
          break; // noop
        } else if (node.canConsumeValue) {
          if (/[#=,}()\[\]]/.test(char)) {
            throw new BibTeXSyntaxError(input, node, i, line, column);
          } else {
            node.canConsumeValue = false;
            if (char === '{') {
              node = new BracedNode(i, node);
            } else if (char === '"') {
              node = new QuotedNode(i, node);
            } else {
              node = new LiteralNode(i, node, char);
            }
          }
        } else {
          if (char === ',') {
            node = new FieldNode(i + 1, node.parent.parent);
          } else if (char === '}' || char === ')') {
            const data = config.find(
              (ec) =>
                ec.entry ===
                (node as ConcatNode).parent.parent.parent.command.trim().toLocaleLowerCase()
            );

            if (data) {
              const entryFields = node.parent.parent.fields.map((f) => f.name.trim().toLowerCase());
              const from = node.parent.parent.parent.init;
              const to = from + node.parent.parent.parent.command.length + 1;

              data.requiredFields.forEach((field) => {
                if (
                  entryFields.filter((ef) =>
                    typeof field === 'string' ? ef === field : field.includes(ef as BibtexFieldType)
                  ).length > 0
                )
                  return;

                diagnostic.push({
                  from,
                  to,
                  message: `Missing required field ${(typeof field === 'string' ? [field] : field)
                    .map((f) => `"${f}"`)
                    .join(' or ')}`,
                  severity: 'error',
                });
              });
            }

            node = node.parent.parent.parent.parent; // root
          } else if (char === '#') {
            node.canConsumeValue = true;
          } else {
            throw new BibTeXSyntaxError(input, node, i, line, column);
          }
        }
        break;
      }

      case 'literal':
        if (isWhitespace(char)) {
          // end of literal
          node = node.parent;
        } else if (char === ',') {
          node = new FieldNode(i + 1, node.parent.parent.parent);
        } else if (char === '}') {
          node = node.parent.parent.parent.parent.parent; // root
        } else if (char === '#') {
          node = node.parent;
          node.canConsumeValue = true;
        } else {
          node.value += char;
        }
        break;

      // Values may be enclosed in curly braces. Curly braces may be used within
      // the value but they must be balanced.
      case 'braced':
        if (char === '}' && node.depth === 0) {
          node = node.parent; // values
          break;
        } else if (char === '{') {
          node.depth++;
        } else if (char === '}') {
          node.depth--;
        }
        node.value += char;
        break;

      // Values may be enclosed in double quotes. Curly braces may be used
      // within quoted values but they must be balanced.
      //
      // To escape a double quote, surround it with braces `{"}`.
      // https://web.archive.org/web/20210422110817/https://maverick.inria.fr/~Xavier.Decoret/resources/xdkbibtex/bibtex_summary.html
      case 'quoted':
        if (char === '"' && node.depth === 0) {
          node = node.parent; // values
          break;
        } else if (char === '{') {
          node.depth++;
        } else if (char === '}') {
          node.depth--;
          if (node.depth < 0) {
            throw new BibTeXSyntaxError(input, node, i, line, column);
          }
        }
        node.value += char;
        break;
    }
  }

  (function validate(node: Node): void {
    if (node instanceof RootNode) return node.children.forEach(validate);
    else if (node instanceof BlockNode) {
      const pos = { from: node.init, to: node.init + node.command.trim().length + 1 };

      if (
        !Object.values(BibtexEntries)
          .map((be) => be.name)
          .includes(node.command.trim().toLowerCase() as BibtexEntryType)
      ) {
        diagnostic.push({
          ...pos,
          message: `Unknown bibtex entry "${node.command.trim()}"`,
          severity: 'error',
        });
      } else if (node.command.trim() !== node.command.trim().toLowerCase()) {
        diagnostic.push({
          ...pos,
          message: 'Bibtex entries should be lower case letters',
          severity: 'warning',
        });
      }

      return validate(node.block);
    } else if (node instanceof EntryNode) {
      if ((node.key || '').trim() === '') {
        diagnostic.push({
          from: node.init,
          to: node.init,
          message: 'No key provided to the reference',
          severity: 'error',
        });
      } else if (!keys.has(node.key)) {
        keys.add(node.key);
      } else {
        diagnostic.push({
          from: node.init,
          to: node.init + node.key.length,
          message: 'Duplicated reference key',
          severity: 'error',
        });
      }

      return node.fields.forEach(validate);
    } else if (node instanceof FieldNode) {
      const data: BibtexEntryConfig | undefined = config.find(
        (ec) => ec.entry === node.parent.parent.command.trim().toLowerCase()
      );

      const normalizedFieldName = node.name.trim().toLowerCase() as BibtexFieldType;
      const pos = { from: node.init, to: node.init + normalizedFieldName.length };

      if (!BibtexFields?.[capitalize(normalizedFieldName)]) {
        diagnostic.push({
          ...pos,
          message: 'Invalid bibtex field name',
          severity: 'error',
        });
      } else {
        if (node.name.trim() !== normalizedFieldName) {
          diagnostic.push({
            ...pos,
            message: 'Field names should on lower case',
            severity: 'warning',
          });
        }

        if (
          node.parent.fields
            .map((pf) => pf.name.trim().toLowerCase())
            .filter((name) => normalizedFieldName === name).length > 1
        ) {
          diagnostic.push({
            ...pos,
            message: 'Duplicated field on the reference',
            severity: 'error',
          });
        }

        if (data && data.normalize && !flatten(data.requiredFields).includes(normalizedFieldName)) {
          diagnostic.push({
            ...pos,
            message: `Field "${node.name.trim()}" is not mandatory on @${node.parent.parent.command.toLocaleLowerCase()}`,
            severity: 'warning',
          });
        }
      }

      if (data.validators) {
        const validator = data.validators?.[normalizedFieldName];
        if (validator && !validator.test(node.value.toString())) {
          diagnostic.push({
            from: node.init,
            to: node.init + node.name.length,
            message: `Validation failed for '${node.name}' (validator: ${validator.toString()})`,
            severity: 'error',
          });
        }
      }

      return node.value.concat.forEach(validate);
    }
  })(rootNode);

  return [rootNode, diagnostic];
}

function isWhitespace(string: string): boolean {
  return /^[ \t\n\r]*$/.test(string);
}

export class BibTeXSyntaxError extends Error {
  public char: string;
  constructor(
    input: string,
    public node: Node,
    pos: number,
    public line: number,
    public column: number
  ) {
    super(
      `Line ${line}:${column}: Syntax Error in ${node.type}\n` +
        input.slice(Math.max(0, pos - 20), pos) +
        '>>' +
        input[pos] +
        '<<' +
        input.slice(pos + 1, pos + 20)
    );
    this.name = 'Syntax Error';
    this.char = input[pos];
  }
}

function padEndBibtexField(field: string): string {
  const maxTabSize = Math.max(...Object.keys(BibtexFields).map((bf) => bf.length));
  return field.padEnd(maxTabSize, ' ');
}

function fieldSorter(entry: string, a: string, b: string): number {
  const entryObject = Object.values(BibtexEntries).find(
    (e) => e.name === entry.trim().toLowerCase()
  );

  if (!entryObject) return 0;

  const allFields = flatten([...entryObject.requiredFields, ...entryObject.optionalFields]);

  const [ai, bi] = [
    allFields.indexOf(a.trim().toLowerCase() as BibtexFieldType),
    allFields.indexOf(b.trim().toLowerCase() as BibtexFieldType),
  ];

  return (ai >= 0 ? ai : Number.MAX_VALUE) - (bi >= 0 ? bi : Number.MAX_VALUE);
}

export function toString(node: Node): string {
  if (node instanceof RootNode) return node.children.map(toString).join('\n');
  else if (node instanceof TextNode) return node.text.trim();
  else if (node instanceof BlockNode)
    return `@${node.command.toLowerCase()} {${toString(node.block)}}`;
  else if (node instanceof CommentNode) return node.raw.trim();
  else if (node instanceof PreambleNode) return node.raw.trim();
  else if (node instanceof StringNode) return node.raw.trim();
  else if (node instanceof EntryNode) {
    return `${node.key},\n  ${node.fields
      .sort((a, b) => fieldSorter(node.parent.command as BibtexEntryType, a.name, b.name))
      .map((field) => {
        let value = field.value.toString();
        if (!['month', 'year'].includes(field.name.trim().toLowerCase())) value = `{ ${value} }`;
        return `${padEndBibtexField(field.name.toLowerCase())} = ${value}`;
      })
      .join(',\n  ')}\n`;
  }

  throw new Error(`Unknown Bibtex AST Node (${node.type})`);
}
