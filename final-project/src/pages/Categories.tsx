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
import { category } from "../store/reducers/categoryReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { StyleTableHead } from "../components/styles";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: any) => console.log(state));
  const {
    entities: categories = {},
    ids: categoryIds = [],
    status,
    error,
  } = useSelector((state: any) => state.category);
  React.useEffect(() => {
    console.log(status);

    if (status === "idle") {
      dispatch(category());
    }
  }, [status, dispatch]);

  console.log("categories", categories);

  return (
    <>
      <TableContainer sx={{}}>
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
                <TableCell>{categories[id].name}</TableCell>

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
      {/*  */}
    </>
  );
};

export default Categories;
