import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { validateProductForm } from "../util/validation";

interface ProductModelProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
  product?: any;
}

const ProductModel: React.FC<ProductModelProps> = ({
  open,
  onClose,
  onAddProduct,
  product,
}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    available: 0,
    sold: 0,
    categoryId: 0,
    colorIds: [] as number[],
    price: 0,
  });

  const { entities: categories = {} } = useSelector(
    (state: any) => state.category
  );
  const { entities: colors = {} } = useSelector((state: any) => state.color);

  const [errors, setErrors] = useState({
    name: "",
    available: "",
    sold: "",
    price: "",
    categoryId: "",
    colorIds: "",
  });

  useEffect(() => {
    setNewProduct({
      name: product?.name || "",
      available: product?.available || 0,
      sold: product?.sold || 0,
      categoryId: product?.categoryId || 0,
      colorIds: product?.colorIds || [],
      price: product?.price || 0,
    });
  }, [product]);

  const handleSubmit = () => {
    const validationError = validateProductForm(newProduct);

    if (validationError) {
      // Cập nhật các lỗi tương ứng cho từng field
      setErrors({
        ...errors,
        name: validationError.includes("name") ? validationError : "",
        available: validationError.includes("Available") ? validationError : "",
        sold: validationError.includes("Sold") ? validationError : "",
        price: validationError.includes("Price") ? validationError : "",
        categoryId: validationError.includes("Category") ? validationError : "",
        colorIds: validationError.includes("color") ? validationError : "",
      });
      return;
    }
    onAddProduct(newProduct); // Nếu không có lỗi, thêm sản phẩm
    onClose();
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    setNewProduct({
      ...newProduct,
      categoryId: parseInt(e.target.value as string),
    });
    setErrors({ ...errors, categoryId: "" }); // Clear lỗi nếu người dùng chọn
  };

  const handleColorToggle = (colorId: number) => {
    const currentColors = newProduct.colorIds;
    if (currentColors.includes(colorId)) {
      setNewProduct({
        ...newProduct,
        colorIds: currentColors.filter((id) => id !== colorId),
      });
    } else {
      setNewProduct({
        ...newProduct,
        colorIds: [...currentColors, colorId],
      });
    }
    setErrors({ ...errors, colorIds: "" }); // Clear lỗi nếu người dùng chọn
  };

  const handleClose = () => {
    setNewProduct({
      name: product?.name || "",
      available: product?.available || 0,
      sold: product?.sold || 0,
      categoryId: product?.categoryId || 0,
      colorIds: product?.colorIds || [],
      price: product?.price || 0,
    });
    setErrors({
      name: "",
      available: "",
      sold: "",
      price: "",
      categoryId: "",
      colorIds: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{product ? "EDIT PRODUCT" : "ADD PRODUCT"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          error={!!errors.name} // Trạng thái lỗi
          helperText={errors.name} // Thông báo lỗi
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />

        <TextField
          margin="dense"
          label="Available"
          name="available"
          type="number"
          fullWidth
          variant="outlined"
          value={newProduct.available}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              available: parseInt(e.target.value),
            })
          }
          error={!!errors.available}
          helperText={errors.available}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />

        <TextField
          margin="dense"
          label="Sold"
          name="sold"
          type="number"
          fullWidth
          variant="outlined"
          value={newProduct.sold}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sold: parseInt(e.target.value) })
          }
          error={!!errors.sold}
          helperText={errors.sold}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />

        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          variant="outlined"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseInt(e.target.value) })
          }
          error={!!errors.price}
          helperText={errors.price}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />

        {/* Category Dropdown */}
        <FormControl
          fullWidth
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          error={!!errors.categoryId}
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={newProduct.categoryId}
            onChange={handleCategoryChange}
            label="Category"
          >
            {Object.keys(categories).map((categoryId) => (
              <MenuItem key={categoryId} value={categoryId}>
                {categories[categoryId]?.name}
              </MenuItem>
            ))}
          </Select>
          {errors.categoryId && (
            <Typography color="error" variant="body2">
              {errors.categoryId}
            </Typography>
          )}
        </FormControl>

        {/* Colors Multi-select */}
        <FormControl fullWidth sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography>Colors</Typography>
          <Box display="flex" gap={2} flexWrap="wrap" sx={{ mt: 1 }}>
            {Object.keys(colors).map((colorId) => {
              const isSelected = newProduct.colorIds.includes(
                parseInt(colorId)
              );
              return (
                <Button
                  key={colorId}
                  onClick={() => handleColorToggle(parseInt(colorId))}
                  variant={isSelected ? "contained" : "outlined"}
                  sx={{
                    borderRadius: 2,
                    textTransform: "capitalize",
                    width: 80,
                    bgcolor: isSelected ? colors[colorId]?.hex : "transparent",
                    color: isSelected ? "#fff" : "inherit",
                  }}
                >
                  {colors[colorId]?.name}
                </Button>
              );
            })}
          </Box>
          {errors.colorIds && (
            <Typography color="error" variant="body2">
              {errors.colorIds}
            </Typography>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModel;
