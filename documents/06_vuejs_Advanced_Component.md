
# Vue. js Document

@(FE)[Vue | Oct 11th 2017 | Asian Tech ]

----------

[TOC]

-------------
### 6. More about Component

#### 6.1 Content Distribution with Slots

#####6.1.1 Compilation Scope

- **Everything in the parent template is compiled in parent scope; everything in the child template is compiled in child scope.**

#####6.1.2 Single Slot

- Parent content will be **discarded** unless the child component template contains at least one `<slot>` outlet. 
- When there is only one slot with no attributes, the entire content fragment will be inserted at its position in the DOM, replacing the slot itself.
- Anything originally inside the <slot> tags is considered **fallback content**. Fallback content is compiled in the child scope and will only be displayed if the hosting element is empty and has no content to be inserted.

#####6.1.3 Named Slot

- `<slot>` elements have a special attribute, name, which can be used to further customize how content should be distributed. You can have multiple slots with different names. A named slot will match any element that has a corresponding slot attribute in the content fragment.
- There can still be one unnamed slot, which is the default slot that serves as a catch-all outlet for any unmatched content. If there is no default slot, unmatched content will be discarded.

#####6.1.4 Scoped Slot

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

#### 6.2 Dynamic Component

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

#### 6.3 Misc

#####6.3.1 Authoring Reusable Components

The API for a Vue component comes in three parts - props, events, and slots:

- Props allow the external environment to pass data into the component
- Events allow the component to trigger side effects in the external environment
- Slots allow the external environment to compose the component with extra content.

#####6.3.2 Child Components Refs

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

#####6.3.3 Async Component

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

#####6.3.4 Advanced Async Components

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

