// Returns the number in the array after the first occurrence of specified number, wrapping to start if reached end of array.
// Returns null if the number is not in the array
export default function nextNumInList(number, array) {
  const numberIndex = array.indexOf(number);
  const nextIndex = (numberIndex + 1) % array.length;
  return array[nextIndex];
}