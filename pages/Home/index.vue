<script setup lang="ts">
import { useUserStore } from "~~/stores/userStore";
import { v4 } from "uuid";

const userStore = useUserStore();

const items = [
    {
        id: v4(),
        isDone: false,
        task: "acquire new pet for",
    },
    {
        id: v4(),
        isDone: true,
        task: "buy cat food",
    },
];

function createUser() {
    userStore.getOneUser("22");
}

definePageMeta({
    alias: "/",
});
</script>

<template>
    <NuxtLayout name="main">
        <OrganismTodoList :items="items"></OrganismTodoList>
    </NuxtLayout>
</template>
