(function(){
    let Codgate = {};
    let check = {};
    let gateNum = {};
    let detail = {};
    let btnCrear = {};
    let btnEditar = {};
    let btnEliminar = {};

    let gateList = [];
    let specificGate = [];
    let infoCons = [];

    let consEx = [];

    const ini = function(){
        Codgate = document.querySelector('#Codgate');
        check = document.querySelector('#check');
        gateNum = document.querySelector('#gateNum');
        detail = document.querySelector('#detail');
        loadTable();
        getCons();
        bind();
    }

    const bind = function(){
        btnCrear = document.querySelector('#btnCrear');
        btnEditar = document.querySelector('#btnEditar');
        btnEliminar = document.querySelector('#btnEliminar');
        btnCrear.onclick = createNewGate;
        btnEditar.onclick = editExistGate;
        btnEliminar.onclick = deleteGate;
    }

    const loadTable = async function(){
        gateList = document.querySelector('#gateList');
        gateList.innerHTML = '';
        consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
            specificGate[index] = infoCons;
        }
        gateList.innerHTML = specificGate.map(e=>{
            return `
            <tr>
            <td>${e.Cod_Puerta}</td>
            <td>${e.Numero_Puerta}</td>
            <td>${e.Detalle}</td>
            <td><input type="radio" class="" name="codGate" value="${e.Cod_Puerta}"></td>
            </tr>`
        })
    }

    const getCons = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
                if(infoCons.Descripcion == "Puertas del Aeropuerto"){
                    Codgate.value = infoCons.Prefijo+infoCons.Valor;
                    break;
                }
            }
    }

    const updateConsID = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
        var length = Object.keys(consEx).length;
        //console.log('out of for');
        for (let index = 0; index < length; index++) {
            //console.log('in of for');
            infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
            if(infoCons.Descripcion == "Puertas del Aeropuerto"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Puertas del Aeropuerto",
                        Valor: infoCons.Valor
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    console.log(infoCons);
                break;
            }
        }
        window.location.href = "puertasCons.html";
    }

    const createNewGate = async function(){
        if(gateNum.value == "" || detail.value == "Seleccionar una opcion..."){
            alert('Debe ingresar todos los campos');
        }else{
            var create = await fetch('http://localhost:50498/api/Puerta',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Cod_Puerta: Codgate.value,
                Numero_Puerta: gateNum.value,
                Detalle: detail.value
            })
        })
        alert('Creacion exitosa!');
        updateConsID();
        }
    }

    const editExistGate = async function(){
        if(gateNum.value == "" || detail.value == "Seleccionar una opcion..." || !document.querySelector('input[name="codGate"]:checked')){
            alert('Debe ingresar llenar los campos y seleccionar una fila.');
        }else{
            if(check.checked == true){
                consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
                var modcreate = await fetch('http://localhost:50498/api/Puerta/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Cod_Puerta: document.querySelector('input[name="codGate"]:checked').value,
                        Cod_Puerta2: Codgate.value,
                        Numero_Puerta: gateNum.value,
                        Detalle: detail.value
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    alert('Modificacion exitosa!');
                    updateConsID();
                break;
        }
            }else{
                consEx = await fetch('http://localhost:50498/api/Puerta').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    infoCons = await fetch('http://localhost:50498/api/Puerta/'+index).then(response => response.json());
                        var modcreate = await fetch('http://localhost:50498/api/Puerta/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Cod_Puerta: document.querySelector('input[name="codGate"]:checked').value,
                                Numero_Puerta: gateNum.value,
                                Detalle: detail.value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            window.location.href = "puertasCons.html";
                        break;
                    
                }
            
            }
            
        }
    }

    const deleteGate =  function(){
        NameAgencia.value = '';
        imagen.value = '';
        window.location.href = "puertasCons.html";
    }

    ini();

})()