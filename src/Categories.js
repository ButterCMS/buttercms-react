import React from 'react'
import butter from './butter-client'

export default class extends React.Component {
  state = {
    data: []
  }
  async componentDidMount () {
    const resp = await butter.category.list()
    this.setState(resp.data)
  }
  render () {
    return (
      <div>
        {this.state.data.map((category, key) => {
          return (
            <div key={key}>
              <a href={`/blog/category/${category.slug}`}>{category.name}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
