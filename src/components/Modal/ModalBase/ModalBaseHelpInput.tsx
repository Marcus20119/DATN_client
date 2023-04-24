import { useDispatch, useSelector } from 'react-redux';
import ModalBase from '~/components/Base/ModalBase';
import { handleHideBaseModal } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';

const ModalBaseHelpInput = () => {
  const dispatch = useDispatch();
  const { showModalHelpInput, modalHelpInputData } = useSelector(
    (state: IRootState) => state.base
  );
  return (
    <ModalBase
      visible={showModalHelpInput}
      onClose={() => dispatch(handleHideBaseModal())}
    >
      <div
        className={`relative bg-gray-200 rounded-2xl z-2 transition-all w-[90vw] max-w-[400px] px-8 py-[24px] text-main-blue`}
      >
        <h2 className="text-lg font-bold mb-1">{modalHelpInputData.label}</h2>
        <p className="text-base text-slate-900">
          {modalHelpInputData.helpMessage}
        </p>
      </div>
    </ModalBase>
  );
};

export default ModalBaseHelpInput;
