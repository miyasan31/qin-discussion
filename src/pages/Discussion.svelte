<script lang="ts">
import { onMount } from 'svelte';
import { Link } from 'svelte-routing';
import { modal, event, sort_asc, finPosts, yetPosts } from '../store';
import { db } from '../firebase/firebase';
import type { DocumentsType } from '../firebase/firebase';
import type { PostsType } from '../models/types';
import type { Writable } from 'svelte/store';

let tab: boolean = false;

const handleToggleTab = (boolean: boolean) => (tab = boolean);

const handleFetch = (boolean: boolean, posts: Writable<PostsType[]>) => {
  db.collection('qin-salon')
    .doc($event)
    .collection('posts')
    .where('checked', '==', boolean)
    .orderBy('create_time', 'asc')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change: DocumentsType) => {
        const change_data = change.doc.data() as PostsType;
        if (change.type === 'added') {
          posts.update((post) => {
            const filter_boolean = post.find((data) => data.pid === change_data.pid);
            if (!filter_boolean) {
              return [...post, change_data];
            } else {
              return [...post];
            }
          });
        } else if (change.type === 'removed') {
          posts.update((post) => (post = post.filter((post) => post.pid !== change_data.pid)));
        }
      });
    });
};

onMount(async () => {
  modal.update((store_modal) => (store_modal = false));
  if ($yetPosts.length === 0 || $finPosts.length === 0) {
    await handleFetch(false, yetPosts);
    await handleFetch(true, finPosts);
  }
});
</script>

<section class="w-full bg-base-100">
  <div class="flex cursor-pointer shadow">
    <div class={tab ? 'tab-base' : 'tab-active'} on:click={() => handleToggleTab(false)}>まだ話してない</div>
    <div class={!tab ? 'tab-base' : 'tab-active'} on:click={() => handleToggleTab(true)}>もう話した</div>
  </div>

  <div class="main-h overflow-y-auto pb-60">
    {#if $sort_asc}
      {#if !tab}
        {#each $yetPosts as post}
          <Link to={`/talking/${post.pid}`} replace={true}>
            <div class="title-list">
              {post.title}
            </div>
          </Link>
        {/each}
      {:else}
        {#each $finPosts as post}
          <Link to={`/talking/${post.pid}`}>
            <div class="title-list">
              {post.title}
            </div>
          </Link>
        {/each}
      {/if}
    {:else if !tab}
      {#each $yetPosts.slice().reverse() as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="title-list">
            {post.title}
          </div>
        </Link>
      {/each}
    {:else}
      {#each $finPosts.slice().reverse() as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="title-list">
            {post.title}
          </div>
        </Link>
      {/each}
    {/if}
  </div>
</section>
