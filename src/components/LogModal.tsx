import { Modal } from '@mui/material';
import { FLAG_CODE } from 'utils/constants';
import { ExecutionType, FlagType } from 'utils/types';
import LoggingDisplay from './LoggingDisplay';

type ModalType = {
  data: ExecutionType | null;
  visible: boolean;
};
type Props = {
  modal: ModalType;
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
  log: FlagType[] | null;
};
const LogModal = ({ modal, setModal, log }: Props) => {
  return (
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
            onClick={() => setModal((modal) => ({ ...modal, visible: false }))}
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
              <div className="w-full h-[4rem] tertiaryColor rounded-sm p-3 pb-0">
                <LoggingDisplay
                  data={
                    log?.filter(
                      (flag) => flag.execution_id === modal?.data?.id
                    ) ?? []
                  }
                  parser={'submission'}
                  extended={false}
                  filters={Object.keys(FLAG_CODE)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
export default LogModal;
