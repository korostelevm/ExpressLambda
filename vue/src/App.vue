<template>

  <div>
    <div>App component</div>
    <Menu/>
    <pre>
      {{backend_data}}
    </pre>
  </div>

</template>
 
<script>
import { EventBus } from './EventBus.js';
export default {
    name: 'microfrontend',
    data() {
      return {
        error: false,
        loading: false,
        backend_data:null
      }
    },
    mounted: function() {
      this.stub()
    },
    created: function() {
    },
    methods: {
       stub: function(d) {
        return new Promise((resolve,reject)=>{
          fetch(this.$api + '/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': this.get_auth_header()
              },
              body: JSON.stringify(d),
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              this.backend_data=data
              resolve(data)
            }).catch(e => {
              this.error = e; console.error('exception:', e);
            })
          })
      },
      },
  }
</script>

<style scoped>
</style>
