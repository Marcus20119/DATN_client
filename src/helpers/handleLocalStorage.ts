export function getFromLocalStorage(key: string, initialValue: string) {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    // Nếu có trong Local Storage thì parse ra, nếu không thì lấy giá trị initial
    return item ? JSON.parse(item) : initialValue;
  } catch (err) {
    console.log(err);
    return initialValue;
  }
}

export function setToLocalStorage({ key, value }: { key: string; value: any }) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
