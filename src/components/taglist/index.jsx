import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby";
import styled from "styled-components";

const TagList = ({ tags }) => {
    return (
        <TagListStyle>
            <ul>
                {tags.map(tag => (
                    <li key={kebabCase(tag.fieldValue)}>
                        <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
                            {kebabCase(tag.fieldValue)}
                        </Link>
                    </li>
                ))}
            </ul>
        </TagListStyle>
    )
}

const TagListStyle = styled.aside`
  float: left;
  position: fixed;
`

export default TagList;


/*
<ul>
                {_.map(tags, tag => (
                    <li key={kebabCase(tag)}>
                        {tag.fieldValue}
                        <Link to={`/tags/${kebabCase(tag)}`}>{kebabCase(tag)}</Link>
                    </li>
                ))}
            </ul>
*/
