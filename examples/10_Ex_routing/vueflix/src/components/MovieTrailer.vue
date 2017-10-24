<template>
    <iframe
      allowFullScreen
      frameborder="0"
      height="376"
      :src="trailerUrlPath"
      style="width: 100%; min-width: 536px"
    />
</template>

<script>
import movies from '../movies.js'
export default {
  name: 'MovieTrailer',
  data () {
    return {
      trailerUrlPath: movies[this.$route.params.id].trailerPath
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
