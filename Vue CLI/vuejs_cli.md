
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. 
They can work in only html files or in project by vue cli.
## Vue CLI
### 1. Instruction
```
	# install vue-cli
	$ npm install --global vue-cli
	# create a new project using the "webpack" template
	$ vue init webpack my-project
	# install dependencies and go!
	$ cd my-project
	$ npm install
	$ npm run dev
```
###2. Communicating Component
#### 2.1 Event Emit and Data Binding
- Catching the Child's Event/method from the parent component whenever we have to fire some event on click or something else from child component and pass to the parent one we have to use Event Binding see here in the example below.
- Ex:
  In Parent Component:
```
<my-child :childData="parentData" @child-event="parentFunction" />
// script
export default {
  components: {
    my-child
  },
  data() {
    return {
      parentData:[]
    }
  },
  methods: {
   parentFunction: function(value){...}
  }
}
```
 In Children Component:
```
<button @click="childFunction(value)">Add</button>
// script
export default {
  props: ['childData'],
  methods: {
   childFunction: function(value){
    ....
    this.$emit('child-event', valueSendToParent);
    }
  }
}
```
#### 2.2 Two-ways Data Bindings
using `.sync`
```
<comp :foo.sync="bar"></comp>
```
For the child component to update foo‘s value, it needs to explicitly emit an event instead of mutating the prop:
```
this.$emit('update:foo', newValue)
```
Ex: https://jsfiddle.net/mauromadeit/9po4j84o/     
#### 2.3 Form Input Component using Custom Events
```
<input v-model="something">
```
The similar result:
```
<input
  v-bind:value="something"
  v-on:input="something = $event.target.value">
```
When used with a component, it instead simplifies to:
```
<custom-input
  :value="something"
  @input="value => { something = value }">
</custom-input>
```
Ex: https://jsfiddle.net/chrisvfritz/1oqjojjx/
#### 2.4 Customize Component v-model
We use the `model` key to customize the component. And the `v-model` to enable the custom. 
If we enable the `v-model` but don't declare `model` key in component,  the default situation occurs in 2.3
```
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    // this allows using the `value` prop for a different purpose
    value: String
  },
  // ...
})
```
```
<my-checkbox v-model="foo" value="some value"></my-checkbox>
```
The above will be equivalent to:
```
<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>
```
#### 2.5 Non Parent-Child Communication
Sometimes two components may need to communicate with one-another but they are not parent/child to each other. In simple scenarios, you can use an empty Vue instance as a central event bus:
```
var bus = new Vue()
// in component A's method
bus.$emit('id-selected', 1)
// in component B's created hook
bus.$on('id-selected', function (id) {
  // ...
})
```
### 3. More about Component
#### 3.1 Content Distribution with Slots
3.1.1 Compilation Scope
- **Everything in the parent template is compiled in parent scope; everything in the child template is compiled in child scope.**

3.1.2 Single Slot
- Parent content will be **discarded** unless the child component template contains at least one `<slot>` outlet. 
- When there is only one slot with no attributes, the entire content fragment will be inserted at its position in the DOM, replacing the slot itself.
- Anything originally inside the <slot> tags is considered **fallback content**. Fallback content is compiled in the child scope and will only be displayed if the hosting element is empty and has no content to be inserted.

3.1.3 Named Slot
- `<slot>` elements have a special attribute, name, which can be used to further customize how content should be distributed. You can have multiple slots with different names. A named slot will match any element that has a corresponding slot attribute in the content fragment.
- There can still be one unnamed slot, which is the default slot that serves as a catch-all outlet for any unmatched content. If there is no default slot, unmatched content will be discarded.

3.1.4 Scoped Slot
- Declaring as:
```
<template slot-scope="props">
</template>
```
The value of slot-scope will be used as the name of a temporary variable that holds the props object passed from the child.
```
<div class="child">
  <slot text="hello from child"></slot>
</div>
```
```
<div class="parent">
  <child>
    <template slot-scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>
```
```
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>
```
#### 3.2 Dynamic Component
- You can use the same mount point and dynamically switch between multiple components using the reserved `<component>` element and dynamically bind to its is attribute:
```
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home' // home is the default component
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```
```
<component v-bind:is="currentView">
  <!-- component changes when vm.currentView changes! -->
</component>
```
- If you want to keep the switched-out components in memory so that you can preserve their state or avoid re-rendering, you can wrap a dynamic component in a `<keep-alive>` element:
```
<keep-alive>
  <component :is="currentView">
    <!-- inactive components will be cached! -->
  </component>
</keep-alive>
```
#### 3.3 Misc
3.3.1 Authoring Reusable Components
The API for a Vue component comes in three parts - props, events, and slots:
- Props allow the external environment to pass data into the component
- Events allow the component to trigger side effects in the external environment
- Slots allow the external environment to compose the component with extra content.

3.3.2 Child Components Refs
Despite the existence of props and events, sometimes you might still need to directly access a child component in JavaScript. To achieve this you have to assign a reference ID to the child component using ref
```
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```
```
var parent = new Vue({ el: '#parent' })
// access child component instance
var child = parent.$refs.profile
```

3.3.3 Async Component
Vue allows you to define your component as a factory function that asynchronously resolves your component definition. Vue will only trigger the factory function when the component actually needs to be rendered and will cache the result for future re-renders.
```
Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)
```

When using local registration, you can also directly provide a function that returns a Promise:
```
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```
3.3.4 Advanced Async Components

Starting in 2.3.0+ the async component factory can also return an object of the following format:
```
const AsyncComp = () => ({
  // The component to load. Should be a Promise
  component: import('./MyComp.vue'),
  // A component to use while the async component is loading
  loading: LoadingComp,
  // A component to use if the load fails
  error: ErrorComp,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```
### 4. Custom Directives
```
Vue.directive('named', function (el, binding) {
  // do something
})
```
When the page loads, that element gains focus (note: autofocus doesn’t work on mobile Safari). In fact, if you haven’t clicked on anything else since visiting this page, the input above should be focused now. Now let’s build the directive that accomplishes this:
```
// Register a global custom directive called v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
```
If you want to register a directive locally instead, components also accept a directives option:
```
directives: {
  focus: {
    // directive definition
    inserted: function (el) {
      el.focus()
    }
  }
}
```
### 5. Mixins
#### 5.1 Basics
Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.
Example:
```
// define a mixin object
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// define a component that uses this mixin
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // => "hello from mixin!"
```
#### 5.2 Option Merging
Options that expect object values, for example methods, components and directives, will be merged into the same object.
#### 5.3 Global Mixins
You can also apply a mixin globally. Use with caution! Once you apply a mixin globally, it will affect **every** Vue instance created afterwards. When used properly, this can be used to inject processing logic for custom options:
```
// inject a handler for `myOption` custom option
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// => "hello!"
```
Note:
- The component’s options will take priority when there are conflicting keys in these objects.
#### 5.4 Custom Option Merge Strategies
When custom options are merged, they use the default strategy which overwrites the existing value. If you want a custom option to be merged using custom logic, you need to attach a function to Vue.config.optionMergeStrategies:
```
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}
```
### 6. Animations & Transitions
#### 6.1 Enter/Leave & List Transitions

6.1.1 Transition class
There are six classes applied for enter/leave transitions.
- v-enter
- v-enter-active
- v-enter-to
- v-leave
- v-leave-active
- v-leave-to
  ![Diagram](https://vuejs.org/images/transition.png)

6.1.2 Custom Transition Classes
- You can also specify custom transition classes by providing the following attributes:
  **enter-class, enter-active-class, enter-to-class, leave-class, leave-active-class, leave-to-class.**
- These will override the conventional class names. This is especially useful when you want to combine Vue’s transition system with an existing CSS animation library, such as Animate.css.
  Here’s an example:
```
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```
6.1.3  JavaScript Hooks 
You can also define JavaScript hooks in attributes:
```
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
//......
</transition>
```
6.1.4 Transition with Single Element/ Component
- Define the name of transition. Here we use the fade animation, so we put `name="fade" `
```
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
```
- After that, we have to css for the classes of this animation. ( see why in 6.1.1)
```
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
```
6.1.5 Transitioning Between Elements
- we need a `key` attribute.
- Transition mode
  -- in-out: New element transitions in first, then when complete, the current element transitions out.
  -- out-in: Current element transitions out first, then when complete, the new element transitions in.
```
<transition name="fade" mode="out-in">
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
// ...
computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```
6.1.6 Transitioning Between Components
- Add `component-` into the animation name. Ex: name = "fade" => name = "component-fade".
- Transitioning between components is even simpler - we don’t even need the key attribute. Instead, we wrap a dynamic component.
```
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
// `view` will be change to determine which component choosen
```
6.1.7 List Transition
- In this case, we’ll use the `<transition-group>` component.
- it renders an actual element: a <span> by default. You can change the element that’s rendered with the tag attribute.
- Elements inside are always required to have a unique key attribute.
- List Entering/Leaving Transitions use `name = "list"`.
- List Move Transitions use `name = "flip-list"`.
- Staggering List Transitions use `name = "staggered-fade"` .

6.1.8 Reusable Transitions
- Transitions can be reused through Vue’s component system. To create a reusable transition, all you have to do is place a `<transition>` or `<transition-group>` component at the root, then pass any children into the transition component. the tag  `<slot></slot>` can help us pass any element into this transition.
- Here’s an example using a template component:
```
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
})
```
#### 6.2 State Transitions
Vue’s transition system offers many simple ways to animate entering, leaving, and lists, but what about animating your data itself? For example:
- numbers and calculations
- colors displayed
- the positions of SVG nodes
- the sizes and other properties of elements

**Animating with Watcher**
- Watchers allow us to animate changes of any numerical property into another property
- Usually use with tween.js
### 7. Routing
#### 7.1 Simple Routing From Scratch
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
#### 7.2 Dynamic Route Matching
7.2.1 Syntax
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
7.2.2 Reacting to Params Changes
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
#### 7.3 Nested Routes
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
#### 7.4 Programmatic Navigation
Aside from using `<router-link>` to create anchor tags for declarative navigation, we can do this programmatically using the router's instance methods.
| Declarative               |     Programmatic |
| :------------------------ | ---------------: |
| `<router-link :to="...">` | router.push(...) |

#### 7.5 Named Routes
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
#### 7.6 Named Views
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
#### 7.7 Redirect and Alias
7.7.1 Redirect
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
7.7.2 Alias
**An alias of /a as /b means when the user visits /b, the URL remains /b, but it will be matched as if the user is visiting /a.**

The above can be expressed in the route configuration as:
```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```
#### 7.8 Passing Props
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
7.8.1 Boolean mode
When props is set to true, the **route.params** will be set as the component props.

7.8.2 Object mode
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

7.8.3 Function mode
You can create a function that returns props. This allows you to cast parameters into other types, combine static values with route-based values, etc.
```
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```
## Some Advanced Technics
### 1. Navigation Guards
### 2. Lazy loading
### 3. Routing Transition
### 5. State Management
#### 5.1 Simple State Management from Scratch
- Problem
  -- It is often overlooked that the source of truth in Vue applications is the raw data object - a Vue instance only proxies access to it. Therefore, if you have a piece of state that should be shared by multiple instances, you can share it by identity:
```
const sourceOfTruth = {}
const vmA = new Vue({
  data: sourceOfTruth
})
const vm B = new Vue({
  data: sourceOfTruth
})
```
-- Now whenever sourceOfTruth is mutated, both vmA and vmB will update their views automatically. Subcomponents within each of these instances would also have access via this.$root.$data. We have a single source of truth now, but debugging would be a nightmare. Any piece of data could be changed by any part of our app at any time, without leaving a trace.
- To help solve this problem, we can adopt a store pattern:
```
var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
```
In addition, each instance/component can still own and manage its own private state:
```
var vmA = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
var vmB = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
```
#### 5.2 Vuex
- Vuex is a library helps us manage the state of components in Vue.js. It holds all state of components and manage them in the global app. Component will become view and can access state or trigger actions. With this ways, the source code will be structured and maintained easily.
- Vuex is devided into so many parts:

-- **State**: Vuex use only one stated tree, this object will hold the state of app, this means we just have one warehouse for one app.

-- **Action**: it contains the actions likes getting the api data from server or changing the data in DB..... Action can contain the **async** function.  Each action will be triggered when using  store.dispatch

--  **Mutation**:  The state cannot change directly, they just can change through commit. Each commit is an action. Maybe it seem likes an event, each mutation have a string type and a handler.  Each mutation will be triggered when using  store.commit

-- **Getters**: Sometimes we have to get the stature based on calculating, filter the states provided by storage.

-- **Module**: Vuex sue only one stated tree, all states of app will given to an object, so when developing of app, store will be blow up. So we have to devide the store into some smaller module, each module also have state, mutations, actions, getter, and event have another module.
