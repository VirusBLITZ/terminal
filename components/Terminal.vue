<script setup lang="ts">
import { default as TerminalInlineText } from '@/components/terminal/InlineText.vue';
import { default as TerminalText } from '@/components/terminal/Text.vue';
import { default as TerminalPrefix } from '@/components/terminal/Prefix.vue';
import * as Commands from '@/components/commands';
import type { DefineComponent, ShallowRef } from 'vue';

const history: ShallowRef<DefineComponent[]> = shallowRef([]);
const textHistory: Ref<string[]> = ref([]);

const inputEl = ref<HTMLInputElement>();
onMounted(() => {
    inputEl.value?.focus();
});

const inputValue = ref('');
const executeCommand = () => {
    const commands = Commands as unknown as Record<string, DefineComponent>;
    const command = commands[inputValue.value];

    if (command) {
        history.value.push(TerminalPrefix as unknown as DefineComponent);
        addText(inputValue.value, false);
        history.value.push(command);
    } else {
        addText(`command not found: ${inputValue.value}`);
    }
    inputValue.value = '';
}
const triggerCompletion = () => {
    const commands = Object.keys(Commands);
    const inputValueValue = inputValue.value;
    const matchingCommands = commands.filter((command) => command.startsWith(inputValueValue));

    if (matchingCommands.length === 1) {
        inputValue.value = matchingCommands[0];
    } else {
        addText(`matching commands: ${matchingCommands.join(', ')}`);
    }
}

const addText = (text: string, block = true) => {
    textHistory.value.push(text);
    const txtComopnent = block ? TerminalText : TerminalInlineText;
    history.value.push(txtComopnent as unknown as DefineComponent);
    triggerRef(history)
}

const getTextIdx = (until: number): number => {
    if (until === 0) {
        return 0;
    }

    let actualIdx = until;

    for (let i = 0; i < until; i++) {
        const name = history.value[i].name;

        if (name !== 'Text' && name !== 'InlineText') {
            actualIdx--;
        }
    }

    return actualIdx;
}
const getProps = (idx: number): any => {
    const name = history.value[idx].name;
    if (name !== 'Text' && name !== 'InlineText') {
        // handle other props in the future
        return {};
    }

    return { text: textHistory.value[getTextIdx(idx)] };
}
</script>

<template>
    <main class="flex flex-col h-screen w-screen bg-background text-text p-4 px-6 font-mono">
        <section class="grow overflow-x-hidden overflow-y-scroll">
            <CommandsHeader />
            <component v-for="component, idx in history" :is="component" v-bind="getProps(idx)" />
        </section>
        <section class="grow-0 flex">
            <TerminalPrefix />
            <input type="text" class="block w-full bg-transparent outline-none grow" ref="inputEl" v-model="inputValue"
                @keydown.enter="executeCommand" @keydown.tab.prevent="triggerCompletion()">
        </section>
    </main>
</template>
