<template>
   <div>
    <div class="inner-content container" id="page-index" v-for="(movie, index) in SeriesDetails" :key="index">

       


        <div class="series-genres">
            <span class="series-status aqua">
                <font >
                    <font >En Emisión</font>
                </font>
            </span>
        </div>

        <div class="ui grid">

            <div class="left floated sixteen wide tablet nine wide computer column">
                <nuxt-link
                    :to="{ name: 'series-slug', params: {slug: $route.params.slug} }">

                    <h1 class="page-title">
                        <font >
                            <font class="" >{{movie.titulo}}</font>
                        </font>
                        <span class="light-title">
                            <font >
                                <font class="" >({{movie.year}}) </font>
                            </font>
                        </span>

                    </h1>
                </nuxt-link>
            </div>

           <BreadCrumbsSeries :movieID="movie.id" />

        </div>

        <div id="series-tabs" class="ui pointing secondary menu">
            <a class="item active" data-tab="first">
                <font >
                    <font >Visión de conjunto</font>
                </font>
            </a>
             <nuxt-link class="item" 
				:to="{name:'foro-foro_slug', params: {foro_slug: $route.params.slug} }">
           
                <font >
                    <font >Foros de discusión</font>
                </font>
            </nuxt-link>
            <a class="item disabled">
                <font >
                    <font >Compartir</font>
                </font>
            </a>
        </div>

        <div class="ui tab tab-segment active" data-tab="first">

            <div class="ui items">

                <div class="item" id="series-profile-wrapper">
                    <a class="ui image" id="series-profile-image-wrapper">
                        <img class="series-profile-thumb" :src="movie.imagen2"
                            :alt="movie.titulo">
                    </a>
                    <div class="content" id="series-profile-content-wrapper">
                        <article class="series-summary">
                            <div class="series-summary-wrapper">
                                <h2 class="section-heading">
                                    <font >
                                        <font >Sinopsis</font>
                                    </font>
                                </h2>
                                <p id="tv-series-desc">
                                    <font  v-html="movie.sinopsis">
                                     
                                    </font>
                                </p>
                          
                            </div>

                            <div class="ui list">
                                <div class="item"><span class="label">Generos:</span> 

                        <nuxt-link class="item" @click="$store.commit('scrollToTop')"
                         :to="{ name: 'series-genero-slug', params: {slug: genero.slug} }"
						  v-for="(genero, index) in movie.generos" :key="index"
						 >{{genero.genero}}</nuxt-link>
                         </div>
                            </div>

                            

                            <div class="media-meta">
                                <table class="ui unstackable single line celled table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>
                                                    <font >
                                                        <font >País</font>
                                                    </font>
                                                </div>
                                                <div>
                                                    <font >
                                                        <font >{{movie.pais}}</font>
                                                    </font>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <font >
                                                        <font >Duración</font>
                                                    </font>
                                                </div>
                                                <div>
                                                    <font >
                                                        <font >{{movie.time}} min</font>
                                                    </font>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <font >
                                                        <font >Seguidores</font>
                                                    </font>
                                                </div>
                                                <div>0</div>
                                            </td>
                                            <td>
                                                <div>
                                                    <font >
                                                        <font >IMDB</font>
                                                    </font>
                                                </div>
                                                <div class="color-imdb">{{movie.imdb}}</div>
                                            </td>
                                            <td>
                                                <div>
                                                    <font >
                                                        <font >Año
                                                        </font>
                                                    </font>
                                                </div>
                                                <div class="truncate">{{movie.year}}</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="first_and_last">
                                <a id="first_episode" title="Ver Star Trek: Discovery Temporada 1 Episodio 1"
                                    :href="movie.slugcap1" >
                                    <font >
                                        <font >
                                            Ver el primer capítulo de la serie
                                        </font>
                                    </font><small>
                                        <font >
                                            <font >Temporada 1 Capítulo 1</font>
                                        </font>
                                    </small>
                                    <div class="icon-to-episode">
                                        <svg class="mofycon">
                                            <use xlink:href="#icon-play"></use>
                                        </svg>
                                    </div>
                                </a>
                                <a id="last_episode" title="Mira Star Trek: Discovery temporada 3 episodio 2"
                                    :href="movie.slugcapfinal" data-navigo="">
                                    <font >
                                        <font >
                                            Mira el último episodio de la serie
                                        </font>
                                    </font><small>
                                        <font >
                                            <font >Temporada 3 Episodio 2</font>
                                        </font>
                                    </small>
                                    <div class="icon-to-episode">
                                        <svg class="mofycon">
                                            <use xlink:href="#icon-play"></use>
                                        </svg>
                                    </div>
                                </a>
                            </div>

                            <div class="media-trailer" @click.prevent="newTrailerMovie(movie.trailer)" >
                                <div class="ui items">
                                    <div class="item">
                                        <div class="image">
                                            <svg class="mofycon">
                                                <use xlink:href="#icon-play"></use>
                                            </svg>
                                            <img :src="movie.imagen1">
                                        </div>
                                        <div class="content">
                                            <div class="header">
                                                <font >
                                                    <font >Trailer</font>
                                                </font>
                                            </div>
                                            <div class="meta">
                                                <font >
                                                    <font >ADELANTO OFICIAL</font>
                                                </font>
                                            </div>
                                            <div class="extra">
                                                <font >
                                                    <font >Mira el tráiler de {{movie.titulo}}</font>
                                                </font>
                                            </div>
                                            <div class="media-count">
                                                <font >
                                                    <font >{{movie.year}}</font>
                                                </font>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            <!-- // Common Lists -->
            <div class="common-lists pt-sm">
                <div class="ui column grid">
                    <ActoresSeries :arrayActoresMovie="movie.actores" />
                    <!-- // .five .wide .column -->

                    <div class="sixteen wide tablet eleven wide computer column">

                    

                        <h4 class="sidebar-heading" id="season-episode-list-title">
                            <font >
                                <font >{{movie.titulo}} - </font>
                            </font><span>
                               
                            </span>
                            <font >
                            <font >Temporada 1</font>
                             
                            </font>
                        </h4>
                        <section class="episodes-box">

                            <div class="ui grid">

                                <div class="sixteen wide tablet three wide computer column" id="seasons-menu">
                                    <div class="ui vertical fluid tabular menu">
                                    
                                        <a :href="movie.slug + '/temporada/'+index" v-for="index in parseInt(movie.temporadas)" :key="index"
                                        class="item" :class="{'active': index == tabTemp}" style="padding: 15px;" @click.prevent="changeTabTemp(index)" >
                                            <font >
                                                <font style="vertical-align: inherit;     font-size: 10px!important;">Temporada {{index}}</font>
                                            </font>
                                        </a>
                                       
                                    </div>
                                </div>

                                <div
                                    class="sixteen wide tablet thirteen wide stretched computer column season-list-column">

                                    <div class="ui" >
                                        <div class="tabular-content" style="padding-left: 20px;">

                                            <div class="episodes-list" v-for="(tempo, index) in movie.temporadas_capitulos" :key="index" v-show="tabTemp == index+1">
                                                <div class="ui list">
                                                    <div class="item season_regular"
                                                     v-for="(capi, index) in tempo.capitulos" :key="index" :class="{'noCap' : verCaps < index & cortarCaps}" >
                                                        <table class="ui basic unstackable table">
                                                            <tbody>
                                                                <tr >
                                                                    <td class="collapsing table-episode-check">
                                                                       
                                                                        <div class="ordilabel">
                                                                        <nuxt-link 
                                                                         :to="{ name: 'series-slug-temporada-id_temp-capitulo-id_cap', 
                                                                         params: {slug: movie.slugsolo, id_temp: tabTemp, id_cap: index+1 } }">
                                                                                <font >
                                                                                    <font
                                                                                        >
                                                                                        Capítulo {{index+1}} </font>
                                                                                </font>
                                                                            </nuxt-link>
                                                                        </div>
                                                                    </td>
                                                                    <td id="table-episodes-title"
                                                                        class="table-episodes-title">
                                                                        <h6 class="truncate">
                                                                        <nuxt-link 
                                                                        :to="{ name: 'series-slug-temporada-id_temp-capitulo-id_cap', 
                                                                        params: {slug: movie.slugsolo, id_temp: tabTemp, id_cap: index+1 } }">
                                                                             
                                                                                <font >
                                                                                    <font
                                                                                        >
                                                                                        {{capi.titulo}}
                                                                                        </font>
                                                                                </font>
                                                                            </nuxt-link></h6>
                                                                    </td>
                                                                   
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div> <!-- // .item -->
                                            <button type="button" class="ui button load-more series-load-more"
                                            :class="{'disabled' : cortarCaps==false}"  @click="verMasCaps(index)">
                                            <svg
                                            class="mofycon">
                                            <use xlink:href="#icon-plus"></use>
                                            </svg>{{botonMostrarTexto}}</button>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    
                                 

                                </div> <!-- // .column -->

                            </div> <!-- // .ui grid -->
                        </section> <!-- // .episodes-box -->
                       
                       <ComentariosFlix :serieCap="0"  :post_id="post_id" :id_user="id_user" :userName="userName" />

                    </div> <!-- // .eleven .wide .column -->

                </div> <!-- // .column -->

            </div> <!-- // .common-lists -->

        </div> <!-- // .tab -->

        <div class="ui tab tab-segment" data-tab="second">
            <font >
                <font >
                    Segunda pestaña
                </font>
            </font>
        </div> <!-- // .tab -->



    </div>
</div>
</template>

<script>
import Cookies from "js-cookie";
import axios from 'axios'
// @ is an alias to /src
import {mapState} from 'vuex'
import BreadCrumbsSeries from '@/components/SeriesDetails/BreadCrumbsSeries.vue'
import ComentariosFlix from '@/components/Comentarios/ComentariosFlix.vue'
import ActoresSeries from '@/components/SeriesDetails/ActoresSeries.vue'
export default {
  name: 'SeriesDetails',
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
metaArray[4].content = metaArray[4].content.replace("api.pelisflix.com", store.state.siteUrlSeo)
var tituloSeo = metaArray[3].content
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
   data (){
        return {
          
      SeriesDetails: [], 
            tabTemp: 1, 
              id_user: null, 
          userName: null,
          post_id: null,
          verCaps: 10, 
      cortarCaps: true, 
      botonMostrarTexto: "Mostrar Más"
      
        }
    },
      computed:{
        ...mapState(['urlProcesos'])
    },
    methods: {
        verMasCaps(index){
            var totalCaps = this.SeriesDetails[0].temporadas_capitulos[index].capitulos.length; 
            if(this.verCaps >= totalCaps){
                    this.verCaps = 10
                    this.botonMostrarTexto = "Mostrar Más"
                    return
            }
         
                    this.verCaps = this.verCaps + 10
                    if(this.verCaps >= totalCaps){
                        this.botonMostrarTexto = "Mostrar Menos"
                    }
        },
        async SeriesGetDetails(){
            await fetch(this.urlProcesos+'wp-json/series/detalle_slug/post/?slug='+this.$route.params.slug)
                    .then((r) => r.json())
                    .then((res) => {
                  //    console.log(res)
//console.log("id: ",res[0].id)
                  //  this.SeriesDetails = res

                  this.SeriesDetails = res
                   this.post_id = res[0].id
                    }
                    );
           }, 
         
          newTrailerMovie(trailer){
              //mostrar trailer de youtube 
              var youtube = trailer.split("=")
            //  console.log(youtube[1]);
                this.$swal({
                html:
                  '<iframe width="100%" height="480" frameborder="0"  webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="https://www.youtube.com/embed/'+youtube[1]+'?autoplay=1&amp;rel=0"></iframe>',
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    
                    popup: 'trailerSeries',
                  
                }
                
              })
              return  
            },  
          changeTabTemp(index){
            this.tabTemp = index;
            this.verCaps = 10
          }
    },
     components: {
BreadCrumbsSeries, ComentariosFlix, Cookies, ActoresSeries
         }, 
  mounted() {
        this.$store.commit('setSkeleton', 0);
       var co = Cookies.get("user_session"); 
        if(co != undefined)
        {
        co = JSON.parse(co)
    this.id_user = co.user_id; 
    this.userName = co.user_login
        }
        
    },
    created() {
//   console.log(this.$route)
this.SeriesGetDetails()
     
    },

}
</script>
<style >
.noCap{
    display: none!important;
}
.ui.load-more.series-load-more {
    margin-bottom: 10px!important;
}
</style>