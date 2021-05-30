<script lang="ts">
import clsx from 'clsx';
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import type { PostsType, TitleSizeType } from '../models/types';
import { admin, thread } from '../store';
import { db } from '../firebase/firebase';

let pid = '';
let title_size: TitleSizeType;
let post: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};

const handleFetch = (id) => {
  db.collection('qin-salon')
    .doc('20210530')
    .collection('posts')
    .doc(id)
    .onSnapshot((doc) => {
      post = doc.data() as PostsType;
      title_size = {
        'text-2xl sm:text-6xl': post.title.length >= 0 && post.title.length < 25,
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
  };
  db.collection('qin-salon').doc('20210530').collection('posts').doc(pid).set(posts, { merge: true });
};

onMount(async () => {
  pid = await window.location.pathname.split('/talking/')[1];
  await handleFetch(pid);
});
</script>

<section class="w-full">
  <div class="absolute top-14 md:top-16 pt-3 pl-4 flex">
    <Link to="/">
      <button class="btn btn-primary btn-util">一覧へ戻る</button>
    </Link>
    {#if $admin}
      {#if post.checked}
        <button class="btn btn-accent btn-util" disabled={$admin ? false : true} on:click={handleChenge}>取消</button>
      {:else}
        <button class="btn btn-secondary btn-util" disabled={$admin ? false : true} on:click={handleChenge}
          >終了</button>
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
            'block font-bold leading-6 mb-5 whitespace-pre-line overflow-scroll bar-hidden',
            title_size,
            $thread ? 'text-left md:px-5' : 'text-center md:px-20'
          )}>
          {post.title.trim()}
        </p>
        <div class="flex justify-center">
          <div class="flex items-center justify-center rounded-full    bg-primary py-2 sm:py-3 px-3 sm:px-5">
            <span class="text-sm sm:text-xl text-white font-bold">
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
