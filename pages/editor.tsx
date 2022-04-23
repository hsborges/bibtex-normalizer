import { RefAttributes, useContext, useEffect, useRef, useState } from 'react';

import { simpleMode } from '@codemirror/legacy-modes/mode/simple-mode';
import { lintGutter, linter } from '@codemirror/lint';
import { StreamLanguage } from '@codemirror/stream-parser';
import {
  ClipboardCopyIcon,
  Cross2Icon,
  DownloadIcon,
  EraserIcon,
  MagicWandIcon,
} from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import CodeMirror, { ReactCodeMirrorRef, TransactionSpec } from '@uiw/react-codemirror';

import Button from '../components/button';
import * as Toast from '../components/toast';
import { generateAST, toString } from '../lib/bibtex-parser';
import ConfigContext from '../providers/ConfigProvider';
import EditorContext from '../providers/EditorProvider';

const Grid = styled('div', {
  height: '100%',
  display: 'flex',
  flexFlow: 'row',
  columnGap: '1em',
});

const StyledCodeMirror = styled(CodeMirror, {
  width: 'calc(100% + 15px)',
  height: '100%',
  maxHeight: '100%',
  border: '1px solid $violet6',

  '& .cm-scroller': { overflow: 'scroll' },
});

const ActionsMenu = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  rowGap: 10,
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
      token: ['', 'variable-2', '', 'variable-3'],
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
  const [height, setHeight] = useState<number>(null);

  const [toast, setToast] = useState<{ opened: boolean; title?: string; description?: string }>({
    opened: false,
  });

  const updateToast = (status: typeof toast) => {
    setToast({ opened: false });
    setTimeout(() => setToast(status), 250);
  };

  useEffect(() => setHeight(ref.current?.editor?.clientHeight));

  return (
    <Toast.Provider swipeDirection="right">
      <Grid>
        <StyledCodeMirror
          ref={ref}
          height={height ? `${height}px` : '100%'}
          maxHeight={height ? `${height}px` : '100%'}
          basicSetup
          placeholder={`// Paste your bibtex content here.`}
          value={content || ''}
          extensions={[
            linter((view) => {
              const [, diagnotic] = generateAST(view.state.doc.toJSON().join('\n'), config.entries);
              return diagnotic;
            }),
            lintGutter(),
            StreamLanguage.define(simpleMode(bibtexSyntaxHighlight)),
          ]}
          onChange={(value) => updateContent(value)}
        />
        <ActionsMenu>
          <Button
            size="normal"
            onClick={() => {
              const currentBibtex = ref.current.view.state.doc.toString();
              const normalizedBibtex = toString(generateAST(currentBibtex, config.entries)[0]);
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
            <MagicWandIcon style={{ height: '1em', width: '1em' }} /> Normalize
          </Button>
          <Button
            size="normal"
            color="transparent"
            onClick={() => {
              navigator.clipboard.writeText(ref.current.view.state.doc.toJSON().join('\n'));
              updateToast({
                opened: true,
                title: 'Copied',
                description: 'Content copied to clipboard',
              });
            }}
          >
            <ClipboardCopyIcon style={{ height: '1em', width: '1em' }} /> Copy
          </Button>
          <Button
            size="normal"
            color="transparent"
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
            <DownloadIcon style={{ height: '1em', width: '1em' }} /> Download
          </Button>
          <Button
            size="normal"
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
                description: 'Content totally cleared',
              });
            }}
          >
            <EraserIcon style={{ height: '1em', width: '1em' }} /> Clear
          </Button>
        </ActionsMenu>

        <Toast.Root
          open={toast.opened}
          onOpenChange={(opened) => setToast({ ...toast, opened })}
          duration={3000}
        >
          <Toast.Title>✔ | {toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.Action asChild altText="Close">
            <Button color="transparent" bordered={false}>
              <Cross2Icon />
            </Button>
          </Toast.Action>
        </Toast.Root>

        <Toast.Viewport />
      </Grid>
    </Toast.Provider>
  );
}
