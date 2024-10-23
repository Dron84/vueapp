<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="post in posts"
        :key="post.id"
        @click="selectPost(post.id)"
        :class="{ 'highlight': post.id === selectedPostId }"
        @mouseenter="hoverPost(post.id)"
        @mouseleave="hoverPost(null)"
      >
        <v-list-item-content>
          <!-- Edit or display post title -->
          <v-text-field
            v-if="editingPostId === post.id"
            v-model="post.title"
            @blur="finishEditing(post)"
          />
          <v-list-item-title v-else>{{ post.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="add-gap mt-2 pb-2">
          <v-btn @click.stop="editPost(post.id)" color="info">Edit</v-btn>
          <v-btn @click.stop="deletePost(post.id)" color="error">Delete</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    props: {
      posts: {
        type: Array as PropType<Array<{ id: number; title: string }>>,
        required: true,
      },
      selectedPostId: {
        type: Number as PropType<number | null>, // Allow null,
        default: null,
      },
      editingPostId: {
        type: Number as PropType<number | null>, // Allow null,
        default: null,
      },
      deletePost: {
        type: Function as PropType<(id: number) => void>,
        required: true,
      },
      editPost: {
        type: Function as PropType<(id: number) => void>,
        required: true,
      },
      finishEditing: {
        type: Function as PropType<
          (post: { id: number; title: string }) => void
        >,
        required: true,
      },
      selectPost: {
        type: Function as PropType<(id: number) => void>,
        required: true,
      },
      hoverPost: {
        type: Function as PropType<(id: number | null) => void>,
        required: true,
      },
    },
  })
</script>

<style scoped>
  .highlight {
    background-color: #f0f0f0;
  }
  .add-gap {
    display: flex;
    column-gap: 10px;
  }
</style>
