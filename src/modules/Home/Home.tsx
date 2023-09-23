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
import { Modal } from '@mui/material';

export default function Home() {
  const scoreboardData = useAtomValue(scoreboardDataAtom);
  const flagLog = useAtomValue(flagLogAtom);
  const executionLog = useAtomValue(executionLogAtom);
  const [pin, setPin] = useState(HomePanelEnum.Simple);
  const [fullscreen, setFullscreen] = useState<HomePanelEnum | null>(null);
  const [modal, setModal] = useState<{
    visible: boolean;
    data: ExecutionType | null;
  }>({ data: null, visible: false });
  const resizableRef = useRef<HTMLElement | null>(null);
  const { setActiveHandler } = useResizeableComponent(resizableRef);

  const updatePin = (display: HomePanelEnum) => {
    setPin(display);
  };
  const updateFullscreen = (display: HomePanelEnum) => {
    if (fullscreen === display) setFullscreen(null);
    else setFullscreen(display);
  };
  const showDetailedLog = (data: unknown) => {
    const log = data as ExecutionType;
    console.log(log);
    setModal({ data: log, visible: true });
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

      <Modal
        open={modal.visible}
        onClose={() => setModal((modal) => ({ ...modal, visible: false }))}
      >
        <div
          className={`secondaryColor border-2 border-white border-opacity-4s0 p-3 rounded-md shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 flex flex-col gap-2`}
        >
          <div className="flex justify-end h-6">
            <button
              className="bg-black rounded-sm text-xs px-5"
              onClick={() =>
                setModal((modal) => ({ ...modal, visible: false }))
              }
            >
              close
            </button>
          </div>
          {modal.data && (
            <>
              <div className="flex flex-col gap-3 h-full">
                <div className="flex gap-3 w-full h-full">
                  <div className="w-1/4 tertiaryColor text-sm rounded-sm">
                    <p>ID: {modal.data.id}</p>
                    <p>Exploit ID: {modal.data.exploit_id}</p>
                    <p>Target ID: {modal.data.target_id}</p>
                    <p>Exit code: {modal.data.exit_code}</p>
                    <p>Service: {modal.data.service}</p>
                    <p>Team: {modal.data.team}</p>
                    <p>Started at: {modal.data.started_at}</p>
                    <p>Finished at: {modal.data.finished_at}</p>
                  </div>

                  <textarea
                    className={
                      'text-sm p-2 tertiaryColor w-full h-full resize-none focus-visible:outline-none rounded-sm'
                    }
                    value={modal.data.output}
                    readOnly
                  />
                </div>
                <div className="w-full h-[7.5rem] tertiaryColor rounded-sm p-3 pb-0">
                  <LoggingDisplay
                    data={
                      flagLog?.filter(
                        (flag) => flag.execution_id === modal?.data?.id
                      ) as FlagType[]
                    }
                    parser={'submission'}
                    extended={fullscreen === HomePanelEnum.Submission}
                    filters={Object.keys(FLAG_CODE)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </main>
  );
}
