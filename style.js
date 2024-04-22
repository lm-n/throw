function collapseConnect(){
    document.getElementById("connectContent").classList.remove('showContent');
    document.getElementById("connectContent").classList.add('hideContent');
    document.getElementById("connectCO").innerHTML = '<a href="javascript:openConnect();">🔽</a>';
}
function openConnect(){
    document.getElementById("connectContent").classList.remove('hideContent');
    document.getElementById("connectContent").classList.add('showContent');
    document.getElementById("connectCO").innerHTML = '<a href="javascript:collapseConnect();">❎</a>';
}

function collapseAllDataDISC(){
    document.getElementById("allDataContent").classList.remove('showContent');
    document.getElementById("allDataContent").classList.add('hideContent');
    document.getElementById("allDataCO").innerHTML = '';
}

function removeDivs(){
    document.getElementById("connect").innerHTML = '';
    document.getElementById("addData").innerHTML = '';
    document.getElementById("trainMdl").innerHTML = '';
    document.getElementById("testMdlCO").innerHTML = '';
    document.getElementById("connect").remove("corners");
    document.getElementById("addData").remove("corners");
    document.getElementById("trainMdl").remove("corners");


}

function collapseAllData(){
    document.getElementById("allDataContent").classList.remove('showContent');
    document.getElementById("allDataContent").classList.add('hideContent');
    document.getElementById("allDataCO").innerHTML = '<a href="javascript:openAllData();">🔽</a>';
}
function openAllData(){
    document.getElementById("allDataContent").classList.remove('hideContent');
    document.getElementById("allDataContent").classList.add('showContent');
    document.getElementById("allDataCO").innerHTML = '<a href="javascript:collapseAllData();">❎</a>';
}

function collapseTrainMdl(){
    document.getElementById("trainMdlContent").classList.remove('showContent');
    document.getElementById("trainMdlContent").classList.add('hideContent');
    document.getElementById("trainMdlCO").innerHTML = '<a href="javascript:openTrainMdl();">🔽</a>';
}

function openTrainMdl(){
    document.getElementById("trainMdlContent").classList.remove('hideContent');
    document.getElementById("trainMdlContent").classList.add('showContent');
    document.getElementById("trainMdlCO").innerHTML = '<a href="javascript:collapseTrainMdl();">❎</a>';
}

function collapseTestDISC(){
    document.getElementById("testMdlContent").classList.remove('showContent');
    document.getElementById("testMdlContent").classList.add('hideContent');
    document.getElementById("testMdlCO").innerHTML = '';
}

function collapseTestMdl(){
    document.getElementById("testMdlContent").classList.remove('showContent');
    document.getElementById("testMdlContent").classList.add('hideContent');
    document.getElementById("testMdlCO").innerHTML = '<a href="javascript:openTestMdl();">🔽</a>';
}

function openTestMdl(){
    document.getElementById("testMdlContent").classList.remove('hideContent');
    document.getElementById("testMdlContent").classList.add('showContent');
    document.getElementById("testMdlCO").innerHTML = '<a href="javascript:collapseTestMdl();">❎</a>';
}

