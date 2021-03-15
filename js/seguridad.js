(function(){
    let admin = {};
    let security = {};
    let consecutivo = {};
    let Mantenimiento = {};
    let User = {};
    let btnActualizar = {};
    let tableUser = [];
    let info = [];
    let user_exists= [];
    let selectedUser = {};
    const selectUserdefault = 'Selecciona un usuario clickeando su nombre en la tabla';
    let quan = 0;
    let selected = {};

    const ini = function(){
        admin = document.querySelector('#admin');
        security = document.querySelector('#security');
        consecutivo = document.querySelector('#consecutivo');
        Mantenimiento = document.querySelector('#Mantenimiento');
        User = document.querySelector('#User');
        selectedUser = document.querySelector('#selectedUser');
        getRow('Haga click en los nombres para eleccionar un usuario');
        getUsers();
        bind();
    }

    const bind = function(){
        btnActualizar = document.querySelector('#btnActualizar');
        btnActualizar.onclick = actualizar;
    }

    const getUsers = async function(){
        tableUser = document.querySelector('#userList');
        tableUser.innerHTML='';
        user_exists =  await fetch('http://localhost:50498/api/Usuario').then(response => response.json());
            var length =  Object.keys(user_exists).length;
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/Usuario/'+index).then(response => response.json());
                console.log(info);
                tableUser.innerHTML += `<tr>
                <td value="${info.Username}" id="index${index}">${info.Username}</td>
                    <td><button class="openbtn" onclick="${selectedUser = 'index'+index.value}" style="width: 100%;">Seleccionar usuario</button><td/>
                </tr>`;

            }
            
    }

    const getRow = function(value){
        selectedUser.value = value;
    }

    const actualizar = function(){
        getRow('admin');
    }

    ini();

})()