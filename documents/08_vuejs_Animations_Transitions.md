
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
### Animations & Transitions

#### Enter/Leave & List Transitions

#####Transition class

There are six classes applied for enter/leave transitions.

- v-enter
- v-enter-active
- v-enter-to
- v-leave
- v-leave-active
- v-leave-to
  ![Diagram](https://vuejs.org/images/transition.png)

#####Custom Transition Classes

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

#####JavaScript Hooks 

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

#####Transition with Single Element/ Component

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

##### Transitioning Between Elements

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

##### Transitioning Between Components

- Add `component-` into the animation name. Ex: name = "fade" => name = "component-fade".
- Transitioning between components is even simpler - we don’t even need the key attribute. Instead, we wrap a dynamic component.

```
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
// `view` will be change to determine which component choosen
```

#####List Transition

- In this case, we’ll use the `<transition-group>` component.
- it renders an actual element: a <span> by default. You can change the element that’s rendered with the tag attribute.
- Elements inside are always required to have a unique key attribute.
- List Entering/Leaving Transitions use `name = "list"`.
- List Move Transitions use `name = "flip-list"`.
- Staggering List Transitions use `name = "staggered-fade"` .

##### Reusable Transitions

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

####  State Transitions

Vue’s transition system offers many simple ways to animate entering, leaving, and lists, but what about animating your data itself? For example:

- numbers and calculations
- colors displayed
- the positions of SVG nodes
- the sizes and other properties of elements

**Animating with Watcher**

- Watchers allow us to animate changes of any numerical property into another property
- Usually use with tween.js