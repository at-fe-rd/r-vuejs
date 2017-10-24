
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
### 1. Instruction

#### 1.1 Declarative Rendering

- Vue enables us to declaratively render data to the DOM using straightforward template syntax ( like angular 2 totally):

```
<div id="app">
  {{ message }}
</div>
```

- We need to declare the value of variable first:

```
var app = new Vue({
  el: '#app', //the value of 'el' is the id of the element.
  data: {
    message: 'Hello Vue!' 
    /* this element id='app' will have a data with many variables declared in this. Ex: messaage = "Hello Vue!"*/
  }
})
```

#### 1.2 Communicate with Browser Console

- We can access the value of the `message` in data by using `app.message`.
- In the above example,  `app.message` has the value is 'Hello Vue!'.
- The Console of browser can **get **and **set** the value of variables,  of course, the UI will change if we set the variable with another value.
- You can try by turn on the console and change the value of message like `app.message = 'Changes'`

#### 1.3 The Vue Instance

- Creating a new Vue instance with the Vue function

```
var vm = new Vue({
  // options
})
```

- When a Vue instance is created, it adds all the properties found in its data object to Vue’s reactivity system. When the values of those properties change, the view will “react”, updating to match the new values.

```
// Our data object
var data = { a: 1 }
// The object is added to a Vue instance
var vm = new Vue({
  data: data
})
// These reference the same object!
vm.a === data.a // => true
// Setting the property on the instance
// also affects the original data
vm.a = 2
data.a // => 2
// ... and vice-versa
data.a = 3
vm.a // => 3
```

- Can we set data property of a Vue by a command line? Yes, we can add `$` before the property. 
  Ex: 

```
vm.$data === data // true
vm.$el = document.getElementById('example') // vm.$el= 'example'
```

#### 1.4 Lifecycle Diagram

[Link to view diagram](https://vuejs.org/images/lifecycle.png)