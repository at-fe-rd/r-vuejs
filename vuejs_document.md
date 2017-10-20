#r-vuejs

#Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]


----------

[TOC]

-------------
Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. 
They can work in only html files or in project by vue cli.
## Basic in HTML
### 1. Instruction
- Just add this line into the html to import the vue library: 
`<script src="https://unpkg.com/vue"></script>`
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
### 2. Template Syntax
#### 2.1 Attribute of html tag
- Mustaches cannot be used inside HTML attributes, instead use a `v-bind` directive:
```
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Button</button>
<a v-bind:href="url"></a>
```
#### 2.2 Using Js Expression
Something right:
```
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```
Something wrong:
```
<!-- this is a statement, not an expression: -->
{{ var a = 1 }}
<!-- flow control won't work either, use ternary expressions -->
{{ if (ok) { return message } }}
```
#### 2.3 Short hand
We will read about v-bind and v-on more clearly in the next chapters.
However we need to know the short hand to use them:
- v-bind Shorthand
```
<!-- full syntax -->
<a v-bind:href="url"></a>
<!-- shorthand -->
<a :href="url"></a>
```
- v-on Shorthand
```
<!-- full syntax -->
<a v-on:click="doSomething"></a>
<!-- shorthand -->
<a @click="doSomething"></a>
```
### 3. Computed Properties and Watchers
#### 3.1 Methods Property
- Just a property where we put our methods.
- The process of methods will not be stored in the cached, so you have to remember that **when you call a method many times, it will be calculate from the beginning.**
- Syntax:
```
<p>Reversed message: "{{ reverseMessage() }}"</p>

// in component
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
#### 3.2 Computed Property
- Seem likes with methods property.
- However, the big different thing is that the **result of function in computed property will be cached, and will be updated when the data changes.**
- Syntax:
```
<p>Reversed message: "{{ reverseMessage() }}"</p>

// in component
computed: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
- Getter and setter:
 -- As default, each computed will have 2 function getter and setter, if you don't declare, it will understand as using **getter automatically**,  so at the end of each computed will have **return**.
 
```
 var vm = new Vue({
    el: '#example',
    data: {
        message : "Vuejs"
    },
    computed : {
        uppercaseMessage : {
            // Khai báo getter
            get : function(){
                return "[ " + this.message.toUpperCase() + " ]";
            },
 
            // Khai báo setter
            set : function(newValue){
                this.message = newValue.toLowerCase();
            }
        }
    }
});
 
// Mỗi khi ta thiết lập giá trị cho uppercaseMessage thì message sẽ bị thay đổi
// vì nội dung của hàm setter là this.message = newValue.toLowerCase();
vm.uppercaseMessage = "Do Hong Quan";

console.log(vm.message); // Do Hong Quan
```
#### 3.3 Watcher Property
- Watcher is a person watch the changes of data in VueJS. Watcher will notice when data is changed and if necessary it will intervene that process.
```
var vm = new Vue({
    el: '#example',
    data: {
        message : "Value 1"
    },
    watch : {
        message : function(newValue){
            console.log("Value of message changed");
        }
    }
});
 
// Change the value of message by using console: 
// example.message = "value 2" 
// Turn on the console and you will see: "Value of message changed"
```

### 4. Class and style bindings
-  Working with `v-bind`
-  Vue provides special enhancements when v-bind is used with **class** and **style**
####4.1 Binding HTML classes
We use the  `v-bind:class`  directive. It have many kind of expressions:
4.1.1. Object Syntax
```
<div v-bind:class="{ active: isActive }"></div>
```
- `isActive` is a boolean variable. the existence of class `active` is depend on value true or false of this variable.
- This variable is declared in data section.
- We also using object syntax by using a object variable like that:
```
<div v-bind:class="classObject"></div>
```
- And declaring that variable in data by object type:
```
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

4.1.2. Array Syntax
```
<div v-bind:class="[activeClass, errorClass]"></div>
```
4.1.3.  With component
Create a component like that:
```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
Then add some classes when using it:
```
<my-component class="baz boo"></my-component>
```
Result: 
```
<p class="foo bar baz boo">Hi</p>
```

####4.2 Binding inline styles
We use the  `v-bind:style`  directive. It have many kind of expressions. The using with object and array syntax are similar to the binding html classes.
4.1.1. Object Syntax
4.1.2. Array Syntax
4.1.3. Auto-prefixing
When you use a CSS property that requires vendor prefixes in v-bind:style, for example transform, Vue will automatically detect and add appropriate prefixes to the applied styles.
4.1.4 Multiple Values
```
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
This will only render the last value in the array which the browser supports. In this example, it will render display: flex for browsers that support the unprefixed version of flexbox.
### 5. Directives
The syntax of `v-` directives is likely to `ng-` in Angular 2. 
#### 5.1 Conditional Rendering
5.1.1 Relating to `v-if`
Vue also have `v-else` and `v-else-if`
```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
5.1.2 `v-show`
Maybe it is likely to `v-if` because it need the condition to decide whether showing the content or not.
```
<h1 v-show="ok">Hello!</h1>
// if ok = true, "Hello" will be seen
``` 
- **The difference is that an element with v-show will always be rendered and remain in the DOM**.
- v-show only toggles the display CSS property of the element.
#### 5.2 List Rendering
5.2.1 Array with `v-for`
Items=['Vue', 'Bar']
```
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
// result: Vue, Bar
```
With index
```
<ul id="example-2">
  <li v-for="(item, index) in items">
    - {{ index }} - {{ item.message }}
  </li>
</ul>
// result: 0- Vue, 1- Bar
```
5.2.2 Object with `v-for`
```
object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
```
The following example will print the value of each key in object.
```
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
//Result: John, Doe, 30
```
Print key and value of an object:
```
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>
```
5.2.3 Key
To give Vue a hint so that it can track each node’s identity, and thus reuse and reorder existing elements, you need to provide a unique key attribute for each item. An ideal value for key would be the unique id of each item.
```
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```
5.2.4 Array Change Detection
Due to limitations in JavaScript, Vue cannot detect the following changes to an array:
- When you directly set an item with the index, e.g. `vm.items[indexOfItem] = newValue`
- When you modify the length of the array, e.g. `vm.items.length = newLength`
- Solution: 
```
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
// To deal with caveat 2, you can use splice:
example1.items.splice(newLength)
```
5.2.5 Object Change Detection
Again due to limitations of modern JavaScript, Vue cannot detect property addition or deletion.
Ex:
```
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```
```
// You could add a new age property to the nested userProfile object with:
Vue.set(vm.userProfile, 'age', 27)
// You can also use the vm.$set instance method, which is an alias for the global Vue.set:
this.$set(this.userProfile, 'age', 27)
//Sometimes you may want to assign a number of new properties to an existing object, for example using Object.assign() or _.extend(). In such cases, you should create a fresh object with properties from both objects. So instead of:
Object.assign(this.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
// You would add new, reactive properties with:
this.userProfile = Object.assign({}, this.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```
#### 5.3 Event Handling
5.3.1 `v-on`
We can use the `v-on` directive to listen to DOM events and run some JavaScript when they’re triggered and run the methods.
Ex:
```
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```
5.3.2 Event and Key modifiers
It is a very common need to call event.preventDefault() or event.stopPropagation() inside event handlers. Although we can do this easily inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.
To address this problem, Vue provides event modifiers for v-on. Recall that modifiers are directive postfixes denoted by a dot.
```
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>
<!-- the submit event will no longer reload the page -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- modifiers can be chained -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- just the modifier -->
<form v-on:submit.prevent></form>
<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div v-on:click.capture="doThis">...</div>
<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div v-on:click.self="doThat">...</div>
<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>
<!-- this will only fire when only Ctrl is pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>
```
#### 5.4 Form Input Bindings
5.4.1 `v-model`
```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```
We also use `v-model` in radio, checkbox, Select options.
5.4.2 Modifiers
- .lazy
 -- By default, v-model syncs the input with the data after each input event (with the exception of IME composition as stated above). You can add the lazy modifier to instead sync after change events:
```
<input v-model.lazy="msg" >
```
- .trim
 -- If you want user input to be trimmed automatically, you can add the trim modifier to your v-model managed inputs:
```
<input v-model.trim="msg">
```
- .number
 -- If you want user input to be automatically typecast as a number, you can add the number modifier to your v-model managed inputs:
```
<input v-model.number="age" type="number">
```
### 6. Filters
Similar to Pipe in Angular 2, Filters are usable in two places: mustache interpolations and v-bind expressions. 
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


### 7. Component
#### 7.1 Declaring Component
We will learn how to create component in the script.
```
Vue.component('my-component', {
  // options
})
```
Once registered, a component can be used in an instance’s template as a custom element, `<my-component></my-component>`
Registering it with the components instance option:
```
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> will only be available in parent's template
    'my-component': Child
  }
})
```
#### 7.2 Composing Component
- 	Reading how to pass props and event emit between child and parent component in Vue CLi.
	
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
| Declarative	      |    Programmatic |
| :-------- | --------:|
| `<router-link :to="...">`  | router.push(...)|

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
