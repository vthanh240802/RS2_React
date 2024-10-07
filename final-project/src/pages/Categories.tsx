import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../store/reducers/categoryReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { StyleTableHead } from "../components/styles";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import CategoryModel from "../Model/CategoryModel";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState<{
    [key: string]: string;
  }>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const state = useSelector((state: any) => console.log(state));
  const {
    entities: categories = {},
    ids: categoryIds = [],
    status,
    error,
  } = useSelector((state: any) => state.category);

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleOpenAdd = () => {
    setCurrentCategory(null);
    setOpen(true);
  };

  const handleAddCategory = (category: any) => {
    dispatch(addCategory(category))
      .unwrap()
      .then(() => {
        console.log("Category mới đã được thêm thành công!");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm Category:", error);
      });
  };
  const handleClose = () => setOpen(false);

  const handleEdit = (id: string) => {
    setEditedCategory({ ...editedCategory, [id]: categories[id].name });
    setIsEditing({ ...isEditing, [id]: true });
  };

  const handleSave = (id: string) => {
    dispatch(updateCategory({ id, name: editedCategory[id] }));
    setIsEditing({ ...isEditing, [id]: false });
  };

  const handleNameChange = (id: string, value: string) => {
    setEditedCategory({ ...editedCategory, [id]: value });
  };

  const handleCloseDeleteConfirm = () => {
    setOpenConfirm(false);
    setCategoryToDelete(null);
  };

  const handleOpenDeleteConfirm = (id: number) => {
    setCategoryToDelete(id);
    setOpenConfirm(true);
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete))
        .unwrap()
        .then(() => {
          console.log("Category đã được xóa thành công!");
          setOpenConfirm(false);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa Category:", error);
        });
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <TableContainer sx={{}}>
        <Box sx={{ marginBottom: "20px", display: "flex" }}>
          <Button
            variant="outlined"
            disableElevation
            color="success"
            type="submit"
            startIcon={<LibraryAddOutlinedIcon />}
            onClick={handleOpenAdd}
            sx={{ height: 60, marginLeft: "10px" }}
          >
            ADD
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={StyleTableHead}>No</TableCell>
              <TableCell style={StyleTableHead}>Name</TableCell>
              <TableCell style={StyleTableHead}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>

                <TableCell>
                  {isEditing[id] ? (
                    <TextField
                      value={editedCategory[id] || ""}
                      onChange={(e) => handleNameChange(id, e.target.value)}
                    />
                  ) : (
                    categories[id].name
                  )}
                </TableCell>

                <TableCell>
                  <div>
                    {isEditing[id] ? (
                      <Button
                        variant="outlined"
                        disableElevation
                        color="success"
                        startIcon={<SaveIcon />}
                        sx={{ marginRight: "10px" }}
                        onClick={() => handleSave(id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disableElevation
                        color="success"
                        startIcon={<EditIcon />}
                        sx={{ marginRight: "10px" }}
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      disableElevation
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDeleteConfirm(categories[id].id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CategoryModel
        open={open}
        onClose={handleClose}
        onAddCategory={handleAddCategory}
        category={currentCategory}
      />
    </>
  );
};

export default Categories;
