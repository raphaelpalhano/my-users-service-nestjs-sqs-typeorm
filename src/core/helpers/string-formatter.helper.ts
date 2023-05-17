export const convertSnake = (value: string) =>
  value
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word?.toLowerCase())
    .join('_');
