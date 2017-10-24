
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
### 4. Components

####4.1 How to create:

- In HTML:

  — 2 steps: register and create a root instance

  ```
  // register
  Vue.component('my-component', {
    template: '<div>A custom component!</div>'
  })

  // create a root instance
  new Vue({
    el: '#example'
  })
  ```

- In VUE CLI:

  — Create a file with the extension `.vue`. This file will have 3 parts: template ( HTML), script ( JS) and style ( CSS). 

  ```
  <template>
    <div class="id1"> 
    ....template
    </div>
  </template>

  <script>
  ....script
  </script>

  <style scoped>
  ....style css
  </style>

  ```

  — If you dont want to put all code of a component into one file. You can separate them by:

  ```
  <!-- my-component.vue -->
  <template>
    <div>This will be pre-compiled</div>
  </template>
  <script src="./my-component.js"></script>
  <style src="./my-component.css"></style>
  ```

#### 4.2 Properties of Components:

```
export default {
    name: 'Message',
    props: {},
    methods: {},
    computed: {},
    .
    .
    .
  }
```



##### 4.2.1 Name

- To determine component exactly, we need to put them a name.

##### 4.2.2 Methods

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

##### 4.2.3 Computed

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

##### 4.2.4 Watcher Property

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

##### 4.2.5 Props

- Props is a property using for data binding between some components.
- We declare the variable received the value from their parent components.
- In Interaction with DOM, we will discuss more about it 