<script setup lang="ts">
import { useNotificationStore } from "./stores/notificationStore";

const notificationStore = useNotificationStore();
</script>

<template>
    <Transition name="toggle-animation">
        <OrganismNotification
            v-if="notificationStore.isNotificationExists"
            :notifications="notificationStore.activeNotifications"
        />
    </Transition>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>
