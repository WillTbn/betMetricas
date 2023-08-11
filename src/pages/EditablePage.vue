<template>
    <div class="q-mx-lg q-my-lg">
        <div class="row justify-between">
            <div class="col-md-6 col-sm-3 text-center">
                <p class="text-h5 text-weight-bold">Editando dados</p>
            </div>
            <div class="col-md-3 col-sm-4">
                <q-btn
                    class=""
                    label="volta"
                    color="info"
                    flat
                    icon="fa-solid fa-arrow-left fa-sm"
                    :to="{ name: 'statistics' }"
                />
            </div>
        </div>
        <!-- class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" -->
        <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
            <q-card
                class="row q-mx-lg"
                v-for="(campo, index) in metricasValues"
                :key="campo.id"
            >
                <p
                    class="col-12 col-sm-12 text-h6 text-weight-bold q-gutter-ys q-mx-lg"
                >
                    {{ index }}
                </p>
                <q-card-section
                    class="col-md-3 col-sm-2"
                    v-for="(jogo, i) in campo"
                    :key="jogo.id"
                >
                    <q-input
                        style="max-width: 80px"
                        type="number"
                        standout
                        dense
                        placeholder=""
                        :label="i"
                        class="q-gutter-xs"
                        v-model="play.editable[index][i]"
                        :rules="[
                            (val) =>
                                (val && val.length > 0) || 'Campo obrigatório',
                        ]"
                    />
                </q-card-section>
            </q-card>
            <div class="row justify-between">
                <q-btn
                    label="novo parametro"
                    color="dark"
                    class="q-ma-md"
                    disabled
                    ><q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate"
                    >
                        Em breve!
                    </q-tooltip></q-btn
                >

                <q-btn
                    @click="sendAcremend()"
                    label="Add jogos"
                    color="accent"
                    icon="fa-solid fa-plus fa-sm"
                    class="q-ma-md"
                >
                    <!-- <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate"
                    >
                        Em breve!
                    </q-tooltip> -->
                </q-btn>
                <q-btn
                    class="q-my-md"
                    label="Update"
                    color="positive"
                    type="submit"
                />
            </div>
        </q-form>
    </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore, mapGetters } from "vuex";
import { useRoute, useRouter } from "vue-router";
import UseNotify from "../composables/demo/UseNotify";
import UseMetricas from "../composables/demo/UseMetricas";
import { useQuasar } from "quasar";

export default {
    setup() {
        const prompt = ref(false);
        const { getOne, update, addPlaysMetricas } = UseMetricas();
        const { errorNotify, successNotify } = UseNotify();
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const $q = useQuasar();
        const play = ref();
        const metricasValues = ref();

        const isUpdate = computed(() => route.params.key);
        const handleMetrica = async (item) => {
            $q.loading.show();
            try {
                play.value = await getOne(item);
                successNotify("Estatitica achada!");
            } catch (e) {
                console.log(e);
                errorNotify();
            } finally {
                metricasValues.value = { ...play.value.editable };
                // store.commit("parameters/setMetricas", {
                //     ...play.value.editable,
                // });
                // metricasValues.value = { ...play.value.editable };
                setTimeout(() => {
                    $q.loading.hide();
                }, 2000);
            }
        };
        const sendAcremend = async () => {
            $q.loading.show();
            try {
                metricasValues.value = await addPlaysMetricas(
                    1,
                    metricasValues.value
                );
            } catch (e) {
                console.log(e);
            } finally {
                setTimeout(() => {
                    $q.loading.hide();
                }, 2000);
            }
        };
        onMounted(() => {
            if (isUpdate.value) {
                console.log(isUpdate.value);
                handleMetrica(isUpdate.value);
            }
        });

        const sendCardAddPlays = () => {
            // store.commit("parameters/setMetricas", metricasValues.value);

            prompt.value = true;
        };

        const handleSubmit = async () => {
            $q.loading.show();
            try {
                successNotify("Estatística atualizada com sucesso!");
                await update(play.value, metricasValues.value);
            } catch (e) {
                console.log(e);
                errorNotify();
            } finally {
                setTimeout(() => {
                    $q.loading.hide();
                    router.go({ path: "statiticas" });
                }, 2000);
            }
        };
        return {
            play,
            prompt,
            metricasValues,
            handleSubmit,
            sendCardAddPlays,
            sendAcremend,
        };
    },
};
</script>
