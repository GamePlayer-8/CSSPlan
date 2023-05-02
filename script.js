document.getElementById('warning').remove();

var fileselectortype = 0;

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    if (fileselectortype == 0) {
        var css = document.getElementById("editor");
        var editor = css.contentWindow.document.getElementById("editing");
        var reader = new FileReader();
        reader.onload = function (e) {
            editor.value = e.target.result;
        }
        reader.readAsText(fileList[0]);

        editor.click();
    } else if (fileselectortype == 1) {
        var iframe = document.getElementById('display');
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
    var popup = document.getElementById('file-popup');
    popup.style.display = "none";
});

function save_css() {
    var css = document.getElementById("editor");
    var editor = css.contentWindow.document.getElementById("editing");
    var content = editor.value;

    var data = new Blob([content], {type: 'text/plain'});

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
    var file_ask = document.getElementById('file-popup');
    file_ask.style.display = "inline";
}

function upload_cancel() {
    var file_ask = document.getElementById('file-popup');
    file_ask.style.display = "none";
}

function load_html() {
    fileselectortype = 1;
    var file_ask = document.getElementById('file-popup');
    file_ask.style.display = "inline";
}

function update_css() {   
    var css = document.getElementById("editor");
    var editor = css.contentWindow.document.getElementById("editing");
    
    var style = document.createElement('style');

    style.textContent = editor.value;

    var iframe = document.getElementById('display');
    iframe.contentWindow.document.head.appendChild(style);
}
