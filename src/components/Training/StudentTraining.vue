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
    { field: "TrainerName"},
    { field: "Duration"},
 ]);

// fake api for student
const rowPassedTranings = ref([
   { Date: "12.03.2023", TrainingName: "JavaScript Course 1", Type: "Webinar", TrainerName: "Matthew Martinez", Duration: "15d" },
   { Date: "12.03.2023", TrainingName: "JS Course 2", Type: "Webinar", TrainerName: "Matthew Martinez", Duration: "10d" },
   { Date: "12.03.2023", TrainingName: "Java", Type: "Webinar", TrainerName: "Maria White", Duration: "2d" },
 ]);
</script>

<template>
    <div class="info-box">
        <div class="info-box-text">
            <Button type="secondary" to="/trainings/add-training">Add training</Button>
        </div>
    </div>

    <div class="container">
        <h2 class="title-h2">Search Tranings</h2>
        <div class="container-items">
            <div class="container-items-left">
                <div class="inputs">
                    <div class="input">
                        <label>Trainer name</label>
                        <input placeholder="First name" />
                    </div>
                    <div class="input">
                        <label>Specializtion</label>
                        <input placeholder="Specializtion" />
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
        <h2 class="title-h2">My passed trainings</h2>
        <div class="container-table">
            <AgGridVue
                :rowData="rowPassedTranings"
                :columnDefs="colDefs"
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