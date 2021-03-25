(function(){
    let admin = {};
    let security = {};
    let consecutivo = {};
    let Mantenimiento = {};
    let User = {};
    let btnActualizar = {};
    
    let tableError = [];
    let ErrorList = [];
    let newError = {};
    let errorList = [];
    let allbitacoras = [];
    let eachBitacora = [];
    let onlyOneBitacora = [];


    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};



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
        User = document.querySelector('#User');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        getBitacoras();
        //bind();
        showMenu();
        //createNewError("Holi");//Insertar el String del Error as a String.
    }

    const bind = function(){
        btnActualizar = document.querySelector('#btnActualizar');
        btnActualizar.onclick = actualizar;
        logout.onclick = logoutUser;
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
                <td value="${e.Cod_Regis}" id="${e.Cod_Regis}">${e.Cod_Regis}</td>
                <td value="${e.Cod_Registro}" id="${e.Cod_Registro}">${e.Cod_Registro}</td>
                <td value="${e.Cod_User_FK}">${e.Cod_User_FK}</td>
                <td value="${e.Descripcion}">${e.Descripcion}</td>
                <td value="${e.FechaTime}">${e.FechaTime}</td>
                <td value="${e.Tipo}">${e.Tipo}</td>
                <td value="${e.Time}">${e.Time}</td>
                </tr>`
            })
        }

    ini();  
      

})()