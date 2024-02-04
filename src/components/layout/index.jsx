import React from "react"
import PageHeader from "../page-header"
import PageContent from "../page-content"
import PageFooter from "../page-footer"

const PageLayout = ({childern}) => {
    return (
        <div className = "page-wrapper">
            <PageHeader/>
            <PageContent/>
            <PageFooter/>
        </div>
    )
}

export default PageLayout