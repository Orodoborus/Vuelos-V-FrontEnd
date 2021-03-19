(function(){
    let CodAero = {};
    let NameAgencia = {};
    let imagen = {};
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};
    let check = {};


    let airList =[];
    let pais = [];

    let consEx = [];
    let infoCons = [];
    let specificAirline = [];

    let consEx2 = [];
    let specificCountry = [];
    let info2 = [];


    const ini = function(){
        CodAero = document.querySelector('#CodAero');
        NameAgencia = document.querySelector('#NameAgencia');
        imagen = document.querySelector('#imagen');
        pais = document.querySelector('#pais');
        check = document.querySelector('#check');
        loadTable();
        loadCountries();
        getCons();
        bind();
    }

    const bind = function(){
        btnCrear = document.querySelector('#btnCrear');
        btnEditar = document.querySelector('#btnEditar');
        btnEliminar = document.querySelector('#btnEliminar');

        btnCrear.onclick = createNewAirline;
        btnEditar.onclick = editExistAirline;
        btnEliminar.onclick = deleteAirline;
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
                if(infoCons.Descripcion == "Aerolineas"){
                    CodAero.value = infoCons.Prefijo+infoCons.Valor;
                    break;
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
                        Valor: infoCons.Valor
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
        if(NameAgencia.value == "" || imagen.files.length == 0){
            alert('Debe ingresar tanto el nombre de agencia, como una imagen');
        }else{
            var create = await fetch('http://localhost:50498/api/Agencia',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Cod_Agencia: "0",
                Nombre_Agencia: NameAgencia.value,
                Imagen: imagen.value,
                Cod_Pais_FK: pais.value,
                Cod_Aerolinea: CodAero.value
            })
        })
        console.log(NameAgencia.value);
        console.log(imagen.value);
        console.log(pais.value);
        console.log(CodAero.value);
        alert('Creacion exitosa!');
        updateConsID();
        }
    }

    const editExistAirline = async function(){
        if(NameAgencia.value == "" || imagen.files.length == 0 || !document.querySelector('input[name="codAgency"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Agencia').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Agencia/'+index).then(response => response.json());
                var modcreate = await fetch('http://localhost:50498/api/Agencia/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Cod_Agencia: document.querySelector('input[name="codAgency"]:checked').value,
                        Nombre_Agencia: NameAgencia.value,
                        Imagen: imagen.value,
                        Cod_Pais_FK: pais.value,
                        Cod_Aerolinea: CodAero.value
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
                        var modcreate = await fetch('http://localhost:50498/api/Agencia/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Agencia: document.querySelector('input[name="codAgency"]:checked').value,
                                Nombre_Agencia: NameAgencia.value,
                                Imagen: imagen.value,
                                Cod_Pais_FK: pais.value,
                                Cod_Aerolinea: infoCons.Cod_Aerolinea
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

    ini();

})()