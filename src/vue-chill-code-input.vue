<template>
    <div class="holder">
        <input
            type="text"
            v-for="index in Array.from(Array(fields).keys())"
            :key="index"
            @input.stop="onFieldInput(index)"
            @keydown.backspace="onFieldBackspace($event, index)"
            @keydown.delete="onFieldDelete(index)"
            @paste="paste"
            :ref="`field__${index}`"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default /*#__PURE__*/Vue.extend({
    name: 'VueChillCodeInput',
    model: {
        prop: 'valueModel',
        event: 'update:valueModel',
    },
    props: {
        fields: {
            type: Number,
            required: false,
            default: 4,
        },
        valueModel: {
            type: String,
            required: false,
            default: '',
        },
    },
    data: function (): object {
        return {
            content: '',
        };
    },
    methods: {
        onFieldBackspace: function (event: Event, index: number): void {
            this.$refs[`field__${index}`][0].value = '';
            event.preventDefault();

            if (index > 0) {
                const input = this.$refs[`field__${index - 1}`][0];
                input?.focus();
            }
        },
        onFieldDelete: function (index: number): void {
            console.log(index);
        },
        onFieldInput: function (index: number): void {
            const value = this.$refs[`field__${index}`][0].value;
            if (value.length > 1) {
                this.$refs[`field__${index}`][0].value = value[1];
            }
            if (index + 1 > this.fields) {
                return;
            }
            this.computeContent();
            if (value) {
                const nextInput = this.$refs[`field__${index + 1}`]?.[0];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    this.$refs[`field__${index}`][0].blur();
                    this.$emit('done', this.content);
                }
            }
        },
        computeContent: function (): void {
            this.content = Object.values(this.$refs)
                .map((i) => i[0].value)
                .join('')
                .trim();
            this.$emit('update:valueModel', this.content);
        },
        paste: function (event: Event): void {
            // @ts-ignore
            const content = (event.clipboardData || window.clipboardData).getData('text');
            this.fillFields(content);
            this.computeContent();
        },
        fillFields: function (content: string): void {
            if (!content?.length) {
                return;
            }
            const textLength = content.length;
            for (let i = 0; i < this.fields; i++) {
                this.$refs[`field__${i}`][0].value = content[i];
                if (i + 1 === textLength) {
                    break;
                } else {
                    this.$refs[`field__${i + 1}`]?.[0]?.focus();
                }
            }
        },
    },
    mounted: function (): void {
        this.fillFields(this.value);
    },
});
</script>

<style scoped>
.holder {
    display: flex;
    justify-content: center;
    padding: 2em;
    background: lightgrey;
}

input {
    font-size: 20px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid transparent;
    outline: transparent;
}

input:focus, input:active {
    border: 1px solid green;
}
</style>
