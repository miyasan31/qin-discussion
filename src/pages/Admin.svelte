<style>
.border-b-1 {
  border-bottom: 1px solid #00000022;
}
</style>

<script lang="ts">
import { Link } from 'svelte-routing';
import { db } from '../firebase/firebase';
import { TextInput, Progress } from '../components';

type PostsType = {
  pid: string;
  title: string;
  create_time: Object;
  checked: boolean;
};

let error: boolean = false;
let modal: boolean = true;
let posts: PostsType[] = [];
let password: string = '';

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

const handleAuth = async () => {
  if (password === 'miyasanismiya3') {
    modal = false;
    error = false;
    await handleFetch();
  } else {
    error = true;
  }
};

const handleClear = () => {
  error = false;
};

const handleDelete = (pid: string) => {
  db.collection('posts').doc(pid).delete();
};
</script>

<section>
  <div class="py-2 text-xl text-center border-b-1">管理者ページ</div>

  <!-- modal -->
  <input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />
  <div class="modal bg-green-100">
    <div class="modal-box bg-gray-100">
      <TextInput bind:value={password} {error} type="password" />
      <div class="flex">
        <div class="flex-grow" />
        <Link to="/">
          <button class="btn btn-outline btn-primary btn-sm modal-action"> キャンセル </button>
        </Link>
        <button class="btn btn-primary btn-sm modal-action ml-2" on:click={handleAuth}> 認証 </button>
      </div>
    </div>
  </div>

  <!-- main -->
  <div class="w-10/12 py-10 h-screen mx-auto overflow-scroll">
    {#each posts as post}
      <div class="flex items-center border-b-1">
        <div class="mx-2 py-5 ml-3 leading-none text-2xl font-bold ">
          {post.title}
        </div>
        <div class="flex-grow" />
        <button class="btn btn-accent btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}>削除</button>
      </div>
    {:else}
      <Progress />
    {/each}
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
