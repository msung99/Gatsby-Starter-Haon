import * as React from "react"
import { Link } from "gatsby"

import PageLayout from "../components/layout/page-component"
import Seo from "../components/seo"

const SecondPage = () => (
  <PageLayout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </PageLayout>
)

export const Head = () => <Seo title="Page two" />

export default SecondPage
