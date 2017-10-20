<template>
  <div class="hello">
    <h1>ENTER/LEAVETRANSITION</h1>
    <div>
      <b>transition "fade"</b><br>
      <button @click="showFade =!showFade">Toggle</button>
      <transition name="fade">
        <p v-if="showFade">Turn on</p>
      </transition>
    </div>
    <div>
      <b>transition "slide-fade"</b><br>
      <button @click="showSlide =!showSlide">Toggle</button>
      <transition name="slide-fade">
        <p v-if="showSlide">Turn on</p>
      </transition>
    </div>
    <div>
      <b>transition "bounce"</b><br>
      <button @click="showBounce =!showBounce">Toggle</button>
      <transition name="bounce">
        <p v-if="showBounce">Turn on</p>
      </transition>
    </div>
    <div>
      <b>Custom class</b><br>
      <button @click="showCustom =!showCustom">Toggle</button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
        <p v-if="showCustom">Turn on</p>
      </transition>
    </div>
    <transition name="fade">
      <button v-bind:key="docState" @click="randomDoc">
        {{ buttonMessage }}
      </button>
    </transition>
    <div id="example-8">
      <input v-model.number="firstNumber" type="number" step="20">
      <p>{{ animatedNumber }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showFade: true,
      showSlide: true,
      showBounce: true,
      showCustom: true,
      docState: 0,
      firstNumber: 0,
      animatedNumber: 0
    }
  },
  methods: {
    randomDoc () {
      this.docState = this.docState + 1
    }
  },
  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 0: return 'Edit'
        case 1: return 'Save'
        case 2: return 'Cancel'
      }
    }
  },
  watch: {
    firstNumber: function () {
      while (this.firstNumber > this.animatedNumber) {
        console.log(this.animatedNumber)
        this.animatedNumber++
      }
    }
  }
}
</script>

<style scoped>
/*fade*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
/*slide-fade*/
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
/*bounce*/
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
