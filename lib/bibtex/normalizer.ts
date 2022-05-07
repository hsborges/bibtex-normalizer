/**
 * @author Hudson Silva Borges
 */
import { flatten } from 'lodash';

import { BibtexNormalizerConfig } from '../../providers/ConfigProvider';
import { BibtexEntryType, BibtexFieldType } from './definitions';
import * as BibtexEntries from './entries';
import * as BibtexFields from './fields';
import {
  BlockNode,
  CommentNode,
  ConcatNode,
  EntryNode,
  Node,
  PreambleNode,
  RootNode,
  StringNode,
  TextNode,
} from './parser';

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

export default function normalize(node: Node, config?: BibtexNormalizerConfig): string {
  function valueFormater(value: string, type: 'literal' | 'braced' | 'quoted'): string {
    if (type === 'braced') return `{ ${value} }`;
    if (type === 'quoted') return `"${value}"`;
    return value;
  }

  if (node instanceof RootNode) return node.children.map((c) => normalize(c, config)).join('\n');
  else if (node instanceof TextNode) return node.text.trim();
  else if (node instanceof BlockNode) {
    return `@${node.command.toLowerCase()} {${normalize(node.block, config)}}`;
  } else if (
    node instanceof CommentNode ||
    node instanceof PreambleNode ||
    node instanceof StringNode
  ) {
    const [, row] = node.raw.trim().match(/^@\w+[{"](.*)[}"]$/i);
    return ` ${row.trim()} `;
  } else if (node instanceof EntryNode) {
    return `${node.key},\n  ${node.fields
      .sort((a, b) => fieldSorter(node.parent.command as BibtexEntryType, a.name, b.name))
      .filter((field) => {
        if (!config?.normalizer.removeNotRequiredFields) return true;
        const entryConfig = config?.entries.find(
          (ce) => ce.entry === field.parent.parent.command.trim().toLowerCase()
        );

        return flatten(entryConfig?.requiredFields || []).includes(
          field.name.trim().toLowerCase() as BibtexFieldType
        );
      })
      .map(
        (field) =>
          `${padEndBibtexField(field.name.toLowerCase())} = ${normalize(field.value, config)}`
      )
      .join(',\n  ')}\n`;
  } else if (node instanceof ConcatNode) {
    return node.concat
      .map((cv) => {
        const type = ['month', 'year'].includes(node.parent.name.trim().toLowerCase())
          ? 'literal'
          : config?.normalizer.awaysUseBraces
          ? 'braced'
          : cv.type;

        let fieldValue = cv.value.trim();

        if (
          node.parent.name.trim().toLowerCase() === 'title' &&
          config?.normalizer.escapeProperNames.enabled
        ) {
          config.normalizer.escapeProperNames.names.forEach((name) => {
            fieldValue = ` ${fieldValue} `
              .replaceAll(
                new RegExp(`^(.*)([\\s{]+|^)(${name})([\\s}]+|$)(.*)$`, 'gi'),
                `$1 {${name}} $5`
              )
              .replaceAll(/\s+/g, ' ')
              .trim();
          });
        }

        if (
          node.parent.name.trim().toLowerCase() === 'author' &&
          config?.normalizer.formatAuthorField
        ) {
          fieldValue = fieldValue
            .split(/\sand\s/i)
            .map((author) =>
              author
                .replace(/(.*),(.*)/, '$2 $1')
                .replaceAll(/\s+/g, ' ')
                .trim()
            )
            .join(' and ');
        }

        return valueFormater(fieldValue, type);
      })
      .join('');
  }

  throw new Error(`Unknown Bibtex AST Node (${node.type})`);
}
