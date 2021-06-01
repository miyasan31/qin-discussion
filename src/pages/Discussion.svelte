<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { modal, event, finPosts, yetPosts } from '../store';
import { db } from '../firebase/firebase';
import type { DocumentsType } from '../firebase/firebase';
import type { PostsType } from '../models/types';

let tab: boolean = false;

const handleTabYet = (): void => {
  if ($yetPosts.length === 0) {
    handleYetFetch();
  }
  tab = false;
};
const handleTabFin = (): void => {
  if ($finPosts.length === 0) {
    handleFinFetch();
  }
  tab = true;
};

const handleYetFetch = (): void => {
  db.collection('qin-salon')
    .doc($event)
    .collection('posts')
    .where('checked', '==', false)
    .orderBy('create_time', 'asc')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change: DocumentsType) => {
        const change_data = change.doc.data() as PostsType;
        if (change.type === 'added') {
          yetPosts.update((yetPost) => [change_data, ...yetPost]);
        } else if (change.type === 'removed') {
          yetPosts.update((yetPost) => (yetPost = yetPost.filter((post) => post.pid !== change_data.pid)));
        }
      });
    });
};

const handleFinFetch = (): void => {
  db.collection('qin-salon')
    .doc($event)
    .collection('posts')
    .where('checked', '==', true)
    .orderBy('create_time', 'asc')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change: DocumentsType) => {
        const change_data = change.doc.data() as PostsType;
        if (change.type === 'added') {
          finPosts.update((finPost) => [change_data, ...finPost]);
        } else if (change.type === 'removed') {
          finPosts.update((finPost) => (finPost = finPost.filter((post) => post.pid !== change_data.pid)));
        }
      });
    });
};

onMount(
  async (): Promise<void> => {
    modal.update((store_modal) => (store_modal = false));
    if ($yetPosts.length === 0 && $finPosts.length === 0) {
      await handleYetFetch();
      await handleFinFetch();
    }
  }
);
</script>

<section class="w-full">
  <div class="flex cursor-pointer">
    <!-- 冗長クラス -->
    <div
      class={tab
        ? 'flex-1 py-2 md:py-2.5 box-border border-b-1 text-center text-base md:text-lg text-gray-400'
        : 'flex-1 py-2 md:py-2.5 box-border text-center md:text-lg font-bold border-b-2 border-primary-focus text-gray-700'}
      on:click={handleTabYet}>
      まだ話してない
    </div>
    <!-- 冗長クラス -->
    <div
      class={!tab
        ? 'flex-1 py-2 md:py-2.5 box-border border-b-1 text-center text-base md:text-lg text-gray-400'
        : 'flex-1 py-2 md:py-2.5 box-border text-center md:text-lg font-bold border-b-2 border-primary-focus text-gray-700'}
      on:click={handleTabFin}>
      もう話した
    </div>
  </div>

  <div class="main-h overflow-y-auto pb-60">
    {#if !tab}
      {#each $yetPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <!-- 冗長クラス -->
          <div
            class="py-4 md:py-5 px-6 sm:px-8 md:px-10 lg:px-14 text-xl md:text-2xl font-bold hover:bg-gray-100 border-b-1 whitespace-pre-line">
            {post.title.trim()}
          </div>
        </Link>
      {/each}
    {:else}
      {#each $finPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <!-- 冗長クラス -->
          <div
            class="py-4 md:py-5 px-6 sm:px-8 md:px-10 lg:px-14 text-xl md:text-2xl font-bold hover:bg-gray-100 border-b-1 whitespace-pre-line">
            {post.title.trim()}
          </div>
        </Link>
      {/each}
    {/if}
  </div>
</section>
