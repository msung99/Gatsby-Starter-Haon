import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby";

const TagList = ({ tags }) => {
    return (
        <div className="tags">
            <ul>
                {tags.map(tag => (
                    <li key={kebabCase(tag.fieldValue)}>
                        <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
                            {kebabCase(tag.fieldValue)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

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
