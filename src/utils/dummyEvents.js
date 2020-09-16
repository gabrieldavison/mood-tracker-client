const time = new Date();

export const events = [
  {
    title: "1",
    start: time.setDate(time.getDate() - 1),
    end: time,
  },
  {
    title: "2",
    start: time + 2,
    end: time + 2,
  },
  {
    title: "3",
    start: time.setDate(time.getDate() - 1),
    end: time,
  },
  {
    title: "4",
    start: time + 2,
    end: time + 2,
  },
  {
    title: "5",
    start: time.setDate(time.getDate() - 1),
    end: time,
  },
  {
    title: "6",
    start: time + 2,
    end: time + 2,
  },
];
