import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            money: 0,
            showForm: false,
            filter: '',
            transactions: new Array()
        }
    },
    getters: {
        getCount: function(state) {
            return state.counter;
        }
    },
    mutations: {
        setMoney(state, amount) {
            state.money = amount;
        },
        addMoney(state, amount) {
            state.money += amount;
        },
        removeMoney(state, amount) {
            state.money -= amount;
        },


        showForm(state) {
            state.showForm = true;
        },
        removeForm(state) {
            state.showForm = false;
        },


        setTransactions(state, values) {
            state.transactions = values;
        },
        addTransaction(state, value) {
            state.transactions.splice(0, 0, value);
        },


        setFilter(state, filter) {
            state.filter = filter;
        }
    }
})