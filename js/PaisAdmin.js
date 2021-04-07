(function(){
    let CodAero = {};
    let NameAgencia = {};
    let imagen = {};
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};
    let check = {};
    let btnDelete = {};
    let user = {};
    let rol = {};
    let logout = {};

    let countryList =[];

    let consEx = [];
    let infoCons = [];
    let specificCountry = [];

    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};

    const ini = function(){
        CodAero = document.querySelector('#CodAero');
        NameAgencia = document.querySelector('#NameAgencia');
        imagen = document.querySelector('#imagen');
        check = document.querySelector('#check');
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
        btnCrear.onclick = createNewCountry;
        btnEditar.onclick = editExistCountry;
        btnEliminar.onclick = deleteCountry;
        btnDelete.onclick = eliminarRegistroPais;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }


    const loadTable = async function(){
        countryList = document.querySelector('#countryList');
        countryList.innerHTML = '';
        consEx = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
            specificCountry[index] = infoCons;
        }
        countryList.innerHTML = specificCountry.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Pais}</td>
            <td>${e.Nombre_Pais}</td>
            <td><img src="../Img/Imgs/${e.Imagen}" alt="${e.Imagen}" height="50px"></td>
            <td><input type="radio" class="" name="codpais" value="${e.Cod_Pais}"></td>
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
                        createNewError("Rango existente llego a su limite - Consecutivos");
                    }else{
                        if(infoCons.Descripcion == "Paises"){
                            CodAero.value = infoCons.Prefijo+infoCons.Valor;
                            break;
                        }
                    }
                }else{
                    if(infoCons.Descripcion == "Paises"){
                        CodAero.value = infoCons.Prefijo+infoCons.Valor;
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
            if(infoCons.Descripcion == "Paises"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Paises",
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
        window.location.href = "paises.html";
    }

    const createNewCountry = async function(){
        if(CodAero.value == "" || NameAgencia.value == "" || imagen.files.length == 0){
            alert('Debe ingresar tanto el nombre de agencia, como una imagen');
            createNewError("Fallo a ingresar los datos requeridos - Registrar Pais");
        }else{
            var path = imagen.value;
            var filename = path.replace(/^.*\\/, "");
            var create = await fetch('http://localhost:50498/api/Pais',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Cod_Pais: CodAero.value,
                Nombre_Pais: NameAgencia.value,
                Imagen: filename,
                UsernameC: localStorage.getItem("User")
            })
        })
        alert('Creacion exitosa!');
        updateConsID();
        }
        
        
    }
    
    const editExistCountry = async function(){
        if(CodAero.value == "" || NameAgencia.value == "" || imagen.files.length == 0 || !document.querySelector('input[name="codpais"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
            createNewError("Fallo a ingresar los datos requeridos o seleccionar una fila - Editar Pais");
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
                    var path = imagen.value;
                    var filename = path.replace(/^.*\\/, "");
                        var modcreate = await fetch('http://localhost:50498/api/Pais/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Pais: document.querySelector('input[name="codpais"]:checked').value,
                                Cod_Pais2: CodAero.value,
                                Nombre_Pais: NameAgencia.value,
                                Imagen: filename,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codpais"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            updateConsID();
                        break;
                }
            }else{
                consEx = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
                    var path = imagen.value;
                    var filename = path.replace(/^.*\\/, "");
                        var modcreate = await fetch('http://localhost:50498/api/Pais/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Pais: document.querySelector('input[name="codpais"]:checked').value,
                                Cod_Pais2: document.querySelector('input[name="codpais"]:checked').value,
                                Nombre_Pais: NameAgencia.value,
                                Imagen: filename,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codpais"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            window.location.href = "paises.html";
                        break;
                }
            }
            
        }
        
    }

    const deleteCountry = function(){
        NameAgencia.value = '';
        imagen.value = '';
        window.location.href = "paises.html";
    }

    const eliminarRegistroPais = async function(){
        if(!document.querySelector('input[name="codpais"]:checked')){
            alert('Debe seleccionar una fila para realizar una eliminacion de registro.');
            createNewError("Fallo al seleccionar una fila - Eliminar Pais");
            
        }else{
            consEx = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Pais/'+index,{
                            method:'DELETE',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Pais: document.querySelector('input[name="codpais"]:checked').value,
                                Cod_Pais2: CodAero.value,
                                Nombre_Pais: NameAgencia.value,
                                Imagen: imagen.value,
                                UsernameC: localStorage.getItem("User"),
                                UserCod: document.querySelector('input[name="codpais"]:checked').value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Solicitud de eliminacion de registro enviada! NOTA: Recordar que si no se elimina es porque ha surgido un error.');
                            window.location.href = "paises.html";
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