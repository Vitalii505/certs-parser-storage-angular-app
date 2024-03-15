export const listDataMap = async <T, R>(array: T[], asyncCallback: (item: T) => Promise<R>): Promise<R[]> => {
  const listData: R[] = [];
  for (const item of array) {
    const data = await asyncCallback(item);
    listData.push(data);
  }
  return listData;
};
