import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../store/reducers/productReducer";
import { fetchCategories } from "../store/reducers/categoryReducer";
import { fetchColor } from "../store/reducers/colorReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ProductModel from "../components/ProductModel";
import { styled } from "@mui/material/styles";
import { StyleTableCell, StyleTableRow } from "../components/styles";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "auto",
  height: "40px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#f6f6f6",
  border: "none",
  borderRadius: "5px",
  fontWeight: "600",
}));

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const {
    entities: products = {},
    ids: productIds = [],
    status,
  } = useSelector((state: any) => state.product);

  const { entities: categories = {} } = useSelector(
    (state: any) => state.category
  );
  const { entities: colors = {} } = useSelector((state: any) => state.color);

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategories());
    dispatch(fetchColor());
  }, [status, dispatch]);

  const getCategoryNameById = (id: string) => {
    const category = categories[id];
    return category ? category.name : "Unknown";
  };

  const getColorNamesById = (colorIds: number[]) => {
    if (colorIds.length === 0) {
      return "";
    } else if (colorIds.length === 1) {
      const colorName = colors[colorIds[0]]?.name;
      return colorName ? colorName : "Unknown color";
    } else {
      const colorNames = colorIds
        .map((colorId) => colors[colorId]?.name || null)
        .filter((name) => name !== null);
      if (colorNames.length === 0) {
        return "";
      }
      return colorNames.join(", ");
    }
  };

  const totalProducts = useMemo(() => {
    return productIds
      .reduce(
        (index: number, id: string) =>
          index + (products[id].available * products[id].sold || 0),
        0
      )
      .toLocaleString();
  }, [productIds, products]);

  const totalAvailable = useMemo(() => {
    return productIds
      .reduce(
        (index: number, id: string) => index + (products[id].available || 0),
        0
      )
      .toLocaleString();
  }, [productIds, products]);

  const totalSold = useMemo(() => {
    return productIds
      .reduce(
        (index: number, id: string) => index + (products[id].sold || 0),
        0
      )
      .toLocaleString();
  }, [productIds, products]);
  const revenue = useMemo(() => {
    return productIds
      .reduce(
        (index: number, id: string) =>
          index + (products[id].price * products[id].sold || 0),
        0
      )
      .toLocaleString();
  }, [productIds, products]);

  const handleOpenAdd = () => {
    setCurrentProduct(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddProduct = (product: any) => {
    if (currentProduct) {
      // Cập nhật sản phẩm hiện tại
      dispatch(updateProduct({ ...currentProduct, ...product }))
        .unwrap()
        .then(() => {
          setSnackBarMessage("Cập nhật product thành công");
          setOpenSnackBar(true);
          setOpen(false);
        })
        .catch((error) => {
          setSnackBarMessage("Cập nhật product thất bại");
          setOpenSnackBar(true);
        });
    } else {
      // Thêm sản phẩm mới
      dispatch(addProduct(product))
        .unwrap()
        .then(() => {
          setSnackBarMessage("Thêm product thành công");
          setOpenSnackBar(true);
          setOpen(false);
        })
        .catch((error) => {
          setSnackBarMessage("Thêm product thất bại");
          setOpenSnackBar(true);
        });
    }
  };

  const handleOpenEdit = (product: any) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenConfirm(false);
    setProductToDelete(null);
  };

  const handleOpenDeleteConfirm = (id: number) => {
    setProductToDelete(id);
    setOpenConfirm(true);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete))
        .unwrap()
        .then(() => {
          setSnackBarMessage("Xóa Product thành công");
          setOpenSnackBar(true);
          setOpenConfirm(false);
        })
        .catch((error) => {
          setSnackBarMessage("Xóa Product thất bại");
          setOpenSnackBar(true);
        });
      setProductToDelete(null);
    }
  };

  const headers = [
    { text: "No" },
    { text: "Name" },
    { text: "Available" },
    { text: "Sold" },
    { text: "Category" },
    { text: "Colors" },
    { text: "Price" },
    { text: "ACtion" },
  ];
  return (
    <>
      <TableContainer>
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
          <Stack direction="row" spacing={2}>
            <DemoPaper variant="outlined">Total: {totalProducts}</DemoPaper>
            <DemoPaper variant="outlined">
              Available: {totalAvailable}
            </DemoPaper>
            <DemoPaper variant="outlined">Sold: {totalSold}</DemoPaper>
            <DemoPaper variant="outlined">Revenue: {revenue}</DemoPaper>
          </Stack>
          <Box>
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
            {productIds.map((id: string, index: number) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell style={StyleTableCell}>
                  {products[id].name}
                </TableCell>
                <TableCell style={StyleTableCell}>
                  {products[id].available}
                </TableCell>
                <TableCell style={StyleTableCell}>
                  {products[id].sold}
                </TableCell>
                <TableCell style={StyleTableCell}>
                  {getCategoryNameById(products[id].categoryId)}
                </TableCell>
                <TableCell style={StyleTableCell}>
                  {getColorNamesById(products[id].colorIds)}
                </TableCell>
                <TableCell style={StyleTableCell}>
                  {products[id].price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    disableElevation
                    color="success"
                    startIcon={<EditIcon />}
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleOpenEdit(products[id])}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    disableElevation
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDeleteConfirm(products[id].id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ProductModel
        open={open}
        onClose={handleClose}
        onAddProduct={handleAddProduct}
        product={currentProduct}
      />
    </>
  );
};

export default Products;
