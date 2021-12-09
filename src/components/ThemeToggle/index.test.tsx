
import ThemeToggle from './index';
import App from '../../App';
import {render} from '@testing-library/react';

describe("Testing theme toggle button", () => {
    it("should compile at runtime", () => expect(ThemeToggle).toBeDefined());
    it("Should show the correct icon depending on the theme context provided, default light", () => { 
        //setup
        //execute
        const {getByTestId} = render(<ThemeToggle/>);

        //verify
        expect(getByTestId("Brightness4Icon")).toBeInTheDocument();
    });

    it("Should show the correct icon depending on the theme context provided context switched to dark", () => { 
        //setup
        //execute
        // app component switches to dark mode (default it light)
        const {getByTestId} = render(<App/>);

        //verify
        expect(getByTestId("Brightness7Icon")).toBeInTheDocument();
    });
})