import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { InputDisable } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { realTimeDb } from '~/firebase/firebase-config';
import { TestDataType } from '~/types';

type IReadData = {};

const ReadData: React.FC<IReadData> = () => {
  const [testData, setTestData] = useState<TestDataType>({
    tagBool: false,
    tagByte: 0,
    tagInteger: 0,
    tagReal: 0,
    tagString: '',
  });
  useEffect(() => {
    const starCountRef = ref(realTimeDb, 'XLNT_PLC');
    onValue(starCountRef, snapshot => {
      const data: TestDataType = snapshot.val();
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
      <div className="flex  gap-3 w-full">
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
      </div>
    </div>
  );
};

export default ReadData;
