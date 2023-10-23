import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';
import { configurationAtom } from 'utils/atoms';

function Configuration() {
  const [configuration, setConfiguration] = useAtom(configurationAtom);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = event.target.value;
    setConfiguration((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('configuration', JSON.stringify(configuration));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [configuration]);

  return (
    <main className="w-full h-full flex flex-col gap-3">
      <div className="tertiaryColor w-full h-full p-2 rounded-md flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 items-center p-2 [background:rgba(255,255,255,0.05)] rounded-md">
          <h2 className="text-md">Configuration:</h2>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2 items-center p-2 [background:rgba(255,255,255,0.05)] rounded-md">
            <h2 className="text-sm">Minutes to fetch:</h2>
            <input
              className="bg-slate-900 py-1 px-2 text-white rounded-sm text-md text-right"
              type="text"
              onChange={(e) => onChangeHandler(e, 'minutesToFetch')}
              value={configuration.minutesToFetch}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
export default Configuration;
