<template>
<div class="left floated sixteen wide tablet four wide computer column" id="filter-sidebar">

			<div class="section-heading">Seleccione Tipo</div>

			<div class="global-box pl-0 pt-0">

				<div class="ui middle aligned divided list">
					
					<div class="item just-title" :class="{ 'active' : tipo == 'serie' }">
						<a @click.prevent="buscarPelicula('serie')" rel="nofollow" >
							<h2 class="truncate pt-0">Serie</h2>
						</a>
					</div>
					<div class="item just-title" :class="{ 'active' : tipo == 'pelicula' }">
					 <a @click.prevent="buscarPelicula('pelicula')"  rel="nofollow"  >
                   	
							<h2 class="truncate pt-0">Película</h2>
						</a>
					</div>
				</div>
			</div>

			<div class="section-heading">Por Años</div>

			<div class="global-box pl-0 pt-0">
                
				<div class="filter-range">
					<p id="range-years">Entre <span>{{yearIni}}</span> y <span>{{yearFin}}</span></p>
              <client-only>    <vue-range-slider ref="sliderYear" v-model="rangeYear" 
                 :min="2000"
                 :max="2020" 
				 v-on:drag-end="buscarYear()"
                ></vue-range-slider>   </client-only>
				
				</div>
			</div>

			<div class="section-heading">Puntuación IMDB</div>

			<div class="global-box pl-0 pt-0">
				<div class="filter-range">
					<p id="range-imdb"><span>{{imdbIni}}</span> a <span>{{imdbFin}}</span> puntos</p>
                <client-only>   <vue-range-slider ref="sliderImdb" v-model="rangeImdb"   :min="0"   :max="10"
				 v-on:drag-end="buscarImdb()"
				     ></vue-range-slider>  </client-only>
				</div>
			</div>

			<div class="section-heading">Por Genero</div>

			<div class="global-box pl-0 pt-0">
				<div class="ui middle aligned divided list">
					<div class="item just-title" :class="{'active' : genS == item.slug}"
					v-for="(item, index) in arrayGeneros" :key="index">
					<a  @click.prevent="buscarGenSerie(item.slug)">
					<h2 class="truncate pt-0">{{item.name}}</h2>
					</a>
					</div>
                    	
								
				</div>
			</div>	
			<div class="section-heading">Por País</div>

			<div class="global-box pl-0 pt-0">
				<div class="ui middle aligned divided list">
					<div class="item just-title"  :class="{'active' : pais == item.value}" v-for="(item, index) in arrayPaises" :key="index">
						<a  @click.prevent="buscarPais(item.value)" >
							<h2 class="truncate pt-0">{{item.name}}</h2>
						</a>
					</div>
				    		
														</div>
			</div>
</div>
</template>


<script>
import 'vue-range-component/dist/vue-range-slider.css'

export default {
  name: 'descubrir-pagSidebar',
   props: {
        arrayGeneros:{
            type: Array, 
            required: true,
		},
		  arrayPaises:{
            type: Array, 
            required: true,
		},
		  yearI:{
            type: Number, 
            required: true,
		},
		 yearE:{
            type: Number, 
            required: true,
		},
		  imdbI:{
            type: Number, 
            required: true,
		},
		 imdbE:{
            type: Number, 
            required: true,
		},
		 genS:{
            type: String, 
            required: true,
		},
		 pais:{
            type: String, 
            required: true,
		},
		 tipo:{
            type: String, 
            required: true,
		},
		urlTest:{
			type: Object,
			required: true
		}
		 
    },
   data (){
        return {
            rangeYear: [this.yearI, this.yearE],
            rangeImdb: [this.imdbI, this.imdbE],
            yearIni: this.yearI,
            yearFin: this.yearE, 
            imdbIni: this.imdbI, 
            imdbFin: this.imdbE, 
			genSerie: this.genS, 
			tipoS : this.tipo, 
			urlTest2: this.urlTest
			


        }
    },
    watch: {
		$route (to, from){
		//	year
				this.yearFin =  this.yearE
				this.yearIni =  this.yearI
				this.rangeYear = [this.yearI, this.yearE]
				//imdb 
				 this.imdbIni = this.imdbI, 
         		   this.imdbFin = this.imdbE
					this.rangeImdb = [this.imdbI, this.imdbE]
		},
        rangeYear(range) {
            this.yearIni = range[0]; 
			this.yearFin = range[1]
			
        },
        rangeImdb(range) {
            this.imdbIni = range[0]; 
            this.imdbFin = range[1]
        }
    },
    components: {
  },
    methods: {
        buscarPelicula(tipo){
			this.tipoS = tipo;
			//	let params = new URLSearchParams(location.search);
		if(this.tipoS == this.$router.currentRoute.query.s){
			//son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
		}else{
				//son diferentes aqui si hago
				this.urlTest2 = {}
			    this.urlTest2.s = tipo; 
				this.$store.commit('scrollToTop');
				this.$router.push({  name: 'descubrir-pag', query: this.urlTest2 })
				this.$store.commit('setStateAll', 0);
      
			}
		},
		buscarYear(){
//debo hacer q no puedan dar clic en los mismos parametros del range slider xq da error el vue router			
	//	let params = new URLSearchParams(location.search);
		if(this.yearIni == this.$router.currentRoute.query.yearI && this.yearFin == this.$router.currentRoute.query.yearE){
			//son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
		}else{
				//son diferentes aqui si hago
			this.urlTest.yearI = this.yearIni; 
				this.urlTest.yearE = this.yearFin;
				this.$store.commit('scrollToTop');
				this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
			}
		}, 

		buscarImdb(){
			let params = new URLSearchParams(location.search);
		if(this.imdbIni == this.$router.currentRoute.query.imdbI && 
		this.imdbFin == this.$router.currentRoute.query.imdbE ){
			//son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
		}else{
				//son diferentes aqui si hago
				this.urlTest.imdbI = this.imdbIni; 
				this.urlTest.imdbE = this.imdbFin;
				this.$store.commit('scrollToTop');
				this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
			}
		}, 
		buscarGenSerie(genero){
				//let params = new URLSearchParams(location.search);
		if(genero == this.$router.currentRoute.query.genS  ){
			//son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
		}else{
				//son diferentes aqui si hago
				this.urlTest.genS = genero; 
				this.$store.commit('scrollToTop');
				this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
			}
		},
		buscarPais(pais){
//	let params = new URLSearchParams(location.search);
		if(pais == this.$router.currentRoute.query.pais  ){
			//son los mismos parametros los q dan clic y los que vienen de arriba por lo tanto no hago nada
		}else{
				//son diferentes aqui si hago
				this.urlTest.pais = pais; 
				this.$store.commit('scrollToTop');
				this.$router.push({  name: 'descubrir-pag', query: this.urlTest })
			}
		}
        
    },
    mounted() {
		
		/*if(Object.keys(this.urlTest).length === 0 && this.urlTest.constructor === Object){
			//console.log("esta vacio");
			}else{
			//	console.log("no esta vacio");
			}*/
	},
	
}
</script>
<style>
.vue-range-slider.slider-component .slider-tooltip-wrap .slider-tooltip {
    
    display: none!important;
}
</style>