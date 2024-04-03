// Calculate the x and y coordinates of a click relative to the image
// Return them in both pixel and percent formats
export function getCoordinates(imageRef, event) {
  const { width, height, left, top } = imageRef.current.getBoundingClientRect();
  const positionX = Math.round(event.clientX - left);
  const positionY = Math.round(event.clientY - top);
  const percentX = Math.round((positionX / width) * 100);
  const percentY = Math.round((positionY / height) * 100);
  return { positionX, positionY, percentX, percentY };
}

// Calculate selector position
// Take scroll value into account
// Center selector on click target
export function getSelectorPosition(imageRef, event) {
  const x = Math.round(
    event.clientX + window.scrollX - getSelectorSize(imageRef) / 2,
  );
  const y = Math.round(
    event.clientY + window.scrollY - getSelectorSize(imageRef) / 2,
  );
  return { x, y };
}

// Calculate selector size based on image height
export function getSelectorSize(imageRef) {
  const PERCENT_OF_IMAGE_HEIGHT = 5;
  const { height } = imageRef.current.getBoundingClientRect();
  return Math.round((height * PERCENT_OF_IMAGE_HEIGHT) / 100);
}
