<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { NotFound } from '../pages';
import { admin } from '../store';
import type { PostsType } from '../models/types';
import { db } from '../firebase/firebase';

let posts: PostsType[] = [];

const handleFetch = () => {
  db.collection('qin-salon')
    .doc('20210530')
    .collection('posts')
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
  db.collection('qin-salon').doc('20210530').collection('posts').doc(pid).delete();
};

onMount(async () => {
  if ($admin) {
    await handleFetch();
  }
});
</script>

{#if $admin}
  <section class="w-full main-height">
    <div class="absolute top-16 pt-2 pl-4">
      <Link to="/">
        <button class="btn btn-primary btn-util">一覧へ戻る</button>
      </Link>
    </div>

    <div class="main-height overflow-y-auto pt-12 pb-60">
      {#each posts as post}
        <div class="flex py-5 px-10 border-b-1 hover:bg-gray-100">
          <div class="text-lg font-bold pr-5">
            {post.title}
          </div>
          <div class="flex-grow" />
          <button class="btn btn-accent btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}>削除</button>
        </div>
      {/each}
    </div>
  </section>
{:else}
  <NotFound />
{/if}
