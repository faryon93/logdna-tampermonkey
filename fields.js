// ==UserScript==
// @name         LogDNA Formater
// @namespace    https://github.com/faryon93/
// @version      0.2
// @description  Reformat LogDNA fields according to Xorbits Logformat
// @author       Maximilian Pachl
// @match        https://app.logdna.com/*/logs/view*
// @grant        none
// ==/UserScript==

// ------------------------------------------------------------------------------------------------
function logline(elem)
{
    if (!elem || !elem.getElementsByClassName)
        return;

    for (let q of elem.getElementsByClassName("base-text"))
        q.innerHTML = q.innerHTML.replace(/\\\"/g, "\"");
}

// ------------------------------------------------------------------------------------------------
function trace(elem)
{
    elem.innerHTML = elem.innerHTML.replace("\\n", "<br>");
}

// ------------------------------------------------------------------------------------------------
(function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains("log-content"))
                mutation.addedNodes.forEach(logline);
            else if (mutation.target.classList.contains("log-line-context"))
            {
                let fields = mutation.target.getElementsByClassName("line-field-dt");
                for (let field of fields)
                {
                    let content = field.parentNode.nextElementSibling;
                    if (field.innerHTML == "trace")
                        trace(content);
                }
            }
        });
    });

    observer.observe(document, {subtree: true, childList: true, attributes: true});
})();
