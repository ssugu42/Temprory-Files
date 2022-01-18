function Activity(){
    let _this = this;
    _this.total = 0;
    _this.average;

    const data = {
        brand: {Vivo: 1, Others: 1,Oppo: 2,Redmi: 3,Nokia: 3,OnePlus: 4,Samsung: 5},
        noOfContacts: [{100: 1,150: 2,200: 3,300: 4}],
        potoSize: [{20:1,40:2,60:3,80:4,100:5}],
        noOfSubmission: [{1:5,2:4,3:3,4:2}],
        company: [{Unknown: 1,Tyre2: 3,Tyre3: 2,Tyre1: 5}]
    }

    const input = {
        brand: "OnePlus",
        noOfContacts: 124,
        potoSize: 70,
        noOfSubmission: 1,
        company: "Tyre2"
    }

    const output = [];

    this.init = function(){
        console.log("JS active");
        
        for(let i in input){
            if(i == "brand"){
                let x = data[i];
                output.push(x[input[i]]);
            }else if(i == "noOfContacts"){
                let x = data[i][0];
                for(let temp in x){
                    if(input[i]<temp){
                        output.push(x[temp]);
                        break;
                    }else if(input[i]>300){
                        output.push(5);
                        break;
                    }
                }  
            }else if(i=="potoSize"){
                let x = data[i][0];
                for(let temp in x){
                    if(input[i]<temp){
                        output.push(x[temp]);
                        break;
                    }else if(input[i]>300){
                        output.push(5);
                        break;
                    }
                }
            }else if(i == "noOfSubmission"){
                let x = data[i][0];
                for(let temp in x){
                    if(temp == input[i]){
                        output.push(x[temp]);
                        break;
                    }else if(input[i]>5){
                        output.push(1);
                        break;
                    }
                }
            }else if( i == "company"){
                let x = data[i][0];
                for(let temp in x){
                    if(temp == input[i]){
                        output.push(x[temp]);
                        break;
                    }
                }
            }
        }
        console.log(output);

        $(output).each((i, val) =>{
            _this.total +=  val;
        })
        console.log(_this.average = _this.total/5);
        $('#out').text(`Average is : ${_this.average}`);
    }
}