<template>
<div>
  <div class="ui three column doubling grid" v-for="(movie, index) in arrayPopulares" :key="index">
					<div class="column">
						<h6>Categorías Populares</h6>
						<div class="ui two column doubling grid">
							<div class="column">
								<h6 style="    margin-top: 10px;">Series</h6>
								<div class="ui link list">

						<nuxt-link class="item" @click.native="$store.commit('scrollToTop')"
                         :to="{ name: 'series-genero-slug-pag', params: {slug: movie2.slug} }"
						 v-for="(movie2, index) in movie.categoriasSeries" :key="index"
						 >
						{{movie2.cat_name}}</nuxt-link >
									
								</div>
							</div>
							<div class="column">
								<h6 style="    margin-top: 10px;">Películas</h6>
								<div class="ui link list">
								<nuxt-link class="item" @click.native="$store.commit('scrollToTop')"
                         :to="{ name: 'peliculas-genero-slug-pag', params: {slug: movie2.slug} }"
						 v-for="(movie2, index) in movie.categoriasMovies" :key="index"
						 >
						{{movie2.cat_name}}</nuxt-link >
								</div>
							</div>
						</div>
					</div>
					<div class="column">
						
						<div class="ui two column doubling grid">
						
							<div class="column">
								<h6 style="    margin-top: 40px;">Series Populares</h6>
								<div class="ui link list">
									<nuxt-link class="item" @click.native="$store.commit('scrollToTop')"
                         :to="{ name: 'series-slug', params: {slug: movie2.post_name} }"
						 v-for="(movie2, index) in movie.seriesPopulares" :key="index"
						 >
						{{movie2.post_title}}</nuxt-link >
								</div>
							</div>

							<div class="column">
								<h6 style="    margin-top: 40px;">Series Nuevas</h6>
								<div class="ui link list">
									<nuxt-link class="item" @click.native="$store.commit('scrollToTop')"
                         :to="{ name: 'series-slug', params: {slug: movie2.post_name} }"
						 v-for="(movie2, index) in movie.seriesNuevas" :key="index"
						 >
						{{movie2.post_title}}</nuxt-link >
								</div>
							</div>
						</div>
					</div>
					<div class="column">
												<div class="ui two column doubling grid">
							
							<div class="column">
								<h6 style="    margin-top: 40px;">Películas Populares</h6>

								<div class="ui link list">
									<nuxt-link class="item" @click.native="$store.commit('scrollToTop')"
                         :to="{ name: 'peliculas-slug', params: {slug: movie2.post_name} }"
						 v-for="(movie2, index) in movie.moviesPopulares" :key="index"
						 >
						{{movie2.post_title}}</nuxt-link >
								</div>
							</div>
							
							<div class="column">
								<h6 style="    margin-top: 40px;">Películas Nuevas</h6>

								<div class="ui link list">
									<nuxt-link class="item" @click.native="$store.commit('scrollToTop')"
                         :to="{ name: 'peliculas-slug', params: {slug: movie2.post_name} }"
						 v-for="(movie2, index) in movie.moviesNuevas" :key="index"
						 >
						{{movie2.post_title}}</nuxt-link >
								</div>
							</div>
						</div>
					</div>
				</div>
</div>
</template>


<script>

import {mapState} from 'vuex'

export default {
  name: "FooterPopular",
  
  data() {
    return {
      arrayPopulares: []
    };
  },
    computed:{
        ...mapState(['urlProcesos'])
    },
   
  methods: {

	  async getPopular(){

              await fetch(this.urlProcesos+'wp-json/footer/options/?q=2')
                    .then((r) => r.json())
                    .then((res) => {
                   //     console.log(res);
					 this.arrayPopulares = res
                  
                    }
                    );

        }

    },
  mounted() {
	  	this.getPopular()
  },
  updated() {
      
  },

 
};
</script>
<style >

</style>