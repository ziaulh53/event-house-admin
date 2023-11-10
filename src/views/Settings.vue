
<template>
    <Layout>
        <PageTitle title="Settings" />
        <div class="grid grid-cols-4 gap-5">
            <a-upload v-model:file-list="fileList" action="http://localhost:8000/api/file-upload" list-type="picture-card"
                :headers="{ Authorization: `Bearer ` + token }" :onChange="handleChange">
                <div v-if="fileList.length < 8">
                    <plus-outlined />
                    <div style="margin-top: 8px">Upload</div>
                </div>
            </a-upload>
        </div>
        <button @click="onUpdate">Update</button>
    </Layout>
</template>

<script setup>
import { admins, api } from '../api';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/ReUsable';
import { useAuthStore } from '../store';
import { onMounted, ref } from 'vue';

const user = useAuthStore();
const token = user?.auth?.token;
const fileList = ref([]);
const banner = ref([]);
const loading = ref(false);

const handleChange = ({ fileList: newFileList }) => {
    fileList.value = newFileList;
};

const getAllCategory = async () => {
    loading.value = true;
    banner.value = await api.get(admins.banner);
    console.log(banner.value);
    loading.value = false
}

const onUpdate = async () => {
    try {
        const images = [];
        fileList.value.forEach((file) => {
            images.push(file?.response?.url);
        });
        const res = await api.post(admins.banner, { banners: images });
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getAllCategory();
})

</script>