<template>
    <div class="transactions-container">
        <Filter />
        <div class="transaction" v-bind:class="{ expense: (transaction.Type_name == 'Money_out') }" 
        v-bind:key="transaction" 
        v-for="transaction of filterTransactions($store.state.transactions, $store.state.filter)">
            <div class="little">
                <div class="date"> {{ transaction.Date.split('T')[0] + ' ' + transaction.Date.split('T')[1].split('.')[0] }} </div>
                <div class="type"> {{ transaction.Type_name }} </div>
            </div>
            <br>
            <div class="details">
                <div class="concept"> <span>By concept of:</span><br> {{ transaction.Concept }} </div>
                <div class="amount"> ${{ transaction.Amount }} </div>
            </div>
        </div>
    </div>
</template>

<script>
import Filter from './Filter.vue';

export default {
    name: 'TransactionsContainer',
    components: {
        Filter
    },
    methods: {
        filterTransactions(array, filter) {
            var finalArray = new Array();
            
            if(filter != '') {
                for(var item of array) {
                    if(item.Type_name == filter) {
                        finalArray.push(item);
                    }
                }
            }else{
                finalArray = array;
            }
            return finalArray;
        }
    }
}
</script>

<style scoped>
.transactions-container {
    width: 90%;
    max-width: 600px;
    min-height: 500px;

    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;

    border: 2px solid black;
    border-radius: 10px;
}

.transaction {
    width: 90%;
    min-height: 60px;

    background-color: rgb(170, 255, 170);
    border: 2px solid green;
    border-radius: 5px;

    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    padding: 5px;
}

.transaction.expense {
    background-color: rgb(255, 173, 173);
    border-color: red;
}

.transaction > div {
    width: 100%;
    display: grid;
}

.little {
    grid-template-columns: 70% 30%;
}

.details {
    grid-template-columns: 80% 20%;
}

.details span {
    color: rgb(85, 85, 85);
    font-style: italic;
    font-weight: 600;
}

.date {
    font-weight: 600;
}

.amount {
    font-size: 20px;
    font-weight: 600;
    align-self: flex-end;
}
</style>