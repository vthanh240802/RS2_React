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
import { color } from "../store/reducers/colorReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Color = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: any) => console.log(state));
  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
    error,
  } = useSelector((state: any) => state.color);
  React.useEffect(() => {
    console.log(status);

    if (status === "idle") {
      dispatch(color());
    }
  }, [status, dispatch]);

  return (
    <>
      <TableContainer sx={{}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colorIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{colors[id].name}</TableCell>

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

export default Color;
