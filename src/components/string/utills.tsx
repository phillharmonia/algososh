export const reverseString = (inputValue: string) => {
    const dataArray = inputValue.split('');
    const dataLength = dataArray.length;
    for (let i = 0; i < Math.floor(dataLength / 2); i++) {
      [dataArray[i], dataArray[dataLength - 1 - i]] = [
        dataArray[dataLength - 1 - i],
        dataArray[i],
      ];
    }
    return dataArray.join('');
  };