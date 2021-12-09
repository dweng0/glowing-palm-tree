import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ColorSwitcher from "../../context/ColorSwitcher";
 
/**
 * Handles light dark switching of theme.
 * @param props @See ThemeTogglerProps
 */
const ThemeToggler: React.FunctionComponent = () => { 
    const theme = useTheme();
    const colorMode = React.useContext(ColorSwitcher);
    
    return (
        <Box>
            <div>
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </div>
        </Box>
    )    
}
export default ThemeToggler;