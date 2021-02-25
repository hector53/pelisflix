<template>
<div>
    <ul class="flex flex-wrap">



    <li class="mofy-moviesli" v-for="(movie, index) in arrayUltimas " :key="index" >
            <div class="mofy-movbox">
                    <div class="mofy-movbox-image relative">
                    <nuxt-link  :to="{ name: 'peliculas-slug', params: {slug: movie.slug} }">
                        
                            <img class="lazy-wide loaded "
                                :src="movie.imagen2"
                                :alt="movie.titulo" >
                            <div class="mofy-movbox-on absolute">
                                
                                <div
                                    class="mofy-movpoint flex items-center justify-between absolute">
                                    <span class="flex items-center">
                                        <svg>
                                            <path
                                                d="M12.3 4.1l-3.5-.5-1.6-3.2c-.2-.5-1.2-.5-1.4 0l-1.6 3.2-3.5.5c-.7.1-.9.9-.5 1.4l2.6 2.5-.6 3.5c-.1.7.6 1.2 1.2.9l3.1-1.6 3.1 1.6c.6.3 1.3-.2 1.2-.9l-.6-3.5 2.5-2.5c.5-.5.3-1.3-.4-1.4z">
                                            </path>
                                        </svg>
                                        {{movie.imdb}}
                                    </span>
                                    <p>{{movie.fecha}}</p>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                    <div class="mofy-movbox-text">
                        <span class="block">
                        <nuxt-link :to="{ name: 'peliculas-slug', params: {slug: movie.slug} }">
                               
                                {{movie.titulo}}
                            </nuxt-link>
                        </span>
                        <p class="truncate">{{movie.genero}}</p>
                    </div>
                </div>
         </li>
          </ul>  

      <div class="ui pagination menu" >
<nuxt-link class="item"   
	:to="{ name: 'peliculas-genero-slug-pag', params: {pag: 1, slug: genSlug}, }" rel="start"
	v-show="paginaActual > 1"
	 >&lt; Primero</nuxt-link>
<nuxt-link class="item"   
	:to="{ name: 'peliculas-genero-slug-pag', params: {pag: paginaActual - 1, slug: genSlug}, }" rel="prev"
	v-show="paginaActual > 1"
	 >&lt;</nuxt-link>
	<nuxt-link class="item"   
	 v-for="(n, index) in totalPaginas" :key="index"
	 :class="{'active' : n == paginaActual   }"
	:to="{ name: 'peliculas-genero-slug-pag', params: {pag: n, slug: genSlug}, }"
	v-show="n >= num_actual_ini && n <= num_actual_fin "
	>
	{{n}}</nuxt-link>
	<nuxt-link class="item"   
	:to="{ name: 'peliculas-genero-slug-pag', params: {pag: paginaActual + 1, slug: genSlug}, }" rel="next"
	v-show="paginaActual < totalPaginas"
	 >&gt;</nuxt-link>
	<nuxt-link class="item"  
	:to="{ name: 'peliculas-genero-slug-pag', params: {pag: totalPaginas, slug: genSlug}, }" rel="start"
	v-show="paginaActual < totalPaginas"
	 >Ultimo &gt;</nuxt-link>		
    	</div>    
 
</div>
</template>


<script>
export default {
  name: 'MoviesList',
   props: {
        arrayUltimas:{
            type: Array, 
            required: true,
        },
        genSlug:{
                type: String, 
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
        urlTest:{
			type: Object,
			required: true
		},
    },
   data (){
        return {
        }
    },
    
    methods: {
        
    },
    mounted() {
    },
}
</script>
<style >
.mofy-moviesli {
    width: 25%;
    padding: 5px;
}
</style>