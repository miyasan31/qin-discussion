<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { NotFound } from '../pages';
import { admin } from '../store';
import type { PostsType } from '../models/types';
import { db } from '../firebase/firebase';

let posts: PostsType[] = [];

const handleFetch = () => {
  db.collection('posts20210530')
    .orderBy('create_time', 'desc')
    .onSnapshot((snapshot) => {
      let docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      posts = [...docs];
    });
};

const handleDelete = (pid: string) => {
  db.collection('posts20210530').doc(pid).delete();
};

onMount(async () => {
  if ($admin) {
    await handleFetch();
  }
});
</script>

<section>
  {#if $admin}
    <div class="fixed z-50 bg-white">
      <div class="flex px-5 mt-3">
        <Link to="/">
          <button class="btn btn-primary btn rounded-lg btn-sm">一覧へ戻る</button></Link>
        <div class="flex-grow" />
      </div>
      <div class="main-height mx-auto overflow-y-auto px-3  md:px-32 pb-60">
        {#each posts as post}
          <div class="flex items-center border-b-1 hover:bg-gray-100">
            <div class="mx-2 py-5 pl-3　text-2xl font-bold">
              {post.title}
            </div>
            <div class="flex-grow" />
            <button class="btn btn-accent btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}>削除</button>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <NotFound />
  {/if}
</section>
