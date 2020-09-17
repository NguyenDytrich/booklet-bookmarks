<template>
  <div id="app">
    <Booklet />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Booklet from "./components/Booklet.vue";

@Component({
  components: {
    Booklet
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
