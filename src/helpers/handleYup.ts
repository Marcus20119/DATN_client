class YupClass {
  digitsOnly(value: string) {
    return /^\d+$/.test(value);
  }
}

export const YupMethod = new YupClass();
