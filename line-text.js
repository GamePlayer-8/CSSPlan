var lineCounter = document.getElementById('lines');
var iframe = document.getElementById('editor');
var lineCountCache = 0;
var codeEditor;

iframe.addEventListener( "load", function() {
    codeEditor = iframe.contentWindow.document.getElementById('editing');
    codeEditor.onscroll = function() {
        sync_scroll();
        iframe.contentWindow.sync_scroll(codeEditor);
    };
    codeEditor.onclick = function() {
        update_css();
        iframe.contentWindow.sync_scroll(codeEditor);
        iframe.contentWindow.update(codeEditor.value);
    };
    codeEditor.oninput = function() {
        update_css();
        iframe.contentWindow.sync_scroll(codeEditor);
        iframe.contentWindow.update(codeEditor.value);
    };
    line_counter();
    sync_scroll();
} );

function update_css() {
    line_counter();
    sync_scroll();
}

function sync_scroll() {
    lineCounter.scrollTop = codeEditor.scrollTop;
}

function line_counter() {
    var lineCount = codeEditor.value.split('\n').length;
    var outarr = new Array();
    if (lineCountCache != lineCount) {
        for (var x = 0; x < lineCount; x++) {
        outarr[x] = (x + 1) + '.';
        }
        lineCounter.value = outarr.join('\n');
    }
    lineCountCache = lineCount;
}
