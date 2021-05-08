<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput } from '../components';

type PostsType = {
  pid: string;
  title: string;
  creater_name: string;
  create_time: Object;
  checked: boolean;
};

let tab: boolean = true;
let error: boolean = false;
let modal: boolean = false;
let finPosts: PostsType[] = [];
let yetPosts: PostsType[] = [];
let formData = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};

const handleTabYet = () => {
  tab = true;
};
const handleTabFin = () => {
  tab = false;
};

const handleFetch = () => {
  db.collection('posts')
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

const handleAdd = async () => {
  if (formData.title !== '') {
    const ref = await db.collection('posts').doc();
    const pid = ref.id;
    formData.pid = pid;
    const timestamp = FirebaseTimestamp.now();
    formData.create_time = timestamp;
    if (formData.creater_name === '') {
      formData.creater_name = '匿名さん';
    }
    db.collection('posts').doc(pid).set(formData, { merge: true });
    handleReset();
  } else {
    error = true;
  }
};

const handleReset = () => {
  formData = {
    pid: '',
    title: '',
    creater_name: '',
    create_time: {},
    checked: false,
  };
  modal = false;
  error = false;
};

const handleModal = () => {
  modal = !modal;
};

onMount(async () => {
  await handleFetch();
});
</script>

<section>
  <!-- tab -->
  <div class="w-full flex text-center text-lg cursor-pointer">
    <div
      class={`flex-1 py-2.5 border-b-1 ${
        tab ? 'font-bold border-b-2 border-primary-focus' : 'text-gray-400 hover:text-gray-300'
      }`}
      on:click={handleTabYet}>
      まだ話してない
    </div>
    <div
      class={`flex-1 py-2.5 border-b-1 ${
        !tab ? 'font-bold border-b-2 border-primary-focus' : 'text-gray-400 hover:text-gray-300'
      }`}
      on:click={handleTabFin}>
      もう話した
    </div>
  </div>

  <!-- main -->
  <div class="main-h mx-auto overflow-y-auto px-3 sm:px-14 md:px-24 lg:px-32 pb-60">
    {#if tab}
      {#each yetPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="mx-2 py-5 pl-3 text-2xl font-bold border-b-1 hover:bg-gray-50 hover:text-primary-focus">
            {post.title}
          </div>
        </Link>
      {/each}
    {:else}
      {#each finPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="mx-2 py-5 pl-3 text-2xl font-bold border-b-1 hover:bg-gray-50 hover:text-primary-focus">
            {post.title}
          </div>
        </Link>
      {/each}
    {/if}
  </div>
</section>

<!-- modal -->
<input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-gray-100">
    <TextInput bind:value={formData.title} type="text" bind:error />
    <TextInput bind:value={formData.creater_name} type="name" bind:error />
    <div class="flex">
      <div class="flex-grow" />
      <button class="btn btn-outline btn-primary btn-sm modal-action" on:click={handleReset}>キャンセル</button>
      <button class="btn btn-primary btn-sm modal-action ml-2" on:click={handleAdd}>投稿</button>
    </div>
  </div>
</div>

<!-- 右下のやつ -->
<div class="fixed right-10 bottom-10 mt-4">
  <button class="btn btn-primary modal-button sm:btn-circle px-3 sm:px-5 rounded-full" on:click={handleModal}
    ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    <span class="hidden sm:block pl-1">お題投稿</span>
  </button>
</div>
