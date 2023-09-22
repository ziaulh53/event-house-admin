<template>
    <Layout :loading="loading">
        <div class="mb-2">
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-2xl font-semibold uppercase">Admins</h2>
                <AdminForm :refetch="fetchAllAdmin"/>
            </div>
            <div class="bg-theme-color h-[2px]"></div>
        </div>
        <div>
           <AdminList :refetch="fetchAllAdmin" :data="allAdmins?.data"/>
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Layout } from '../components/Layout';
import { admins, api, } from '../api';
import {AdminForm, AdminList} from '../components/Admins';
const allAdmins = ref('');
const loading = ref('');


const fetchAllAdmin = async () => {
    loading.value = true;
    allAdmins.value = await api.get(admins.admins);
    loading.value = false
}

onMounted(() => {
    fetchAllAdmin();
})



</script>