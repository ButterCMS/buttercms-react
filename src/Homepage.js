import React from 'react'
import butter from './butter-client'
import { Helmet } from 'react-helmet'

export default class extends React.Component {
  state = {
    data: {
      fields: {
        customer_logos: []
      }
    }
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.page.retrieve('*', 'homepage')
    this.setState(resp.data)
  }
  render () {
    const { fields } = this.state.data

    return (
      <div>
        <Helmet>
          <title>{fields.seo_title}</title>
          <meta property='og:title' content={fields.facebook_open_graph_title} />
        </Helmet>
        <h1>{fields.headline}</h1>
        <img src={fields.hero_image} />
        <button>{fields.call_to_action}</button>
        <h3>Customers Love Us!</h3>
        <ul>
          {fields.customer_logos.map((logo) => {
            return (
              <li>
                <img src={logo.logo_image} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
