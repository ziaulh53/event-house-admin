<template>
    <Layout>
        <PageTitle title="Create Subscription" />
        <div class="grid grid-cols-3 gap-5">
            <div>
                <label class="font-semibold block mb-3">Package Name</label>
                <input class="border border-gray-500 px-3 py-2 w-full rounded-lg outline-none" name="name"
                    placeholder="Package Name" v-model="state.name" />
            </div>
            <div>
                <label class="font-semibold block mb-3">Interval</label>
                <a-select class="w-full" ref="select" v-model:value="state.interval" size="large">
                    <a-select-option value="" disabled>Select Interval</a-select-option>
                    <a-select-option value="month">Monthly</a-select-option>
                    <a-select-option value="half">Half Yearly</a-select-option>
                    <a-select-option value="year">Yearly</a-select-option>
                </a-select>
            </div>
            <div>
                <label class="font-semibold block mb-3">Price</label>
                <input class="border border-gray-500 px-3 py-2 w-full rounded-lg outline-none" type="number" name="name"
                    placeholder="Package Price" v-model="state.price" />
            </div>
            <div>
                <label class="font-semibold block mb-3">Service Create Limit</label>
                <input class="border border-gray-500 px-3 py-2 w-full rounded-lg outline-none" name="name"
                    placeholder="Limit for service" v-model="state.max_service" />
            </div>
            <div>
                <label class="font-semibold block mb-3">Information Visibility</label>
                <a-select class="w-full" ref="select" v-model:value="state.contact_hide" size="large">
                    <a-select-option value="">Select Visibility</a-select-option>
                    <a-select-option value="true">Yes</a-select-option>
                    <a-select-option value="false">No</a-select-option>
                </a-select>
            </div>
            <div>
                <label class="font-semibold block mb-3">Advertisement Availablity</label>
                <a-select class="w-full" ref="select" v-model:value="state.advertise" size="large">
                    <a-select-option value="">Select Availability</a-select-option>
                    <a-select-option value="true">Yes</a-select-option>
                    <a-select-option value="false">No</a-select-option>
                </a-select>
            </div>
        </div>
        <div class="text-end mt-5">
            <button @click="handleCreate"
                class="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg disabled:bg-blue-400 cursor-pointer"
                :disabled="disabled">Create</button>
        </div>
    </Layout>
</template>

<script setup>
import { api, subscriptionEndpoint } from '../api';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/ReUsable';
import { ref, computed } from 'vue';
import { notify } from '../helpers';
import { useRouter } from 'vue-router'

const router = useRouter();

const state = ref({
    name: "",
    price: "",
    interval: "",
    max_service: "",
    advertise: "",
    contact_hide: "",
});

const disabled = computed(() => !state.value.name || !state.value.price
    || !state.value.interval
    || !state.value.max_service
    || !state.value.contact_hide
    || !state.value.advertise
);

const handleCreate = async () => {
    const data = {
        ...state.value,
    }
    data.contact_hide = Boolean(data.contact_hide);
    data.advertise = Boolean(data.advertise);
    if (data.interval === 'half') data.interval = 'month';
    data.interval_count = 1;
    try {
        const res = await api.post(subscriptionEndpoint.create, { ...data });
        notify(res, router.back())
    } catch (error) {
        console.log(error.message);
    }
}

</script>