export function formatDate(value?: string | null) {
  if (!value) {
    return "Present";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  })
    .format(date)
    .replace(" ", " '");
}

export function formatRange(
  startDate?: string | null,
  endDate?: string | null,
  isCurrent?: boolean | null,
) {
  const start = formatDate(startDate);

  if (isCurrent) {
    return `${start} - Present`;
  }

  return `${start} - ${formatDate(endDate)}`;
}

export function formatLabel(value?: string | null) {
  if (!value) {
    return "";
  }

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatExperienceRange(
  startDate?: string | null,
  endDate?: string | null,
  isCurrent?: boolean | null,
) {
  const formatDate = (value?: string | null) => {
    if (!value) return "Present";

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "2-digit",
    })
      .format(date)
      .replace(" ", " '");
  };

  const start = formatDate(startDate);

  if (isCurrent) {
    return `${start} - Present`;
  }

  return `${start} - ${formatDate(endDate)}`;
}
