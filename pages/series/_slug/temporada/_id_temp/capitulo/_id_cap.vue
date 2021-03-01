<template>
  <div>
    <div class="inner-content container" id="page-series_detail" v-for="(movie, index) in SeriesDetails" :key="index">
      <div class="bg-cover-faker">
     

        <div class="series-genres">
            <span class="series-status aqua">
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">En Emisión</font>
                </font>
            </span>
        </div>


         <div class="ui grid">
        <div class="left floated left aligned nine wide column pb-0">
            <div class="series-genres pb-0">
                <div xmlns:v="http://rdf.data-vocabulary.org/#" class="Breadcrumb">
                    <nuxt-link 
                    :to="{ name: 'series-slug', params: {slug: $route.params.slug} }">
                    <span typeof="v:Breadcrumb">
                    {{movie.titulo}}</span></nuxt-link>

                    &gt;   <nuxt-link 
                    :to="{ name: 'series-slug-temporada-id_temp', params: {slug: $route.params.slug, id_temp: $route.params.id_temp} }"><span typeof="v:Breadcrumb">
                    Temporada {{$route.params.id_temp }}</span></nuxt-link>
                    &gt; Capitulo {{$route.params.id_cap }} ({{movie.titulo_cap}})
                </div>
            </div>
        </div>
     
    </div>
    
       
       
       
       <div class="ui grid mt-0" style="margin-top: 1rem!important;">
		<div class="left floated sixteen wide tablet sixteen wide computer column">
			<h1 class="page-title">
                  <nuxt-link 
                    :to="{ name: 'series-slug', params: {slug: $route.params.slug} }">
                {{movie.titulo}}</nuxt-link>
                  <span class="light-title"> Temporada {{$route.params.id_temp }} - Capitulo {{$route.params.id_cap }}</span>
              </h1>
		</div>
			</div>

        <ReproductoresSeries :movieID="movie.id" :temporada_anterior="movie.temporada_anterior"
        :capitulo_anterior="movie.capitulo_anterior" :temporada_siguiente="movie.temporada_siguiente"
        :capitulo_siguiente="movie.capitulo_siguiente" :tituloSerie="movie.titulo"
          />



<SwiperSliderCaps />
        
      </div>
  
      <!-- // Common Lists -->


      <div class="common-lists">
        <div class="new-content">
          <h4 class="sidebar-heading">General</h4>
          <section class="episode-controls">
            <div class="show-info">
              <div>
                <img
                  :src="movie.imagen"
                />
                <div class="series-name">
                  <a
                    href=""
                    :title="movie.titulo"
                  >
                    <h2>{{movie.titulo}}</h2>
                  </a>
                
                </div>
              </div>
            </div>
          </section>
          <section class="episode-overview">
            <div class="info-section">
              <article>
                <p><b>{{movie.titulo}}  Temporada {{$route.params.id_temp}}  Capitulo {{$route.params.id_cap}}</b></p>
                {{movie.overview}}
              </article>
           
            </div>
             <Likes :post_id="movie.idcap" :id_user="id_user" :userName="userName" v-if="movie.idcap" />
          </section>
        </div>
        <ComentariosFlix :serieCap="1"  :post_id="movie.idcap" :id_user="id_user" :userName="userName" v-if="movie.idcap" />
        <!-- // .user-reviews -->
      </div>
      <!-- // .common-lists -->

      <div data-gets="" data-type="ftr"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cookies from "js-cookie";
import axios from 'axios'
import { mapState } from "vuex";
import ReproductoresSeries from '@/components/SeriesDetails/ReproductoresSeries.vue'; 
import SwiperSliderCaps from '@/components/SeriesDetails/SwiperSliderCaps.vue'; 
import Likes from '@/components/Likes/Likes.vue'; 
import ComentariosFlix from '@/components/Comentarios/ComentariosFlix.vue'

export default {
  name: "SeriesDetailsCap",
    components: {ReproductoresSeries, SwiperSliderCaps, Cookies, ComentariosFlix, Likes},
      async asyncData({ params, store, context}) {
       
  

     const seoDetails = await axios.get(
      `${store.state.urlProcesos}wp-json/wp/v2/serie/?slug=${params.slug}`
    );
console.log(seoDetails.data[0])
    const metaArray = [];
      seoDetails.data[0].yoast_meta.map(ele => {
        metaArray.push({
         hid: ele.name ? ele.name : ele.property,
          name: ele.name ? ele.name : ele.property,
          content: ele.content,
        });
      });
metaArray[6].content = metaArray[6].content.replace("api.pelisflix.com", store.state.siteUrlSeo)+"temporada/"+params.id_temp+"/capitulo/"+params.id_cap;
metaArray[6].content = metaArray[6].content.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

var tituloSeo = "Ver "+seoDetails.data[0].title.rendered+" "+params.id_temp+"x"+params.id_cap+" Online Gratis Full HD"
tituloSeo = tituloSeo.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
metaArray[4].content = "Ver "+seoDetails.data[0].title.rendered+" "+params.id_temp+"x"+params.id_cap+" Online Gratis Full HD"

metaArray[0].content = "Ver "+seoDetails.data[0].title.rendered+" "+params.id_temp+"x"+params.id_cap+
" Completa Online ✅ Serie "+seoDetails.data[0].title.rendered+" "+params.id_temp+"x"+params.id_cap+
" en Latino, Castellano y Subtitulado Gratis en HD."
metaArray[5].content = "Ver "+seoDetails.data[0].title.rendered+" "+params.id_temp+"x"+params.id_cap+
" Completa Online ✅ Serie "+seoDetails.data[0].title.rendered+" "+params.id_temp+"x"+params.id_cap+
" en Latino, Castellano y Subtitulado Gratis en HD."
   
   return {  SeoPost: metaArray, tituloSeo: tituloSeo };
  },
    head(){
    return {
        title: this.tituloSeo,
            meta: this.SeoPost, 
            link: [
      { rel: 'canonical', href: this.$store.state.siteUrl }, 
     
    ], 
     
    }
  },
  data() {
    return {
      SeriesDetails: [],
      tabTemp: 1,
        id_user: null, 
          userName: null,
      
    };
  },
  computed: {
    ...mapState(["urlProcesos"]),
  },
  methods: {
   
      async SeriesGetDetailsCapitulos() {
        await fetch(
          this.urlProcesos +
            "wp-json/series/detalle_slug_capitulo/post/?slug=" +
            this.$route.params.slug + "&temporada=" + this.$route.params.id_temp + 
            "&capitulo=" + this.$route.params.id_cap 
        )
          .then((r) => r.json())
          .then((res) => {
              console.log(res)
            this.SeriesDetails = res;
             this.$store.commit('setSkeleton', 1);
          });
      },

    newTrailerMovie(trailer) {
      //mostrar trailer de youtube
      var youtube = trailer.split("=");
      //  console.log(youtube[1]);
      this.$swal({
        html:
          '<iframe width="100%" height="300" src="https://www.youtube.com/embed/' +
          youtube[1] +
          '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        showConfirmButton: false,
        showCloseButton: true,
      });
      return;
    },
    changeTabTemp(index) {

      this.tabTemp = index;
    },
  },

   
  mounted() {
     var co = Cookies.get("user_session"); 
        if(co != undefined)
        {
        co = JSON.parse(co)
    this.id_user = co.user_id; 
    this.userName = co.user_login
        }
      this.SeriesGetDetailsCapitulos();
     
     
  },

  created() {
  this.$store.commit('setSkeleton', 0);
  },
  
};
</script>

<style >
.new-content .episode-controls .show-info>div .series-name h2:after {
    display:none
   
}
</style>

