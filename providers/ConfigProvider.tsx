import { createContext, useEffect, useState } from 'react';
import regexParser from 'regex-parser';

import { BibtexEntryType, BibtexFieldType } from '../lib/bibtex-definitions';
import * as BibtexEntries from '../lib/bibtex-entries';
import * as BibtexFields from '../lib/bibtex-fields';

export type BibtexEntryConfig = {
  entry: BibtexEntryType;
  normalize: boolean;
  requiredFields: Array<BibtexFieldType | [BibtexFieldType, BibtexFieldType]>;
  validators: Record<BibtexFieldType, RegExp>;
};

export type BibtexNormalizerConfig = {
  entries: BibtexEntryConfig[];
};

const ConfigContext = createContext<{
  config?: BibtexNormalizerConfig;
  updateEntryConfig?: (data: BibtexEntryConfig) => void;
}>({});

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState<BibtexNormalizerConfig>({
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
  });

  const updateEntryConfig = (data: BibtexEntryConfig) => {
    setConfig({
      ...config,
      entries: [...config.entries.filter((e) => e.entry !== data.entry), data],
    });

    localStorage.setItem(
      `entries.${data.entry}`,
      JSON.stringify(data, (key, value) =>
        value instanceof RegExp ? { $regexp: value.toString() } : value
      )
    );
  };

  useEffect(() => {
    const updatedConfig = Object.values(BibtexEntries).map<BibtexEntryConfig>((be) => {
      const lsConfig = localStorage.getItem(`entries.${be.name}`);
      if (!lsConfig) return config.entries.find((e) => e.entry === be.name);
      else
        return JSON.parse(lsConfig, (key, value) =>
          value['$regexp'] ? regexParser(value['$regexp']) : value
        ) as BibtexEntryConfig;
    }, {});

    setConfig({ ...config, entries: updatedConfig });
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateEntryConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
