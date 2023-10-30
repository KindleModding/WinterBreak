function log(logStuff) {
    document.getElementById("log").innerHTML += "\n" + logStuff.toString();
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
}