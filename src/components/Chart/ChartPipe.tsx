import { ResponsivePie } from '@nivo/pie';
import { useResponsive } from '~/hooks/useResponsive';
import './ChartPipe.scss';

export type ChartPipeDataType = {
  label: string;
  value: number;
}[];

type IChartPipe = {
  data: ChartPipeDataType;
  title: string;
  height?: number;
};

const ChartPipe: React.FC<IChartPipe> = ({ data, title, height = 400 }) => {
  const neededFill = data.map((item, index) => {
    return {
      match: {
        id: item.label,
      },
      id: index % 2 === 0 ? 'lines' : 'dots',
    };
  });

  const neededData = data.map((item, index) => {
    return {
      ...item,
      id: item.label,
    };
  });
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-[#3B5880] font-bold text-2xl">{title}</h3>
      <div
        className="chart-pipe w-full h-[400px]"
        style={{ height: `${height}px` }}
      >
        <ResponsivePie
          colors={{ scheme: 'paired' }}
          data={neededData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          startAngle={-180}
          sortByValue={false}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsDiagonalLength={isMobile ? 10 : 16}
          arcLinkLabelsStraightLength={isMobile ? 10 : 30}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#3B5880"
          arcLinkLabelsTextOffset={10}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={neededFill}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 80,
              itemsSpacing: 28,
              itemWidth: 76,
              itemHeight: 40,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 20,
              symbolShape: 'circle',
            },
          ]}
        />
      </div>
    </div>
  );
};

export { ChartPipe };
