export function formatCurrency(
  value: number,
  locale = 'vi-VN',
  currency = 'VND',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
