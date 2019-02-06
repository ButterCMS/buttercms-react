import React from 'react'
import { Link } from 'react-router-dom'
import butter from './butter-client'

export default class extends React.Component {
  state = { data: [] }
  async componentDidMount () {
    const resp = await butter.page.list('customer_case_study')
    this.setState(resp.data)
  }
  render () {
    return (
      <div>
        {this.state.data.map((customer, key) => {
          return (
            <div key={key}>
              <img src={customer.fields.customer_logo} height='40' width='40' />
              <Link to={`/customer/${customer.slug}`}>{customer.fields.headline}</Link>
            </div>
          )
        })}
      </div>
    )
  }
}
