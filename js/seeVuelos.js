(function(){
    let buyflight = {};
    let salida = {};
    let llegada = {};

    let search = [];

    let flightList = [];

    let info = [];
    let existflight = [];
    let specificflight = [];

    let info2 = [];
    let existflight2 = [];
    let specificflight2 = [];

    let info3 = [];
    let existflight3 = [];
    let specificflight3 = [];


    const ini = () =>{
        flightList = document.querySelector('#flightList');
        getAllBuys();
        bind();

    }

    const bind = () =>{
        buyflight = document.querySelector('#buyflight');
        salida = document.querySelector('#salida');
        llegada = document.querySelector('#llegada');

        buyflight.onclick = getAllBuys;
        salida.onclick = getAllS;
        llegada.onclick = getAllY;
    }

    const getAllBuys = async () => {
        flightList = document.querySelector('#flightList');
        flightList.innerHTML = '';
        existflight = await fetch('http://localhost:50498/api/VueloBUY').then(response => response.json());
        var length = Object.keys(existflight).length;
        for (let index = 0; index < length; index++) {
            info = await fetch('http://localhost:50498/api/VueloBUY/'+index).then(response => response.json());
            specificflight[index] = info;
        }
        flightList.innerHTML = specificflight.map(e=>{
            return `
            <tr>
            <td style="text-align: center;">${e.Codigo_Vuelo}</td>
                            <td style="text-align: center;">${e.Aerolinea}</td>
                            <td style="text-align: center;">${e.Cod_Pais_FK}</td>
                            <td style="text-align: center;">${e.Fecha}</td>
                            <td style="text-align: center;">${e.Hora}</td>
                            <td style="text-align: center;">${e.Estado}</td>
                            <td style="text-align: center;">${e.Cod_Puerta_FK}</td>
                            <td style="text-align: center;">${e.Price}</td>
            <td><button type="button" class="btn btn-primary" onclick="addCart('${e.Codigo_Vuelo}','${e.Cod_Pais_FK}','${e.Price}')">Añadir al carrito</button></td>
            </tr>`
        })
        search = document.querySelector('#search');
        search.innerHTML = '';
    }

    const getAllS = async ()=>{
        flightList = document.querySelector('#flightList');
        flightList.innerHTML = '';
        existflight2 = await fetch('http://localhost:50498/api/VuelosS').then(response => response.json());
        var length = Object.keys(existflight2).length;
        for (let index = 0; index < length; index++) {
            info2 = await fetch('http://localhost:50498/api/VuelosS/'+index).then(response => response.json());
            specificflight2[index] = info2;
        }
        flightList.innerHTML = specificflight2.map(e=>{
            return `
            <tr>
            <td style="text-align: center;">${e.Codigo_Vuelo}</td>
                            <td style="text-align: center;">${e.Aerolinea}</td>
                            <td style="text-align: center;">${e.Cod_Pais_FK}</td>
                            <td style="text-align: center;">${e.Fecha}</td>
                            <td style="text-align: center;">${e.Hora}</td>
                            <td style="text-align: center;">${e.Estado}</td>
                            <td style="text-align: center;">${e.Cod_Puerta_FK}</td>
                            <td style="text-align: center;">N/A</td>
            </tr>`
        })
        search = document.querySelector('#search');
        search.innerHTML = `
        <div class="masthead-subheading">Filtrar: </div>
            <button class="btn btn-primary" onclick="getSalidasArribo()">Filtrar por Arribo</button>
        `;
    }

    const getAllY = async ()=>{
        flightList = document.querySelector('#flightList');
        flightList.innerHTML = '';
        existflight3 = await fetch('http://localhost:50498/api/VuelosY').then(response => response.json());
        var length = Object.keys(existflight3).length;
        for (let index = 0; index < length; index++) {
            info3 = await fetch('http://localhost:50498/api/VuelosY/'+index).then(response => response.json());
            specificflight3[index] = info3;
        }
        flightList.innerHTML = specificflight3.map(e=>{
            return `
            <tr>
            <td style="text-align: center;">${e.Codigo_Vuelo}</td>
                            <td style="text-align: center;">${e.Aerolinea}</td>
                            <td style="text-align: center;">${e.Cod_Pais_FK}</td>
                            <td style="text-align: center;">${e.Fecha}</td>
                            <td style="text-align: center;">${e.Hora}</td>
                            <td style="text-align: center;">${e.Estado}</td>
                            <td style="text-align: center;">${e.Cod_Puerta_FK}</td>
                            <td style="text-align: center;">N/A</td>
            </tr>`
        })
        search = document.querySelector('#search');
        search.innerHTML = `
        <div class="masthead-subheading">Filtrar: </div>
        <button class="btn btn-primary" onclick="getLlegadasArribo()">Filtrar por Arribo</button>
        `;
    }

   

    ini();

})();