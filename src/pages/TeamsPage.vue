<template>
  <div>
    <h1>Time API</h1>
    {{ APISPORT.response.team.name }}

    <div v-for="(value, index) in APISPORT.response" :key="value.id">
      <div class="" v-if="typeof value === 'object' && value !== null">
        <div class="" v-if="index == 'fixtures'">
          ola sou {{ index }}
          <q-card class="my-card" v-for="(game, item) in value" :key="item">
            <q-card-section>{{ item }} : {{ game }} </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- <table-metricas
        :team="index"
        :columnsMetricas="index"
        :rowMetricas="value"
      /> -->
    </div>
  </div>
</template>
<script>
import { APISPORT } from "../utils/essencial";
// import TableMetricas from "../components/TableMetricas.vue";
export default {
  components: {
    // TableMetricas,
  },
  setup() {
    return {
      APISPORT,
    };
  },
};
</script>
