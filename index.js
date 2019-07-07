let statesNeeded = ['mt', 'or', 'nv', 'id', 'ut', 'ca', 'az'];
const stations = {
  kone: ['id', 'nv', 'ut'],
  ktwo: ['wa', 'id', 'mt'],
  kthree: ['or', 'nv', 'ca'],
  kfour: ['nv', 'ut'],
  kfive: ['ca', 'az']
};
const finalStations = [];
while (statesNeeded.length > 0) {
  let bestStation = [];
  let statesCovered = [];
  for (let station in stations) {
    const covered = stations[station].filter(state => statesNeeded.indexOf(state) > -1);
    if (covered.length > bestStation.length) {
      bestStation = station;
      statesCovered = covered;
    }
  }
  statesNeeded = statesNeeded.filter(state => statesCovered.indexOf(state) === -1);
  finalStations.push(bestStation);
}

console.log('finalStations ', finalStations);

const moneyTypes = [5000, 1000, 500, 100, 50];
const getMoney1 = amount => {
  if (amount % 50 !== 0) {
    throw new Error('Wrong amount');
  }
  return moneyTypes.reduce((result, note) => {
    const noteCount = Math.floor(amount / note);
    amount -= noteCount * note;
    result[note] = noteCount;
    return result;
  }, {});
};

console.log(getMoney1(14500));

const limits = {
  5000: 4,
  1000: 5,
  500: 2,
  100: 5,
  50: 100
};

const getMoney2 = (amount, limits) => {
  const moneyTypes = Object.keys(limits).map(note => parseInt(note)).sort((a, b) => b - a);
  const moneyResult = moneyTypes.reduce((result, note) => {
    const noteCount = Math.min(Math.floor(amount / note), limits[note]);
    amount -= noteCount * note;
    result[note] = noteCount;
    return result;
  }, {});
  if (amount === 0) {
    return moneyResult;
  } else {
    throw new Error('Wrong amount');
  }
};

console.log(getMoney2(15550, limits));

const newLimits = {
  5000: 4,
  1000: 5,
  500: 2,
  100: 5,
  50: 100,
  30: 23
};

const getMoney3 = (amount, limits) => {
  const noteTypes = Object.keys(limits).map(note => parseInt(note)).sort((a, b) => b - a);
  const neededNotes = {};
  const minNotes = {};
  minNotes[0] = 0;

  for (let sum = 10; sum <= amount; sum += 10) {
    minNotes[sum] = Number.MAX_VALUE;
    for (let note = 0; note < noteTypes.length; note++) {
      const noteValue = noteTypes[note];
      if (sum >= noteValue && minNotes[sum] > minNotes[sum - noteValue] + 1) {
        minNotes[sum] = minNotes[sum - noteValue] + 1;
        break;
      }
    }
  }

  if (minNotes[amount] === Number.MAX_VALUE) {
    throw new Error('Wrong amount');
  }

  let sum = amount;
  while (sum > 0) {
    let currentSum = sum;
    for (let note = 0; note < noteTypes.length; note++) {
      const noteValue = noteTypes[note];
      const isNoteNeeded = limits[noteValue] > 0;
      if (isNoteNeeded && sum >= noteValue &&
        (minNotes[sum] === minNotes[sum - noteValue] + 1 || minNotes[sum] === minNotes[sum - noteValue])) {
        if (!neededNotes[noteValue]) {
          neededNotes[noteValue] = 0;
        }
        neededNotes[noteValue] += 1;
        sum -= noteValue;
        limits[noteValue] -= 1;
        break;
      }
    }
    if (sum === currentSum) {
      throw new Error('There are not enough notes');
    }
  }
  return neededNotes;
};

console.log(getMoney3(19890, newLimits));

const longestSubstring = (str1, str2) => {
  const charTable = new Array(str1.length);
  for (let i = 0; i < str1.length; i++) {
    const charRow = [];
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        charRow[j] = 1 + (i > 0 && j > 0 ? charTable[i - 1][j - 1] : 0);
      } else {
        charRow[j] = 0;
      }
    }
    charTable[i] = charRow;
  }
  console.log('longestSubstring', charTable[str1.length - 1][str2.length - 1]);
};

longestSubstring('fish', 'hish');

const longestSequence = (str1, str2) => {
  const charTable = new Array(str1.length);
  for (let i = 0; i < str1.length; i++) {
    const charRow = [];
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        charRow[j] = 1 + (i > 0 && j > 0 ? charTable[i - 1][j - 1] : 0);
      } else {
        charRow[j] = Math.max((i > 0 ? charTable[i - 1][j] : 0), (j > 0 ? charRow[j - 1] : 0));
      }
    }
    charTable[i] = charRow;
  }
  console.log(charTable[str1.length - 1][str2.length - 1]);
};

longestSequence('fort', 'fosh');