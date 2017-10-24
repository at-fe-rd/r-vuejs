
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
## Directives, Filter, Mixins

### Directives

- We will talk about custom directives. We made it by ourselves.

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

### Filters

- Similar to Pipe in Angular 2, Filters are usable in two places: mustache interpolations and v-bind expressions. 

```
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

We can declare Filter in the exact Element like that:

```
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
    .......
    }
  }
})
```

Or we can declare Filter for all the html

```
Vue.filter( "name", function( value ) {
  let something =.....;
  return something;
});
```

### Mixins

#### Basics

- Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.

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

#### Option Merging

- Options that expect object values, for example methods, components and directives, will be merged into the same object.

#### Global Mixins

- You can also apply a mixin globally. Use with caution! Once you apply a mixin globally, it will affect **every** Vue instance created afterwards. When used properly, this can be used to inject processing logic for custom options:

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

#### Custom Option Merge Strategies

- When custom options are merged, they use the default strategy which overwrites the existing value. If you want a custom option to be merged using custom logic, you need to attach a function to Vue.config.optionMergeStrategies:

```
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}
```

### 

