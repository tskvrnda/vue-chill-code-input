<template>
    <div id="app">
        <VueChillCodeInput v-model="model" @done="onDone" @blur="onBlur" ref="test" auto-focus type="number" password/>
        {{ model }}
        <button @click="$refs.test.clear()">Clear</button>
    </div>
</template>

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
    methods: {
        onDone: function (payload): void {
            console.log('Done:', payload);
        },
        onBlur: function (): void {
            console.log('blurred');
        },
    },
    watch: {
        model: function (val): void {
            if (val === 'te') {
                this.$refs.test.blur();
            }
        },
    },
});
</script>
