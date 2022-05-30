<template>
    <button v-on:click="showForm()">
        {{title}}
    </button>
</template>

<script>
import store from '../store';

export default {
    name: 'NavOption',
    props: ['title'],
    methods: {
        showForm() {
            store.commit('showForm');
        }
    }
}
</script>

<style scoped>
button {
    width: 80px;
    background-color: rgb(56, 197, 56);
    border: 2px solid green;
    border-radius: 5px;
    color: rgb(0, 61, 0);
    font-size: 18px;
    font-weight: 700;
    font-family: 'comic-sans-serif';
    
    margin-left: 20px;
    padding: 5px 10px;

    transition-property: background-color, color;
    transition-duration: 200ms;

    text-decoration: none;
}

button:hover {
    cursor: pointer;
    background-color: rgb(0, 61, 0);
    color: white;
}
</style>