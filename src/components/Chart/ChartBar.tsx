import { ResponsiveBar } from '@nivo/bar';

import './ChartBar.scss';

export type ChartBarDataType = {
  'Nhân viên': string;
  'Số dự án': number;
}[];
type IChartBar = {
  data: ChartBarDataType;
  title: string;
  height?: number;
};

const ChartBar: React.FC<IChartBar> = ({ data, title, height }) => (
  <div className="flex flex-col items-center w-full">
    <h3 className="text-[#3B5880] font-bold text-2xl">{title}</h3>
    <div
      className="chart-bar w-full h-[400px]"
      style={{ height: `${height}px` }}
    >
      <ResponsiveBar
        data={data}
        keys={['Số dự án']}
        indexBy="Nhân viên"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Số dự án',
          legendPosition: 'middle',
          legendOffset: 42,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        enableGridX
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e =>
          e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }
      />
    </div>
  </div>
);

export { ChartBar };
