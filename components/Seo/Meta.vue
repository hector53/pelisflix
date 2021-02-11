<template>
    
</template>
<script>
// @ is an alias to /src

export default {
  name: 'Meta',
  props: ["metaDescripcion"], 
  data() {
      return {
          
      }
  },
  metaInfo() {
    return {
      title: "Ver Películas Online HD Gratis Completas 🥇 PelisFlix",
      meta: [
        {
          
          vmid: "description",
          name: "description",
          content:
            this.metaDescripcion
        }, 

      ], 
      link: [
        {
          rel: 'canonical',
          href: 'https://pelisflix.com/'
        }
			]
    };
  },
  created() {
   
  },
}
</script>
