// Calculate the x and y coordinates of a click relative to the image
// Return them in percent format
export function getCoordinates(imageRef, event, precise = false) {
  const { width, height, left, top } = imageRef.current.getBoundingClientRect();
  const positionX = Math.round(event.clientX - left);
  const positionY = Math.round(event.clientY - top);
  if (precise) {
    const percentX = (positionX / width) * 100;
    const percentY = (positionY / height) * 100;
    return { percentX, percentY };
  }
  const percentX = Math.round((positionX / width) * 100);
  const percentY = Math.round((positionY / height) * 100);
  return { percentX, percentY };
}

// Calculate selector position
// Take scroll value into account
// Center selector on click target
export function getSelectorPosition(imageRef, event) {
  const x = Math.round(
    event.clientX + window.scrollX - getCircleSize(imageRef) / 2,
  );
  const y = Math.round(
    event.clientY + window.scrollY - getCircleSize(imageRef) / 2,
  );
  return { x, y };
}

// Calculate selector/character marker size based on image height
// Use default value for selector
export function getCircleSize(imageRef, percent = 5) {
  const PERCENT_OF_IMAGE_HEIGHT = percent;
  const { height } = imageRef.current.getBoundingClientRect();
  return Math.round((height * PERCENT_OF_IMAGE_HEIGHT) / 100);
}

// Check if image click is character click
// Return character name or empty string otherwise
export function checkImageClick(clickX, clickY, characters) {
  const ERROR_THRESHOLD_PERCENT = 1;

  for (const character of characters) {
    // Set thresholds
    const lowThresholdX = character.x - ERROR_THRESHOLD_PERCENT;
    const highThresholdX = character.x + ERROR_THRESHOLD_PERCENT;
    const lowThresholdY = character.y - ERROR_THRESHOLD_PERCENT;
    const highThresholdY = character.y + ERROR_THRESHOLD_PERCENT;

    if (clickX >= lowThresholdX && clickX <= highThresholdX) {
      if (clickY >= lowThresholdY && clickY <= highThresholdY) {
        return character.name;
      }
    }
  }
  return '';
}

// Class for API errors
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

// URLs of character button images and alt text
export const characterButtonsData = [
  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/ic8mirwy2sevpresfwjf.png',
    alt: 'Wally',
  },

  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/xfa7vlvbt5yeaelsthvw.png',
    alt: 'Wenda',
  },
  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321422/where-is-wally/xaj4haqv5ffosok8yr7o.png',
    alt: 'Wizard Whitebeard',
  },
  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/jcrmujs7eunawcwcmuk4.png',
    alt: 'Odlaw',
  },
];

// Convert character's percent coordinates into pixels taking into account image size, its location from the top and left of viewport and scroll
// Centre the resulting circle on the character
export function getCharacterMarkerPos(characterX, characterY, imageRef) {
  const { width, height, left, top } = imageRef.current.getBoundingClientRect();
  const pixelX =
    Math.round((characterX * width) / 100) +
    Math.round(left + window.scrollX - getCircleSize(imageRef, 10) / 2);
  const pixelY =
    Math.round((characterY * height) / 100) +
    Math.round(top + window.scrollY - getCircleSize(imageRef, 10) / 2);
  return { pixelX, pixelY };
}
