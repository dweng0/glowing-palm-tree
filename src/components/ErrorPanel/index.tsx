import React from "react";
import { ErrorProps } from "./interface";

/**
 * A presentational component that renders an array of errors given to it. 
 * @param ErrorProps {@see ErrorProps }
 */
const ErrorCard: React.FunctionComponent<ErrorProps> = ({ errors }) => { 
    // Error Boundary
    if(errors.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>
                The following issues have occurred
            </h2>
            <ul>
                {errors.map((error: string, index: number) => <li key={`error ${index}`}>{error}</li>)}
            </ul>
        </div>
    ) 
}

export default ErrorCard;