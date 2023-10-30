import { padWithLeadingZeros } from './stringFormat';

export const generateOrderNo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const rand = Math.floor(100000 + Math.random() * 900000);
  const dateFormat = [
    padWithLeadingZeros(year, 2),
    padWithLeadingZeros(month, 2),
    padWithLeadingZeros(day, 2),
    rand,
  ].join('');
  return `${dateFormat}`;
};
