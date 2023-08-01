<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      dense
      :title="team"
      :rows="rowMetricas"
      :columns="columnsMetricas"
      row-key="name"
    />
  </div>
</template>

<script>
export default {
  name: "TableMetricas",
  props: {
    team: {
      type: String,
    },
    rowMetricas: {
      type: Array,
    },
    columnsMetricas: {
      type: Array,
    },
  },
  setup() {
    return {};
  },
};
</script>
