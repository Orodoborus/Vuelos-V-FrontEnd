(function(){
    let Username = {};
    let Password = {};
    let Password2 = {};
    let Email = {};
    let question = {};
    let Respuesta ={};
    let btnCreate = {};
    let capt = {};
    let captchatxt = {};
    let user = {};
    let rol = {};
    let logout = {};

    
    let Error_Message = {};
    var d = new Date();
    const twoDigitMinutes = d.getMinutes().toString().replace(/^(\d)$/, '0$1');
    let Error_Number={};

    const ini = function(){
        Username = document.querySelector('#Username');
        Password = document.querySelector('#Password');
        Password2 = document.querySelector('#Password2');
        Email = document.querySelector('#Email');
        question = document.querySelector('#question');
        Respuesta = document.querySelector('#Respuesta');
        captchatxt = document.querySelector('#captchatxt');
        capt = document.querySelector('#capt');
        user = document.querySelector('#user');
        rol = document.querySelector('#rol');
        logout = document.querySelector('#logout');
        user.innerText  ="User: "+ localStorage.getItem("User");
        rol.innerText  ="Rol: "+ localStorage.getItem("Rol");
        bind();
        showMenu();
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

    const cleanReg = function(){
        Username.value = '';
        Password.value= '';
        Password2.value= '';
        Email.value= '';
        question.value= '';
        Respuesta.value= '';
    }

    const bind = function(){
        btnCreate = document.querySelector('#btnCreate');
        btnCreate.onclick = userCreate;
        logout.onclick = logoutUser;
    }
    
    const logoutUser = function(){
        localStorage.removeItem("User");
        localStorage.removeItem("Rol");
        window.location.href = '../index.html';
    }
    

    const userCreate = async function(){
        if(Username.value == "" || Password.value == "" || Password2.value == "" || Email.value == "" || question.value == "Seleccione una de las opciones..." || Respuesta.value == ""){
            alert('Favor llenar todos los campos requeridos');
            createNewError("No se ingresaron los datos necesarios - Crear Usuario");
        }else{
            if(Password.value == Password2.value){
                if(capt.value == captchatxt.value){
                    var new_user = await fetch('http://localhost:50498/api/Usuario',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            Username:Username.value,
                            Password:Password.value,
                            Rol:"User",
                            Email:Email.value,
                            Question:question.value,
                            Answer:Respuesta.value
                        })
                    }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                      }))
                      cleanReg();
                }else{
                    alert('Favor ingresar un captcha valido.');
                    createNewError("Fallo al ingresar el captcha necesario - Crear Usuario");
                }
                
            }else{
                alert('Las contraseñas no son iguales, favor revisar.');
                createNewError("Fallo en la verificacion de contraseñas - Crear Usuario");
                
            }
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

    alert('Error detectado y almacenado!'); }


    ini();
})()