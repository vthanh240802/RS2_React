console.log("Hello");

function Student(fullName, dateOfBirth) {
  this.fullName = fullName;
  this.dateOfBirth = dateOfBirth;
}

Student.prototype.getFristName = function () {
  return this.fullName.split(" ").pop();
};

Student.prototype.getAge = function () {
  const year = Number(this.dateOfBirth.split("/").pop());
  return new Date().getFullYear() - year;
};

const student = new Student("Luong Viet Thanh", "24/08/2002");

student.getFristName();

console.log(student.getFristName());
console.log(student.getAge());

// challenge 7

/**

	function SortedArray() {
		this.numbers = [];
	}

  SortedArray.prototype.initNumbers = function (arr) {}; // set arr to this.numbers

	SortedArray.prototype.get = function (num) {}; // return index of num

	SortedArray.prototype.set = function (num) {} // correct order in arr

	SortedArray.prototype.remove = function(num){} // remove num in arr

**/

// challange_7
function SortedArray() {
  this.numbers = [];
}

SortedArray.prototype.initNumbers = function (arr) {
  this.numbers = arr.slice();
  this.numbers.sort((a, b) => a - b);
};

const sortedArr = new SortedArray();
sortedArr.initNumbers([5, 2, 9, 1, 7]);
console.log(sortedArr.numbers);

SortedArray.prototype.get = function (num) {
  return this.numbers.indexOf(num);
};

console.log("Index Number: ", sortedArr.get(1));

SortedArray.prototype.set = function (num) {
  const index = this.numbers.findIndex((x) => x >= num);
  if (index === -1) {
    this.numbers.push(num);
  } else {
    this.numbers.splice(index, 0, num);
  }
};
sortedArr.set(2);
console.log(sortedArr.numbers);

SortedArray.prototype.remove = function (num) {
  let index = this.numbers.indexOf(num);
  if (index !== -1) {
    this.numbers.splice(index, 1);
  }
};

sortedArr.remove(10);
console.log(sortedArr.numbers);