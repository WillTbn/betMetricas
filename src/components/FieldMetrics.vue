<template>
  <div>
    <div v-for="(campo, index) in campos" :key="index">
      <label>
        Campo {{ index + 1 }}:
        <input type="number" v-model="campo.quantidade" />
      </label>
    </div>
    <button @click="adicionarCampo">Adicionar Campo</button>
    <button @click="removerCampo">Remover Campo</button>
    <button @click="enviarFormulario">Enviar</button>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      campos: [],
    };
  },
  methods: {
    adicionarCampo() {
      this.campos.push({ quantidade: 0 });
    },
    removerCampo() {
      this.campos.pop();
    },
    enviarFormulario() {
      // Aqui você pode enviar o formulário para onde for necessário
      console.log(this.campos);
    },
  },
};
</script>
