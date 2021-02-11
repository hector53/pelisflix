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