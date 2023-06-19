import { useResponsive } from '~/hooks/useResponsive';

interface IElectricalCabinet {}

const ElectricalCabinet: React.FC<IElectricalCabinet> = ({}) => {
  const { isMobile } = useResponsive();
  return (
    <div className="relative flex justify-center items-center w-full h-0 pt-[150%] border-2 border-gray-700 rounded-md">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-0 pt-[138%] border-2 border-gray-700 rounded-sm">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[80%] text-gray-600">
          <div className="relative w-[70%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full"
            >
              <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19zm9-14.243L21.22 18.2H2.808L12 4.757z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.3}
              stroke="currentColor"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] mt-[2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          <div
            className={`flex flex-col text-center ${
              isMobile ? 'text-[0.7rem]' : 'text-sm'
            } -translate-y-2`}
          >
            <span className="leading-[18px]">HIGH</span>
            <span className="leading-[18px]">VOLTAGE</span>
          </div>
          {/* STRIPE PART */}
          <div className="relative w-[80%] h-0 pt-[35%] mt-[25%]">
            <div className="absolute inset-0 flex flex-col justify-between">
              {Array(4)
                .fill(null)
                .map((item, index) => (
                  <div
                    key={`cabinet-line-${index}`}
                    className="w-full h-0 pt-[3%] bg-gray-600"
                  >
                    &nbsp;
                  </div>
                ))}
            </div>
          </div>
          {/* KEY PART */}
          <div className="absolute right-0 bottom-[35%] rounded-full border-2 border-gray-600 w-[10%] h-0 pt-[10%]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[25%] h-full bg-gray-600">
              &nbsp;
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[calc(50%_+_1px)] flex flex-col justify-between w-[5%] h-[70%]">
          {Array(2)
            .fill(null)
            .map((item, index) => (
              <div
                key={`cabinet-hinge-${index}`}
                className="w-full h-[30%] border-2 border-gray-600 bg-[#DADEE4] rounded-sm"
              >
                &nbsp;
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { ElectricalCabinet };
