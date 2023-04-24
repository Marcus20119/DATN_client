import { useDispatch, useSelector } from 'react-redux';
import ModalBase from '~/components/Base/ModalBase';
import { ButtonPrimary } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { handleHideBaseModal } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';

const ModalBaseConfirm = () => {
  const dispatch = useDispatch();
  const {
    showModalConfirm,
    modalConfirmAction,
    modalConfirmData,
    loadingModalConfirm,
  } = useSelector((state: IRootState) => state.base);

  return (
    <ModalBase
      visible={showModalConfirm}
      onClose={() => dispatch({ type: 'base/handleHideBaseModal' })}
    >
      <div
        className={`relative bg-white rounded-2xl z-2 transition-all w-[90vw] max-w-[400px] px-8 py-[24px] text-main-blue`}
      >
        <div className="flex flex-col gap-6 w-full">
          <Heading
            as="h2"
            text={modalConfirmData.title}
            className="block w-full pb-1 text-4xl font-bold border-b border-b-main-blue"
          />
          <span className="text-xl w-full text-center">
            {modalConfirmData.description}
          </span>

          <div className="grid grid-cols-2 gap-3 w-full">
            <ButtonPrimary
              onClick={() => {
                dispatch(modalConfirmAction);
              }}
              isSubmitting={loadingModalConfirm}
            >
              {modalConfirmData.confirmButtonLabel}
            </ButtonPrimary>
            <ButtonPrimary
              additionalClass="!bg-gray-300 !text-black"
              onClick={() => dispatch(handleHideBaseModal())}
            >
              Hủy
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalBaseConfirm;
