/**
 * totalAmount와 volumeCredit은 반복문 내에서 중첩되는 부분을 따로 뺀다.
 *
 * */

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays))
}

function createStatementData(invoice, plays) {
    const statementData = {}
    statementData.customer = invoice.customer;
    statementData.performance = invoice.performance.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredit = totalVolumeCredit(statementData);
    return statementData

    function enrichPerformance(perf) {
        return {
            ...perf,
            play: playFor(perf),
            amount: amountFor(perf),
            volumeCredits: volumeCreditsFor(perf),
        };
    }

    function playFor(pref) {
        return plays[pref.playId]
    }

    function amountFor(perf) {
        let result = 0;
        switch (perf.play.type) {
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
                throw new Error(`알수 없는 장르 : ${perf.play.type}`)
        }
        return result;
    }

    function volumeCreditsFor(perf) {
        let volumeCredit = 0;
        volumeCredit += Math.max(perf.audience - 30, 0);
        if ("comedy" === perf.play.type) volumeCredit += Math.floor(perf.audience / 5);
        return volumeCredit;
    }

    function totalVolumeCredit(data) {
        return data.performance.reduce((total, p) => total + p.volumeCredits, 0);
    }

    function totalAmount(data) {
        return data.performance.reduce((total, p) => total + p.amount, 0);
    }
}

function renderPlainText(data) {
    let result = `청구내역 ( 고객명 :${data.customer}\n`
    for (let perf of data.performance) {
        //포인트 적립
        result += `${pref.play.name}:${usd(perf.amount)} (${perf.audience}석\n)`
    }
    result += `총액: ${usd(data.totalAmount)}\n`
    result += `적립포인트 : ${data.totalVolumeCredit}점\n`
    return result


    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
    }


}