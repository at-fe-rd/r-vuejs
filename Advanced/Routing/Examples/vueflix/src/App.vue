<template>
  <div id="app">
    <section class="hero">
      <div class="hero-body">
        <router-view/>
      </div>
      <div class="hero-foot">
        <ul class="movie-list">
          <li v-for="movie in movies" class="movie-item" >
            <a>
              <router-link :to="`/movie/${movie.id}`">
                <img :src="`${movie.smallImgSrc}`">
                <div v-if="movie.favorite" class="circle">v</div>
              </router-link>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import movies from './movies.js'
export default {
  name: 'app',
  data () {
    return {
      movies: movies
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.hero-body {
  height: 376px;
}

.hero-foot {
  height: 174px;
  background: linear-gradient(to bottom right, #7d1e24, #bb2d35);
}

.hero {
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.25);
}

.movie-list {
  margin: 0;
  padding: 25px 0;
  list-style-type: none;
}

.movie-item {
  width: calc(100%/5);
  float: left;
  position: relative;
}

.circle {
  position: absolute;
  top: 0;
  right: 10px;
  border-radius: 50%;
  color: white;
  width: 20px;
  height: 20px;
  background-color: green;
}
</style>
