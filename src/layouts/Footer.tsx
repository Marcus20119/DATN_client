import { Container } from '~/components/Common';

interface IFooter {}

const Footer: React.FC<IFooter> = ({}) => {
  const contacts: { iconClass: string; data: string }[] = [
    {
      iconClass: 'bx bxs-map',
      data: '156 Đinh Đức Thiện, Đà Nẵng',
    },
    {
      iconClass: 'bx bxs-phone',
      data: '0944.275.499',
    },
    {
      iconClass: 'bx bxl-gmail',
      data: 'tdhnhattri@gmail.com',
    },
  ];
  const mores: { iconClass: string; data: string; link: string }[] = [
    {
      iconClass: 'bx bxl-facebook-circle',
      data: 'facebook.com/Nhattriautomation',
      link: 'https://www.facebook.com/Nhattriautomation',
    },
    {
      iconClass: 'bx bx-globe',
      data: 'nhattriautomation.vn',
      link: 'https://nhattriautomation.vn/',
    },
  ];
  return (
    <div className="border-t-2 border-t-black bg-[#25364D] mt-20">
      <Container>
        <div className="flex flex-col gap-6 w-full pt-10 pb-4">
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col gap-2 w-[500px]">
              <span className="text-[#ec7e08] text-xl font-mono font-bold tracking-wide">
                NHẬT TRI AUTOMATION
              </span>
              <p className="text-sm text-main-white">
                Là doanh nghiệp hoạt động trong lĩnh vực dịch vụ tự động hóa cho
                các hệ thống công nghiệp, nhà máy sản xuất. Cung cấp cho khách
                hàng các giải pháp cộng nghệ nâng cao hiệu quả và chất lượng sản
                xuất.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#ec7e08] text-xl font-mono font-bold ">
                Thông tin liên hệ
              </span>
              <div className="flex flex-col gap-1 text-sm text-main-white">
                {contacts.map(contact => (
                  <div key={contact.data} className="flex items-center gap-3">
                    <i className={`${contact.iconClass} mb-[1px]`}></i>
                    <span>{contact.data}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#ec7e08] text-xl font-mono font-bold ">
                Khác
              </span>
              <div className="flex flex-col gap-1 text-sm text-main-white">
                {mores.map(more => (
                  <a
                    key={more.data}
                    href={more.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-80"
                  >
                    <i className={`${more.iconClass} mb-[1px]`}></i>
                    <span>{more.data}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full opacity-30 text-white text-sm">
            <span>Copyright © 2023 NHẬT TRI AUTOMATION</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
