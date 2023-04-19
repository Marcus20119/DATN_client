// const menuColors = {
//   fillActive: '#8B5CF6',
//   fillInactive: '#EDE9FE',
//   strokeActive: '#C4B5FD',
//   strokeInactive: '#A78BFA',
// };
export const menuColors = {
  fillActive: '#ff6145fb',
  fillInactive: '#fccec5',
  strokeActive: '#f8beb4',
  strokeInactive: '#e66b55',
};

export const buttonClassName = (active: boolean): string =>
  `${
    active ? 'text-white' : 'text-gray-900'
  } group flex w-full items-center rounded-md px-2 py-2 text-sm`;
