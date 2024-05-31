<script setup lang="ts">
import { ref, computed } from "vue";
import Button from '../Button.vue';
import ChangeImage from './ChangeImage.vue';
import { useUserStore } from '../../stores/userStore';
import profilePicture from '../../assets/images/profilePicture.png';

const userStore = useUserStore();
const user = computed(() => userStore.getUser);
const userEditStatus = computed(() => userStore.getUserEdit);

const isEdit = ref<boolean>(userEditStatus);

function openEditImageModal(){
    userStore.setEditImageStatus(true);
}
</script>

<template>
    <div class="box-component" :class="{'border': isEdit}">    
        <h1 class="title">My profile</h1> 
        <div class="image-and-status">
            <Avatar class="p-overlay-badge" :image="user.image" size="xlarge" />
            <div v-if="!isEdit" class="status">
                <label>Status</label>
                <span>
                    <i v-if="user.status" class="fa-regular fa-circle-check" style="color: var(--green);"></i>
                    <i v-else class="fa-regular fa-circle-xmark" style="color: var(--red);"></i>  
                    <p :style="{ color: user.status ? 'var(--green)' : 'var(--red)' }">{{ user.status ? 'Active' : 'Not active' }}</p>  
                </span>
            </div>         
            <div v-else class="update-profile-picture">
                <label>Upload your photo</label>
                <p>Your photo should be in PNG or JPG format</p>
                <span>
                    <ChangeImage />
                    <Button class="btn-remove" type="prime-text">Remove</Button>
                </span>
            </div>         
        </div>
        <div class="information">
            <div class="input">
                <label>First Name</label>                  
                <input v-if="isEdit" v-model="user.firstName" type="text" required>
                <p v-else>{{ user.firstName }}</p>
            </div>

            <div class="input">
                <label>Last Name</label>                
                <input v-if="isEdit" v-model="user.lastName" type="text" required>
                <p v-else>{{ user.lastName }}</p>
            </div>

            <div class="input">
                <label>User Name</label>                
                <input v-if="isEdit" v-model="user.username" type="text" required>
                <p v-else>{{ user.username }}</p>
            </div>
            
            <!-- Student only -->
            <div v-if="user.type === 'Student'" class="input">
                <label>Date of birth</label>                 
                <input v-if="isEdit" v-model="user.dateOfBirth" type="text" required>
                <p v-else>{{ user.dateOfBirth }}</p>
            </div>

            <!-- Teacher only -->
            <div v-if="user.type === 'Trainer' && !isEdit" class="input">
                <label>{{ 'Specialization' }}</label>
                <p>{{ user.specialization }}</p>
            </div>

            <div class="input">
                <label>Address</label>               
                <input v-if="isEdit" v-model="user.address" type="text" required>
                <p v-else>{{ user.address }}</p>
            </div>

            <div class="input">
                <label>Email</label>               
                <input v-if="isEdit" v-model="user.email" type="text" required>
                <p v-else>{{ user.email }}</p>
            </div>
        </div>
        <div v-if="isEdit" class="change-status">
            <label>{{status}}</label> 
            <InputSwitch v-model="user.status" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/stylesheets/components/myaccount/myaccount.scss'
</style>