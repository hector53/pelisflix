<template>
  <div class="ui dark-line card">
				<h2 class="header"><font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;" v-if="tipo==1">Series</font>
                    <font style="vertical-align: inherit;" v-if="tipo==2">Películas</font>
                    </font></h2>
				<div class="content">
					<div class="global-box">
						<div class="ui middle aligned divided list">
                             <div class="item series" v-for="(movie, index) in arrayDatos" :key="index">
							<nuxt-link :to="{ name: nameRouter, params: {slug: movie.slug} }">
                   
									<div class="cover-photo">
                                        <img :src="movie.imagen"></div>
									<div class="content">
										<h5 class="truncate">
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">{{movie.titulo}}</font></font></h5>
										<div class="description truncate">
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">+{{movie.visitas}} vistas</font></font></div>
									</div>
								</nuxt-link >
							</div>
						</div>
					</div>
				</div>
			</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "TendenciasPeliculas",
   props: ['tipo'],
  data() {
    return {
        arrayDatos: [], 
        nameRouter: ""
    };
  },
  computed: {
    ...mapState(["urlProcesos", "skeleton"]),
  },

  methods: {
      async getDatos(){
          if(this.tipo==1){
             await     fetch( this.urlProcesos +"wp-json/tendencias/all/?q=getS")
            .then((r) => r.json())
            .then((res) => {
//console.log(res)
                this.arrayDatos = res
                this.nameRouter = "series-slug"
            });
          }

            if(this.tipo==2){
             await     fetch( this.urlProcesos +"wp-json/tendencias/all/?q=getP")
            .then((r) => r.json())
            .then((res) => {
              //  console.log(res)
                this.arrayDatos = res
                this.nameRouter = "peliculas-slug"
                  this.$store.commit('setSkeleton', 1);
            });
          }
          
      }
    },
  components: {},
  mounted() {
      this.getDatos()
      
  },
};
</script>
<style >
</style>