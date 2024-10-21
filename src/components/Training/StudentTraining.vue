<script setup>
import Header from '../Header.vue';
import Footer from '../Footer/Footer.vue';
import Button from '../Button.vue';
import Bradcrumbers from '../Bradcrumbers.vue';

import { ref, watch } from "vue";

const dateFrom = ref('');
const dateTo = ref('');
const trainingName = ref(''); 
const trainerName = ref('');

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
    { field: "trainerName", headerName: "Trainer Name" },
    { field: "duration", headerName: "Duration" },
]);

const rowPassedTranings = ref([]);

watch(() => props.data, (newValue, oldValue) => {
    rowPassedTranings.value = newValue.map(item => ({
        date: item.date,
        trainingName: item.trainingName,
        type: item.type,
        trainerName: item.trainerName,
        duration: item.duration 
    }));
});

const search = () => {
    // Filter data based on search criteria
    rowPassedTranings.value = props.data.filter(item => {
        // Filter by trainer name, specialization, and date range
        const byTrainerName = !trainerName.value || item.trainerName.toLowerCase().includes(trainerName.value.toLowerCase());
        const byTrainingName = !trainingName.value || item.trainingName.toLowerCase().includes(trainingName.value.toLowerCase());
        const byDateRange = (!dateFrom.value || new Date(item.date) >= new Date(dateFrom.value)) &&
                            (!dateTo.value || new Date(item.date) <= new Date(dateTo.value));
        // Return true if all conditions are met
        return byTrainerName && byTrainingName && byDateRange;
    });
};
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
                        <label>Training name</label>
                        <input v-model="trainingName" placeholder="First name" />
                    </div>
                    <div class="input">
                        <label>Trainer name</label>
                        <input v-model="trainerName" placeholder="Specializtion" />
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
        <h2 class="title-h2">My passed trainings</h2>
        <div class="container-table">
            <AgGridVue
                :rowData="rowPassedTranings"
                :columnDefs="colDefs"
                :style="tableWidth"
                :rowHeight="65"
                pagination=true
                paginationPageSize=5
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