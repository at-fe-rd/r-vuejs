
# Vue. js Document

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
