/**
 * totalAmount와 volumeCredit은 반복문 내에서 중첩되는 부분을 따로 뺀다.
 *
 * */


function statement(invoice, plays) {
    let result = `청구내역 ( 고객명 :${invoice.customer}\n`
    for (let perf of invoice.performance) {
        //포인트 적립
        result += `${playFor(pref).name}:${usd(amountFor(perf))} (${perf.audience}석\n)`
    }
    result += `총액: ${usd(totalAmount(invoice))}\n`
    result += `적립포인트 : ${(totalVolumeCredit(invoice))}점\n`
    return result

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
        }).format(aNumber / 100);
    }

    function totalVolumeCredit(invoice) {
        let result = 0;
        for (let perf of invoice.performance) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function totalAmount(invoice) {
        let result = 0;
        for (let perf of invoice.performance) {
            result += amountFor(perf);
        }
        return result;
    }

}