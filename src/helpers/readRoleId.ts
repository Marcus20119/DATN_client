export function readRoleId(role_id: number): string {
  switch (role_id) {
    case 0:
      return 'Basic Client';
    case 1:
      return 'Engineer';
    case 2:
      return 'Admin';
    default:
      return '';
  }
}
