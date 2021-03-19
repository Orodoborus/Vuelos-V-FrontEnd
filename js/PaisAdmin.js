(function(){
    let CodAero = {};
    let NameAgencia = {};
    let imagen = {};
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};
    let check = {};

    let countryList =[];

    let consEx = [];
    let infoCons = [];
    let specificCountry = [];

    const ini = function(){
        CodAero = document.querySelector('#CodAero');
        NameAgencia = document.querySelector('#NameAgencia');
        imagen = document.querySelector('#imagen');
        check = document.querySelector('#check');
        loadTable();
        getCons();
        bind();
    }

    const bind = function(){
        btnCrear = document.querySelector('#btnCrear');
        btnEditar = document.querySelector('#btnEditar');
        btnEliminar = document.querySelector('#btnEliminar');

        btnCrear.onclick = createNewCountry;
        btnEditar.onclick = editExistCountry;
        btnEliminar.onclick = deleteCountry;
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
            <td><input type="radio" class="" name="codpais" value="${e.Cod_Pais}"></td>
            </tr>`
        })
    }


    const getCons = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
                if(infoCons.Descripcion == "Paises"){
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
            if(infoCons.Descripcion == "Paises"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Paises",
                        Valor: infoCons.Valor
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
        if(NameAgencia.value == "" || imagen.files.length == 0){
            alert('Debe ingresar tanto el nombre de agencia, como una imagen');
        }else{
            var create = await fetch('http://localhost:50498/api/Pais',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Cod_Pais: CodAero.value,
                Nombre_Pais: NameAgencia.value,
                Imagen: imagen.value
            })
        })
        alert('Creacion exitosa!');
        updateConsID();
        }
        
        
    }
    
    const editExistCountry = async function(){
        if(NameAgencia.value == "" || imagen.files.length == 0 || !document.querySelector('input[name="codpais"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Pais/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Pais: document.querySelector('input[name="codpais"]:checked').value,
                                Cod_Pais2: CodAero.value,
                                Nombre_Pais: NameAgencia.value,
                                Imagen: imagen.value
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
                        var modcreate = await fetch('http://localhost:50498/api/Pais/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Pais: document.querySelector('input[name="codpais"]:checked').value,
                                Cod_Pais2: document.querySelector('input[name="codpais"]:checked').value,
                                Nombre_Pais: NameAgencia.value,
                                Imagen: imagen.value
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

    ini();

})()