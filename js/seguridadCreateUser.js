(function(){
    let Username = {};
    let Password = {};
    let Password2 = {};
    let Email = {};
    let question = {};
    let Respuesta ={};
    let btnCreate = {};

    const ini = function(){
        Username = document.querySelector('#Username');
        Password = document.querySelector('#Password');
        Password2 = document.querySelector('#Password2');
        Email = document.querySelector('#Email');
        question = document.querySelector('#question');
        Respuesta = document.querySelector('#Respuesta');
        bind();
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
    }
    

    const userCreate = async function(){
        if(Username.value == "" || Password.value == "" || Password2.value == "" || Email.value == "" || question.value == "Seleccione una de las opciones..." || Respuesta.value == ""){
            alert('Favor llenar todos los campos requeridos');
        }else{
            if(Password.value == Password2.value){
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
                alert('Las contraseñas no son iguales, favor revisar.');
            }
        }
    }
    ini();
})()