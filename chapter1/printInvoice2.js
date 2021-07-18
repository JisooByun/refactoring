/**
 * switch문을 따로 함수로 뺏다.
 * */

function amountFor(perf,play){
    let result = 0;
    switch (play.type){
        case "tragedy"://비극
            result = 4000;
            if(perf.audience > 30){
                result+=1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if(perf.audience > 20){
                result += 1000 *(perf.audience - 20);
            }
            result += 300 * perf.audience;
            break
        default:
            throw new Error(`알수 없는 장르 : ${play.type}`)
    }
    return result;
}

function statement(invoice,plays){
    let totalAmout = 0;
    let volumeCredit = 0;
    let result =`청구내역 ( 고객명 :${invoice.customer}\n`
    const format = new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format;

    for( let perf of invoice.performance){
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf,play)
        //포인트 적립
        volumeCredit += Math.max(perf.audience -30 ,0);
        if("comedy" === play.type) volumeCredit += Math.floor(perf.audience/5);

        result += `${play.name}:${format(thisAmount/100)} (${perf.audience}석\n)`
        totalAmout += thisAmount;

    }
    result +=`총액: ${format(totalAmout/100)}\n`
    result +=`적립포인트 : ${volumeCredit}점\n`
    return result
}