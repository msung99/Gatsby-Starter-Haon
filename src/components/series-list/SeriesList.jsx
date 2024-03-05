import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";

const SeriesList = ({ seriesList, totalCount }) => {
  return (
    <PageContent>
      <Title>Series.</Title>
      <Description>{totalCount} series found.</Description>
      <CenteredSeriesListContainer>
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
              <Link style={{ textDecoration: "none" }} to={`/series/${kebabCase(series.fieldValue)}/`} key={kebabCase(series.fieldValue)}>
                <SeriesStyle>
                  <TitleSection>{series.fieldValue}</TitleSection>
                  <DescriptionSection>
                    <SeriesDate>Created at . {oldestDate.toDateString()}</SeriesDate>
                    <SeriesDate>Last updated on . {mostRecentDate.toDateString()}</SeriesDate> 
                    <PostCount>{series.totalCount} post{series.totalCount !== 1 ? 's' : ''} found.</PostCount>
                  </DescriptionSection>
                </SeriesStyle>
              </Link>
            );
          })}
        </SeriesListContainer>
      </CenteredSeriesListContainer>
    </PageContent>
  );
};

const CenteredSeriesListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px; 

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SeriesDate = styled.div`
  margin: 3px 8px;
  font-size: 12px;
  color: ${props => props.theme.serieslist.date}; 
`;

const PostCount = styled.div`
  margin: 12px 8px;
  font-size: 12px;
  color: #adb5be; 
`;

const SeriesStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${props => props.theme.serieslist.bg};
  padding: 0;
  border-radius: 6px;
  margin-bottom: 0;
  text-decoration: none;
  font-style: bolder;
  transition: background 0.5s ease-in-out;
  width: 360px;
  height: 230px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const DescriptionSection = styled.div`
  background: ${props => props.theme.serieslist.descriptionBg};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;


const TitleSection = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.serieslist.title};
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 25px;
  margin-top: 20px;
  font-weight: 600;
  line-height: 130%;
`;

const Title = styled.h1`
  font-size: 50px;
  font-style: italic;
  font-weight: 700;
  color: ${props => props.theme.main.text};
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid ${props => props.theme.main.border};
`;

const Description = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.main.text};
  font-weight: 550;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: -15px;
`;

export default SeriesList;
