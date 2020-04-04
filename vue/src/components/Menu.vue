<template>
    <div class='menu'>
      <h1>Menu</h1>
      <div
      class='menu_button'
      v-on:click="item_click"
      >item </div>
      <div
        class = 'menu_loading'
        v-if="loading && !error"
      >
        <i class="fa fa-spinner fa-pulse fa-fw"></i> ...
      </div>
    </div>
</template>

<script>
import { EventBus } from '../EventBus.js';
export default {
    name: 'Menu',
    data() {
      return {
        error: null,
        loading: null,
        timeout:null
      }
    },
    mounted: function() {
    },
    created: function() {
    },
    methods: {
        item_click: function() {
            return new Promise((resolve,reject)=>{
              var self = this;
              this.timeout = setTimeout(()=>{ 
                self.loading=null; self.error='Request timed out'}
                , 20000);
            this.loading = 'loading'
            fetch(this.$api + '/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.get_auth_header()
                },
                body: JSON.stringify({}),
                })
                .then(res => res.json())
                .then(data => {
                    clearTimeout(this.timeout)
                    this.loading = null;
                    console.log(data)
                    resolve(data)
                }).catch(e => {
                  this.error = e; console.error('exception:', e);
                })
            })
          }
      }
  }
</script>

<style scoped>
.menu_button{
  cursor: pointer
}
.menu_button:hover{
  background: yellow;
}

</style>
