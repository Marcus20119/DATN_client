export type XLNTDataType = {
  T_On_Pump_Min: number[];
  T_Off_Pump_Min: number[];
  T_On_Fan_Min: number[];
  T_Off_Fan_Min: number[];
  T_On_Pump_MS: number[];
  T_Off_Pump_MS: number[];
  T_On_Fan_MS: number[];
  T_Off_Fan_MS: number[];
  T_Sum_Pump1_Min: number[];
  T_Sum_Pump2_Min: number[];
  T_Sum_Fan_Min: number[];
  T_Left_On_Pump1_Sec: number[];
  T_Left_On_Pump2_Sec: number[];
  T_Left_Off_Pump_Sec: number[];
  T_Left_On_Fan_Sec: number[];
  T_Left_Off_Fan_Sec: number[];
  T_Current_On_Pump1_MS: number[];
  T_Current_On_Pump2_MS: number[];
  T_Current_Off_Pump_MS: number[];
  T_Current_On_Fan_MS: number[];
  T_Current_Off_Fan_MS: number[];
  Reset_T_Sum_Pump1: boolean;
  Reset_T_Sum_Pump2: boolean;
  Reset_T_Sum_Fan: boolean;
  Status_Pump1: boolean;
  Status_Pump2: boolean;
  Status_Fan: boolean;
  Status_Buoy: boolean;
  Error_Pump1: boolean;
  Error_Pump2: boolean;
};

export const XLNTInitialData: XLNTDataType = {
  T_On_Pump_Min: [0, 0],
  T_Off_Pump_Min: [0, 0],
  T_On_Fan_Min: [0, 0],
  T_Off_Fan_Min: [0, 0],
  T_On_Pump_MS: [0, 0],
  T_Off_Pump_MS: [0, 0],
  T_On_Fan_MS: [0, 0],
  T_Off_Fan_MS: [0, 0],
  T_Sum_Pump1_Min: [0, 0],
  T_Sum_Pump2_Min: [0, 0],
  T_Sum_Fan_Min: [0, 0],
  T_Left_On_Pump1_Sec: [0, 0],
  T_Left_On_Pump2_Sec: [0, 0],
  T_Left_Off_Pump_Sec: [0, 0],
  T_Left_On_Fan_Sec: [0, 0],
  T_Left_Off_Fan_Sec: [0, 0],
  T_Current_On_Pump1_MS: [0, 0],
  T_Current_On_Pump2_MS: [0, 0],
  T_Current_Off_Pump_MS: [0, 0],
  T_Current_On_Fan_MS: [0, 0],
  T_Current_Off_Fan_MS: [0, 0],
  Reset_T_Sum_Pump1: false,
  Reset_T_Sum_Pump2: false,
  Reset_T_Sum_Fan: false,
  Status_Pump1: false,
  Status_Pump2: false,
  Status_Fan: false,
  Status_Buoy: false,
  Error_Pump1: false,
  Error_Pump2: false,
};

export interface SearchParams {
  [key: string]: string;
}
