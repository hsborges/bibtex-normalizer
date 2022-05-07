/**
 * @author Hudson Silva Borges
 */
import { capitalize, flatten, intersection } from 'lodash';

import { Action, Diagnostic } from '@codemirror/lint';

import { BibtexEntryConfig } from '../../providers/ConfigProvider';
import { BibtexFieldType } from './definitions';
import * as BibtexEntries from './entries';
import * as BibtexFields from './fields';
import { BlockNode, EntryNode, FieldNode, Node, RootNode } from './parser';

const Actions = {
  TO_LOWER_CASE: {
    name: 'toLowerCase',
    apply(view, from, to) {
      view.update([
        view.state.update({
          changes: {
            from,
            to,
            insert: view.state.doc.toJSON().join('\n').substring(from, to).toLocaleLowerCase(),
          },
        }),
      ]);
    },
  } as Action,
  REMOVE_FIELD: {
    name: 'remove',
    apply(view, from) {
      const content = view.state.doc.toJSON().join('\n');
      view.update([
        view.state.update({
          changes: {
            from: content.substring(0, from).trimEnd().length,
            to: content.indexOf('\n', from),
            insert: '',
          },
        }),
      ]);
    },
  } as Action,
};

type DiagnosticType =
  | 'NO_KEY'
  | 'NOT_LOWER_CASE'
  | 'DUPLICATED_KEY'
  | 'DUPLICATED_FIELD'
  | 'UNKNOWN_ENTRY'
  | 'UNKNOWN_FIELD'
  | 'NOT_REQUIRED'
  | 'VALIDATION_ERROR'
  | 'MISSING_FIELD';

type ExtendedDiagnostic = Diagnostic & { type: DiagnosticType; node?: Node };

export default function lint(node: Node, config?: BibtexEntryConfig[]): Array<ExtendedDiagnostic> {
  const keys: Set<string> = new Set();
  const diagnostic: Array<ExtendedDiagnostic> = [];

  (function validate(node: Node): void {
    const additionalEntries = ['string', 'comment', 'preamble'];
    if (node instanceof RootNode) return node.children.forEach(validate);
    else if (node instanceof BlockNode) {
      const pos = { from: node.init, to: node.init + node.command.trim().length + 1 };

      if (
        ![...additionalEntries, ...Object.values(BibtexEntries).map((be) => be.name)].includes(
          node.command.trim().toLowerCase()
        )
      ) {
        diagnostic.push({
          ...pos,
          message: `Unknown bibtex entry type "${node.command.trim()}"`,
          severity: 'error',
          type: 'UNKNOWN_ENTRY',
          node,
        });
      } else {
        if (node.command.trim() !== node.command.trim().toLowerCase()) {
          diagnostic.push({
            ...pos,
            message: 'Bibtex entries should be on lowercase letters',
            severity: 'warning',
            actions: [Actions.TO_LOWER_CASE],
            type: 'NOT_LOWER_CASE',
            node,
          });
        }

        if (node.block instanceof EntryNode) {
          const data: BibtexEntryConfig | undefined = config.find(
            (ec) => ec.entry === node.command.trim().toLowerCase()
          );

          for (const requiredField of data.requiredFields) {
            const rfArray = typeof requiredField === 'string' ? [requiredField] : requiredField;

            if (
              intersection(
                node.block.fields.map((f) => f.name.trim().toLowerCase()),
                rfArray
              ).length === 0
            ) {
              diagnostic.push({
                ...pos,
                message: `Entry missing required field(s) ${rfArray
                  .map((v) => `"${v}"`)
                  .join(' or ')}`,
                severity: 'error',
                type: 'MISSING_FIELD',
                node,
              });
            }
          }
        }
      }

      return validate(node.block);
    } else if (node instanceof EntryNode) {
      if ((node.key || '').trim() === '') {
        diagnostic.push({
          from: node.init,
          to: node.init,
          message: 'No key provided to the entry',
          severity: 'error',
          type: 'NO_KEY',
          node,
        });
      } else if (!keys.has(node.key)) {
        keys.add(node.key);
      } else {
        diagnostic.push({
          from: node.init,
          to: node.init + node.key.length,
          message: 'Duplicated entry key',
          severity: 'error',
          type: 'DUPLICATED_KEY',
          node,
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
          message: 'Unknown bibtex field',
          severity: 'error',
          type: 'UNKNOWN_FIELD',
          node,
          actions: [Actions.REMOVE_FIELD],
        });
      } else {
        if (node.name.trim() !== normalizedFieldName) {
          diagnostic.push({
            ...pos,
            message: 'Field names should on lowercase letters',
            severity: 'warning',
            actions: [Actions.TO_LOWER_CASE],
            type: 'NOT_LOWER_CASE',
            node,
          });
        }

        if (
          node.parent.fields
            .map((pf) => pf.name.trim().toLowerCase())
            .filter((name) => normalizedFieldName === name).length > 1
        ) {
          diagnostic.push({
            ...pos,
            message: 'Duplicated field on the entry',
            severity: 'error',
            actions: [Actions.REMOVE_FIELD],
            type: 'DUPLICATED_FIELD',
            node,
          });
        }

        if (data && data.normalize && !flatten(data.requiredFields).includes(normalizedFieldName)) {
          diagnostic.push({
            ...pos,
            message: `Field "${node.name.trim()}" is not mandatory on @${node.parent.parent.command.toLocaleLowerCase()}`,
            severity: 'info',
            actions: [Actions.REMOVE_FIELD],
            type: 'NOT_REQUIRED',
            node,
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
            type: 'VALIDATION_ERROR',
            node,
          });
        }
      }

      return node.value.concat.forEach(validate);
    }
  })(node);

  return diagnostic;
}
