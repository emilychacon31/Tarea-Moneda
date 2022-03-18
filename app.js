const obtenerData= async()=>{
    const respuesta= await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    console.log(respuesta);
    const data= await respuesta.json();
    console.log(data);

    let tabla=`
    <table>
    <thead class="tablaCabecera">
        <tr>
            <th>#</th>
            <th>Moneda</th>
            <th> Siglas</th>
            <th> Precio</th>
            <th> </th>
            <th>1 h</th>
            <th>24 h</th>
            <th>7 d</th>
            <th>Volumen en 24 h</th>
            <th>Cap. de mercado</th>
        </tr>
    </thead>
    <tbody>
    ${
        data.map((moneda)=>{
            let html=`
                    <tr>
                        <td><i class="fa-light fa-star"></i>${moneda.market_cap_rank} </td>
                        <td class="imagenMoneda"> <img class="imgCoins" src=${moneda.image} alt="imgCoins">${moneda.name} </td>
                        <td>${moneda.symbol} </td>
                        <td>${moneda.current_price} US$ </td>
                        <td> <button class="btn">Buy</button> </td>
                        <td class="tdRojo">${moneda.atl.toFixed(1)}% </td>
                        <td class="td24h">${moneda.price_change_percentage_24h.toFixed(1)} %</td>
                        <td class="tdRojo">${moneda.market_cap_rank} %</td>
                        <td>${moneda.total_volume} US$</td>
                        <td>${moneda.market_cap} US$</td>
                    </tr>
            `
            return html;
        })
    }

    </tbody>
</table>
    `;

    document.querySelector('#contenedor').innerHTML+=tabla;
}

obtenerData();