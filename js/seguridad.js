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

    const ini = function(){
        admin = document.querySelector('#admin');
        security = document.querySelector('#security');
        consecutivo = document.querySelector('#consecutivo');
        Mantenimiento = document.querySelector('#Mantenimiento');
        User = document.querySelector('#User');
        selectedUser = document.querySelector('#selectedUser');
        selectedUser.value = 'Haga click en los nombres para eleccionar un usuario';
        getUsers();
        bind();
    }

    const bind = function(){
        btnActualizar = document.querySelector('#btnActualizar');
        btnActualizar.onclick = actualizar;
    }

    const actualizar = async function(){
        if(!document.querySelector('#admin:checked') && !document.querySelector('#security:checked') && !document.querySelector('#consecutivo:checked') && 
        !document.querySelector('#Mantenimiento:checked') && !document.querySelector('#User:checked')){
            alert('Algo a sucedido, favor revisar que haya escogido un rol');
        }else{
            if(selectedUser.value == "Haga click en los nombres para eleccionar un usuario"){
                alert('Porfavor elegir un usuario para realizar el cambio de rol');
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
                                Username:selectedUser.value,
                                Rol:"Admin"
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
                                Username:selectedUser.value,
                                Rol:"Security"
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
                                Username:selectedUser.value,
                                Rol:"Consecutivo"
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
                                Username:selectedUser.value,
                                Rol:"Mantenimiento"
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
                                Username:selectedUser.value,
                                Rol:"Consulta"
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
                    return `<tr>
                    <td value="${e.Username}" id="${e.Username}">${e.Username}</td>
                    <td value="${e.Rol}" id="${e.Rol}">${e.Rol}</td>
                        <td><button type="button" class="openbtn" id="${e.Username}" value="${e.Username}" id="btn${e.Username}" onclick="getRow('${e.Username}')">Seleccionar Usuario</button><td/>
                    </tr>`
                })
                console.log(data);
    }

    ini();

    

})()