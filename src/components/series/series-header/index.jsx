import React from "react";
import styled from "styled-components";

const SeriesHeader = ({seriesName}) => {
    return (
        <HeaderStyle>
            <Name>{seriesName}.</Name>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
  margin-bottom: 50px;
  border-bottom: 1px solid #282828;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  color: white;
  font-size: 20px;
`

const Name = styled.h2`
  color: white;
  font-size: 40px;
  font-style: italic;
`


export default SeriesHeader