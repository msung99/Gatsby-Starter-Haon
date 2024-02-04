import React from "react";

const PostHeader = ({title, description, date }) => {
    return (
        <div>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <div>
                {date}
            </div>
        </div>
    )
}

export default PostHeader