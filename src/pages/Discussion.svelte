<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import type { PostsType } from '../models/types';
import { db } from '../firebase/firebase';
import { modal, event_name } from '../store';

let tab: boolean = true;
let finPosts: PostsType[] = [];
let yetPosts: PostsType[] = [];

const handleTabYet = () => {
  tab = true;
};
const handleTabFin = () => {
  tab = false;
};

const handleFetch = () => {
  db.collection('qin-salon')
    .doc($event_name)
    .collection('posts')
    .orderBy('create_time', 'desc')
    .onSnapshot((snapshot) => {
      let finDocs = [];
      let yetDocs = [];
      snapshot.forEach((doc) => {
        if (doc.data().checked) {
          finDocs.push({ ...doc.data() });
        } else {
          yetDocs.push({ ...doc.data() });
        }
      });
      finPosts = [...finDocs];
      yetPosts = [...yetDocs];
    });
};

onMount(async () => {
  modal.update((store_modal) => (store_modal = false));
  await handleFetch();
});
</script>

<section class="w-full">
  <div class="flex cursor-pointer">
    <div class="tab-base" class:tab-active={tab} on:click={handleTabYet}>まだ話してない</div>
    <div class="tab-base" class:tab-active={!tab} on:click={handleTabFin}>もう話した</div>
  </div>

  <div class="main-h overflow-y-auto pb-60">
    {#if tab}
      {#each yetPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="title-list whitespace-pre-line">
            {post.title.trim()}
          </div>
        </Link>
      {/each}
    {:else}
      {#each finPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="title-list whitespace-pre-line">
            {post.title.trim()}
          </div>
        </Link>
      {/each}
    {/if}
  </div>
</section>
