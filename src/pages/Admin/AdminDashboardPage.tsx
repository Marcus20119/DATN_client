import { useEffect, useState } from 'react';
import { privateAxios } from '~/axiosConfig';
import {
  ChartLine,
  ChartPipe,
  ChartLineDataType,
  ChartPipeDataType,
  ChartBar,
  ChartBarDataType,
} from '~/components/Chart';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';

interface IAdminDashboardPage {}

const AdminDashboardPage: React.FC<IAdminDashboardPage> = ({}) => {
  useScrollOnTop();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lineChartData, setLineChartData] = useState<ChartLineDataType>([]);
  const [pipeChartData, setPipeChartData] = useState<ChartPipeDataType>([]);
  const [barChartData, setBarChartData] = useState<ChartBarDataType>([]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data: lineData } = await privateAxios.request({
          method: 'GET',
          url: '/g/chart/user/line',
        });
        const { data: pipeData } = await privateAxios.request({
          method: 'GET',
          url: '/g/chart/user/pipe',
        });
        const { data: barData } = await privateAxios.request({
          method: 'GET',
          url: '/g/chart/user/bar',
        });
        setLineChartData(lineData.data);
        setPipeChartData(pipeData.data);
        setBarChartData(barData.data);
      } catch (err) {
        console.log('err:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Container>
      <Section sectionTitle="DASHBOARD" isLoading={isLoading}>
        {!isLoading && (
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 w-full gap-y-16 my-10">
              <ChartPipe
                data={pipeChartData}
                title="SỐ LƯỢNG NGƯỜI DÙNG CỦA CÁC DỰ ÁN"
              />
              <ChartLine
                data={lineChartData}
                title="SỐ LƯỢT TRUY CẬP VÀO CÁC DỰ ÁN"
              />
              <ChartBar
                data={barChartData}
                title="SỐ LƯỢNG DỰ ÁN CỦA CÁC NHÂN VIÊN"
              />
            </div>
          </div>
        )}
      </Section>
    </Container>
  );
};

export default AdminDashboardPage;
