(function(){
    let btnActualizar = {};
    
    let tableError = [];
    let ErrorList = [];
    let newError = {};
    let errorList = [];
    let allbitacoras = [];
    let eachBitacora = [];
    let onlyOneBitacora = [];

    let bitacoralist2 = [];
    let allbitacoras2 = [];
    let eachBitacora2 = [];
    let onlyOneBitacora2 = [];


    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};


    let add = {};
    let del = {};
    let mod = {};
    let users = [];
    let exUs = [];
    let infofo = [];
    let specificUser = [];

    let info = [];
    let data = [];

    let quan = 0;
    let selected = {};

    let user = {};
    let rol = {};
    let logout = {};

    const ini = function(){

        Error_Message = document.querySelector('#Error_Message');
        Error_Number = document.querySelector('#Error_Number');

        admin = document.querySelector('#admin');
        security = document.querySelector('#security');
        consecutivo = document.querySelector('#consecutivo');
        Mantenimiento = document.querySelector('#Mantenimiento');
        add = document.querySelector('#add');
        del = document.querySelector('#del');
        mod = document.querySelector('#mod');
        User = document.querySelector('#User');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        getBitacoras();
        bind();
        showMenu();
        loadUsers();
        //createNewError("Holi");//Insertar el String del Error as a String.
    }

    const bind = function(){
        btnActualizar = document.querySelector('#buscarBitacora');
        btnActualizar.onclick = filterAct;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const loadUsers = async function(){
        users = document.querySelector('#users');
        users.innerHTML = '<option value="" selected>Seleccione un usuario</option>';
        exUs = await fetch('http://localhost:50498/api/Usuario').then(response => response.json());
        var length = Object.keys(exUs).length;
        for (let index = 0; index < length; index++) {
            infofo = await fetch('http://localhost:50498/api/Usuario/'+index).then(response => response.json());
            specificUser[index] = infofo;
        }
        users.innerHTML += specificUser.map(e=>{
            return `
            <option value="${e.Username}">${e.Username}</option>`
        })
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

    const filterAct = async function(){

        var cont1 = 0;
        var cont2 = 0;
        var cont3 = 0;

        if(!users.value == ""){
      /*      if(validacionFECHA){*/
        cont1 = cont1 +1;
          /*  }else{*/
            if(document.querySelector('input[name="type"]:checked')){
                /*FILTRO DE USUARIO Y TIPO*/
                    var sendFilter = await fetch('http://localhost:50498/api/BitacoraTypeAndUserFilter',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Tipo: document.querySelector('input[name="type"]:checked').value,
                        Cod_User_FK: users.value
                    })
                })
                getNewTableTypeAndUser();
            }else{
                /*SOLO FILTRO DE USUARIO*/ 
                console.log('asasasas');
                var sendFilter = await fetch('http://localhost:50498/api/BitacoraUserFiltered',{
                 method:'POST',
                 headers:{
                        'Content-Type':'application/json'
                 },
                 body:JSON.stringify({
                      Cod_User_FK: users.value
                    })
                })
                getNewTable();
            }
           /* }*/
        }
        
        /*if(validacionFECHA){

        }else{
            if(users.value = ""){

                    
            }else{
                if(document.querySelector('input[name="type"]:checked')){
          
                }
            }
        } */

        if(document.querySelector('input[name="type"]:checked')){
            if(!users.value == ""){
                /*FILTRO DE USUARIO Y TIPO*/
                var sendFilter = await fetch('http://localhost:50498/api/BitacoraTypeAndUserFilter',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Tipo: document.querySelector('input[name="type"]:checked').value,
                        Cod_User_FK: users.value
                    })
                })
            }else{
                var sendFilter = await fetch('http://localhost:50498/api/BitacoraTypeFiltered',{
                 method:'POST',
                 headers:{
                        'Content-Type':'application/json'
                 },
                 body:JSON.stringify({
                      Tipo: document.querySelector('input[name="type"]:checked').value
                    })
                })
                getNewTableType();
            }
            
        }
    }

    const getNewTable = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacoraUserFiltered').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacoraUserFiltered/'+index).then(response => response.json());
                eachBitacora2[index] = onlyOneBitacora2;
            }
            bitacoralist2.innerHTML = eachBitacora2.map(e=>{
                return `               
                <tr>
                <td value="${e.Cod_Registro}" id="${e.Cod_Registro}">${e.Cod_Registro}</td>
                <td value="${e.Descripcion}">${e.Descripcion}</td>
                <td value="${e.FechaTime}">${e.FechaTime}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td><button type="button" class="openbtn" onclick="bitaDetail('${e.Cod_Registro}')">Seleccionar Usuario</button></td>
                </tr>`
            })
    }

    const getNewTableType = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacoraTypeFiltered').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacoraTypeFiltered/'+index).then(response => response.json());
                eachBitacora2[index] = onlyOneBitacora2;
            }
            bitacoralist2.innerHTML = eachBitacora2.map(e=>{
                return `               
                <tr>
                <td value="${e.Cod_Registro}" id="${e.Cod_Registro}">${e.Cod_Registro}</td>
                <td value="${e.FechaTime}">${e.FechaTime}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td value="${e.Descripcion}">${e.Descripcion}</td>
                <td><button type="button" class="openbtn" onclick="bitaDetail('${e.Cod_Registro}')">Seleccionar Usuario</button></td>
                </tr>`
            })
    }

    const getNewTableTypeAndUser = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacoraTypeAndUserFilter').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacoraTypeAndUserFilter/'+index).then(response => response.json());
                eachBitacora2[index] = onlyOneBitacora2;
            }
            bitacoralist2.innerHTML = eachBitacora2.map(e=>{
                return `               
                <tr>
                <td value="${e.Cod_Registro}" id="${e.Cod_Registro}">${e.Cod_Registro}</td>
                <td value="${e.FechaTime}">${e.FechaTime}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td value="${e.Descripcion}">${e.Descripcion}</td>
                <td><button type="button" class="openbtn" onclick="bitaDetail('${e.Cod_Registro}')">Seleccionar Usuario</button></td>
                </tr>`
            })
    }

    const getBitacoras = async function(){

        bitacoraList = document.querySelector('#bitacoraList');
        bitacoraList.innerHTML = '';
        allbitacoras = await fetch('http://localhost:50498/api/Bitacora').then(response => response.json());
            var length = Object.keys(allbitacoras).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora = await fetch('http://localhost:50498/api/Bitacora/'+index).then(response => response.json());
                eachBitacora[index] = onlyOneBitacora;
            }
            bitacoraList.innerHTML = eachBitacora.map(e=>{
                return `               
                <tr>
                <td value="${e.Cod_Registro}" id="${e.Cod_Registro}">${e.Cod_Registro}</td>
                <td value="${e.Descripcion}">${e.Descripcion}</td>
                <td value="${e.FechaTime}">${e.FechaTime}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td><button type="button" class="openbtn" onclick="bitaDetail('${e.Cod_Registro}')">Seleccionar Usuario</button></td>
                </tr>`
            })
        }

    ini();  
      

})()