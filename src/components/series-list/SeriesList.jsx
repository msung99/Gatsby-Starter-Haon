import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";

const SeriesList = ({ seriesList, totalCount }) => {
  return (
    <PageContent>
      <Title>Series.</Title>
      <Description>{totalCount} series found.</Description>
      <SeriesContainer>
        {seriesList.map((series) => (
          <SeriesStyle key={kebabCase(series.fieldValue)}>
            <TitleSection>
              <Link
                style={{ textDecoration: "none", color: "#cdd4d9" }}
                to={`/series/${kebabCase(series.fieldValue)}/`}>
                {series.fieldValue}
              </Link>
            </TitleSection>
            <DescriptionSection>
                안녕하세요!
            </DescriptionSection>
          </SeriesStyle>
        ))}
      </SeriesContainer>
    </PageContent>
  );
};

const PageContent = styled.div`
  position: relative;
  z-index: 1;
`;

const SeriesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 29px;
  margin-top: 60px;
  row-gap: 64px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;


const SeriesStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  padding: 0;
  border-radius: 20px;
  margin-bottom: 0;
`;


const TitleSection = styled.h1`
  font-size: 25px;
  margin-bottom: 50px;
  margin-left: 15px;
`;

const DescriptionSection = styled.p`
  background-color: #3a3a3a;
  color: white;
  flex-grow: 1;
  margin: 0;
  height: 50px;
  border-radius: 0 0 20px 20px;
`;

const Title = styled.h1`
  font-size: 50px;
  color: white;
  font-style: italic;
  margin-bottom: 10px;
`;

const Description = styled.h2`
  font-size: 20px;
  color: white;
  margin-left: 3px;
`;

export default SeriesList;
