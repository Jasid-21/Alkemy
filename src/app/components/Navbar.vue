<template>
    <nav>
        <IconNav />
        <div class="options-container">
            <span id="total_money" class="total_money"> ${{ $store.state.money }} </span>
            <NavOption v-bind:title="'New'" />
        </div>
    </nav>
</template>

<script>
import IconNav from './IconNav.vue';
import NavOption from './NavOption.vue';


export default {
    name: 'Navbar',
    props: ['money'],
    components: {
        IconNav, NavOption
    }
}
</script>

<style scoped>
nav {
    top: 0px;
    left: 0px;
    right: 0px;
    height: 80px;
    position: fixed;

    background-color: rgb(184, 219, 231);
    border: 0px;
    border-bottom: 3px solid rgb(132, 132, 224);
    border-radius: 0px 0px 5px 5px;

    display: flex;
    justify-content: space-around;
}

.options-container {
    height: 100%;
    display: flex;
    align-items: center;
}

.total_money {
    font-size: 20px;
    font-weight: 700;
    font-style: italic;
}
</style>