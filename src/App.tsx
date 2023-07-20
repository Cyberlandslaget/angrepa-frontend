import Navigation from './components/Navigation';
import {
  DUMMY_EXPLOIT_LOG,
  DUMMY_FLAGSUBMISSION_LOG,
  DUMMY_SCOREBOARD_DATA,
} from './utils/constants';
import LoggingDisplay from './components/LoggingDisplay';
import SimpleDisplay from './components/SimpleDisplay';
import { useState } from 'react';

function App() {
  const [pin, setPin] = useState('simple');
  const [fullscreen, setFullscreen] = useState('');

  const updatePin = (display: 'simple' | 'runner' | 'submission') => {
    console.log(display);
    setPin(display);
  };

  const updateFullscreen = (display: 'simple' | 'runner' | 'submission') => {
    if (fullscreen === display) setFullscreen('');
    else setFullscreen(display);
  };

  return (
    <main className="w-full h-full grid grid-cols-2 [grid-template-rows:2.75rem_1fr_14rem] gap-3">
      <Navigation className="[grid-column:span_2]" />

      <div
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto ${
          pin === 'simple' ? '!order-1 [grid-column:span_2] simple' : 'order-3'
        } ${
          fullscreen === 'simple'
            ? 'absolute z-20 mt-[3.5rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
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
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto overflow-x-hidden order-2 ${
          pin === 'runner' ? '!order-1 [grid-column:span_2] runner' : ''
        } ${
          fullscreen === 'runner'
            ? 'absolute z-20 mt-[3.5rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
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
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto order-4 ${
          pin === 'submission' ? '!order-1 [grid-column:span_2] submission' : ''
        } ${
          fullscreen === 'submission'
            ? 'absolute z-20 mt-[3.5rem] top-3 left-3 [width:calc(100%-1.5rem)] [height:calc(100%-2.25rem-2.75rem)] fullscreen'
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
