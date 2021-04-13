(function(){

    let numcard = {};
    let anoexp = {};
    let mesexp = {};
    let cardtype = {};
    let cardtypeDC = {};
    let cantidad = {};
    let cvv = {};
    let Subtotal = {};
    let Tax = {};
    let Total = {};
    let process = {};

    let Subtotal2 = {};
    let Tax2 = {};
    let Total2 = {};
    let process2 = {};
    let cantidad2 = {};

    let numcuenta = {};
    let codseguridad = {};
    let cuentapass = {};

    let consEx = [];
    let infoCons = [];
    let specificCountry = [];

    let cardsEx = [];
    let infoCard = [];


    let cartex = [];
    let infoCart = [];
    let specificItem = [];
    
    let card = [];
    let specificCard = [];
    let exCard = [];

    let account = [];
    let specificAccount = [];
    let exAccount = [];

    const ini = ()=>{
        numcard = document.querySelector('#numcard');
        anoexp = document.querySelector('#anoexp');
        mesexp = document.querySelector('#mesexp');
        cardtype = document.querySelector('#cardtype');
        cardtypeDC = document.querySelector('#cardtypeDC');
        cantidad = document.querySelector('#cantidad');
        cantidad2 = document.querySelector('#cantidad2');
        numcuenta = document.querySelector('#numcuenta');
        codseguridad = document.querySelector('#codseguridad');
        cuentapass = document.querySelector('#cuentapass');
        cvv = document.querySelector('#cvv');
        Subtotal = document.querySelector('#Subtotal');
        Tax = document.querySelector('#Tax');
        Total = document.querySelector('#Total');
        Subtotal2 = document.querySelector('#Subtotal2');
        Tax2 = document.querySelector('#Tax2');
        Total2 = document.querySelector('#Total2');
        binder();
        
    }

    const binder = () =>{
        process = document.querySelector('#process');
        process2 = document.querySelector('#process2');
        getCons();
        process.onclick = buying_process;
        process2.onclick = buying_process_easypay;
    }

    const buying_process = async () =>{
        if(numcard.value == "" || cardtypeDC.value =="" || cantidad.value == "" || anoexp.value == "" || mesexp.value == "" || cardtype.value == "" ||
        cvv.value == "" || Subtotal.value == "" || Tax.value == "" || Total.value == "0"){
            alert('Debe llenar los campos para poder realizar la compra con tarjeta.');
        }else{
            card_validation();
        }
    }

    const buying_process_easypay = ()=>{
        if(numcuenta.value == "" || codseguridad.value == "" || cuentapass.value == ""){
            alert('Debe llenar los campos para poder realizar la compra con Easy Pay');
        }else{
            easyvalidation();
        }

    }

    const card_validation = async () =>{
        var getcard = await fetch('http://localhost:50498/api/Payment').then(response => response.json());
        exCard = await fetch('http://localhost:50498/api/Payment').then(response => response.json());
              var length = Object.keys(exCard).length;
              for (let index = 0; index < length; index++) {
                  card = await fetch('http://localhost:50498/api/Payment/'+index).then(response => response.json());
                  if(numcard.value == card.Num_Tarjeta){
                      specificCard[0] = await fetch('http://localhost:50498/api/Payment/'+index).then(response => response.json());
                  }
                }
            console.log(specificCard[0].Tipo);
            console.log(cardtype.value);
            if(specificCard[0].Num_Tarjeta == numcard.value){
                if(specificCard[0].Mes_Exp == mesexp.value){
                    if(specificCard[0].Ano_Exp == anoexp.value){
                        if(specificCard[0].CVV == cvv.value){
                            if(specificCard[0].Monto > Total.value){
                                if(specificCard[0].Tipo == cardtypeDC.value){
                                    if(specificCard[0].Card_Type == cardtype.value){
                                        /* COMPRA VALIDA */
                                        successfullBuy();
                                        alert('Compra exitoza, revisa tu historial de compras para verificar la misma.');
                                    }else{
                                        alert('Proovedor de tarjeta invalido');
                                       
                                    }
                                }else{
                                    alert('Tipo de tarjeta invalida');
                                }
                            }else{
                                alert('No tiene suficiente monto');
                            }
                        }else{
                            alert('CVV invalido');
                        }
                    }else{
                        alert('Año invalido');
                    }
                }else{
                    alert('Mes invalido');
                }
            }else{
                alert('Numero de tarjeta invalida');
            }
    }

    const easyvalidation = async () =>{
        var getcard = await fetch('http://localhost:50498/api/easypay').then(response => response.json());
        exAccount = await fetch('http://localhost:50498/api/easypay').then(response => response.json());
              var length = Object.keys(exAccount).length;
              for (let index = 0; index < length; index++) {
                  account = await fetch('http://localhost:50498/api/easypay/'+index).then(response => response.json());
                  if(numcuenta.value == account.Num_Cuenta){
                      specificAccount[0] = await fetch('http://localhost:50498/api/easypay/'+index).then(response => response.json());
                  }
                }
           console.log(specificAccount[0]);
            if(specificAccount[0].Num_Cuenta == numcuenta.value){
                if(specificAccount[0].Codigo_Seguridad == codseguridad.value){
                    if(specificAccount[0].Constrasena == cuentapass.value){
                        if(specificAccount[0].Fondos > Total2.value){
                            successfullBuyEASYPAY();
                            alert('Compra exitoza, revisa tu historial de compras para verificar la misma.');
                        }else{
                            alert('Insuficientes fondons');
                        }
                    }else{
                        alert('Contraseña invalido');
                    }
                }else{
                    alert('Codigo de seguridad invalido');
                }
            }else{
                alert('Numero de cuenta invalida');
            }
    }

    const successfullBuy = async () =>{
        var buying = await fetch('http://localhost:50498/api/newBuyHistory',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Codigo_Compras: infoCons.Prefijo+infoCons.Valor,
                Cod_User_FK: localStorage.getItem('User'),
                Cantidad: cantidad.value,
                Total: Total.value
            })
        })
        /* CREACION DE DETAILS*/
        successfull_buy_details();
    }

    const successfullBuyEASYPAY = async () =>{
        var buying = await fetch('http://localhost:50498/api/newBuyHistory',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Codigo_Compras: infoCons.Prefijo+infoCons.Valor,
                Cod_User_FK: localStorage.getItem('User'),
                Cantidad: cantidad.value,
                Total: Total.value
            })
        })
        /* CREACION DE DETAILS*/
        successfull_buy_detailsEASYPAY();
    }

    const successfull_buy_details = async () =>{
        getCons();
        cartex = await fetch('http://localhost:50498/api/Carrito').then(response => response.json());
        var length = Object.keys(cartex).length;
        for (let index = 0; index < length; index++) {
            infoCart = await fetch('http://localhost:50498/api/Carrito/'+index).then(response => response.json());
            var buying_details = await fetch('http://localhost:50498/api/newbuyhistorydetails',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Codigo_Compra: infoCons.Prefijo+infoCons.Valor,
                    Codigo_User: localStorage.getItem('User'),
                    Codigo_Vuelo: infoCart.Codigo_Vuelo,
                    Pais: infoCart.Pais,
                    Precio: infoCart.Precio
                })
            })
            updateCardMoney();
            deleteCartOnSucessfullBuy();
            updateConsID();
        }
    }

    const successfull_buy_detailsEASYPAY = async () =>{
        getCons();
        cartex = await fetch('http://localhost:50498/api/Carrito').then(response => response.json());
        var length = Object.keys(cartex).length;
        for (let index = 0; index < length; index++) {
            infoCart = await fetch('http://localhost:50498/api/Carrito/'+index).then(response => response.json());
            var buying_details = await fetch('http://localhost:50498/api/newbuyhistorydetails',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Codigo_Compra: infoCons.Prefijo+infoCons.Valor,
                    Codigo_User: localStorage.getItem('User'),
                    Codigo_Vuelo: infoCart.Codigo_Vuelo,
                    Pais: infoCart.Pais,
                    Precio: infoCart.Precio
                })
            })
            updateEasyPayMoney();
            deleteCartOnSucessfullBuy();
            updateConsID();
        }
    }

    const updateCardMoney = async ()=>{
        cardsEx = await fetch('http://localhost:50498/api/Payment').then(response => response.json());
        var length = Object.keys(cardsEx).length;
        for (let index = 0; index < length; index++) {
            infoCard = await fetch('http://localhost:50498/api/Payment/'+index).then(response => response.json());
            if(infoCard.Num_Tarjeta == numcard.value){
                var modcreate = await fetch('http://localhost:50498/api/Payment/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Num_Tarjeta: numcard.value,
                        Mes_Exp: mesexp.value,
                        Ano_Exp: anoexp.value,
                        CVV: cvv.value,
                        Monto: Total.value,
                        Tipo: cardtypeDC.value,
                        Card_Type: cardtype.value
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                break;
            }
        }
    }

    const updateEasyPayMoney = async ()=>{
        cardsEx = await fetch('http://localhost:50498/api/easypay').then(response => response.json());
        var length = Object.keys(cardsEx).length;
        for (let index = 0; index < length; index++) {
            infoCard = await fetch('http://localhost:50498/api/easypay/'+index).then(response => response.json());
            if(infoCard.Num_Cuenta == numcuenta.value){
                var modcreate = await fetch('http://localhost:50498/api/easypay/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Num_Cuenta: numcuenta.value,
                        Codigo_Seguridad: codseguridad.value,
                        Constrasena: cuentapass.value,
                        Fondos: Total2.value,
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                break;
            }
        }
    }

    const deleteCartOnSucessfullBuy = async () =>{
        var cartClean = await fetch('http://localhost:50498/api/logoutOrBuy/0',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

            })
        })
    }


    const getCons = async function(){
        var result;
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
            var length = Object.keys(consEx).length;
            for (let index = 0; index < length; index++) {
                infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
                if(!infoCons.Rango_Ini == "" && !infoCons.Rango_Fin ==""){
                    if(infoCons.Rango_Ini == infoCons.Rango_Fin){
                        alert('Favor cambiar el rango existente, ha alcanzado su limite.');
                        createNewError("Rango existente llego a su limite - Consecutivos Favor contactar a superiores");
                    }else{
                        if(infoCons.Descripcion == "Compras de Boletos"){
                            result = infoCons.Prefijo+infoCons.Valor;
                            break;
                        }
                    }
                }else{
                    if(infoCons.Descripcion == "Compras de Boletos"){
                        result = infoCons.Prefijo+infoCons.Valor;
                        break;
                    }
                }
                
            }
    }

    const updateConsID = async function(){
        consEx = await fetch('http://localhost:50498/api/ConsecutivosUpdate').then(response => response.json());
        var length = Object.keys(consEx).length;
        for (let index = 0; index < length; index++) {
            infoCons = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index).then(response => response.json());
            if(infoCons.Descripcion == "Compras de Boletos"){
                console.log('in if');
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Compras de Boletos",
                        Valor: infoCons.Valor,
                        Rango_Ini: infoCons.Rango_Ini,
                        UsernameC: localStorage.getItem("User")
                    })
                }).then(response => response.text().then(function(text) {
                        return text ? JSON.parse(text) : {}
                    }))
                    console.log(infoCons);
                break;
            }
        }
        window.location.href = "seeVuelos.html";
    }

    ini();

})();