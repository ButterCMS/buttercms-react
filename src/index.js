import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Posts from './Posts'
import Post from './Post'
import Categories from './Categories'
import Category from './Category'
import CaseStudies from './CaseStudies'
import CaseStudy from './CaseStudy'
import Faq from './Faq'

const AppRouter = () => (
  <Router>
    <div>
      <Route path='/:page' exact component={Posts} />
      <Route path='/' exact component={Posts} />
      <Route path='/posts/:post' component={Post} />
      <Route path='/posts/categories' exact component={Categories} />
      <Route path='/posts/category/:category' exact component={Category} />
      <Route path='/case-studies' exact component={CaseStudies} />
      <Route path='/case-studies/:caseStudy' component={CaseStudy} />
      <Route path='/faq' component={Faq} />
    </div>
  </Router>
)

ReactDOM.render(<AppRouter />, document.getElementById('root'))
