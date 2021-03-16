(function(){

    let login= {};
    let loginpass= {};
    let btnlogin = {};
    let regis = {};
    let regispass1= {};
    let regispass2= {};
    let btnregis = {};
    let email = {};
    let question = {};
    let answer = {};
    let new_users = [];
    let user_exists = [];
    let userNav = [];
    let userNavlist = [];

    const ini = function(){
        login = document.getElementById('login');
        loginpass = document.getElementById('loginpass');
        btnlogin = document.getElementById('btnlogin');
        regis = document.getElementById('regis');
        regispass1 = document.getElementById('regispass1');
        regispass2 = document.getElementById('regispass2');
        btnregis = document.getElementById('btnregis');
        email = document.getElementById('email');
        question = document.getElementById('question');
        answer = document.getElementById('answer');
        btnlogin.onclick = loginProcess;
        btnregis.onclick = registrationProcess;
    }

    const loginProcess = async function(){
        userNav = document.getElementById('userNav');
        userNav.innerHTML='';
        if(login.value == "" || loginpass.value == ""){
            alert('Favor llenar todos los campos requeridos');
        }else{
            user_exists =  await fetch('http://localhost:50498/api/Usuario').then(response => response.json());
            var length =  Object.keys(user_exists).length;
            console.log(length);
            var cont = 0;
            for (let index = 0; index < length; index++) {
                user_exists =  await fetch('http://localhost:50498/api/Usuario/'+index).then(response => response.json());
                if(login.value == user_exists.Username && loginpass.value == user_exists.Password){
                    cont = 1;
                    userNavlist = await fetch('http://localhost:50498/api/Usuario/'+index).then(response => response.json());
                   console.log(userNavlist);
                }
            }
            if(cont == 1){
                if(userNavlist.Rol == "User"){
                    alert('signed in');
                userNav.innerHTML = `<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Inicio</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Vuelos</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">Administracion</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Sobre Nosotros</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="html/login.html" value="${userNavlist.Username}">${userNavlist.Username}</a></li>
                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="index.html">LogOut</a></li>`;
                }else{
                    if(userNavlist.Rol == "Admin"){
                        window.location.href = "html/default.html";
                        alert('Bienvenido Admin B)');
                    }
                }
            }else{
                alert('Su cuenta no esta registrada, por favor dirijase al registro.');
            }
        }
    }

    const registrationProcess = async function(){
        if(regis.value == "" || regispass1.value == "" || regispass2.value == "" || email.value == "" || question.value == "Seleccione una de las opciones..." || answer.value == ""){
            alert('Favor llenar todos los campos requeridos');
        }else{
            if(regispass1.value == regispass2.value){
                var new_user = await fetch('http://localhost:50498/api/Usuario',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username:regis.value,
                Password:regispass1.value,
                Rol:"User",
                Email:email.value,
                Question:question.value,
                Answer:answer.value
            })
        }).then(response => response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
          }))
          //.then(response => response.json())
          cleanReg();
       /* new_users.push(new_user);
        console.log(new_users);
        console.log(regis.value);
        console.log(regispass1.value);*/
            }else{
                alert('Las contraseñas no son iguales, favor revisar.');
            }
        }
        
    }

    const cleanReg = function(){
        regis.value = '';
        regispass1.value= '';
        regispass2.value= '';
        email.value= '';
        question.value= '';
        answer.value= '';
    }

    ini();
})()