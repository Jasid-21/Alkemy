<template>
    <form class="newOperationForm" v-bind:class="{ active: $store.state.showForm }" v-on:submit.prevent="newOperation()">
        <h3 class="title">New Transaction</h3>
        <div class="form-row">
            <div class="operation-container">
                <h4 class="section-name">Operation</h4>
                <br>
                <select id="" v-model="form.type" required>
                    <option value="1">Money In</option>
                    <option value="2">Money Out</option>
                </select>
            </div>

            <div class="operation-container">
                <h4 class="section-name">Amount</h4>
                <br>
                <div class="centrer">
                    <input type="number" id="amount" class="amount" step="0.01" min="0.00" v-model="form.amount" placeholder="Ej. 14.59" required>
                </div>
            </div>
        </div>
        <br>
        <div class="operation-container concept-container">
            <h4 class="section-name">By concept of</h4>
            <textarea  v-model="form.concept" id="concept" cols="30" rows="10" required></textarea>
        </div>
        <br>
        <div class="form-footer-container">
            <div class="date_now">{{this.date}}</div>
            <button type="submit" class="submit-btn">Submit</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import store from '../store';

export default {
    name: 'NewForm',
    data() {
        return {
            form: {
                type: null,
                amount: null,
                concept: null
            }
        }
    },
    props: ['date'],
    methods: {
        newOperation() {
            const form = this.form;
            const date = moment().format();
            console.log(date);
            
            axios.get(`/newTransaction?type=${form.type}&amount=${form.amount}&concept=${form.concept}&date=${date}`).then((data)=>{
                if(data.data.status == 1) {
                    if(form.type == 1) {
                        store.commit('addMoney', form.amount);
                    }
                    if(form.type == 2) {
                        store.commit('removeMoney', form.amount);
                    }
                    const object = {
                        Type_name: form.type,
                        Date: date,
                        Amount: form.amount,
                        Concept: form.concept
                    }
                    store.commit('addTransaction', object);
                    form.type = null;
                    form.amount = null;
                    form.concept = null;
                }else{
                    alert(data.data.message);
                }
            });
        }
    }
}
</script>

<style scoped>
.newOperationForm {
    width: 310px;
    min-height: 400px;
    border: border;

    background-color: rgba(255, 255, 255);
    border-radius: 10px;
    box-shadow: 2px 2px 10px black;

    position: absolute;
    top: -500px;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;

    transition-property: top;
    transition-duration: 200ms;

    z-index: 1000;
}

.newOperationForm.active {
    top: 50px;
}

.title {
    color: blue;
    font-size: 22px;
    font-style: italic;
    text-align: center;
}

.form-row {
    display: flex;
    justify-content: space-between;
}

.operation-container {
    max-width: 130px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    padding-top: 0px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;
}

.section-name {
    font-weight: 600;
    font-style: italic;
    text-align: center;
    background-color: rgba(255, 255, 255);
    color: gray;

    margin: 0px;
    padding: 0px;

    position: absolute;
    top: -10px;
    left: 0px;
}

.centrer {
    width: 100%;
    display: flex;
    justify-content: center;
}

.amount {
    max-width: 80px;
}

.concept-container {
    border: 1px solid gray;
    border-radius: 10px;
    max-width: 100%;
    width: 100%;
    padding: 0px;
}

textarea {
    left: 0px;
    right: 0px;
    height: 100%;
    border-radius: 10px;
    border: none;
    padding: 10px;
    -moz-box-sizing:content-box;
    -webkit-box-sizing:content-box;
    -ms-box-sizing: content-box;
    box-sizing:content-box;
}

.form-footer-container {
    display: flex;
    justify-content: space-between;
}

.date_now {
    font-weight: 700;
}

.submit-btn {
    background-color: rgb(12, 12, 71);
    border: 2px solid rgb(12, 12, 71);
    border-radius: 5px;
    color: white;
    font-weight: 700;
    padding: 5px;

    transition-property: background-color, color;
    transition-duration: 200ms;
}

.submit-btn:hover {
    background-color: rgba(12, 12, 71, 0);
    color: rgb(12, 12, 71);
    cursor: pointer;
}

</style>