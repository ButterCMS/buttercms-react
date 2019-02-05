import React from 'react'
import butter from './butter-client'

export default class extends React.Component {
  state = {
    data: {
      recent_posts: []
    }
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.category.retrieve(match.params.category, {
      include: 'recent_posts'
    })
    this.setState(resp.data)
  }
  render () {
    const category = this.state.data

    return (
      <div>
        <h1>{category.name}</h1>
        <div>
          {this.state.data.recent_posts.map((post, key) => {
            return (
              <div key={key}>
                <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
