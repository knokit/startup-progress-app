
function indexBy<TData>(data: TData[], key: keyof TData) {
  return data.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: acc[item[key]] ? [...acc[item[key]], item] : [item],
    }),
    {}
  );
}