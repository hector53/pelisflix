<template>
     <div class="cat-tags">
        <nuxt-link 
          class="ui button" 
          :title="'Ver Series '+movie.cat_name"
          v-for="(movie, index) in arrayGeneros" :key="index"
          :to="{ name: 'series-genero-slug-pag', params: {slug: movie.slug} }"
          :class="{'primary': movie.slug == slugGenero, 'secondary': movie.slug != slugGenero }"
          ><font>{{movie.cat_name}}</font></nuxt-link>
      </div>
</template>


<script>
// @ is an alias to /src

import { mapState } from "vuex";

export default {
  name: "GenerosMovies",
  components: {},
  data() {
    return {
        arrayGeneros: [], 
        slugGenero: ""
    };
  },
  computed: {
    ...mapState(["urlProcesos"]),
  },
  methods: {
      async getGenerosMovies(){
          await fetch(
          this.urlProcesos +
            "wp-json/peliculas/generos/?q=genS" )
          .then((r) => r.json())
          .then((res) => {
              console.log(res)
              this.arrayGeneros = res
              this.slugGenero = this.$route.params.slug; 
           
          });
      }
  },

  mounted() {
   this.getGenerosMovies()
  },

  created() {
  },
};
</script>

<style >
</style>
