function Activity(){
    let _this = this;
    var isListShown = false;
    const customer = [
        {name: "Rajesh", numberOfStars: 4},
        {name: "Praveen", numberOfStars: 1},
        {name: "Ishwarya", numberOfStars: 4},
        {name: "Anand", numberOfStars: 5},
        {name: "Rajnish", numberOfStars: 2},
        {name: "Roopesh", numberOfStars: 3},
        {name: "Mani", numberOfStars: 5},
        {name: "Suresh", numberOfStars: 5},
        {name: "Nithesh", numberOfStars: 2},
        {name: "Ram", numberOfStars: 1},
        {name: "Pavi", numberOfStars: 1}
    ]

    const server = [{data: []}, {data: []}, {data: []}, {data: []}, {data: []}, {data: []}, {data: []}, {data: []}, {data: []}, {data: []}];

    this.init = function(){
        console.log("JS active");
        _this.showPageChage(isListShown);
        $('#tableTab').click(e =>{
            isListShown = true;
            _this.showPageChage(isListShown);
            _this.loadList();
        })
        $('#addCustTab').click(e =>{
            isListShown = false;
            _this.showPageChage(isListShown);
        })

        try{
            $('#submit').click(e => {
                let flag = false;
                
                $(customer).each((index, val) =>{
                    if(val.name == $('#customerId').val()){
                        flag= true;
                    }
                })
                if(!flag){
                    if(($('#numofstars').val())<6){
                        _this.pushCus($('#customerId').val(),$('#numofstars').val(), _this.loadList)
                        flag = false;
                        console.log(customer);
                        isListShown = true
                        _this.showPageChage(isListShown);

                    }else{
                        alert("Star Range Must be in less then 5");
                        $('#numofstars').val("");
                        throw new Error("Star Range Must be in less then 5");
                    }
                }else{
                    alert("Name is already registered");
                    $('#customerId').val("");
                    throw new Error("Name is already registered");
                }
            })
        }catch(err){
            console.log(err.message);
        }
    }

    this.pushCus = function(name, num , callbck){
        customer.push({
            name: name,
            numberOfStars: parseInt(num)
        });
        callbck();
    }

    this.showPageChage = function(val){
        if(!val){
            $('.page1-data-entry').show();
            $('.page2-show-list').hide();
            // $('#addCustTab').addClass("active");
            // $('#tableTab').removeClass("active");
        }else{
            $('.page1-data-entry').hide();
            $('.page2-show-list').show();
            // $('#tableTab').addClass("active");
            // $('#addCustTab').removeClass("active");
        }
    }

    this.loadList = function(){
        for(let i=0; i<=5; i++){
            $('.page2-show-list table').append(`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`);
        }

        console.log("check", server);
        
        $(customer).each((index, val) => {
            switch(val.numberOfStars){
                case 5:
                    (server[9].data.length>=2) ? (server[8].data).push(val.name) : (server[9].data).push(val.name);
                    break;
                case 4:
                    (server[7].data.length>=2) ? (server[6].data).push(val.name) : (server[7].data).push(val.name);
                    break;
                case 3:
                    (server[5].data.length>=2) ? (server[4].data).push(val.name) : (server[5].data).push(val.name);
                    break;
                case 2:
                    (server[3].data.length>=2) ? (server[2].data).push(val.name) : (server[3].data).push(val.name);
                    break;
                case 1:
                    (server[1].data.length>=2) ? (server[0].data).push(val.name) : (server[1].data).push(val.name);
                    break;
            }
        });

        console.log(server);

        $(server).each((index, val) => {
            $(val.data).each((i,value) => {
                console.log(i+1, index+1)
                $(`.page2-show-list table tr:nth-child(${i+2}) td:nth-child(${index+1}`).text(value);

            })
        })

    }
}