const castToNumber = (variable: string | number | undefined | null): number => {
  if (!variable) {
    return 0;
  }
  if (typeof variable === 'number') {
    return variable;
  }
  const parsedNumber = parseFloat(variable);
  return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
};

// eslint-disable-next-line import/prefer-default-export
export { castToNumber };
