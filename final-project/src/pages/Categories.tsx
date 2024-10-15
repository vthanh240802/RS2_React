import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  SnackbarCloseReason,
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
import { StyleTableCell, StyleTableRow } from "../components/styles";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import CategoryModel from "../components/CategoryModel";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
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

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleOpenAdd = () => {
    setCurrentCategory(null);
    setOpen(true);
  };

  const handleAddCategory = (category: any) => {
    dispatch(addCategory(category))
      .unwrap()
      .then(() => {
        setSnackBarMessage("Thêm Category thành công");
        setOpenSnackBar(true);
        setOpen(false);
      })
      .catch((error) => {
        setSnackBarMessage("Thêm Category thất bại");
      });
  };
  const handleClose = () => setOpen(false);

  const handleEdit = (id: string) => {
    setEditedCategory({ ...editedCategory, [id]: categories[id].name });
    setIsEditing({ ...isEditing, [id]: true });
  };

  const handleSave = (id: string) => {
    dispatch(updateCategory({ id, name: editedCategory[id] }))
      .unwrap()
      .then(() => {
        setSnackBarMessage("Cập nhật Category thành công");
        setOpenSnackBar(true);
        setIsEditing({ ...isEditing, [id]: false });
      })
      .catch((error) => {
        setSnackBarMessage("Cập nhật Category thất bại");
        setOpenSnackBar(true);
      });
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
          setSnackBarMessage("Xóa Category thành công");
          setOpenSnackBar(true);
          setOpenConfirm(false);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa Category:", error);
        });
      setCategoryToDelete(null);
    }
  };

  const headers = [{ text: "No" }, { text: "Name" }, { text: "Action" }];
  return (
    <>
      <TableContainer sx={{}}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
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
            <TableRow style={StyleTableRow}>
              {headers.map((header) => (
                <TableCell key={header.text}>{header.text}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={StyleTableCell}>
                  {index + 1}
                </TableCell>

                <TableCell style={StyleTableCell} sx={{ width: "20%" }}>
                  {isEditing[id] ? (
                    <TextField
                      value={editedCategory[id] || ""}
                      onChange={(e) => handleNameChange(id, e.target.value)}
                      sx={{
                        width: "100%",
                        height: "1px",
                        "& .MuiInputBase-input": {
                          padding: "0px 12px",
                        },
                      }}
                    />
                  ) : (
                    categories[id].name
                  )}
                </TableCell>
                <TableCell style={StyleTableCell}>
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
