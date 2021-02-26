<template>
<div class="inner-content container" id="page-notifications">
			

<h1 class="page-title"><font style="vertical-align: inherit;">
    <font style="vertical-align: inherit;">Notificaciones</font></font></h1>
<div class="notifications">
<div class="topButtons">
	<a class="ui button blue readAll" data-tooltip="Marcar Todas como leídas" @click="marcarLeidas()">
        <i class="eye icon"></i><font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;" class=""> Marcar todas como leídas</font></font></a> 
	<a class="ui button blue deleteAll" data-tooltip="Eliminar Todas" @click="eliminarTodas()"><i class="trash icon"></i>
    <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Eliminar todas</font></font></a> 
</div>
<div class="item" v-for="(item, index) in arrayDatos" :key="index"  >
	<div class="delete"   data-tooltip="Eliminar" @click="deleteNotify(item.id)">
		<i class="trash icon"></i>
	</div>
	<a :href="'/'+item.link" @click.prevent="pasarLeido(item.id, item.link)" >
		<img :src="item.imagen" :alt="item.mensaje">
		<div class="notification-text">
			<p v-show="item.leido == 1"><font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">{{item.mensaje}}</font></font></p>

            <h4 v-show="item.leido == 0"><font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">{{item.mensaje}}</font></font></h4>


			<p><font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">{{item.fecha}}</font></font></p>
		</div>
	</a>
</div>


<button class="ui button notifications-load-more load-more " data-page="1" type="button"><svg class="mofycon"><use xlink:href="#icon-plus"></use></svg><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Mostrar más</font></font></button>
</div>
			
			</div>
</template>



<script>
import Cookies from "js-cookie";
import {mapState} from 'vuex'

export default {
  name: "notificaciones",
  head(){
    return {
      
      title: "Notificaciones - "+this.$store.state.titleHome,
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
	  arrayDatos: [], 
        id_user: null, 
          userName: null,

    };
  },
    computed:{
        ...mapState(['urlProcesos'])
    },
   
  methods: {
   async   eliminarTodas(){


 await fetch(
          this.urlProcesos +
            "wp-json/notificaciones/get/?q=deleteAll&id_user="+this.id_user )
          .then((r) => r.json())
          .then((res) => {
                    this.getNotificaciones()
          });
      },
   async   marcarLeidas(){

 await fetch(
          this.urlProcesos +
            "wp-json/notificaciones/get/?q=marcar&id_user="+this.id_user )
          .then((r) => r.json())
          .then((res) => {
                    this.getNotificaciones()
          });
      },
   async   deleteNotify(id){
 await fetch(
          this.urlProcesos +
            "wp-json/notificaciones/get/?q=deleteId&id_user="+this.id_user+"&id_notify="+id  )
          .then((r) => r.json())
          .then((res) => {
                    this.getNotificaciones()
          });
      },
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
            "wp-json/notificaciones/get/?q=getAll&id_user="+this.id_user  )
          .then((r) => r.json())
          .then((res) => {
           
                 console.log(res)
                this.arrayDatos = res
                  this.$store.commit('setSkeleton', 1);
              
               
          });
      }
    },
  mounted() {
        var co = Cookies.get("user_session"); 
        if(co != undefined)
        {
        co = JSON.parse(co)
    this.id_user = co.user_id; 
    this.userName = co.user_login
        }
     this.getNotificaciones()
  },
  updated() {
      
  },

 
};
</script>
<style>
.notifications {
	position: relative;
}
.notifications .item a img {
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    margin-right: 10px;
}
.notifications .item a {
    display: flex;
    color: #fff;
}
.notifications .item .delete {
    width: 20px;
    min-width: 20px;
    max-width: 20px;
    height: 30px;
    font-size: 18px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    margin-right: 10px;
    padding-top: 7px;
	color: #2a2c38;
	float: left;
}
.notifications .item .delete:hover {
	color: #fff;
}
.notifications .item a .notification-text h4 {
	margin: 0;
}
.notifications .item a .notification-text p {
	color: #8c8c8c;
}
.notifications .item {
    padding: 10px;
    border-bottom: 1px solid #1e2029;
    -webkit-transition: background 0.2s ease-in-out;
    -moz-transition: background 0.2s ease-in-out;
    -ms-transition: background 0.2s ease-in-out;
    -o-transition: background 0.2s ease-in-out;
    transition: background 0.2s ease-in-out;
   
}
.topButtons {
	position: relative;
	top: 8px;
	clear: both;
	display: block;
	width: 100%;
	margin-bottom: 20px;
}
.topButtons .ui.button {
	text-transform: capitalize!important;
}
.topButtons .ui i {
	font-size: 16px;
	margin: 0 auto!important;
}
.activeN {
    background: #00000070!important;
}

</style>