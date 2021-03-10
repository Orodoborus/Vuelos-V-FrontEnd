(function(){

    let login= {};
    let loginpass= {};
    let btnlogin = {};
    let regis = {};
    let regispass1= {};
    let regispass2= {};
    let btnregis = {};
    let new_users = [];

    const ini = function(){
        login = document.getElementById('login');
        loginpass = document.getElementById('loginpass');
        btnlogin = document.getElementById('btnlogin');
        regis = document.getElementById('regis');
        regispass1 = document.getElementById('regispass1');
        regispass2 = document.getElementById('regispass2');
        btnregis = document.getElementById('btnregis');
        btnlogin.onclick = loginProcess;
        btnregis.onclick = registrationProcess;
    }

    const loginProcess = function(){
        
    }

    const registrationProcess = async function(){
        var new_user = await fetch('http://localhost:50498/api/Usuario',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username:regis.value,
                Password:regispass1.value,
                Rol:"User"
            })
        }).then(response => response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
          }))
          //.then(response => response.json())

        new_users.push(new_user);
        console.log(new_users);
        console.log(regis.value);
        console.log(regispass1.value);
    }

    ini();
})()