import Logo from '../assets/logo.svg';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentTickAtom,
  executionLogLengthAtom,
  sensorFlagAtom,
  flagLogLengthAtom,
} from '../utils/atoms';
import { Link, useNavigate } from 'react-router-dom';
import { DoNotDisturb, EmojiFlags } from '@mui/icons-material';

// Navigation constants
const PAGES = [
  { title: 'Home', href: '/' },
  { title: 'Exploits', href: '/exploits' },
];
const Navigation = ({ className = '' }) => {
  const currentTick = useAtomValue(currentTickAtom);
  const [sensorFlags, setSensorFlags] = useAtom(sensorFlagAtom);
  const flagLogLength = useAtomValue(flagLogLengthAtom);
  const executionLogLength = useAtomValue(executionLogLengthAtom);
  const _navigate = useNavigate(); // This line enables component re-render on navigation

  return (
    <header
      className={`tertiaryColor w-full h-full p-2 rounded-md flex justify-between ${className}`}
    >
      <div className="flex items-center h-full gap-2">
        <Link to={'/'} className="flex items-center h-full gap-2 max-w-[8rem]">
          <img src={Logo} alt="Skjeling logo" className="h-full" />
          <h1 className="flex font-bold mr-4">Angrepa</h1>
        </Link>
        <div className="flex gap-2">
          <p className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40">
            Tick: {currentTick}
          </p>
          <p
            className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40"
            title="Total executions logged"
          >
            {executionLogLength}
          </p>
          <p
            className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40"
            title="Total flags logged"
          >
            {flagLogLength}
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-2">
        <div
          className={`log flex justify-center items-center p-1 rounded-sm text-sm w-36 transition-all select-none cursor-pointer ${
            !sensorFlags
              ? 'bg-[var(--greenBg)] text-[var(--greenText)] hover:brightness-110'
              : 'bg-[var(--redBg)] text-[var(--redText)] hover:brightness-110'
          }`}
          onClick={() => setSensorFlags((val) => !val)}
        >
          {!sensorFlags ? (
            <div className="flex items-center gap-1">
              <EmojiFlags fontSize="inherit" className="translate-y-[1px]" />
              <p>Flags shown</p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <DoNotDisturb fontSize="inherit" className="translate-y-[1px]" />
              <p>Flags censored</p>
            </div>
          )}
        </div>
        {PAGES.map((page) => (
          <Link
            key={page.title}
            className={`primaryColor p-1 px-3 rounded-sm text-sm transition-all hover:!bg-purple-500 ${
              window.location.href.split('/')[3] === page.href.substring(1)
                ? '!bg-purple-600'
                : ''
            }`}
            to={page.href}
          >
            {page.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};
export default Navigation;
