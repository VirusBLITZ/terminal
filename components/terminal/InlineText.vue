<script setup lang="ts">
defineOptions({
    name: 'InlineText'
})
defineProps<{
    text: string;
}>();
</script>

<template>
    <div class="inline-block">{{ text }}</div>
</template>