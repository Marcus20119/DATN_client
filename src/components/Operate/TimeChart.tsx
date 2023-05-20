import { Heading } from '../Heading';

export type TimeChartDataType = {
  name: string;
  timeLine: number[];
  note: string[];
}[];
export type TimeChartGridType = number[];

interface ITimeChart {
  title: string;
  data: TimeChartDataType;
  grid: TimeChartGridType;
}

const TimeChart: React.FC<ITimeChart> = ({ title, data, grid }) => {
  const borderClass = (
    currentTimeLine: number,
    nextTimeLine?: number
  ): string => {
    if (currentTimeLine === 0 && nextTimeLine === 1) {
      return 'border-b-2 border-r-2';
    } else if (currentTimeLine === 1 && nextTimeLine === 0) {
      return 'border-t-2 border-r-2';
    } else if (currentTimeLine === 0) {
      return 'border-b-2';
    } else if (currentTimeLine === 1) {
      return 'border-t-2';
    } else {
      return '';
    }
  };
  const gridClass = (currentCell: number): string => {
    if (currentCell === 0) return 'border-r-2 border-dashed border-gray-500/70';
    return '';
  };
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Heading as="h3" text={title} className="text-lg w-full text-center" />

      <div
        className="flex gap-3 w-full"
        style={{ height: `${data.length * 50}px` }}
      >
        <div className="flex flex-col justify-between gap-2 h-full">
          {data.map((item, index) => (
            <div
              key={`timeChartPump-name-${index}`}
              className="inline-flex h-[30px]"
            >
              <span className="inline-block mt-auto">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="relative flex-1 flex flex-col justify-between gap-2 h-full">
          {data.map((item, index) => (
            <div
              key={`timeChartPump-value-${index}`}
              className="grid w-full h-[30px]"
              style={{
                gridTemplateColumns: `repeat(${item.timeLine.length}, minmax(0, 1fr))`,
              }}
            >
              {item.timeLine.map((timeItem, timeIndex) => (
                <div
                  key={`timeChartPump-timeItem-${index}-${timeIndex}`}
                  className={`flex items-center justify-center text-sm border-gray-500 ${borderClass(
                    timeItem,
                    item.timeLine[timeIndex + 1]
                  )}`}
                >
                  {item.note[timeIndex]}&nbsp;
                </div>
              ))}
            </div>
          ))}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
            }}
          >
            {grid.map((item, index) => (
              <div
                key={`timeChartPump-grid-${index}`}
                className={`${gridClass(item)}`}
              >
                &nbsp;
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeChart;
