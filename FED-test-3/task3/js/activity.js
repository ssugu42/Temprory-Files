function Activity(){
    let _this = this;

    const datapoints = [
        {
            days:[
                [7, 10, 20, 5, 4], [4, 14, 10, 2, 3], [20, 5, 10, 4, 2], [24, 34, 40, 2, 3], [10, 15, 8, 22, 5, 7]
            ]
        },
        {
            days:[
                [10, 8, 6, 20, 35], [7, 15, 21, 20, 19], [30, 2, 9, 14, 17], [24, 34, 14, 12, 8], [8, 2, 7, 9, 6, 1]
            ]
        },
        {
            days:[
                [8, 5, 16, 20, 35], [17, 2, 8, 12, 19], [5, 2, 9, 14, 7], [5, 15, 24, 12, 16], [5, 17, 24, 31, 0, 8]
            ]
        },
        {
            days:[
                [5, 10, 20, 15, 4], [4, 4, 10, 12, 3], [20, 5, 0, 14, 2], [24, 34, 20, 2, 13], [10, 15, 28, 22, 5, 27]
            ]
        }
    ]
    


    this.init = function(){
        console.log("JS active");

        
        $('#days').change(_this.handleStafChange);
        $('#staf').change(_this.handleStafChange);

        _this.chart = new CanvasJS.Chart("chartCont", {
            animationEnabled: true,
            exportEnabled: false,
            theme: "light1",
            title:{
                text: "Collection Report"
            },
            axisY: {
              includeZero: true
            },
            data: [{
                type: "column",
                indexLabelFontColor: "#5A5757",
                indexLabelFontSize: 16,
                indexLabelPlacement: "outside",
                dataPoints: [
                    {label: "Level 1", y: datapoints[0].days[0][0]},
                    {label: "Level 2", y: datapoints[0].days[0][1]},
                    {label: "Level 3", y: datapoints[0].days[0][2]},
                    {label: "Level 4", y: datapoints[0].days[0][3]},
                    {label: "Level 5", y: datapoints[0].days[0][4]}
                ]
            }]
        });

        _this.chart.render();
        
    }

    this.handleStafChange = function(){
        console.log("changed");
        _this.currentStafID = $('#staf').val();
        _this.handleDayChange();
    }

    this.handleDayChange = function(){
        let currentday = $('#days').val();
        (_this.chart.data[0].dataPoints).splice(0, _this.chart.data[0].dataPoints.length);

        $(datapoints[_this.currentStafID].days[currentday]).each((index, val) => {
            console.log(index, val);
            (_this.chart.data[0].dataPoints).push({label: `Level ${index+1}`, y: val});
        })
        _this.chart.render();
        console.log(_this.chart.data[0].dataPoints);
    }


}