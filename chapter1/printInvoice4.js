/**
 * format 과 같은 변수는 임시 변수이다. 임시변수는 자신이 속한 루틴에만 의미가 있기 때문에 루틴이 길고 복잡해지기 쉽다. 따라서 이러한 변수를 제거하는게 좋다.
 * 따라서 format 을 함수로 변환한다.
 * */

function playFor(pref) {
    return plays[pref.playId]
}

function amountFor(perf) {
    let result = 0;
    switch (playFor(perf).type) {
        case "tragedy"://비극
            result = 4000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 1000 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break
        default:
            throw new Error(`알수 없는 장르 : ${playFor(perf).type}`)
    }
    return result;
}

function volumeCreditsFor(perf) {
    let volumeCredit = 0;
    volumeCredit += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(pref).type) volumeCredit += Math.floor(perf.audience / 5);
    return volumeCredit;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber/100);
}

function statement(invoice, plays) {
    let totalAmout = 0;
    let volumeCredit = 0;
    let result = `청구내역 ( 고객명 :${invoice.customer}\n`

    for (let perf of invoice.performance) {
        //포인트 적립
        volumeCredit += volumeCreditsFor(perf);
        totalAmout += amountFor(perf);
        result += `${playFor(pref).name}:${usd(amountFor(perf))} (${perf.audience}석\n)`
    }
    result += `총액: ${usd(totalAmout)}\n`
    result += `적립포인트 : ${volumeCredit}점\n`
    return result
}