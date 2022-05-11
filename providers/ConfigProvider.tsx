/**
 * @author Hudson Silva Borges
 */
import { createContext, useEffect, useState } from 'react';
import regexParser from 'regex-parser';

import { BibtexEntryType, BibtexFieldType } from '../lib/bibtex/definitions';
import * as ConfigProfiles from './ConfigProfiles';

export type BibtexEntryConfig = {
  entry: BibtexEntryType;
  normalize: boolean;
  requiredFields: Array<BibtexFieldType | [BibtexFieldType, BibtexFieldType]>;
  validators: Record<BibtexFieldType, RegExp>;
};

export type NormalizerCofig = {
  useBraces: boolean;
  clearEntries: boolean;
  autoFormatFields: boolean;
  preserveNames: {
    enabled: boolean;
    names: string[];
  };
};

export type BibtexNormalizerConfig = {
  normalizer: NormalizerCofig;
  entries: BibtexEntryConfig[];
};

const ConfigContext = createContext<{
  config?: BibtexNormalizerConfig;
  updateEntryConfig?: (data: BibtexEntryConfig) => void;
  updateNormalizerConfig?: (data: NormalizerCofig) => void;
}>({});

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState<BibtexNormalizerConfig>(ConfigProfiles.DEFAULT);

  const updateEntryConfig = (data: BibtexEntryConfig) =>
    setConfig({
      ...config,
      entries: [...config.entries.filter((e) => e.entry !== data.entry), data],
    });

  const updateNormalizerConfig = (data: NormalizerCofig) =>
    setConfig({ ...config, normalizer: data });

  useEffect(
    () =>
      localStorage.setItem(
        'BN_NORMALIZER_CONFIG',
        JSON.stringify(config, (key, value) =>
          value instanceof RegExp ? { $regexp: value.toString() } : value
        )
      ),
    [config]
  );

  useEffect(() => {
    const lsConfig = localStorage.getItem('BN_NORMALIZER_CONFIG');
    if (lsConfig) {
      setConfig(
        JSON.parse(lsConfig, (key, value) =>
          value['$regexp'] ? regexParser(value['$regexp']) : value
        )
      );
    }
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateEntryConfig, updateNormalizerConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
