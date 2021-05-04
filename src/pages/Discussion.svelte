<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput, Progress } from '../components';

type PostsType = {
  pid: string;
  title: string;
  create_time: Object;
};

let tab: boolean = true;
let modal: boolean = false;
let posts: PostsType[] = [];
let formData = {
  pid: '',
  title: '',
  create_time: {},
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
      let docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      posts = [...docs];
    });
};

const handleAdd = async () => {
  const timestamp = FirebaseTimestamp.now();
  formData.create_time = timestamp;
  if (!formData.pid) {
    const ref = await db.collection('posts').doc();
    const pid = ref.id;
    formData.pid = pid;
  }
  if (formData.pid) {
    db.collection('posts').doc(formData.pid).set(formData, { merge: true });
    handleReset();
  }
};

const handleEdit = async (pid: string) => {
  modal = true;
  const snapshot = await db.collection('posts').doc(pid).get();
  const post = snapshot.data();
  formData = {
    pid: post.pid,
    title: post.title,
    create_time: {},
  };
};

const handleDelete = (pid: string) => {
  db.collection('posts').doc(pid).delete();
};

const handleReset = () => {
  formData = {
    pid: '',
    title: '',
    create_time: {},
  };
};

onMount(async () => {
  await handleFetch();
});
</script>

<!-- ------------------------------------------------------------------- -->

<main class="">
  <div class="tabs">
    <div class={`tab tab-bordered tab-lg w-1/2 ${tab ? 'tab-active' : ''}`} on:click={handleTabYet}>
      終わってないやつ
    </div>
    <div class={`tab tab-bordered tab-lg w-1/2 ${!tab ? 'tab-active border-blue-500' : ''}`} on:click={handleTabFin}>
      終わったやつ
    </div>
  </div>

  <div class="fixed right-10 bottom-10 mt-4">
    <label for="my-modal-2" class="btn btn-primary modal-button px-6 rounded-full"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 pr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>お題投稿</label>
  </div>

  <input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />

  <div class="modal">
    <div class="modal-box  bg-gray-50">
      <TextInput bind:value={formData.title} />
      <div class="flex">
        <div class="flex-grow" />
        <button class="btn btn-outline btn-primary btn-sm modal-action" on:click={handleReset}>
          <label for="my-modal-2">キャンセル</label>
        </button>
        <button class="btn btn-primary btn-sm modal-action" on:click={handleAdd}>
          <label for="my-modal-2">投稿</label>
        </button>
      </div>
    </div>
  </div>

  {#if tab}
    <div class="w-3/4 h-screen mx-auto">
      <div>
        {#each posts as post}
          <div class="card border-gray-500 shadow my-5">
            <div class="card-body">
              <div class="card-title">
                {post.title}
              </div>
              <div class="flex">
                <Link to={`/talking/${post.pid}`}>
                  <button class="btn btn-primary btn-sm rounded-lg">選択</button>
                </Link>
                <button class="btn btn-secondary btn-sm rounded-lg" on:click={() => handleEdit(post.pid)}>編集</button>
                <button class="btn btn-accent btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}>削除</button>
              </div>
            </div>
          </div>
        {:else}
          <Progress />
        {/each}
      </div>
    </div>
  {:else}
    <div class="w-3/4 h-screen mx-auto">
      <div>
        {#each posts as post}
          <div class="card border-gray-500 shadow my-5">
            <div class="card-body">
              <div class="card-title">
                {post.title}
              </div>
              <div class="flex">
                <button class="btn btn-accent btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}>削除</button>
              </div>
            </div>
          </div>
        {:else}
          <Progress />
        {/each}
      </div>
    </div>
  {/if}
</main>
