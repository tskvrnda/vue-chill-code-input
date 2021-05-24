import Vue, {PluginFunction, VueConstructor} from 'vue';

declare const VueChillCodeInput: VueConstructor<Vue> & { install: PluginFunction<any>; };
export default VueChillCodeInput;
