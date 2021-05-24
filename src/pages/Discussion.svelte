<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import type { PostsType } from '../models/types';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput, AddPostButton } from '../components';

let tab: boolean = true;
let error: boolean = false;
let modal: boolean = false;
let finPosts: PostsType[] = [];
let yetPosts: PostsType[] = [];
let formData: PostsType = {
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
  db.collection('posts20210530')
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
    const ref = await db.collection('posts20210530').doc();
    const pid = ref.id;
    formData.pid = pid;
    const timestamp = FirebaseTimestamp.now();
    formData.create_time = timestamp;
    if (formData.creater_name === '') {
      formData.creater_name = '匿名さん';
    }
    db.collection('posts20210530').doc(pid).set(formData, { merge: true });
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

onMount(async () => {
  await handleFetch();
});
</script>

<section class="relative">
  <AddPostButton bind:modal />

  <div class="w-full flex cursor-pointer">
    <div class="tab-base" class:tab-active={tab} on:click={handleTabYet}>まだ話してない</div>
    <div class="tab-base" class:tab-active={!tab} on:click={handleTabFin}>もう話した</div>
  </div>
  <div class="main-h mx-auto overflow-y-auto pb-60">
    {#if tab}
      {#each yetPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="title-list">
            {post.title}
          </div>
        </Link>
      {/each}
    {:else}
      {#each finPosts as post}
        <Link to={`/talking/${post.pid}`}>
          <div class="title-list">
            {post.title}
          </div>
        </Link>
      {/each}
    {/if}
  </div>
</section>

<input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-gray-100">
    <TextInput bind:value={formData.title} type="text" bind:error />
    <TextInput bind:value={formData.creater_name} type="name" bind:error />
    <div class="flex">
      <div class="flex-grow" />
      <button class="btn btn-primary btn-outline mt-5" on:click={handleReset}>キャンセル</button>
      <button class="btn btn-primary mt-5 ml-2" disabled={formData.title === '' ? true : false} on:click={handleAdd}
        >投稿</button>
    </div>
  </div>
</div>
