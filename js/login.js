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
    let capt = {};
    let captchatxt = {};


    let new_users = [];
    let user_exists = [];
    let userNav = [];
    let userNavlist = [];


    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};



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
        capt = document.getElementById('capt');
        captchatxt = document.getElementById('captchatxt');
        btnlogin.onclick = loginProcess;
        btnregis.onclick = registrationProcess;
    }

    const loginProcess = async function(){
        userNav = document.getElementById('userNav');
        userNav.innerHTML='';
        if(login.value == "" || loginpass.value == ""){
            alert('Favor llenar todos los campos requeridos');
            createNewError("No se rellenaros los espacios requeridos - LogIn");
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
                switch(userNavlist.Rol){
                    case "User":
                        localStorage.setItem("User",userNavlist.Username);
                        alert('Bienvenido Usuario - '+userNavlist.Username);
                    userNav.innerHTML = `<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Vuelos</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">Administracion</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Sobre Nosotros</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="html/login.html" value="${userNavlist.Username}">${userNavlist.Username}</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="index.html">LogOut</a></li>`;
                        break;
                    case "Admin":
                        localStorage.setItem("User",userNavlist.Username);
                        localStorage.setItem("Rol",userNavlist.Rol);
                        window.location.href = "html/default.html";
                        alert('Bienvenido Usuario Administrador - '+userNavlist.Username);
                        break;
                    case "Security":
                        localStorage.setItem("User",userNavlist.Username);
                        localStorage.setItem("Rol",userNavlist.Rol);
                        window.location.href = "html/default.html";
                        alert('Bienvenido Usuario Seguridad - '+userNavlist.Username);
                        break;
                    case "Consecutivo":
                        localStorage.setItem("User",userNavlist.Username);
                        localStorage.setItem("Rol",userNavlist.Rol);
                        window.location.href = "html/default.html";
                        alert('Bienvenido Usuario Consecutivo - '+userNavlist.Username);
                        break;
                    case "Mantenimiento":
                        localStorage.setItem("User",userNavlist.Username);
                        localStorage.setItem("Rol",userNavlist.Rol);
                        window.location.href = "html/default.html";
                        alert('Bienvenido Usuario Mantenimiento - '+userNavlist.Username);
                        break;
                    case "Consulta":
                        localStorage.setItem("User",userNavlist.Username);
                        localStorage.setItem("Rol",userNavlist.Rol);
                        window.location.href = "html/default.html";
                        alert('Bienvenido Usuario Consulta - '+userNavlist.Username);
                        break;
                }
            }else{
                alert('Su cuenta no esta registrada, por favor dirijase al registro.');
                createNewError("No se encuentra registrado correctamente - LogIn");
                window.location.href = "index.html"
            }
        }
    }

    const registrationProcess = async function(){
        if(regis.value == "" || regispass1.value == "" || regispass2.value == "" || email.value == "" || question.value == "Seleccione una de las opciones..." || answer.value == ""){
            alert('Favor llenar todos los campos requeridos');
            createNewError("No se rellenaros los espacios requeridos - Registro");
        }else{
            if(regispass1.value == regispass2.value){
                if(capt.value == captchatxt.value){
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
                      alert('Cuenta creada!');
                }else{
                    alert('Ingrese un CAPTCHA valido.');
                    createNewError("Fallo en el CAPTCHA requerido - Registro");
                }
                
       /* new_users.push(new_user);
        console.log(new_users);
        console.log(regis.value);
        console.log(regispass1.value);*/
            }else{
                alert('Las contraseñas no son iguales, favor revisar.');
                createNewError("Fallo en la verificacion de contraseñas - Registro");
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

    const createNewError = async function(Error_Message){  
        var create = await fetch('http://localhost:50498/api/Errors',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            Error_Message: Error_Message, //INSERT ERROR STRING
            Time: d.getHours()+':'+twoDigitMinutes, //24H FORMAT
            Date: d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear(), //DD-MM-YYYY
            Error_Number: "0000"  // INSERT ERROR CODE IF ANY
        })
    })

    alert('Error detectado y almacenado!'); }

    

    ini();
})()