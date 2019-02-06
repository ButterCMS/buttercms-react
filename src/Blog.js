import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import butter from './butter-client'

class App extends Component {
  state = {
    meta: {},
    data: []
  }
  async componentDidMount () {
    const { match } = this.props
    let page = match.params.page || 1

    const resp = await butter.post.list({ page: page, page_size: 10 })
    this.setState(resp.data)
  }
  render () {
    const { next_page, previous_page } = this.state.meta

    return (
      <div>
        {this.state.data.map((post, key) => {
          return (
            <div key={key}>
              <Link to={`/blog/posts/${post.slug}`}>{post.title}</Link>
            </div>
          )
        })}

        <br />

        <div>
          {previous_page && (
            <Link to={`/${previous_page}`}>
              <a>Prev</a>
            </Link>
          )}

          {next_page && (
            <Link to={`/${next_page}`}>
              <a>Next</a>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default App
