# React website and blog powered by ButterCMS

[React](https://reactjs.org/) is a popular javascript library used to build user interfaces.

[ButterCMS](https://buttercms.com) is a hosted API-based CMS and blog engine that lets you build CMS-powered apps using any programming language. You can think of Butter as similar to WordPress except that you build your website in your language of choice and then plug-in the dynamic content using an API.

## Getting Started

We will use [create-react-app](https://github.com/facebook/create-react-app), the most popular tool to bootstrap React projects.

First, we will have to install Node.js. You can install it from the [official website](https://nodejs.org/). Once installed, you will be able to access `npm` from the command line. Use npm to install `create-react-app`:

```
npm i -g create-react-app
```

Create a new application wil the command:

```
create-react-app my_application_folder_name
```

Once the project is created, we will see some files in the `src` folder, which are bootstrap files to display an example application. You can go ahead and delete all the file inside the `src` folder, since we will be making our own.

Within the project directory, install the `react-router-dom` and `buttercms` libraries:

```
npm i react-router-dom buttercms
```

### Creating the ButterCMS client

Create a file `src/butter-client.js` that will hold the ButterCMS client that we will use in the application:

```js
import Butter from 'buttercms'

const butter = Butter('your_api_key')

export default butter
```

## Pages

## Homepage

### Integrate into your application

With our homepage defined, the ButterCMS API will return it in JSON format like this:

```json
{
  "data": {
    "slug": "homepage",
    "fields": {
      "seo_title": "Anvils and Dynamite | Acme Co",
      "headline": "Acme Co provides supplies to your favorite cartoon heroes.",
      "hero_image": "https://cdn.buttercms.com/c8oSTGcwQDC5I58km5WV",
      "call_to_action": "Buy Now",
      "customer_logos": [
        {
          "logo_image": "https://cdn.buttercms.com/c8oSTGcwQDC5I58km5WV"
        },
        {
          "logo_image": "https://cdn.buttercms.com/c8oSTGcwQDC5I58km5WV"
        }
      ]
    }
  }
}
```

Create the component, `Homepage.js`:

```jsx
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
```

Add the route to the app router, `index.js`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Homepage from './Homepage'

const AppRouter = () => (
  <Router>
    <div>
      <Route path='/' exact component={Homepage} />
    </div>
  </Router>
)

ReactDOM.render(<AppRouter />, document.getElementById('root'))

```

## Multiple pages

### Integrate into your application

With our page defined, the ButterCMS API will return it in JSON format like this:

```json
{
    "data": {
        "slug": "acme-co",
        "fields": {
            "facebook_open_graph_title": "Acme Co loves ButterCMS",
            "seo_title": "Acme Co Customer Case Study",
            "headline": "Acme Co saved 200% on Anvil costs with ButterCMS",
            "testimonial": "<p>We've been able to make anvils faster than ever before! - <em>Chief Anvil Maker</em></p>\r\n<p><img src=\"https://cdn.buttercms.com/NiA3IIP3Ssurz5eNJ15a\" alt=\"\" caption=\"false\" width=\"249\" height=\"249\" /></p>",
            "customer_logo": "https://cdn.buttercms.com/c8oSTGcwQDC5I58km5WV",
        }
    }
}
```

Create a `src/Customer.js` file:

```jsx
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
```

### Setup the Customers Page to list all our customers.

Create a new file `src/Customers.js`. In this file, we should:

1. Initialize the butterCMS library
2. On the `componentDidMount` hook, fetch the list of case studies
3. Return the response data as the component state

```jsx
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
```


### Update the routes in your app to route to the specified components

Create the route for your page in `src/index.js` :

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Customer from './Customer'
import Customers from './Customers'

const AppRouter = () => (
  <Router>
    <div>
      <Route path='/customers' exact component={Customers} />
      <Route path='/customer/:customer' component={Customer} />
    </div>
  </Router>
)

ReactDOM.render(<AppRouter />, document.getElementById('root'))

```

## Content fields

### Integrate with your app

Create a new file `src/Faq.js`. In this component, we will have to fetch the FAQ content in the `componentDidMount` hook:

```jsx
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
```

## Blog Engine

### Setup the Blog page to list all our posts.

We'll setup a React component that fetches and displays posts in `src/Blog.js`:

```js
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import butter from './butter-client'

class App extends Component {
  state = {
    meta: {},
    data: []
  }
  async componentDidMount () {
    const { match } = this.props
    let page = match.params.page || 1

    const resp = await butter.post.list({ page: page, page_size: 10 })
    this.setState(resp.data)
  }
  render () {
    const { next_page, previous_page } = this.state.meta

    return (
      <div>
        {this.state.data.map((post, key) => {
          return (
            <div key={key}>
              <Link to={`/blog/posts/${post.slug}`}>{post.title}</Link>
            </div>
          )
        })}

        <br />

        <div>
          {previous_page && (
            <Link to={`/blog/${previous_page}`}>
              <a>Prev</a>
            </Link>
          )}

          {next_page && (
            <Link to={`/blog/${next_page}`}>
              <a>Next</a>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default App
```

With React `componentDidMount` will execute once the component is loaded on to the DOM. `componentDidMount` also receives a context object with various properties – we access the `match` property for handling pagination. We are fetching posts from a ButterCMS test account – sign in with Github to setup your own posts. 

In our `render()` method we use some clever syntax to only display pagination links only when they're applicable. Our post links will take us to a 404 – we'll get these working next.

### Setup the Blog Post page to list a single post

We'll also update our `src/BlogPost.js` component to fetch blog posts via slug and render the title and body:

```js
import React from 'react'
import butter from './butter-client'
import { Helmet } from 'react-helmet'

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
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.meta_description} />
          <meta name='og:image' content={post.featured_image} />
        </Helmet>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    )
  }
}
```

### Add routes to the index component

To get our post links working we need to setup dynamic routing for our blog posts that routes all `/posts/:slug` URLs to our post component, and the `/` URL to our index page:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Blog from './Blog'
import BlogPost from './BlogPost'
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
      <Route path='/customers' exact component={Customers} />
      <Route path='/customer/:customer' component={Customer} />
      <Route path='/faq' component={Faq} />
    </div>
  </Router>
)

ReactDOM.render(<AppRouter />, document.getElementById('root'))

```

### Post categories

We can use the ButterCMS API to get all post categories and all posts under a category. Let's create routes in the `server.js` file for the page categories, and the index of pages under a single category:

```jsx
<Route path='/blog/categories' exact component={Categories} />
<Route path='/blog/category/:category' exact component={Category} />
```

We can then create the React component for the pages. Create a new file `src/Categories.js` :

```js
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
```

This will create a page that will list all categories, along with linking each of them to their own page. Now, create a `src/Category.js` file, that will contain the component to list all pages under a single category:

```js
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
```

The links on these pages will be to the individual posts themselves.

## Starting the application

The application can be run on your local machine with the command:

```
npm start
```

## Other

View ReactJS [Blog engine](https://buttercms.com/react-blog-engine/) and [Full CMS](https://buttercms.com/react-cms/) for other examples of using ButterCMS with ReactJS.
