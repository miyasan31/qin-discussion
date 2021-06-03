<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { NotFound } from '../pages';
import { AdminNav } from '../components';
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
  <section class="w-full bg-white">
    <div class="md:hidden absolute top-14 md:top-16 pt-3 pl-4">
      <Link to="/">
        <button class="btn btn-primary btn-sm mr-2">一覧へ戻る</button>
      </Link>
    </div>

    <div class="flex">
      <div class="main-height overflow-y-auto w-full pb-60">
        {#each posts as post}
          <div class="flex py-3 md:py-4 px-6 border-b-1 hover:bg-gray-100 hover:shadow-md">
            <div class="text-base md:text-lg font-bold pr-5">
              {post.title}
            </div>
            <div class="flex-grow" />
            <button class="btn btn-accent btn-circle btn-sm rounded-lg shadow" on:click={() => handleDelete(post.pid)}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </button>
          </div>
        {/each}
      </div>
      <AdminNav nav="delete" />
    </div>
  </section>
{:else}
  <NotFound />
{/if}
