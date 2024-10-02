// AddProductModal.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
import { Label } from "@mui/icons-material";

interface ProductModelProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

const ProductModel: React.FC<ProductModelProps> = ({
  open,
  onClose,
  onAddProduct,
}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    available: 0,
    sold: 0,
    categoryId: 0,
    colorIds: "",
    price: 0,
  });

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <TextField
          margin="dense"
          label="Available"
          name="available"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <FormControl fullWidth sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Cloth</MenuItem>
            <MenuItem value={20}>Bag</MenuItem>
            <MenuItem value={30}>Accessory</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography sx={{ color: "#6f6f6f" }}>Color</Typography>
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            sx={{ marginTop: "10px" }}
          >
            <Button>White</Button>
            <Button>Black</Button>
            <Button>Red</Button>
          </ButtonGroup>
        </Box>
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModel;
