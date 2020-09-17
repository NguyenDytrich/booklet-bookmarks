<template>
  <div class="panel">
    <h1 class="panel-heading">Booklet</h1>
    <label class="panel-block" v-for="b in bookmarks" :key="b.link">
      <input type="checkbox" />
      {{ b.name }}
    </label>
    <div class="panel-block">
      <form v-on:submit.prevent="onSubmit">
        <div class="field is-grouped">
          <div class="field">
            <input
              class="input is-small"
              type="text"
              placeholder="Bookmark name"
              v-model="fields.name"
            />
          </div>
          <div class="field">
            <input
              class="input is-small"
              type="text"
              placeholder="Hyperlink"
              v-model="fields.link"
            />
          </div>
          <button class="button is-primary is-small">
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Bookmark } from "../@types";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Booklet extends Vue {
  private bookmarks: Array<Bookmark> = [];

  private fields = {
    name: "",
    link: ""
  };

  private onSubmit() {
    console.log(this.bookmarks);
    this.bookmarks.push(this.fields);
  }
}
</script>

<style scoped lang="scss">
.is-grouped {
  div:first-child {
    input {
      border-radius: 5px 0 0 5px;
      border-right: none;
    }
  }
  div:nth-child(2) {
    input {
      border-radius: 0;
      border-right: none;
    }
  }
  button {
    border-radius: 0 5px 5px 0;
    border-left: none;
  }
}
</style>
