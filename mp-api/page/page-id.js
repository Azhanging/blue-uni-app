//页面id
class PageID {
  constructor() {
    this.id = 0;
  }

  setCurrentID() {
    ++this.id;
    console.log(`current page id ${this.id}`);
  }

  getCurrentID() {
    return this.id;
  }

  isCurrentID(id) {
    return this.id === id;
  }
}

export default PageID;