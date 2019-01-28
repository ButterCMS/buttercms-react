import React from 'react'
import butter from './butter-client'

export default class extends React.Component {
  state = {
    data: {}
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.post.retrieve(match.params.post)
    this.setState(resp.data)
  }
  render () {
    const post = this.state.data

    return (
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    )
  }
}
