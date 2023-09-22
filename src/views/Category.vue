<template>
    <Layout>
        <div class="mb-2">
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-2xl font-semibold uppercase">Categories</h2>
                <!-- <AdminForm :refetch="fetchAllAdmin"/> -->
                <CreateCategory :refetch="getAllCategory"/>
            </div>
            <div class="bg-theme-color h-[2px]"></div>
        </div>
        <a-spin :spinning="loading">
            <div class="grid grid-cols-4 gap-5">
                <CategoryItem v-for="category of allCategory.data" :key="category.id" :data="category"
                    :refetch="getAllCategory" />
            </div>
        </a-spin>
    </Layout>
</template>

<script setup>
import { Layout } from '../components/Layout';
import { CategoryItem, CreateCategory } from '../components/Category'
import { admins, api, category } from '../api';
import { onMounted, ref } from 'vue';

const allCategory = ref('');
const loading = ref(false);


const getAllCategory = async () => {
    loading.value = true;
    allCategory.value = await api.get(admins.category);
    loading.value = false
}

onMounted(() => {
    getAllCategory();
})

</script>