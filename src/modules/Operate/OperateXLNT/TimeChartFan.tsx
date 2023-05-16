import TimeChart, {
  TimeChartDataType,
  TimeChartGridType,
} from '~/components/Operate/TimeChart';

interface ITimeChartFan {}

const TimeChartFan: React.FC<ITimeChartFan> = ({}) => {
  const data: TimeChartDataType = [
    {
      name: 'Quạt',
      timeLine: [0, 1, 0, 1, 0, 1, 0],
      note: ['', 'T3', 'T4', 'T3', 'T4', 'T3', ''],
    },
  ];
  const grid: TimeChartGridType = [1, 1, 1, 1, 1, 1, 1];

  return <TimeChart title="QUẠT HÚT MÙI CAO ÁP" data={data} grid={grid} />;
};

export default TimeChartFan;
