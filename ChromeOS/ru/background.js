/*
Sunny-branded russian phonetic layout for ChromeOS
*/

let contextID = 0;

const capsoffkeys = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backslash",
    "Slash"
];

//The lookup table (lut) object structure:
//  "keyData.code"    : [ "plain", "shifted", "altered", "altered&shifted" ]
const lut = {
    "Backquote"   : [ "ю", "Ю", "`", " ́" ],
    "Digit1"      : [ "1", "!", "₽", "¹" ],
    "Digit2"      : [ "2", "@","@", "²" ],
    "Digit3"      : [ "3", "ё", "№", "³" ],
    "Digit4"      : [ "4", "Ё", "$", "¤" ],
    "Digit5"      : [ "5", "ъ", "€", "£" ],
    "Digit6"      : [ "6", "Ъ", "^", "¼" ],
    "Digit7"      : [ "7", "&", "&", "½" ],
    "Digit8"      : [ "8", "*", "~", "¾" ],
    "Digit9"      : [ "9", "(", "«", "±" ],
    "Digit0"      : [ "0", ")", "»", "™" ],
    "Minus"       : [ "-", "_", "¥", "₴" ],
    "Equal"       : [ "ч", "Ч", "×", "÷" ],
    "KeyQ"        : [ "я", "Я",  "",  "" ],
    "KeyW"        : [ "в", "В", "џ", "Џ" ],
    "KeyE"        : [ "е", "Е",  "",  "" ],
    "KeyR"        : [ "р", "Р", "¶", "®" ],
    "KeyT"        : [ "т", "Т", "є", "Є" ],
    "KeyY"        : [ "ы", "Ы", "њ", "Њ" ],
    "KeyU"        : [ "у", "У", "ґ", "Ґ" ],
    "KeyI"        : [ "и", "И", "ї", "Ї" ],
    "KeyO"        : [ "о", "О", "ў", "Ў" ],
    "KeyP"        : [ "п", "П",  "",  "" ],
    "BracketLeft" : [ "ш", "Ш", "{", "“" ],
    "BracketRight": [ "щ", "Щ", "}", "”" ],
    "Backslash"   : [ "э", "Э", "|", "¬" ],
    "KeyA"        : [ "а", "А",  "",  "" ],
    "KeyS"        : [ "с", "С", "§", "§" ],
    "KeyD"        : [ "д", "Д",  "",  "" ],
    "KeyF"        : [ "ф", "Ф",  "", "ª" ],
    "KeyG"        : [ "г", "Г", "Ω",  "" ],
    "KeyH"        : [ "х", "Х",  "",  "" ],
    "KeyJ"        : [ "й", "Й", "j", "J" ],
    "KeyK"        : [ "к", "К", "љ", "Љ" ],
    "KeyL"        : [ "л", "Л", "ђ", "Ђ" ],
    "Semicolon"   : [ ";", ":", "[", "‘" ],
    "Quote"       : [ "'", "\"", "]", "’" ],
    "KeyZ"        : [ "з", "З", "s", "S" ],
    "KeyX"        : [ "ь", "Ь", "ћ", "Ћ" ],
    "KeyC"        : [ "ц", "Ц", "¢", "©" ],
    "KeyV"        : [ "ж", "Ж", "↓", "↑" ],
    "KeyB"        : [ "б", "Б", "i", "I" ],
    "KeyN"        : [ "н", "Н",  "",  "" ],
    "KeyM"        : [ "м", "М", "µ", "º" ],
    "Comma"       : [ ",", "<", "<", "←" ],
    "Period"      : [ ".", ">", ">", "→" ],
    "Slash"       : [ "/", "?", "'", "°" ],
    "Space"       : [ " ", " ", "\u00a0", "\u00a0" ],
};

let altstate = false;

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      let handled = false;

      if ((keyData.type == "keydown") && (keyData.code == "AltRight")) {
          if (altstate == false) {
              altstate = true;
          }
      }

      if (keyData.type == "keydown" && keyData.altKey == false && keyData.ctrlKey == false) {

          if (lut[keyData.code]) {
            let modified = (keyData.shiftKey != keyData.capsLock) + 2 * altstate;
            if (capsoffkeys.includes(keyData.code)) {
              modified = keyData.shiftKey + 2 * altstate;
            }
              
            let emit = lut[keyData.code][modified];
            altstate = false;
              
          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
