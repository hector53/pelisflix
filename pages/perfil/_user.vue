<template>
<div>
    <VerPerfilUser v-if="verPerfilUser &&  id_user > 0" :login="login" 
      :id_user="id_user" :userName="userName" :id_user_login="id_user_login"/>
    <VerPerfilConfiguracion v-if="verConfiguracionUser" :id_user="id_user" :userName="userName" />

</div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
import Cookies from "js-cookie";
import VerPerfilUser from '@/components/Perfil/VerPerfilUser.vue'
import VerPerfilConfiguracion from '@/components/Perfil/VerPerfilConfiguracion.vue'
export default {
  name: 'VerPerfil',
  head(){
    return {
      
      title: "Perfil - "+this.$store.state.titleHome,
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
            verPerfilUser: false,
            verConfiguracionUser: false,
            userName: "", 
            id_user: "", 
            login: null,
            id_user_login: null,
            arrayUserData: [], 
           
        }
    },
      computed:{
        ...mapState(['urlProcesos'])
    },
    methods: {
      
        async getUserByName(name){
            await fetch(this.urlProcesos+'wp-json/perfil/usuario/post/?q=getUser&username='
                 +name)
                    .then((r) => r.json())
                    .then((res) => {
                     //   console.log(res);
                        this.id_user = res[0].ID
                        this.userName = res[0].user_login
                        this.verPerfilUser = true; 
                        
                    }
                    );
      }
       },
     components: {
      VerPerfilUser, VerPerfilConfiguracion, Cookies
      }, 
  mounted() {

  this.$store.commit('setSkeleton', 0);
var co = Cookies.get("user_session"); 
     
          var param = this.$router.history.current.params.user; 
  if(co != undefined)
        {
            co = JSON.parse(co)
        if(param == 'configuracion'){
          this.login = 1
       this.id_user = co.user_id; 
       this.userName = co.user_login
             this.verConfiguracionUser = true; 
         }else{
           this.login = 1
           this.id_user_login = co.user_id; 
          this.getUserByName(param)
             this.verPerfilUser = true; 
         }
     
        }else{
           this.login = 0
          this.getUserByName(param)
          
        }




    },
    created(){
      
    }
}
</script>
<style >

</style> 