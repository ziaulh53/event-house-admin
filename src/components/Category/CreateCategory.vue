<template>
    <EShopButton btn-text="Create Category" iconClass="fa-solid fa-plus" :onclick="handleModal" />
    <a-modal v-model:open="open" title="Create new category" @ok="handleSubmit" :ok-button-props="{ disabled: disabled, loading: loading }">
        <div class="mb-5">
            <div class="mb-2 font-bold"><label>Name</label></div>
            <input type="text" class="w-full border-2 border-gray-300 rounded-lg p-2 px-4" placeholder=""
                v-model="categoryData.name" name="name" />
        </div>
        <div class="mb-5">
            <div class="mb-2 font-bold"><label>Image image</label></div>
            <div v-if="categoryData.image">
                <img :src="categoryData.image" class="h-[200px] w-[150px]" />
            </div>

            <div v-if="!categoryData.image" class="h-[200px] w-[150px] border-dashed border-2 bg-slate-100"></div>
            <div class="mt-5">
                <input type="file" :onchange="handleFile" />
            </div>
        </div>
    </a-modal>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'
import { EShopButton } from '../ReUsable';
import { admins, api } from '../../api';
import { notify } from '../../helpers';
const props = defineProps({
    refetch: Function
})
const {refetch} = toRefs(props)

const open = ref(false);

const categoryData = ref({ name: '', image: '', description:'' })
const loading = ref(false)
const disabled = computed(() => !categoryData.value.name);
const handleSubmit = async () => {
    loading.value = true;
    try {
        const res = await api.post(admins.category, {...categoryData.value})
        notify(res, refetch.value)
        open.value = false;

    } catch (error) {
    }
    loading.value = false
}

const handleFile = async (e) => {
    try {
        const res = await api.fileUpload(e.target.files[0]);
        categoryData.value = { ...categoryData.value, image: res.url }
    } catch (error) {
        console.log(error)
    }
}

const handleModal = () => {
    open.value = true;
}


</script>