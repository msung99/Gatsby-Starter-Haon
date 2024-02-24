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
        {seriesList.map((series) => {
          const oldestDate = series.nodes.reduce((minDate, node) => {
            const postDate = new Date(node.frontmatter.date);
            return postDate < minDate ? postDate : minDate;
          }, new Date());

          const mostRecentDate = series.nodes.reduce((maxDate, node) => {
            const postDate = new Date(node.frontmatter.date);
            return postDate > maxDate ? postDate : maxDate;
          }, new Date(0));

          return (
            <Link style={{ textDecoration: "none", color: "#cdd4d9" }} to={`/series/${kebabCase(series.fieldValue)}/`} key={kebabCase(series.fieldValue)}>
              <SeriesStyle>
                <TitleSection>{series.fieldValue}</TitleSection>
                <DescriptionSection>
                  <SeriesDate>Created At: {oldestDate.toDateString()}</SeriesDate>
                  <SeriesDate>Last Updated: {mostRecentDate.toDateString()}</SeriesDate> 
                  <PostCount>{series.totalCount} post{series.totalCount !== 1 ? 's' : ''}</PostCount>
                </DescriptionSection>
              </SeriesStyle>
            </Link>
          );
        })}
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

const SeriesDate = styled.div`
  margin: 8px 8px;
  font-size: 14px;
  color: #98a6ad; 
`;

const PostCount = styled.div`
  margin: 12px 12px;
  font-size: 13px;
  font-weight: bold;
  color: #f0f0f0; 
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
  transition: background 0.5s ease-in-out;
  width: 360px;
  height: 230px;
`;


const TitleSection = styled.h1`
  font-size: 26px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 25px;
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