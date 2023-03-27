import ModalAuthHelp from './ModalAuth/ModalAuthHelp';

type IRootModal = {};

const RootModal: React.FC<IRootModal> = () => {
  return (
    <>
      <ModalAuthHelp />
    </>
  );
};

export default RootModal;
