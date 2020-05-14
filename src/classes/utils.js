
export function getRandEl(arr) {
    return arr[getRandNum(0 , arr.length -1)];
}

export function getRandNum(min,max) {
    return Math.floor(Math.random()*(max+1-min) + min);
}

export function getRandFilteredEl(arr, filter, maxTries) {
    if (!Array.isArray(filter)) {
      filter = [filter];
    }
    maxTries = maxTries || 100;
    var randEl = getRandEl(arr);
    for (var i = 0; i < maxTries && filter.includes(randEl); i++) {
      randEl = getRandEl(arr);
    }
    if (randEl === filter) {
      throw 'Could not find valid element';
    }
    return randEl;
  }
