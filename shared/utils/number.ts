export function formatNumber(value: number, locale = 'vi-VN'): string {
  return new Intl.NumberFormat(locale).format(value);
}
