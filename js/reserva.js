(function(){
    let destiny = {};
    let paymentmethod = [];
    let cantidad = {};
    var caracteres = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'
            ,'W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i',
            'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    let Subtotal = {};
    let Tax = {};
    let Total = {};
    let process = {};

    let cartex = [];
    let infoCart = [];

    let cartCountry = [];
    let infoCartCountry = [];

    let consEx = [];
    let infoCons = [];

    const ini = ()=>{
        destiny = document.querySelector('#destiny');
        cantidad = document.querySelector('#cantidad');
        Subtotal = document.querySelector('#Subtotal');
        paymentmethod = document.querySelector('#paymentmethod');
        Tax = document.querySelector('#Tax');
        Total = document.querySelector('#Total')
        binder();
        loadCountries();
    }

    const binder = ()=>{
        process = document.querySelector('#process');
        process.onclick = reservation;
        getCons();
    }

    const reservation = async ()=>{
        if(destiny.value == "" || paymentmethod.value == "" || cantidad.value == "" || Total.value == "0"){
            alert('Debe llenar los campos requeridos');
        }else{
            reservationProcess();
            alert('Reservacion exitoza, puedes revisar tu reservacion en el historial de reservaciones.')
        }
    }

    const reservationProcess = async ()=>{
        var a = caracteres[Math.floor(Math.random()*62)];
                 var b = caracteres[Math.floor(Math.random()*62)];
                 var c = caracteres[Math.floor(Math.random()*62)];
                 var d = caracteres[Math.floor(Math.random()*62)];
                 var e = caracteres[Math.floor(Math.random()*62)];
                 var f = caracteres[Math.floor(Math.random()*62)];
                 var g = caracteres[Math.floor(Math.random()*62)];

                 var final = a+b+c+d+e+f+g;
                 var resNumber = Math.floor(Math.random()*1000000);
        var newReservation = await fetch('http://localhost:50498/api/newReservationAdd',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Cod_Reserva: infoCons.Prefijo+infoCons.Valor,
                Numero_Reservacion: resNumber,
                Booking_ID: final,
                Cod_User_FK: localStorage.getItem('User'),
                Cantidad: cantidad.value,
                Total: Total.value,
                Payment_Method: paymentmethod.value 
            })
        })
        /*  DETAILS DE LA RESERVACION  */ 
        successfull_reservation_detail();
    }

    const successfull_reservation_detail = async () =>{
        getCons();
        cartex = await fetch('http://localhost:50498/api/Carrito').then(response => response.json());
        var length = Object.keys(cartex).length;
        for (let index = 0; index < length; index++) {
            infoCart = await fetch('http://localhost:50498/api/Carrito/'+index).then(response => response.json());
            var buying_details = await fetch('http://localhost:50498/api/newreservationdetail',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Booking_ID: infoCons.Prefijo+infoCons.Valor,
                    Cod_User: localStorage.getItem('User'),
                    Cod_Vuelo: infoCart.Codigo_Vuelo,
                    Pais: infoCart.Pais,
                    Precio: infoCart.Precio
                })
            })
        }
        deleteCartOnSucessfullBuy();
        updateConsID();
    }

    const loadCountries = async ()=>{
        destiny.value = '';
        cartCountry = await fetch('http://localhost:50498/api/Carrito').then(response => response.json());
        var length = Object.keys(cartCountry).length;
        for (let index = 0; index < length; index++) {
            infoCartCountry = await fetch('http://localhost:50498/api/Carrito/'+index).then(response => response.json());
            destiny.value = destiny.value +infoCartCountry.Pais+'.';
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
                        if(infoCons.Descripcion == "Reservaciones de Boletos"){
                            result = infoCons.Prefijo+infoCons.Valor;
                            break;
                        }
                    }
                }else{
                    if(infoCons.Descripcion == "Reservaciones de Boletos"){
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
            if(infoCons.Descripcion == "Reservaciones de Boletos"){
                var modcreate = await fetch('http://localhost:50498/api/ConsecutivosUpdate/'+index,{
                    method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        Descripcion: "Reservaciones de Boletos",
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
}
)()