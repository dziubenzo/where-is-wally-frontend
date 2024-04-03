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
