import ModalBaseConfirm from './ModalBase/ModalBaseConfirm';
import ModalBaseHelpInput from './ModalBase/ModalBaseHelpInput';

type IRootModal = {};

const RootModal: React.FC<IRootModal> = () => {
  return (
    <>
      <ModalBaseConfirm />

      <ModalBaseHelpInput />
    </>
  );
};

export default RootModal;
