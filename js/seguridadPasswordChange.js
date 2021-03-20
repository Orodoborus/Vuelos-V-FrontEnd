(function(){
    let user = {};
    let passAct= {};
    let passNew = {};
    let passNew2 = {};
    let question = {};
    let answer = {};
    let btnChange = {};
    let userA = {};
    let rol = {};
    let logout = {};
    let user_exists = [];
    let info = [];
    let data =[];


    const ini = function(){
        user = document.querySelector('#user');
        passAct = document.querySelector('#passAct');
        passNew = document.querySelector('#passNew');
        passNew2 = document.querySelector('#passNew2');
        question = document.querySelector('#question');
        answer = document.querySelector('#answer');
        btnChange = document.querySelector('#btnChange');
        userA = document.querySelector('#userA');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        userA.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        btnChange.onclick = changePass;
        logout.onclick = logoutUser;
        showMenu();
    }


    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const clean = function(){
        user.value ='';
        passAct.value = '';
        passNew.value = '';
        passNew2.value = '';
        question.value = "Seleccione una de las opciones...";
        answer.value = '';
    }
    const showMenu = function(){
        switch(localStorage.getItem("Rol")){
            case "Admin":
                break;
            case "Security":
                document.getElementById("admin").style.display = "none";
                document.getElementById("cons").style.display = "none";
                document.getElementById("countries").style.display = "none";
                document.getElementById("airlines").style.display = "none";
                document.getElementById("gates").style.display = "none";
                document.getElementById("consultas").style.display = "none";
                document.getElementById("bitacora").style.display = "none";
                document.getElementById("errors").style.display = "none";
                document.getElementById("AerolineaCountry").style.display = "none";
                document.getElementById("ActGates").style.display = "none";
                break;
            case "Consecutivo":
                document.getElementById("Seguridad").style.display = "none";
                document.getElementById("createU").style.display = "none";
                document.getElementById("seeU").style.display = "none";
                document.getElementById("changeUPass").style.display = "none";
                document.getElementById("countries").style.display = "none";
                document.getElementById("airlines").style.display = "none";
                document.getElementById("gates").style.display = "none";
                document.getElementById("consultas").style.display = "none";
                document.getElementById("bitacora").style.display = "none";
                document.getElementById("errors").style.display = "none";
                document.getElementById("AerolineaCountry").style.display = "none";
                document.getElementById("ActGates").style.display = "none";
                break;
            case "Mantenimiento":
                document.getElementById("Seguridad").style.display = "none";
                document.getElementById("createU").style.display = "none";
                document.getElementById("seeU").style.display = "none";
                document.getElementById("changeUPass").style.display = "none";
                document.getElementById("cons").style.display = "none";
                document.getElementById("consultas").style.display = "none";
                document.getElementById("bitacora").style.display = "none";
                document.getElementById("errors").style.display = "none";
                document.getElementById("AerolineaCountry").style.display = "none";
                document.getElementById("ActGates").style.display = "none";
                 break;
             case "Consulta":
                document.getElementById("admin").style.display = "none";
                document.getElementById("Seguridad").style.display = "none";
                document.getElementById("createU").style.display = "none";
                document.getElementById("seeU").style.display = "none";
                document.getElementById("changeUPass").style.display = "none";
                document.getElementById("cons").style.display = "none";
                document.getElementById("countries").style.display = "none";
                document.getElementById("airlines").style.display = "none";
                document.getElementById("gates").style.display = "none";
                break;
          }
    }

    const changePass = async function(){
        if(user.value == "" || passAct == "" || passNew == "" || passNew2 == "" || question == "Seleccione una de las opciones..." || answer.values == "" ){
            alert('Favor llenar todos los campos');
        }else{
            user_exists =  await fetch('http://localhost:50498/api/UsuarioPassword').then(response => response.json());
            var length =  Object.keys(user_exists).length;
            console.log(user.value);
            console.log(passAct.value);
            console.log(passNew.value);
            console.log(passNew2.value);
            console.log(question.value);
            console.log(answer.value);
            console.log(user_exists);
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/UsuarioPassword/'+index).then(response => response.json());
                if(user.value == info.Username){
                    if(passNew.values == passNew2.values){
                        if(question.value == info.Question){
                            if(answer.value == info.Answer){
                                var userRolUpdate = fetch('http://localhost:50498/api/UsuarioPassword/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:user.value,
                                Rol:"",
                                Password:passNew.value
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                        alert('Cambio de contraseña exitosa');
                        clean();
                        window.location.reload();
                            }else{
                                alert('Respuesta incorrecta.')
                            }
                        }else{
                            alert('Pregunta incorrecta.')
                        }
                    }else{
                        alert('Las contraseñas ingresadas no son iguales');
                    }
                }else{
                    alert('No existe el usuario.');
                }
            }
        }
        
    }


    ini();
})()