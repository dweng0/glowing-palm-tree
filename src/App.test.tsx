import React from 'react';
import { render, screen } from '@testing-library/react';
import { content } from './constants/languages'
import App from './App';

describe("App Testing", () => { 
    it("Should compile at runtime", () => expect(App).toBeDefined());
    it("Should render to screen correctly", () => { 
        render(<App />);
        const title = screen.getByText(content.en.title);
        expect(title).toBeInTheDocument();
    })
})

