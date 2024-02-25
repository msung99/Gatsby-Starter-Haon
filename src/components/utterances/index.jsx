import React from 'react'

class Utterances extends React.Component {
  constructor(props) {
    super(props)

    this.commentsEl = React.createRef()
    this.state = { status: 'pending' }
  }

  componentDidMount() {
    const scriptEl = document.createElement('script')
    scriptEl.onload = () => this.setState({ status: 'success' })
    scriptEl.onerror = () => this.setState({ status: 'failed' })
    scriptEl.async = true
    scriptEl.src = 'https://utteranc.es/client.js'
    scriptEl.setAttribute('repo', 'msung99/Gatsby-Starter-Haon')
    scriptEl.setAttribute('issue-term', 'title')
    scriptEl.setAttribute('theme', 'github-dark')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    this.commentsEl.current.appendChild(scriptEl)
  }

  render() {
    const { status } = this.state

    return (
      <div className="comments-wrapper">
        {status === 'failed' && <div>Error. Please try again.</div>}
        {status === 'pending' && <div>Loading script...</div>}
        <div ref={this.commentsEl} />
      </div>
    )
  }
}

export default Utterances