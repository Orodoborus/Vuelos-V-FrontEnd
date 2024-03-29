(function(){
    let admin = {};
    let security = {};
    let consecutivo = {};
    let Mantenimiento = {};
    let User = {};
    let btnActualizar = {};
    let tableUser = [];
    let info = [];
    let data = [];
    let user_exists= [];
    let selectedUser = {};
    let quan = 0;
    let selected = {};
    let updatedNeeded = [];
    let user = {};
    let rol = {};
    let logout = {};

    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};



    const ini = function(){
        admin = document.querySelector('#admin');
        security = document.querySelector('#security');
        consecutivo = document.querySelector('#consecutivo');
        Mantenimiento = document.querySelector('#Mantenimiento');
        User = document.querySelector('#User');
        selectedUser = document.querySelector('#selectedUser');
        selectedUser.value = 'Haga click en los nombres para eleccionar un usuario';
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        getUsers();
        bind();
        showMenu();
    }

    const bind = function(){
        btnActualizar = document.querySelector('#btnActualizar');
        btnActualizar.onclick = actualizar;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
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
                document.getElementById("flights").style.display = "none";
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
                document.getElementById("flights").style.display = "none";
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
                document.getElementById("flights").style.display = "none";
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
                document.getElementById("flights").style.display = "none";
                break;
          }
    }

    const actualizar = async function(){
        if(!document.querySelector('#admin:checked') && !document.querySelector('#security:checked') && !document.querySelector('#consecutivo:checked') && 
        !document.querySelector('#Mantenimiento:checked') && !document.querySelector('#User:checked')){
            alert('Algo a sucedido, favor revisar que haya escogido un rol');
            createNewError("Fallo al seleccionar rol - Rol Usuarios");
        }else{
            if(selectedUser.value == "Haga click en los nombres para eleccionar un usuario"){
                alert('Porfavor elegir un usuario para realizar el cambio de rol');
                createNewError("Fallo al seleccionar usuario - Rol Usuarios");
            }else{
            user_exists =  await fetch('http://localhost:50498/api/Usuario').then(response => response.json());
            var length =  Object.keys(user_exists).length;
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/Usuario/'+index).then(response => response.json());
                if(selectedUser.value == info.Username){
                    if(document.querySelector('#admin:checked')){
                        var userRolUpdate = fetch('http://localhost:50498/api/Usuario/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:info.Cod_User,
                                Rol:"Admin",
                                UsernameC: localStorage.getItem("User")
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                    }else{
                        if(document.querySelector('#security:checked')){
                            var userRolUpdate = fetch('http://localhost:50498/api/Usuario/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:info.Cod_User,
                                Rol:"Security",
                                UsernameC: localStorage.getItem("User")
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                        }else{
                            if(document.querySelector('#consecutivo:checked')){
                                var userRolUpdate = fetch('http://localhost:50498/api/Usuario/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:info.Cod_User,
                                Rol:"Consecutivo",
                                UsernameC: localStorage.getItem("User")
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                            }else{
                                if(document.querySelector('#Mantenimiento:checked')){
                                    var userRolUpdate = fetch('http://localhost:50498/api/Usuario/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:info.Cod_User,
                                Rol:"Mantenimiento",
                                UsernameC: localStorage.getItem("User")
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                                }else{
                                    if(document.querySelector('#User:checked')){
                                        var userRolUpdate = fetch('http://localhost:50498/api/Usuario/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:info.Cod_User,
                                Rol:"Consulta",
                                UsernameC: localStorage.getItem("User")
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                                    }
                                }
                            }
                        }
                    }
                    alert('Cambio de rol exitoso!!');
                    location.reload();
                    break;
                }
            }
          }
        }
    }

    const getUsers = async function(){
        tableUser = document.querySelector('#userList');
        tableUser.innerHTML='';
        user_exists =  await fetch('http://localhost:50498/api/Usuario').then(response => response.json());
            var length =  Object.keys(user_exists).length;
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/Usuario/'+index).then(response => response.json());
                console.log(info);
                data[index] = info;
            }

                tableUser.innerHTML = data.map(e=>{
                    return`<tr>
                    <td value="${e.Cod_User}" id="${e.Username}">${e.Username}</td>
                    <td value="${e.Rol}" id="${e.Rol}">${e.Rol}</td>
                    <td><button type="button" class="openbtn" id="${e.Username}" value="${e.Username}" id="btn${e.Username}" onclick="getRow('${e.Username}')">Seleccionar Usuario</button><td/>
                    </tr>`
                })
                console.log(data);
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
            Date: '-', //DD-MM-YYYY
            Error_Number: "0000"  // INSERT ERROR CODE IF ANY
        })
    })

    alert('Error detectado y almacenado!'); }

    ini();

    

})()