import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Movie from '@/components/Movie'
import MovieTrailer from '@/components/MovieTrailer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/movie-trailer/:id',
      name: 'Trailer',
      component: MovieTrailer
    }
  ]
})
