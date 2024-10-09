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

interface CategoryModelProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (category: any) => void;
  category?: any;
}

const CategoryModel: React.FC<CategoryModelProps> = ({
  open,
  onClose,
  onAddCategory,
  category,
}) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  useEffect(() => {
    setNewCategory({
      name: category?.name || "",
    });
  }, [category]);

  const handleSubmit = () => {
    onAddCategory(newCategory);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModel;
