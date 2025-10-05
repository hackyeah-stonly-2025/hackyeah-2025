export function isEmailValid(email) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export const getNextId = (items) => {
  if (!items.length) return 0;
  const ids = items.map((item) => item.id);
  return Math.max(...ids) + 1;
};

export const generateRandomUUID = () => {
  const uuidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return uuidTemplate.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const caseInsensitiveCompare = (a = '', b = '') => {
  return a.toUpperCase().includes(b.toUpperCase());
};

export const getDomainFromUrl = (url) => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export const shortenLink = (link) => {
  if (!link) return '';
  const linkRegex = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/;
  const match = link.match(linkRegex);
  return match ? match[1] : link;
};

export const formatTime = (minutes) => {
  if (!minutes) {
    return '-';
  }

  const min = Math.floor(minutes % 60);
  const h = Math.floor(minutes / 60);

  if (!h) {
    return `${min}min`;
  }

  if (!min) {
    return `${h}h`;
  }

  return `${h}h ${min}min`;
};

export const getRandomIntInRange = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function getBufferFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

function convertSpacingValueToPixels(value) {
  if (!value) return 0;
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

export function calculateSpacingValue(
  spacing = 0,
  spacingTop,
  spacingRight,
  spacingBottom,
  spacingLeft,
  spacingX,
  spacingY,
) {
  if (spacing && typeof spacing === 'string' && spacing.includes(' ')) {
    return spacing;
  }

  const spacingArray = new Array(4).fill(convertSpacingValueToPixels(spacing));

  if (spacingTop !== undefined) {
    spacingArray[0] = convertSpacingValueToPixels(spacingTop);
  }
  if (spacingRight !== undefined) {
    spacingArray[1] = convertSpacingValueToPixels(spacingRight);
  }
  if (spacingBottom !== undefined) {
    spacingArray[2] = convertSpacingValueToPixels(spacingBottom);
  }
  if (spacingLeft !== undefined) {
    spacingArray[3] = convertSpacingValueToPixels(spacingLeft);
  }
  if (spacingX !== undefined) {
    spacingArray[1] = convertSpacingValueToPixels(spacingX);
    spacingArray[3] = convertSpacingValueToPixels(spacingX);
  }
  if (spacingY !== undefined) {
    spacingArray[0] = convertSpacingValueToPixels(spacingY);
    spacingArray[2] = convertSpacingValueToPixels(spacingY);
  }

  if (!spacingArray.filter(Boolean).length) return null;

  return spacingArray.join(' ');
}
