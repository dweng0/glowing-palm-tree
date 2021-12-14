import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {toggleWrapper} from "./style";
import {AppBarProps} from "./interface"
import ThemeToggle from "../ThemeToggle";
import StatusBar from "../StatusBar/container";

/**
 * Nav bar component, wraps theme toggle and StatusBar
 * {@see ThemeToggle }
 * {@see StatusBar }
 */
const NavBar: React.FunctionComponent<AppBarProps> = ({title}) => { 
  return (
    <AppBar position="fixed">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography variant="h4" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                    {title}
                </Typography>
                <Box sx={toggleWrapper}>
                    <ThemeToggle/>
                </Box>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    <StatusBar/>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}
export default NavBar;