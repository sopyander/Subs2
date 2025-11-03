import { openDB } from 'idb';

const DB_NAME = 'storymap-db';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'stories';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
  },
});

const DBHelper = {
  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async getStory(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async putStory(story) {
    if (!story || !story.id) return;
    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },
  
  async putAllStories(stories) {
    if (!stories || stories.length === 0) return;
    const tx = (await dbPromise).transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    for (const story of stories) {
      store.put(story);
    }
    await tx.done;
  }
};

export default DBHelper;