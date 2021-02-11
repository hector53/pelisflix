<template>
    <div>
        <footer class="footer">
			<div class="container">
				<FooterSocial />
				<FooterPopular />
				<FooterCopyright />
			</div>

		</footer>
    </div>
</template>

<script>
import FooterSocial from '@/components/Footer/FooterSocial.vue'
import FooterPopular from '@/components/Footer/FooterPopular.vue'
import FooterCopyright from '@/components/Footer/FooterCopyright.vue'
export default {
  name: 'FooterMovie', 
  data() {
    return {
      
    };
  }, 
   
   components:{
FooterSocial, FooterPopular, FooterCopyright
	},
	methods: {

	}, 
	 mounted() {

  },
}
</script>