import React from 'react'
import butter from './butter-client'

export default class extends React.Component {
  state = {
    data: {
      fields: {}
    }
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.page.retrieve('customer_case_study', match.params.caseStudy)
    this.setState(resp.data)
  }
  render () {
    const product = this.state.data
    const { customer_logo: customerLogo, headline, testimonial } = product.fields

    return (
      <div>
        <div>
          <img src={customerLogo} alt='' height='124' width='124' />
        </div>
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: testimonial }} />
      </div>
    )
  }
}
