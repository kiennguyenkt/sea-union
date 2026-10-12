export const number = (value) => new Intl.NumberFormat("vi-VN").format(value);
export const compact = (value) =>
  value >= 1000000
    ? `${(value / 1000000).toFixed(2)}M`
    : `${(value / 1000).toFixed(1)}k`;
