<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { NotFound } from '../pages';
import { admin, thread, event_name } from '../store';
import type { PostsType } from '../models/types';
import { db } from '../firebase/firebase';

let posts: PostsType[] = [];

const handleFetch = () => {
  db.collection('qin-salon')
    .doc($event_name)
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
  db.collection('qin-salon').doc($event_name).collection('posts').doc(pid).delete();
};

onMount(async () => {
  thread.update((store_thread) => (store_thread = false));
  if ($admin) {
    await handleFetch();
  }
});
</script>

{#if $admin}
  <section class="w-full">
    <div class="absolute top-14 md:top-16 pt-3 pl-4">
      <Link to="/">
        <button class="btn btn-primary btn-util">一覧へ戻る</button>
      </Link>
    </div>

    <div class="main-height overflow-y-auto pt-12 pb-60">
      {#each posts as post}
        <div class="flex py-4 md:py-5 px-6 sm:px-8 md:px-10 lg:px-14 border-b-1 hover:bg-gray-100">
          <div class="text-base md:text-lg font-bold pr-5">
            {post.title}
          </div>
          <div class="flex-grow" />
          <button class="btn btn-accent btn-xs md:btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}
            >削除</button>
        </div>
      {/each}
    </div>
  </section>
{:else}
  <NotFound />
{/if}
