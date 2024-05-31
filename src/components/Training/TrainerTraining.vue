<script setup>
import Header from '../Header.vue';
import Footer from '../Footer/Footer.vue';
import Button from '../Button.vue';
import Bradcrumbers from '../Bradcrumbers.vue';

import { ref, computed } from "vue";

const dateFrom = ref('');
const dateTo = ref('');

const tableWidth = document.documentElement.clientWidth < 600 ? "width: 20rem;": "width: 80rem;";

// Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
    { field: "Date"},
    { field: "TrainingName"},
    { field: "Type"},
    { field: "StudentName"},
    { field: "Duration"},
 ]);

// fake api for student
const rowPassedTranings = ref([
   { Date: "12.03.2023", TrainingName: "JavaScript Course", Type: "Webinar", StudentName: "Marta Black", Duration: "15d" },
   { Date: "12.03.2023", TrainingName: "Course 2", Type: "Webinar", StudentName: "Student 1", Duration: "10d" },
   { Date: "12.03.2023", TrainingName: "Course 3", Type: "Webinar", StudentName: "Student 2", Duration: "" },
   { Date: "12.03.2023", TrainingName: "Course 4", Type: "Webinar", StudentName: "Student 3", Duration: "" },
   { Date: "12.03.2023", TrainingName: "Course 5", Type: "Intern", StudentName: "Student 4", Duration: "" },
 ]);
</script>

<template>
    <div class="container">
        <h2 class="title-h2">Tranings</h2>
        <div class="container-items">
            <div class="container-items-left">
                <div class="inputs">
                    <div class="input">
                        <label>Student name</label>
                        <input class="width-20" placeholder="First name" />
                    </div>
                </div>
                <Button type="prime">Search</Button>
            </div>
            <div class="container-items-right">
                <div class="container-items-right-item input">
                    <label>From</label>
                    <Calendar v-model="dateFrom" showIcon iconDisplay="input" />
                </div>
                <div class="container-items-right-item input">
                    <label>To</label>
                    <Calendar v-model="dateTo" showIcon iconDisplay="input" />
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h2 class="title-h2">Results</h2>
        <div class="container-table">
            <AgGridVue
                :rowData="rowPassedTranings"
                :columnDefs="colDefs"
                pagination=true
                paginationPageSize=5
                :style="tableWidth"
                :rowHeight="65"
                domLayout='autoHeight'
                class="ag-theme-quartz"
            >
            </AgGridVue>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/stylesheets/components/training/training.scss';
</style>