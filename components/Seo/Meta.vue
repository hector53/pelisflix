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
      title: "Ver Películas Online HD Gratis Completas 🥇 PelisManiaco",
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
          href: 'https://pelismania.co/'
        }
			]
    };
  },
  created() {
   
  },
}
</script>
