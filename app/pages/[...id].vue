<script lang="ts" setup>
definePageMeta({
    name: 'Catch'
})
</script>

<template>
    <div>
        Welcome from {{ $route.params.id }} page
        <div class="mt-10 flex flex-col gap-5">
            <NuxtLink to="/admin">Admin</NuxtLink />
            <NuxtLink to="/id">ID</NuxtLink />
            <NuxtLink to="/page2">Page 2</NuxtLink />
            <NuxtLink to="/contact">Contact</NuxtLink />
            <NuxtLink to="/about">About</NuxtLink />
        </div>
    </div>
</template>

<style></style>