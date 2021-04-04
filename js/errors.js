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
    let allerrors = [];
    let eachError = [];
    let onlyOneError = [];

    let seeAllErrors = {};


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

    let iniDia = {};
    let iniMes = {};
    let iniAno = {};

    let finDia = {};
    let finMes = {};
    let finAno = {};

    let errorlist2 = [];
    let allerrors2 = [];
    let eachError2 = [];
    let onlyOneError2 = [];


    const ini = function(){

        Error_Message = document.querySelector('#Error_Message');
        Error_Number = document.querySelector('#Error_Number');

        iniDia = document.querySelector('#iniDia');
        iniMes = document.querySelector('#iniMes');
        iniAno = document.querySelector('#iniAno');

        finDia = document.querySelector('#finDia');
        finMes = document.querySelector('#finMes');
        finAno = document.querySelector('#finAno');

       





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
        getErrors();
        bind();
        showMenu();
        //filter();
        
    }


    const filterAct = async function(){
        /* SOLO FECHAS */
        var sendFilter = await fetch('http://localhost:50498/api/ErrorsFilterByDateRange',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    date1: iniDia.value+ "-"+iniMes.value+"-"+iniAno.value,
                    date2: finDia.value+ "-"+finMes.value+"-"+finAno.value
                })
            })
            getNewTableByDateRange();

    }

    const getNewTableByDateRange = async function(){
        errorlist2 = document.querySelector('#errorList');
        errorlist2.innerHTML = '';
        allerrors2 = await fetch('http://localhost:50498/api/ErrorsFilterByDateRange').then(response => response.json());
            var length = Object.keys(allerrors2).length;
            for (let index = 0; index < length; index++) {
                onlyOneError2 = await fetch('http://localhost:50498/api/ErrorsFilterByDateRange/'+index).then(response => response.json());
                eachError2[index] = onlyOneError2;
            }
            errorlist2.innerHTML = eachError2.map(e=>{
                return `               
                <tr>
                <td value="${e.Error_ID}" id="${e.Error_ID}">${e.Error_ID}</td>
                <td value="${e.Error_Message}">${e.Error_Message}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td value="${e.Date}">${e.Date}</td>
                <td value="${e.Error_Number}">${e.Error_Number}</td>
                </tr>`
            })
    }


    $('#FInicial').on('keyup',function(){
        var valueinicial = $(this).val()
        console.log(valueinicial)
        //var data = searchTable(valueinicial,data)
    })

    $('#FFinal').on('keyup',function(){
        var valuefinal = $(this).val()
        console.log(valuefinal)
    })
    /*

    function searchTable (valueinicial,data)
    {
        var filteredData = []

        for(var i =0; i<data.length; i++)
        {
            var fecha = data[i].fecha
            if(fecha.incluedes(valueinicial))
            
            {
                filteredData.push(data[i])

            }
            


        }

        return filteredData

    }

    const filter = function()
    {





    }
    */



    const bind = function(){
        btnActualizar = document.querySelector('#buscarErrors');
        seeAllErrors = document.querySelector('#seeAllErrors');
        btnActualizar.onclick = filterAct;
        seeAllErrors.onclick = seealldataerrors;
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
    const createNewError = async function(Error_Message){  
            var create = await fetch('http://localhost:50498/api/Errors',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                Error_Message: Error_Message, //INSERT ERROR STRING
                Time: d.getHours()+':'+twoDigitMinutes, //24H FORMAT
                Date: d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear(), //DD-MM-YYYY
                Error_Number: "0000"  // INSERT ERROR CODE IF ANY
            })
        })

        alert('Error detectado y almacenado!');
        
        
    }

    const getErrors = async function(){

        errorList = document.querySelector('#errorList');
        errorList.innerHTML = '';
        allerrors = await fetch('http://localhost:50498/api/Errors').then(response => response.json());
            var length = Object.keys(allerrors).length;
            for (let index = 0; index < length; index++) {
                onlyOneError = await fetch('http://localhost:50498/api/Errors/'+index).then(response => response.json());
                eachError[index] = onlyOneError;
            }
            errorList.innerHTML = eachError.map(e=>{
                return `
                <tr>
                <td value="${e.Error_ID}" id="${e.Error_ID}">${e.Error_ID}</td>
                <td>${e.Error_Message}</td>
                <td value="${e.Time}">${e.Time}</td>
                <td value="${e.Date}">${e.Date}</td>
                <td value="${e.Error_Number}">${e.Error_Number}</td>
                </tr>`
            })
        }
        const seealldataerrors = function(){
            window.location.href = "seeErrors.html";
        }

    ini();  
      

})()