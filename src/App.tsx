import React from "react";
import ColorSwitcher from "./context/ColorSwitcher";
import AppBar from "./components/AppBar";
import LadderWrapper  from "./components/LadderWrapper";
import SocketContextProvider from "./context/WebSocket";
import SocketSubscriptionProvider from "./context/SocketSubscriber";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { WEBSOCKET_URI } from "./constants/datalayer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//todo introduce language selection via context
import { content } from "./constants/languages";


function App() {

    /** 
     * ************************************************************************
     *  Handle toggling of dark mode and light mode
     * ************************************************************************
     */
    const [mode, setMode] = React.useState<"light"|"dark">("dark");
    
    // use a memo to handle toggling, causing app to re render with new mode applied.
    const colorMode = React.useMemo(
            () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
            }),
        [],
    );

    // use memo so the theme does not switch back on re render
    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
      );


    return (
    <ColorSwitcher.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <SocketContextProvider socketUrl={WEBSOCKET_URI}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <AppBar title={content.en.title} />
                    <SocketSubscriptionProvider>
                        <LadderWrapper/>
                    </SocketSubscriptionProvider>
                </Container>
            </SocketContextProvider>
        </ThemeProvider>    
    </ColorSwitcher.Provider>    
    );
}

export default App;
