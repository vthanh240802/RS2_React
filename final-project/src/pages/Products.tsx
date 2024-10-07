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
import { color } from "../store/reducers/colorReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ProductModel from "../Model/ProductModel";
import { styled } from "@mui/material/styles";
import { StyleTableHead } from "../components/styles";

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
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

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
      dispatch(fetchCategories());
      dispatch(color());
    }
  }, [status, dispatch]);

  const getCategoryNameById = (id: string) => {
    const category = categories[id];
    return category ? category.name : "Unknown";
  };

  const getColorNamesById = (colorIds: number[]) => {
    if (colorIds.length === 0) {
      return "No colors available";
    } else if (colorIds.length === 1) {
      const colorName = colors[colorIds[0]]?.name;
      return colorName ? colorName : "Unknown color";
    } else {
      return colorIds
        .map((colorId) => colors[colorId]?.name || "Unknown")
        .join(", ");
    }
  };

  const totalProducts = useMemo(() => productIds.length, [productIds]);
  const totalAvailable = useMemo(() => {
    return productIds.reduce(
      (index: number, id: string) => index + (products[id].available || 0),
      0
    );
  }, [productIds, products]);

  const totalSold = useMemo(() => {
    return productIds.reduce(
      (index: number, id: string) => index + (products[id].sold || 0),
      0
    );
  }, [productIds, products]);
  const revenue = useMemo(() => {
    return productIds.reduce(
      (index: number, id: string) => index + (products[id].price || 0),
      0
    );
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
          console.log("Sản phẩm đã được cập nhật thành công!");
          setOpen(false);
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật sản phẩm:", error);
        });
    } else {
      // Thêm sản phẩm mới
      dispatch(addProduct(product))
        .unwrap()
        .then(() => {
          console.log("Sản phẩm mới đã được thêm thành công!");
          setOpen(false);
        })
        .catch((error) => {
          console.error("Lỗi khi thêm sản phẩm:", error);
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
          console.log("Sản phẩm đã được xóa thành công!");
          setOpenConfirm(false);
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
        });
      setProductToDelete(null);
    }
  };

  return (
    <>
      <TableContainer>
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
            <TableRow>
              <TableCell style={StyleTableHead}>No</TableCell>
              <TableCell style={StyleTableHead}>Name</TableCell>
              <TableCell style={StyleTableHead}>Available</TableCell>
              <TableCell style={StyleTableHead}>Sold</TableCell>
              <TableCell style={StyleTableHead}>Category</TableCell>
              <TableCell style={StyleTableHead}>Colors</TableCell>
              <TableCell style={StyleTableHead}>Price</TableCell>
              <TableCell style={StyleTableHead}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{products[id].name}</TableCell>
                <TableCell>{products[id].available}</TableCell>
                <TableCell>{products[id].sold}</TableCell>
                <TableCell>
                  {getCategoryNameById(products[id].categoryId)}
                </TableCell>
                <TableCell>
                  {getColorNamesById(products[id].colorIds)}
                </TableCell>
                <TableCell>{products[id].price}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      variant="outlined"
                      disableElevation
                      color="success"
                      type="submit"
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
                      type="submit"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDeleteConfirm(products[id].id)}
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
