export const createElement = (template: string): HTMLElement => {
  const container = document.createElement("div");
  container.innerHTML = template;
  return container.firstElementChild as HTMLElement;
};

export const formatDuration = (ms: number): string => {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds: string | number = totalSeconds % 60;
  let formatedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  return `${minutes}:${formatedSeconds}`;
};

export const formatDurationForPlayer = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${formattedSeconds}`;
};

export const formatDaysAgo = (date: string): string => {
  let currentDate = new Date();
  let pastDate = new Date(date);
  let timeDiff = currentDate.getTime() - pastDate.getTime();
  let daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return Math.floor(daysDiff).toString();
};
