//helper function that finds the requested index for the array requests
export function isIndexInArray(index, array) {
  if (typeof array[index] === "undefined") {
    return -1;
  } else {
    return index;
  }
}

//helper function
export function checkCorrectType(value) {
  if (typeof value === "number" || typeof value === "string") {
    return true;
  } else {
    return false;
  }
}

module.exports = { isIndexInArray, checkCorrectType };
