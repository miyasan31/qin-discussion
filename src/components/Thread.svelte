<script lang="ts">
import { onMount } from 'svelte';
import type { CommetsType } from '../models/types';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { name, thread, event_name } from '../store';

let comments: CommetsType[] = [];
let message: CommetsType = {
  cid: '',
  text: '',
  creater_name: '',
  create_time: {},
};

const handleFetchComments = () => {
  db.collection('qin-salon')
    .doc($event_name)
    .collection('comments')
    .orderBy('create_time', 'desc')
    .onSnapshot((snapshot) => {
      let cmt = [];
      snapshot.forEach((doc) => {
        cmt.push({ ...doc.data() });
      });
      comments = cmt;
    });
};

const handleSend = () => {
  if (message.text !== '') {
    const ref = db.collection('qin-salon').doc($event_name).collection('comments').doc();
    const cid = ref.id;
    message.cid = cid;

    const timestamp = FirebaseTimestamp.now();
    message.create_time = timestamp;
    message.creater_name = $name;
    db.collection('qin-salon').doc($event_name).collection('comments').doc().set(message);
    handleReset();
  }
};

const handleToggle = () => {
  thread.update((store_thread) => !store_thread);
};

const handleReset = () => {
  message = {
    cid: '',
    text: '',
    creater_name: '',
    create_time: {},
  };
};

onMount(async () => {
  await handleFetchComments();
});
</script>

<section class="w-full">
  <div class="flex flex-col main-height border-l-1">
    <div class="flex items-center border-b-1">
      <p class="m-0 pl-3 py-3.5 font-bold text-sm border-t-1-none">ディスカッションに参加しよう！</p>
      <div class="flex-grow" />
      <button class="btn btn-ghost btn-util" on:click={handleToggle}
        >閉じる<svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg></button>
    </div>

    <div class="flex-grow flex flex-col-reverse overflow-scroll overflow-x-hidden">
      {#each comments as comment}
        {#if comment.text.lastIndexOf('？') === -1}
          <div class="mx-2 mb-2">
            <div class="chat-msg font-bold pl-1 text-sm">
              {comment.creater_name}
            </div>
            <div class="chat-msg bg-gray-100 px-3 py-1.5 text-md rounded-xl whitespace-pre-line">
              {comment.text.trim()}
            </div>
          </div>
        {:else}
          <div class="mx-2 mb-2">
            <div class="chat-msg font-bold pl-1 text-sm">
              {comment.creater_name}
            </div>
            <div class="chat-msg bg-green-100 px-3 py-1.5 text-md rounded-xl whitespace-pre-line">
              {comment.text}
            </div>
          </div>
        {/if}
      {/each}
    </div>
    <div class="flex space-x-2 border-t-1 p-2 pb-3 bg-gray-50">
      <textarea
        type="text"
        bind:value={message.text}
        placeholder={`${$name}からメッセージを送信`}
        multiple
        class="w-full pt-4 input input-primary input-bordered leading-tight resize-y resize-label" />
      <button class="btn btn-primary" disabled={message.text === '' ? true : false} on:click={handleSend}>送信</button>
    </div>
  </div>
</section>
