<template>
    <a-card hoverable class="w-full">
        <template #actions>
            <a-popconfirm title="Are you sure?" ok-type="danger" @confirm="() => deletePackage(data?.id)">
                <span class="text-red-600">
                    <i class="fas fa-trash"></i>
                </span>
            </a-popconfirm>
            <span><i class="fas fa-pencil"></i></span>
        </template>
        <h2 class="text-3xl text-center font-bold">{{ data?.name }}</h2>
        <p class="text-center"><span class="text-2xl">USD {{ data?.price?.toFixed(2) }}</span> per {{ data?.interval
        }}</p>
        <div class="my-5">
            <div class="flex justify-between items-center mb-3">
                <p>Service Limit</p>
                <p>{{ data?.max_service }}</p>
            </div>
            <div class="flex justify-between items-center mb-3">
                <p>Contact Visiblity</p>
                <p>{{ data?.contact_hide ? "No" : "Yes" }}</p>
            </div>
            <div class="flex justify-between items-center">
                <p>Advertisement</p>
                <p>{{ data?.advertise ? 'No' : "Yes" }}</p>
            </div>
        </div>
    </a-card>
</template>

<script setup>
import { toRefs } from 'vue';
import { api, subscriptionEndpoint } from '../../api';
import { notify } from '../../helpers';
const props = defineProps({
    data: Object,
    refetch: Function
})
const { data, refetch } = toRefs(props);

const deletePackage = async (id) => {
    try {
        const res = await api.delete(subscriptionEndpoint.delete, id);
        if (res?.success) {
            notify(res, refetch.value)
        }
    } catch (error) {
        console.log(error.message)
    }
}

</script>