class UserClass {
  day(day: string | Date | null) {
    return day?.toString().split('T')[0] || '';
  }
  gender(gender: number) {
    return gender === -1 ? '-' : gender === 0 ? 'Nam' : 'Nữ';
  }
  roleId(role_id: number) {
    switch (role_id) {
      case 0:
        return 'Basic Client';
      case 1:
        return 'Engineer';
      case 2:
        return 'Manager';
      case 3:
        return 'Admin';
      default:
        return '';
    }
  }
}

export const User = new UserClass();
