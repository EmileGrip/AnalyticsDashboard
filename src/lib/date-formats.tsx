const monthNames = [
  'jan',
  'feb',
  'mrt',
  'apr',
  'mei',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec',
];

/**
 * Formats a date string in Dutch format.
 * @param dateString - The input date string in ISO format (e.g., '2022-07-22').
 * @returns An object with formatted date and time strings (e.g., { formattedDate: '22 jul 2022', formattedTime: '12:30' }).
 */
export function formatDutchDate(date: string | number | Date) {
  const parsedDate = typeof date === 'number' ? new Date(date) : new Date(date);

  const year = parsedDate.getFullYear();
  const month = monthNames[parsedDate.getMonth()];
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}

/**
 * Converts a given date string into a human-readable format indicating the time difference.
 * @param dateString - The input date string in ISO format (e.g., '2022-07-22').
 * @returns A string indicating the time difference, e.g., '2 jaar geleden', '4 weken geleden', 'Zojuist'.
 */
export function formatDutchDateDiff(dateString: string) {
  const parsedDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - parsedDate.getTime();

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  if (minutesAgo < 1) {
    return 'Zojuist';
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 1) {
    return `${minutesAgo} minuten geleden`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 1) {
    return `${hoursAgo} uur geleden`;
  }

  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 1) {
    return `${daysAgo} dagen geleden`;
  }

  const monthsAgo = Math.floor(
    currentDate.getMonth() -
      parsedDate.getMonth() +
      12 * (currentDate.getFullYear() - parsedDate.getFullYear()),
  );
  if (monthsAgo < 1) {
    return `${weeksAgo} weken geleden`;
  }

  const yearsAgo = Math.floor(currentDate.getFullYear() - parsedDate.getFullYear());
  return `${yearsAgo} jaar geleden`;
}

// // Example usage:
// const dateString = '2023-11-01T12:30:00';
// const { formattedDate, formattedTime } = formatDutchDate(dateString);
// const dateDiffString = formatDutchDateDiff(dateString);

// console.log(formattedDate); // Output: "1 nov 2023"
// console.log(formattedTime); // Output: "12:30"
// console.log(dateDiffString); // Output: "4 weken geleden"
