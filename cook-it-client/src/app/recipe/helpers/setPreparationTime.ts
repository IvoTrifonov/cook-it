export function setPreparationTime(hours: number, minutes: number) {
  hours = hours || 0;
  minutes = minutes || 0;
  return (hours * 60) + minutes;
}