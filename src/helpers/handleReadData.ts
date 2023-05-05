class ReadDataClass {
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
  avatar({ bucket, name }: { bucket: 'staff_avatar'; name: string }) {
    return `https://hibudsswlhbjzbxalgmn.supabase.co/storage/v1/object/public/${bucket}/${
      name || 'no-user.png'
    }`;
  }
  language(languages: string[]) {
    const readLanguage = languages.map(lang => {
      switch (lang) {
        case 'english':
          return 'Anh';
        case 'france':
          return 'Pháp';
        case 'russian':
          return 'Nga';
        case 'japanese':
          return 'Nhật';
        default:
          return lang;
      }
    });
    return readLanguage.join(', ');
  }
}

export const ReadData = new ReadDataClass();
