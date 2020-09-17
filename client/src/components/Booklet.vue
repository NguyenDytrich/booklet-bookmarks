<template>
  <div class="panel">
    <h1 class="panel-heading">Booklet</h1>
    <a
      class="panel-block"
      v-for="i in bookmarkMap"
      :key="i.id"
      @click="openInNew(i.bk.link)"
    >
      {{ i.bk.name }}
    </a>
    <div class="panel-block">
      <form v-on:submit.prevent="onSubmit">
        <div class="field is-grouped">
          <div class="field">
            <input
              class="input"
              type="text"
              placeholder="Bookmark name"
              v-model="fields.name"
            />
          </div>
          <div class="field">
            <input
              class="input"
              type="text"
              placeholder="Hyperlink"
              v-model="fields.link"
            />
          </div>
          <button class="button is-primary">
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
    this.bookmarks.push({ ...this.fields });
  }

  get bookmarkMap() {
    return this.bookmarks.map((bk, id) => ({
      id,
      bk
    }));
  }

  private openInNew(link: string) {
    console.log(`Opening link: ${link}`);
    const hasHttp = link.match(/^https?:\/\//);
    if (hasHttp) {
      window.open(link, "_blank");
    } else {
      window.open(`//${link}`, "_blank");
    }
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
