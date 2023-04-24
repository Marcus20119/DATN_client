import { createSlice } from '@reduxjs/toolkit';
import { AllActionType } from './base.type';

type InitialStateType = {
  isReachScrolling: boolean;
  showModalConfirm: boolean;
  loadingModalConfirm: boolean;
  modalConfirmData: {
    title: string;
    description: string;
    confirmButtonLabel: string;
  };
  modalConfirmAction: AllActionType;
  showModalHelpInput: boolean;
  modalHelpInputData: {
    label: string;
    helpMessage: string;
  };
};
type BaseStateTypeBase<K extends keyof InitialStateType> = {
  state: K;
  value: InitialStateType[K];
};

type BaseStateType = {
  [K in keyof InitialStateType]: BaseStateTypeBase<K>;
}[keyof InitialStateType];

const initialState: InitialStateType = {
  isReachScrolling: false,
  showModalConfirm: false,
  loadingModalConfirm: false,
  modalConfirmData: {
    title: '',
    description: '',
    confirmButtonLabel: '',
  },
  modalConfirmAction: {
    type: 'base/handleHideBaseModal',
    payload: '',
  },
  showModalHelpInput: false,
  modalHelpInputData: {
    label: '',
    helpMessage: '',
  },
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseState: (state, { payload }: { payload: BaseStateType }) => ({
      ...state,
      [payload.state]: payload.value,
    }),

    handleShowBaseConfirmModal: (
      state,
      {
        payload: { title, description, confirmButtonLabel, confirmAction },
      }: {
        payload: {
          title: string;
          description: string;
          confirmButtonLabel: string;
          confirmAction: AllActionType;
        };
      }
    ) => ({
      ...state,
      showModalConfirm: true,
      modalConfirmData: {
        title,
        description,
        confirmButtonLabel,
      },
      modalConfirmAction: confirmAction,
    }),
    handleShowBaseHelpInputModal: (
      state,
      {
        payload: { label, helpMessage },
      }: { payload: { label: string; helpMessage: string } }
    ) => ({
      ...state,
      showModalHelpInput: true,
      modalHelpInputData: { label, helpMessage },
    }),

    handleHideBaseModal: state => ({
      ...state,
      showModalConfirm: false,
      showModalHelpInput: false,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  setBaseState,
  handleHideBaseModal,
  handleShowBaseConfirmModal,
  handleShowBaseHelpInputModal,
} = baseSlice.actions;

export default baseSlice.reducer;
