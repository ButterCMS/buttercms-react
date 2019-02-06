import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Blog from './Blog'
import BlogPost from './BlogPost'
import Categories from './Categories'
import Category from './Category'
import Customers from './Customers'
import Customer from './Customer'
import Faq from './Faq'
import Homepage from './Homepage'

const AppRouter = () => (
  <Router>
    <div>
      <Route path='/' exact component={Homepage} />
      <Route path='/blog/:page' exact component={Blog} />
      <Route path='/blog' exact component={Blog} />
      <Route path='/blog/posts/:post' component={BlogPost} />
      <Route path='/blog/categories' exact component={Categories} />
      <Route path='/blog/category/:category' exact component={Category} />
      <Route path='/customers' exact component={Customers} />
      <Route path='/customer/:customer' component={Customer} />
      <Route path='/faq' component={Faq} />
    </div>
  </Router>
)

ReactDOM.render(<AppRouter />, document.getElementById('root'))
