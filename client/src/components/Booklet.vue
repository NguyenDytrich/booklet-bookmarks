<template>
  <div class="panel is-primary">
    <h1 class="panel-heading">Booklet</h1>
    <div v-for="i in bookmarkMap" :key="i.id" class="panel-block">
      <div class="bookmark">
        <div class="bookmark-item">
          <a @click="openInNew(i.bk.link)">
            {{ i.bk.name }}
          </a>
          <div class="tags">
            <span v-for="t in getBookmarkTags(i.bk)" :key="t.id" class="tag">
              {{ t.tag }}
              <button
                class="delete is-small ml-3 mr-0"
                @click="deleteBookmarkTag(i.id, t.id)"
              ></button>
            </span>
            <span
              v-if="!i.bk.addingTag"
              class="tag add-btn is-primary"
              @click="toggleAddTag(i.id)"
            >
              <span v-if="i.bk.tags.length === 0" class="mr-2">Add tags</span>
              <font-awesome-icon icon="plus" class="del-btn" />
            </span>
            <span v-else class="tag is-light">
              <input
                v-focus
                placeholder="new tag"
                v-model="newTag"
                @blur="saveTagForBookmark(i.id)"
                @keyup.enter="$event.target.blur"
                type="text"
              />
              <button
                class="delete is-small ml-3 mr-0"
                @click="toggleAddTag(i.id)"
              />
            </span>
          </div>
        </div>
        <div class="bookmark-controls">
          <div class="delete is-light" @click="deleteBookmark(i.id)" />
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
import _ from "lodash";

@Component({
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
})
export default class Booklet extends Vue {
  private bookmarks: Array<Bookmark> = [];

  private fields = {
    name: "",
    link: "",
    tags: [],
    addingTag: false
  };

  private newTag = "";

  private onSubmit() {
    console.log(this.bookmarks);
    this.bookmarks.push(_.cloneDeep(this.fields));
  }

  get bookmarkMap() {
    return this.bookmarks.map((bk, id) => ({
      id,
      bk
    }));
  }

  private getBookmarkTags(bookmark: Bookmark) {
    return bookmark.tags.map((tag, id) => ({
      id,
      tag
    }));
  }

  private openInNew(link: string) {
    const hasHttp = link.match(/^https?:\/\//);
    try {
      if (hasHttp) {
        window.open(link, "_blank");
      } else {
        window.open(`//${link}`, "_blank");
      }
    } catch (e) {
      // Throw away error
      // This won't be necessary if we validate the URL
      // in the field.
      return;
    }
  }

  private toggleAddTag(id: number) {
    this.bookmarks[id].addingTag = !this.bookmarks[id].addingTag;
  }

  private deleteBookmark(id: number) {
    this.bookmarks.splice(id, 1);
  }

  private deleteBookmarkTag(bookmarkId: number, tagId: number) {
    this.bookmarks[bookmarkId].tags.splice(tagId, 1);
  }

  private saveTagForBookmark(bookmarkId: number) {
    if (this.newTag !== "") {
      this.bookmarks[bookmarkId].tags.push(this.newTag);
      this.newTag = "";
    }
    this.bookmarks[bookmarkId].addingTag = false;
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

    .del-btn {
      color: white;
    }

    .add-btn {
      &:hover {
        background-color: bulmaDarken($primary, 2.5%);
      }
      cursor: pointer;
    }
  }

  .bookmark-controls {
    grid-column-start: 2;
    grid-column-end: -1;

    display: flex;
    justify-content: right;
  }
}
</style>
