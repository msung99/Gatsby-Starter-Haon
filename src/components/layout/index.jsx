

const Layout = ({childern}) => {
    const data = userStateQuery(graphql`
      query SiteTitleQuery {
        site {
            siteMetaData {
                title
                author {
                    name 
                    social {
                        github
                    }
                }
            }
        }
      }
    `);
};