<template>
    <div class="holder">
        <input
            :type="getType"
            v-for="index in Array.from(Array(length).keys())"
            :key="index"
            @input.stop="onInput(index)"
            @keydown.backspace="onBackspace($event, index)"
            @keydown.delete="onDelete(index)"
            @paste.prevent="onPaste"
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
            validator: value => ['text', 'number', 'tel'].includes(value),
        },
        password: {
            type: Boolean,
            required: false,
            default: false,
        },
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
                const input = this.getColumn(index - 1);
                this.dontEmit = true;
                input?.focus();
                this.dontEmit = false;
            }
        },
        onDelete: function (index: number): void {
            this.setActiveIndex(index);
        },
        onInput: function (index: number): void {
            this.dontEmit = true;
            this.setActiveIndex(index);

            const column = this.getColumn(index);
            const value = column.value;

            if (value.length > 1) {
                column.value = value[1];
            }

            this.computeContent();

            if (value.trim()) {
                const nextInput = this.getColumn(index + 1);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    if (this.autoBlur) {
                        this.$refs[`field__${index}`][0].blur();
                    }
                    this.$emit('done', this.content);
                }
            }

            this.dontEmit = false;
        },
        onBlur: function (): void {
            if (this.dontEmit) {
                return;
            }
            this.setActiveIndex(null);
            this.$emit('blur');
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
            const content = (event.clipboardData || window.clipboardData).getData('text').trim();
            this.fillFields(content);
        },
        fillFields: function (content: string): void {
            if (!content?.length) {
                return;
            }

            this.dontEmit = true;

            for (let i = 0; i < this.length; i++) {
                this.getColumn(i).value = content[i];
                this.computeContent();

                const nextIndex = i + 1;
                if (nextIndex)
                if (nextIndex === this.length) {
                    if (this.autoBlur) {
                        this.getColumn(i).blur();
                        this.$emit('done', this.content);
                    }
                    break;
                } else {
                    this.getColumn(nextIndex)?.focus();
                }
            }

            this.dontEmit = false;
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
