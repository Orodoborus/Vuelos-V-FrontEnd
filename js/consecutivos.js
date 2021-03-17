(function(){
    let conList = [];
    let newCon = {};
    let allcons = [];
    let eachCon = [];
    let onlyOneCon = [];

    const ini = function(){
        newCon =  document.querySelector('#newCon');
        newCon.onclick = newConsecutivo;
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

    

    const newConsecutivo = function(){
        window.location.href = "consecutivosEdit.html";
        sessionStorage.setItem("description","Seleccione una opcion");
    }


    ini();

})()