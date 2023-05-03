var hc = document.getElementById('highlighting-content');
var h = document.getElementById('highlighting');
var editor = document.getElementById('editing');

function update(text) {
        // Handle final newlines (see article)
    if(text[text.length-1] == "\n") { // If the last character is a newline character
        text += " "; // Add a placeholder space character to the final line 
    }
    // Update code
    hc.innerText = text;
    // Syntax Highlight
    Prism.highlightElement(hc);
}

function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    // Get and set x and y
    h.scrollTop = element.scrollTop;
    h.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
    let code = element.value;
    if(event.key == "Tab") {
      /* Tab key pressed */
      event.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(element.value); // Update text to include indent
    }
}

update(editor.value);
sync_scroll(editor);
