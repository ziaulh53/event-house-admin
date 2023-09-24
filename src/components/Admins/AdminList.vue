<template>
    <a-table :dataSource="data" :columns="columns">
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'avatar'">
                <img :src="record?.avatar" class="w-[70px] h-[70px]" />
            </template>
            <template v-if="column.key === 'action'">
                <div class="flex">
                    <a-popconfirm title="Are you sure?" ok-type="danger" @confirm="() => handleDeleteAdmin(record?.id)">
                        <span class="text-red-600 cursor-pointer">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </a-popconfirm>
                    <span class="ml-3" @click="() => handleEditAdmin(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                </div>
            </template>
        </template>
    </a-table>
    <a-modal v-model:open="open" title="'Edit Admin" @ok="onUpdateAdmin">
        <EShopInput label="Name" placeholder="Name" v-model="adminData.name" />
        <EShopInput label="Email" placeholder="Email" v-model="adminData.email" />
        <EShopInput label="Password" type="password" placeholder="* * * * *" v-model="adminData.password" />
        <div>
            <img class="w-[70px] h-[70px]" :src="adminData.avatar" />
            <input type="file" @change="handleUploadFile" />
        </div>
    </a-modal>
</template>

<script setup>
import { toRefs, ref } from 'vue';
import { admins, api } from '../../api';
import { notify } from '../../helpers';
import { EShopInput } from '../ReUsable';

const props = defineProps({
    data: Array,
    refetch: Function
})

const open = ref(false);
const adminData = ref({});

const { data, refetch } = toRefs(props);
console.log(data.value)

const handleDeleteAdmin = async (id) => {
    try {
        const res = await api.delete(admins.admins, id);
        notify(res, refetch.value)
    } catch (error) {
        console.log(error)
    }
}

const handleEditAdmin = (data) => {
    adminData.value = {
        ...data
    }
    open.value = true;
}
const handleClear = ()=>{
    open.value = false;
    adminData.value = {};
}
const onUpdateAdmin = async ()=>{
    try {
        const res = await api.put(admins.admins, adminData?.value.id, {...adminData?.value})
        notify(res, refetch.value, handleClear)
    } catch (error) {
        console.log(error)
    }
}

const columns = [
    {
        title: 'Image',
        key: 'avatar',
    },
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
    {
        title: 'Action',
        key: 'action',
    },
]
</script>