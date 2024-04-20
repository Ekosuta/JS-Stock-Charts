function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const respoonse = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=3ce96526ba0a4de6afb2a0f62f61daf9')

    stocks.forEach( stock => stock.values.reverse())

    //time chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        },
    });

    //highest price chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: "Highest",
                data: stocks.map( stock => findHighest(stock.values)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            }]
        },
    });
}

function findHighest(values) {
    let highest = values[0].high;
    for(let i = 1; i < values.length; i++) {
        if(parseFloat(values[i].high) > parseFloat(highest)) {
            highest = values[i].high;
        }
    }
    return parseFloat(highest);
};

const { GME, MSFT, DIS, BNTX } = mockData;

const stocks = [GME, MSFT, DIS, BNTX];

main()