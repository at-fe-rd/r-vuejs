<template>
  <div :class="[{ 'movie-favorite' : movie.favorite}, 'movie']" :style="{ 'background-image': movie.largeImgSrc }">
    <nav>
      <ul class="nav-list">
        <li class="nav-item">
          <a>
            <router-link :to="`/`">
              <p>Home</p>
            </router-link>
          </a>
        </li>
        <li class="nav-item active"> 
          <a>
            Films
          </a>
        </li>
        <li class="nav-item">
          <a>
            Shows
          </a>
        </li>
        <li class="nav-item">
          <a>
            Music
          </a>
        </li>
        <span class="nav-item to-the-right">VUEFLIX</span>
      </ul>
    </nav>
    <div class="movie-info">
      <h1>{{movie.title}}</h1>
      <p class="color-change">{{movie.duration}} | {{movie.genre}} | {{movie.releaseDate}}</p>
      <p class="description">Miraculous evacuation of Allied soldiers from Belgium, Britain, Canada, and France, who were cut off and surrounded by the German army from the beaches and harbor of Dunkirk, France, during the Battle of France in World War II.</p>
      <button class="play">
        <router-link :to="`/movie-trailer/${movie.id}`">
          <p>Play</p>
        </router-link>
      </button>
      <button class="favorited" @click="addToFavorite">Add to favorites +</button>
    </div>
  </div>
</template>

<script>
import movies from '../movies.js'
export default {
  name: 'Movie',
  data () {
    return {
      movie: movies[this.$route.params.id]
    }
  },
  watch: {
    $route () {
      this.selectMovie()
    }
  },
  methods: {
    selectMovie () {
      this.movie = movies[this.$route.params.id]
    },
    addToFavorite () {
      movies[this.$route.params.id].favorite = !movies[this.$route.params.id].favorite
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color: white;
  font-size: 50px;
  margin: 0;
}

.description{
  padding-bottom: 20px;
}

p{
  color: white;
  margin: 0;
}
.color-change{
  color: red;
  font-weight: 800;
  padding-bottom: 20px;
}
.movie-info {
  padding-left: 40px;
  width: 60%;
}
.movie {
  text-align: left;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: multiply;
  background-size:  cover;
}
.nav-list {
  padding-top: 20px;
  list-style-type: none;
}
.nav-item {
  color: white;
  margin: 5px 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: 200;
  font-size: 17px;
  display: inline-block;
}
.to-the-right{
  float: right;
  padding-right: 20px;
  color: red;
}
.play{
  background: #ce2424;
  padding: 5px 20px;
  border: 0;
  color: white;
  font-size: 17px;
  font-weight: 400;
  border-radius: 20px;
  margin-right: 20px;
}

.favorited{
  border: 0;
  background-color: Transparent;
  color: white;
  font-size: 17px;
}

.movie-favorite{
  box-shadow: 0 0 50px 15px rgba(251, 255, 15, 0.25);
}

.active{
  color: black;
  background-color: white;
}
</style>
