<template>
   <div>
              <button
                  class="ui button fnc_addFeel"
                 @click="likeComment()" :class="{'text-red' : yadi, 'opa' : opa}"
                >
                  <svg class="mofycon">
                    <use xlink:href="#icon-thumbs-up"></use>
                  </svg>
            
                  <span>{{like}}</span>
                </button>
                <button
                  class="ui button fnc_addFeel"
                 @click="dislikeComment()" :class="{'text-red' : yadid, 'opa' : opad}"
                >
                  <svg class="mofycon">
                    <use xlink:href="#icon-thumbs-down"></use>
                  </svg>
                  <span>{{dislike}}</span>
                </button>
   </div>
</template>


<script>

import { mapState } from "vuex";

export default {
  name: "LikeComments",
  props: {
    id: {
      type: String,
      required: true,
    },
       micomentario: {
      type: Boolean,
      required: true,
    },
     id_user: {
    },
     like: {
      type: String,
      required: true,
    },

     dislike: {
      type: String,
      required: true,
    },
    
     yadi: {
      type: Boolean,
      required: true,
    },

     yadid: {
      type: Boolean,
      required: true,
    },
  serieCap: {
    }, 
     post_id: {
    }
  
  },
  data() {
    return {
      opa: false, 
      opad: false,
      activoClick: false
       
    };
  },
  computed: {
    ...mapState(["urlProcesos"]),
  },
   
  methods: {
        async dislikeComment(){
           if(this.id_user == null){
this.$nuxt.$children[2].$refs.HeaderMovies.loginOpen()
 return false
}
       if(this.yadid == false){
           this.opad = true
              await fetch(
          this.urlProcesos +
            "wp-json/like/comment/?q=dislike&id_comment="+this.id+"&id_user="+this.id_user+
            "&serieCap="+this.serieCap+
            "&id_post="+this.post_id
        )
          .then((r) => r.json())
          .then((res) => {
              
       //     console.log(res);
           
          
           this.$emit("getCommentsLike");
   
           this.opad = false
          });
       }
      
    }, 
   async likeComment(){
           if(this.id_user == null){
this.$nuxt.$children[2].$refs.HeaderMovies.loginOpen()
 return false
}
       if(this.yadi == false){
         console.log(this.post_id)
           this.activoClick = true
           this.opa = true
           console.log( this.urlProcesos +
            "wp-json/like/comment/?q=like&id_comment="+this.id+"&id_user="+this.id_user+
            "&serieCap="+this.serieCap+
            "&id_post="+this.post_id)
              await fetch(
          this.urlProcesos +
            "wp-json/like/comment/?q=like&id_comment="+this.id+"&id_user="+this.id_user+
            "&serieCap="+this.serieCap+
            "&id_post="+this.post_id
        )
          .then((r) => r.json())
          .then((res) => {
              
       //     console.log(res);
           
           
           this.$emit("getCommentsLike");
   
           this.opa = false
          });
       }
      
    }, 
  
  },
  mounted() {
   
  },
  updated() {
      
  },

 
};
</script>
<style >

.mostrarItem{
  display: block;
}
.opa{
    opacity: 0.2;
}
</style>