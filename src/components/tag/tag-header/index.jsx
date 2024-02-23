import styled from "styled-components";
import React from "react";

const TagsHeader = ({totalCount, tagName}) => {
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with #${tagName}`

    return (
        <div>
            {tagHeader}
        </div>
    )
}

export default TagsHeader