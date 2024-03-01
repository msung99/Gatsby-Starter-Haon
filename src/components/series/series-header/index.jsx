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
  margin-bottom: 30px;
  border-bottom: 1px solid #282828;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 300%;
`

const Title = styled.h1`
  color: white;
  font-size: 20px;
`

const Name = styled.h2`
  color: white;
  font-size: 38px;
`


export default SeriesHeader