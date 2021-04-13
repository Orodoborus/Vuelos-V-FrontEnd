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

    let consEx = [];
    let infoCons = [];
    let specificCountry = [];

    let cartex = [];
    let infoCart = [];
    let specificItem = [];
    
    let card = [];
    let specificCard = [];
    let exCard = [];

    const ini = ()=>{
        numcard = document.querySelector('#numcard');
        anoexp = document.querySelector('#anoexp');
        mesexp = document.querySelector('#mesexp');
        cardtype = document.querySelector('#cardtype');
        cardtypeDC = document.querySelector('#cardtypeDC');
        cantidad = document.querySelector('#cantidad');
        cvv = document.querySelector('#cvv');
        Subtotal = document.querySelector('#Subtotal');
        Tax = document.querySelector('#Tax');
        Total = document.querySelector('#Total');
        binder();
    }

    const binder = () =>{
        process = document.querySelector('#process');
        getCons();
        process.onclick = buying_process;
    }

    const buying_process = async () =>{
        if(numcard.value == "" || cardtypeDC.value =="" || cantidad.value == "" || anoexp.value == "" || mesexp.value == "" || cardtype.value == "" ||
        cvv.value == "" || Subtotal.value == "" || Tax.value == "" || Total.value == ""){
            alert('Debe llenar los campos para poder realizar la compra con tarjeta.');
        }else{
            card_validation();
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
                                        alert('Compra exiosa, revisa tu historial de compras para verificar la misma.');
                                    }else{
                                        alert('Tipo de tarjeta invalida')
                                    }
                                }else{
                                    alert('Proovedor de tarjeta invalido');
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
            updateConsID();
        }
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