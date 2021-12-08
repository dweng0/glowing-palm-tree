import ErrorPanel from "./index"
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Tests for errors presentational component', () => { 

    it('Should compile at runtime', () => { 
        expect(ErrorPanel).toBeDefined();
    });

    it('Should render the text provided to it', () => { 
        // setup
        const errors =["there was an error"];

        // execute
        const {getByText} = render(<ErrorPanel errors={errors}/>);

        // verify
        expect(getByText(errors[0])).toBeInTheDocument();
    });
})