<script setup lang="ts">
onMounted(() => {
    window.open(useRuntimeConfig().public.URL.STEAM, '_blank')
})
</script>

<template>
    > Opening Steam...
</template>