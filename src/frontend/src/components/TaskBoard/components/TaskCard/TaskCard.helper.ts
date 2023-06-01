const getFormattedTime = (createdAt: Date): string => {
  const time = new Date(createdAt);
  const month =
    time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`;
  const day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;

  return `${month}-${day}-${time.getFullYear()}`;
};

export { getFormattedTime };
