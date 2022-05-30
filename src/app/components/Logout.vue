<template>
    <button class="logout-btn" v-on:click="logout()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
    </button>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Logout',
    methods: {
        logout() {
            if(confirm("Do you want to log out?")) {
                axios.get('/logout').then(function(resp) {
                    console.log(resp);
                    if(resp.data.status == 1) {
                        document.cookie = null;
                        window.location.replace('/login');
                    }
                }).catch(function(error) {
                    console.error(error);
                    alert('Error: Something went wrong...');
                });
            }
        }
    }
}
</script>

<style scoped>
.logout-btn {
    width: 20px;
    height: 20px;

    margin-left: 10px;

    background-color: transparent;
    border: none;
    font-weight: 700;
}

.logout-btn:hover {
    cursor: pointer;
    color: red;
}
</style>