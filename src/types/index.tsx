export type PLCDataType = {
  BtnOn1: boolean;
  BtnOn2: boolean;
  BtnOn3: boolean;
  BtnOff: boolean;
  AUTO: boolean;
  MANUAL: boolean;
  OR1: boolean;
  OR2: boolean;
  OR3: boolean;
  T_run: number[];
  MTK1: boolean;
  MTK2: boolean;
  MTK3: boolean;
  Buzzer: boolean;
  LampRun1: boolean;
  LampRun2: boolean;
  LampRun3: boolean;
  LampError1: boolean;
  LampError2: boolean;
  LampError3: boolean;
};

export interface SearchParams {
  [key: string]: string;
}
