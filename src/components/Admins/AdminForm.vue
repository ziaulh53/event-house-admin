<template>
    <button class="btn-class" @click="handleModal">Add Admin</button>

    <a-modal v-model:open="open" :title="adminState?.id ? 'Edit Admin' : 'Add New Admin'" :after-close="handleCancelModal"
        @ok="onAddAdmin">
        <EShopInput label="Name" placeholder="Name" v-model="adminState.name" />
        <EShopInput label="Email" placeholder="Email" v-model="adminState.email" />
        <EShopInput label="Password" type="password" placeholder="* * * * *" v-model="adminState.password" />
        <div>
            <img class="w-[70px] h-[70px]" :src="adminState.avatar" />
            <input type="file" @change="handleUploadFile" />
        </div>
    </a-modal>
</template>

<script setup>
import { toRefs, ref } from 'vue';
import { EShopInput } from '../ReUsable';
import { admins, api } from '../../api';
import { notify } from '../../helpers';


const props = defineProps({
    adminData: Object,
    refetch: Function,
})

const { adminData, refetch } = toRefs(props);

const adminState = ref({
    name: adminData.value?.name || "",
    email: adminData.value?.email || "",
    password: adminData.value?.password || "",
    avatar: adminData?.value?.avatar || ""
});
const open = ref(false);
const handleModal = () => {
    open.value = true;
}
const handleCancelModal = () => {
    adminState.value = {};
    open.value= false;
}

const handleUploadFile = async (e) => {
    try {
        const res = await api.fileUpload(e.target.files[0]);
        adminState.value.avatar = res.url;
    } catch (error) {
        console.log(error)

    }
}

// add admin
const onAddAdmin = async () => {
    try {
        const res = await api.post(admins.admins, { ...adminState.value });
        notify(res, refetch.value, handleCancelModal);
    } catch (error) {
        conbsole.log(error)
    }
}

</script>