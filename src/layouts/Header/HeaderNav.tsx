import { NavLink } from 'react-router-dom';
import { Container } from '~/components/Common';

type IHeaderNav = {};

const navData: {
  name: string;
  path: string;
}[] = [
  {
    name: 'THÔNG TIN CHUNG',
    path: '/client/project-info',
  },
  {
    name: 'TIẾN ĐỘ',
    path: '/client/process',
  },
  {
    name: 'LỊCH LÀM VIỆC',
    path: '/client/calender',
  },
];

const HeaderNav: React.FC<IHeaderNav> = () => {
  return (
    <div className="w-full h-[80px] bg-[#25364d]">
      <Container className="justify-between">
        <div className="h-[60px]">
          <img
            src="/imgs/logo-full.png"
            alt=""
            className="h-full object-contain object-center"
          />
        </div>
        <div className="inline-flex gap-5 items-center h-full text-xl font-bold">
          {navData.map(navItem => (
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
