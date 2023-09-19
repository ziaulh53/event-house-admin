<template>
    <Layout :loading="loading">
        <div class="mb-2">
            <h2 class="text-2xl font-semibold uppercase">Customers</h2>
            <div class="bg-theme-color h-[2px]"></div>
        </div>
        <div>
            <a-table :dataSource="allusers?.data" :columns="columns" />
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Layout } from '../components/Layout';
import { admins, api, user } from '../api';
const allusers = ref('');
const loading = ref('');


onMounted(async () => {
    loading.value = true;
    allusers.value = await api.get(admins.getAdmins);
    loading.value = false
})


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },

]



</script>