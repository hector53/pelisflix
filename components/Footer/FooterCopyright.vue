<template>

				<div class="copyright" style="text-align: justify;"><strong> PelisFlix.com </strong>
es un sitio ideal para <strong><a href="https://pelisflix.com/">Ver Peliculas Gratis</a></strong>. Nuestro sistema para <strong>ver peliculas online gratis</strong>, se preocupa por tener lo último en películas de Netlix, HBO, Amazon, AMC, Youtube, etc, en calidad full HD. Para <strong>ver peliculas online gratis completas</strong>, puedes usar el buscador en la parte superior o seguir uno de los enlaces de genero o año de estreno en la parte derecha del sitio.
Tratamos de adaptarnos a todos los gustos, por eso en nuestra web tendrás peliculas gratis en español, latino y subtituladas.
Si buscabas un sitio de <strong>Peliculas Online</strong>, este es el mejor lugar. Este sitio web no almacena ningún archivo en su servidor. Todo el contenido es proporcionado por terceras partes las cuales no están afiliadas a esta web.</div>
					
					
			
</template>


<script>

import {mapState} from 'vuex'

export default {
  name: "FooterCopyright",
  
  data() {
    return {
      copyright: ""
    };
  },
    computed:{
        ...mapState(['urlProcesos'])
    },
   
  methods: {
async getCopyright(){

              await fetch(this.urlProcesos+'wp-json/footer/options/?q=3')
                    .then((r) => r.json())
                    .then((res) => {
             //           console.log(res);
					      this.copyright = res
                  
                    }
                    );

        }
    },
  mounted() {
    this.getCopyright()

  },
  updated() {
      
  },

 
};
</script>
<style >

</style>