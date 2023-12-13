import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function getLoginUrl(code: string) {
  return `${window.location.origin}/login?code=${code}`;
}

export function formatTime(time: Date | string) {
  if (typeof time === 'string') {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: zhCN });
  }
  return formatDistanceToNow(time, { addSuffix: true, locale: zhCN });
}
