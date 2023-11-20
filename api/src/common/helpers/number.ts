export const parser = (input: string | number) => {
  let num;
  if (typeof input === 'string') {
    num = parseFloat(input);
  } else {
    num = input;
  }

  return (num * 1000000) / 1000000;
};
