import { Step } from 'intro.js-react';
import 'intro.js/introjs.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Steps = dynamic(
  async () => {
    const { Steps } = await import('intro.js-react');
    return Steps;
  },
  { ssr: false }
);

export default function TourComponent(props: {
  steps: (Step & { title: string })[];
  tourName: string;
  onBeforeChange?: (nextPosition: number) => any;
}) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 500);
  }, []);

  const key = `BN_TOUR_${props.tourName.toUpperCase()}`;

  return (
    <>
      <style>{`
        .introjs-custom .introjs-tooltiptext {
          text-align: center;
          vertical-align: middle;
        }

        .introjs-custom .introjs-tooltip-title {
          color: var(--colors-teal9);
        }
      `}</style>
      <Steps
        enabled={
          (typeof localStorage !== 'undefined' ? localStorage.getItem(key) !== '1' : true) &&
          mounted
        }
        steps={props.steps.map((step) => ({ ...step, tooltipClass: 'introjs-custom' }))}
        initialStep={0}
        onBeforeChange={props.onBeforeChange}
        onExit={(index) => {
          if (index !== undefined) localStorage.setItem(key, '1');
        }}
        options={{ doneLabel: 'Done', disableInteraction: true }}
      />
    </>
  );
}
