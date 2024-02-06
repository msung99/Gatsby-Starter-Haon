import * as React from "react"

import PageLayout from "../components/layout/page-component"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <PageLayout>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </PageLayout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
