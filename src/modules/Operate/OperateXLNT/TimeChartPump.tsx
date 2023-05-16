import TimeChart, {
  TimeChartDataType,
  TimeChartGridType,
} from '~/components/Operate/TimeChart';

interface ITimeChartPump {}

const TimeChartPump: React.FC<ITimeChartPump> = ({}) => {
  const data: TimeChartDataType = [
    {
      name: 'Phao',
      timeLine: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      note: ['', '', '', '', '', '', '', '', '', '', ''],
    },
    {
      name: 'Bơm 1',
      timeLine: [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
      note: ['', '', 'T1', '', 'T2', '', '', '', '', '', ''],
    },
    {
      name: 'Bơm 2',
      timeLine: [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      note: ['', '', '', '', '', '', 'T1', '', 'T2', '', ''],
    },
  ];
  const grid: TimeChartGridType = [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1];

  return <TimeChart title="BƠM BỂ ĐIỀU HÒA" data={data} grid={grid} />;
};

export default TimeChartPump;
