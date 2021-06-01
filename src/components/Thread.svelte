<script lang="ts">
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { name, thread, event } from '../store';
import type { SnapshotType } from '../firebase/firebase';
import type { CommetsType } from '../models/types';

let text: string = '';
let comments: CommetsType[] = [];

const handleFetchComments = (): void => {
  db.collection('qin-salon')
    .doc($event)
    .collection('comments')
    .orderBy('create_time', 'desc')
    .onSnapshot((snapshot: SnapshotType) => {
      let cmt: CommetsType[] = [];
      snapshot.forEach((doc) => {
        cmt.push({ ...(doc.data() as CommetsType) });
      });
      comments = cmt;
    });
};

const handleSend = async (): Promise<void> => {
  if (text !== '') {
    const ref = await db.collection('qin-salon').doc($event).collection('comments').doc();
    let send_comments: CommetsType = {
      cid: ref.id,
      text: text.trim(),
      creater_name: $name,
      create_time: FirebaseTimestamp.now(),
    };
    await db.collection('qin-salon').doc($event).collection('comments').doc().set(send_comments);
    await handleReset();
  }
};

const handleReset = (): void => {
  text = '';
};

const handleToggle = (): void => {
  thread.update((store_thread) => !store_thread);
};

onMount(
  async (): Promise<void> => {
    await handleFetchComments();
  }
);
</script>

<section class="w-full">
  <div class="flex flex-col main-height border-l-1">
    <div class="flex items-center border-b-1">
      <p class="m-0 pl-3 py-3 md:py-3.5 font-bold text-xs md:text-sm border-t-1-none overflow-ellipsis">
        ディスカッションに参加しよう！
      </p>
      <div class="flex-grow" />
      <button class="btn btn-ghost btn-xs md:btn-sm mr-4" on:click={handleToggle}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 -mx-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg></button>
    </div>

    <div class="flex-grow flex flex-col-reverse overflow-scroll overflow-x-hidden">
      {#each comments as comment}
        <div class="mx-2 mb-2">
          <div class="font-bold pl-1 text-sm">
            {comment.creater_name}
          </div>
          <div
            class="chat-msg bg-gray-100 px-3 py-1.5 rounded-xl text-md whitespace-pre-line"
            class:bg-green-100={comment.text.lastIndexOf('？') !== -1}>
            {comment.text}
          </div>
        </div>
      {/each}
    </div>
    <div class="flex space-x-2 border-t-1 p-2 pb-3 bg-gray-50">
      <textarea
        type="text"
        bind:value={text}
        placeholder={`${$name}からメッセージを送信`}
        multiple
        class="w-full pt-4 input input-primary input-bordered leading-tight resize-y resize-label" />
      <button class="btn btn-primary" disabled={text.trim() === '' ? true : false} on:click={handleSend}>送信</button>
    </div>
  </div>
</section>
