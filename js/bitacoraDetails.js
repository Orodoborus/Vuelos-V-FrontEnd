(function(){
    let user = {};
    let rol = {};
    let logout = {};

    let codregis = {};
    let userchange = {};
    let fechatime = {};
    let time = {};
    let typedetail = {};
    let codmodregis = {};
    let descripcion = {};
    let regisdetails = {};

    let volver = {};

    let exists = [];
    let info = [];
    let specificDetail = [];
    let details = [];




    const ini = function(){
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        codregis = document.querySelector('#codregis');
        userchange = document.querySelector('#userchange');
        fechatime = document.querySelector('#fechaTime');
        time = document.querySelector('#time');
        typedetail = document.querySelector('#typedetail');
        codmodregis = document.querySelector('#codmodregis');
        descripcion = document.querySelector('#descripcion');
        regisdetails = document.querySelector('#regisdetails');
        bind();
        loadDetailInfo(sessionStorage.getItem("bitaDetails"));
    }

    

    const bind = function(){
        volver = document.querySelector('#volver');
        volver.onclick = goBack;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const loadDetailInfo = async function(valor){
       exists = await fetch('http://localhost:50498/api/Bitacora').then(response => response.json());
       var length = Object.keys(exists).length;
       for (let index = 0; index < length; index++) {
           details = await fetch('http://localhost:50498/api/Bitacora/'+index).then(response => response.json());
           if(details.Cod_Registro == valor){
               specificDetail[0] = details;
               break;
           }
       }

       codregis.value = specificDetail[0].Cod_Registro;
       userchange.value = specificDetail[0].Cod_User_FK;
       fechatime.value = specificDetail[0].FechaTime;
       time.value = specificDetail[0].Time;
       typedetail.value = specificDetail[0].Tipo;
       codmodregis.value = specificDetail[0].Cod_Regis;
       descripcion.value = specificDetail[0].Descripcion;
       regisdetails.value = specificDetail[0].RegistroDetalle;

    }

    const goBack = function(){
        window.location.href = "bitacora.html";
    }

    ini();

})()