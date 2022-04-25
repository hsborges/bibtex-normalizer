/**
 * @author Hudson Silva Borges
 */
import { useRouter } from 'next/router';
import { HTMLProps, useContext, useRef } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';

import Button from '../components/button';
import EditorConfig from '../providers/EditorProvider';

const MainComponent = styled('section', {
  display: 'flex',
  justifyItems: 'center',
  fontSize: '1.25em',
  minHeight: '90%',
  width: '80%',
  margin: 'auto',
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
});
const PanelFeatureItem = styled(
  (props: HTMLProps<HTMLSpanElement>) => (
    <span {...props}>
      <CheckIcon />
      {props.children}
    </span>
  ),
  {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: '$violet9',
      height: '1em',
      width: '1em',
      fontWeight: 'bolder',
      fontSize: '1.5em',
    },
  }
);

const PanelSubmit = styled(Panel, {});
const PanelSubmitSeparator = styled('span', {
  padding: '25px 0',
});
const PannelSubmitDropArea = styled('div', {
  padding: '2em 4em',
  border: '2px dashed $gray8',
  backgroundColor: '$violet3',
  color: '$gray10',
  borderRadius: '5px',

  '&:hover, &.hover': {
    borderColor: '$violet7',
    color: '$violet9',
    cursor: 'pointer',
  },
});

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
        <PanelFeatureItem>Remove unnecessary fields</PanelFeatureItem>
        <PanelFeatureItem>Get warnings on missing fields</PanelFeatureItem>
        <PanelFeatureItem>Check formatting</PanelFeatureItem>
        <PanelFeatureItem>Auto-formatting basic fields</PanelFeatureItem>
      </PanelFeatures>
      <PanelSubmit>
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
        <Button size="large" onClick={() => inputRef.current.click()}>
          Choose a bibtex file
        </Button>
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
      </PanelSubmit>
    </MainComponent>
  );
}
