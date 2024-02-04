import React from "react";

const PageHeader = ({title, description, date }) => {
    return (
        <div>
            {title}
            {description}
            {date}
        </div>
    )
}

export default PageHeader