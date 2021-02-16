<template>
<div>
	
<div class="inner-content container" id="page-movies_list">
		 
<div class="ui grid mb-0 desktop-only">	
	<div class="left floated sixteen wide tablet eleven wide computer column pb-0">
		<div class="cat-tagsx">
     <nuxt-link class="ui button secondary"    :title="item.name"  v-for="(item, index) in generos" :key="index"
     :data-tooltip="item.name" 
:to="{ name: 'descubrir', query: {s: 'pelicula', genS: item.slug} }">
     
	
        {{item.name}}
         </nuxt-link>
          <dropdown class="my-dropdown-toggle"
           :options="opcionesDropGeneros" 
                        :selected="GeneroDropSelected" 
                         v-on:updateOption="clickGeneroDrop" 
                        :placeholder="'Mas...'"
          :closeOnOutsideClick="true"
          :classGen="1">
      </dropdown>
	    </div>

      
		
	</div>
	



	<div class="right aligned floated five wide column pt-lg desktop-only">
<span class="section-heading pr-md">Mostrar:</span>
        <dropdown class="my-dropdown-toggle"
           :options="opcionesDrop" 
                        :selected="ordenSelected" 
                         v-on:updateOption="buscarOrdenar" 
                        :placeholder="'Seleccione'"
          :closeOnOutsideClick="true">
</dropdown>


		
	
	</div>
</div>

<div class="dark-segment">
    <div class="clearfix new-tvseries ydslide" style="margin-bottom: 30px;"> 

        <SliderPeliculas :arrayPeliculas="peliculasSlider" />
    </div>
    

	

<div class="segment-title pt-0">Proximas a Estrenar</div>
    <ProximasEstrenar :arrayEstrenos="peliculasEstrenar" />
<br>

<div class="area latest-add-movies">
<h2 class="segment-title p-0 m-0">Ultimas Peliculas</h2>
<UltimasPeliculas :arrayUltimas="peliculasUltimas" :totalPaginas="totalPaginas" :paginaActual="paginaActual" 
    :num_actual_ini="num_actual_ini" :num_actual_fin="num_actual_fin" :urlTest="urlTest" />

<PeliculasNotables :arrayNotables="peliculasNotables" />

</div>
</div>


<PeliculasEditor :arrayEditor="peliculasEditor" />

</div>

</div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
import SliderPeliculas from '@/components/VerPeliculas/SliderPeliculas.vue'
import ProximasEstrenar from '@/components/VerPeliculas/ProximasEstrenar.vue'
import UltimasPeliculas from '@/components/VerPeliculas/UltimasPeliculas.vue'
import PeliculasNotables from '@/components/VerPeliculas/PeliculasNotables.vue'
import PeliculasEditor from '@/components/VerPeliculas/PeliculasEditor.vue'
import dropdown from '@/node_modules/vue-dropdowns/Dropdown.vue';


export default {
  name: 'VerPeliculas',
  head(){
    return {
      title: this.$store.state.titleHome,
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
          totalPaginas: 0, 
       registrosxPag: 20,
      paginaActual: 1, 
       num_actual_ini: 1,
        num_actual_fin: 3,
        ini: 0, 
        fin: 20,
      VerPelicula: [], 
      generos: [], 
      peliculasSlider: [],
      peliculasEstrenar: [],
       peliculasUltimas: [],
       peliculasNotables: [],
       peliculasEditor: [],
     opcionesDrop: [
           {"id":"1", "name":"IMDB ↓", "order": "imdbMe"},
           {"id":"2", "name":"IMDB ↑", "order": "imdbMa" }, 
           {"id":"3", "name":"Año ↓", "order": "yearMe"},
           {"id":"4", "name":"Año ↑", "order": "yearMa"},
           {"id":"5", "name":"Agregada ↓", "order": "addMe"},
           {"id":"6", "name":"Agregada ↑", "order": "addMa"},
       ],
       opcionesDropGeneros: [
           {"id":"0", "name":"Mas...", "order": "imdbMe"},
           {"id":"2", "name":"IMDB ↑", "order": "imdbMa" }, 
           
       ],
       ordenSelected: "", 
       GeneroDropSelected: "Mas...",
       urlTest: {}
	  
        }
    },
      computed:{
        ...mapState(['urlProcesos'])
    },
    methods: {
      clickGeneroDrop(payload){
         
         this.$router.push({  name: 'Descubrir', query: {s: 'pelicula', genS: payload.slug} })
        
      }, 
       buscarOrdenar(payload) {
           console.log(payload.id);
   
              if(payload.id == 1){
                //IMDB menor
                    
                    if(this.$router.currentRoute.query.Order == 'imdbMe' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$router.replace({  name: 'peliculas', query: this.urlTest })
                     
                    }
              }
              if(payload.id == 2){
                //IMDB Mayor
                 if(this.$router.currentRoute.query.Order == 'imdbMa' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$router.push({  name: 'peliculas', query: this.urlTest })
                
                    }
              }
              if(payload.id == 3){
                //Año menor
                 if(this.$router.currentRoute.query.Order == 'yearMe' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$router.push({  name: 'peliculas', query: this.urlTest })
                
                    }
              }
              if(payload.id == 4){
                //Año Mayor
                 if(this.$router.currentRoute.query.Order == 'yearMa' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$router.push({  name: 'peliculas', query: this.urlTest })
                
                    }
              }
              if(payload.id == 5){
                //Agregada menor
                 if(this.$router.currentRoute.query.Order == 'addMe' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$router.push({  name: 'peliculas', query: this.urlTest })
                
                    }
              }
              if(payload.id == 6){
                //Agregada Mayor
                 if(this.$router.currentRoute.query.Order == 'addMa' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$router.push({  name: 'peliculas', query: this.urlTest })
                
                    }
              }


          }, 
    
   
		async getVerPeliculas(){
        
           var Order = this.$router.currentRoute.query.Order; 
           console.log("order es: "+Order)
           if(Order == undefined){
             Order = "null"
           }
         
            await fetch(this.urlProcesos +
          "wp-json/peliculas/ver/post/"+"?xPag="+this.registrosxPag+"&ini="+this.ini+"&fin="+this.fin
          +"&Order="+Order)
                    .then((r) => r.json())
                    .then((res) => {
                     console.log(res)
               //    console.log(res[0].generos.length)
                    var generosCortados = res[0].generos.slice(0, 6);
                    var generosDrop = res[0].generos.slice(6, res[0].generos.length);
                 //     console.log(generosCortados)
                //       console.log(generosDrop)
// masculinos contiene ['Pedro','Miguel
                        this.generos = generosCortados;
                        this.opcionesDropGeneros = generosDrop
                        this.peliculasSlider = res[0].peliculas_slider;
                        this.peliculasEstrenar = res[0].peliculas_estrenar;
                        this.peliculasUltimas =  res[0].ultimas_peliculas;
                        this.peliculasNotables = res[0].peliculas_notables;
                        this.peliculasEditor = res[0].peliculas_editor;
                         this.totalPaginas =  res[0].totalPaginas;
                      this.paginaActual = parseInt(this.$route.params.pag); 
                     if(this.$route.params.pag > 1){
                       
                   
                       this.fin = this.registrosxPag
                       this.num_actual_fin = 5
                       if(this.$route.params.pag > 4){
                         if(this.$route.params.pag == this.totalPaginas){
                     
                           this.num_actual_ini = this.paginaActual - 2
                           this.num_actual_fin = this.totalPaginas
                         }else
                         {
                            this.num_actual_ini = this.paginaActual - 2
                          this.num_actual_fin = this.paginaActual + 2
                       
                         }
                         
                       }
                       
                     }else
                     {
                       this.paginaActual = 1
                       this.num_actual_fin = 3
                     
                     }
                         this.$store.commit('setSkeleton', 1);
                    
                    }
                    );
           }, 
		
    },
     components: {
         dropdown, SliderPeliculas, ProximasEstrenar, UltimasPeliculas, PeliculasNotables,
        PeliculasEditor
          
         }, 
         watch:{
    $route (to, from){
       this.$store.commit('setSkeleton', 0);
        this.getVerPeliculas()
    }
} ,
  mounted() {
      this.$store.commit('setSkeleton', 0);
	 this.getVerPeliculas()
   this.getSeo()
    },
    created(){
     
       
        

           if(this.$router.currentRoute.query.Order==undefined){
        this.ordenSelected = this.opcionesDrop[5]
      }else{

        if(this.$router.currentRoute.query.Order == 'imdbMe'){
          this.parametros = true; 
            this.ordenSelected = this.opcionesDrop[0]
            this.urlTest.Order = "imdbMe"
        }
        if(this.$router.currentRoute.query.Order == 'imdbMa'){
          this.parametros = true; 
            this.ordenSelected = this.opcionesDrop[1]
            this.urlTest.Order = "imdbMa"
        }
        if(this.$router.currentRoute.query.Order == 'yearMe'){
          this.parametros = true; 
            this.ordenSelected = this.opcionesDrop[2]
             this.urlTest.Order = "yearMe"
        }
        if(this.$router.currentRoute.query.Order == 'yearMa'){
          this.parametros = true; 
            this.ordenSelected = this.opcionesDrop[3]
             this.urlTest.Order = "yearMa"
        }
        if(this.$router.currentRoute.query.Order == 'addMe'){
          this.parametros = true; 
            this.ordenSelected = this.opcionesDrop[4]
             this.urlTest.Order = "addMe"
        }
        if(this.$router.currentRoute.query.Order == 'addMa'){
          this.parametros = true; 
            this.ordenSelected = this.opcionesDrop[5]
             this.urlTest.Order = "addMa"
        }
        
      }
      if(this.$route.params.pag > 1){
  
    this.ini = (parseInt(this.$route.params.pag) - 1) * this.registrosxPag;
    
}else{

    this.ini = 0; 
}
    }
}
</script>
<style >
.poster.poster-ks a {
    display: flex;
    flex-direction: row-reverse;
    height: 100%!important;
    background-color: #1e2029;
    border-radius: 3px;
    transition: background-color .1s ease-in-out;
}
.poster.poster-ks img {
    display: block;
    max-width: 100%!important;
    min-width: 100%!important;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 2px;
    margin: 0!important;
}
.poster.poster-ks a:hover {
    background-color: #252833;
}

</style> 