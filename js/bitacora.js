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

    let seeAllBitacora = {};


    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};

    let iniDia = {};
    let iniMes = {};
    let iniAno = {};

    let finDia = {};
    let finMes = {};
    let finAno = {};



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

        iniDia = document.querySelector('#iniDia');
        iniMes = document.querySelector('#iniMes');
        iniAno = document.querySelector('#iniAno');

        finDia = document.querySelector('#finDia');
        finMes = document.querySelector('#finMes');
        finAno = document.querySelector('#finAno');
        
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
        seeAllBitacora = document.querySelector('#seeAllBitacora');
        btnActualizar.onclick = filterAct;
        seeAllBitacora.onclick = seealldatabitacora;
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
        if(!users.value == ""){
            if(!iniDia.value == "" || !iniMes.value == "" || !iniAno.value == "" || !finDia.value == "" || !finMes.value == "" || !finAno.value == ""){
                /*usuario y fecha definitivamente es seleccionado*/ 
                if(document.querySelector('input[name="type"]:checked')){
                    /*FILTRO DE USUARIO, TIPO Y RANGOS DE FECHA*/
                    var sendFilter = await fetch('http://localhost:50498/api/BitacoraTypeUserRangeDatesFilter',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            Tipo: document.querySelector('input[name="type"]:checked').value,
                            Cod_User_FK: users.value,
                            date1: iniDia.value+ "-"+iniMes.value+"-"+iniAno.value,
                            date2: finDia.value+ "-"+finMes.value+"-"+finAno.value
                        })
                    })
                    getNewTableDatesTypeUser();
                }else{
                    /*SOLO FILTRO DE USUARIO Y RANGOS DE FECHA*/ 
                    var sendFilter = await fetch('http://localhost:50498/api/BitacorasRangoFechaAndUser',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            Cod_User_FK: users.value,
                            date1: iniDia.value+ "-"+iniMes.value+"-"+iniAno.value,
                            date2: finDia.value+ "-"+finMes.value+"-"+finAno.value
                        })
                    })
                    getNewTableDateRangeAndUser();
                }
           }else{
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
            }
        }else{
            if(iniDia.value == "" || iniMes.value == "" || iniAno.value == "" || finDia.value == "" || finMes.value == "" || finAno.value == ""){
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
                        getNewTableTypeAndUser();
                    }else{
                        /* SOLO TIPO */
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
        }else{
            if(document.querySelector('input[name="type"]:checked')){
                /* SOLO TIPO Y FECHA */
                var sendFilter = await fetch('http://localhost:50498/api/BitacoraTypeAndDateFilter',{
                    method:'POST',
                    headers:{
                           'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                         Tipo: document.querySelector('input[name="type"]:checked').value,
                         date1: iniDia.value+ "-"+iniMes.value+"-"+iniAno.value,
                         date2: finDia.value+ "-"+finMes.value+"-"+finAno.value
                       })
                   })
                   getNewTableDateRangeAndType();
                
            }else{
                /* SOLO FECHAS */
                var sendFilter = await fetch('http://localhost:50498/api/BitacoraFilterByDateRange',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            date1: iniDia.value+ "-"+iniMes.value+"-"+iniAno.value,
                            date2: finDia.value+ "-"+finMes.value+"-"+finAno.value
                        })
                    })
                    getNewTableByDateRange();
    
            }

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

    const getNewTableDateRangeAndType = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacoraTypeAndDateFilter').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacoraTypeAndDateFilter/'+index).then(response => response.json());
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

    const getNewTableDateRangeAndUser = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacorasRangoFechaAndUser').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacorasRangoFechaAndUser/'+index).then(response => response.json());
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

    const getNewTableDatesTypeUser = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacoraTypeUserRangeDatesFilter').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacoraTypeUserRangeDatesFilter/'+index).then(response => response.json());
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

    const getNewTableByDateRange = async function(){
        bitacoralist2 = document.querySelector('#bitacoraList');
        bitacoralist2.innerHTML = '';
        allbitacoras2 = await fetch('http://localhost:50498/api/BitacoraFilterByDateRange').then(response => response.json());
            var length = Object.keys(allbitacoras2).length;
            for (let index = 0; index < length; index++) {
                onlyOneBitacora2 = await fetch('http://localhost:50498/api/BitacoraFilterByDateRange/'+index).then(response => response.json());
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
                <td value="${e.FechaTime}">${e.FechaTime}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td value="${e.Descripcion}">${e.Descripcion}</td>
                <td><button type="button" class="openbtn" onclick="bitaDetail('${e.Cod_Registro}')">Seleccionar Usuario</button></td>
                </tr>`
            })
        }

        const seealldatabitacora = function(){
            window.location.href = "bitacora.html";
        }

    ini();  
      

})()