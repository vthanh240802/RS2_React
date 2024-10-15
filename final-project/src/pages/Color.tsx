import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  addColor,
  deleteColor,
  fetchColor,
} from "../store/reducers/colorReducer";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { validateColorForm } from "../util/validation";

const Color = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<number | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
    error,
  } = useSelector((state: any) => state.color);

  const [newColor, setNewColor] = useState({ name: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColor());
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

  const [errors, setErrors] = useState({
    name: "",
  });

  const handleAdd = () => {
    // Xác thực form
    const validationError = validateColorForm(newColor); // Truyền `newColor` vào hàm validate

    if (validationError) {
      // Nếu có lỗi, cập nhật state errors
      setErrors({
        ...errors,
        name: validationError.includes("name") ? validationError : "",
      });
      return;
    }

    const colorWithId = { ...newColor, id: Date.now().toString() }; // Thêm color kèm id
    dispatch(addColor(colorWithId))
      .unwrap()
      .then(() => {
        setSnackBarMessage("Thêm color thành công");
        setOpenSnackBar(true);
        setNewColor({ name: "" });
        setErrors({ name: "" }); // Reset lỗi sau khi thêm thành công
      })
      .catch(() => {
        setSnackBarMessage("Thêm color thất bại");
        setOpenSnackBar(true);
      });
  };

  const handleCloseDeleteConfirm = () => {
    setOpenConfirm(false);
    setColorToDelete(null);
  };

  const handleOpenDeleteConfirm = (id: number) => {
    setColorToDelete(id);
    setOpenConfirm(true);
  };

  const handleDeleteColor = () => {
    if (colorToDelete) {
      dispatch(deleteColor(colorToDelete))
        .unwrap()
        .then(() => {
          setSnackBarMessage("Xóa color thành công");
          setOpenSnackBar(true);
          setOpenConfirm(false);
        })
        .catch((error) => {
          setSnackBarMessage("Xóa color thất bại");
          setOpenSnackBar(true);
        });
      setColorToDelete(null);
    }
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
        <Typography variant="h4" mb={2}>
          Color List
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            {colorIds.map((id: string) => (
              <Chip
                key={id}
                label={colors[id].name}
                onDelete={() => handleOpenDeleteConfirm(colors[id].id)}
                deleteIcon={<ClearOutlinedIcon />}
                sx={{ width: "100px", height: "40px" }}
              />
            ))}
          </Stack>
          <Box display="flex" alignItems="center">
            <TextField
              label="Add Color"
              value={newColor.name}
              onChange={(e) =>
                setNewColor({ ...newColor, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
              sx={{ marginRight: 2, marginLeft: 2 }}
            />
            <Button
              variant="outlined"
              disableElevation
              color="success"
              type="submit"
              startIcon={<LibraryAddOutlinedIcon />}
              onClick={handleAdd}
              sx={{ height: 60, marginLeft: "10px" }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={openConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle id="alert-dialog-title">{"Delete Color"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteColor} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Color;
