<script lang="ts">
import type { PostsType } from '../models/types';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput } from '../components';
import { modal } from '../store';

let error: boolean = false;
let formData: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};

const handleAdd = async () => {
  if (formData.title !== '') {
    const ref = await db.collection('qin-salon').doc('20210530').collection('posts').doc();
    const pid = ref.id;
    formData.pid = pid;
    const timestamp = FirebaseTimestamp.now();
    formData.create_time = timestamp;
    if (formData.creater_name === '') {
      formData.creater_name = '匿名さん';
    }
    db.collection('qin-salon')
      .doc('20210530')
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
const handleReset = () => {
  formData = {
    pid: '',
    title: '',
    creater_name: '',
    create_time: {},
    checked: false,
  };
  $modal = false;
  error = false;
};

const handleClose = () => {
  $modal = false;
};
</script>

<input type="checkbox" bind:checked={$modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
  <div class="w-full h-screen" on:click={handleClose} />
  <div class="fixed z-50 modal-box bg-gray-100">
    <TextInput bind:value={formData.title} type="text" bind:error />
    <TextInput bind:value={formData.creater_name} type="name" bind:error />
    <div class="flex mt-5">
      <div class="flex-grow" />
      <button class="btn btn-primary btn-outline btn-sm" on:click={handleReset}>キャンセル</button>
      <button class="btn btn-primary btn-sm ml-2" disabled={formData.title === '' ? true : false} on:click={handleAdd}
        >投稿</button>
    </div>
  </div>
</div>
