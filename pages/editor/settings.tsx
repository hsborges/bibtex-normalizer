/**
 * @author Hudson Silva Borges
 */
import { capitalize, flatten, isEqual, omit } from 'lodash';
import {
  HTMLAttributes,
  HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoCloseCircle } from 'react-icons/io5';

import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import Switch from '../../components/switch';
import useEscape from '../../hooks/useEscape';
import {
  BibtexEntryDefinition,
  BibtexEntryType,
  BibtexFieldType,
} from '../../lib/bibtex/definitions';
import * as BibtexEntries from '../../lib/bibtex/entries';
import ConfigContext, { BibtexEntryConfig, NormalizerCofig } from '../../providers/ConfigProvider';
import { styled } from '../../stitches.config';

const Grid = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 25,
  fontSize: '0.9em',

  '& > *': { width: '60%' },

  '&.hidden': {
    width: 0,
    height: 0,
    opacity: 0,
    zIndex: -9999,
  },

  '@md': { '& > *': { width: '95%' } },
  '@sm': { fontSize: '0.75em' },
});

const CloseButton = styled(
  function (props: HTMLProps<HTMLSpanElement>) {
    return (
      <span {...props}>
        <IoCloseCircle />
      </span>
    );
  },
  {
    position: 'absolute',
    width: 'min-content',
    cursor: 'pointer',
    right: '50%',
    marginTop: '-1.5em',
    transform: 'translateX(50%)',
    color: '$teal9',
    fontSize: '3.5em',

    '@md': { top: '5vh' },
    '@sm': { top: '2vh' },
  }
);

const SettingsRoot = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  border: '1px solid $gray9',
  backgroundColor: 'White',
});

const SettingsTitle = styled(
  function (
    props: HTMLProps<HTMLDivElement> & {
      changed?: boolean;
      onSave?: () => void;
      onRestore?: () => void;
    }
  ) {
    const { changed, onSave, onRestore: onDefault, ...divProps } = props;
    return (
      <div {...divProps}>
        <Center>{divProps.children}</Center>
        <Center css={{ columnGap: 10 }}>
          {changed && (
            <Button
              size="small"
              bordered
              onClick={(event) => {
                event.stopPropagation();
                if (onDefault) onDefault();
              }}
            >
              Restore
            </Button>
          )}
          <Button
            size="small"
            disabled={!changed}
            onClick={(event) => {
              event.stopPropagation();
              if (onSave) onSave();
            }}
          >
            Save
          </Button>
        </Center>
      </div>
    );
  },
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid $gray9',
    padding: '0 15px',
    height: '3em',
    fontWeight: 'bolder',

    [`& ${Button}`]: { height: '25px', padding: '5px 10px' },
  }
);

const SettingsBody = styled('div', {
  padding: 5,
  '@sm': { padding: '5px 0' },
});

const SettingsFootnote = styled('div', {
  width: '90%',
  margin: 'auto',
  textAlign: 'center',
  color: '$gray9',
  padding: '10px 0',
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
    whiteSpace: 'nowrap',
    margin: '0 0.5em',
    '& > input': {
      border: 'none',
      outline: 'none',
      borderBottom: '1px solid $gray8',
      padding: '0 0.5em',
      lineHeight: 1.25,

      '&:first-child': { marginRight: 5 },
      '&:last-child': { maxWidth: 50 },
    },

    '@sm': { display: 'inline-block' },
  }
);

const Center = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const EntrySelectComponent = styled('select', {
  border: 'none',
  backgroundColor: 'transparent',
  color: '$teal9',
  fontWeight: 'bolder',
  outline: 'none',
});

const EntriesSettings = styled(
  function (
    props: HTMLAttributes<HTMLDivElement> & {
      config?: BibtexEntryConfig[];
      onConfigUpdate?: (data: BibtexEntryConfig) => void;
    }
  ) {
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
        <SettingsRoot {...divProps}>
          <SettingsTitle
            changed={state.changed}
            onSave={() => onConfigUpdate && onConfigUpdate(omit(state, ['changed']))}
            onRestore={() => updateState(config.find((ec) => ec.entry === entry.name))}
          >
            Entry:
            <EntrySelectComponent
              value={entry.name}
              onChange={(event) => {
                if (!state.changed) resetComponent(event.currentTarget.value as BibtexEntryType);
                else alert('Save or discard changes before proceeding.');
              }}
            >
              {Object.values(BibtexEntries).map((e, index) => (
                <option key={e.name} value={e.name} label={`@${e.name}`} />
              ))}
            </EntrySelectComponent>
          </SettingsTitle>
          <SettingsBody>
            <div className="row">
              <span>Normalize:</span>
              <Switch
                checked={state.normalize}
                onCheckedChange={(val) => updateState({ ...state, normalize: val })}
              />
            </div>
            <div className="row">
              <span>Mandatory:</span>
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
                  Validate
                  <BibtexFieldSelect
                    entry={entry}
                    value={field}
                    disabled={!state.normalize}
                    onChange={(el) => {
                      if (!state.changed) setField((el.currentTarget.value as any) || '');
                      else alert('Save or discard changes before proceeding.');
                    }}
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
                  />
                </div>
              </div>
            </div>
          </SettingsBody>
          <SettingsFootnote>
            By definition, <strong>mandatory fields</strong> are the ones that should be present on
            the entry, otherwise the LaTeX will produce warning messages. Here, you can also enforce
            the presence of some <strong>optional fields</strong> to improve the readability of your
            references.
          </SettingsFootnote>
        </SettingsRoot>
      )
    );
  },
  {
    [`& ${SettingsBody}`]: {
      display: 'flex',
      flexFlow: 'column',
      alignContent: 'center',
      padding: '15px 25px 10px',
      rowGap: '1.2em',
      '& > .row': {
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        height: 'max-content',

        '& > span': {
          width: 70,
          fontWeight: 'bolder',
          marginRight: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        '& > div': {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 10,
          columnGap: 5,
        },
      },

      '@sm': { padding: '15px 5px' },
    },
  }
);

const NormalizerSettings = styled(
  function (
    props: HTMLAttributes<HTMLDivElement> & {
      config?: NormalizerCofig;
      onConfigUpdate?: (data: NormalizerCofig) => void;
    }
  ) {
    const { config, onConfigUpdate, ...tableProps } = props;

    const [state, setState] = useState<NormalizerCofig & { changed: boolean }>({
      ...config,
      changed: false,
    });

    const updateState = (values: Partial<NormalizerCofig>) =>
      setState({
        ...state,
        ...values,
        changed: !isEqual(config, omit({ ...state, ...values }, 'changed')),
      });

    return (
      <SettingsRoot {...tableProps}>
        {tableProps.children}
        <SettingsTitle
          changed={state.changed}
          onSave={() => {
            onConfigUpdate(omit(state, 'changed'));
            setState({ ...state, changed: false });
          }}
          onRestore={() => setState({ ...config, changed: false })}
        >
          Normalizer
        </SettingsTitle>
        <SettingsBody>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="replace-quotes">Replace quotes with brackets</label>
                </td>
                <td>
                  <Switch
                    id="replace-quotes"
                    checked={state?.awaysUseBraces}
                    onCheckedChange={(v) => updateState({ awaysUseBraces: v })}
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
                    checked={state?.removeNotRequiredFields}
                    onCheckedChange={(v) => updateState({ removeNotRequiredFields: v })}
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
                    checked={state?.formatAuthorField}
                    onCheckedChange={(v) => updateState({ formatAuthorField: v })}
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
                    checked={state?.escapeProperNames.enabled}
                    onCheckedChange={(v) =>
                      updateState({
                        escapeProperNames: { ...state?.escapeProperNames, enabled: v },
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    rows={2}
                    disabled={!state?.escapeProperNames.enabled}
                    value={state?.escapeProperNames.names.join(' ')}
                    onChange={(event) =>
                      updateState({
                        escapeProperNames: {
                          ...state?.escapeProperNames,
                          names: event.target.value.split(' ').map((v) => v.trim()),
                        },
                      })
                    }
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </SettingsBody>
      </SettingsRoot>
    );
  },
  {
    position: 'relative',
    '& table': {
      width: '100%',

      '& > tbody > tr': {
        backgroundColor: '$teal1',

        '& > td': {
          padding: '0.5em',
          '@sm': { padding: '0.25em' },

          verticalAlign: 'middle',
          '&:nth-child(1)': {
            textAlign: 'right',
            width: 150,
            '@sm': { width: 100 },
          },
          '&:nth-child(2)': {
            width: 60,
          },
          '&:nth-child(3)': { '& textarea': { width: '100%', fontSize: '0.95em' } },
        },
      },
    },
  }
);

export default styled(function SettingComponent(
  props: HTMLAttributes<HTMLDivElement> & { onClose: () => void }
) {
  const { onClose, ...divProps } = props;
  const { config, updateEntryConfig, updateNormalizerConfig } = useContext(ConfigContext);

  useEscape(onClose);

  return (
    <Grid
      {...divProps}
      className={`${divProps.className} ${divProps.hidden ? 'hidden' : ''}`}
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <NormalizerSettings
        config={config?.normalizer}
        onConfigUpdate={(data) => updateNormalizerConfig(data)}
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton onClick={onClose} />
      </NormalizerSettings>
      <EntriesSettings
        config={config.entries}
        onConfigUpdate={(data) => updateEntryConfig(data)}
        onClick={(event) => event.stopPropagation()}
      />
    </Grid>
  );
},
{});

export function getStaticProps() {
  return { notFound: true };
}
