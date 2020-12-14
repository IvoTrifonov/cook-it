export function formatPrepTime(minutes: number) {
  let formatTime;

  if (minutes < 60) {
    formatTime = `${minutes}m.`
  } else if (minutes === 60) {
    formatTime = '1h.';
  } else {
    const hours = Math.floor(minutes / 60);          
    minutes = minutes % 60;

    formatTime = `${hours}h. and ${minutes}m.`
  }

  return formatTime;
}