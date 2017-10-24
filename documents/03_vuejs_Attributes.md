
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
### 3. Attributes

The summary of all attribute start with `v-`

#### 3.1 Basic attributes of html tag

- v-bind ( short hand: `:`)

  — Mustaches cannot be used inside HTML attributes, instead use a `v-bind` directive:

```
<div v-bind:id="dynamicId"></div>
// shorthand
<div :id="dynamicId"></div>
```

- v-on ( short hand: `@`)

  — Attaches an event listener to the element. The event type is denoted by the argument. The expression can be a method name, an inline statement, or omitted if there are modifiers present.

  ```
  <button v-on:click="doThis"></button>
  // shorthand
  <button @click="doThis"></button>
  ```

#### 3.2 Using Js Expression

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

#### 3.3 Class and style bindings

- Working with `v-bind`
- Vue provides special enhancements when v-bind is used with **class** and **style**

#####3.3.1 Binding HTML classes

We use the  `v-bind:class`  directive. It have many kind of expressions:
a. Object Syntax

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

b. Array Syntax

```
<div v-bind:class="[activeClass, errorClass]"></div>
```

c.  With component
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

#####3.3.2 Binding inline styles

We use the  `v-bind:style`  directive. It have many kind of expressions. The using with object and array syntax are similar to the binding html classes.
a. Object Syntax
b. Array Syntax
c. Auto-prefixing
When you use a CSS property that requires vendor prefixes in v-bind:style, for example transform, Vue will automatically detect and add appropriate prefixes to the applied styles.
d Multiple Values

```
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

This will only render the last value in the array which the browser supports. In this example, it will render display: flex for browsers that support the unprefixed version of flexbox.

####3.4 v- Directives

The syntax of `v-` directives is likely to `ng-` in Angular 2. 

#####3.4.1 Conditional Rendering

a. Relating to `v-if`
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

b. `v-show`
Maybe it is likely to `v-if` because it need the condition to decide whether showing the content or not.

```
<h1 v-show="ok">Hello!</h1>
// if ok = true, "Hello" will be seen
```

- **The difference is that an element with v-show will always be rendered and remain in the DOM**.
- v-show only toggles the display CSS property of the element.

#####3.4.2 List Rendering

a. Array with `v-for`
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

b. Object with `v-for`

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

c. Key
To give Vue a hint so that it can track each node’s identity, and thus reuse and reorder existing elements, you need to provide a unique key attribute for each item. An ideal value for key would be the unique id of each item.

```
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

d. Array Change Detection
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

e. Object Change Detection
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

#### 3.5 Form Input Bindings

#####3.5.1 `v-model`

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

We also use `v-model` in radio, checkbox, Select options.

##### 3.5.2 Modifiers

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

