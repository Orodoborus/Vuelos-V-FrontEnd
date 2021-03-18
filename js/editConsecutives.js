(function(){
    let info = [];
    let cons = {};
    let num = {};
    let ispref = {};
    let prefijo = {};
    let isrange = {};
    let inirange = {};
    let finrange = {};
    let btnAccept = {};
    let btnCancel = {};
    let consEx = [];
    let consIs = [];

    const ini = function(){
        cons = document.querySelector('#cons');
        num = document.querySelector('#num');
        ispref = document.querySelector('#ispref');
        prefijo = document.querySelector('#prefijo');
        isrange = document.querySelector('#isrange');
        inirange = document.querySelector('#inirange');
        finrange = document.querySelector('#finrange');
        bind();
        newValidation();
    }

    const bind = function(){
        btnAccept = document.querySelector('#btnAccept');
        btnCancel = document.querySelector('#btnCancel');
        btnAccept.onclick = consecutiveMC;
        btnCancel.onclick = cancelation;
    }

    const cancelation = function(){
        window.location.href = "consecutivos.html";
        sessionStorage.removeItem("description");
        sessionStorage.removeItem("isNew");
    }

    const consecutiveMC = async function(){
        if(sessionStorage.getItem("isNew") == "no"){
            if(cons.value == "Seleccione una opcion" || num.value == ""){
                alert('Favor elegir una opcion y llenar todos los campos.');
            }else{
                if(inirange.value > finrange.value){
                    alert('favor verificar los rangos');
                }else{
                    console.log(inirange.value + "  " + finrange.value);
                    consEx = await fetch('http://localhost:50498/api/Consecutivos').then(response => response.json());
                var length = Object.keys(consEx).length;
                for (let index = 0; index < length; index++) {
                    info = await fetch('http://localhost:50498/api/Consecutivos/'+index).then(response => response.json());
                    if(cons.value == info.Descripcion){
                        var modcreate = await fetch('http://localhost:50498/api/Consecutivos/'+index,{
                            method:'PUT',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Descripcion: cons.value,
                                Valor: num.value,
                                Prefijo: prefijo.value,
                                Rango_ini:inirange.value,
                                Rango_Fin: finrange.value
                            })
                        }).then(response => response.text().then(function(text) {
                                return text ? JSON.parse(text) : {}
                            }))
                            alert('Modificacion exitosa!');
                            window.location.href = "consecutivos.html";
                        break;
                    }
                }
                }
            }
        }else{
            var cont = 0;
            consEx = await fetch('http://localhost:50498/api/Consecutivos').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/Consecutivos/'+index).then(response => response.json());
                if(cons.value == info.Descripcion){
                    cont = cont + 1;
                    break;
                }
            }
            if(cont == 1){
                alert('El consecutivo con esa descripcion ya esta creado.');
            }else{
                var create = await fetch('http://localhost:50498/api/Consecutivos',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    Descripcion: cons.value,
                    Valor: num.value,
                    Prefijo: prefijo.value,
                    Rango_ini:inirange.value,
                    Rango_Fin: finrange.value
                })
            })
            alert('Creacion exitosa!');
            window.location.href = "consecutivos.html";
            }
        }
    }

    const newValidation = async function(){
        if(sessionStorage.getItem("isNew") == "no"){
            consEx = await fetch('http://localhost:50498/api/Consecutivos').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/Consecutivos/'+index).then(response => response.json());
                if(sessionStorage.getItem("description") == info.Descripcion){
                    consIs = info;
                    break;
                }
            }
            num.value = consIs.Valor;
            document.querySelector('#num').disabled = true;
            document.querySelector('#cons').disabled = true;
        }
    }
    


    ini();

})()