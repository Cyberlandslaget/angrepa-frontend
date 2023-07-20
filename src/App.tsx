import Navigation from './components/Navigation';
import {
  DUMMY_EXPLOIT_LOG,
  DUMMY_FLAGSUBMISSION_LOG,
  DUMMY_SCOREBOARD_DATA,
} from './utils/constants';
import LoggingDisplay from './components/LoggingDisplay';
import SimpleDisplay from './components/SimpleDisplay';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [pin, setPin] = useState('simple');
  const [fullscreen, setFullscreen] = useState('');
  const [activeHandler, setActiveHandler] = useState('');
  const resizableRef = useRef(null);

  const updatePin = (display: 'simple' | 'runner' | 'submission') => {
    console.log(display);
    setPin(display);
  };

  const updateFullscreen = (display: 'simple' | 'runner' | 'submission') => {
    if (fullscreen === display) setFullscreen('');
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

      <div
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto ${
          pin === 'simple'
            ? '!order-1 [grid-column:span_3] simple'
            : pin === 'runner'
            ? 'order-4'
            : 'order-5'
        } ${
          fullscreen === 'simple'
            ? 'absolute z-20 mt-[3.25rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
            : ''
        }`}
      >
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center [.simple_&]:w-[7.25rem]">
          <button
            className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.simple_&]:!bg-black [.simple_&]:cursor-default"
            onClick={() => updatePin('simple')}
          >
            {pin === 'simple' ? 'Pinned' : 'Pin'}
          </button>
          <button
            className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.fullscreen_&]:!bg-black"
            onClick={() => updateFullscreen('simple')}
          >
            Fullscreen
          </button>
        </div>
        <SimpleDisplay
          data={{
            scoreboard: DUMMY_SCOREBOARD_DATA,
            flag: DUMMY_FLAGSUBMISSION_LOG,
          }}
        />
      </div>

      <div
        className={`w-full h-full [grid-column:span_3] tertiaryColor brightness-125 order-2 cursor-row-resize ${
          fullscreen !== '' ? 'opacity-0 pointer-events-none' : ''
        }`}
        onMouseDown={() => setActiveHandler('row')}
      ></div>

      <div
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto overflow-x-hidden order-2 ${
          pin === 'runner' ? '!order-1 [grid-column:span_3] runner' : ''
        } ${
          fullscreen === 'runner'
            ? 'absolute z-20 mt-[3.25rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
            : ''
        }`}
      >
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center [.runner_&]:w-[7.25rem]">
          <button
            className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.runner_&]:!bg-black [.runner_&]:cursor-default"
            onClick={() => updatePin('runner')}
          >
            {pin === 'runner' ? 'Pinned' : 'Pin'}
          </button>
          <button
            className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.fullscreen_&]:!bg-black"
            onClick={() => updateFullscreen('runner')}
          >
            Fullscreen
          </button>
        </div>
        <LoggingDisplay data={DUMMY_EXPLOIT_LOG} parser={'exploit'} />
      </div>

      <div
        className={`w-full h-[calc(100%+0.5rem)] -translate-y-2 tertiaryColor order-4 brightness-125 cursor-col-resize ${
          fullscreen !== '' ? 'opacity-0 pointer-events-none' : ''
        }`}
        onMouseDown={() => setActiveHandler('col')}
      ></div>

      <div
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto order-5 ${
          pin === 'submission' ? '!order-1 [grid-column:span_3] submission' : ''
        } ${
          fullscreen === 'submission'
            ? 'absolute z-20 mt-[3.25rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
            : ''
        }`}
      >
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center [.submission_&]:w-[7.25rem]">
          <button
            className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.submission_&]:!bg-black [.submission_&]:cursor-default"
            onClick={() => updatePin('submission')}
          >
            {pin === 'submission' ? 'Pinned' : 'Pin'}
          </button>
          <button
            className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all [.fullscreen_&]:!bg-black"
            onClick={() => updateFullscreen('submission')}
          >
            Fullscreen
          </button>
        </div>
        <LoggingDisplay data={DUMMY_FLAGSUBMISSION_LOG} parser={'submission'} />
      </div>
    </main>
  );
}

export default App;
