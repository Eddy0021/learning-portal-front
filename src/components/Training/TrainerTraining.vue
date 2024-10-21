<script setup>
import Header from '../Header.vue';
import Footer from '../Footer/Footer.vue';
import Button from '../Button.vue';
import Bradcrumbers from '../Bradcrumbers.vue';

import { ref, watch, computed } from "vue";

const dateFrom = ref('');
const dateTo = ref('');
const studentName = ref('');

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const tableWidth = document.documentElement.clientWidth < 600 ? "width: 20rem;": "width: 80rem;";

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
    { field: "date", headerName: "Date" },
    { field: "trainingName", headerName: "Training Name" },
    { field: "type", headerName: "Type" },
    { field: "studentName", headerName: "Student Name" },
    { field: "duration", headerName: "Duration" },
]);

const rowPassedTranings = ref([]);

watch(() => props.data, (newValue, oldValue) => {
    rowPassedTranings.value = newValue.map(item => ({
        date: item.date,
        trainingName: item.trainingName,
        type: item.type,
        studentName: item.studentName,
        duration: item.duration 
    }));
});

const search = () => {
    // Filter data based on search criteria
    rowPassedTranings.value = props.data.filter(item => {
        const byStudentName = !studentName.value || item.studentName.toLowerCase().includes(studentName.value.toLowerCase());
        const byDateRange = (!dateFrom.value || new Date(item.date) >= new Date(dateFrom.value)) &&
                            (!dateTo.value || new Date(item.date) <= new Date(dateTo.value));
        // Return true if all conditions are met
        return byStudentName && byDateRange;
    });
};
</script>

<template>
    <div class="container">
        <h2 class="title-h2">Tranings</h2>
        <div class="container-items">
            <div class="container-items-left">
                <div class="inputs">
                    <div class="input">
                        <label>Student name</label>
                        <input v-model="studentName" class="width-20" placeholder="First name" />
                    </div>
                </div>
                <Button type="prime" @click="search">Search</Button>
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