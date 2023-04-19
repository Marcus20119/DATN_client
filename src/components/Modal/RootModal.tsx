import ModalAuthHelp from './ModalAuth/ModalAuthHelp';
import ModalSignOutConfirm from './ModalAuth/ModalSignOutConfirm';

type IRootModal = {};

const RootModal: React.FC<IRootModal> = () => {
  return (
    <>
      <ModalAuthHelp />
      <ModalSignOutConfirm />
    </>
  );
};

export default RootModal;
