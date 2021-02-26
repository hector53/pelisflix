<template>
 <div class="inner-content container" id="page-index">


<h1 class="page-title pt-sm pb-lg">Series del Mes</h1>

	
<div class="calendar-item" v-for="(movie, index) in arrayCalendario" :key="index">
			<div class="date">
				<span>{{movie.diaSemana}}</span><strong>{{movie.dia}}</strong>{{movie.mesActual}}
			</div>
			<div class="calendar-item-list">
				<div class="dark-segment">
					<ul class="clearfix">
                        
                    <li class="segment-poster-sm" v-for="(movie2, index) in movie.items" :key="index" v-show="movie.items != 0">
                        <div class="poster poster-xs">
                            <nuxt-link @click.native="$store.commit('scrollToTop')"
                            :to="{ name: 'series-slug-temporada-id_temp-capitulo-id_cap', 
                            params: {slug: movie2.slug, id_temp: movie2.temporada, id_cap: movie2.capitulo } }">
                                <div class="poster-subject">
                                    <h2 class="truncate">{{movie2.titulo}}</h2>
                                    <p class="poster-meta">
                                        <span class="episode-no">Temporada {{movie2.temporada}} · Capitulo {{movie2.capitulo}}</span>
                                    </p>
                                </div>
                                <img alt="..." class="lazy-wide loaded" :src="movie2.imagen" data-src="/uploads/series/vikings-izle-1.jpg?v=0.01" data-was-processed="true">
                            </nuxt-link>
                        </div>
                    </li>
            
                 </ul>
				</div>
			</div>
		</div>				
				

			</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Calendario', 
  head(){
    return {
      
      title: "Calendario - "+this.$store.state.titleHome,
            meta: [
                { name: 'description', content:  this.$store.state.descripcionHome},
                { property: 'og:locale', content: 'es_ES'},
                { property: 'og:title', content: this.$store.state.titleHome},
                { property: 'og:site_name', content: this.$store.state.siteName},
                {property: 'og:type', content: 'website'},    
                {property: 'og:url', content: this.$store.state.siteUrl},   
                { name: 'twitter:card', content:  'summary_large_image'}, 
                {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} 
            ], 
            link: [
      { rel: 'canonical', href: this.$store.state.siteUrl }, 
      
    ]
    }
  },
  data() {
    return {
      arrayCalendario: []
    };
  }, 
   computed:{
        ...mapState(['urlProcesos'])
    },
   components:{
      
	},
	methods: {
  async getCalendar(){

              await fetch(this.urlProcesos+'wp-json/calendario/all/')
                    .then((r) => r.json())
                    .then((res) => {
                      //  console.log(res);
                     this.arrayCalendario = res
                  this.$store.commit('setSkeleton', 1);
                    }
                    );

        }
	}, 
	 mounted() {
  this.$store.commit('setSkeleton', 0);
this.getCalendar()
  },
  created() {
   
  },
}
</script>