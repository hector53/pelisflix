<template>
<div>
    <div class="ui top right pointing dropdown" tabindex="0" @click="perfilMenuUser()" v-click-outside="outPerfil" :class="{'active visible' : perfilMenu == 1}">
		
		<svg class="valign-middle" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M18 16l1.28 1.29c.63.63.18 1.71-.71 1.71h-13.17c-.89 0-1.33-1.08-.7-1.71l1.3-1.29v-5c0-3.08 1.63-5.64 4.5-6.32v-.68c0-.83.66-1.5 1.49-1.5s1.51.67 1.51 1.5v.68c2.86.68 4.5 3.25 4.5 6.32v5zm-6.01 6c-1.11 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm-5.22-17.27c-1.39 1.27-2.35 3-2.65 4.94-.08.48-.5.83-.98.83-.62 0-1.09-.55-1-1.16.38-2.38 1.56-4.5 3.27-6.06.39-.37 1.01-.36 1.39.02.4.4.39 1.05-.03 1.43zm11.83-1.45c1.7 1.57 2.87 3.68 3.25 6.05.1.61-.38 1.16-.99 1.16-.49 0-.91-.35-.98-.83-.3-1.94-1.27-3.67-2.65-4.94-.41-.38-.43-1.02-.03-1.42.38-.38 1-.39 1.4-.02z" fill="#42e3d0"></path></svg>
		
		<span class="text-notifications">Notificaciones</span>

				<span class="notifications-badge">{{arrayNotificaciones.length}}</span> 
		
		<div class="menu left transition hidden" tabindex="-1" :class="{'visible op fade-in ' : perfilMenu == 1}">

			 
            <div class="scroll-wrapper scrollbar-macosx" 
            style="position: relative;" v-if="mostrarNotify">
            <div id="scroll-notifications"
             class="scrollbar-macosx scroll-content" style="height: 200px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
				
				<div class="item active" v-for="(item, index) in arrayNotificaciones" :key="index" >
					<a :href="'/'+item.link" @click.prevent="pasarLeido(item.id, item.link)">
						<img :src="item.imagen" :alt="item.mensaje">
						<div class="notification-text">
							<h4>{{item.mensaje}}</h4>
							<p>{{item.fecha}}</p>
						</div>
					</a>
				</div>

				

				
			</div><div class="scroll-element scroll-x"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar"></div></div></div><div class="scroll-element scroll-y"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar"></div></div></div>
            
            </div>


            
            <div class="scroll-wrapper scrollbar-macosx" v-else style="position: relative;"><div id="scroll-notifications" class="scrollbar-macosx scroll-content scroll-scrollx_visible" style="height: 38.8889px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
								<div class="item active selected">
					<div class="notification-text">
						<h5><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" class="">Sin notificaciones nuevas</font></font></h5>
					</div>
				</div>
				
			</div><div class="scroll-element scroll-x scroll-scrollx_visible"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar" style="left: 0px;"></div></div></div><div class="scroll-element scroll-y scroll-scrollx_visible"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar"></div></div></div></div>
			<nuxt-link to="/notificaciones" class="item">Ver Todas</nuxt-link>

		</div>

	</div>
</div>
</template>


<script>
import ClickOutside from 'vue-click-outside'
import { mapState } from "vuex";
export default {
  name: 'DropdownPerfilNotify',
  props: ["id_user"],
   data (){
        return {
           perfilMenu: 0,
           arrayNotificaciones: [], 
           mostrarNotify: false
        }
    },
    computed: {
    ...mapState(["urlProcesos"]),
  },
    components: {
    
  },
    methods: {
      async pasarLeido(id, link){
        console.log("di clic")
 await fetch(
          this.urlProcesos +
            "wp-json/notificaciones/get/?q=lei&id_user="+this.id_user+"&id_notify="+id  )
          .then((r) => r.json())
          .then((res) => {
   //        this.$router.replace({path: link})
                          window.location.href = this.$store.state.urlBase + link
          });
      },

    async getNotificaciones(){
  
         await fetch(
          this.urlProcesos +
            "wp-json/notificaciones/get/?q=get&id_user="+this.id_user  )
          .then((r) => r.json())
          .then((res) => {
             if(res.length > 0){
                this.arrayNotificaciones = res
                this.mostrarNotify = true
              }
               
          });
      },
        perfilMenuUser(){
            if(this.perfilMenu == 0){
                    this.perfilMenu = 1
            }else{
                this.perfilMenu = 0
            }
      
    },
     outPerfil(){
       
          this.perfilMenu = 0
      },
        },
        directives: {
    ClickOutside
  }, 
    mounted() {
      

  this.getNotificaciones()
		
	},
	
}
</script>
<style>
.op{
  display: block !important;
}
.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}
@keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
}
}
</style>