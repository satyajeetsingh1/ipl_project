function matcheswon(ele){
    return ele.reduce((acc,val)=>{
        let season = val.season;
        let team = val.winner;
        if(acc[season]){
            if(acc[season][team]){
                acc[season][team] +=1;
            }else{
                acc[season][team] = 1;
            }
        }else{
            acc[season] = {};
            acc[season][team]=1;
           
        }
        return acc;
    },{})
}

module.exports = matcheswon;