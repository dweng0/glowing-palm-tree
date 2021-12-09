import AppBar from "./index";
import SocketContextProvider from "../../context/WebSocket";
import {render} from "@testing-library/react";

describe("Testing AppBar", () => { 
    it("Should compile at runtime", () => expect(<AppBar title="test"/>).toBeDefined());

    it("It should render the title if it is provided", () => { 
        //setup
        const title = "test"

        //execute
        const {getByText} = render(
            <SocketContextProvider socketUrl={"wss://"}>
                <AppBar title={title}/>);
            </SocketContextProvider>);

        //verify
        expect(getByText(title)).toBeInTheDocument();
    });
});