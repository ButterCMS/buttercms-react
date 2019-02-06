import React, { Component } from 'react'
import butter from './butter-client'

class Faq extends Component {
  state = {
    faq_headline: '',
    faq_items: []
  }
  async componentDidMount () {
    const resp = await butter.content.retrieve([ 'faq_headline', 'faq_items' ])
    this.setState(resp.data.data)
  }

  render () {
    return (
      <div>
        <h1>{this.state.faq_headline}</h1>

        <ul>
          {this.state.faq_items.map((item) => {
            return (
              <li>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Faq
