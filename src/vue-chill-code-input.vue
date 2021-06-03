<template>
    <div class="holder">
        <input
            :type="getType"
            v-for="index in Array.from(Array(length).keys())"
            :key="index"
            @input.stop="onInput(index)"
            @keydown.backspace="onBackspace($event, index)"
            @keydown.delete="onDelete(index)"
            @paste="onPaste"
            @blur.prevent="onBlur"
            @focus.prevent="setActiveIndex(index)"
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
        length: {
            type: Number,
            required: false,
            default: 4,
        },
        valueModel: {
            type: String,
            required: false,
            default: '',
        },
        autoFocus: {
            type: Boolean,
            required: false,
            default: false,
        },
        autoBlur: {
            type: Boolean,
            required: false,
            default: true,
        },
        type: {
            type: String,
            required: false,
            default: 'text',
            validator: value => ['text', 'number'].includes(value),
        },
        password: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data: function (): object {
        return {
            activeColumnIndex: null,
            content: '',
            dontEmit: false,
        };
    },
    computed: {
        currentColumn: function (): Element | null {
            if (this.activeColumnIndex === null) {
                return null;
            }
            return this.$refs[`field__${this.activeColumnIndex}`][0];
        },
        getType: function (): string {
            return this.password ? 'password' : this.type;
        },
    },
    methods: {
        blur: function (): void {
            this.currentColumn?.blur();
        },
        focus: function (): void {
            this.setActiveIndex(0);
            this.currentColumn.focus();
        },
        clear: function (): void {
            for (let i = 0; i < this.length; i++) {
                this.getColumn(i).value = '';
            }
            this.computeContent();
        },
        setActiveIndex: function (index: number): void {
            this.activeColumnIndex = index;
        },
        getColumn: function (index: number): Element | null {
            return this.$refs[`field__${index}`]?.[0] || null;
        },
        onBackspace: function (event: Event, index: number): void {
            this.setActiveIndex(index);
            this.$refs[`field__${index}`][0].value = '';
            event.preventDefault();

            if (index > 0) {
                const input = this.$refs[`field__${index - 1}`][0];
                if (!this.dontFocus) {
                    input?.focus();
                }
            }
        },
        onDelete: function (index: number): void {
            this.setActiveIndex(index);
            console.log(index);
        },
        onInput: function (index: number): void {
            this.dontEmit = true;
            this.setActiveIndex(index);
            const value = this.$refs[`field__${index}`][0].value;
            if (value.length > 1) {
                this.$refs[`field__${index}`][0].value = value[1];
            }
            if (index + 1 > this.length) {
                return;
            }
            this.computeContent();
            if (value) {
                const nextInput = this.$refs[`field__${index + 1}`]?.[0];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    if(this.autoBlur) {
                        this.$refs[`field__${index}`][0].blur();
                    }
                    this.$emit('done', this.content);
                }
            }
            this.dontEmit = false;
            console.log()
        },
        onBlur: function (): void {
            if (this.dontEmit) {
                return;
            }
            this.setActiveIndex(null);
            this.$emit('blur')
        },
        computeContent: function (): void {
            this.content = Object.values(this.$refs)
                .map((i) => i[0].value)
                .join('')
                .trim();
            this.$emit('update:valueModel', this.content);
        },
        onPaste: function (event: Event): void {
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
            for (let i = 0; i < this.length; i++) {
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

        if (this.autoFocus) {
            this.focus();
        }
    },
});
</script>

<style scoped>
.holder {
    display: inline-flex;
    justify-content: center;
    padding: 1em;
    background: lightgrey;
    border-radius: 4px;
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
