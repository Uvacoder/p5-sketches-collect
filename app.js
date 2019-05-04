

/** Set to true to generate animation styling to console */
if (false) {

    /** Functions to simplify syntax of creating elements */
    function open(selector, tab) {
        style += `${selector}`
        if (tab) { style += ' ' };
        style += ` { `;
    }
    function close() {
        style += `}\n`;
}
    function addStyle(name, value) {
        style += `${name}: ${value}; `;
    }
    function addStyles(name, values) {
        let len = values.length - 1;
        style += `${name}: `
        for (let j = 0; j <= len; j++) {
            style += values[j];
            if (j < len) { style += ', '; }
        }
        style += "; ";
    }
    function add(string) {
        style += string;
    }

    /** Fetching all elements */
    const title = document.querySelectorAll(".cls-1");
    const subtitle = document.querySelectorAll(".cls-2");

    /** Creating empty style */
    let style = "";

    /** Creating animation for each main title letter seperately */
    for (let i = 0; i < title.length; i++) {
        let len = (title[i].getTotalLength() + 2).toFixed(4).toString();
        open(`#paths path:nth-child(${i+1})`, i < 9);
        addStyle("stroke-dasharray", len);
        addStyle("stroke-dashoffset", len);
        addStyle("stroke-linecap", "round");
        addStyles("animation", [
            `draw-in 1s ${(0.1 * i).toFixed(2)}s ease-out forwards`,
            `fill-in 2s ease forwards ${((title.length - 1) * 0.1).toFixed(2)}s`
        ]);
        close();
    }

    /** Creating animation for all subtitle letters */
    open(".cls-2");
    addStyles("animation", [
        `fill-in 0.7s ease forwards 0.5s`,
        `pop-up 1s ease forwards 0.5s`
    ]); 
    close();

    /** Creating animation keyframes */
    add("@keyframes draw-in { to { stroke-dashoffset: 0; } }\n");
    add("@keyframes fill-in { from { fill: transparent; } to { fill: white; } }\n");
    add("@keyframes pop-up { from { transform: translateY(50px); } to { transform: translateY(0); } }\n");
    console.log(style);
    // console.log(title[0].style);
}