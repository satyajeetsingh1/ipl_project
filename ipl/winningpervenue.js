function winningpervenue(matches){
    return matches.reduce((acc,ele)=>
    {
        let ven=ele.venue;
        let win=ele.winner;
        if(acc[ven]){
            if(acc[ven][win]){
                acc[ven][win] +=1;
            }else{
                acc[ven][win] = 1;
            }
        }else{
            acc[ven] = {};
            acc[ven][win] = 1;

        }
        return acc;
    },{})
    // console.log(result);
}

module.exports = winningpervenue;