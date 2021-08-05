<script lang="ts">
import type { PostsType } from '../models/types';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput } from '../components';
import { modal, event } from '../store';

let error: boolean = false;
let title: string = '';
let creater_name: string = '';

const handleAdd = async () => {
  if (title.trim() !== '') {
    const ref = await db.collection('qin-salon').doc($event).collection('posts').doc();
    let formData: PostsType = {
      pid: ref.id,
      title: title.trim(),
      creater_name: creater_name.trim(),
      create_time: FirebaseTimestamp.now(),
      checked: false,
    };
    if (formData.creater_name === '') {
      formData.creater_name = '匿名さん';
    }
    db.collection('qin-salon')
      .doc($event)
      .collection('posts')
      .doc(ref.id)
      .set(formData, { merge: true })
      .then(() => {
        handleReset();
      })
      .catch(() => {
        error = true;
      });
  }
};
const handleReset = () => {
  modal.update((store_modal) => (store_modal = false));
  title = '';
  creater_name = '';
  error = false;
};

const handleClose = () => modal.update((store_modal) => (store_modal = false));
</script>

<input type="checkbox" bind:checked={$modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
  <div class="w-full h-screen bg-primary bg-opacity-5" on:click={handleClose} />
  <div class="fixed z-50 modal-box bg-base-content">
    <TextInput
      text_type="textarea"
      type="text"
      color="primary"
      bind:value={title}
      bind:error
      placeholder="お題を入力" />
    <TextInput
      text_type="input"
      type="text"
      color="primary"
      bind:value={creater_name}
      bind:error
      placeholder="お名前（未入力の場合は匿名参加）" />
    <div class="flex justify-end mt-5">
      <button class="btn btn-primary btn-outline btn-sm hover:shadow" on:click={handleReset}>キャンセル</button>
      <button class="btn btn-primary btn-sm ml-2 shadow" on:click={handleAdd}>投稿</button>
    </div>
  </div>
</div>
