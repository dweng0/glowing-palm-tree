import StatusBarIcon from "./statusbaricon";
import "@testing-library/jest-dom/extend-expect";
import {render} from "@testing-library/react";

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
