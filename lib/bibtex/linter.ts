/**
 * @author Hudson Silva Borges
 */
import { capitalize, flatten } from 'lodash';

import { Diagnostic } from '@codemirror/lint';

import { BibtexEntryConfig } from '../../providers/ConfigProvider';
import { BibtexFieldType } from './definitions';
import * as BibtexEntries from './entries';
import * as BibtexFields from './fields';
import { BlockNode, EntryNode, FieldNode, Node, RootNode } from './parser';

export default function lint(node: Node, config?: BibtexEntryConfig[]): Array<Diagnostic> {
  const keys: Set<string> = new Set();
  const diagnostic: Array<Diagnostic> = [];

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
            severity: 'info',
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
  })(node);

  return diagnostic;
}
