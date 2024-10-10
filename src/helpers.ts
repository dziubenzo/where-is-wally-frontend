import type { RefObject } from 'react';
import type { Level } from './loaders';

export type CharacterButton = {
  imageURL: string;
  alt: string;
  hintColour: string;
};

// Calculate the x and y coordinates of a click relative to the image
// Return them in percent format
export const getCoordinates = (
  imageRef: RefObject<HTMLImageElement>,
  event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  precise: boolean = false,
) => {
  const { width, height, left, top } =
    imageRef.current!.getBoundingClientRect();
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
};

// Calculate selector position
// Take scroll value into account
// Center selector on click target
export const getSelectorPosition = (
  imageRef: RefObject<HTMLImageElement>,
  event: React.MouseEvent<HTMLImageElement, MouseEvent>,
) => {
  const x = Math.round(
    event.clientX + window.scrollX - getCircleSize(imageRef) / 2,
  );
  const y = Math.round(
    event.clientY + window.scrollY - getCircleSize(imageRef) / 2,
  );
  return { x, y };
};

// Calculate selector/character marker size based on image height
// Use default value for selector
export const getCircleSize = (
  imageRef: RefObject<HTMLImageElement>,
  percent: number = 5,
) => {
  const PERCENT_OF_IMAGE_HEIGHT = percent;
  const { height } = imageRef.current!.getBoundingClientRect();
  return Math.round((height * PERCENT_OF_IMAGE_HEIGHT) / 100);
};

// Check if image click is character click
// Return character name or empty string otherwise
export const checkImageClick = (
  clickX: number,
  clickY: number,
  characters: Level['characters'],
) => {
  const ERROR_THRESHOLD_PERCENT_X = 1;
  const ERROR_THRESHOLD_PERCENT_Y = 2;

  for (const character of characters) {
    // Set thresholds
    const lowThresholdX = character.x - ERROR_THRESHOLD_PERCENT_X;
    const highThresholdX = character.x + ERROR_THRESHOLD_PERCENT_X;
    const lowThresholdY = character.y - ERROR_THRESHOLD_PERCENT_Y;
    const highThresholdY = character.y + ERROR_THRESHOLD_PERCENT_Y;

    if (clickX >= lowThresholdX && clickX <= highThresholdX) {
      if (clickY >= lowThresholdY && clickY <= highThresholdY) {
        return character.name;
      }
    }
  }
  return '';
};

// Class for API errors
export class ApiError extends Error {
  status;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

// URLs of character button images and alt text
export const characterButtonsData: CharacterButton[] = [
  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/ic8mirwy2sevpresfwjf.png',
    alt: 'Wally',
    hintColour: '#ff4938',
  },

  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/xfa7vlvbt5yeaelsthvw.png',
    alt: 'Wenda',
    hintColour: '#c15bf5',
  },
  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321422/where-is-wally/xaj4haqv5ffosok8yr7o.png',
    alt: 'Wizard Whitebeard',
    hintColour: '#456aff',
  },
  {
    imageURL:
      'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/jcrmujs7eunawcwcmuk4.png',
    alt: 'Odlaw',
    hintColour: '#ffff40',
  },
];

// Convert character's percent coordinates into pixels taking into account image size, its location from the top and left of viewport and scroll
// Centre the resulting circle on the character
export const getCharacterMarkerPos = (
  characterX: number,
  characterY: number,
  imageRef: RefObject<HTMLImageElement>,
) => {
  const { width, height, left, top } =
    imageRef.current!.getBoundingClientRect();
  const pixelX =
    Math.round((characterX * width) / 100) +
    Math.round(left + window.scrollX - getCircleSize(imageRef, 10) / 2);
  const pixelY =
    Math.round((characterY * height) / 100) +
    Math.round(top + window.scrollY - getCircleSize(imageRef, 10) / 2);
  return { pixelX, pixelY };
};

// Calculate hint marker size based on image height and width
export const getHintSize = (imageRef: RefObject<HTMLImageElement>) => {
  const PERCENT_OF_IMAGE_HEIGHT = 33;
  const PERCENT_OF_IMAGE_WIDTH = 33;
  const { width, height } = imageRef.current!.getBoundingClientRect();
  const hintWidth = Math.round((width * PERCENT_OF_IMAGE_WIDTH) / 100);
  const hintHeight = Math.round((height * PERCENT_OF_IMAGE_HEIGHT) / 100);
  return { sizeX: hintWidth, sizeY: hintHeight };
};

// Convert character's percent coordinates into pixels taking into account image size, its location from the top and left of viewport and scroll
export const getHintMarkerPos = (
  characterX: number,
  characterY: number,
  imageRef: RefObject<HTMLImageElement>,
) => {
  const { width, height, left, top } =
    imageRef.current!.getBoundingClientRect();
  const { sizeX, sizeY } = getHintSize(imageRef);
  const { shiftX, shiftY } = getShifts(imageRef);
  const pixelX =
    Math.round((characterX * width) / 100 + shiftX) +
    Math.round(left + window.scrollX - sizeX / 2);
  const pixelY =
    Math.round((characterY * height) / 100 + shiftY) +
    Math.round(top + window.scrollY - sizeY / 2);
  return { pixelX, pixelY };
};

// Generate a random integer between -number and number
export const getRandomInteger = (integer: number) => {
  const min = integer - integer * 2;
  const max = integer;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random shifts of the max value of SHIFT_PERCENT (25% seems OK) of the hint marker width/height in both x and y directions
// With no shifts, the character would always in the centre of the hint marker
export const getShifts = (imageRef: RefObject<HTMLImageElement>) => {
  const SHIFT_PERCENT = 25;
  const { sizeX, sizeY } = getHintSize(imageRef);
  const shiftX = getRandomInteger((sizeX * SHIFT_PERCENT) / 100);
  const shiftY = getRandomInteger((sizeY * SHIFT_PERCENT) / 100);
  return { shiftX, shiftY };
};

// Get the dead centre coordinates of the image relative to the entire page
// Take into account selector size and scroll values if any
export const getImageCentrePos = (imageRef: RefObject<HTMLImageElement>) => {
  if (imageRef.current) {
    const x =
      imageRef.current.getBoundingClientRect().left +
      imageRef.current.getBoundingClientRect().width / 2 +
      window.scrollX -
      getCircleSize(imageRef) / 2;
    const y =
      imageRef.current.getBoundingClientRect().top +
      imageRef.current.getBoundingClientRect().height / 2 +
      window.scrollY -
      getCircleSize(imageRef) / 2;
    return { x, y };
  }
  return { x: 0, y: 0 };
};
