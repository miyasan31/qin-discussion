<script lang="ts">
import clsx from 'clsx';
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import type { PostsType, TitleSizeType } from '../models/types';
import { admin } from '../store';
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

const handleFetch = () => {
  db.collection('posts20210530')
    .doc(pid)
    .onSnapshot((doc) => {
      post = doc.data() as PostsType;
      title_size = {
        'text-2xl sm:text-6xl': post.title.length >= 0 && post.title.length < 25,
        'text-2xl sm:text-5xl': post.title.length >= 26 && post.title.length < 50,
        'text-2xl sm:text-4xl': post.title.length >= 51 && post.title.length < 75,
        'text-xl sm:text-3xl': post.title.length >= 76 && post.title.length < 100,
        'text-lg sm:text-2xl': post.title.length >= 101 && post.title.length < 125,
        'text-md sm:text-xl': post.title.length >= 126,
      };
    });
};

const handleChenge = () => {
  let posts = {
    checked: !post.checked,
  };
  db.collection('posts20210530').doc(pid).set(posts, { merge: true });
};

onMount(async () => {
  pid = await window.location.pathname.split('/talking/')[1];
  await handleFetch();
});
</script>

<section class="flex w-full main-height">
  <div class="flex-1 px-5 mt-3">
    <div class="flex">
      <Link to="/">
        <button class="btn btn-primary btn rounded-lg btn-sm">一覧へ戻る</button></Link>
      {#if post.checked}
        <button
          class="btn btn-accent btn rounded-lg btn-sm ml-2"
          disabled={$admin ? false : true}
          on:click={handleChenge}>取消</button>
      {:else}
        <button
          class="btn btn-secondary btn rounded-lg btn-sm  ml-2"
          disabled={$admin ? false : true}
          on:click={handleChenge}>終了</button>
      {/if}
      <div class="flex-grow" />
    </div>
    {#if post.title !== ''}
      <div class="flex flex-col main-talk lg:w-11/12 mx-auto">
        <div class="flex-grow" />
        <p
          style="line-height: 1.4;"
          class={clsx(
            'block font-bold leading-6 text-center mb-5 whitespace-pre-line overflow-scroll bar-hidden',
            title_size
          )}>
          {post.title}
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
        <div class="flex-grow" />
      </div>
    {/if}
  </div>
</section>
