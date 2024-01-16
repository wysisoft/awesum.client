import { I18nGlobal } from "@/i18nGlobal";
import { resources } from "@/resources/Resources";

var verticalRuler = document.createElement('div');
verticalRuler.id = 'verticalRuler';
document.body.prepend(verticalRuler);

var style = document.createElement('style');
style.innerHTML = `
    body {
      display: flex;
      flex-direction: row;
    }

    #verticalRuler {
      width: 3px;
      height: 100vmin;
      top: 0;
      left: 0;
      position: relative;
    }

    .bar {
      position: absolute;
      background: black;
    }

    .verticalBar {
      height: 1px;
      position: absolute;
      width: 3px;
    }

    .txt {
      position: absolute;
      left: -5vmin;
      top: -.5vmin;
      font-size: 1vmin;
    }`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
    const verticalRuler = document.getElementById('verticalRuler')!;


    // Create bars for vertical ruler
    for (let i = 0; i <= 97.5; i += 2.5) {
        let bar = document.createElement('div');
        bar.classList.add('bar', 'verticalBar');
        bar.style.top = `${i}vmin`;
        if (i > 0) {
            let txt = document.createElement('div');
            bar.appendChild(txt);
            txt.classList.add('txt');
            txt.innerText = i.toString();
        }
        verticalRuler.appendChild(bar);
    }
});


document.title = I18nGlobal.t(resources.Awesum.key);