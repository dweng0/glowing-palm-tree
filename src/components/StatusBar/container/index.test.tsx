import React from 'react';
import StateBar from './index';
import {useWebSocket} from '../../../context/WebSocket';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import { content } from '../../../constants/languages';
const { statusBar } = content.en;
jest.mock('../../../context/WebSocket');
describe("State Bar component testing", () => { 
    //state: 'CLOSED' | 'CLOSING' | 'CONNECTING' | 'OPEN' | 'ERROR',

    it("It should compile at runtime", () => expect(StateBar).toBeDefined());

    it("Should show the correct connection state for error", () => { 
        //setup
        useWebSocket.mockReturnValue({
            state: "ERROR"
        });

        //execute
        const {getByText} = render(<StateBar/>);

        //verify
        expect(getByText(statusBar.ERROR)).toBeInTheDocument();
    });
    
    it("Should show the correct connection state for open", () => { 
        //setup
        useWebSocket.mockReturnValue({
            state: "OPEN"
        });

        //execute
        const {getByText} = render(<StateBar/>);

        //verify
        expect(getByText(statusBar.OPEN)).toBeInTheDocument();
    });

    it("Should show the correct connection state for connecting", () => { 
        //setup
        useWebSocket.mockReturnValue({
            state: "CONNECTING"
        });

        //execute
        const {getByText} = render(<StateBar/>);

        //verify
        expect(getByText(statusBar.CONNECTING)).toBeInTheDocument();
    });

    it("Should show the correct connection state for closing", () => { 
        //setup
        useWebSocket.mockReturnValue({
            state: "CLOSING"
        });

        //execute
        const {getByText} = render(<StateBar/>);

        //verify
        expect(getByText(statusBar.CLOSING)).toBeInTheDocument();
    });

    it("Should show the correct connection state for closed", () => { 
        //setup
        useWebSocket.mockReturnValue({
            state: "CLOSED"
        });

        //execute
        const {getByText} = render(<StateBar/>);

        //verify
        expect(getByText(statusBar.CLOSED)).toBeInTheDocument();
    });
});