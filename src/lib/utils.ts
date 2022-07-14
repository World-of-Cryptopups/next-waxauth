const joinString = (str?: string | string[]) => {
  if (str === undefined) return "";

  return Array.isArray(str) ? str.join("") : str;
};

export { joinString };
