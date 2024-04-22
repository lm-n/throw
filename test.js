let rawTestData = {x:[],y:[],z:[]};
let dataStream = false, resultTestChart = false, resultUseChart = false, testChart, useChart, cux, cvx, modeUse = false, modeTest = false;
//let confidenceData = {};
let prevLabel = "";

function useModel(){
    getRawData();
    dataStream = true;
    document.getElementById("useButtonDiv").innerHTML = '<button id="LiveUseOffButton" onClick="useDataStreamOff()">Stop sending data</button>';
    document.getElementById("useChart").innerHTML = '<canvas id="useConfidence"></canvas>';
    document.getElementById("useChart").classList.add('chart-wrapper');
    modeUse = true;
}

function liveTest() {
    getRawData();
    dataStream = true;
    document.getElementById('testModelButtonDiv').innerHTML = '<button id="LiveTestOffButton" onClick="testDataStreamOff()">Stop Classifying</button>';
    document.getElementById("testChart").innerHTML = '<canvas id="testConfidence"></canvas>';
    document.getElementById("testChart").classList.add('chart-wrapper');
    modeTest = true;
}

function testDataStreamOff() {
    resultTestChart = false;
    testChart.destroy();
    cux = null;
    testChart = null;
    if (!modeUse){
        dataStream = false;
    }
    modeTest = false;
    document.getElementById("testChart").innerHTML = '';
    document.getElementById("testChart").classList.remove('chart-wrapper');
    document.getElementById('testModelButtonDiv').innerHTML = '<button id="LiveTestButton" onClick="liveTest()">Classify</button>';
}

function useDataStreamOff() {
    resultUseChart = false;
    useChart.destroy();
    cvx = null;
    useChart = null;
    if (!modeTest){
        dataStream = false;
    }
    modeUse = false;
    document.getElementById("useChart").innerHTML = '';
    document.getElementById("useChart").classList.remove('chart-wrapper');
    document.getElementById('useButtonDiv').innerHTML ='<button id="LiveUseButton" onClick="useModel()">Use model to send data to microBit</button>';
}

function getRawData() {
    setTimeout(function() {
        if (dataStream){
            if (rawTestData.x == [] || rawTestData.x.length<41){
                rawTestData.x.push(acc.x/1024);
                rawTestData.y.push(acc.y/1024);
                rawTestData.z.push(acc.z/1024);
            } else if (rawTestData.x.length==41){
                rawTestData.x.shift();
                rawTestData.y.shift();
                rawTestData.z.shift();
                rawTestData.x.push(acc.x/1024);
                rawTestData.y.push(acc.y/1024);
                rawTestData.z.push(acc.z/1024);
                liveClassify();
            } 
            getRawData();
        }
    }, 50);
}

function liveClassify(){
    let input = getFeatures(rawTestData);
    thisModel.classify(input, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    } else {
        if (modeTest){
            if (!resultTestChart){
                createTestChart(results);

            } else {
                updateTestChart(results);
            }
        }
        if (modeUse){
            if (!resultUseChart){
                createUseChart(results);

            } else {
                updateUseChart(results);
            }
        }
    }
}


function updateTestChart(results){
    //console.log(results[0].label);
    let dta = [];
    if (testChart != null){
        for (let j = 0; j < thisModelClasses.length; j++){
            for (let i = 0; i < results.length; i++){
                if (thisModelClasses[j] == results[i].label){
                    let val = results[i].confidence
                    val = Math.round(val*100);
                    dta.push(val);
        }}}
        testChart.data.datasets[0].data = dta;
        testChart.update();
    }

}


function updateUseChart(results){
    //console.log(results[0].label);
    let dta = [];
    if (useChart != null){
        for (let j = 0; j < thisModelClasses.length; j++){
            for (let i = 0; i < results.length; i++){
                if (thisModelClasses[j] == results[i].label){
                    let val = results[i].confidence
                    val = Math.round(val*100);
                    dta.push(val);
        }}}
        useChart.data.datasets[0].data = dta;
        useChart.update();
        sendtoMB(results[0].label);
    }
}


function createTestChart(results){
    cux = document.getElementById('testConfidence').getContext('2d');
    let dta = [];
        for (let j = 0; j < thisModelClasses.length; j++){
            for (let i = 0; i < results.length; i++){
                if (thisModelClasses[j] == results[i].label){
                    let val = results[i].confidence
                    val = Math.round(val*100);
                    dta.push(val);
        }}}

        var chartData = {
            labels: thisModelClasses,
            datasets: [{
                label: 'Confidence',
                data: dta,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
        // Chart options
        var chartOptions = {
            interaction: {
                mode: 'none',  // Disable all interactions
                intersect: false  // Disable data point hover intersections
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,   // Set the minimum value of the y-axis
                    max: 100 
                },
                y: {
                    beginAtZero: true
                }
            }
        };
        if (testChart!=null){
            testChart.destroy();
            testChart = null;
        }
        // Create the horizontal bar chart
        testChart = new Chart(cux, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
        resultTestChart = true;
}


function createUseChart(results){
    cvx = document.getElementById('useConfidence').getContext('2d');
        let dta = [];
        for (let j = 0; j < thisModelClasses.length; j++){
            for (let i = 0; i < results.length; i++){
                if (thisModelClasses[j] == results[i].label){
                    let val = results[i].confidence
                    val = Math.round(val*100);
                    dta.push(val);
                }
            }
        }

        var chartData = {
            labels: thisModelClasses,
            datasets: [{
                label: 'Confidence',
                data: dta,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        // Chart options
        var chartOptions = {
            interaction: {
                mode: 'none',  // Disable all interactions
                intersect: false  // Disable data point hover intersections
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,   // Set the minimum value of the y-axis
                    max: 100 
                },
                y: {
                    beginAtZero: true
                }
            }
        };

        if (useChart!=null){
            useChart.destroy();
            useChart = null;
        }

        // Create the horizontal bar chart
        useChart = new Chart(cvx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
        resultUseChart = true;
}

function sendtoMB(label){
    if (prevLabel!=label) {
        prevLabel=label;
        microBit.writeUARTData(prevLabel);    
        // console.log(prevLabel);
    }
}

