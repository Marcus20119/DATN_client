interface ITableTab {
  handleSetTab: (tab: any) => void;
  tableTabs: string[];
  tableCurrentTab: string;
  disabled: boolean;
}

const TableTab: React.FC<ITableTab> = ({
  tableTabs,
  tableCurrentTab,
  handleSetTab,
  disabled = false,
}) => {
  return (
    <>
      <div className="absolute left-0 bottom-full">
        {tableTabs.map((tab, index) => (
          <button
            key={tab}
            className={`relative inline-block px-3 py-[6px] text-white rounded-t-md transition-all cursor-pointer border border-[#ADB7C7] ${
              tab === tableCurrentTab
                ? 'bg-main-blue-80 shadow-xl'
                : 'bg-[#909FB5] hover:bg-[#5D7495] hover:!z-20'
            }`}
            style={{
              zIndex: `${tab === tableCurrentTab ? '10' : '5'}`,
              transform: `translateX(-${index * 8}px)`,
            }}
            onClick={() => handleSetTab(tab)}
            disabled={disabled}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
};

export default TableTab;
