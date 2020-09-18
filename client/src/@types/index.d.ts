export interface Bookmark {
  name: string;
  link: string;
  tags: Array<string>;
  // remove this, probably...
  addingTag: boolean;
}
