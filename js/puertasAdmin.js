(function(){
    let Codgate = {};
    let check = {};
    let gateNum = {};
    let detail = {};
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};
    let btnDelete = {};
    let user = {};
    let rol = {};
    let logout = {};

    let gateList = [];
    let specificGate = [];
    let infoCons = [];

    let consEx = [];

    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};


    const ini = function(){
        Codgate = document.querySelector('#Codgate');
        check = document.querySelector('#check');
        gateNum = document.querySelector('#gateNum');
        detail = document.querySelector('#detail');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        loadTable();
        getCons();
        bind();
        showMenu();
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

    const bind = function(){
        btnCrear = document.querySelector('#btnCrear');
        btnEditar = document.querySelector('#btnEditar');
        btnEliminar = document.querySelector('#btnEliminar');
        btnDelete = document.querySelector('#btnDelete');
        btnCrear.onclick = createNewGate;
        btnEditar.onclick = editExistGate;
        btnEliminar.onclick = deleteGate;
        btnDelete.onclick = eliminarRegistroGate;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const loadTable = async function(){
        gateList = document.querySelector('#gateList');
        gateList.innerHTML = '';
        consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
            specificGate[index] = infoCons;
        }
        gateList.innerHTML = specificGate.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Puerta}</td>
            <td>${e.Numero_Puerta}</td>
            <td>${e.Detalle}</td>
            <td><input type="radio" class="" name="codGate" value="${e.Cod_Puerta}"></td>
            </tr>`
        })
    }

    const getCons = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
                if(!infoCons.Rango_Ini == "" && !infoCons.Rango_Fin ==""){
                    if(infoCons.Rango_Ini == infoCons.Rango_Fin){
                        alert('Favor cambiar el rango existente, ha alcanzado su limite.');
                        createNewError("Rango alcanzo su limite - Consecutivos");
                    }else{
                        if(infoCons.Descripcion == "Puertas del Aeropuerto"){
                            Codgate.value = infoCons.Prefijo+infoCons.Valor;
                            break;
                        }
                    }
                }else{
                    if(infoCons.Descripcion == "Puertas del Aeropuerto"){
                        Codgate.value = infoCons.Prefijo+infoCons.Valor;
                        break;
                    }
                }
                
            }
    }

    const updateConsID = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
        var length = Object.keys(consEx).length;
        //console.log('out of for');
        for (let index = 0; index < length; index++) {
            //console.log('in of for');
            infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
            if(infoCons.Descripcion == "Puertas del Aeropuerto"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Puertas del Aeropuerto",
                        Valor: infoCons.Valor,
                        Rango_Ini: infoCons.Rango_Ini,
                        UsernameC: localStorage.getItem("User")
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    console.log(infoCons);
                break;
            }
        }
        window.location.href = "puertasCons.html";
    }

    const createNewGate = async function(){
        if(Codgate.value == "" || gateNum.value == "" || detail.value == "Seleccionar una opcion..."){
            alert('Debe ingresar todos los campos');
            createNewError("Fallo al ingresar los datos necesarios - Crear Puerta");
        }else{
            var create = await fetch('http://localhost:50498/api/Puerta',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Cod_Puerta: Codgate.value,
                Numero_Puerta: gateNum.value,
                Detalle: detail.value,
                UsernameC: localStorage.getItem("User")
            })
        })
        alert('Creacion exitosa!');
        updateConsID();
        }
    }

    const editExistGate = async function(){
        if(Codgate.value == "" || gateNum.value == "" || detail.value == "Seleccionar una opcion..." || !document.querySelector('input[name="codGate"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
            createNewError("Fallo al ingresar los datos necesarios - Editar Puerta");
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
                var modcreate = await fetch('http://localhost:50498/api/Puerta/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Cod_Puerta: document.querySelector('input[name="codGate"]:checked').value,
                        Cod_Puerta2: Codgate.value,
                        Numero_Puerta: gateNum.value,
                        Detalle: detail.value,
                        UsernameC: localStorage.getItem("User"),
                        UserCod: document.querySelector('input[name="codGate"]:checked').value
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    alert('Modificacion exitosa!');
                    updateConsID();
                break;
        }
            }else{
                consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Puerta/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Puerta: document.querySelector('input[name="codGate"]:checked').value,
                                Cod_Puerta2: document.querySelector('input[name="codGate"]:checked').value,
                                Numero_Puerta: gateNum.value,
                                Detalle: detail.value,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codGate"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            window.location.href = "puertasCons.html";
                        break;
                    
                }
            
            }
            
        }
    }

    const deleteGate =  function(){
        NameAgencia.value = '';
        imagen.value = '';
        window.location.href = "puertasCons.html";
    }

    const eliminarRegistroGate = async function(){
        if(!document.querySelector('input[name="codGate"]:checked')){
            alert('Debe seleccionar una fila para realizar una eliminacion de registro.');
            createNewError("Fallo al seleccionar una fila - Eliminar Registro Puerta");
        }else{
            consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Puerta/'+index,{
                            method:'DELETE',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Puerta: document.querySelector('input[name="codGate"]:checked').value,
                                Numero_Puerta: gateNum.value,
                                Detalle: detail.value,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codGate"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Solicitud de eliminacion de registro enviada! NOTA: Recordar que si no se elimina es porque ha surgido un error.');
                            window.location.href = "puertasCons.html";
                        break;
                    
                }
        }
        
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