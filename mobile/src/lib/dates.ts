export const dateToText = (text: string | Date) => {
  const d = new Date(text);
  return `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
};
