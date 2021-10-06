//helper function that finds the requested index for the array requests
export function isIndexInArray(
  index: number,
  array: (string | number)[]
): number {
  if (typeof array[index] === "undefined") {
    return -1;
  } else {
    return index;
  }
}

//helper function
export function checkCorrectType(value: string | number): boolean {
  if (typeof value === "number" || typeof value === "string") {
    return true;
  } else {
    return false;
  }
}

module.exports = { isIndexInArray, checkCorrectType };
