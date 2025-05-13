export function formatDate(date: string | Date, locale = 'vi-VN'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | Date, locale = 'vi-VN'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const formatDateTimeMessage = (
  inputDateTime: string,
  locale = 'vi-VN',
): string => {
  const date = new Date(inputDateTime);
  const now = new Date();

  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = diffDays === 1;
  const isThisWeek = diffDays <= 6;
  const isSameMonth =
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (isYesterday) {
    return locale === 'vi-VN' ? 'Hôm qua' : 'Yesterday';
  }

  if (isThisWeek) {
    return locale === 'vi-VN'
      ? `${diffDays} ngày trước`
      : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  if (isSameMonth) {
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'numeric',
    });
  }

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
