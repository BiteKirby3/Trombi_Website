/**
 *
 * fonctions de logging personnalisé
 *
 */

function formatNumber(n){
    let s='0' + n;
    return s.substr(s.length-2,2);
}
export default function myLog(message) {

    let d = new Date();

    console.log (d.getFullYear()
        + '-' + formatNumber((d.getMonth()+1))
        + '-' + formatNumber(d.getDate())
        + ' ' + formatNumber(d.getHours())
        + ':' + formatNumber(d.getMinutes())
        + ':' + formatNumber(d.getSeconds())
        + '-' + message);
}
