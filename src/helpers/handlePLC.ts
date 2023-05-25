class PLCClass {
  ReadDInt(arr: number[]) {
    if (typeof arr[0] === 'string') return 0;
    const binaryArray: string[] = arr.map(item => {
      let binary = (item >>> 0).toString(2);
      if (binary.length < 16) {
        binary = binary.padStart(16, '0');
      } else if (binary.length > 16) {
        binary = binary.slice(-16);
      }
      return binary;
    });
    return parseInt(binaryArray.join(''), 2);
  }
  WriteDInt(data: string) {
    const binaryString: string = parseInt(data).toString(2).padStart(32, '0');
    const firstPart = binaryString.substring(0, 16);
    const secondPart = binaryString.substring(16);
    return [
      (parseInt(firstPart, 2) << 16) >> 16,
      (parseInt(secondPart, 2) << 16) >> 16,
    ];
  }
}

export const PLC = new PLCClass();
