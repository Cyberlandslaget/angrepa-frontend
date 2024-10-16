import {
  DUMMY_EXPLOIT_LOG,
  DUMMY_FLAGSUBMISSION_LOG,
  DUMMY_SCOREBOARD_DATA,
  FLAG_CODE,
} from 'utils/constants';
import LoggingDisplay from 'components/LoggingDisplay';
import SimpleDisplay from 'components/SimpleDisplay';
import { useRef, useState } from 'react';
import { DragDirection, HomePanelEnum } from 'utils/enums';
import PinButtonsWrapper from 'components/PinButtonsWrapper';
import useResizeableComponent from 'utils/useResizeableComponent';
import { executionLogAtom, scoreboardDataAtom, flagLogAtom } from 'utils/atoms';
import { useAtomValue } from 'jotai';
import { ExecutionType, FlagType } from 'utils/types';
import LogModal from 'components/LogModal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const scoreboardData = useAtomValue(scoreboardDataAtom);
  const flagLog = useAtomValue(flagLogAtom);
  const executionLog = useAtomValue(executionLogAtom);
  const [pin, setPin] = useState(HomePanelEnum.Simple);
  const [fullscreen, setFullscreen] = useState<HomePanelEnum | null>(null);
  const navigate = useNavigate();

  const showDetailedLog = (data: unknown) => {
    const log = data as ExecutionType;
    navigate(`${location.pathname}?log=${log.id}${location.hash}`);
  };

  const resizableRef = useRef<HTMLElement | null>(null);
  const { setActiveHandler } = useResizeableComponent(resizableRef);

  const updatePin = (display: HomePanelEnum) => {
    setPin(display);
  };
  const updateFullscreen = (display: HomePanelEnum) => {
    if (fullscreen === display) setFullscreen(null);
    else setFullscreen(display);
  };

  return (
    <main
      ref={resizableRef}
      className="w-full h-[calc(100vh-5rem)] grid [grid-template-columns:1fr_0.2rem_50%] [grid-template-rows:1fr_0.2rem_35%] gap-[0.5rem]"
    >
      <PinButtonsWrapper
        className={pin === HomePanelEnum.Runner ? 'order-4' : 'order-5'}
        pin={pin === HomePanelEnum.Simple}
        fullscreen={fullscreen === HomePanelEnum.Simple}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Simple)}
        updatePin={() => updatePin(HomePanelEnum.Simple)}
      >
        <SimpleDisplay
          extended={fullscreen === HomePanelEnum.Simple}
          data={{
            scoreboard: scoreboardData || DUMMY_SCOREBOARD_DATA,
            flag: flagLog || (DUMMY_FLAGSUBMISSION_LOG as FlagType[]),
          }}
        />
      </PinButtonsWrapper>

      <div
        className={`w-full h-full [grid-column:span_3] tertiaryColor brightness-125 order-2 cursor-row-resize ${
          fullscreen !== null ? 'opacity-0 pointer-events-none' : ''
        }`}
        onMouseDown={() => setActiveHandler(DragDirection.Row)}
      ></div>

      <PinButtonsWrapper
        className="order-2"
        pin={pin === HomePanelEnum.Runner}
        fullscreen={fullscreen === HomePanelEnum.Runner}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Runner)}
        updatePin={() => updatePin(HomePanelEnum.Runner)}
      >
        <LoggingDisplay
          data={executionLog || (DUMMY_EXPLOIT_LOG as ExecutionType[])}
          parser={'exploit'}
          extended={fullscreen === HomePanelEnum.Runner}
          filters={['0', '1', '2', '3']}
          onClick={showDetailedLog}
        />
      </PinButtonsWrapper>

      <div
        className={`w-full h-[calc(100%+0.5rem)] -translate-y-2 tertiaryColor order-4 brightness-125 cursor-col-resize ${
          fullscreen !== null ? 'opacity-0 pointer-events-none' : ''
        }`}
        onMouseDown={() => setActiveHandler(DragDirection.Column)}
      ></div>

      <PinButtonsWrapper
        className="order-5"
        pin={pin === HomePanelEnum.Submission}
        fullscreen={fullscreen === HomePanelEnum.Submission}
        updateFullscreen={() => updateFullscreen(HomePanelEnum.Submission)}
        updatePin={() => updatePin(HomePanelEnum.Submission)}
      >
        <LoggingDisplay
          data={flagLog || (DUMMY_FLAGSUBMISSION_LOG as FlagType[])}
          parser={'submission'}
          extended={fullscreen === HomePanelEnum.Submission}
          filters={Object.keys(FLAG_CODE)}
        />
      </PinButtonsWrapper>

      <LogModal executions={executionLog} log={flagLog} />
    </main>
  );
}
