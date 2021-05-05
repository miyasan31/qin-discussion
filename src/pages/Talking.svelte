<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput, Progress } from '../components';

type PostsType = {
  pid: string;
  title: string;
  creater_name: string;
  create_time: Object;
  checked: boolean;
};

let pid = '';
let post: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};

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

<section>
  <div class="w-11/12 py-10 mx-auto">
    <div class="flex">
      <div class="flex-grow" />
      {#if post.checked}
        <button class="btn btn-accent btn rounded-lg btn-sm" on:click={handleNone}>未完了</button>
      {:else}
        <button class="btn btn-secondary btn rounded-lg btn-sm ml-2" on:click={handleDone}>完了</button>
      {/if}
    </div>

    {#if post.title !== ''}
      <div class="relative mt-14 p-5 pt-10 bg-green-100 border-gray-500 rounded-lg shadow-lg">
        {#if post.checked}
          <div class="absolute top-2 right-2 ">
            <button class="btn btn-circle btn-ghost" on:click={handleNone}
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
          </div>
        {/if}
        <div class="text-6xl font-bold text-center my-5 pt-8">
          {post.title}
        </div>
        <div class="flex">
          <div class="flex-grow" />
          <div class="bg-primary-content rounded-full text-lg font-bold py-2 px-5">
            {post.creater_name}
          </div>
        </div>
      </div>
    {:else}
      <Progress />
    {/if}
  </div>
</section>

<!-- 右下のやつ -->
<div class="fixed z-20 right-10 bottom-10 mt-4">
  <Link to="/"
    ><label for="my-modal-2" class="btn btn-primary modal-button rounded-full"
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
