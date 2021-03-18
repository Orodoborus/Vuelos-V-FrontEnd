(function(){
    let CodAero = {};
    let NameAgencia = {};
    let imagen = {};
    let selectedValue;
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};

    let countryList =[];

    let consEx = [];
    let infoCons = [];
    let specificCountry = [];

    const ini = function(){
        CodAero = document.querySelector('#CodAero');
        NameAgencia = document.querySelector('#NameAgencia');
        imagen = document.querySelector('#imagen');
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
        consEx = await fetch('http://localhost:50498/api/Consecutivos').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                infoCons = await fetch('http://localhost:50498/api/Consecutivos/'+index).then(response => response.json());
                if(infoCons.Descripcion == "Paises"){
                    CodAero.value = infoCons.Prefijo+infoCons.Valor;
                    break;
                }
            }
    }

    const updateConsID = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
            if(infoCons.Descripcion == "Paises"){
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: cons.value,
                        Valor: modcreate.Valor,
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                break;
            }
        }
    }

    const createNewCountry = async function(){
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
        alert('Solicitud de creacion enviada!');
        updateConsID();
        window.location.href = "paises.html";
    }
    
    const editExistCountry = async function(){
        consEx = await fetch('http://localhost:50498/api/Pais').then(response => response.json());
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Pais/'+index).then(response => response.json());
            if(infoCons.Descripcion == "Paises"){
                const rbs = document.querySelectorAll('input[name="codpais"]');

                    for (const rb of rbs) {
                    if (rb.checked) {
                        selectedValue = rb.value;
                        break;
                    }
            }
                var modcreate = await fetch('http://localhost:50498/api/Pais/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Cod_Pais: selectedValue.value,
                        Nombre_Pais: NameAgencia.value,
                        Imagen: imagen.value
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    alert('Solicitud de Edicion enviado!');
                    window.location.href = "paises.html";
                break;
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