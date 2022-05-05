/**
 * @author Hudson Silva Borges
 */
import { BibtexEntryDefinition } from './definitions';

export const Article: BibtexEntryDefinition = {
  name: 'article',
  description: 'An article from a journal or magazine.',
  requiredFields: ['author', 'title', 'journal', 'year'],
  optionalFields: ['volume', 'number', 'pages', 'month', 'note'],
};

export const Book: BibtexEntryDefinition = {
  name: 'book',
  description: 'A book with an explicit publisher.',
  requiredFields: [['author', 'editor'], 'title', 'publisher', 'year'],
  optionalFields: [['volume', 'number'], 'series', 'address', 'edition', 'month', 'note'],
};

export const Booklet: BibtexEntryDefinition = {
  name: 'booklet',
  description:
    'A work that is printed and bound, but without a named publisher or sponsoring institution.',
  requiredFields: ['title'],
  optionalFields: ['author', 'howpublished', 'address', 'month', 'year', 'note'],
};

export const Inbook: BibtexEntryDefinition = {
  name: 'inbook',
  description: 'A part of a book, e.g., a chpater, section, or whatever and/or a range of pages.',
  requiredFields: [['author', 'editor'], 'title', ['chapter', 'pages'], 'publisher', 'year'],
  optionalFields: [['volume', 'number'], 'series', 'type', 'address', 'edition', 'month', 'note'],
};

export const Incollection: BibtexEntryDefinition = {
  name: 'incollection',
  description: 'A part of a book having its own title.',
  requiredFields: ['author', 'title', 'booktitle', 'publisher', 'year'],
  optionalFields: [
    'editor',
    ['volume', 'number'],
    'series',
    'type',
    'chapter',
    'pages',
    'address',
    'edition',
    'month',
    'note',
  ],
};

export const Inproceedings: BibtexEntryDefinition = {
  name: 'inproceedings',
  description: 'An article in a conference proceedings.',
  requiredFields: ['author', 'title', 'booktitle', 'year'],
  optionalFields: [
    'edition',
    ['volume', 'number'],
    'series',
    'pages',
    'address',
    'month',
    'organization',
    'publisher',
    'note',
  ],
};

export const Manual: BibtexEntryDefinition = {
  name: 'manual',
  description: 'Technical documentation.',
  requiredFields: ['title'],
  optionalFields: ['author', 'organization', 'address', 'edition', 'month', 'year', 'note'],
};

export const Mastersthesis: BibtexEntryDefinition = {
  name: 'mastersthesis',
  description: "A master's thesis.",
  requiredFields: ['author', 'title', 'school', 'year'],
  optionalFields: ['type', 'address', 'month', 'note'],
};

export const Misc: BibtexEntryDefinition = {
  name: 'misc',
  description:
    'Use this type when nothing else fits. A warning will be issued if all optional fields are empty (i.e., the entire entry is empty or has only ignored fields).',
  requiredFields: [],
  optionalFields: ['author', 'title', 'howpublished', 'month', 'year', 'note'],
};

export const Phdthesis: BibtexEntryDefinition = {
  name: 'phdthesis',
  description: 'A Ph.D. thesis.',
  requiredFields: ['author', 'title', 'school', 'year'],
  optionalFields: ['type', 'address', 'month', 'note'],
};

export const Proceedings: BibtexEntryDefinition = {
  name: 'proceedings',
  description: 'Conference proceedings.',
  requiredFields: ['title', 'year'],
  optionalFields: [
    'editor',
    ['volume', 'number'],
    'series',
    'address',
    'publisher',
    'note',
    'month',
    'organization',
  ],
};

export const Techreport: BibtexEntryDefinition = {
  name: 'techreport',
  description:
    'A report published by a school or other institution, usually numbered within a series.',
  requiredFields: ['author', 'title', 'institution', 'year'],
  optionalFields: ['type', 'number', 'address', 'month', 'note'],
};

export const Unpublished: BibtexEntryDefinition = {
  name: 'unpublished',
  description: 'A document having an author and title, but not formally published.',
  requiredFields: ['author', 'title', 'note'],
  optionalFields: ['month', 'year'],
};
