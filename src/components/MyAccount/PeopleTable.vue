<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.getUser);
const tableWidth = document.documentElement.clientWidth < 600 ? "width: 23rem;": "width: 28rem;";
const firstHeaderWidth = document.documentElement.clientWidth < 600 ? 180 : 200;
const secondHeaderWidth = document.documentElement.clientWidth < 600 ? 160 : 200;

 // Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
   { field: "Name", width: firstHeaderWidth},
   { field: user?.value?.type === 'Trainer' ? "Status" : "Specialization",
      cellClassRules: {
        'status-active': (params: any) => params.value === 'Active',
        'status-inactive': (params: any) => params.value === 'Not active'
      }, width: secondHeaderWidth}
 ]);

const rowDataStudent = ref([]);
const rowDataTrainer = ref([]);

const updateRowData = () => {
  if (user.value?.type === 'Student') {
    rowDataStudent.value = (user.value?.connections || []).map(({ name, specialization }: any) => ({
      Name: name,
      Specialization: specialization
    })) as never[];
  } else {
    rowDataTrainer.value = (user.value?.connections || []).map(({ name, status }: any) => ({
      Name: name,
      Status: status ? "Active" : "Not active"
    })) as never[];
  }

  rowDataTrainer.value.sort((a: any, b: any) => a.Status.localeCompare(b.Status));
};

onMounted(updateRowData);

// Watch for changes in the connections array
watch(
  () => user.value?.connections,
  () => {
    updateRowData();
  },
  { deep: true }
);
</script>

<template>
    <AgGridVue
    :rowData="user?.type === 'Student' ? rowDataStudent : rowDataTrainer"
    :columnDefs="colDefs"
    :rowHeight="65"
    :style="tableWidth"
    domLayout='autoHeight'
    class="ag-theme-quartz"
    >
    </AgGridVue>
</template>

<style scoped lang="scss">
.ag-theme-quartz {
    --ag-header-column-resize-handle-display: none;
    --ag-header-foreground-color: var(--black);
    --ag-header-background-color: var(--table-header:); 
    --ag-header-label-textTransform: 'uppercase';

    :deep(.ag-root-wrapper){
        border: 1px solid rgba(0, 0, 0, 0.055); 
    }

    :deep(.ag-cell-value){
        align-content: center;
    }

    :deep(.ag-header-viewport){
        background: var(--table-header);
    }

    :deep(.ag-header-cell-label){
        color: var(--black);
        font-weight: bold;
        text-transform: uppercase;
    }

    :deep(.ag-column-first){
        font-weight: bold;
    }

    :deep(.ag-row){
        border-bottom: 1px solid rgb(24 29 31 / 5%);
    }

    :deep(.status-active) {
        color: #60CFA5FF;
        text-transform: uppercase;
        font-family: var(--popins);
        font-weight: 400;
    }

    :deep(.status-inactive ) {
        color: #F22128FF;
        text-transform: uppercase;
        font-family: var(--popins);
        font-weight: 400;
    }
}
</style>