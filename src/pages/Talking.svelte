<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput, Progress } from '../components';

type PostsType = {
  pid: string;
  title: string;
  create_time: Object;
  checked: boolean;
};

let pid = '';
let post: PostsType = {
  pid: '',
  title: '',
  create_time: {},
  checked: false,
};
let sucses = false;

const handleFetch = () => {
  db.collection('posts')
    .doc(pid)
    .onSnapshot((doc) => {
      post = doc.data() as PostsType;
    });
};

const handleDone = () => {
  let formData = {
    checked: true,
  };
  db.collection('posts').doc(pid).set(formData, { merge: true });
};

const handleNone = () => {
  let formData = {
    checked: false,
  };
  db.collection('posts').doc(pid).set(formData, { merge: true });
};

onMount(async () => {
  pid = await window.location.pathname.split('/talking/')[1];
  await handleFetch();
});
</script>

<p class="text-2xl text-center align-bottom pt-4">話中のやつ</p>
<hr />

<div class="flex mt-5 mr-10">
  <div class="flex-grow" />
  <button class="btn btn-accent btn rounded-lg btn-sm" on:click={handleDone}>削除</button>
  <button class="btn btn-secondary btn rounded-lg btn-sm" on:click={handleDone}>完了</button>
</div>

{#if post.title !== ''}
  <div class="h-96 m-10 card bg-green-200 border-gray-500 shadow-lg">
    {#if post.checked}
      <button class="absolute top-2 right-2 btn btn-circle btn-ghost" on:click={handleNone}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    {/if}
    <div class="card-body flex justify-center items-center">
      <div class="card-title text-6xl text-center">
        {post.title}
      </div>
    </div>
  </div>
{:else}
  <Progress />
{/if}

<div class="fixed z-20 right-10 bottom-10 mt-4">
  <Link to="/"
    ><label for="my-modal-2" class="btn btn-primary modal-button px-6 rounded-full"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 pr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>一覧へ戻る</label
    ></Link>
</div>
