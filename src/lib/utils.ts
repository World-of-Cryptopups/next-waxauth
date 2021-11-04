const joinString = (str: string | string[]) =>
  Array.isArray(str) ? str.join("") : str;

export { joinString };
