(function(){
    let codpais = [];
    let country = {};
    let filter = {};
    let seeAll = {};
    let aeroContryList = [];

    let user = {};
    let rol = {};
    let logout = {};

    let existCountry = [];
    let infoCon = [];
    let specificCountry = [];

    let existAgency = [];
    let infoAgent = [];
    let specificAgency = [];

    let aeroContryList2 = [];
    let existAgency2 = [];
    let infoAgent2 = [];
    let specificAgency2 = [];

    const ini = () =>{
        country = document.querySelector('#country');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        loadCountries();
        cargarAgencias();
        showMenu()
        binder();
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

    const binder = () =>{
        filter = document.querySelector('#filter');
        seeAll = document.querySelector('#seeAll');
        filter.onclick = activateFilter;
        seeAll.onclick = mostrarTodos;
        logout.onclick = logoutUser;
    }

    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }

    const mostrarTodos = function(){
        window.location.href = "aeroPais.html";
    }


    const activateFilter = async ()=>{
        if(codpais.value == "" || country.value == ""){
            alert('Debe seleccionar un pais para filtrar!');
        }else{
            var sendFilter = await fetch('http://localhost:50498/api/FilteredAgency',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Cod_Pais_FK: codpais.value
                })
            })
            getNewTable();
        }
    }

    const getNewTable =async function(){
        aeroContryList2 = document.querySelector('#aeroContryList');
        aeroContryList2.innerHTML = '';
        existAgency2 = await fetch('http://localhost:50498/api/FilteredAgency').then(response => response.json());
        var length = Object.keys(existAgency2).length;
        for (let index = 0; index < length; index++) {
            infoAgent2 = await fetch('http://localhost:50498/api/FilteredAgency/'+index).then(response=>response.json());
            specificAgency2[index] = infoAgent2;
        }
        aeroContryList2.innerHTML = specificAgency2.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Agencia}</td>
            <td>${e.Nombre_Agencia}</td>
            <td><img src="../Img/Imgs/${e.Imagen}" alt="${e.Imagen}" height="50px"></td>
            </tr>
            `
        })
    }



    const loadCountries = async function(){
        codpais = document.querySelector('#codpais');
        codpais.innerHTML = '<option value="">Seleccione un pais</option>';
        existCountry = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
        var length = Object.keys(existCountry).length;
        for (let index = 0; index < length; index++) {
            infoCon = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
            specificCountry[index] = infoCon;
        }
        codpais.innerHTML += specificCountry.map(e=>{
            return `
            <option value="${e.Cod_Pais}">${e.Cod_Pais}</option>`
        })
    }

    const cargarAgencias = async function(){
        aeroContryList = document.querySelector('#aeroContryList');
        aeroContryList.innerHTML = '';
        existAgency = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
        var length = Object.keys(existAgency).length;
        for (let index = 0; index < length; index++) {
            infoAgent = await fetch('http://localhost:50498/api/Agencia/'+index).then(response=>response.json());
            specificAgency[index] = infoAgent;
        }
        aeroContryList.innerHTML = specificAgency.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Agencia}</td>
            <td>${e.Nombre_Agencia}</td>
            <td><img src="../Img/Imgs/${e.Imagen}" alt="${e.Imagen}" height="50px"></td>
            </tr>
            `
        })
    }

    ini();

})()