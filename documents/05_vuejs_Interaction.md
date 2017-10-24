
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
### 5. Communicating Component

#### 5.1 Event Emit and Data Binding

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

#### 5.2 Two-ways Data Bindings

using `.sync`

```
<comp :foo.sync="bar"></comp>
```

For the child component to update foo‘s value, it needs to explicitly emit an event instead of mutating the prop:

```
this.$emit('update:foo', newValue)
```

Ex: https://jsfiddle.net/mauromadeit/9po4j84o/     

#### 5.3 Form Input Component using Custom Events

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

#### 5.4 Customize Component v-model

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

#### 5.5 Non Parent-Child Communication

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

### 