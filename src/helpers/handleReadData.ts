class ReadDataClass {
  day(timestamptzValue: any) {
    const dateObj = new Date(timestamptzValue);

    const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Step 5: Format the date as "MM/dd/yyyy"
    const formattedDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;

    // Step 6: Combine the formatted time and date
    return `${formattedDate}`;
  }
  time(timestamptzValue: any) {
    const dateObj = new Date(timestamptzValue);

    // Step 2: Extract the time components (hours, minutes, and seconds)
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    // Step 3: Format the time as "hh:mm:ss"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Step 4: Extract the date components (month, day, and year)
    const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Step 5: Format the date as "MM/dd/yyyy"
    const formattedDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;

    // Step 6: Combine the formatted time and date
    return `${formattedTime}   ${formattedDate}`;
  }
  gender(gender: number) {
    return gender === -1 ? '-' : gender === 0 ? 'Nam' : 'Nữ';
  }
  roleId(role_id: number) {
    switch (role_id) {
      case 0:
        return 'Visitor';
      case 1:
        return 'Operator';
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
  projectStatus(status: number) {
    switch (status) {
      case 0:
        return 'Đang phát triển';
      case 1:
        return 'Đã hoàn thành';
      default:
        return '';
    }
  }
}

export const ReadData = new ReadDataClass();
