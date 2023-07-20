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
  const [fullscreen, setFullscreen] = useState(false);

  const updatePin = (display: 'simple' | 'runner' | 'submission') => {
    console.log(display);
    setPin(display);
  };

  return (
    <main className="w-full h-full grid grid-cols-2 [grid-template-rows:2.75rem_1fr_14rem] gap-3">
      <Navigation className="[grid-column:span_2]" />

      <div
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto ${
          pin === 'simple' ? '!order-1 [grid-column:span_2]' : 'order-3'
        }`}
      >
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center">
          <button
            className={`px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all ${
              pin === 'simple' ? '!bg-black cursor-default' : ''
            }`}
            onClick={() => updatePin('simple')}
          >
            {pin === 'simple' ? 'Pinned' : 'Pin'}
          </button>
          <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
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
          pin === 'runner' ? '!order-1 [grid-column:span_2]' : ''
        }`}
      >
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center">
          <button
            className={`px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all ${
              pin === 'runner' ? '!bg-black cursor-default' : ''
            }`}
            onClick={() => updatePin('runner')}
          >
            {pin === 'runner' ? 'Pinned' : 'Pin'}
          </button>
          <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
            Fullscreen
          </button>
        </div>
        <LoggingDisplay data={DUMMY_EXPLOIT_LOG} parser={'exploit'} />
      </div>

      <div
        className={`tertiaryColor w-full h-full p-2 rounded-md overflow-auto order-4 ${
          pin === 'submission' ? '!order-1 [grid-column:span_2]' : ''
        }`}
      >
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center">
          <button
            className={`px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all ${
              pin === 'submission' ? '!bg-black cursor-default' : ''
            }`}
            onClick={() => updatePin('submission')}
          >
            {pin === 'submission' ? 'Pinned' : 'Pin'}
          </button>
          <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
            Fullscreen
          </button>
        </div>
        <LoggingDisplay data={DUMMY_FLAGSUBMISSION_LOG} parser={'submission'} />
      </div>
    </main>
  );
}

export default App;
