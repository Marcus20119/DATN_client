class CookieClass {
  get(cname: string) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      const [name, value] = cookie.split('=');
      if (name === cname) {
        return JSON.parse(value);
      }
    }
    return null;
  }
  set({
    cName,
    cValue,
    exDays,
  }: {
    cName: string;
    cValue: any;
    exDays: number;
  }) {
    // Tạo ngày hết hạn cho cookie
    const d = new Date();
    d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    // Ghi dữ liệu vào cookie
    document.cookie =
      cName +
      '=' +
      JSON.stringify(cValue) +
      ';' +
      expires +
      +';domain=.' +
      window.location.hostname +
      ';path=/';
  }
  remove(name: string) {
    document.cookie = name + '=; Max-Age=0';
  }
}

export function getFromCookie(cname: string) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    const [name, value] = cookie.split('=');
    if (name === cname) {
      return JSON.parse(value);
    }
  }
  return null;
}

export function setToCookie({
  cName,
  cValue,
  exDays,
}: {
  cName: string;
  cValue: any;
  exDays: number;
}) {
  // Tạo ngày hết hạn cho cookie
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  // Ghi dữ liệu vào cookie
  document.cookie =
    cName +
    '=' +
    JSON.stringify(cValue) +
    ';' +
    expires +
    +';domain=.' +
    window.location.hostname +
    ';path=/';
}

export function removeFromCookie(name: string) {
  document.cookie = name + '=; Max-Age=0';
}
export const Cookie = new CookieClass();
