import Navigation from 'components/Navigation';
import {
  DUMMY_EXPLOIT_LOG,
  DUMMY_FLAGSUBMISSION_LOG,
  DUMMY_SCOREBOARD_DATA,
} from 'utils/constants';
import LoggingDisplay from 'components/LoggingDisplay';
import SimpleDisplay from 'components/SimpleDisplay';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HomePanelEnum } from 'utils/enums';
import PinButtonsWrapper from 'components/PinButtonsWrapper';

export default function Home() {
  const [pin, setPin] = useState(HomePanelEnum.Simple);
  const [fullscreen, setFullscreen] = useState<HomePanelEnum | null>(null);
  const [activeHandler, setActiveHandler] = useState('');
  const resizableRef = useRef(null);

  const updatePin = (display: HomePanelEnum) => {
    console.log(display);
    setPin(display);
  };

  const updateFullscreen = (display: HomePanelEnum) => {
    if (fullscreen === display) setFullscreen(null);
    else setFullscreen(display);
  };

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      if (resizableRef.current === null) return;
      if (activeHandler === 'row') {
        // Get the current mouse position and calculate current percentage of the screen
        const pos = 100 - (e.clientY / window.innerHeight) * 100;
        if (pos < 4 || pos > 87) return;
        (
          resizableRef.current as HTMLElement
        ).style.gridTemplateRows = `2.75rem 1fr 0.2rem ${pos}%`;
      } else if (activeHandler === 'col') {
        const pos = 100 - (e.clientX / window.innerWidth) * 100;
        if (pos < 20 || pos > 80) return;
        (
          resizableRef.current as HTMLElement
        ).style.gridTemplateColumns = `1fr 0.2rem ${pos}%`;
      }
    },
    [resizableRef, activeHandler]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveHandler('');
    removeListeners();
  }, [setActiveHandler, removeListeners]);

  useEffect(() => {
    if (activeHandler !== '') {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }
    return () => {
      removeListeners();
    };
  }, [activeHandler, mouseMove, mouseUp, removeListeners]);

  return (
    <main
      ref={resizableRef}
      className="w-full h-full grid [grid-template-columns:1fr_0.2rem_50%] [grid-template-rows:2.75rem_1fr_0.2rem_35%] gap-[0.5rem]"
    >
      <Navigation className="[grid-column:span_3]" />

      <PinButtonsWrapper
        className={`${pin === 'runner' ? 'order-4' : 'order-5'}`}
        pin={pin === HomePanelEnum.Simple}
        fullscreen={fullscreen === HomePanelEnum.Simple}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Simple)}
        updatePin={() => updatePin(HomePanelEnum.Simple)}
      >
        <SimpleDisplay
          data={{
            scoreboard: DUMMY_SCOREBOARD_DATA,
            flag: DUMMY_FLAGSUBMISSION_LOG,
          }}
        />
      </PinButtonsWrapper>

      <div
        className={`w-full h-full [grid-column:span_3] tertiaryColor brightness-125 order-2 cursor-row-resize ${
          fullscreen !== null ? 'opacity-0 pointer-events-none' : ''
        }`}
        onMouseDown={() => setActiveHandler('row')}
      ></div>

      <PinButtonsWrapper
        className="order-2"
        pin={pin === HomePanelEnum.Runner}
        fullscreen={fullscreen === HomePanelEnum.Runner}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Runner)}
        updatePin={() => updatePin(HomePanelEnum.Runner)}
      >
        <LoggingDisplay data={DUMMY_EXPLOIT_LOG} parser={'exploit'} />
      </PinButtonsWrapper>

      <div
        className={`w-full h-[calc(100%+0.5rem)] -translate-y-2 tertiaryColor order-4 brightness-125 cursor-col-resize ${
          fullscreen !== null ? 'opacity-0 pointer-events-none' : ''
        }`}
        onMouseDown={() => setActiveHandler('col')}
      ></div>

      <PinButtonsWrapper
        className="order-5"
        pin={pin === HomePanelEnum.Submission}
        fullscreen={fullscreen === HomePanelEnum.Submission}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Submission)}
        updatePin={() => updatePin(HomePanelEnum.Submission)}
      >
        <LoggingDisplay data={DUMMY_FLAGSUBMISSION_LOG} parser={'submission'} />
      </PinButtonsWrapper>
    </main>
  );
}
