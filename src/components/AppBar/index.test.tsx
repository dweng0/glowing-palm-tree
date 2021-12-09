import AppBar from "./index";
import {render} from "@testing-library/react";

describe("Testing AppBar", () => { 
    it("Should compile at runtime", () => expect(<AppBar title="test"/>).toBeDefined());

    it("It should render the title it is provided", () => { 
        //setup
        const title = "test"

        //execute
        const {getByText} = render(<AppBar title={title}/>);

        //verify
        expect(getByText(title)).toBeInTheDocument();
    });
});