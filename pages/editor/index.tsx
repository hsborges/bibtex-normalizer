/**
 * @author Hudson Silva Borges
 */
import { countBy, difference, flatten, isEqual, pick } from 'lodash';
import Head from 'next/head';
import { HTMLProps, useContext, useEffect, useRef, useState } from 'react';
import {
  IoBuildSharp,
  IoClose,
  IoCogOutline,
  IoCopyOutline,
  IoSaveOutline,
  IoTrashBinOutline,
} from 'react-icons/io5';

import { StreamLanguage } from '@codemirror/language';
import { simpleMode } from '@codemirror/legacy-modes/mode/simple-mode';
import { Diagnostic, lintGutter, linter } from '@codemirror/lint';
import CodeMirror, { ReactCodeMirrorRef, TransactionSpec } from '@uiw/react-codemirror';

import Button from '../../components/button';
import * as Toast from '../../components/toast';
import TourComponent from '../../components/tour';
import lint from '../../lib/bibtex/linter';
import toString from '../../lib/bibtex/normalizer';
import {
  BibTeXSyntaxError,
  BlockNode,
  ConcatNode,
  EntryNode,
  FieldNode,
  LiteralNode,
  generateAST,
} from '../../lib/bibtex/parser';
import * as gtag from '../../lib/gtag';
import ConfigContext from '../../providers/ConfigProvider';
import SessionContext from '../../providers/SessionProvider';
import { styled } from '../../stitches.config';
import Settings from './settings';

const Grid = styled('div', {
  height: '100%',
  display: 'flex',
  flexFlow: 'row',
  columnGap: '1em',
  fontSize: '14px',
  width: 'calc(100% + 15px)',

  '@sm': { flexFlow: 'column' },
  '@md': { paddingTop: '1em', paddingBottom: '2em' },
});

const StyledSettings = styled(Settings, {
  position: 'absolute',
  zIndex: 999,
  top: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  backdropFilter: 'blur(2px)',
});

const StyledCodeMirror = styled(CodeMirror, {
  width: '100%',
  maxHeight: '100%',
  border: '1px solid $teal6',

  '& .cm-scroller': { overflow: 'scroll' },
});

const CodeMirrorWraper = styled(
  function (
    props: HTMLProps<HTMLDivElement> & {
      error?: BibTeXSyntaxError;
      infos?: number;
      warnings?: number;
      errors?: number;
    }
  ) {
    const { error, infos = 0, warnings = 0, errors = 0, ...divProps } = props;
    return (
      <div {...divProps} className={`${divProps.className} ${error ? 'has-syntax-error' : ''}`}>
        {props.children}
        <span id="bn-editor-summary">
          <span hidden={!error}>Syntax Error!</span>
          <span hidden={!!error || !infos}>{infos} info(s)</span>
          <span hidden={!!error || !warnings}>{warnings} warning(s)</span>
          <span hidden={!!error || !errors}>{errors} error(s)</span>
        </span>
      </div>
    );
  },
  {
    display: 'flex',
    position: 'relative',
    width: '100%',
    opacity: 0.75,
    fontWeight: 'bolder',
    border: '2px solid transparent',

    '&.has-syntax-error': {
      border: '2px solid $tomato8',
    },

    '& > span': {
      position: 'absolute',
      bottom: 15,
      right: '50%',
      transform: 'translate(50%)',

      '& > span:nth-child(2)': {
        color: '$purple8',
      },
      '& > span:nth-child(3)': {
        color: '$amber8',
      },
      '& > span:nth-child(1), & > span:nth-child(4)': {
        color: '$tomato8',
      },

      '& > span + span': {
        marginLeft: 10,
        textAlign: 'end',
      },

      '@sm': {
        width: '100%',
        right: 'inherit',
        transform: 'inherit',
        textAlign: 'center',
      },
    },

    '@sm': { height: '100%' },
  }
);

const ActionsMenu = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  rowGap: 10,

  '@sm': {
    marginTop: 15,
    rowGap: 5,
    flexFlow: 'row',
    justifyContent: 'center',

    [`& > ${Button}`]: {
      display: 'inline-flex',
      '& > span': { display: 'none' },
    },

    [`& > ${Button} + ${Button}`]: {
      marginLeft: '1em',
    },
  },
});

const bibtexSyntaxHighlight = {
  start: [
    { regex: /.*@comment/i, token: 'comment', push: 'comment' },
    {
      regex: /(\s*)(@preamble)(\s*{)/i,
      token: ['', 'variable-2'],
      push: 'braced',
    },
    {
      regex: /(\s*)(@preamble)(\s*\()/i,
      token: ['', 'variable-2'],
      push: 'parenthesised',
    },
    {
      regex: /(\s*)(@string)(\s*{)/i,
      token: ['', 'variable-2'],
      push: 'braced',
    },
    {
      regex: /(\s*)(@string)(\s*\()/i,
      token: ['', 'variable-2'],
      push: 'parenthesised',
    },
    {
      regex: /(\s*)(@[^=#,{}()[\] \t\n\r]+)(\s*\{\s*)([^=#,{}()[\] \t\n\r]+)(\s*,)/,
      token: ['', 'variable-2'],
      push: 'entry',
    },
    { regex: /.*/, token: 'comment' },
  ],
  entry: [
    {
      regex: /([^=,{}()[\]\t\n\r]+)(\s*)(=)/,
      token: ['keyword', '', 'operator'],
    },
    { regex: /"/, push: 'quoted' },
    { regex: /\d+/i, token: 'number' },
    { regex: /\{/, push: 'braced' },
    { regex: /}/, pop: true },
  ],
  quoted: [
    { regex: /\{/, push: 'braced' },
    { regex: /[^{"]+/, token: 'string' },
    { regex: /"/, pop: true },
  ],
  braced: [
    { regex: /\{/, push: 'braced' },
    { regex: /[^{}]+/, token: 'string' },
    { regex: /\}/, pop: true },
  ],
  parenthesised: [
    { regex: /\{/, token: 'comment', push: 'braced' },
    { regex: /[^{)]+/, token: 'string' },
    { regex: /\)/, pop: true },
  ],
  comment: [
    { regex: /.*\}/, token: 'comment', pop: true },
    { regex: /.*/, token: 'comment' },
  ],
};

export default function SettingComponent() {
  const { config } = useContext(ConfigContext);
  const { content, updateContent, updateEntry, findEntry } = useContext(SessionContext);

  const ref = useRef<ReactCodeMirrorRef>();
  const normalizeButtonRef = useRef<HTMLButtonElement>();

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(null);
  const [width, setWidth] = useState<number>(null);

  const [toast, setToast] = useState<{ opened: boolean; title?: string; description?: string }>({
    opened: false,
  });

  const updateToast = (status: typeof toast) => {
    setToast({ opened: false });
    setTimeout(() => setToast(status), 250);
  };

  useEffect(() => {
    const el = document.getElementById('bn-editor-codemirror').children[0];
    setHeight(el?.clientHeight);
    setWidth(el?.clientWidth);
  }, []);

  const [resultsSummary, setResultsSummary] = useState<{
    infos?: number;
    errors?: number;
    warnings?: number;
    error?: BibTeXSyntaxError;
  }>({});

  return (
    <>
      <Head>
        <title>Bibtex Normalizer - Editor</title>
      </Head>
      <StyledSettings hidden={!showSettings} onClose={() => setShowSettings(false)} />
      <Toast.Provider swipeDirection="right">
        <TourComponent
          tourName="editor"
          steps={[
            {
              element: '#bn-editor-codemirror',
              intro: 'You can start by copying your references to this editor.',
              title: 'Bibtex editor',
            },
            {
              element: '#bn-editor-summary',
              intro: 'The tool validates the content and puts marks on important parts',
              title: 'Summary',
            },
            {
              element: '#bn-editor-settings',
              intro:
                'You can change the settings (e.g., set the required fields, use custom validators, and enable/disable options)',
              title: 'Settings',
            },
            {
              element: '#bn-editor-normalize',
              intro: 'Then, click on "Normalize" to automatically fix several issues',
              title: 'Normalize',
            },
            {
              element: '#bn-editor-codemirror',
              intro: (
                <div>
                  <div style={{ marginBottom: 25 }}>
                    Several issues can be fixed and other ones may need your help. Here, we
                    performed a:
                  </div>
                  <ul style={{ textAlign: 'start', marginBottom: 25 }}>
                    <li>Code Identation</li>
                    <li>Fields normalization</li>
                    <li>Fields sorting</li>
                    <li>Preserved proper names</li>
                  </ul>
                  <div>You can use your own settings acessing the menu</div>
                </div>
              ),
              title: 'Bibtex editor',
            },
            {
              element: '#bn-editor-clipboard',
              intro: 'Finally, you can copy the normalized references to clipboard',
              title: 'Download or copy',
            },
            {
              element: '#bn-editor-download',
              intro: '... or download directly <br> ✌(-‿-)✌',
              title: 'Download or copy',
            },
          ]}
          onBeforeChange={(nextIndex) => {
            switch (nextIndex) {
              case 0:
                if (ref.current?.view.state.doc.toJSON().join('').trim() === '') {
                  ref.current?.view.update([
                    ref.current?.view.state.update({
                      changes: {
                        from: 0,
                        to: ref.current.view.state.doc.length,
                        insert: `@Article{borges2019developers,
  title="How do developers promote open source projects?",
  author={Borges, Hudson Silva and Marco Tulio Valente},
  journal={Computer}, pages={27--33},
  year={2019},
  number={8},
}`,
                      },
                    } as TransactionSpec),
                  ]);
                }
                break;

              case 4:
                normalizeButtonRef.current.click();
                break;

              default:
                break;
            }
          }}
        />
        <Grid>
          <CodeMirrorWraper {...resultsSummary} id="bn-editor-codemirror">
            <StyledCodeMirror
              ref={ref}
              height={height ? `${height}px` : '100%'}
              maxHeight={height ? `${height}px` : '100%'}
              width={width ? `${width}px` : '100%'}
              maxWidth={width ? `${width}px` : '100%'}
              basicSetup
              placeholder={`// Paste your bibtex content and click on "Normalize"`}
              value={content || ''}
              extensions={[
                linter((view) => {
                  let lintError: BibTeXSyntaxError;
                  let diagnotic: Diagnostic[] = [];

                  try {
                    diagnotic = lint(
                      generateAST(view.state.doc.toJSON().join('\n')),
                      config.entries
                    );
                  } catch (error) {
                    if (error instanceof BibTeXSyntaxError) lintError = error;
                    console.error(error);
                  }

                  const data = {
                    infos: diagnotic.filter((d) => d.severity === 'info').length,
                    warnings: diagnotic.filter((d) => d.severity === 'warning').length,
                    errors: diagnotic.filter((d) => d.severity === 'error').length,
                    error: lintError,
                  };

                  if (!isEqual(data, resultsSummary)) setResultsSummary(data);

                  return diagnotic;
                }),
                lintGutter(),
                StreamLanguage.define(simpleMode(bibtexSyntaxHighlight)),
              ]}
              onChange={(value) => updateContent(value)}
            />
          </CodeMirrorWraper>

          <ActionsMenu>
            <Button
              id="bn-editor-normalize"
              ref={normalizeButtonRef}
              size="normal"
              disabled={showSettings}
              onClick={() => {
                if (content.length === 0) return;

                const currentBibtex = ref.current.view.state.doc.toString();
                const ast = generateAST(currentBibtex);

                ast.children
                  .map((c) =>
                    c instanceof BlockNode && c.block instanceof EntryNode ? c.block : null
                  )
                  .filter((c) => c !== null)
                  .forEach((entry) => updateEntry(entry));

                for (const diagnostic of lint(ast, config.entries).filter(
                  (d) => d.type === 'MISSING_FIELD'
                )) {
                  const node = diagnostic.node as BlockNode;
                  const entryNode = node.block as unknown as EntryNode;

                  const data = config.entries.find((e) => e.entry === node.command.toLowerCase());
                  const cache = findEntry(
                    entryNode.key,
                    toString(
                      entryNode.fields.find((f) => f.name.trim().toLowerCase() === 'title').value
                    )
                  );

                  if (!data || !cache) continue;

                  const requiredFields = flatten(data.requiredFields);
                  const missingFields = difference(
                    requiredFields as string[],
                    entryNode.fields.map((f) => f.name.trim().toLowerCase())
                  );

                  for (const field of missingFields) {
                    if (cache?.[field] !== undefined) {
                      const newNode = new FieldNode(NaN, entryNode, field);
                      entryNode.fields.push(newNode);
                      new LiteralNode(NaN, newNode.value, cache?.[field]);
                    }
                  }
                }

                ref.current.view.update([
                  ref.current.view.state.update({
                    changes: {
                      from: 0,
                      to: ref.current.view.state.doc.length,
                      insert: toString(ast, config),
                    },
                  } as TransactionSpec),
                ]);

                Object.entries(countBy(lint(ast, config.entries), 'severity')).forEach(
                  ([label, value]) =>
                    gtag.event({
                      action: 'normalize',
                      category: 'editor',
                      label,
                      value: Number(value).toString(),
                    })
                );

                updateToast({
                  opened: true,
                  title: 'Normalized',
                  description: 'References normalized and editor updated',
                });
              }}
            >
              <IoBuildSharp style={{ height: '1.25em', width: '1.25em' }} /> <span>Normalize</span>
            </Button>
            <Button
              id="bn-editor-settings"
              size="normal"
              color="normal"
              bordered
              onClick={() => setShowSettings(!showSettings)}
            >
              <IoCogOutline style={{ height: '1.25em', width: '1.25em' }} /> <span>Settings</span>
            </Button>
            <Button
              id="bn-editor-clipboard"
              size="normal"
              color="normal"
              bordered
              disabled={showSettings}
              onClick={() => {
                navigator.clipboard.writeText(ref.current.view.state.doc.toJSON().join('\n'));

                gtag.event({
                  action: 'copy_to_clipboard',
                  category: 'editor',
                  label: 'length',
                  value: Number(ref.current.view.state.doc.length).toString(),
                });

                updateToast({
                  opened: true,
                  title: 'Copied',
                  description: 'Content copied to clipboard',
                });
              }}
            >
              <IoCopyOutline style={{ height: '1.25em', width: '1.25em' }} /> <span>Copy</span>
            </Button>
            <Button
              id="bn-editor-download"
              size="normal"
              color="normal"
              bordered
              disabled={showSettings}
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([ref.current.view.state.doc.toJSON().join('\n')], {
                  type: 'application/x-bibtex',
                  endings: 'transparent',
                });
                element.href = URL.createObjectURL(file);
                element.download = 'references.bib';
                document.body.appendChild(element);
                element.click();
                element.remove();

                gtag.event({
                  action: 'download',
                  category: 'editor',
                  label: 'length',
                  value: Number(ref.current.view.state.doc.length).toString(),
                });
              }}
            >
              <IoSaveOutline style={{ height: '1.25em', width: '1.25em' }} /> <span>Download</span>
            </Button>
            <Button
              id="bn-editor-clear"
              size="normal"
              bordered
              color="warning"
              disabled={showSettings}
              onClick={() => {
                ref.current.view.update([
                  ref.current.view.state.update({
                    changes: {
                      from: 0,
                      to: ref.current.view.state.doc.length,
                      insert: '',
                    },
                  } as TransactionSpec),
                ]);

                gtag.event({
                  action: 'editor_clear',
                  category: 'editor',
                  label: 'length',
                  value: Number(ref.current.view.state.doc.length).toString(),
                });

                updateToast({
                  opened: true,
                  title: 'Cleared',
                  description: 'Content cleared',
                });
              }}
            >
              <IoTrashBinOutline style={{ height: '1em', width: '1em' }} /> <span>Clear</span>
            </Button>
          </ActionsMenu>

          <Toast.Root
            open={toast.opened}
            onOpenChange={(opened) => setToast({ ...toast, opened })}
            duration={3000}
          >
            <Toast.Title css={{ color: '$teal9' }}>✔ | {toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.Action asChild altText="Close">
              <Button color="transparent">
                <IoClose />
              </Button>
            </Toast.Action>
          </Toast.Root>

          <Toast.Viewport />
        </Grid>
      </Toast.Provider>
    </>
  );
}
