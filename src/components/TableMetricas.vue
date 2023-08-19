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
        >
            <template v-slot:top-right>
                <p>data de criação: {{ $filters.formatDataBR(created) }}</p>
                <q-separator inset />
                <p v-if="updated">
                    ultima atualização: {{ $filters.formatDataBR(updated) }}
                </p>
            </template>
        </q-table>
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
        created: {
            type: Number,
        },
        updated: {
            type: Number,
        },
    },
    setup() {
        return {};
    },
};
</script>
