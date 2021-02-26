<template>
<div class="inner-content container" id="page-collection">
			
			

	<MisColecciones />

	<ColeccionesDestacadas />

    
</div>
</template>

<script>

// @ is an alias to /src
import {mapState} from 'vuex'
import MisColecciones from '@/components/Colecciones/MisColecciones.vue'
import ColeccionesDestacadas from '@/components/Colecciones/ColeccionesDestacadas.vue'
export default {
  name: 'Colecciones',
  head(){
    return {
      
      title: "Colecciones - "+this.$store.state.titleHome,
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
         ColeccionesDestacadas, MisColecciones
         }, 
  mounted() {
         this.$store.commit('setSkeleton', 0);
    },
    created() {


    },
}
</script>
