import { BibtexFieldType } from '../lib/bibtex/definitions';
import * as BibtexEntries from '../lib/bibtex/entries';
import * as BibtexFields from '../lib/bibtex/fields';
import { BibtexNormalizerConfig } from './ConfigProvider';

export const MINIMAL: BibtexNormalizerConfig = {
  normalizer: {
    useBraces: true,
    clearEntries: false,
    autoFormatFields: true,
    preserveNames: {
      enabled: true,
      names: ['YouTube', 'Facebook', 'Instagram', 'Twitter', 'GitHub'],
    },
  },
  entries: Object.values(BibtexEntries).map((entry) => ({
    entry: entry.name,
    normalize: true,
    requiredFields: entry.requiredFields,
    validators: Object.values(BibtexFields).reduce(
      (memo, field) => ({
        ...memo,
        ...(field.validator ? { [field.name]: field.validator } : {}),
      }),
      {} as Record<BibtexFieldType, RegExp>
    ),
  })),
};

export const DEFAULT: BibtexNormalizerConfig = {
  ...MINIMAL,
  entries: MINIMAL.entries.map((entry) => {
    switch (entry.entry) {
      case 'article':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat(['pages', 'volume']),
        };

      case 'book':
      case 'inbook':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat(['edition']),
        };

      case 'booklet':
      case 'manual':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat(['author', 'year']),
        };

      case 'incollection':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat(['pages']),
        };

      case 'inproceedings':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat([['volume', 'number'], 'pages']),
        };

      case 'misc':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat(['year', 'title', 'author']),
        };

      case 'proceedings':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat([['volume', 'number']]),
        };

      case 'unpublished':
        return {
          ...entry,
          requiredFields: entry.requiredFields.concat(['year']),
        };

      default:
        return entry;
    }
  }),
};
