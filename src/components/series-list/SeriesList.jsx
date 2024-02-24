import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";

const SeriesList = ({ seriesList, totalCount }) => {
  return (
    <div>
      <Title>Series.</Title>
      <Description>{totalCount} series found.</Description>
      <SeriesContainer>
        {seriesList.map((series) => (
          <SeriesStyle key={kebabCase(series.fieldValue)}>
            <Link
              style={{ textDecoration: "none", color: "#cdd4d9" }}
              to={`/series/${kebabCase(series.fieldValue)}/`}
            >
              {kebabCase(series.fieldValue)}
            </Link>
          </SeriesStyle>
        ))}
      </SeriesContainer>
    </div>
  );
};

const SeriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  justify-content: space-between;
`;

const SeriesStyle = styled.div`
  background-color: #2c3e50;
  padding: 16px;
  border-radius: 8px;
  text-align: center; /* Optional: Center the text within each box */
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
