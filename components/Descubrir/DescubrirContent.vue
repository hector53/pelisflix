<template>
<div class="right floated sixteen wide tablet twelve wide computer column">

			<div id="discover-response" class="dark-segment">

				
				<ul class="filter-results" v-if="tipoS == 'pelicula'">
					<li class="segment-poster" v-for="(movie, index) in arraySeries" :key="index"  >
							<div class="poster poster-md">
								<div class="poster-media">
									 <nuxt-link 
									  :to="{ name: 'peliculas-slug', params: {slug: movie.slug} }">
										<img :src="movie.imagen" class="imgposterDescubrirMovie">
										<div class="poster-overlay">
											<span class="item rating"><svg class="mofycon"><use xlink:href="#icon-star"></use></svg>{{movie.imdb}}</span>
											<span class="item year">{{movie.year}}</span>
										</div>
									</nuxt-link>
								</div>
								<div class="poster-subject">
									 <nuxt-link  :to="{ name: 'peliculas-slug', params: {slug: movie.slug} }">
									<h2 class="truncate">{{movie.titulo}}</h2></nuxt-link>
									<p class="poster-meta truncate">
								<span class="genres" > <span v-for="(genero, index) in movie.generos" :key="index">{{genero.genero}}</span> </span>	
										</p>
								</div>
							</div>
						</li>

	</ul>

			<ul class="filter-results" v-else>
					






					<li class="mb-lg" v-for="(movie, index) in arraySeries" :key="index" >	
						<div class="poster-with-subject">
					 <nuxt-link    :to="{ name: 'series-slug', params: {slug: movie.slug} }">
	
							
								<img :src="movie.imagen">
					 </nuxt-link>		
							<div class="subject">
								<div class="subject-title">
									<div>
									 <nuxt-link    :to="{ name: 'series-slug', params: {slug: movie.slug} }">
	
											<h2 class="truncate">{{movie.titulo}}</h2>
										</nuxt-link>
										<p class="poster-meta truncate">
											<span class="genres" > <span v-for="(genero, index) in movie.generos" :key="index">{{genero.genero}}</span> </span>
											<span class="rating"><svg class="mofycon"><use xlink:href="#icon-star"></use></svg> {{movie.imdb}}</span>
										</p>
									</div>
																	</div>
								<p class="desktop-only excerpt" v-html="movie.sinopsis"> </p>
							</div>
						</div>
						<p class="mobile-only excerpt" v-html="movie.sinopsis">
							</p>
						<div class="media-meta">
							<table class="ui single line celled unstackable table">
								<tbody>
									<tr>
										<td>
											<div>Año</div>
											<div>{{movie.year}}</div>
										</td>
										<td width="145px">
											<div>Duración</div>
											<div>{{movie.time}} min</div>
										</td>
										<td>
											<div>Temporadas</div>
											<div>{{movie.temporadas}}</div>
										</td>
										<td>
											<div>Capitulos</div>
											<div>{{movie.capitulos}}</div>
										</td>
										<td>
											<div>Seguidores</div>
											<div>0</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</li>			</ul>

				
			</div>
<!-- paginacion con parametros -->


		<div class="ui pagination menu" v-if="parametros">
<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: 1}, query: urlTest }" rel="start"
	v-show="paginaActual > 1"
	 >&lt; Primero</nuxt-link>
<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: paginaActual - 1}, query: urlTest }" rel="prev"
	v-show="paginaActual > 1"
	 >&lt;</nuxt-link>
	<nuxt-link class="item"    
	 v-for="(n, index) in totalPaginas" :key="index"
	 :class="{'active' : n == paginaActual   }"
	:to="{ name: 'descubrir-pag', params: {pag: n}, query: urlTest }"
	v-show="n >= num_actual_ini && n <= num_actual_fin "
	>
	{{n}}</nuxt-link>
	<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: paginaActual + 1}, query: urlTest }" rel="next"
	v-show="paginaActual < totalPaginas"
	 >&gt;</nuxt-link>
	<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: totalPaginas}, query: urlTest }" rel="start"
	v-show="paginaActual < totalPaginas"
	 >Ultimo &gt;</nuxt-link>			
    	</div>


<!-- paginacion sin parametros -->
	<div class="ui pagination menu" v-else>
<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: 1} }" rel="start"
	v-show="paginaActual > 1"
	 >&lt; Primero</nuxt-link>
<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: paginaActual - 1} }" rel="prev"
	v-show="paginaActual > 1"
	 >&lt;</nuxt-link>
	<nuxt-link class="item"    
	 v-for="(n, index) in totalPaginas" :key="index"
	 :class="{'active' : n == paginaActual   }"
	:to="{ name: 'descubrir-pag',  params: {pag: n}  }"
	v-show="n >= num_actual_ini && n <= num_actual_fin "
	>
	{{n}}</nuxt-link>
	<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: paginaActual + 1} }" rel="next"
	v-show="paginaActual < totalPaginas"
	 >&gt;</nuxt-link>
	<nuxt-link class="item"    
	:to="{ name: 'descubrir-pag', params: {pag: totalPaginas} }" rel="start"
	v-show="paginaActual < totalPaginas"
	 >Ultimo &gt;</nuxt-link>			
    	</div>




			
		</div>
</template>


<script>
export default {
  name: 'DescubrirContent',
   props: {
	    arraySeries:{
            type: Array, 
            required: true,
		},
		totalPaginas:{
			type: Number,
			required: true
		}, 
		paginaActual:{
			type: Number,
			required: true
		},
		num_actual_ini:{
			type: Number,
			required: true
		}, 
		num_actual_fin:{
			type: Number,
			required: true
		},
		parametros:{
			type: Boolean,
			required: true
		}, 
		urlTest:{
			type: Object,
			required: true
		}, 
		tipo:{
			type: String,
			required: true
		}
       
	},
	 watch: {
	
   
	 },
   data (){
        return {
        tipoS : this.tipo
     
        }
    },
    
    methods: {
        
    },
	           watch:{
    $route (to, from){
		  if(this.$router.currentRoute.query.s==undefined){
              this.tipoS = 'pelicula'
           }else{
                  this.tipoS = this.$router.currentRoute.query.s
           }
    }
},
    mounted() {
		
    },
}
</script>
<style>
.imgposterDescubrirMovie{
	width: 232px!important;
	height: 348px!important;
}
</style>