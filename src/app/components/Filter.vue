<template>
    <ul class="filter">
        <li class="filter-item" v-bind:class="{ active: ($store.state.filter == '') }" v-on:click="setFilter('')">All</li>
        <li class="filter-item" v-bind:class="{ active: ($store.state.filter == 'Money_in') }" v-on:click="setFilter('Money_in')">Income</li>
        <li class="filter-item" v-bind:class="{ active: ($store.state.filter == 'Money_out') }" v-on:click="setFilter('Money_out')">Expenses</li>
    </ul>
</template>

<script>
import store from '../store'

export default {
    name: 'Filter',
    methods: {
        setFilter(filter) {
            store.commit('setFilter', filter);
        }
    }
}
</script>

<style scoped>
ul {
    width: 200px;
    height: 30px;

    margin-left: auto;
    margin-right: auto;

    list-style: none;
    border: 2px solid black;
    border-radius: 5px;

    display: flex;
    justify-content: space-around;
}

.filter-item {
    font-weight: 500;
}

.filter-item:hover {
    color: blue;
    cursor: pointer;
}

.filter-item.active {
    font-weight: bold;
    color: blue
}
</style>