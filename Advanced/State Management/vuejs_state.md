
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. 
They can work in only html files or in project by vue cli.
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
