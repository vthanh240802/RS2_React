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
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { product } from "../store/reducers/productReducer";
import { category } from "../store/reducers/categoriesReducer"; // Import the category reducer
import { color } from "../store/reducers/colorReducer"; // Import the color reducer
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ProductModel from "../Model/ProductModel";
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "auto",
  height: "40px",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#f6f6f6",
  border: "none",
  borderRadius: "5px",
}));

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
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
      dispatch(product());
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

  const totalProducts = productIds.length;
  const totalAvailable = productIds.reduce(
    (acc: number, id: string) => acc + (products[id].available || 0),
    0
  );
  const totalSold = productIds.reduce(
    (acc: number, id: string) => acc + (products[id].sold || 0),
    0
  );
  const revenue = productIds.reduce(
    (acc: number, id: string) => acc + (products[id].price || 0),
    0
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddProduct = (product: any) => {
    console.log("New Product:", product);
  };

  return (
    <>
      <TableContainer>
        <Box sx={{ marginBottom: "20px" }}>
          <Stack direction="row" spacing={2}>
            <DemoPaper variant="outlined">Total: {totalProducts}</DemoPaper>
            <DemoPaper variant="outlined">
              Available: {totalAvailable}
            </DemoPaper>
            <DemoPaper variant="outlined">Sold: {totalSold}</DemoPaper>
            <DemoPaper variant="outlined">Revenue: {revenue}</DemoPaper>
            <Box>
              <Button
                variant="outlined"
                disableElevation
                color="success"
                type="submit"
                startIcon={<LibraryAddOutlinedIcon />}
                onClick={handleOpen}
              >
                ADD
              </Button>
            </Box>
          </Stack>
        </Box>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1976d3",
                color: "#6e3e3e",
                fontWeight: "bold",
              }}
            >
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Colors</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
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
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      disableElevation
                      type="submit"
                      startIcon={<DeleteIcon />}
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
      <ProductModel
        open={open}
        onClose={handleClose}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};

export default Products;
