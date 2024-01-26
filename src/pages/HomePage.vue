<template>
  <q-page elevated class="column items-center justify-center">
    <div class="col-sm-12 col-md-2">
      <logo-icons />
    </div>
    <div class="col-8">
      <p class="text-weight-medium q-px-lg">
        Aqui você vai poder cria, salva, altera, adicionar suas estatísticas,
        seja para fazer apostas, seja para controler pessoal, use sua
        imaginação. Siga as instruições do passa a passo na tela de criação de
        metricas, clique no botão abaixo e se divirta.
      </p>
    </div>
    <q-btn color="accent" label="let's go" flat :to="{ name: 'created' }" />
  </q-page>
</template>
<script>
import LogoIcons from "../components/LogoIcons.vue";
import { defineComponent } from "vue";
// import LogoComponent from "../components/LogoComponent.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    LogoIcons,
  },
});
</script>
