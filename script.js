document.getElementById('warning').remove();

var popup = document.getElementById('file-popup');
var css = document.getElementById('editor');
var iframe = document.getElementById('display');
var fileselectortype = 0;
var editor;
var text_editor;

css.addEventListener( "load", function() {
    text_editor = css.contentWindow.document.getElementById('editor');
    editor = text_editor.contentWindow.document.getElementById('editing');
    editor.onclick = function() {
        sync_view();
    }
    editor.oninput = function() {
        sync_view();
    }
});

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    if (fileselectortype == 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            editor.value = e.target.result;
            sync_view();
        }
        reader.readAsText(fileList[0]);
    } else if (fileselectortype == 1) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (iframe.src !== undefined) {
                window.URL.revokeObjectURL(iframe.src);
            }
            var blob = new Blob([e.target.result], {type: 'text/html'});
            var link = window.URL.createObjectURL(blob);
            iframe.src = link;
        }
        reader.readAsText(fileList[0]);
    }
    popup.style.display = "none";
});

function sync_view() {
    update_css();
    css.contentWindow.update_css();
    text_editor.contentWindow.sync_scroll(editor);
    text_editor.contentWindow.update(editor.value);
}

function save_css() {
    var data = new Blob([editor.value], {type: 'text/plain'});

    var link = window.URL.createObjectURL(data);

    //Check the Browser type and download the File.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob, "file.css");
    } else {
        var a = document.createElement("a");
        a.setAttribute("download", "file.css");
        a.setAttribute("href", link);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    window.URL.revokeObjectURL(link);
}

function load_css() {
    fileselectortype = 0;
    popup.style.display = "inline";
}

function upload_cancel() {
    popup.style.display = "none";
}

function load_html() {
    fileselectortype = 1;
    popup.style.display = "inline";
}

function update_css() { 
    var style = document.createElement('style');

    style.textContent = editor.value;
    style.id = 'EDITORCSSENGINEstyle';

    var element = iframe.contentWindow.document.getElementById('EDITORCSSENGINEstyle');
    if (element !== null) {
        element.remove();
    }

    iframe.contentWindow.document.head.appendChild(style);
}
