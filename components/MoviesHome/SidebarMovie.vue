<template>
    <div>
        <aside id="primary-sidebar" :class="{'triggered' : dropdownHeader}"
		 v-click-outside="outSidebar">
				<div class="scroll-wrapper scrollbar-macosx" style="position: relative;">
					<div id="sidebar-inner" class="scrollbar-macosx scroll-content"
						style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 1178px;">
						<section class="guide-menu fluid">
							<h5 class="section-heading">Menú</h5>
							<ul class="guide-icon-menu">
								<li  :class="{'active': $route.name == 'index'}" >
								
                                        <nuxt-link    :to="{name:'index'}"><span>
											<svg class="mofycon">
												<use xlink:href="#icon-home-new"></use>
											</svg>
                                        </span>Inicio</nuxt-link>  
								</li>
								<li :class="{'active': $route.name == 'descubrir-pag'}">
                                <nuxt-link    :to="{name:'descubrir-pag'}"><span>
											<svg class="mofycon">
												<use xlink:href="#icon-discover-new"></use>
											</svg>
                                        </span>Descubrir</nuxt-link> 
								</li>
								<li :class="{'active': $route.name == 'tendencias'}">
								<nuxt-link  
								 :to="{name:'tendencias'}">
									
										<span>
											<svg class="mofycon">
												<use xlink:href="#icon-trending-new"></use>
											</svg>
										</span>Tendencias </nuxt-link>


								</li>
								<li :class="{'active': $route.name == 'calendario'}">
								<nuxt-link  
								 :to="{name:'calendario'}">
										<span>
											<svg class="mofycon">
												<use xlink:href="#icon-calendar-new"></use>
											</svg>
										</span>Calendario </nuxt-link>
								</li>
								<li  :class="{'active': $route.name == 'series'}">
									 <nuxt-link  :to="{name:'series'}">
										<span>
											<svg class="mofycon">
												<use xlink:href="#icon-tv-new"></use>
											</svg>
										</span>Series 
									</nuxt-link>
								</li>
								<li :class="{'active': $route.name == 'ver-peliculas-pag'}">
								<nuxt-link  :to="{name:'ver-peliculas-pag'}">
									<span>
											<svg class="mofycon">
												<use xlink:href="#icon-film-new"></use>
											</svg>
										</span>Películas
									</nuxt-link>
								</li>
								<li :class="{'active': $route.name == 'foro'}">
								<nuxt-link  
								:to="{name:'foro'}">
								
										<span>
											<svg class="mofycon">
												<use xlink:href="#icon-comment-new"></use>
											</svg>
										</span>Foro </nuxt-link>
								</li>
								<li :class="{'active': $route.name == 'colecciones'}">
								 <nuxt-link  
								 :to="{name:'colecciones'}">
									
										<span>
											<svg class="mofycon">
												<use xlink:href="#icon-collections-new"></use>
											</svg>
										</span>Colecciones </nuxt-link>
								</li>
							
							</ul>
						</section>
						<SidebarTendencias />
						
					</div>
					<div class="scroll-element scroll-x">
						<div class="scroll-element_outer">
							<div class="scroll-element_size"></div>
							<div class="scroll-element_track"></div>
							<div class="scroll-bar"></div>
						</div>
					</div>
					<div class="scroll-element scroll-y">
						<div class="scroll-element_outer">
							<div class="scroll-element_size"></div>
							<div class="scroll-element_track"></div>
							<div class="scroll-bar"></div>
						</div>
					</div>
				</div>
			</aside>
    </div>
</template>


<script>
import ClickOutside from 'vue-click-outside'
import SidebarTendencias from '@/components/Sidebar/SidebarTendencias.vue'
import {mapState} from 'vuex'
export default {
  name: 'SidebarMovie', 
  computed:{
        ...mapState(['dropdownHeader'])
    },
  methods: {
	  outSidebar(){
		//  this.$store.state.dropdownHeader = false
	  }
  },
     directives: {
    ClickOutside
  }, 
  components:{
      SidebarTendencias
	},
}
</script>