<script lang="ts">
import Vue from 'vue';
import VueChillCodeInput from '@/vue-chill-code-input.vue';

export default Vue.extend({
    name: 'ServeDev',
    components: {
        VueChillCodeInput
    },
});
</script>

<template>
    <div id="app">
        <VueChillCodeInput/>
    </div>
</template>
