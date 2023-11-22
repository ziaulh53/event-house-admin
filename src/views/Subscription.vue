<template>
    <Layout>
        <PageTitle title="Subscription" />
        <div class="my-5">
            <router-link to="/create-subscription" class="py-2 px-10 bg-blue-500 text-white rounded-md">Create
                Subscription</router-link>
        </div>
        <div class="grid grid-cols-4 gap-5">
            <div v-for="data of packages" :key="data.id">
                <SingleSubscription :data="data" :refetch="fetchSubscrtion" />
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/ReUsable';
import { api, subscriptionEndpoint } from '../api';
import { SingleSubscription } from '../components/Subscription';

const loading = ref(false);
const packages = ref([]);

const fetchSubscrtion = async () => {
    loading.value = true;
    try {
        const res = await api.get(subscriptionEndpoint.getSubscription);
        packages.value = res?.plans;
    } catch (error) {
        console.log(error.message);
    }
    loading.value = false;
}
onMounted(() => {
    fetchSubscrtion();
})

</script>