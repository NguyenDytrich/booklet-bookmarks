<template>
  <div class="panel is-primary">
    <h1 class="panel-heading">Booklet</h1>
    <div v-for="i in bookmarkMap" :key="i.id" class="panel-block">
      <div class="bookmark">
        <div class="bookmark-item">
          <a @click="openInNew(i.bk.link)">
            {{ i.bk.name }}
          </a>
        </div>
        <div class="bookmark-controls">
          <span
            class="delete is-light is-pulled-right"
            @click="deleteBookmark(i.id)"
          />
        </div>
      </div>
    </div>
    <div class="panel-block">
      <form v-on:submit.prevent="onSubmit" style="width: 100%;">
        <div class="field is-grouped is-grouped-centered">
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

  private deleteBookmark(id: number) {
    this.bookmarks.splice(id, 1);
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

.bookmark {
  display: grid;
  grid-template-columns: auto 20%;
  width: 100%;
  padding: 0 1em;

  .bookmark-controls,
  .bookmark-item {
    padding: 10px 0 5px 0;
  }

  .bookmark-item {
    grid-column-start: 0;
    grid-column-end: 1;
  }

  .bookmark-controls {
    grid-column-start: 2;
    grid-column-end: -1;
  }
}
</style>
