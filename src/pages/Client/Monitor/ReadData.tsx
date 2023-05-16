import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { InputDisable } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { realTimeDb } from '~/firebase/firebase-config';
import { XLNTDataType } from '~/types';

type IReadData = {};

const ReadData: React.FC<IReadData> = () => {
  const [testData, setTestData] = useState<XLNTDataType>({
    BtnOn1: false,
    BtnOn2: false,
    BtnOn3: false,
    BtnOff: false,
    AUTO: false,
    MANUAL: false,
    OR1: false,
    OR2: false,
    OR3: false,
    T_run: [0, 0],
    MTK1: false,
    MTK2: false,
    MTK3: false,
    Buzzer: false,
    LampRun1: false,
    LampRun2: false,
    LampRun3: false,
    LampError1: false,
    LampError2: false,
    LampError3: false,
  });
  useEffect(() => {
    const starCountRef = ref(realTimeDb, 'XLNT_PLC');
    onValue(starCountRef, snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        setTestData(data);
      }
    });
  }, []);
  return (
    <div>
      <Heading
        as="h2"
        text="ĐỌC DỮ LIỆU"
        className="font-bold text-main-blue text-2xl mb-3"
      />
      {/* <div className="flex  gap-3 w-full">
        <InputDisable
          label="Tag Bool"
          name="tagBool"
          value={testData.tagBool.toString()}
        />
        <InputDisable
          label="Tag Byte"
          name="tagByte"
          value={testData.tagByte.toString()}
        />
        <InputDisable
          label="Tag Integer"
          name="tagInteger"
          value={testData.tagInteger.toString()}
        />
        <InputDisable
          label="Tag Real"
          name="tagReal"
          value={testData.tagReal.toString()}
        />
        <InputDisable
          label="Tag String"
          name="tagString"
          value={testData.tagString.toString()}
        />
      </div> */}
      <p>{JSON.stringify(testData)}</p>
    </div>
  );
};

export default ReadData;
