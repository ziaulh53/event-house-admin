<template>
    <a-spin :spinning="loading">
        <div class="grid grid-cols-4 gap-5">
            <div v-for="(url, idx) of fileList" :key="url" class="relative group">
                <img :src="url" class="w-full h-[150px]" />
                <div
                    class="absolute hidden group-hover:flex items-center justify-center top-0 w-full h-[150px] bg-slate-700 bg-opacity-60">
                    <a-button danger type="primary" @click="() => handleRemoveImage(idx)">Delete</a-button>
                </div>
            </div>
            <a-spin :spinning="uploadLoader">
                <label v-if="fileList.length <= 6" for="banner-upload"
                    class="w-full h-[150px] cursor-pointer border-dashed border-2 rounded-lg border-gray-400 flex items-center justify-center">
                    <i class="fas fa-plus"></i> Upload
                </label>
            </a-spin>
            <input id="banner-upload" type="file" class="hidden" @change="fileUpload" />
        </div>
    </a-spin>
    <div class="mt-5 text-end">
            <a-button :loading="updateLoader" type="primary" @click="onUpdate" :disabled="fileList.length === 0||updateLoader">Update</a-button>
      
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { admins, api } from '../../api';

const fileList = ref([]);
const loading = ref(false);
const uploadLoader = ref(false);
const updateLoader = ref(false);


// handle remove image
const handleRemoveImage = idx => {
    fileList.value.splice(idx, 1);
}

// file upload
const fileUpload = async (e) => {
    uploadLoader.value = true;
    try {
        const res = await api.fileUpload(e.target.files[0]);
        fileList.value = [...fileList.value, res.url];
    } catch (error) {
        console.log(error.message);
    }
    uploadLoader.value = false
}

// udate banner
const onUpdate = async () => {
    updateLoader.value=true;
    try {
        const res = await api.post(admins.banner, { banners: fileList.value });
    } catch (error) {
        console.log(error.message)
    }
    updateLoader.value=false;
}

// fetch banners
const fetchBanners = async () => {
    loading.value = true;
    const res = await api.get(admins.banner);
    fileList.value = res?.banners;
    loading.value = false
}

onMounted(() => {
    fetchBanners();
})

</script>