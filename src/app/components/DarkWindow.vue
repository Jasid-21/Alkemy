<template>
    <div class="dark_window" v-bind:class="{ active: $store.state.showForm }" v-on:click.self="removeForm()"></div>
</template>

<script>
import store from '../store';
export default {
    name: 'DarkWindow',
    methods: {
        removeForm() {
            store.commit('removeForm');
        }
    }
}
</script>

<style scoped>
.dark_window {
    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.8);

    position: absolute;
    top: 0;
    left: 0;

    display: none;
}

.dark_window.active {
    display: block;
}
</style>