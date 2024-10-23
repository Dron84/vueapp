import { defineStore } from 'pinia';

interface Post {
  id: number;
  title: string;
}

interface PostsState {
  posts: Post[];
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: JSON.parse(localStorage.getItem('posts') || '[]'),
  }),
  actions: {
    addPost(title: string) {
      const newPost = {
        id: Date.now(),
        title,
      };
      this.posts.push(newPost);
      this.savePosts();
    },
    deletePost(id: number) {
      this.posts = this.posts.filter(post => post.id !== id);
      this.savePosts();
    },
    editPost(id: number, newTitle: string) {
      const post = this.posts.find(post => post.id === id);
      if (post) {
        post.title = newTitle;
        this.savePosts();
      }
    },
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
  }
});
