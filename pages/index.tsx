/**
 * @author Hudson Silva Borges
 */
import { useRouter } from 'next/router';
import { HTMLProps, useContext, useRef } from 'react';
import { IoArrowForwardOutline, IoCheckmarkSharp, IoCloudUploadOutline } from 'react-icons/io5';

import Button from '../components/button';
import * as gtag from '../lib/gtag';
import EditorConfig from '../providers/EditorProvider';
import { styled } from './../stitches.config';

const MainComponent = styled('section', {
  display: 'flex',
  justifyItems: 'center',
  fontSize: '1.1em',
  height: '90%',
  minHeight: 350,
  width: '80%',
  margin: 'auto',

  '@sm': {
    display: 'flex',
    flexFlow: 'column',
    fontSize: '1em',
    width: 'calc(100% + 15px)',
  },

  '@md': {
    width: '100%',
  },
});

const Panel = styled('div', {
  flexGrow: 1,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const PanelFeatures = styled(Panel, {});

const PanelTitle = styled('h1', {
  fontWeight: 'bolder',
  fontSize: '2em',
  margin: 0,
  marginBottom: 15,
  color: '$teal9',
  '@sm': { fontSize: '1.75em' },
});

const FeatureItem = styled(
  function (props: HTMLProps<HTMLSpanElement>) {
    return (
      <span {...props}>
        <IoCheckmarkSharp />
        {props.children}
      </span>
    );
  },
  {
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1.25em',
    '& svg': {
      color: '$teal9',
      height: '1em',
      width: '1em',
      fontWeight: 'bolder',
      fontSize: '1.5em',
    },
    '@sm': { lineHeight: '1em' },
  }
);

const MobilePanel = styled(Panel, {
  display: 'none',
  '@sm': { display: 'flex' },
});
const CodeEditorButton = styled(Button, {});

const FileSubmitPanel = styled(Panel, {
  '@sm': { display: 'none' },
  '@md': { fontSize: '0.9em', width: 'min-content' },
});
const PanelSubmitSeparator = styled('span', { padding: '25px 0' });
const PannelSubmitDropArea = styled('div', {
  padding: '2em 4em',
  border: '2px dashed $gray8',
  backgroundColor: '$teal2',
  color: '$gray10',
  borderRadius: '5px',

  '&:hover, &.hover': {
    borderColor: '$teal7',
    color: '$teal9',
    cursor: 'pointer',
  },
});
const OpenFileButton = styled(Button, {});

export default function Home() {
  const inputRef = useRef<HTMLInputElement>();
  const dragRef = useRef<HTMLDivElement>();

  const router = useRouter();

  const { updateContent } = useContext(EditorConfig);

  const disable = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const composer =
    (func1: (...args: any[]) => any, func2: (...args: any[]) => any) =>
    (...params: any[]) => {
      func1(...params);
      func2(...params);
    };

  const fileHandler = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateContent(e.target.result.toString());
      router.push({ pathname: '/editor' });
    };
    reader.readAsText(file);
  };

  return (
    <MainComponent>
      <PanelFeatures>
        <PanelTitle>Normalize your .bib</PanelTitle>
        <FeatureItem>Remove unnecessary fields</FeatureItem>
        <FeatureItem>Get warnings on missing fields</FeatureItem>
        <FeatureItem>Check formatting</FeatureItem>
        <FeatureItem>Auto-formatting basic fields</FeatureItem>
        <FeatureItem>Custom validation rules</FeatureItem>
      </PanelFeatures>
      <MobilePanel>
        <CodeEditorButton
          size="large"
          color="normal"
          bordered
          onMouseEnter={() => router.prefetch('/editor')}
          onClick={() => router.push('/editor')}
        >
          Open editor <IoArrowForwardOutline />
        </CodeEditorButton>
      </MobilePanel>
      <FileSubmitPanel>
        <input
          ref={inputRef}
          type="file"
          accept=".bib"
          hidden
          onInput={(event) => {
            event.preventDefault();
            gtag.event({ action: 'file_submission', category: 'index' });
            fileHandler((event.target as HTMLInputElement).files[0]);
          }}
        />
        <OpenFileButton
          size="large"
          onClick={() => {
            inputRef.current.click();
            gtag.event({ action: 'file_button_click', category: 'index' });
          }}
        >
          <IoCloudUploadOutline style={{ marginRight: 5 }} /> Choose a bibtex file
        </OpenFileButton>
        <PanelSubmitSeparator>-- or --</PanelSubmitSeparator>
        <PannelSubmitDropArea
          ref={dragRef}
          onClick={() => {
            inputRef.current.click();
            gtag.event({ action: 'file_drop_click', category: 'index' });
          }}
          onDragEnter={composer(disable, () => dragRef.current.classList.add('hover'))}
          onDragLeave={composer(disable, () => dragRef.current.classList.remove('hover'))}
          onDragOver={disable}
          onDrop={composer(disable, (event: any) => {
            gtag.event({ action: 'file_drop', category: 'index' });
            if (event.dataTransfer.files && event.dataTransfer.files.length > 0)
              fileHandler(event.dataTransfer.files[0]);
          })}
        >
          Drop your file here
        </PannelSubmitDropArea>
      </FileSubmitPanel>
    </MainComponent>
  );
}
