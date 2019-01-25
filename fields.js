// ==UserScript==
// @name         LogDNA Formater
// @namespace    https://github.com/faryon93/
// @version      0.1
// @description  Reformat LogDNA fields according to Xorbits Logformat
// @author       Maximilian Pachl
// @match        https://app.logdna.com/*/logs/view/*
// @grant        none
// ==/UserScript==

(function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!mutation.target.classList.contains("log-line-context"))
                return;

            for (let q of mutation.target.getElementsByClassName("line-field-dt"))
            {
                let content = q.parentNode.nextElementSibling;
                if (q.innerHTML == "trace")
                    content.innerHTML = content.innerHTML.replace("\\n", "<br>");
            }
        });
    });

    observer.observe(document, {subtree: true, childList: true, attributes: true});
})();
