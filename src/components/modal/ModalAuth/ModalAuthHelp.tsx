import { useDispatch, useSelector } from 'react-redux';
import ModalBase from '~/components/Base/ModalBase';
import { handleHideAuthModal } from '~/store/auth/auth.slice';
import { IRootState } from '~/store/rootReducer';

const ModalAuthHelp = () => {
  const dispatch = useDispatch();
  const { showModalAuthHelp, contentModalAuthHelp } = useSelector(
    (state: IRootState) => state.auth
  );
  return (
    <ModalBase
      visible={showModalAuthHelp}
      onClose={() => dispatch(handleHideAuthModal())}
    >
      <div
        className={`relative bg-gray-200 rounded-2xl z-2 transition-all w-[90vw] max-w-[400px] px-8 py-[24px] text-main-blue`}
      >
        <h2 className="text-lg font-bold mb-1">{contentModalAuthHelp.name}</h2>
        <p className="text-base text-slate-900">
          {contentModalAuthHelp.helpMessage}
        </p>
      </div>
    </ModalBase>
  );
};

export default ModalAuthHelp;
