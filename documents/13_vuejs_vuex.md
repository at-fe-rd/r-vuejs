
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

------



##VUEX

###Summary

- Vuex is a library helps us manage the state of components in Vue.js. It holds all state of components and manage them in the global app. Component will become view and can access state or trigger actions. With this ways, the source code will be structured and maintained easily.
- Vuex is devided into so many parts:

-- **State**: Vuex use only one stated tree, this object will hold the state of app, this means we just have one warehouse for one app.

-- **Action**: it contains the actions likes getting the api data from server or changing the data in DB..... Action can contain the **async** function.  Each action will be triggered when using  store.dispatch

--  **Mutation**:  The state cannot change directly, they just can change through commit. Each commit is an action. Maybe it seem likes an event, each mutation have a string type and a handler.  Each mutation will be triggered when using  store.commit

-- **Getters**: Sometimes we have to get the stature based on calculating, filter the states provided by storage.

-- **Module**: Vuex sue only one stated tree, all states of app will given to an object, so when developing of app, store will be blow up. So we have to devide the store into some smaller module, each module also have state, mutations, actions, getter, and event have another module.

### Process





- State: Data source is the direction of app.
- View: Where you declare the mapping with state.
- Action: State changes from interaction of users to the view.



### Structure

- State of app in the store folder
- Only one way to change the state through the commit of mutation, it work synchornous.
- The async logic need to package and put into the actions

```
├── index.html
├── main.js
├── api
│   └── ... # abstractions for making API requests
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # where we assemble modules and export the store
    ├── actions.js        # root actions
    ├── mutations.js      # root mutations
    └── modules
        ├── cart.js       # cart module
        └── products.js   # products module
```

###Strict Mode

- To enable strict mode, simply pass in `strict: true` when creating a Vuex store:

```
const store = new Vuex.Store({
  // ...
  strict: true
})

```

- In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown. This ensures that all state mutations can be explicitly tracked by debugging tools.

###Form Handling

When using Vuex in strict mode, it could be a bit tricky to use `v-model` on a piece of state that belongs to Vuex:

```
<input v-model="obj.message">

```

Assuming `obj` is a computed property that returns an Object from the store, the `v-model` here will attempt to directly mutate `obj.message` when the user types in the input. In strict mode, this will result in an error because the mutation is not performed inside an explicit Vuex mutation handler.

The "Vuex way" to deal with it is binding the `<input>`'s value and call an action on the `input` or `change` event:

```
<input :value="message" @input="updateMessage">

```

```
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}

```

And here's the mutation handler:

```
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}

```

### Two-way Computed Property

Admittedly, the above is quite a bit more verbose than `v-model` + local state, and we lose some of the useful features from `v-model` as well. An alternative approach is using a two-way computed property with a setter:

```
<input v-model="message">

// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```