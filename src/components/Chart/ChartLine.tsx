import { ResponsiveLine } from '@nivo/line';
import { useResponsive } from '~/hooks';
import './ChartLine.scss';

export type ChartLineDataType = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];
type IChartLine = {
  data: ChartLineDataType;
  title: string;
  height?: number;
};

const ChartLine: React.FC<IChartLine> = ({ data, title, height }) => {
  const { isMobile } = useResponsive();
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-[#3B5880] font-bold text-2xl">{title}</h3>
      <div
        className="chart-line w-full h-[400px]"
        style={{ height: `${height}px` }}
      >
        <ResponsiveLine
          colors={{ scheme: 'paired' }}
          data={data}
          margin={{ top: 30, right: isMobile ? 30 : 60, bottom: 80, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            // orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            // orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Số lượt truy cập',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          lineWidth={2}
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor', modifiers: [] }}
          pointLabelYOffset={-1}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 70,
              itemsSpacing: 50,
              itemDirection: 'left-to-right',
              itemWidth: 85,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 20,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            },
          ]}
        />
      </div>
    </div>
  );
};

export { ChartLine };
