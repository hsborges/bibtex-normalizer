export type BibtexFieldType =
  | 'address'
  | 'annote'
  | 'author'
  | 'booktitle'
  | 'chapter'
  | 'crossref'
  | 'edition'
  | 'editor'
  | 'howpublished'
  | 'institution'
  | 'journal'
  | 'key'
  | 'month'
  | 'note'
  | 'number'
  | 'organization'
  | 'pages'
  | 'publisher'
  | 'school'
  | 'series'
  | 'title'
  | 'type'
  | 'volume'
  | 'year';

export type BibtexEntryType =
  | 'article'
  | 'book'
  | 'booklet'
  | 'conference'
  | 'inbook'
  | 'incollection'
  | 'inproceedings'
  | 'manual'
  | 'mastersthesis'
  | 'misc'
  | 'phdthesis'
  | 'proceedings'
  | 'techreport'
  | 'unpublished';

export type BibtexEntryDefinition = {
  name: BibtexEntryType;
  description?: string;
  requiredFields: (BibtexFieldType | [BibtexFieldType, BibtexFieldType])[];
  optionalFields?: (BibtexFieldType | [BibtexFieldType, BibtexFieldType])[];
};

export type BibtexFieldDefinition = {
  name: BibtexFieldType;
  description?: string;
  validator?: RegExp;
};
