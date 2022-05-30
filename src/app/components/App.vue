<template>
    <DarkWindow />
    <NewForm v-bind:date="moment().format('YYYY-MM-DD')" ref="newForm" />

    <Navbar />
    <TransactionsContainer />
</template>

<script>
const moment = require('moment');
import axios from 'axios';
import store from '../store';

import Navbar from './Navbar.vue';
import NewForm from './NewForm.vue';
import DarkWindow from './DarkWindow.vue';
import TransactionsContainer from './TransactionsContainer.vue';


export default {
    name: 'App',
    data() {
        return {
            moment:moment
        }
    },
    components: {
        Navbar, NewForm, DarkWindow, TransactionsContainer
    },
    mounted() {
        axios.get(`/initialMoneey`).then((data)=>{
            if(data.data.status == 1) {
                if(data.data.money) {
                    store.commit('setMoney', data.data.money);
                }
            }else{
                alert(data.data.message);
            }
        });

        axios.get(`/getTransactions`).then((data)=>{
            console.log(data);
            if(data.data.status == 1) {
                store.commit('setTransactions', data.data.transactions)
            }else{
                alert(data.data.message);
            }
        });
    }
}
</script>