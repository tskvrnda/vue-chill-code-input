<script lang="ts">
import Vue from 'vue';
import VueChillCodeInput from '@/vue-chill-code-input.vue';

export default Vue.extend({
    name: 'ServeDev',
    components: {
        VueChillCodeInput
    },
    data: function (): object {
        return {
            model: '',
        };
    },
});
</script>

<template>
    <div id="app">
        <VueChillCodeInput v-model="model"/>
        {{ model }}
    </div>
</template>
