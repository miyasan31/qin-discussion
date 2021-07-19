<script lang="ts">
import clsx from 'clsx';
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import type { PostsType, TitleSizeType } from '../models/types';
import { admin, thread, event } from '../store';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import type { DocumentType } from '../firebase/firebase';

export let pid: string;
let title_size: TitleSizeType;
let post: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};

const handleFetch = (id: string) => {
  db.collection('qin-salon')
    .doc($event)
    .collection('posts')
    .doc(id)
    .onSnapshot((doc: DocumentType) => {
      post = doc.data() as PostsType;
      title_size = {
        'text-2xl sm:text-6xl text-center': post.title.length >= 0 && post.title.length < 25,
        'text-2xl sm:text-5xl': post.title.length >= 25 && post.title.length < 50,
        'text-2xl sm:text-4xl': post.title.length >= 50 && post.title.length < 75,
        'text-xl sm:text-3xl': post.title.length >= 70 && post.title.length < 100,
        'text-lg sm:text-2xl': post.title.length >= 100 && post.title.length < 125,
        'text-md sm:text-xl': post.title.length >= 125,
      };
    });
};

const handleChenge = () => {
  let posts = {
    checked: !post.checked,
    create_time: FirebaseTimestamp.now(),
  };
  db.collection('qin-salon').doc($event).collection('posts').doc(pid).set(posts, { merge: true });
};

onMount(async () => {
  await handleFetch(pid);
});
</script>

<section class="w-full bg-base-100">
  <div class="absolute top-14 md:top-16 pt-3 pl-4 flex">
    <Link to="/">
      <button class="btn btn-primary btn-sm mr-2 shadow">一覧へ戻る</button>
    </Link>
    {#if $admin}
      {#if post.checked}
        <button class="btn btn-accent btn-sm mr-2 shadow" on:click={handleChenge}>取消</button>
      {:else}
        <button class="btn btn-secondary btn-sm mr-2 shadow" on:click={handleChenge}>終了</button>
      {/if}
    {/if}
    <div class="flex-grow" />
  </div>

  {#if post.title !== ''}
    <div class="flex flex-col main-height px-8">
      <div class="flex-grow" />

      <div class="flex-1">
        <p
          style="line-height: 1.4;"
          class={clsx(
            'text-base-300 font-bold leading-6 mb-5 whitespace-pre-line overflow-scroll bar-hidden',
            $thread ? 'text-left md:px-5' : 'text-center md:px-20',
            title_size
          )}>
          {post.title}
        </p>
        <div class="flex justify-center">
          <div class="flex items-center justify-center rounded-full    bg-primary py-2 sm:py-3 px-3 sm:px-5 shadow-lg">
            <span class="text-sm sm:text-xl text-primary-content font-bold">
              {post.creater_name}
            </span>
            {#if post.checked}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 sm:h-9 sm:w-9 text-secondary ml-0.5 -my-1 -mr-1 sm:ml-1 sm:-mr-1.5 sm:-my-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            {/if}
          </div>
        </div>
      </div>

      <div class="flex-grow" />
    </div>
  {/if}
</section>

<!-- const handlePagenation = async () => {
  if ($sort_asc) {
    next_pid = $yetPosts[0].pid;
  } else {
    next_pid = $yetPosts[$yetPosts.length - 1].pid;
  }
  await handleFetch(next_pid);
  pid = next_pid;
}; -->
