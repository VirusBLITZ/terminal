<script setup lang="ts">
defineOptions({
    name: 'Text'
})
defineProps<{ text: string }>();
</script>

<template>
    <div>{{ text }}</div>
</template>