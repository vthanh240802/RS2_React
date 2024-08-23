// Challange 6:
// Total quantity: 89

const products = [
  {
    name: "Tshirt",

    quantity: 20,

    models: {
      size: 20,

      id: 1,

      color: ["red", "black"],
    },
  },

  null,

  {
    name: "Pant",

    quantity: 19,

    models: {
      size: 26,

      id: 2,

      color: ["black", "white"],
    },
  },

  {
    name: "Long sleeve",

    quantity: 50,

    models: {
      size: 23,

      id: 4,

      color: ["green", "yellow"],
    },
  },
];

function totalQuantity(products) {
  return products.reduce(
    (prev, item) => {
      if (item !== null) {
        prev.total += item.quantity;
        prev.products.push({
          name: item.name,
          quantity: item.quantity,
        });
      }
      return prev;
    },
    { total: 0, products: [] }
  );
}

console.log(totalQuantity(products));

// insert the most popular item

const newProduct = {
  name: "Hoodie",
  quantity: 30,
  models: {
    size: 28,
    id: 2,
    color: ["Blue", "Black"],
  },
};

function insertPopularItem(products, newProduct) {
  if (!newProduct || newProduct.models.id == null) {
    return products;
  }
  const newModelId = newProduct.models.id;
  // const updateProducts = products.filter((item) => item?.models?.id !== newmodelId)
  // They the cho doan if phia duoi do thieu dieu kien 
  const updateProducts = products.reduce((prev, item) => {
    if (item !== null && item.models.id === newModelId) {
      return prev;
    } else {
      prev.push(item);
      return prev;
    }
  }, []);
  updateProducts.unshift(newProduct);
  return updateProducts;
}

console.log(insertPopularItem(products, newProduct));



////////////
console.log("Object - Array");

const arr = [12, 2, 4, 5, 1, 2];

// cach viet obj
// const obj = Object.assign({});
// cach viet obj clone
// const obj2 = { ...obj };

// const obj = {
//   19: 1,
//   9: 2,
//   3: 1,
// };

// console.log(Object.keys(obj));
// console.log(Object.values(obj));

const marks = [
  {
    name: "A",
    mark: 8,
  },
  {
    name: "B",
    mark: 7,
  },
  {
    name: "C",
    mark: 3,
  },
  {
    name: "D",
    mark: 9,
  },
  {
    name: "E",
    mark: 2,
  },
];

// function findMark(...obj) {
//   const obj = marks;
//   if (marks.mark > 5) {
//     console.log(Object.keys(marks.name));
//   }
// }

// console.log(findMark(marks));

// console.log(
//   marks.filter((item) => {
//     return item.mark > 5;
//   })
// );

// filter tao ra 1 array moi va thay doi do dai cua array
// map cung tao ra 1 array moi nhung khong thay doi do dai cua array cũ
// push

// pop lay ra gia tri cuoi cung cua array
// const lastItem = marks.pop();
// console.log(lastItem);

// unshift dua 1 obj vao vi tri dau tien cua array
// shift lay 1 obj tu vi tri dau tien cua array
// console.log("first item", marks.shift());

// const names = [];
// for (let i = 0; i < marks.length; i++) {
//   if (marks[i].mark > 5) {
//     names.push(marks[i].name);
//   }
// }
// console.log(names);

// reduce
const output = marks.reduce((prev, item) => {
  if (item?.mark > 5) {
    prev.push(item.name);
  }
  return prev;
}, []);

console.log("output", output);

const totalMark = marks.reduce((sum, item) => {
  if (item) {
    sum += item.mark;
  }
  return sum;
}, 0);

console.log("totalMark", totalMark);

// find tim ra dc 1 phan tu la dừng
// const findMark = marks.find((item) => item?.mark > 8);
// findIndex thi tra ve vi tri trong array
const findMark = marks.findIndex((item) => item?.mark == 8);
console.log("findMark", findMark);

// forEach khong dừng được trong vòng for
const markgreater5 = [];
marks.forEach((item) => {
  if (item?.mark > 5) {
    markgreater5.push(item.name);
  }
});

console.log(markgreater5);

// sort(); khong tra ve array moi

// slice, splice cắt phần tử từ 1 array

// findColor: black
// => name, size

// function filterProductByColor(product, color) {
//   return product.reduce((prev, item) => {
//     const colors = item?.models?.color || [];
//     const isColorExisting = colors.findIndex((c) => c === color) >= 0;
//     if (isColorExisting) {
//       prev.push({
//         name: item.name,
//         size: item?.models.size,
//       });
//     }
//     return prev;
//   }, []);
// }

// console.log(filterProductByColor(products, "black"));
