<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { NotFound } from '../pages';
import { admin, thread, event, finPosts, yetPosts } from '../store';
import type { PostsType } from '../models/types';
import { db } from '../firebase/firebase';

let posts: PostsType[] = [];

const handleFetch = (): void => {
  posts = [...$yetPosts, ...$finPosts];
};

const handleDelete = (pid: string): void => {
  db.collection('qin-salon').doc($event).collection('posts').doc(pid).delete();
  posts = posts.filter((post) => post.pid !== pid);
};

onMount(
  async (): Promise<void> => {
    thread.update((store_thread) => (store_thread = false));
    if ($admin) {
      await handleFetch();
    }
  }
);
</script>

{#if $admin}
  <section class="w-full">
    <div class="absolute top-14 md:top-16 pt-3 pl-4">
      <Link to="/">
        <button class="btn btn-primary btn-sm mr-2">一覧へ戻る</button>
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
