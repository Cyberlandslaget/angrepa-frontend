import Logo from '../assets/logo.svg';
import { useAtom, useAtomValue } from 'jotai';
import { PAGES } from '../utils/constants';
import { currentTickAtom } from '../utils/atoms';

const Navigation = () => {
  const currentTick = useAtomValue(currentTickAtom);

  return (
    <header className="tertiaryColor w-full h-full p-2 rounded-md flex justify-between">
      <div className="flex items-center h-full gap-2">
        <img src={Logo} alt="Skjeling logo" className="h-full" />
        <h1 className="flex font-bold mr-4">Skjeling</h1>
        <div className="flex gap-2">
          <p className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40">
            Tick: {currentTick}
          </p>
          <p
            className="flex px-3 py-[4px] text-xs rounded-sm bg-slate-950 bg-opacity-40"
            title="Total angripa runs logged"
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
        {PAGES.map((page) => (
          <a
            key={page.title}
            className={`primaryColor p-1 px-3 rounded-sm text-sm ${
              window.location.href.split('/')[3] === page.href.substring(1)
                ? '!bg-purple-600'
                : ''
            }`}
            href={page.href}
          >
            {page.title}
          </a>
        ))}
      </nav>
    </header>
  );
};
export default Navigation;
