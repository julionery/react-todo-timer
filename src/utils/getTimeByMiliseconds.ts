interface ITime {
  ms: number;
  s: number;
  m: number;
  h: number;
}

const getTimeByMiliseconds = (value: number): ITime => {
  const miliseconds = value % 100;
  let seconds = Math.floor(value / 1000);
  let minutes = 0;
  let hours = 0;
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
  }
  if (minutes > 60) {
    hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
  }

  return { ms: miliseconds, s: seconds, m: minutes, h: hours };
};

export default getTimeByMiliseconds;
