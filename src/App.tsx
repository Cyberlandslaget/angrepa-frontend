import Navigation from './components/Navigation';
import { DUMMY_EXPLOIT_LOG, DUMMY_FLAGSUBMISSION_LOG } from './utils/constants';
import LoggingDisplay from './components/LoggingDisplay';

function App() {
  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr_14rem] gap-3">
      <Navigation />

      <div className="tertiaryColor w-full h-full p-2 rounded-md">
        <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center">
          <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
            Pin
          </button>
          <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
            Fullscreen
          </button>
        </div>
        Simple
      </div>

      <div className="flex gap-3">
        <div className="tertiaryColor w-full h-full p-2 rounded-md overflow-auto overflow-x-hidden">
          <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center">
            <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
              Pin
            </button>
            <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
              Fullscreen
            </button>
          </div>
          <LoggingDisplay data={DUMMY_EXPLOIT_LOG} parser={'exploit'} />
        </div>

        <div className="tertiaryColor w-full h-full p-2 rounded-md overflow-auto">
          <div className="secondaryColor sticky flex top-0 w-[6.25rem] h-6 -my-1 z-10 -translate-y-2 -translate-x-2 rounded-br-md text-xs gap-1 p-1 items-center">
            <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
              Pin
            </button>
            <button className="px-2 bg-slate-950 bg-opacity-60 text-[0.6rem] rounded-sm hover:bg-black transition-all">
              Fullscreen
            </button>
          </div>
          <LoggingDisplay
            data={DUMMY_FLAGSUBMISSION_LOG}
            parser={'submission'}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
