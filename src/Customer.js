import React from 'react'
import butter from './butter-client'
import { Helmet } from 'react-helmet'

export default class extends React.Component {
  state = {
    data: {
      fields: {}
    }
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.page.retrieve('customer_case_study', match.params.customer)
    this.setState(resp.data)
  }
  render () {
    const product = this.state.data
    const { customer_logo: customerLogo, headline, testimonial, seo_title, facebook_open_graph_title } = product.fields

    return (
      <div>
        <Helmet>
          <title>{seo_title}</title>
          <meta property='og:title' content={facebook_open_graph_title} />
        </Helmet>
        <div>
          <img src={customerLogo} alt='' height='124' width='124' />
        </div>
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: testimonial }} />
      </div>
    )
  }
}
