<template>
  <div class="sixteen wide tablet eleven wide computer column">
    <h4 class="sidebar-heading">
      <font style="vertical-align: inherit"
        ><font style="vertical-align: inherit">Comentarios ( </font></font
      ><span id="review-count"
        ><font style="vertical-align: inherit"
          ><font style="vertical-align: inherit">{{cantComments}}</font></font
        ></span
      ><font style="vertical-align: inherit"
        ><font style="vertical-align: inherit"> )</font></font
      >
    </h4>

    <section class="user-reviews">
      <div class="ui list" id="review-form">
        <div class="item">
          <form class="review-form">
            <div class="ui form">
              <div class="field">
                <div class="emojionearea">
                  <vue-emoji
                    :width="'100%'"
                    ref="emoji"
                    @input="onInput"
                    :class="'test'"
                  ></vue-emoji>
                </div>
              </div>
            </div>
            <div class="ui grid">
              <div
                class="right floated right aligned sixteen wide tablet four wide computer column"
              >
                <button
                  class="ui primary button fnc_addComment"
                  @click="addComment()"
                  :class="{ loadingComment: loadingComment }"
                  style="float: inherit"
                  type="button"
                >
                  <font style="vertical-align: inherit">
                    <font style="vertical-align: inherit"
                      >Agregar comentario</font
                    >
                  </font>
                </button>
              </div>
            </div>
          </form>
          <!-- // .review-form -->
        </div>
        <!-- // .item -->
      </div>
      <div class="ui list" id="review-list">
        <div
          class="item comment-item"
          v-for="(item, index) in arrayComentarios"
          :key="index"
        >
          <img class="ui avatar image" :src="item.imagen_perfil" alt="" />
          <div class="content">
            <h6>
               <nuxt-link  class="review-author" 
                :to="{ name: 'perfil-user', params: {user: item.username} }" >
             @{{ item.username }}</nuxt-link
              >
            </h6>
            <div class="review-time">{{item.fecha}}</div>
            <div class="review-content">
              <p>{{ item.contenido }}</p>
            </div>

            <div class="review-extras">
              <div class="flex-row buttons">
                          <LikeComments :id_user="id_user" :id="item.id" :micomentario="item.micomentario"
                          :like="item.cantidadLikes" :yadi="item.yadi"
                          :dislike="item.cantidadDislikes" :yadid="item.yadid"
                           @getCommentsLike="getCommentsbyLike()" :serieCap="serieCap"  :post_id="post_id"
                            />
                <a
                  href="#"
                  class="reply-link"
                  
                  @click.prevent="activarReply(item.id)"
                  >Responder (<span>{{item.subs}}</span>)</a
                >
              </div>
              <div class="flex-row" >
                <form
                  class="review-reply"
                  style="display: none"
                  :id="'reply_'+item.id"
                >
                  <input
                    type="text"
                    placeholder="Respuesta Aquí"
                    class="replyCommentData"
                    style="width: 100%"
                    :id="'replyText_'+item.id"
                  />
                  <button
                    class="ui secondary button fnc_commentReply"
                    type="submit"
                    @click.prevent="responderComment(item.id)"
                    :id="'buttonReply_'+item.id"
                  >
                    Responder
                  </button>
                </form>
              </div>
              <div class="ui list sub-reviews" v-show="item.subs > 0">
                <div class="item comment-item" v-for="(subitem, index2) in item.subcomentarios" :key="index2">
                  <img
                    class="ui avatar image"
                    :src="subitem.imagen_perfil"
                    
                  />
                  <div class="content">
                    <h6>
                      <a href="profil/mafia" class="review-author" title=""
                        >{{subitem.username}}</a
                      >
                    </h6>
                    <div class="review-time">{{subitem.fecha}}</div>
                    <div class="review-content">
                      <p>{{subitem.contenido}}</p>
                    </div>
                    <div class="review-extras">
                      <div class="flex-row buttons">
                       <LikeComments :id_user="id_user" :id="subitem.id" :micomentario="subitem.micomentario"
                       :like="subitem.cantidadLikes" :yadi="subitem.yadi" @getCommentsLike="getCommentsbyLike()"
                       :dislike="subitem.cantidadDislikes" :yadid="subitem.yadid" :serieCap="serieCap"  :post_id="post_id"
                      />
                      </div>
                    </div>
                  </div>

                  
          

                <div class="review-more-menu">
            <DropDownReply :id="subitem.id" :micomentario="subitem.micomentario" @getComments="getCommentsByReply()" />
                </div>






                </div>
                
              </div>
            </div>

            <div class="review-more-menu">
              <DropDownReply :id="item.id" :micomentario="item.micomentario" @getComments="getCommentsByReply()" />
             
            </div>
          </div>
        </div>
      </div>

      <!-- // .list -->
    </section>
    <!-- // .user-reviews -->
  </div>
</template>


<script>

import { mapState } from "vuex";
import DropDownReply from '@/components/Comentarios/DropDownReply.vue'
import LikeComments from '@/components/Comentarios/LikeComments.vue'
export default {
  name: "ComentariosFlix",
  props: {
    post_id: {
    },
    id_user: {
    },
    userName: {
    },
    serieCap: {
    },
  },
  data() {
    return {
      loadingComment: false,
      arrayComentarios: [],
      textoComentario: "",
      cantComments: 0, 
      
    };
  },
  computed: {
    ...mapState(["urlProcesos"]),
  },
   
  methods: {
    getCommentsbyLike(){
        this.getCommentsPost()
 
    },
   
getCommentsByReply(){
  this.getCommentsPost()
}, 
      responderComment(id){
        if(this.id_user == null){
this.$nuxt.$children[2].$refs.HeaderMovies.loginOpen()
 return false
}
        var textoReply = document.getElementById("replyText_"+id).value
      //  console.log(textoReply)
         document.getElementById("buttonReply_"+id).style.opacity = "0.2";
        this.addCommentReply(id, textoReply)
      },
      activarReply(id){
        if(this.id_user == null){
this.$nuxt.$children[2].$refs.HeaderMovies.loginOpen()
 return false
}
     const editor = this.$el.querySelector("#reply_"+id);
      editor.style.display = "block";
      }, 
   
    async addCommentReply(id, contenido){


if(this.id_user == null){
this.$nuxt.$children[2].$refs.HeaderMovies.loginOpen()
 return false
}


 var textoReply = document.getElementById("replyText_"+id)

 await fetch(
          this.urlProcesos +
            "wp-json/comentarios/add/post/?q=addR&id_post=" +
            this.post_id +
            "&id_user=" +
            this.id_user +
            "&username=" +
            this.userName +
            "&content=" +
            contenido+
            "&id_comment="+id+
            "&serieCap="+this.serieCap
        )
          .then((r) => r.json())
          .then((res) => {
              
          //  console.log(res);
            textoReply.value = ''
            this.getCommentsPost();
                 document.getElementById("buttonReply_"+id).style.opacity = "1";
          });
     
    },




    async addComment() {
      if(this.id_user == null){
this.$nuxt.$children[2].$refs.HeaderMovies.loginOpen()
 return false
}
   //   console.log(this.$refs.emoji);
     
      if (this.textoComentario.length > 0) {
         this.loadingComment = true;
      const editor = this.$el.querySelector(".emoji-wysiwyg-editor");
      editor.style.backgroundColor = "#42454f";
        console.log("mayor q ce4o");
        await fetch(
          this.urlProcesos +
            "wp-json/comentarios/add/post/?q=add&id_post=" +
            this.post_id +
            "&id_user=" +
            this.id_user +
            "&username=" +
            this.userName +
            "&content=" +
            this.textoComentario+
            "&serieCap="+this.serieCap
        )
          .then((r) => r.json())
          .then((res) => {
        //    console.log(res);
            this.$refs.emoji.clear();
            this.loadingComment = false;
            editor.style.backgroundColor = "#111215";
            this.getCommentsPost();
          });
      }
    },
    onInput(event) {
      //event.data contains the value of the textarea
      this.textoComentario = event.data;
    },
    async getCommentsPost() {
     
      await fetch(
        this.urlProcesos +
          "wp-json/comentarios/add/post/?q=get&id_post=" +
          this.post_id+"&id_user="+this.id_user
      )
        .then((r) => r.json())
        .then((res) => {
        // console.log(res);
          this.arrayComentarios = res[0].comentarios;
           if(res[0].cantidad > 0){
 this.cantComments = res[0].cantidad
          }
          this.$store.state.opa = false
        });
    },
  },
  mounted() {

    this.getCommentsPost();
  },
  components: {
    DropDownReply, LikeComments
  },
  
};
</script>
<style >
.loadingComment {
  opacity: 0.2;
}
.mostrarItem{
  display: block;
}
</style>