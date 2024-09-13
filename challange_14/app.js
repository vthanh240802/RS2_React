console.log("Hello");

// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610...

function getFibN(n) {
  if (n <= 1) return 1;
  return getFibN(n - 1) + getFibN(n - 2);
}

function calTime(fn, n) {
  const startTime = Date.now();
  const res = fn(n);
  console.log(res, Date.now() - startTime);
}

// calTime(getFibN, 15);

function getFibN2(n) {
  if (n <= 1) return n;
  let a = 0,
    b = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// calTime(getFibN2, 6);

const regionCode = {
  "+84": "VN",
  "+65": "SG",
  "+1": "US",
  "+353": "Ireland",
};

function formatPhoneNumber(phone) {
  let curentRegionCode = "";
  let i = 2;
  while (i <= 4) {
    curentRegionCode = phone.substring(0, i);
    if (regionCode[curentRegionCode]) {
      break;
    }
    i++;
  }
  const phoneNumber = phone.substring(i);
  if (phoneNumber.length === 8) {
    return `(${curentRegionCode}) ${phoneNumber.substring(
      0,
      4
    )} ${phoneNumber.substring(4)}`;
  }
  return `(${curentRegionCode}) ${phoneNumber.substring(
    0,
    3
  )} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
}

console.log("+84123456789: ", formatPhoneNumber("+84123456789"));
console.log("+6512345678: ", formatPhoneNumber("+6512345678"));
console.log("+3531234567891: ", formatPhoneNumber("+3531234567891"));

const products1 = [
  {
    id: 1,
    name: "T Shirt",
    quantity: 10,
    colors: ["red", "yellow"],
  },
  {
    id: 2,
    name: "Plant",
    quantity: 11,
    colors: ["black"],
  },
];

const products2 = [
  {
    id: 1,
    name: "T Shirt",
    quantity: 15,
    colors: ["red", "yellow", "White"],
  },
  {
    id: 3,
    name: "Sweater",
    quantity: 12,
    colors: ["Brown"],
  },
];

function mergeProducts(products1, newProducts2) {
  const objProduct2 = {};
  const result = [...newProducts2];
  for (let i = 0; i < newProducts2.length; i++) {
    objProduct2[newProducts2[i]["id"]] = newProducts2[i];
  }

  for (let i = 0; i < products1.length; i++) {
    if (!objProduct2[products1[i]["id"]]) {
      result.push(products1[i]);
    }
  }
  return result;
}

// console.log(mergeProducts(products1, products2));

function mergeProducts2(product1, product2) {
  const result = [];
  let i = 1,
    j = 0;
  while (i < product1.length && j <= product2.length) {
    if (product1[i]["id"] >= product2[j]["id"]) {
      result.push(product2[j]);
      if (product1[i]["id"] === product2[j]["id"]) {
        i++;
      }
      j++;
      continue;
    }
    if (product1[i]["id"] < product2[j]["id"]) {
      result.push(product1[i]);
      i++;
      continue;
    }
  }

  if (i < product1.length) {
    result.push(...product1.splice(i));
  }
  if (j < product2.length) {
    result.push(...product2.splice(j));
  }
  return result;
}

console.log(mergeProducts2(products1, products2));

// Challenge 14:
/**
 * 1. merge n array products
 * listProducts: [products, products]
 * function mergeNArrayProducts(listProducts) {
 * }
 *
 * 2. format currency
 * amount: number - 100000
 * return: 1,000,000 10,000
 * function formatCurrency(amount) {}
 */

function formatCurrency(amount) {
  let result = "";
  let count = 0;
  amount = amount.toString();
  for (let i = amount.length - 1; i >= 0; i--) {
    result = amount[i] + result;
    count++;
    if (count === 3 && i !== 0) {
      result = "," + result;
      count = 0;
    }
  }

  return result;
}

console.log(formatCurrency(100000));
console.log(formatCurrency(1000000000000));
console.log(formatCurrency(10000));
