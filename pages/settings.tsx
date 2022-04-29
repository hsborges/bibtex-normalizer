/**
 * @author Hudson Silva Borges
 */
import { capitalize, flatten, isEqual, omit } from 'lodash';
import { HTMLProps, useCallback, useContext, useEffect, useRef, useState } from 'react';

import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Switch from '../components/switch';
import { BibtexEntryDefinition, BibtexEntryType, BibtexFieldType } from '../lib/bibtex-definitions';
import * as BibtexEntries from '../lib/bibtex-entries';
import ConfigContext, { BibtexEntryConfig, NormalizerCofig } from '../providers/ConfigProvider';
import { styled } from '../stitches.config';

const Grid = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  height: '90%',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 25,
  fontSize: '0.9em',

  '& > *': { width: '60%' },
});

const EntriesConfigComponentRoot = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  border: '1px solid $gray9',
});

const EntriesConfigComponentHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid $gray9',
  padding: '0 15px',
  height: '3em',
  fontWeight: 'bolder',
});

const EntriesConfigComponentBody = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  alignContent: 'center',
  padding: '25px 35px',
  rowGap: '1.2em',
  '& > .row': {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    textAlign: 'right',
    height: 'max-content',
    '& > span': {
      width: 70,
      fontWeight: 'bolder',
      marginRight: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'right',
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      rowGap: 5,
      columnGap: 5,
    },
  },
});

const BibtexFieldSelect = styled(
  function ({ entry, ...props }: HTMLProps<HTMLSelectElement> & { entry: BibtexEntryDefinition }) {
    return (
      <select {...props}>
        {[...flatten(entry.requiredFields), ...flatten(entry.optionalFields)].map((bf) => (
          <option key={bf} value={bf}>
            {bf}
          </option>
        ))}
      </select>
    );
  },
  {
    border: '1px solid $teal6',
    backgroundColor: 'White',
    margin: '0px 5px',
    '&:focus': {
      borderColor: '$gray9',
      outline: 'none',
    },
    height: 25,
  }
);

const RegExpInput = styled(
  function (props: {
    disabled: boolean;
    regexp?: RegExp;
    onRegExpChange?: (regexp?: RegExp) => any;
  }) {
    const { disabled, regexp, onRegExpChange, ...otherProps } = props;

    const regexRef = useRef<HTMLInputElement>();
    const flagsRef = useRef<HTMLInputElement>();

    useEffect(() => {
      regexRef.current.value = regexp?.source || '';
      flagsRef.current.value = regexp?.flags || '';
    }, [regexp]);

    const callback = useCallback(() => {
      const value = regexRef.current?.value?.trim();
      const flags = flagsRef.current?.value?.trim();
      if (onRegExpChange) onRegExpChange(value ? new RegExp(value, flags) : null);
    }, [regexRef, flagsRef, onRegExpChange]);

    return (
      <span {...otherProps}>
        /
        <input
          ref={regexRef}
          disabled={disabled}
          type="text"
          placeholder="regex"
          onChange={(event) => {
            try {
              callback();
            } catch (error) {}
          }}
        />
        /
        <input
          ref={flagsRef}
          disabled={disabled}
          type="text"
          placeholder="flags"
          onChange={(event) => {
            const accept = /^[gimuy]$/i;
            if (!accept.test(event.target?.value)) {
              try {
                callback();
              } catch (error) {}
            }
          }}
        />
      </span>
    );
  },
  {
    color: '$gray8',
    '& > input': {
      border: 'none',
      outline: 'none',
      borderBottom: '1px solid $gray8',
      padding: '0 10px',
      marginRight: 5,
      lineHeight: 1.25,

      '&:first-child:focus': {
        color: '$teal12',
      },
      '&:last-child': {
        maxWidth: 50,
      },
    },
  }
);

const StyledButton = styled(Button, { height: '25px', padding: '5px 10px' });

const Center = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const EntrySelectComponent = styled('select', {
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: '1em',
  color: '$teal9',
  fontWeight: 'bolder',
  outline: 'none',
});

const StyledEntriesConfigComponent = styled(function (props: {
  config?: BibtexEntryConfig[];
  onConfigUpdate?: (data: BibtexEntryConfig) => void;
}) {
  const { config, onConfigUpdate, ...divProps } = props;

  const [entry, setEntry] = useState<BibtexEntryDefinition>();
  const [field, setField] = useState<BibtexFieldType>();
  const [state, setState] = useState<BibtexEntryConfig & { changed: boolean }>();

  const resetComponent = (name: BibtexEntryType = Object.values(BibtexEntries)[0].name) => {
    const entryDefinition = BibtexEntries?.[capitalize(name)];
    setEntry(entryDefinition);
    setField(flatten([...entryDefinition.requiredFields, ...entryDefinition.optionalFields])[0]);
    setState({ ...config.find((ec) => ec.entry === name), changed: false });
  };

  const updateState = (update: BibtexEntryConfig) =>
    setState({
      ...update,
      changed: !isEqual(
        omit(update, 'changed'),
        config.find((ec) => ec.entry === entry.name)
      ),
    });

  useEffect(
    () => entry && setState({ ...config.find((ec) => ec.entry === entry.name), changed: false }),
    [config]
  );

  useEffect(() => resetComponent(), []);

  return (
    entry && (
      <EntriesConfigComponentRoot {...divProps}>
        <EntriesConfigComponentHeader>
          <Center>
            Entry:
            <EntrySelectComponent
              value={entry.name}
              onChange={(event) => resetComponent(event.currentTarget.value as BibtexEntryType)}
            >
              {Object.values(BibtexEntries).map((e, index) => (
                <option key={e.name} value={e.name} label={`@${e.name}`} />
              ))}
            </EntrySelectComponent>
          </Center>
          <Center css={{ columnGap: 10 }}>
            <StyledButton
              size="small"
              bordered
              onClick={(event) => {
                updateState(config.find((ec) => ec.entry === entry.name));
                event.stopPropagation();
              }}
            >
              Restore
            </StyledButton>
            <StyledButton
              size="small"
              disabled={!state.changed}
              onClick={(event) => {
                if (onConfigUpdate) onConfigUpdate(omit(state, ['changed']));
                event.stopPropagation();
              }}
            >
              Save
            </StyledButton>
          </Center>
        </EntriesConfigComponentHeader>
        <EntriesConfigComponentBody>
          <div className="row">
            <span>Enabled:</span>
            <Switch
              checked={state.normalize}
              onCheckedChange={(val) => updateState({ ...state, normalize: val })}
            />
          </div>
          <div className="row">
            <span>Required:</span>
            <div>
              {entry.requiredFields.length
                ? entry.requiredFields.map((field) => (
                    <Checkbox
                      key={`${entry.name}.${field}`}
                      defaultLabel={typeof field === 'string' ? field : `[${field.join('|')}]`}
                      disabled
                      checked
                    />
                  ))
                : '<none>'}
            </div>
          </div>
          <div className="row">
            <span>Optional:</span>
            <div>
              {entry.optionalFields.length
                ? entry.optionalFields
                    .sort((a, b) => a.length - b.length)
                    .map((field) => (
                      <Checkbox
                        key={`${entry.name}.${field}`}
                        disabled={!state.normalize}
                        defaultLabel={typeof field === 'string' ? field : `[${field.join('|')}]`}
                        checked={!!state.requiredFields?.find((rf) => isEqual(rf, field))}
                        onCheckedChange={(checked) =>
                          updateState({
                            ...state,
                            requiredFields: checked
                              ? [...state.requiredFields, field]
                              : state.requiredFields.filter((rf) => !isEqual(rf, field)),
                          })
                        }
                      />
                    ))
                : '<none>'}
            </div>
          </div>
          <div className="row">
            <span>Validators:</span>
            <div>
              <div>
                Validate field
                <BibtexFieldSelect
                  entry={entry}
                  value={field}
                  disabled={!state.normalize}
                  onChange={(el) => setField((el.currentTarget.value as any) || '')}
                />
                using the pattern
                <RegExpInput
                  disabled={!state.normalize}
                  regexp={state?.validators?.[field]}
                  onRegExpChange={(regexp) => {
                    updateState({
                      ...state,
                      validators: { ...state.validators, [field]: regexp },
                    });
                  }}
                  css={{ margin: '0 10px' }}
                />
              </div>
            </div>
          </div>
        </EntriesConfigComponentBody>
      </EntriesConfigComponentRoot>
    )
  );
});

const NormalizerSettings = styled(
  function (
    props: HTMLProps<HTMLTableElement> & {
      config?: NormalizerCofig;
      onConfigUpdate?: (data: NormalizerCofig) => void;
    }
  ) {
    const { config, onConfigUpdate, ...tableProps } = props;

    return (
      <table {...tableProps}>
        <tbody>
          <tr>
            <td>
              <label htmlFor="replace-quotes">Replace quotes with brackets</label>
            </td>
            <td>
              <Switch
                id="replace-quotes"
                checked={config?.awaysUseBraces}
                onCheckedChange={(v) => onConfigUpdate({ ...config, awaysUseBraces: v })}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <label htmlFor="remove-fields">Remove unnecessary fields</label>
            </td>
            <td>
              <Switch
                id="remove-fields"
                checked={config?.removeNotRequiredFields}
                onCheckedChange={(v) => onConfigUpdate({ ...config, removeNotRequiredFields: v })}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <label htmlFor="format-author">Format &quot;author&quot; field</label>
            </td>
            <td>
              <Switch
                id="format-author"
                checked={config?.formatAuthorField}
                onCheckedChange={(v) => onConfigUpdate({ ...config, formatAuthorField: v })}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <label htmlFor="escape-proper-names">Preserve proper names on title</label>
            </td>
            <td>
              <Switch
                id="escape-proper-names"
                checked={config?.escapeProperNames.enabled}
                onCheckedChange={(v) =>
                  onConfigUpdate({
                    ...config,
                    escapeProperNames: { ...config?.escapeProperNames, enabled: v },
                  })
                }
              />
            </td>
            <td>
              <textarea
                cols={50}
                rows={3}
                disabled={!config?.escapeProperNames.enabled}
                value={config?.escapeProperNames.names.join(' ')}
                onChange={(event) =>
                  onConfigUpdate({
                    ...config,
                    escapeProperNames: {
                      ...config?.escapeProperNames,
                      names: event.target.value.split(' ').map((v) => v.trim()),
                    },
                  })
                }
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
  {
    border: '1px solid $gray9',
    padding: '5px 0',
    '& > tbody > tr': {
      backgroundColor: '$teal1',

      '& > td': {
        padding: '0.5em',
        '&:nth-child(1)': {
          textAlign: 'right',
          verticalAlign: 'middle',
        },
        '&:nth-child(2)': {
          width: 50,
          verticalAlign: 'middle',
          padding: '0 15px',
        },
        '&:nth-child(3)': {
          margin: 'auto',
        },
      },
    },
  }
);

export default function SettingComponent() {
  const { config, updateEntryConfig, updateNormalizerConfig } = useContext(ConfigContext);

  return (
    <Grid>
      <NormalizerSettings
        config={config?.normalizer}
        onConfigUpdate={(data) => updateNormalizerConfig(data)}
      />
      <StyledEntriesConfigComponent
        config={config.entries}
        onConfigUpdate={(data) => updateEntryConfig(data)}
      />
    </Grid>
  );
}
