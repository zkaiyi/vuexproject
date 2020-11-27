<template>
  <div class="state">
    <h2>{{ count }}</h2>
    <button @click="add">+ADD</button>
  </div>
</template>

<script>
  import store from '@/store/store.js'
    export default {
        name: "state",
      computed: {
        count () {
          return store.state.count
        }
      },
      methods: {
        add () {
          store.state.count++
        }
      }
    }
</script>

<style scoped>

</style>
