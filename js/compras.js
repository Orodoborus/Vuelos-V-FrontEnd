(function(){
    let historialcomprastable = [];
    let historialcomprastableDetails = [];
    let table2 =[];
    let table1 =[];

    let info =[];
    let exBuy = [];
    let SpecificBuy = [];

    const ini = () =>{
        historialcomprastableDetails = document.querySelector('#historialcomprastableDetails').style.visibility = "hidden";
        table2 = document.querySelector('#table2').style.visibility = "hidden";
        getLoggedUser();
        loadTable();
    }

    const loadTable = async () =>{
        historialcomprastable = document.querySelector('#historialcomprastable');
        historialcomprastable.innerHTML = '';
        exBuy = await fetch('http://localhost:50498/api/Compras').then(response => response.json());
        var length = Object.keys(exBuy).length;
        for (let index = 0; index < length; index++) {
            info = await fetch('http://localhost:50498/api/Compras/'+index).then(response => response.json());
            SpecificBuy[index] = info;
        }
        historialcomprastable.innerHTML = SpecificBuy.map(e=>{
            return`
            <tr>
                <td>${e.Codigo_Compras}</td>
                <td>${e.Cantidad}</td>
                <td>${e.Total}</td>
                <td>${e.DateBuy}</td>
                <td><button class="btn btn-primary" onclick="getMyDetail('${e.Codigo_Compras}','${e.Cod_User_FK}')">Detalle de compra</button></td>
            </tr>
            `
        });
    }

    const getLoggedUser = async ()=>{
        var getMyLoggedUser = await fetch('http://localhost:50498/api/Compras',{
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
})()