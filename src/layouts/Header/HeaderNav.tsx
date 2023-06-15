import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from '~/components/Common';
import { IRootState } from '~/store/rootReducer';

type IHeaderNav = {};

const navDataClient: {
  name: string;
  path: string;
}[] = [
  {
    name: 'THÔNG TIN CHUNG',
    path: '/client/general',
  },
  {
    name: 'GIÁM SÁT',
    path: '/client/monitor',
  },
  {
    name: 'ĐIỀU KHIỂN',
    path: '/client/operate',
  },
];

const navDataAdmin: {
  name: string;
  path: string;
}[] = [
  {
    name: 'DASHBOARD',
    path: '/admin/dashboard',
  },
  {
    name: 'NGƯỜI DÙNG',
    path: '/admin/user/manage?tab=Activated%20User&page=1',
  },
  {
    name: 'NHÂN VIÊN',
    path: '/admin/staff/manage?tab=Active%20Staff&page=1',
  },
  {
    name: 'DỰ ÁN',
    path: '/admin/project/manage?tab=Active%20Project&page=1',
  },
];

const HeaderNav: React.FC<IHeaderNav> = () => {
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="w-full h-[72px] bg-[#25364d]">
      <Container className="justify-between">
        <div className="h-[54px]">
          <img
            src="/imgs/logo-full.png"
            alt=""
            className="h-full object-contain object-center"
          />
        </div>
        <div className="inline-flex gap-5 items-center h-full text-lg font-bold">
          {userData.role_id === 3
            ? navDataAdmin.map(navItem => (
                <NavLink
                  to={navItem.path}
                  key={navItem.name}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#FF6348]'
                      : 'text-main-white opacity-80 hover:opacity-100'
                  }
                >
                  <h3>{navItem.name}</h3>
                </NavLink>
              ))
            : navDataClient.map(navItem => (
                <NavLink
                  to={navItem.path}
                  key={navItem.name}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#FF6348]'
                      : 'text-main-white opacity-80 hover:opacity-100'
                  }
                >
                  <h3>{navItem.name}</h3>
                </NavLink>
              ))}
        </div>
      </Container>
    </div>
  );
};

export default HeaderNav;
