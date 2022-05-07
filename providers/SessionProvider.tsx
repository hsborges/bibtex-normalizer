/**
 * @author Hudson Silva Borges
 */
import { maxBy } from 'lodash';
import { createContext, useState } from 'react';
import { compareTwoStrings } from 'string-similarity';

import { BibtexFieldType } from '../lib/bibtex/definitions';
import normalize from '../lib/bibtex/normalizer';
import { EntryNode } from '../lib/bibtex/parser';

type EntryNodeRepresentation = Partial<Record<BibtexFieldType, string>>;

const SessionContext = createContext<{
  content: string;
  updateContent?: (content: string) => void;
  findEntry?: (key: string, title?: string) => EntryNodeRepresentation | null;
  updateEntry?: (entry: EntryNode) => void;
}>({ content: '' });

function localTitleNormalizer(arg: string) {
  return arg
    .toLowerCase()
    .split('')
    .filter((c) => /[\w\s]/g.test(c))
    .join('')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

export const SessionProvider = ({ children }) => {
  const [content, setContent] = useState('');

  function findEntry(key: string, title?: string): EntryNodeRepresentation | null {
    const cache = window.sessionStorage.getItem(key);

    if (!cache) return null;

    const parsedCache: [EntryNodeRepresentation] = JSON.parse(cache);
    return maxBy(parsedCache, (c) => compareTwoStrings(c.title, title));
  }

  function updateEntry(entry: EntryNode, title?: string): void {
    const cache = window.sessionStorage.getItem(entry.key);

    const entryData = entry.fields.reduce(
      (memo, field) => ({ ...memo, [field.name.trim().toLowerCase()]: normalize(field.value) }),
      {} as EntryNodeRepresentation
    );

    if (!cache) {
      window.sessionStorage.setItem(entry.key, JSON.stringify([entryData]));
    } else {
      const parsedCache: [EntryNodeRepresentation] = JSON.parse(cache);

      const [similar, similarity] = parsedCache.reduce(
        (similar: null | [EntryNodeRepresentation, number], c) => {
          const value = compareTwoStrings(
            localTitleNormalizer(c.title),
            localTitleNormalizer(entryData.title)
          );
          if (!similar || similar[1] < value) return [c, value];
          else return similar;
        },
        null
      );

      if (similarity > 0.9) Object.assign(similar, entryData);
      else parsedCache.push(entryData);

      window.sessionStorage.setItem(entry.key, JSON.stringify(parsedCache));
    }
  }

  return (
    <SessionContext.Provider value={{ content, updateContent: setContent, findEntry, updateEntry }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
