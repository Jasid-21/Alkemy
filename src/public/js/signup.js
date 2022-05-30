const form = document.getElementById('signup_form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');


form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(username.value && password.value && confirm.value) {
        console.log(password.value);
        if(password.value === confirm.value) {
            const link = `/signup?username=${username.value}&password=${password.value}`;
            var http = new XMLHttpRequest();
            http.open('POST', link);
            http.onreadystatechange = function() {
                if(http.readyState==4 && http.status==200) {
                    const resp = JSON.parse(http.responseText);
                    if(resp.status == 1) {
                        alert("Success");
                    }
                }else{
                    console.log(`readyState: ${http.readyState}`);
                    console.log(`status: ${http.status}`);
                }
            }
            http.send(null);
        }else{
            alert("Passwords do not match");
        }
    }
})