<template>
<div>

  	
	<div class="inner-content container" id="page-discover" >
			
				
<div class="bg-cover-faker">

	<div class="ui grid mb-0">
	
		<div class="left floated sixteen wide tablet eight wide computer column pb-0">
			<h1 class="page-title pt-sm pb-sm">descubrir</h1>
			<div class="description-primary pb-0 mb-md" style="font-size:14px">Puedes encontrar películas nuevas y programas de television aquí
                </div>
			<div class="filter-mobile">
				<button type="button" id="trigger-filter-sidebar" class="ui primary button">Ordenar</button>
				<div class="fm-order">
					   <dropdown class="my-dropdown-toggle"
                          :options="opcionesDrop" 
                        :selected="ordenSelected" 
                         v-on:updateOption="buscarOrdenar" 
                        :placeholder="'Seleccione'"
                        :closeOnOutsideClick="true">
                    </dropdown>
				</div>
			</div>
		</div>
	
		<div class="right aligned floated eight wide column pt-lg desktop-only">
			<span class="section-heading pr-md">Ordenar:</span>
		 <dropdown class="my-dropdown-toggle"
                        :options="opcionesDrop" 
                        :selected="ordenSelected" 
                         v-on:updateOption="buscarOrdenar" 
                        :placeholder="'Seleccione'"
                        :closeOnOutsideClick="true">
                    </dropdown>
		</div>
	</div>
	
	<div id="filtered-tags">
		<a class="ui label" @click="cerrarYear()" rel="nofollow" v-show="$store.state.DesYearI > 0 && $store.state.DesYearE <= 2020" >
			Año: {{$store.state.DesYearI}} - {{$store.state.DesYearE}} 
			<span class="mofycon-delete"></span>
		</a>

    	<a class="ui label" @click="cerrarImdb()" rel="nofollow" v-show="$store.state.DesImdbI >= 0 && $store.state.DesImdbE > 0 " >
			IMDB: {{$store.state.DesImdbI}} - {{$store.state.DesImdbE}} 
			<span class="mofycon-delete"></span>
		</a>

    	<a class="ui label" @click="cerrarGenSerie()" rel="nofollow" v-show="$store.state.DesGenSerie != '' " >
			Genero: {{$store.state.DesGenSerie}}
			<span class="mofycon-delete"></span>
		</a>

    <a class="ui label" @click="cerrarPais()" rel="nofollow" v-show="$store.state.DesPais != '' " >
			País: {{$store.state.DesPais}}
			<span class="mofycon-delete"></span>
		</a>
	</div>
  
	<div class="ui grid mb-lg mt-0" >

		<descubrirSidebar   :arrayGeneros="generos" :arrayPaises="paises" 
    :yearI="yearI" :yearE="yearE" :urlTest="urlTest" :imdbI="imdbI" :imdbE="imdbE"
    :genS="genSerie" :pais="pais" :tipo="tipo" />



<SkeletonMio v-show="skeletonmio == true" style="width: 75%;" />  
		<descubrirContent  v-show="skeletonmio == false"  :arraySeries="series" 
    :totalPaginas="totalPaginas" :paginaActual="paginaActual" 
    :num_actual_ini="num_actual_ini" :num_actual_fin="num_actual_fin"
    :parametros="parametros" :urlTest="urlTest" :tipo="tipo"
    />

  
	</div>

</div>			
</div>
</div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
import dropdown from '@/node_modules/vue-dropdowns/Dropdown.vue';
import descubrirSidebar from '@/components/Descubrir/DescubrirSidebar.vue'
import descubrirContent from '@/components/Descubrir/DescubrirContent.vue'
import SkeletonMio from '@/components/SkeletonMio/SkeletonMio.vue'
export default {
  name: 'descubrir',
  head(){
    return {
      
      title: "Descubrir - "+this.$store.state.titleHome,
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
      arrayBuscador: [], 
	 opcionesDrop: [
           {"id":"1", "name":"IMDB ↓", "order": "imdbMe"},
           {"id":"2", "name":"IMDB ↑", "order": "imdbMa" }, 
           {"id":"3", "name":"Año ↓", "order": "yearMe"},
           {"id":"4", "name":"Año ↑", "order": "yearMa"},
           {"id":"5", "name":"Agregada ↓", "order": "addMe"},
           {"id":"6", "name":"Agregada ↑", "order": "addMa"},
       ],
       ordenSelected: "", 
       tipo: "pelicula", 
       generos:[], 
       skeletonmio: true,
       paises: [], 
       series: [], 
       totalPaginas: 0, 
       registrosxPag: 10,
      paginaActual: 1, 
       num_actual_ini: 1,
        num_actual_fin: 3,
        ini: 0, 
        fin: 10,
        yearI:2000, 
        yearE: 2020, 
        imdbI: 0, 
        imdbE: 10,
        genSerie: "",
        pais: "",
        parametros: false, 
        urlTest: {
          
        }
        }
    },
      computed:{
        ...mapState(['urlProcesos', 'skeleton'])
    },
    methods: {
      buscarOrdenar(payload) {
       //    console.log(payload.id);
      //     let params = new URLSearchParams(location.search);
              if(payload.id == 1){
                //IMDB menor
                    
                    if(this.$router.currentRoute.query.Order == 'imdbMe' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$store.commit('scrollToTop');
                    this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
                
                    }
              }
              if(payload.id == 2){
                //IMDB Mayor
                 if(this.$router.currentRoute.query.Order == 'imdbMa' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$store.commit('scrollToTop');
                    this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
                
                    }
              }
              if(payload.id == 3){
                //Año menor
                 if(this.$router.currentRoute.query.Order == 'yearMe' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$store.commit('scrollToTop');
                    this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
                
                    }
              }
              if(payload.id == 4){
                //Año Mayor
                 if(this.$router.currentRoute.query.Order == 'yearMa' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$store.commit('scrollToTop');
                    this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
                
                    }
              }
              if(payload.id == 5){
                //Agregada menor
                 if(this.$router.currentRoute.query.Order == 'addMe' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$store.commit('scrollToTop');
                    this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
                
                    }
              }
              if(payload.id == 6){
                //Agregada Mayor
                 if(this.$router.currentRoute.query.Order == 'addMa' ){
                    //son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
                    }else{
                    //son diferentes aqui si hago
                    this.urlTest.Order = payload.order
                    this.$store.commit('scrollToTop');
                    this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
                
                    }
              }


          }, 
      cerrarYear(){
     delete this.urlTest.yearI;
     delete this.urlTest.yearE;
         this.$store.commit('setDesYearI', 0);
               this.$store.commit('setDesYearE', 0);
     	this.$store.commit('scrollToTop');
      this.yearI = 2000; 
      this.yearE = 2020;
			this.$router.push({ name: 'descubrir-pag',  query: this.urlTest })
      },
       cerrarImdb(){
     delete this.urlTest.imdbI;
     delete this.urlTest.imdbE;
    this.$store.commit('setDesImdbI', 0);
    this.$store.commit('setDesImdbE', 0);
    this.$store.commit('scrollToTop');
    this.$router.push({ name: 'descubrir-pag',  query: this.urlTest })
      },
      cerrarGenSerie(){
      delete this.urlTest.genS;
       this.$store.commit('setDesGenSerie', "");
     	this.$store.commit('scrollToTop');
			this.$router.push({ name: 'descubrir-pag',  query: this.urlTest })
      },
      cerrarPais(){
delete this.urlTest.pais;
      this.$store.commit('setDesPais', "");
     	this.$store.commit('scrollToTop');
			this.$router.push({ name: 'descubrir-pag',  query: this.urlTest })
      },
		async getdescubrir(){
   //   console.log("this get descubrir")
    //  const valores = window.location.search;
      //     const urlParams = new URLSearchParams(valores);
      //     let params = new URLSearchParams(location.search);
            
           //parametros 
          var yearsI = this.$router.currentRoute.query.yearI
          var yearsE = this.$router.currentRoute.query.yearE; 
          var imdbI = this.$router.currentRoute.query.imdbI; 
          var imdbE = this.$router.currentRoute.query.imdbE; 
          var genS = this.$router.currentRoute.query.genS; 
          var pais = this.$router.currentRoute.query.pais; 
          var Order = this.$router.currentRoute.query.Order; 
         
      
            await fetch(this.urlProcesos +
          "wp-json/buscador/descubrir/post/?t="+this.tipo
          +"&yearI="+yearsI+"&yearE="+yearsE+"&imdbI="+imdbI+"&imdbE="+imdbE
          +"&genS="+genS+"&pais="+pais+"&Order="+Order
          +"&xPag="+this.registrosxPag+"&ini="+this.ini+"&fin="+this.fin)
                    .then((r) => r.json())
                    .then((res) => {
                //    console.log(res)
                   
                     this.generos = res[0].generos; 
                     this.paises = res[0].paises;
                     this.series = res[0].series;
                        this.$store.commit('setSkeleton', 1);
                this.skeletonmio = false
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

                     
                    }
                    );
           }, 

           crearRutas(){

          
    //      console.log("volvi a caer en")
        //   console.log(window.location.search)
//const valores = window.location.search;
       //    const urlParams = new URLSearchParams(valores);
//let params = new URLSearchParams(location.search);

           if(this.$router.currentRoute.query.s==undefined){
              this.tipo = 'pelicula'
           }else{
                  this.tipo = this.$router.currentRoute.query.s
           }
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
        


           
    //       const
 // keys = urlParams.keys(),
 // values = urlParams.values(),
 // entries = urlParams.entries();
//console.log(urlParams.has('yearI'))
if(this.$router.currentRoute.query.yearI==undefined && this.$router.currentRoute.query.yearE==undefined
&& this.$router.currentRoute.query.imdbI==undefined && this.$router.currentRoute.query.imdbE==undefined
&& this.$router.currentRoute.query.genS==undefined && this.$router.currentRoute.query.pais==undefined
 && this.$router.currentRoute.query.s==undefined
){
 // console.log("no hay nada por arriba ")

     	this.$store.commit('setStateAll', 0);
      this.yearI = 2000; 
      this.yearE = 2020;
      this.imdbI = 0; 
      this.imdbE = 10; 
      //  console.log("valor actual del año ", this.yearE)
      this.genSerie = ""
      
      this.pais = ""
     // console.log(this.$store.state.DesYearI)
}else{
     this.yearI = 2000; 
      this.yearE = 2020;
      this.imdbI = 0; 
      this.imdbE = 10; 
      
      this.genSerie = ""
      
      this.pais = ""
 // console.log("si hay algo por arriba ")
  var yearsI = parseInt(this.$router.currentRoute.query.yearI); 
  var yearsE = parseInt(this.$router.currentRoute.query.yearE); 
  var imdbI = parseInt(this.$router.currentRoute.query.imdbI); 
  var imdbE = parseInt(this.$router.currentRoute.query.imdbE); 
  var genS = this.$router.currentRoute.query.genS; 
    var pais = this.$router.currentRoute.query.pais; 
    var s = this.$router.currentRoute.query.s; 
  //existe algun parametro de los mios 
    for (const value of Object.keys(this.$router.currentRoute.query)) {
      console.log("estoy dentro del ciclo for")
        if(value == 'yearI' || value == 'yearE' || value == 'imdbI' || value == 'imdbE'
        || value == 'genS'   || value == 'pais' || value == 's'
        ){
          if(this.$router.currentRoute.query.yearI != undefined && this.$router.currentRoute.query.yearE != undefined){
            //años
             this.urlTest.yearI = yearsI
             this.urlTest.yearE = yearsE
             	this.$store.commit('setDesYearI', yearsI);
               this.$store.commit('setDesYearE', yearsE);
              this.yearI = yearsI
              this.yearE = yearsE
           //   console.log("estoy en year", yearsI)
          }
         
           if(this.$router.currentRoute.query.imdbI != undefined && this.$router.currentRoute.query.imdbE != undefined){
              //imdb
              this.urlTest.imdbI = imdbI
             this.urlTest.imdbE = imdbE
             this.$store.commit('setDesImdbI', imdbI);
             this.$store.commit('setDesImdbE', imdbE);
          
                 this.imdbI = imdbI;
                this.imdbE = imdbE; 
          }

          
           if(this.$router.currentRoute.query.genS != undefined ){
              //Genero Serie
              this.urlTest.genS = genS
         
              this.$store.commit('setDesGenSerie', genS);
                this.genSerie = genS
          }

           if(this.$router.currentRoute.query.pais != undefined ){
              //Genero Serie
              this.urlTest.pais = pais
               this.$store.commit('setDesPais', pais);
                this.pais = pais
          }
          if(this.$router.currentRoute.query.s != undefined ){
              //Genero Serie
              this.urlTest.s = s
            	this.$store.commit('setS', s);
                this.tipo = s
               // console.log("estoy en s ")
          }
          
         
          
          this.parametros = true; 
        }
    }
}


           }
		
    },
     components: {
         dropdown, descubrirSidebar, descubrirContent, SkeletonMio
         }, 
         created() {
              
              this.crearRutas()
         },
                watch:{
    $route (to, from){
        this.skeletonmio = true
       this.crearRutas()
     
if(this.$route.params.pag > 1){
  
    this.ini = (parseInt(this.$route.params.pag) - 1) * this.registrosxPag;
    
}else{

    this.ini = 0; 
}


this.getdescubrir();
    }
},
  mounted() {

 //  console.log("cai en mounted")
this.$store.commit('setSkeleton', 1);
if(this.$route.params.pag > 1){
  
    this.ini = (parseInt(this.$route.params.pag) - 1) * this.registrosxPag;
    
}else{

    this.ini = 0; 
}


this.getdescubrir();
    },
}
</script>
