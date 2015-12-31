var socket = io.connect();
var data = {};
var fonts = [];
var timezone = new Date().getTimezoneOffset();
var window_width = window.screen.availWidth;
var window_height = window.screen.availHeight;
var color_depth = screen.colorDepth;
var canvas_key = "none";

// Not similar across browsers
// for(var i = 0; i < navigator.plugins.length; i++)
//     plugins.push(navigator.plugins[i].name);

// Get fonts list using the font checker from http://www.lalit.org/lab/javascript-css-font-detect/
// Fonts checked from https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js
var fontsToCheck = [
    "Andale Mono", "Arial", "Arial Hebrew", "Arial MT", "Arial Rounded MT Bold", "Arial Unicode MS",
          "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style",
          "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New",
          "Garamond", "Geneva", "Georgia",
          "Helvetica", "Helvetica Neue",
          "Impact",
          "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode",
          "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO",
          "Palatino", "Palatino Linotype",
          "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Symbol",
          "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS",
          "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"
    ];
          
var d = new Detector();

fontsToCheck.forEach(function(font){
    if(d.detect(font))
        fonts.push(font);
});
    
data = {
    time: timezone,
    width: window_width,
    height: window_height,
    depth: color_depth,
    canvas_key: canvas_key,
    font_key: fonts.join(',').toString()
};
socket.emit('fingerprint', data);

socket.on('userid', function(data){
    $("#userid").html(data.name);
});