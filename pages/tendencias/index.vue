<template>
<div class="inner-content container" id="page-index">
               <div class="bg-cover-faker">

	<h1 class="page-title pt-sm pb-lg"><font style="vertical-align: inherit;">
        <font style="vertical-align: inherit;">Tendencias de la semana</font></font></h1>
	<div class="weekly-trends">
	
		<div class="wt-column">
			<TendenciasPeliculas  :tipo="1"/>
		</div>

		<div class="wt-column">
	    	<TendenciasPeliculas  :tipo="2"/>
		</div>

		<div class="wt-column">
			<TendenciasUsers />
		</div>
	
	</div>
	<TendenciasTabla />
</div>

			</div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
import TendenciasPeliculas from '@/components/Tendencias/TendenciasPeliculas.vue'
import TendenciasUsers from '@/components/Tendencias/TendenciasUsers.vue'
import TendenciasTabla from '@/components/Tendencias/TendenciasTabla.vue'
export default {
  name: 'Tendencias',
  head(){
    return {
      
      title: "Tendencias - "+this.$store.state.titleHome,
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
   data (){
        return {
      
        }
    },
      computed:{
        ...mapState(['urlProcesos'])
    },
    methods: {
      
      },
     components: {
TendenciasPeliculas, TendenciasUsers, TendenciasTabla
      }, 
  mounted() {
   this.$store.commit('setSkeleton', 0);
},
    created(){
      
        
    }
}
</script>
<style >

</style> 