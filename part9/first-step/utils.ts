// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumber = (value: any) => {
    return (typeof value === 'number' && !isNaN(value));
};

export { isNumber };