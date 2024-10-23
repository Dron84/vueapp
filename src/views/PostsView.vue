<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="searchQuery" label="Найти пост" />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="newPostTitle" label="Добавить описание пост" />
        <v-btn @click="addPost" color="primary">Добавить пост</v-btn>
      </v-col>
      <PostList
          :posts="filteredPosts"
          :selected-post-id="selectedPostId"
          :editing-post-id="editingPostId"
          :delete-post="deletePost"
          :edit-post="editPost"
          :finish-editing="finishEditing"
          :select-post="selectPost"
          :hover-post="hoverPost"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { usePostsStore } from '../stores/postsStore';
import PostList from '../components/FilteredPosts.vue';

export default defineComponent({
  components: { PostList },
  setup() {
    const postsStore = usePostsStore();
    const newPostTitle = ref('');
    const searchQuery = ref('');
    const selectedPostId = ref<number | null>(null);
    const editingPostId = ref<number | null>(null);

    const filteredPosts = computed(() => {
      if (searchQuery.value) {
        return postsStore.posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return postsStore.posts;
    });

    const addPost = () => {
      if (newPostTitle.value.trim()) {
        postsStore.addPost(newPostTitle.value.trim());
        newPostTitle.value = '';
      }
    };

    const deletePost = (id: number) => {
      postsStore.deletePost(id);
    };

    const editPost = (id: number) => {
      editingPostId.value = id;
    };

    const finishEditing = (post: { id: number; title: string }) => {
      postsStore.editPost(post.id, post.title);
      editingPostId.value = null;
    };

    const selectPost = (id: number) => {
      selectedPostId.value = id;
    };

    const hoverPost = (id: number | null) => {
      selectedPostId.value = id;
    };

    return {
      newPostTitle,
      searchQuery,
      filteredPosts,
      selectedPostId,
      editingPostId,
      addPost,
      deletePost,
      editPost,
      finishEditing,
      selectPost,
      hoverPost,
    };
  }
});
</script>

<style scoped>


</style>
