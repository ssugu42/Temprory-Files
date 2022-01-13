function Activity(){
    let _this = this;

    _this.pieChartData = {
        male: 0,
        female: 0,
        others: 0
    }

    _this.barProfileCompletionStatus = {
        facebookCompleted: 0,
        aadhardetailsCompleted: 0,
        agreementCompleted: 0,
        currentAddressCompleted: 0,
        familydetailsCompleted: 0,
        marksheetCompleted: 0,
        namedetailsCompleted: 0,
        proffesioncompleted: 0,
        referralCompleted: 0,
        studentdetailsCompleted: 0,
        verifyCompleted: 0,
        whatsappCompleted: 0
    }
    
    this.init = function(){
        console.log("JS active");
        _this.getExcelData();
    }

    this.getExcelData  = function(){
        async function getData(callbck){
            await fetch('/assets/data/data.json',{
                method: "GET"
            }).then( res => {
                if(res.ok){
                    return res.json();
                } 
            }).then((data) => {
                console.log(data)
                _this.data = data;
                
                callbck();
                _this.loadMap(_this.data.Sheet1);
            })
        }

        getData(_this.validateData);
    }

    this.validateData = function(){
        
        $(_this.data.Sheet1).each((index, val) => {
            if(val.Gender != null){
                if(val.Gender == "Male"){
                    _this.pieChartData.male++;
                }else if(val.Gender == "Female"){
                    _this.pieChartData.female++;
                }else{
                    _this.pieChartData.others++;
                }
            }

            if(val.Profile_Status != null){
                switch(val.Profile_Status){
                    case "facebookCompleted":
                    _this.barProfileCompletionStatus.facebookCompleted++;
                    break;
    
                    case "aadhardetailsCompleted":
                    _this.barProfileCompletionStatus.aadhardetailsCompleted++;
                    break;
    
                    case "agreementCompleted":
                    _this.barProfileCompletionStatus.agreementCompleted++;
                    break;
    
                    case "currentAddressCompleted":
                    _this.barProfileCompletionStatus.currentAddressCompleted++;
                    break;
    
                    case "familydetailsCompleted":
                    _this.barProfileCompletionStatus.familydetailsCompleted++;
                    break;
    
                    case "marksheetCompleted":
                    _this.barProfileCompletionStatus.marksheetCompleted++;
                    break;
                        
                    case "namedetailsCompleted":
                    _this.barProfileCompletionStatus.namedetailsCompleted++;
                    break;
    
                    case "proffesioncompleted":
                    _this.barProfileCompletionStatus.proffesioncompleted++;
                    break;
    
                    case "referralCompleted":
                    _this.barProfileCompletionStatus.referralCompleted++;
                    break;
    
                    case "studentdetailsCompleted":
                    _this.barProfileCompletionStatus.studentdetailsCompleted++;
                    break;
    
                    case "verifyCompleted":
                    _this.barProfileCompletionStatus.verifyCompleted++;
                    break;
    
                    case "whatsappCompleted":
                    _this.barProfileCompletionStatus.whatsappCompleted++;
                    break;
                }
            }
        });

        _this.drawPieChart(_this.pieChartData);
        _this.drawBarChart(_this.barProfileCompletionStatus);
        
    }

    this.drawPieChart = function(data){

        let male = (data.male / _this.data.Sheet1.length) * 100,
            female = (data.female / _this.data.Sheet1.length) * 100,
            others = (data.others / _this.data.Sheet1.length) * 100;

        _this.pieChart = new CanvasJS.Chart('pieChart', {
            theme: "light2",
            exportEnabled: false,
            animationEnabled: true,
            title: {
                text: "Gender Pie Chart"
            },
            data: [{
                type: "pie",
                startAngle: 45,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: male, label: "Male", color: "#E50E36" },
                    { y: female, label: "Female", color: "#08EE7F"},
                    { y: others, label: "Others", color: "#0537F4"}
                ]
            }]
        })

    }

    this.drawBarChart = function(data){

        _this.barChart = new CanvasJS.Chart("barChart", {
            animationEnabled: true,
            
            title:{
                text:"Profile Completion Status"
            },
            axisX:{
                interval: 1
            },
            axisY2:{
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
            },
            data: [{
                type: "bar",
                name: "Profile Status",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: [
                    { y: data.facebookCompleted, label: "Facebook Completed" },
                    { y: data.aadhardetailsCompleted, label: "Aadhardetails Completed" },
                    { y: data.agreementCompleted, label: "Agreement Completed" },
                    { y: data.currentAddressCompleted, label: "CurrentAddress Completed", indexLabel: "\u2691 Lowest"},
                    { y: data.familydetailsCompleted, label: "Familydetails Completed", indexLabel: "\u2605 Highest" },
                    { y: data.marksheetCompleted, label: "Marksheet Completed" },
                    { y: data.namedetailsCompleted, label: "Namedetails Completed" },
                    { y: data.proffesioncompleted, label: "Proffesion completed" },
                    { y: data.referralCompleted, label: "Referral Completed" },
                    { y: data.studentdetailsCompleted, label: "Studentdetails Completed" },
                    { y: data.verifyCompleted, label: "Verify Completed" },
                    { y: data.whatsappCompleted, label: "Whatsapp Completed" }
                ]
            }]
        });

    }

    this.loadMap = function(sheetData){
            var map = null;
            var marker = [];

            map = new MapmyIndia.Map('mapContainer', {center: [28.549948, 77.268241], zoomControl: true, hybrid: true});

            
            function addMarker(position, icon, title, draggable) {
                if (icon == '') {
                    var mk = new L.Marker(position, {draggable: draggable, title: title});
                    mk.bindPopup(title);
                } else {
                    var mk = new L.Marker(position, {icon: icon, draggable: draggable, title: title});
                    mk.bindPopup(title);
                }
                map.addLayer(mk);

                return mk;
            }

            function mapmyindia_removeMarker() {
                var markerlength = marker.length;
                if (markerlength > 0) {
                    for (var i = 0; i < markerlength; i++) {
                        map.removeLayer(marker[i]);
                    }
                }
                delete marker;
                marker = [];
            }

            function mapmyindia_multiple_markers() {
                mapmyindia_removeMarker();

                $(sheetData).each((index, val) => {
                    if(val.Latitude != null & val.Longitude != null){
                        let position = new L.LatLng(val.Latitude,val.Longitude);
                        marker.push(addMarker(position, '', val.State));
                        console.log(val.Latitude,val.Longitude)
                    }
                })
                $('.PreLoader').hide();
                _this.pieChart.render();
                _this.barChart.render();
            }

            mapmyindia_multiple_markers();

    }
}