<template>
  <div>
    <Button class="btn-add" type="prime-text" @click="showDialog = true">Change image</Button>
    
    <Dialog header="Upload files" v-model:visible="showDialog" modal closable style="width: 40rem;" :pt="{
        root: 'border-none',
        header: {
            style: 'padding: 1rem;'
        }
    }">
      <div class="upload-container">
        <div class="upload-dropzone" @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
            <input type="file" accept="image/png, image/jpeg" @change="handleFileSelect" style="display: none;" ref="fileInput" />
            <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="preview-image" @click="triggerFileInput" />
            <div v-else class="no-image-selected">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <h2>Drop files here</h2>
                <p>Supported format: PNG, JPG</p>
                <p>OR</p>     
                <span>Browse files</span>
            </div>
        </div>       
      </div>
      <div class="dialog-footer">
        <Button type="prime-text" class="close" @click="closeDialog" >Cancel</Button>
        <Button type="prime" @click="uploadFiles" >Upload</Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '../Button.vue';
import Dialog from 'primevue/dialog';

// State variables
const showDialog = ref(false);
const selectedFiles = ref([]);
const previewUrl = ref(null);

const closeDialog = () => {
    selectedFiles.value = [];
    previewUrl.value = null;
    showDialog.value = false;
}

// Event handlers
const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectedFiles.value = [...event.dataTransfer.files];
    if (selectedFiles.value.length > 0) {
        selectedFiles.value = [...selectedFiles.value];
        previewUrl.value = URL.createObjectURL(selectedFiles.value[0]);
    }
};

const handleFileSelect = (event) => {
    selectedFiles.value = [...event.target.files];
    if (selectedFiles.value.length > 0) {
        selectedFiles.value = [...selectedFiles.value];
        previewUrl.value = URL.createObjectURL(selectedFiles.value[0]);
    }
};

const triggerFileInput = () => {
    document.querySelector('input[type="file"]').click();
};

const uploadFiles = () => {
    console.log('Files to upload:', selectedFiles.value);
    //after insertined into bucket
    selectedFiles.value = [];
    previewUrl.value = null;
    showDialog.value = false;
};
</script>

<style lang="scss" scoped>
.btn-add{
    border: 1px solid #6355D8FF;
    border-radius: 4px;
    font-family: var(--popins);
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    height: 32px;
    padding: 0 8px;
}

.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
}

.upload-dropzone {
    width: 100%;
    height: 19rem;
}

.upload-dropzone img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.upload-dropzone .no-image-selected {
    height: 100%;
    padding: 20px;
    border: 2px dashed #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    gap: 1rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
}

.upload-dropzone .no-image-selected i {
    font-size: 5rem;
    opacity: 0.5;
    color: #888;
}

.upload-dropzone .no-image-selected p {
    margin: 5px 0;
}

.upload-dropzone .no-image-selected h2 {
    margin: unset;
}

.upload-dropzone .no-image-selected span{
    color: var(--black);
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 1rem;

    .close{
        color: var(--black);
    }
}
</style>
