(function(){
    let Codflight = {};
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

    let aero = [];
    let country = [];
    let iniDia = {};
    let iniMes = {};
    let iniAno = {};
    let hour = {};
    let minutes = {};
    let price = {};

    let gateList = [];
    let specificGate = [];
    let infoCons = [];

    let consEx2 = [];
    let specificCountry = [];
    let info2 = [];

    let consEx3 = [];
    let specificAgency = [];
    let info3 = [];

    let consEx4 = [];
    let specificGG = [];
    let info4 = [];

    let consEx = [];

    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};


    const ini = function(){
        Codflight = document.querySelector('#Codflight');
        check = document.querySelector('#check');
        gateNum = document.querySelector('#gateNum');
        estado = document.querySelector('#estado');
        aero = document.querySelector('#aero');
        country = document.querySelector('#country');
        price = document.querySelector('#price');
        iniDia = document.querySelector('#iniDia');
        iniMes = document.querySelector('#iniMes');
        iniAno = document.querySelector('#iniAno');
        hour = document.querySelector('#hour');
        minutes = document.querySelector('#minutes');
        detail = document.querySelector('#detail');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        loadTable();
        loadCountries();
        loadAgencies();
        loadGates();
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

    const bind = function(){
        btnCrear = document.querySelector('#btnCrear');
        btnEditar = document.querySelector('#btnEditar');
        btnEliminar = document.querySelector('#btnEliminar');
        btnDelete = document.querySelector('#btnDelete');
        btnCrear.onclick = createNewGate;
        btnEditar.onclick = editExistGate;
        btnEliminar.onclick = deleteGate;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const loadTable = async function(){
        gateList = document.querySelector('#flightList');
        gateList.innerHTML = '';
        consEx = await fetch('http://localhost:50498/api/Vuelos').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Vuelos/'+index).then(response => response.json());
            specificGate[index] = infoCons;
        }
        gateList.innerHTML = specificGate.map(e=>{
            return `
            <tr>
            <td style="text-align: center;">${e.Codigo_Vuelo}</td>
                            <td style="text-align: center;">${e.Aerolinea}</td>
                            <td style="text-align: center;">${e.Cod_Pais_FK}</td>
                            <td style="text-align: center;">${e.Fecha}</td>
                            <td style="text-align: center;">${e.Hora}</td>
                            <td style="text-align: center;">${e.Estado}</td>
                            <td style="text-align: center;">${e.Cod_Puerta_FK}</td>
                            <td style="text-align: center;">${e.CS}</td>
                            <td style="text-align: center;">${e.Price}</td>
            <td><input type="radio" class="" name="codFlight" value="${e.Codigo_Vuelo}"></td>
            </tr>`
        })
    }

    const loadCountries = async function(){
        country = document.querySelector('#country');
        country.innerHTML = '<option value="" selected>Seleccione un pais</option>';
        consEx2 = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
        var length = Object.keys(consEx2).length;
        for (let index = 0; index < length; index++) {
            info2 = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
            specificCountry[index] = info2;
        }
        country.innerHTML += specificCountry.map(e=>{
            return `
            <option value="${e.Nombre_Pais}">${e.Nombre_Pais}</option>`
        })
    }

   const loadAgencies = async function(){
        aero = document.querySelector('#aero');
        aero.innerHTML = '<option value="" selected>Seleccione una aerolinea</option>';
        consEx3 = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
        var length = Object.keys(consEx3).length;
        for (let index = 0; index < length; index++) {
            info3 = await fetch('http://localhost:50498/api/Agencia/'+index).then(response => response.json());
            specificAgency[index] = info3;
        }
        aero.innerHTML += specificAgency.map(e=>{
            return `
            <option value="${e.Nombre_Agencia}">${e.Nombre_Agencia}</option>`
        })
    }

    const loadGates = async function(){
        gateNum = document.querySelector('#gateNum');
        gateNum.innerHTML = '<option value="" selected>Seleccione una puerta</option>';
        consEx4 = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
        var length = Object.keys(consEx4).length;
        for (let index = 0; index < length; index++) {
            info4 = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
            specificGG[index] = info4;
        }
        gateNum.innerHTML += specificGG.map(e=>{
            return `
            <option value="${e.Numero_Puerta}">${e.Numero_Puerta}</option>`
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
                        if(infoCons.Descripcion == "Vuelos"){
                            Codflight.value = infoCons.Prefijo+infoCons.Valor;
                            break;
                        }
                    }
                }else{
                    if(infoCons.Descripcion == "Vuelos"){
                        Codflight.value = infoCons.Prefijo+infoCons.Valor;
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
            if(infoCons.Descripcion == "Vuelos"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Vuelos",
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
        window.location.href = "vuelos.html";
    }

    const createNewGate = async function(){
        if(Codflight.value == "" || gateNum.value == "" || detail.value == "" || aero.value == "" || country.value == "" || iniDia.value == "" || iniMes.value == "" || iniAno.value == ""
        || hour.value == "" || minutes.value == "" || estado.value == "" || price.value == ""){
            alert('Debe ingresar todos los campos');
            createNewError("Fallo al ingresar los datos necesarios - Crear Puerta");
        }else{
            var create = await fetch('http://localhost:50498/api/Vuelos',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Codigo_Vuelo: Codflight.value,
                Aerolinea: aero.value,
                Cod_Pais_FK: country.value,
                Fecha: iniDia.value+"-"+iniMes.value+"-"+iniAno.value,
                Hora: hour.value+":"+minutes.value,
                Estado:estado.value,
                Cod_Puerta_FK:gateNum.value,
                CS: detail.value,
                Price: price.value,
                UsernameC: localStorage.getItem("User")
            })
        })
        alert('Creacion exitosa!');
        updateConsID();
        }
    }

    const editExistGate = async function(){
        if(Codflight.value == "" || gateNum.value == "" || detail.value == "" || aero.value == "" || country.value == "" || iniDia.value == "" || iniMes.value == "" || iniAno.value == ""
        || hour.value == "" || minutes.value == "" || estado.value == "" || price.value == "" || !document.querySelector('input[name="codFlight"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
            createNewError("Fallo al ingresar los datos necesarios - Editar Puerta");
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Vuelos').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Vuelos/'+index).then(response => response.json());
                var modcreate = await fetch('http://localhost:50498/api/Vuelos/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Codigo_Vuelo: document.querySelector('input[name="codFlight"]:checked').value,
                        Codigo_Vuelo2: Codflight.value,
                        Aerolinea: aero.value,
                        Cod_Pais_FK: country.value,
                         Fecha: iniDia.value+"-"+iniMes.value+"-"+iniAno.value,
                        Hora: hour.value+":"+minutes.value,
                        Estado:estado.value,
                        Cod_Puerta_FK:gateNum.value,
                        CS: detail.value,
                        Price: price.value,
                        UsernameC: localStorage.getItem("User")
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    alert('Modificacion exitosa!');
                    updateConsID();
                break;
        }
            }else{
                consEx = await fetch('http://localhost:50498/api/Vuelos').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Vuelos/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Vuelos/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Codigo_Vuelo: document.querySelector('input[name="codFlight"]:checked').value,
                                Codigo_Vuelo2: document.querySelector('input[name="codFlight"]:checked').value,
                                Aerolinea: aero.value,
                                Cod_Pais_FK: country.value,
                                Fecha: iniDia.value+"-"+iniMes.value+"-"+iniAno.value,
                                Hora: hour.value+":"+minutes.value,
                                Estado:estado.value,
                                Cod_Puerta_FK:gateNum.value,
                                CS: detail.value,
                                Price: price.value,
                                UsernameC: localStorage.getItem("User")
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            window.location.href = "vuelos.html";
                        break;
                    
                }
            
            }
            
        }
    }

    const deleteGate =  function(){
        window.location.href = "vuelos.html";
    }

    const eliminarRegistroGate = async function(){
        if(!document.querySelector('input[name="codFlight"]:checked')){
            alert('Debe seleccionar una fila para realizar una eliminacion de registro.');
            createNewError("Fallo al seleccionar una fila - Eliminar Registro Puerta");
        }else{
            consEx = await fetch('http://localhost:50498/api/Vuelos').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Vuelos/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Vuelos/'+index,{
                            method:'DELETE',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Puerta: document.querySelector('input[name="codFlight"]:checked').value,
                                Numero_Puerta: gateNum.value,
                                Detalle: detail.value,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codFlight"]:checked').value
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