(function(){
    let cartItems = [];

    let info = [];
    let specificItemcart = [];
    let itemEx = [];

    let info2 = [];
    let specificItemcart2 = [];
    let itemEx2 = [];

    const ini = ()=>{
        loadTable();
    }

    const loadTable = async ()=>{
        cartItems = document.querySelector('#cartItems');
        cartItems.innerHTML = '';
        itemEx = await fetch('http://localhost:50498/api/Carrito').then(response => response.json());
        var length = Object.keys(itemEx).length;
        for (let index = 0; index < length; index++) {
            info = await fetch('http://localhost:50498/api/Carrito/'+index).then(response => response.json());
            specificItemcart[index] = info;
        }
        cartItems.innerHTML = specificItemcart.map(e=>{
            return `
            <tr>
            <td style="text-align: center;">${e.Cod_Item}</td>
                            <td style="text-align: center;">${e.Codigo_Vuelo}</td>
                            <td style="text-align: center;">${e.Pais}</td>
                            <td style="text-align: center;">${e.Precio}</td>
                           <td> <button class="btn btn-danger" onclick="delete_cart_item('${e.Cod_Item}')">Eliminar</button></td>
            </tr>`
        })
    }

    

    ini();

})()