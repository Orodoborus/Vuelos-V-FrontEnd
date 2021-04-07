(function(){

    let user = {};
    let rol = {};
    let logout = {};

    let doorList = [];
    let detail = {};
    let filter = {};
    let seeAll = {};

    let existGate = [];
    let infoGate = [];
    let specificGate = [];

    let existGate2 = [];
    let infoGate2 = [];
    let specificGate2 = [];
    let specificGateSelectFiltered = [];

    const ini = function(){
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        detail = document.querySelector('#detail');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        loadtable();
        showMenu();
        binder();
    }

    const binder = function(){
        filter = document.querySelector('#filter');
        seeAll = document.querySelector('#seeAll');
        filter.onclick = activateFilter;
        seeAll.onclick = seeAllGates;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const loadtable = async function(){
        doorList = document.querySelector('#doorList');
        doorList.innerHTML = '';
        existGate = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
        var length = Object.keys(existGate).length;
        for (let index = 0; index < length; index++) {
            infoGate = await fetch('http://localhost:50498/api/Puerta/'+index).then(response=>response.json());
            specificGate[index] = infoGate;
        }
        doorList.innerHTML = specificGate.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Puerta}</td>
            <td>${e.Numero_Puerta}</td>
            <td>${e.Detalle}</td>
            </tr>
            `
        })
    }

    const seeAllGates = function(){
        window.location.href = "puertasAct.html";
    }


    const activateFilter = async ()=>{
        if(detail.value == ""){
            alert('Debe seleccionar un detalle para filtrar!');
        }else{
            var sendFilter = await fetch('http://localhost:50498/api/PuertasActivas',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Detalle: detail.value
                })
            })
            getNewTable();
        }
    }

    const getNewTable =async function(){
        specificGate2 = document.querySelector('#doorList');
        specificGate2.innerHTML = '';
        existGate2 = await fetch('http://localhost:50498/api/PuertasActivas').then(response => response.json());
        var length = Object.keys(existGate2).length;
        for (let index = 0; index < length; index++) {
            infoGate2 = await fetch('http://localhost:50498/api/PuertasActivas/'+index).then(response=>response.json());
            specificGateSelectFiltered[index] = infoGate2;
        }
        specificGate2.innerHTML = specificGateSelectFiltered.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Puerta}</td>
            <td>${e.Numero_Puerta}</td>
            <td>${e.Detalle}</td>
            </tr>
            `
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


ini();

})()