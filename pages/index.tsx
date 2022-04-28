/**
 * @author Hudson Silva Borges
 */
import { useRouter } from 'next/router';
import { HTMLProps, useContext, useRef } from 'react';
import { IoArrowForwardOutline, IoCheckmarkSharp, IoCloudUploadOutline } from 'react-icons/io5';

import Button from '../components/button';
import EditorConfig from '../providers/EditorProvider';
import { styled } from './../stitches.config';

const MainComponent = styled('section', {
  display: 'flex',
  justifyItems: 'center',
  fontSize: '1.1em',
  minHeight: '90%',
  width: '80%',
  margin: 'auto',

  '@sm': {
    display: 'block',
    fontSize: '1em',
    width: 'calc(100% + 15px)',
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

const PanelFeatures = styled(Panel, {
  '@sm': { margin: '4em 0' },
});

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
    '& svg': {
      color: '$teal9',
      height: '1em',
      width: '1em',
      fontWeight: 'bolder',
      fontSize: '1.5em',
    },
  }
);

const MobilePanel = styled(Panel, {
  display: 'none',
  '@sm': { display: 'flex' },
});
const CodeEditorButton = styled(Button, {});

const FileSubmitPanel = styled(Panel, { '@sm': { display: 'none' } });
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
        <FeatureItem>Create validation rules</FeatureItem>
      </PanelFeatures>
      <MobilePanel>
        <CodeEditorButton
          size="large"
          color="normal"
          bordered
          onMouseEnter={() => router.prefetch('/editor')}
          onClick={() => router.push('/editor')}
        >
          Open code editor <IoArrowForwardOutline />
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
            fileHandler((event.target as HTMLInputElement).files[0]);
          }}
        />
        <OpenFileButton size="large" onClick={() => inputRef.current.click()}>
          <IoCloudUploadOutline style={{ marginRight: 5 }} /> Choose a bibtex file
        </OpenFileButton>
        <PanelSubmitSeparator>-- or --</PanelSubmitSeparator>
        <PannelSubmitDropArea
          ref={dragRef}
          onClick={() => inputRef.current.click()}
          onDragEnter={composer(disable, () => dragRef.current.classList.add('hover'))}
          onDragLeave={composer(disable, () => dragRef.current.classList.remove('hover'))}
          onDragOver={disable}
          onDrop={composer(disable, (event: any) =>
            event.dataTransfer.files && event.dataTransfer.files.length > 0
              ? fileHandler(event.dataTransfer.files[0])
              : null
          )}
        >
          Drop your file here
        </PannelSubmitDropArea>
      </FileSubmitPanel>
    </MainComponent>
  );
}
