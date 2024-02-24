import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";

const SeriesList = ({ seriesList, totalCount }) => {
  return (
    <PageContent>
      <Title>Series.</Title>
      <Description>{totalCount} series found.</Description>
      <SeriesListContainer>
        {seriesList.map((series) => (
        <Link style={{ textDecoration: "none", color: "#cdd4d9" }} to={`/series/${kebabCase(series.fieldValue)}/`}>
          <SeriesStyle key={kebabCase(series.fieldValue)}>
            <TitleSection>{series.fieldValue}</TitleSection>
            <DescriptionSection>Created At / Last Updated / post amount</DescriptionSection>
          </SeriesStyle>
        </Link>
        ))}
      </SeriesListContainer>
    </PageContent>
  );
};

const PageContent = styled.div`
  position: relative;
  z-index: 1;
`;

const SeriesListContainer = styled.div`
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


const SeriesStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(45deg, #2a2a2a, #1a1a1a); 
  padding: 0;
  border-radius: 20px;
  margin-bottom: 0;
  text-decoration: none;
  color: #cdd4d9;
  transition: background 2s; /* Set transition duration to 0.3 seconds */
  width: 360px;
  height: 230px;

  &:hover {
    background: linear-gradient(45deg, #3a3a3a, #2a2a2a);
  }
`;
const TitleSection = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 15px;
`;

const DescriptionSection = styled.div`
  background: linear-gradient(45deg, #232526, #414345); 
  position: absolute;
  bottom: 0;
  color: white;
  width: 100%; 
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
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