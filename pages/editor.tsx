/**
 * @author Hudson Silva Borges
 */
import { isEqual } from 'lodash';
import { HTMLProps, useContext, useEffect, useRef, useState } from 'react';
import {
  IoBuildSharp,
  IoClose,
  IoCloudDownloadOutline,
  IoCopyOutline,
  IoTrashBinOutline,
} from 'react-icons/io5';

import { simpleMode } from '@codemirror/legacy-modes/mode/simple-mode';
import { Diagnostic, lintGutter, linter } from '@codemirror/lint';
import { StreamLanguage } from '@codemirror/stream-parser';
import CodeMirror, { ReactCodeMirrorRef, TransactionSpec } from '@uiw/react-codemirror';

import Button from '../components/button';
import * as Toast from '../components/toast';
import TourComponent from '../components/tour';
import { BibTeXSyntaxError, generateAST, toString } from '../lib/bibtex-parser';
import ConfigContext from '../providers/ConfigProvider';
import EditorContext from '../providers/EditorProvider';
import { styled } from '../stitches.config';

const Grid = styled('div', {
  height: '100%',
  display: 'flex',
  flexFlow: 'row',
  columnGap: '1em',
  fontSize: '14px',
  width: 'calc(100% + 15px)',

  '@sm': { flexFlow: 'column' },
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
      hasSyntaxError?: boolean;
      infos?: number;
      warnings?: number;
      errors?: number;
    }
  ) {
    const { hasSyntaxError = false, infos = 0, warnings = 0, errors = 0, ...divProps } = props;
    return (
      <div
        {...divProps}
        className={`${divProps.className} ${hasSyntaxError ? 'has-syntax-error' : ''}`}
      >
        {props.children}
        <span id="bn-editor-summary">
          <span hidden={!hasSyntaxError}>Syntax Error!</span>
          <span hidden={hasSyntaxError || !infos}>{infos} info(s)</span>
          <span hidden={hasSyntaxError || !warnings}>{warnings} warning(s)</span>
          <span hidden={hasSyntaxError || !errors}>{errors} error(s)</span>
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
  const { content, updateContent } = useContext(EditorContext);

  const ref = useRef<ReactCodeMirrorRef>();
  const normalizeButtonRef = useRef<HTMLButtonElement>();

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
    setHeight(ref.current?.editor?.clientHeight);
    setWidth(ref.current?.editor?.clientWidth);
  }, []);

  const [resultsSummary, setResultsSummary] = useState({
    errors: 0,
    warnings: 0,
    hasSyntaxError: false,
  });

  return (
    <Toast.Provider swipeDirection="right">
      <TourComponent
        tourName="editorTour"
        steps={[
          {
            element: '#bn-editor-codemirror',
            intro: 'You can start by copying your references to this editor.',
            title: 'Bibtex editor',
          },
          {
            element: '#bn-editor-summary',
            intro: 'The editor validates the content and puts marks on important parts',
            title: 'Summary',
          },
          {
            element: '#bn-editor-normalize',
            intro: 'Click on "Normalize" to automatically fix several issues',
            title: 'Normalize',
          },
          {
            element: '#bn-editor-codemirror',
            intro: (
              <div>
                <div style={{ marginBottom: 25 }}>
                  Several issues can be fixed and other ones may need your help. Here, we performed
                  a:
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
              ref.current?.view.update([
                ref.current?.view.state.update({
                  changes: {
                    from: 0,
                    to: ref.current.view.state.doc.length,
                    insert: `@Article{borges2019developers,
  title="How do developers promote open source projects?",
  author={Borges, Hudson Silva and Marco Tulio Valente},
  journal={Computer}, pages={27--33},
  year={19}
}`,
                  },
                } as TransactionSpec),
              ]);
              break;

            case 3:
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
                let diagnotic: Diagnostic[];

                try {
                  [, diagnotic] = generateAST(view.state.doc.toJSON().join('\n'), config.entries);
                } catch (error) {
                  if (error instanceof BibTeXSyntaxError) {
                    lintError = error;
                    diagnotic = lintError.diagnostic;
                  }
                }

                const data = {
                  infos: diagnotic.filter((d) => d.severity === 'info').length,
                  warnings: diagnotic.filter((d) => d.severity === 'warning').length,
                  errors: diagnotic.filter((d) => d.severity === 'error').length,
                  hasSyntaxError: lintError !== undefined,
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
            onClick={() => {
              const currentBibtex = ref.current.view.state.doc.toString();
              const normalizedBibtex = toString(
                generateAST(currentBibtex, config.entries)[0],
                config
              );
              ref.current.view.update([
                ref.current.view.state.update({
                  changes: {
                    from: 0,
                    to: ref.current.view.state.doc.length,
                    insert: normalizedBibtex,
                  },
                } as TransactionSpec),
              ]);

              updateToast({
                opened: true,
                title: 'Normalized',
                description: 'References normalized and editor updated',
              });
            }}
          >
            <IoBuildSharp style={{ height: '1em', width: '1em' }} /> Normalize
          </Button>
          <Button
            id="bn-editor-clipboard"
            size="normal"
            color="normal"
            bordered
            onClick={() => {
              navigator.clipboard.writeText(ref.current.view.state.doc.toJSON().join('\n'));
              updateToast({
                opened: true,
                title: 'Copied',
                description: 'Content copied to clipboard',
              });
            }}
          >
            <IoCopyOutline style={{ height: '1em', width: '1em' }} /> <span>Copy</span>
          </Button>
          <Button
            id="bn-editor-download"
            size="normal"
            color="normal"
            bordered
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
            }}
          >
            <IoCloudDownloadOutline style={{ height: '1em', width: '1em' }} /> <span>Download</span>
          </Button>
          <Button
            id="bn-editor-clear"
            size="normal"
            bordered
            color="warning"
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
  );
}
