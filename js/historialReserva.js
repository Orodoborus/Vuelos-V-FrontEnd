(function(){
    let historialreserva = [];
    let historialcomprastableDetailsReservation = [];
    let table2 = [];

    let info = [];
    let exRes = [];
    let specificRes = [];

    const ini = ()=>{
        historialcomprastableDetailsReservation = document.querySelector('#historialcomprastableDetailsReservation');
        historialcomprastableDetailsReservation.style.visibility = "hidden";
        table2 = document.querySelector('#table2').style.visibility = "hidden";
        document.querySelector('#backFromDetails').style.visibility = "hidden";
        
        getLoggedUser();
        loadtableReservations();
    }

    const loadtableReservations = async ()=>{
        historialreserva = document.querySelector('#historialreserva');
        historialreserva.innerHTML = '';
        exRes = await fetch('http://localhost:50498/api/Reservas').then(response => response.json());
        var length = Object.keys(exRes).length;
        for (let index = 0; index < length; index++) {
            info = await fetch('http://localhost:50498/api/Reservas/'+index).then(response => response.json());
            specificRes[index] = info;
        }
        historialreserva.innerHTML = specificRes.map(e=>{
            return`
            <tr>
                <td>${e.Cod_Reserva}</td>
                <td>${e.Numero_Reservacion}</td>
                <td>${e.Booking_ID}</td>
                <td>${e.Cantidad}</td>
                <td>${e.Total}</td>
                <td>${e.Payment_Method}</td>
                <td>${e.FechaReservation}</td>
                <td><button class="btn btn-primary" onclick="getMyDetail('${e.Cod_Reserva}','${e.Cod_User_FK}')">Detalle</button></td>
            </tr>
            `
        });
    }

    const getLoggedUser = async ()=>{
        var getMyLoggedUser = await fetch('http://localhost:50498/api/Reservas',{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Cod_User_FK: localStorage.getItem('User')
            })
        })
    }

    ini();

})();