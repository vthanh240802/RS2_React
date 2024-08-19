console.log("Hello");

// const array = [3, 2, 5, 4, 3, 1, 5];
// function findNumber(number) {
//   const newArr = [];
//   let index = -1;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] === number) {
//       index = i;
//       break;
//     }
//     if (array[i] < number) {
//       newArr.push(array[i]);
//     }
//   }
//   const val = array[index];
//   console.log("new array ", newArr);
//   return index;
// }

// console.log(findNumber(5));

// Challenge 5:

const array = [3, 2, 5, 4, 3, 1, 5];
function findSmallestNumber(array) {
  let min = array[0];
  const newArr = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  //   console.log("new array ", newArr);
  return console.log("Min: ", min);
}

console.log(findSmallestNumber(array));

function filterDuplicatedNumbers(array) {
  const numberCounts = {}; // chua so lan xuat hien
  const duplicatedNumbers = [];
  for (let i = 0; i < array.length; i++) {
    const number = array[i];
    if (numberCounts[number]) {
      numberCounts[number]++;
      if (numberCounts[number] === 2) {
        duplicatedNumbers.push(number);
      }
    } else {
      numberCounts[number] = 1;
    }
  }

  return duplicatedNumbers;
}

console.log("Duplicate Number: ", filterDuplicatedNumbers(array));
