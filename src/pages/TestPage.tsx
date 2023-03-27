import { onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { InputDisable } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { realTimeDb } from '~/firebase/firebase-config';
type ITestPage = {};

const TestPage: React.FC<ITestPage> = () => {
  type TestDataType = {
    tagBool: boolean;
    tagByte: number;
    tagInteger: number;
    tagReal: number;
    tagString: string;
  };
  const [testData, setTestData] = useState<TestDataType>({
    tagBool: false,
    tagByte: 0,
    tagInteger: 0,
    tagReal: 0,
    tagString: '',
  });
  useEffect(() => {
    const starCountRef = ref(realTimeDb, 'test');
    onValue(starCountRef, snapshot => {
      const data: TestDataType = snapshot.val();
      setTestData(data);
    });
  }, []);

  function writeUserData({
    tagBool,
    tagByte,
    tagInteger,
    tagReal,
    tagString,
  }: TestDataType) {
    set(ref(realTimeDb, 'test'), {
      tagBool,
      tagByte,
      tagInteger,
      tagReal,
      tagString,
    });
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className={`relative bg-zinc-800 rounded-2xl z-2 transition-all w-[90vw] max-w-[500px] px-8 py-[30px] text-gray-300`}
      >
        <div className="flex flex-col gap-6 w-full">
          <Heading
            as="h2"
            text="TEST DATA"
            className="block w-full pb-1 text-4xl font-bold tracking-wide border-b border-b-gray-300"
          />
          <div className="flex flex-col gap-3 w-full">
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
      </div>
      <button
        className="text-white"
        onClick={() =>
          writeUserData({
            tagBool: true,
            tagByte: 1,
            tagInteger: 1,
            tagReal: 1,
            tagString: 'Lalaland',
          })
        }
      >
        Set
      </button>
    </div>
  );
};

export default TestPage;
