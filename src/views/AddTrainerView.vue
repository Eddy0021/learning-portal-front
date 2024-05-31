<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import Button from '../components/Button.vue';
import Bradcrumbers from '../components/Bradcrumbers.vue';
import PeopleTable from '../components/MyAccount/PeopleTable.vue';

import { ref, computed, onMounted } from "vue";

const tableWidth = document.documentElement.clientWidth < 600 ? "width: 23rem;": "width: 28rem;";
const firstHeaderWidth = document.documentElement.clientWidth < 600 ? 180 : 200;
const secondHeaderWidth = document.documentElement.clientWidth < 600 ? 160 : 200;

// Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { field: "Name", width: firstHeaderWidth},
    { field: "Specialization", secondHeaderWidth}
 ]);

// fake api for student
const rowDataStudent = ref([
   { Name: "Caleb Jones", Specialization: "Python" },
   { Name: "Javier Ortiz", Specialization: "HTML" },
   { Name: "Brandon Taylor", Specialization: "CSS" },
   { Name: "Elizabeth Allen", Specialization: "Rust" },
   { Name: "Elizabeth Watson", Specialization: "Go Lang" },
 ]);

 // Selected rows
const selectedRows = ref([]);

// Function to handle row selection
const onSelectionChanged = (event) => {
  selectedRows.value = event.api.getSelectedRows();
};

// Function to log selected rows
const logSelectedRows = () => {
  console.log(selectedRows.value);
};

onMounted(() => {
    window.scrollTo(0,0);
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