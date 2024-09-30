import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { StyleIcon } from "../StyleIcon";

const Nav = () => {
  return (
    <Box sx={{ width: 200, backgroundColor: "#f4f4f4", height: "100vh", p: 2 }}>
      <List>
        <ListItem component={Link} to="/products">
          <Inventory2OutlinedIcon style={StyleIcon} />
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem component={Link} to="/categories">
          <CategoryOutlinedIcon style={StyleIcon} />
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem component={Link} to="/colors">
          <ColorLensOutlinedIcon style={StyleIcon} />
          <ListItemText primary="Colors" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Nav;
