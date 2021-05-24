<template>
    <div class="holder">
        <input
            type="text"
            v-for="(i, index) in fields"
            :key="index"
            @input.stop="onFieldInput(index)"
            @keydown.backspace="onFieldDelete(index)"
            :ref="`field__${index}`"
            :id="index"
        />
    </div>
</template>

<script lang="ts">



import Vue from 'vue';

export default /*#__PURE__*/Vue.extend({
    name: 'VueChillCodeInput',
    props: {
        fields: {
            type: Number,
            required: false,
            default: 4,
        },
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
    data: function () {
        return {
            activeCol: 0,
            content: '',
        };
    },
    methods: {
        onFieldDelete: function (idx) {
            if (idx > 0) {
                const input = this.$refs[`field__${idx - 1}`][0];
                input?.focus();
            }
        },
        onFieldInput: function (idx) {
            const value = this.$refs[`field__${idx}`][0].value;
            if (value.length > 1) {
                this.$refs[`field__${idx}`][0].value = value[0];
            }
            if (idx + 1 > this.fields) {
                return;
            }
            if (value) {
                this.$refs[`field__${idx + 1}`]?.[0]?.focus();
            }
            this.computeContent();
        },
        computeContent: function () {
            this.content = Object.values(this.$refs)
                .map((i) => i[0].value)
                .join('')
                .trim();
            this.$emit('input', this.content);
        },
        paste: function (event) {
            // @ts-ignore
            const content = (event.clipboardData || window.clipboardData).getData(
                "text"
            );
            this.fillFields(content);
            this.computeContent();
        },
        fillFields: function (content: string) {
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
    mounted: function () {
        console.log(this.$refs);
        this.fillFields(this.value);
        Object.values(this.$refs)?.forEach((input) => {
            const casted = input[0]
            casted.addEventListener('paste', this.paste);
        });
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

input:focus,
input:active {
    border: 1px solid green;
}
</style>
