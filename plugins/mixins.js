import Vue from 'vue'
Vue.mixin({
    async beforeMount() {
        if( this.$root.$options.context.isStatic
            && typeof this.$root.$options.context.from == 'undefined'
            && this.$router.history.current.path != '/'
            && typeof this.$options.asyncData == "function") {

            const data = await this.$options.asyncData(this.$root.$options.context);

            for(let k in data) {
                this[k] = data[k];
            }
        }
    }
});