import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";

const SeriesList = ({seriesList, totalCount}) => {
    return (
        <div>
            {seriesList.map(series => (
                <SeriesStyle key={kebabCase(series.fieldValue)}>
                    <span>
                        <Link style={{ textDecoration: "none", color: "#cdd4d9" }} to={`/series/${kebabCase(series.fieldValue)}/`}>
                            {kebabCase(series.fieldValue)}
                        </Link>
                    </span>
                </SeriesStyle>
            ))}
        </div>
    )
}

const SeriesStyle = styled.div`
`

export default SeriesList