<template>
  <div class="intro">
    <div class="has-text-center">
      <h1>VUE FLIX</h1>
      <p>Select a movie below from the list of critically acclaimed Christopher Nolan films.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.intro{
  background-color: rgb(30, 29, 29);
  height: 100%;
  width: 100%;
  display: table;
}

h1 {
  font-size: 80px;
  font-weight: 200;
  color: red;
  margin: 0;
}

p{
  margin: 0;
  color: white;
}

.has-text-center{
  display: table-cell;
  vertical-align: middle;
}
</style>
