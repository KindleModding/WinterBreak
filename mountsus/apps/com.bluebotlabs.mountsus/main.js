/**
 * @preserve
 * MESSAGE FROM THE MOUNTSUS DEVELOPER
 * I'm genuinely sorry to whatever underpaid lab126 developer has to reverse-engineer this
 * Please just give us a developer mode though
 * You need it to comply with the DMA anyway, give us sideloading before the EU forces you to lol
 */

function log(logStuff) {
    document.getElementById("log").innerHTML += "\n" + logStuff.toString();
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}