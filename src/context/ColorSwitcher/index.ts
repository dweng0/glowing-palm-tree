import React from "react";

/**
 * Context that provides a method that is used to change the theme from dark to light
 */
const ThemeContext = React.createContext({ toggleColorMode: () => {} });
export default ThemeContext;