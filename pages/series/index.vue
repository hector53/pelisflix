<template>
<div>
	
	<div class="inner-content container" id="page-series_list">
		<div class="ui grid mb-0">
			<div class="left floated sixteen wide column pb-0">
				<h1 class="page-title pt-sm pb-sm">Series de Televisión</h1>
				<div class="description-primary pb-0 mb-md">Puede navegar rapidamente por todas las series en nuestro sitio gracias a nuestro indice de series</div>
			</div>
		</div>
		<div class="dark-segment">
			<div class="cat-tags mb-0">
				<button class="ui button secondary" v-for="(letra, index) in ABC" :key="index" v-scroll-to="'#go-'+letra">{{letra}}</button>
			</div>
			<div  v-for="(letra, index) in ABC" :key="index" > 
				<VerSeriesABCList :letra="letra"  />
				
			</div>
		</div>				
	</div>

</div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
import VerSeriesABCList from '@/components/VerSeries/VerSeriesABCList.vue'
export default {
  name: 'VerSeries',
  head(){
    return {
      
      title: "Series - "+this.$store.state.titleHome,
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
      VerSerie: [], 
	  ABC: [
		  "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q",
		  "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	  ]
        }
    },
      computed:{
        ...mapState(['urlProcesos'])
    },
    methods: {
		goLetter(t){
			 var container = this.querySelector("#go-"+t);
      		container.scrollTop = container.scrollHeight;
		//$("html,body").animate({scrollTop:$("#go-"+t).offset().top},"fast")
		},
		
    },
     components: {
		 VerSeriesABCList
         }, 
  mounted() {
	   this.$store.commit('setSkeleton', 0);
	},
	created() {

	},
}
</script>
