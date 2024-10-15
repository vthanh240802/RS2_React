export const validateForm = function (email: string, password: string) {
  const errors = {
    email: "",
    password: "",
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!password) {
    errors.password = "Password is required";
    return errors;
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

interface Product {
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

interface Category {
  name: string;
}

interface Color {
  name: string;
}

export const validateProductForm = (product: Product): string | null => {
  // Kiểm tra tên sản phẩm không được để trống
  if (!product.name.trim()) {
    return "Product name is required";
  }

  // Kiểm tra available có phải là số và lớn hơn 0
  if (isNaN(product.available) || product.available <= 0) {
    return "Available quantity must be a number greater than 0";
  }

  // Kiểm tra sold có phải là số và lớn hơn 0
  if (isNaN(product.sold) || product.sold < 0) {
    return "Sold quantity must be a number greater than or equal to 0";
  }

  // Kiểm tra giá có phải là số và lớn hơn 0
  if (isNaN(product.price) || product.price <= 0) {
    return "Price must be a number greater than 0";
  }

  // Kiểm tra categoryId phải được chọn
  if (
    !product.categoryId ||
    isNaN(product.categoryId) ||
    product.categoryId <= 0
  ) {
    return "Category must be selected";
  }

  // Kiểm tra ít nhất một color phải được chọn
  if (!product.colorIds || product.colorIds.length === 0) {
    return "At least one color must be selected";
  }

  // Nếu không có lỗi, trả về null
  return null;
};

export const validateCategoryForm = (category: Category): string | null => {
  if (!category.name.trim()) {
    return "Category name is required";
  }
  return null;
};

export const validateColorForm = (color: Color): string | null => {
  if (!color.name.trim()) {
    return "Color name is required";
  }
  const isNumber = /^\d+$/.test(color.name.trim());
  if (isNumber) {
    return "Color name cannot be a number";
  }

  return null;
};
