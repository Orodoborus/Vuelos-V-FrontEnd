(function(){
    let user = {};
    let passAct= {};
    let passNew = {};
    let passNew2 = {};
    let question = {};
    let answer = {};
    let btnChange = {};
    let user_exists = [];
    let info = [];
    let data =[];


    const ini = function(){
        user = document.querySelector('#user');
        passAct = document.querySelector('#passAct');
        passNew = document.querySelector('#passNew');
        passNew2 = document.querySelector('#passNew2');
        question = document.querySelector('#question');
        answer = document.querySelector('#answer');
        btnChange = document.querySelector('#btnChange');
        btnChange.onclick = changePass;
    }

    const clean = function(){
        user.value ='';
        passAct.value = '';
        passNew.value = '';
        passNew2.value = '';
        question.value = "Seleccione una de las opciones...";
        answer.value = '';
    }

    const changePass = async function(){
        if(user.value == "" || passAct == "" || passNew == "" || passNew2 == "" || question == "Seleccione una de las opciones..." || answer.values == "" ){
            alert('Favor llenar todos los campos');
        }else{
            user_exists =  await fetch('http://localhost:50498/api/UsuarioPassword').then(response => response.json());
            var length =  Object.keys(user_exists).length;
            console.log(user.value);
            console.log(passAct.value);
            console.log(passNew.value);
            console.log(passNew2.value);
            console.log(question.value);
            console.log(answer.value);
            console.log(user_exists);
            for (let index = 0; index < length; index++) {
                info = await fetch('http://localhost:50498/api/UsuarioPassword/'+index).then(response => response.json());
                if(user.value == info.Username){
                    if(passNew.values == passNew2.values){
                        if(question.value == info.Question){
                            if(answer.value == info.Answer){
                                var userRolUpdate = fetch('http://localhost:50498/api/UsuarioPassword/'+index,{
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                Username:user.value,
                                Rol:"",
                                Password:passNew.value
                            })
                        }).then(response => response.text().then(function(text) {
                            return text ? JSON.parse(text) : {}
                        }))
                        alert('Cambio de contraseña exitosa');
                        clean();
                        window.location.reload();
                            }else{
                                alert('Respuesta incorrecta.')
                            }
                        }else{
                            alert('Pregunta incorrecta.')
                        }
                    }else{
                        alert('Las contraseñas ingresadas no son iguales');
                    }
                }else{
                    alert('No existe el usuario.');
                }
            }
        }
        
    }


    ini();
})()