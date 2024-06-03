<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import Bradcrumbers from '../components/Bradcrumbers.vue';
import PeopleTable from '../components/MyAccount/PeopleTable.vue';
import API_PATHS from '../constants/apiPaths';
import { useRouter } from "vue-router";
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.getUser);

const $router = useRouter();

const tableWidth = document.documentElement.clientWidth < 600 ? "width: 23rem;": "width: 28rem;";
const firstHeaderWidth = document.documentElement.clientWidth < 600 ? 180 : 200;
const secondHeaderWidth = document.documentElement.clientWidth < 600 ? 160 : 200;

const token = ref<string>('');

// Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { field: "Name", width: firstHeaderWidth},
    { field: "Specialization", secondHeaderWidth}
 ]);

// Table rows
const rowDataStudent = ref([]);

 // Selected rows
const selectedRows = ref([]);

// Function to handle row selection
const onSelectionChanged = (event: any) => {
  selectedRows.value = event.api.getSelectedRows();
};

// Function to log selected rows
const logSelectedRows = async () => {
    let user_id = localStorage.getItem('uid');
    try {
        await Promise.all(selectedRows.value.map(async (row: any) => {
            const body = {
                student_id: user_id,
                trainer_id: row.ID
            };

            const response = await fetch(API_PATHS.users + "/connection", {
                method: "POST",
                headers: {
                    'Authorization': `${token.value}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error(`Error fetching user data: ${response.status}`);
            // Use filter to remove the processed row
            user?.value?.connections?.push({ name: row.Name, status: true, specialization: row.Specialization } as never);
            rowDataStudent.value = rowDataStudent.value.filter((row: any) => row.id !== row.ID);
        }));

        $router.push('/my-account');
    } catch (error: any) {
        console.error(error.message);
    }
};

onMounted(async () => {
    window.scrollTo(0,0);

    token.value = localStorage.getItem('token') as string;

    try {
        const response = await fetch(API_PATHS.users + "/type/Trainer", 
        { 
            method: "GET",
            headers: {
                'Authorization': `${token.value}`
            },
        });
        if (!response.ok) throw new Error(`Error fetching user data: ${response.status}`);
        
        const userData = await response.json();

        let myTrainers = user?.value?.connections?.map((trainer: any) => trainer.name) || [];

        // Filtering userData and mapping the required fields
        rowDataStudent.value = userData
            .filter((user: any) => user.status === true)
            .filter(({ firstName, lastName }: any) => !myTrainers.includes(`${firstName} ${lastName}`))
            .map(({ user_id, firstName, lastName, specialization }: any) => ({
                ID: user_id,
                Name: `${firstName} ${lastName}`,
                Specialization: specialization
            })) || []; 
    } catch (error: any) {
        console.error(error.message);
    }
})
</script>

<template>
    <Header />

    <Bradcrumbers />

    <h2 class="title-h2">Add trainer</h2>
    <div class="info-box">
        <div class="info-box-text">
            <p>
                Please select trainers for adding them into your trainers list
                * - There is no possibility to remove the trainer. 
            </p>
        </div>
    </div>

    <div class="container">
        <div class="container-left">
            <h2 class="title-h2">All Trainers</h2>
            <AgGridVue
                :rowData="rowDataStudent"
                :columnDefs="colDefs"
                :style="tableWidth"
                :rowHeight="65"
                domLayout='autoHeight'
                class="ag-theme-quartz"
                rowSelection="multiple"
                @selection-changed="onSelectionChanged"
            >
            </AgGridVue>
            <Button @click="logSelectedRows">Add</Button>
        </div>
        <div class="container-right">
            <h2 class="title-h2">My Trainers</h2>
            <PeopleTable />
        </div>
    </div>

   <Footer />
</template>

<style lang="scss" scoped>
@import '../assets/stylesheets/views/addTrainerView.scss';
</style>