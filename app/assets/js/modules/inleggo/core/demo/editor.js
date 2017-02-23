function editorJS(id, theme){
    var editor = ace.edit(id);
    editor.resize();
    editor.setTheme("ace/theme/"+theme);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setOption("maxLines", Infinity);
    editor.setOption("minLines", 2);
    editor.setAutoScrollEditorIntoView();
    editor.renderer.setScrollMargin(20, 80);
    editor.getSession().setUseWrapMode(true);
    editor.$blockScrolling = Infinity;
};
function editorJSReadOnly(id, theme){
    var editor = ace.edit(id);
    editor.resize();
    editor.setTheme("ace/theme/"+theme);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setOption("maxLines", Infinity);
    editor.setOption("minLines", 2);
    editor.setAutoScrollEditorIntoView();
    editor.renderer.setScrollMargin(20, 80);
    editor.getSession().setUseWrapMode(true);
    editor.setReadOnly(true);
    editor.$blockScrolling = Infinity;
};
function getScriptReport(id,code, theme){
    var url = "pre.reporte";
    $.get(pathTag + url + ".php", { code: code})
      .done(function(data) {
        var editor = ace.edit(id);
        editor.resize();
        editor.setTheme("ace/theme/"+theme);
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOption("maxLines", Infinity);
        editor.setOption("minLines", 2);
        editor.setAutoScrollEditorIntoView();
        editor.renderer.setScrollMargin(20, 80);
        editor.getSession().setUseWrapMode(true);
        editor.setValue(data);
        editor.gotoLine(1);
        editor.setReadOnly(false);
        editor.$blockScrolling = Infinity;
    });
};