
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

### Routing

#### Simple Routing From Scratch

Simple route file:

```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})

```

How it work:

- import `<router-view></router-view>` into Vue file properly. (like router-outlet)
- import `<router-link to="/about">About</router-link>` into html to link to another pages. 

#### Dynamic Route Matching

#####Syntax

A dynamic segment is denoted by a colon ` : `

```
 routes: [
    // dynamic segments start with a colon
    { path: '/user/:id', component: User }
  ]
```

Get the `id` value by `$route.params.id`

```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

#####Reacting to Params Changes

- Since both routes render the same component, **Reusing** is more efficient than destroying the old instance and then creating a new one. 
- However, this also means that the lifecycle hooks of the component will not be called.
- To react to params changes in the same component, you can simply **watch** the $route object:

```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // react to route changes...
    }
  }
}
```

Or, use the beforeRouteUpdate guard:

```
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

#### Nested Routes

To render components into this nested outlet, we need to **use the children option** in VueRouter constructor config:

```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

#### Programmatic Navigation

Aside from using `<router-link>` to create anchor tags for declarative navigation, we can do this programmatically using the router's instance methods.

| Declarative               |     Programmatic |
| :------------------------ | ---------------: |
| `<router-link :to="...">` | router.push(...) |

#### Named Routes

-Define a route with a name:

```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

Easy to navigation:

```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

#### Named Views

We define name views by add name attr of `<router-view>`:
`<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>`

- The `<router-view>` without name attr will be default to the default component.

```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar
      }
    }
  ]
})
```

#### Redirect and Alias

##### Redirect

```
//redirect to /b
  - { path: '/a', redirect: '/b' } 
//redirect to name route as foo
  - { path: '/a', redirect: { name: 'foo' }} 
//dynamic redirect
  - const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // the function receives the target route as the argument
      // return redirect path/location here.
    }}
  ]
})
```

#####Alias

**An alias of /a as /b means when the user visits /b, the URL remains /b, but it will be matched as if the user is visiting /a.**

The above can be expressed in the route configuration as:

```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

#### Passing Props

Decoupled with props

```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }

    // for routes with named views, you have to define the `props` option for each named view:
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

#####Boolean mode

When props is set to true, the **route.params** will be set as the component props.

#####Object mode

When props is an object, this will be set as the component props as-is. Useful for when the props are static.

```
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', 
      component: Promotion, 
      props: { newsletterPopup: false} 
    }
  ]
})
```

#####Function mode

You can create a function that returns props. This allows you to cast parameters into other types, combine static values with route-based values, etc.

```
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

## 