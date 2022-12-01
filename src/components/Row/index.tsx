import React from 'react';
import { Feed } from '../Ladder/interface';

import styled from 'styled-components';
import { getFeedValues } from '../LadderWrapper/services/columns';

export const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 74px;
`;

const CellWrapper = styled.div`
    width: 100%;
    height: 100%;

`;
type RowProps = {
    left: boolean
    feed: Feed;
};
export const Row: React.FC<RowProps> = ({feed, left}) => { 
   
    //reverse the obejct and map it out to a div
    const data = (left) ? getFeedValues(feed) : getFeedValues(feed).reverse()
    return (
        <RowWrapper key={feed.id}>
            {data.map((cellData, index) => {
                return (
                    <CellWrapper key={index}>
                        {cellData}
                    </CellWrapper>
                )
            })}
        </RowWrapper>
    )
}

export default Row;