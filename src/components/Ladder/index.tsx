import React            from 'react';
import { LadderProps }  from "./interface";
 
import styled from 'styled-components';
import Row, { RowWrapper } from '../Row';
export const LadderContainer = styled.div`
    height: 100vh;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: top;
`
/**
 * Ladder Component
 * IT: Renders a datagrid
 * CHILD OF: {@see LadderWwrapper }
 * @param columns  The columns to render
 * @param data     The data to fill the datagrid up with
 */
const Ladder:React.FunctionComponent<LadderProps> = ({ left, data}) => {
   
    //order the column headers based on left flag
    const columns = (left) ? Object.keys(data[0]) : Object.keys(data[0]).reverse();
    return (
        <LadderContainer>
            <RowWrapper>
                {columns.map((column, index) => <div key={index}><h2>{column}</h2></div>)}
            </RowWrapper>
            {data.map((feed) => <Row left={left} feed={feed} />)}
        </LadderContainer>
    );
}
export default Ladder;