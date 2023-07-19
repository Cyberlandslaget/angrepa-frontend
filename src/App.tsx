import Navigation from './components/Navigation';
import { DUMMY_EXPLOIT_LOG, DUMMY_FLAGSUBMISSION_LOG } from './utils/constants';
import LoggingDisplay from './components/LoggingDisplay';

function App() {
  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr_14rem] gap-3">
      <Navigation />

      <div className="tertiaryColor w-full h-full p-2 rounded-md">Simple</div>
      <div className="flex gap-3">
        <div className="tertiaryColor w-full h-full p-2 rounded-md overflow-auto">
          <LoggingDisplay data={DUMMY_EXPLOIT_LOG} parser={'exploit'} />
        </div>
        <div className="tertiaryColor w-full h-full p-2 rounded-md overflow-auto">
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
