import React from "react";
import styled from "styled-components";

const SeriesHeader = ({seriesName}) => {
    return (
        <HeaderStyle>
            <Name>{seriesName}</Name>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.main.border};
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 300%;
`


const Name = styled.h2`
  color: ${props => props.theme.main.text};
  font-size: 38px;
`


export default SeriesHeader