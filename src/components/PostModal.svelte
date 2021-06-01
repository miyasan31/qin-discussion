<script lang="ts">
import type { PostsType } from '../models/types';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput } from '../components';
import { modal, event } from '../store';

let error: boolean = false;
let formData: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};

const handleAdd = async (): Promise<void> => {
  if (formData.title !== '') {
    const ref = await db.collection('qin-salon').doc($event).collection('posts').doc();
    const pid = ref.id;
    formData.pid = pid;
    const timestamp = FirebaseTimestamp.now();
    formData.create_time = timestamp;
    if (formData.creater_name === '') {
      formData.creater_name = '匿名さん';
    }
    db.collection('qin-salon')
      .doc($event)
      .collection('posts')
      .doc(pid)
      .set(formData, { merge: true })
      .then(() => {
        handleReset();
      })
      .catch(() => {
        error = true;
      });
  } else {
    error = true;
  }
};
const handleReset = (): void => {
  formData = {
    pid: '',
    title: '',
    creater_name: '',
    create_time: {},
    checked: false,
  };
  modal.update((store_modal) => (store_modal = false));
  error = false;
};

const handleClose = (): void => {
  modal.update((store_modal) => (store_modal = false));
};
</script>

<input type="checkbox" bind:checked={$modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
  <div class="w-full h-screen" on:click={handleClose} />
  <div class="fixed z-50 modal-box bg-gray-100">
    <TextInput text_type="textarea" type="text" bind:value={formData.title} bind:error placeholder="お題を入力" />
    <TextInput
      text_type="input"
      type="text"
      bind:value={formData.creater_name}
      bind:error
      placeholder="お名前（未入力の場合は匿名参加）" />
    <div class="flex justify-end mt-5">
      <button class="btn btn-primary btn-outline btn-sm" on:click={handleReset}>キャンセル</button>
      <button class="btn btn-primary btn-sm ml-2" disabled={formData.title === '' ? true : false} on:click={handleAdd}
        >投稿</button>
    </div>
  </div>
</div>
