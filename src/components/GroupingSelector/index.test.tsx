import Selector     from "./index";
import { render }           from "@testing-library/react";

describe("Tests for group selector", () => { 
    it("should compile at runtime", () => { 
        expect(Selector).toBeDefined();
    });

    it("Should show the current selected group", () => { 
           //setup
          const expectation = 0.5

          //execute         
          const { getByText } = render(<Selector currentSelection={expectation} onSelect={() => {}} />)
          
          //verify
          expect(getByText(expectation)).toBeInTheDocument();          
    });

} )