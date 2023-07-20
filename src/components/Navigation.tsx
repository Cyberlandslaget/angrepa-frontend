import Logo from '../assets/logo.svg';
import { useAtom, useAtomValue } from 'jotai';
import { PAGES } from '../utils/constants';
import { currentTickAtom, sensorFlagAtom } from '../utils/atoms';
import { Link } from 'react-router-dom';
import { DoNotDisturb, EmojiFlags } from '@mui/icons-material';
import useTheme from '@mui/material/styles/useTheme';

const Navigation = ({ className = '' }) => {
  const currentTick = useAtomValue(currentTickAtom);
  const [sensorFlags, setSensorFlags] = useAtom(sensorFlagAtom);
  const theme = useTheme();

  return (
    <header
      className={`tertiaryColor w-full h-full p-2 rounded-md flex justify-between ${className}`}
    >
      <div className="flex items-center h-full gap-2">
        <img src={Logo} alt="Skjeling logo" className="h-full" />
        <h1 className="flex font-bold mr-4">Angrapa</h1>
        <div className="flex gap-2">
          <p className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40">
            Tick: {currentTick}
          </p>
          <p
            className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40"
            title="Total angrapa runs logged"
          >
            {1432}
          </p>
          <p
            className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40"
            title="Total flags logged"
          >
            {102}
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-2">
        <div
          className={"p-1 px-3 rounded-sm text-sm transition-all select-none"}
          onClick={() => setSensorFlags(val => !val)}
          style={{backgroundColor: !sensorFlags ? theme.palette.error.dark : theme.palette.success.dark}}
        >
          {!sensorFlags ?
           <div><DoNotDisturb fontSize='small'/> Sensor flags</div> :
           <div><EmojiFlags fontSize='small'/> Show flags</div>}
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
