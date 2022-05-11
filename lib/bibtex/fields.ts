/**
 * @author Hudson Silva Borges
 */
import { BibtexFieldDefinition } from './definitions';

export const Address: BibtexFieldDefinition = {
  name: 'address',
  description:
    'Usually the address of the publisher or other type of institution. For major publishing houses, van Leunen recommends omitting the information entirely. For small publishers, on the other hand, you can help the reader by giving the complete address.',
};

export const Annote: BibtexFieldDefinition = {
  name: 'annote',
  description:
    'An annotation. It is not used by the standard bibliography styles, but may be used by others that produce an annotated bibliography.',
};

export const Author: BibtexFieldDefinition = {
  name: 'author',
  description: 'The name(s) of the author(s), in BibTeX name format.',
};

export const Booktitle: BibtexFieldDefinition = {
  name: 'booktitle',
  description:
    'Title of a book, part of which is being cited. See the LATEX book for how to type titles. For book entries, use the title field instead.',
};

export const Chapter: BibtexFieldDefinition = {
  name: 'chapter',
  description: 'A chapter (or section or whatever) number.',
  validator: /^\d+$/,
};

export const Crossref: BibtexFieldDefinition = {
  name: 'crossref',
  description: 'The database key of the entry being cross referenced.',
};

export const Edition: BibtexFieldDefinition = {
  name: 'edition',
  description:
    "The edition of a book--for example, ``Second''. This should be an ordinal, and should have the first letter capitalized, as shown here; the standard styles convert to lower case when necessary.",
};

export const Editor: BibtexFieldDefinition = {
  name: 'editor',
  description:
    'Name(s) of editor(s), typed as indicated in the LATEX book. If there is also an author field, then the editor field gives the editor of the book or collection in which the reference appears.',
};

export const Howpublished: BibtexFieldDefinition = {
  name: 'howpublished',
  description: 'How something strange has been published. The first word should be capitalized.',
};

export const Institution: BibtexFieldDefinition = {
  name: 'institution',
  description: 'The sponsoring institution of a technical report.',
};

export const Journal: BibtexFieldDefinition = {
  name: 'journal',
  description: 'A journal name. Abbreviations are provided for many journals; see the Local Guide.',
};

export const Key: BibtexFieldDefinition = {
  name: 'key',
  description:
    "Used for alphabetizing, cross referencing, and creating a label when the ``author'' information (described in Section 4) is missing. This field should not be confused with the key that appears in the cite command and at the beginning of the database entry.",
};

export const Month: BibtexFieldDefinition = {
  name: 'month',
  description:
    'The month in which the work was published or, for an unpublished work, in which it was written. You should use the standard three-letter abbreviation, as described in Appendix B.1.3 of the LATEX book.',
  validator: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/,
};

export const Note: BibtexFieldDefinition = {
  name: 'note',
  description:
    'Any additional information that can help the reader. The first word should be capitalized.',
};

export const Number: BibtexFieldDefinition = {
  name: 'number',
  description:
    'The number of a journal, magazine, technical report, or of a work in a series. An issue of a journal or magazine is usually identified by its volume and number; the organization that issues a technical report usually gives it a number; and sometimes books are given numbers in a named series.',
};

export const Organization: BibtexFieldDefinition = {
  name: 'organization',
  description: 'The organization that sponsors a conference or that publishes a manual.',
};

export const Pages: BibtexFieldDefinition = {
  name: 'pages',
  description:
    "One or more page numbers or range of numbers, such as 42-111 or 7,41,73-97 or 43+ (the `+' in this last example indicates pages following that don't form a simple range). To make it easier to maintain Scribe-compatible databases, the standard styles convert a single dash (as in 7-33) to the double dash used in TEX to denote number ranges (as in 7-33).",
  validator: /^\d+(-{1,2}\d+|\+){0,1}$/,
};

export const Publisher: BibtexFieldDefinition = {
  name: 'publisher',
  description: "The publisher's name.",
};

export const School: BibtexFieldDefinition = {
  name: 'school',
  description: 'The name of the school where a thesis was written.',
};

export const Series: BibtexFieldDefinition = {
  name: 'series',
  description:
    'The name of a series or set of books. When citing an entire book, the the title field gives its title and an optional series field gives the name of a series or multi-volume set in which the book is published.',
};

export const Title: BibtexFieldDefinition = {
  name: 'title',
  description: "The work's title, typed as explained in the LATEX book.",
};

export const Type: BibtexFieldDefinition = {
  name: 'type',
  description: "The type of a technical report--for example, ``Research Note''.",
};

export const Volume: BibtexFieldDefinition = {
  name: 'volume',
  description: 'The volume of a journal or multivolume book.',
  validator: /^\d+$/,
};

export const Year: BibtexFieldDefinition = {
  name: 'year',
  description:
    "The year of publication or, for an unpublished work, the year it was written. Generally it should consist of four numerals, such as 1984, although the standard styles can handle any year whose last four nonpunctuation characters are numerals, such as `(about 1984)'.",
  validator: /^\d{4}$/,
};
