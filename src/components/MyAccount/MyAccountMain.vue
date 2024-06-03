<script setup lang="ts">
import MyAccount from './MyAccount.vue';
import PeopleTable from './PeopleTable.vue';
import Button from '../Button.vue';
import { User } from '../../interface/Iuser';
import { useUserStore } from '../../stores/userStore';
import { ref, computed, onMounted } from "vue";
import API_PATHS from '../../constants/apiPaths';
import Swal from 'sweetalert2';

const userStore = useUserStore();

const user = computed(() => userStore.getUser)
const isEdit = computed(() => userStore.getUserEdit)
const visible = ref<boolean>(false);
const isMobile = computed(() => document.documentElement.clientWidth < 600);
const userCopy = ref<User>({
    firstName: '',
    username: '',
    lastName: '',
    email: '',
    specialization: '', // Only for Trainer
    dateOfBirth: '', // Only for Student
    address: '', // Only for Student
    status: true,
    type: ''
});
const token = ref<string>('');

onMounted(() => { 
    token.value = localStorage.getItem('token') as string;
})

function editProfile(){
    userCopy.value = JSON.parse(JSON.stringify(userStore.getUser));
    userStore.setUserEdit(true);
}

function cancelEdit(){
    userStore.setUser(userCopy.value);
    userStore.setUserEdit(false);
}

async function saveChanges() {
    //api to update in db
    const body = {
        user_id: localStorage.getItem('uid'),
        firstName: user.value?.firstName || "",
        lastName: user.value?.lastName || "",
        username: user.value?.username || "",
        email: user.value?.email || "",
        image: user.value?.image || "image-url",
        specialization: user.value?.specialization || "",
        dateOfBirth: user.value?.dateOfBirth || "",
        address: user.value?.address || "",
        status: user.value?.status as boolean || true
    }
    try {
        const response = await fetch(API_PATHS.users, {
        method: "PUT",
        headers: {
            'Authorization': `${token.value}`
        },
        body: JSON.stringify(body)
    })

    if(response.ok) userStore.setUserEdit(false);
    } catch (error: any) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500
        }); 
    }
}

async function deleteUser(){
    let id = localStorage.getItem('uid');
    await fetch(API_PATHS.users + "/" + id, 
    { 
        method: "DELETE",
        headers: {
            'Authorization': `${token.value}`
        },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    userStore.setEmptyUser();
}
</script>

<template>
    <h2 class="title-h2">My Account</h2>
    <div class="container" :class="{'gap-5': isEdit && user?.type === 'Trainer' && !isMobile, 'justify-content-unset': isEdit}">
        <div class="container-user-info" :class="{'width-50': isEdit && user?.type === 'Student', 'width-100': isEdit && isMobile}">
            <MyAccount />
        </div>
        <div v-if="!isEdit" class="container-table">
            <div class="container-table-top">
                <h2 class="title-h2">My {{user?.type === 'Student' ? 'Trainers' : 'Students'}}</h2>
                <Button v-if="user?.type === 'Student'" type="prime" to="/add-trainer">Add trainer</Button>
            </div>
            <PeopleTable />
        </div>
        <div v-if="isEdit && user?.type === 'Trainer'" class="specialization-edit input">
            <h2 class="title-h2">My specialization</h2>
            <select v-model="user.specialization">
                <option>Java</option>
                <option>HTML</option>
                <option>CSS</option>
                <option>Javascript</option>
            </select>
        </div>
        <div class="buttons-box" :class="{'center': isEdit}">
            <div v-if="!isEdit" class="def-buttons">
                <div class="def-buttons-left">
                    <Button type="prime" @click="editProfile()">Edit profile</Button>
                    <Button type="secondary" to="/change-password">Change password</Button>
                </div>
                <div class="def-buttons-right">
                    <Button v-if="user?.type === 'Student'" type="important" @click="visible = true" >Delete profile</Button>

                    <Dialog v-model:visible="visible" modal header="Profile Deletion Confirmation"  class="dialog-modal" :style="{ width: '38rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                        <div class="content">
                            <p class="m-0">
                                We're truly sorry to see you go. Before you proceed with deleting your profile, we want you to know that this action is permanent and irreversible. You'll lose access to all your account information, course progress, certificates, and any learning communities you're a part of. 
                            </p>
                            <p class="m-0">
                                If there's anything we can do to improve your experience or if you need assistance with any issues you've encountered, please reach out to our support team. We're always here to help.                      
                            </p>
                            <p class="m-0">
                                If you still wish to delete your account, please click on the 'Confirm' button below.
                            </p>
                            <div class="dialog-buttons">
                                <Button type="prime-text" class="dialog-buttons-cancel" @click="visible = false">Cancel</Button>
                                <Button type="important" @click="deleteUser()" to="/">Confirm</Button>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
            <div v-else class="edit-buttons">
                <Button type="prime-text" class="edit-buttons-cancel" @click="cancelEdit()">Cancel</Button>
                <Button type="prime" @click="saveChanges()">Save changes</Button>
            </div>
        </div>
   </div>
   <div v-if="!isEdit" class="trainings-box">
    <h2 class="title-h2">My Trainings</h2>
    <p>
        The Training Section is interactive, allowing you to engage with trainers and fellow learners, participate in quizzes, and track your progress. All our courses are flexible and adaptable to your schedule and learning speed.
    </p>
    <Button type="prime" to="/trainings">View trainings</Button>
   </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/myaccount/myAccountMain.scss';
</style>