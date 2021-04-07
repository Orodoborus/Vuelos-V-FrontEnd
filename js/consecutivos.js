(function(){
    let conList = [];
    let newCon = {};
    let user = {};
    let rol = {};
    let logout = {};
    let allcons = [];
    let eachCon = [];
    let onlyOneCon = [];

    const ini = function(){
        newCon =  document.querySelector('#newCon');
        newCon.onclick = newConsecutivo;
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        logout.onclick = logoutUser;
        showMenu();
        getConsecutives();
    }

    const getConsecutives = async function(){
        conList = document.querySelector('#conList');
        conList.innerHTML = '';
        allcons = await fetch('http://localhost:50498/api/Consecutivos').then(response => response.json());
        var length = Object.keys(allcons).length;
        for (let index = 0; index < length; index++) {
            onlyOneCon = await fetch('http://localhost:50498/api/Consecutivos/'+index).then(response => response.json());
            eachCon[index] = onlyOneCon;
        }
        conList.innerHTML = eachCon.map(e=>{
            return `
            <tr>
            <td>${e.Codigo_Consecutivo}</td>
            <td>${e.Descripcion}</td>
            <td>${e.Valor}</td>
            <td><button class="openbtn" onclick="editCons('${e.Descripcion}')">Editar</button></td>
            </tr>`
        })
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
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

    

    const newConsecutivo = function(){
        window.location.href = "consecutivosEdit.html";
        sessionStorage.setItem("description","Seleccione una opcion");
    }


    ini();

})()