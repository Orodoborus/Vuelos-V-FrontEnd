(function(){
    let CodAero = {};
    let NameAgencia = {};
    let imagen = {};
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};
    let btnDelete = {};
    let check = {};
    let user = {};
    let rol = {};
    let logout = {};


    let airList =[];
    let pais = [];

    let consEx = [];
    let infoCons = [];
    let specificAirline = [];

    let consEx2 = [];
    let specificCountry = [];
    let info2 = [];


    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};



    const ini = function(){
        CodAero = document.querySelector('#CodAero');
        NameAgencia = document.querySelector('#NameAgencia');
        imagen = document.querySelector('#imagen');
        pais = document.querySelector('#pais');
        check = document.querySelector('#check');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        loadTable();
        loadCountries();
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
        logout.onclick = logoutUser;
        btnCrear.onclick = createNewAirline;
        btnEditar.onclick = editExistAirline;
        btnEliminar.onclick = deleteAirline;
        btnDelete.onclick = eliminarRegistroAero;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const loadCountries = async function(){
        pais = document.querySelector('#pais');
        pais.innerHTML = '';
        consEx2 = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
        var length = Object.keys(consEx2).length;
        for (let index = 0; index < length; index++) {
            info2 = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
            specificCountry[index] = info2;
        }
        pais.innerHTML = specificCountry.map(e=>{
            return `
            <option value="${e.Cod_Pais}" selected>${e.Cod_Pais}</option>`
        })
    }


    const loadTable = async function(){
        airList = document.querySelector('#airList');
        airList.innerHTML = '';
        consEx = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Agencia/'+index).then(response => response.json());
            specificAirline[index] = infoCons;
        }
        airList.innerHTML = specificAirline.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Aerolinea}</td>
            <td>${e.Nombre_Agencia}</td>
            <td><input type="radio" class="" name="codAgency" value="${e.Cod_Agencia}"></td>
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
                        createNewError("Limite del rango alcanzado - Aerolineas");
                        btnCrear.disabled = true;
                        btnEditar.disabled = true;
                        btnEliminar.disabled = true;
                    }else{
                        if(infoCons.Descripcion == "Aerolineas"){
                            CodAero.value = infoCons.Prefijo+infoCons.Valor;
                            console.log(infoCons.Rango_Ini);
                            break;
                        }
                    }
                }else{
                    if(infoCons.Descripcion == "Aerolineas"){
                        CodAero.value = infoCons.Prefijo+infoCons.Valor;
                        console.log(infoCons.Rango_Ini);
                        break;
                    }
                }
                
            }
            
    }

    const updateConsID = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
        var length = Object.keys(consEx).length;
        console.log('out of for');
        for (let index = 0; index < length; index++) {
            console.log('in of for');
            infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
            if(infoCons.Descripcion == "Aerolineas"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Aerolineas",
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
        window.location.href = "aerolinea.html";
    }

    const createNewAirline = async function(){
        if(CodAero.value=="" || NameAgencia.value == "" || imagen.files.length == 0){
            alert('Debe ingresar tanto el nombre de agencia, como una imagen');
            createNewError("No se ingresaron los datos necesarios - Crear Aerolinea");
        }else{
            var path = imagen.value;
            var filename = path.replace(/^.*\\/, "");
            var create = await fetch('http://localhost:50498/api/Agencia',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Cod_Agencia: "0",
                Nombre_Agencia: NameAgencia.value,
                Imagen: filename,
                Cod_Pais_FK: pais.value,
                Cod_Aerolinea: CodAero.value,
                UsernameC: localStorage.getItem("User")
            })
        })
        console.log(localStorage.getItem("User"));
        console.log(NameAgencia.value);
        console.log(imagen.value);
        console.log(pais.value);
        console.log(CodAero.value);
        alert('Creacion exitosa!');
        updateConsID();
        }
    }

    const editExistAirline = async function(){
        if(CodAero.value=="" || NameAgencia.value == "" || imagen.files.length == 0 || !document.querySelector('input[name="codAgency"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
            createNewError("No se ingresaron los datos necesarios o no se selecciono la fila - Editar Aerolinea");
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Agencia/'+index).then(response => response.json());
            var path = imagen.value;
            var filename = path.replace(/^.*\\/, "");
                var modcreate = await fetch('http://localhost:50498/api/Agencia/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Cod_Agencia: document.querySelector('input[name="codAgency"]:checked').value,
                        Nombre_Agencia: NameAgencia.value,
                        Imagen: filename,
                        Cod_Pais_FK: pais.value,
                        Cod_Aerolinea: CodAero.value,
                        UsernameC: localStorage.getItem("User"),
                        UserCod: document.querySelector('input[name="codAgency"]:checked').value
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    alert('Modificacion exitosa!');
                    updateConsID();
                break;
        }
            }else{
                consEx = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Agencia/'+index).then(response => response.json());
                    var path = imagen.value;
                    var filename = path.replace(/^.*\\/, "");
                        var modcreate = await fetch('http://localhost:50498/api/Agencia/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Agencia: document.querySelector('input[name="codAgency"]:checked').value,
                                Nombre_Agencia: NameAgencia.value,
                                Imagen: filename,
                                Cod_Pais_FK: pais.value,
                                Cod_Aerolinea: infoCons.Cod_Aerolinea,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codAgency"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            window.location.href = "aerolinea.html";
                        break;
                    
                }
                

            }
            
        }
    }

    const deleteAirline = function(){
        NameAgencia.value = '';
        imagen.value = '';
        window.location.href = "aerolinea.html";
    }

    const eliminarRegistroAero = async function(){
        if(!document.querySelector('input[name="codAgency"]:checked')){
            alert('Debe seleccionar una fila para realizar una eliminacion de registro.');
            createNewError("No se selecciono una fila - Eliminar Aerolinea");
        }else{
            consEx = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Agencia/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Agencia/'+index,{
                            method:'DELETE',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Agencia: document.querySelector('input[name="codAgency"]:checked').value,
                                Nombre_Agencia: NameAgencia.value,
                                Imagen: imagen.value,
                                Cod_Pais_FK: pais.value,
                                Cod_Aerolinea: infoCons.Cod_Aerolinea,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codAgency"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Solicitud de eliminacion de registro enviada! NOTA: Recordar que si no se elimina es porque ha surgido un error.');
                            window.location.href = "aerolinea.html";
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