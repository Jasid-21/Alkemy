const form = document.getElementById('login_form');
const username = document.getElementById('username');
const password = document.getElementById('password');


form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(username.value && password.value) {
        const link = `/login?username=${username.value}&password=${password.value}`;
        var http = new XMLHttpRequest();
        http.open('POST', link);
        http.onreadystatechange = function() {
            if(http.readyState==4 && http.status==200) {
                const resp = JSON.parse(http.responseText);
                if(resp.status == 1) {
                    window.location.replace('/');
                }else{
                    alert(resp.message);
                }
            }else{
                console.log(`readyState: ${http.readyState}`);
                console.log(`status: ${http.status}`);
            }
        }
        http.send(null);
    }
})