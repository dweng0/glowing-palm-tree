import StatusBarIcon from "./statusbaricon";
import SocketSwitch from "./socketswitch";
import "@testing-library/jest-dom/extend-expect";
import {render} from "@testing-library/react";
import {content} from "../../../constants/languages";

describe("Tests for the status bar presentation", () => { 
    
    it("should compile at runtime", () => expect(StatusBarIcon).toBeDefined());

    it("should display the text data provided to it", () => {

        //setup
        const payload = { 
            label: "blue",
            color: "primary"
        };

        //execute
        const { getByText } = render(<StatusBarIcon color={payload.color} label={payload.label} icon={() => { return null}} />);

        //verify
        expect(getByText(payload.label)).toBeInTheDocument();
    });
});

describe("Socket switch tests", () => { 

    it("should compile at runtime", () => expect(SocketSwitch).toBeDefined());

    it("Should render correctly based on state passed in", () => {

        //setup
        const buttonState = "connect";
        const testFn = () => { }

        //execute
        const { getByText } = render(<SocketSwitch buttonState={buttonState} onClick={testFn} />)

        //verify
        expect(getByText(content.en.statusBar.buttonState.connect)).toBeInTheDocument();
    });

    it("it should call on click when clicked", () => { 
        //setup
        const buttonState = "connect";
        const testFn = jest.fn();

        //execute
        const { getByText } = render(<SocketSwitch buttonState={buttonState} onClick={testFn} />)

        //verify
        expect(getByText(content.en.statusBar.buttonState.connect)).toBeInTheDocument();
    });

})
