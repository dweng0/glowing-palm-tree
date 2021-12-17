import CurrencySelector     from "./index";
import { render }           from "@testing-library/react";

describe("Tests for currency selector", () => { 
    it("should compile at runtime", () => { 
        expect(CurrencySelector).toBeDefined();
    });

    it("should throw if an unknown currency is provided", () => { 
          //setup
          //execute
          const doRender = () => render(<CurrencySelector currentSelection={""} onSelect={() => {}} />)

          //verify
          expect(doRender).toThrow();
    });

    it("Should show the current selected currency", () => { 
           //setup
          const expectedCurrency = "PI_XBTUSD"

          //execute         
          const { getByText } = render(<CurrencySelector currentSelection={expectedCurrency} onSelect={() => {}} />)
          
          //verify
          expect(getByText(expectedCurrency)).toBeInTheDocument();          
    });

} )