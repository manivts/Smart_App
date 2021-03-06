/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 4.2.6
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced 
 * features including the FileReader API. 
 * 
 * The plugin drastically enhances the HTML file input to preview multiple files on the client before
 * upload. In addition it provides the ability to preview content of images, text, videos, audio, html, 
 * flash and other objects. It also offers the ability to upload and delete files using AJAX, and add 
 * files in batches (i.e. preview, append, or remove before upload).
 * 
 * Author: Kartik Visweswaran
 * Copyright: 2015, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
! function(e) {
    "use strict";
    e.fn.fileinputLocales = {};
    var i = function(e) {
            if ("Microsoft Internet Explorer" !== navigator.appName) return !1;
            if (10 === e) return new RegExp("msie\\s" + e, "i").test(navigator.userAgent);
            var i, t = document.createElement("div");
            return t.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", i = t.getElementsByTagName("i").length, document.body.appendChild(t), t.parentNode.removeChild(t), i
        },
        t = function(e, i, t, a) {
            var r = a ? i : i + ".fileinput";
            e.off(r).on(r, t)
        },
        a = {
            data: {},
            init: function(e) {
                var i = e.initialPreview,
                    t = e.id;
                i.length > 0 && !H(i) && (i = i.split(e.initialPreviewDelimiter)), a.data[t] = {
                    content: i,
                    config: e.initialPreviewConfig,
                    tags: e.initialPreviewThumbTags,
                    delimiter: e.initialPreviewDelimiter,
                    template: e.previewGenericTemplate,
                    msg: function(i) {
                        return e.getMsgSelected(i)
                    },
                    initId: e.previewInitId,
                    footer: e.getLayoutTemplate("footer").replace(/\{progress\}/g, e.renderThumbProgress()),
                    isDelete: e.initialPreviewShowDelete,
                    caption: e.initialCaption,
                    actions: function(i, t, a, r, n) {
                        return e.renderFileActions(i, t, a, r, n)
                    }
                }
            },
            fetch: function(e) {
                return a.data[e].content.filter(function(e) {
                    return null !== e
                })
            },
            count: function(e, i) {
                return a.data[e] && a.data[e].content ? i ? a.data[e].content.length : a.fetch(e).length : 0
            },
            get: function(i, t, r) {
                var n, l, o = "init_" + t,
                    s = a.data[i],
                    d = s.config[t],
                    c = s.initId + "-" + o,
                    p = " file-preview-initial";
                return r = void 0 === r ? !0 : r, null === s.content[t] ? "" : (Z(d) || Z(d.frameClass) || (p += " " + d.frameClass), n = s.template.replace(/\{previewId\}/g, c).replace(/\{frameClass\}/g, p).replace(/\{fileindex\}/g, o).replace(/\{content\}/g, s.content[t]).replace(/\{footer\}/g, a.footer(i, t, r)), s.tags.length && s.tags[t] && (n = K(n, s.tags[t])), Z(d) || Z(d.frameAttr) || (l = e(document.createElement("div")).html(n), l.find(".file-preview-initial").attr(d.frameAttr), n = l.html(), l.remove()), n)
            },
            add: function(i, t, r, n, l) {
                var o, s = e.extend(!0, {}, a.data[i]);
                return H(t) || (t = t.split(s.delimiter)), l ? (o = s.content.push(t) - 1, s.config[o] = r, s.tags[o] = n) : (o = t.length, s.content = t, s.config = r, s.tags = n), a.data[i] = s, o
            },
            set: function(i, t, r, n, l) {
                var o, s = e.extend(!0, {}, a.data[i]);
                if (H(t) || (t = t.split(s.delimiter)), l) {
                    for (o = 0; o < t.length; o++) s.content.push(t[o]);
                    for (o = 0; o < r.length; o++) s.config.push(r[o]);
                    for (o = 0; o < n.length; o++) s.tags.push(n[o])
                } else s.content = t, s.config = r, s.tags = n;
                a.data[i] = s
            },
            unset: function(e, i) {
                var t = a.count(e);
                if (t) {
                    if (1 === t) return a.data[e].content = [], void(a.data[e].config = []);
                    a.data[e].content[i] = null, a.data[e].config[i] = null
                }
            },
            out: function(e) {
                var i, t = "",
                    r = a.data[e],
                    n = a.count(e, !0);
                if (0 === n) return {
                    content: "",
                    caption: ""
                };
                for (var l = 0; n > l; l++) t += a.get(e, l);
                return i = r.msg(a.count(e)), {
                    content: t,
                    caption: i
                }
            },
            footer: function(e, i, t) {
                var r = a.data[e];
                if (t = void 0 === t ? !0 : t, 0 === r.config.length || Z(r.config[i])) return "";
                var n = r.config[i],
                    l = W("caption", n) ? n.caption : "",
                    o = W("width", n) ? n.width : "auto",
                    s = W("url", n) ? n.url : !1,
                    d = W("key", n) ? n.key : null,
                    c = s === !1 && t,
                    p = r.isDelete ? r.actions(!1, !0, c, s, d) : "",
                    u = r.footer.replace(/\{actions\}/g, p);
                return u.replace(/\{caption\}/g, l).replace(/\{width\}/g, o).replace(/\{indicator\}/g, "").replace(/\{indicatorTitle\}/g, "")
            }
        },
        r = function(e, i) {
            return i = i || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? i : e)
        },
        n = function() {
            return window.File && window.FileReader
        },
        l = function() {
            var e = document.createElement("div");
            return !i(9) && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop)
        },
        o = function() {
            return n() && window.FormData
        },
        s = function(e, i) {
            e.removeClass(i).addClass(i)
        },
        d = 'style="width:{width};height:{height};"',
        c = '      <param name="controller" value="true" />\n      <param name="allowFullScreen" value="true" />\n      <param name="allowScriptAccess" value="always" />\n      <param name="autoPlay" value="false" />\n      <param name="autoStart" value="false" />\n      <param name="quality" value="high" />\n',
        p = '<div class="file-preview-other">\n   <span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>',
        u = {
            removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
            removeClass: "btn btn-xs btn-default",
            removeTitle: "Remove file",
            uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
            uploadClass: "btn btn-xs btn-default",
            uploadTitle: "Upload file",
            indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
            indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
            indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
            indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
            indicatorNewTitle: "Not uploaded yet",
            indicatorSuccessTitle: "Uploaded",
            indicatorErrorTitle: "Upload Error",
            indicatorLoadingTitle: "Uploading ..."
        },
        f = '{preview}\n<div class="kv-upload-progress hide"></div>\n<div class="input-group {class}">\n   {caption}\n   <div class="input-group-btn">\n       {remove}\n       {cancel}\n       {upload}\n       {browse}\n   </div>\n</div>',
        v = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',
        g = '<div class="file-preview {class}">\n    <div class="close fileinput-remove">&times;</div>\n    <div class="{dropClass}">\n    <div class="file-preview-thumbnails">\n    </div>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>',
        m = '<span class="glyphicon glyphicon-file kv-caption-icon"></span>',
        h = '<div tabindex="500" class="form-control file-caption {class}">\n   <div class="file-caption-name"></div>\n</div>\n',
        w = '<button type="{type}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</button>',
        b = '<a href="{href}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</a>',
        C = '<div tabindex="500" class="{css}"{status}>{icon}{label}</div>',
        x = '<div id="{id}" class="file-preview-detail-modal modal fade" tabindex="-1">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h3 class="modal-title">{heading} <small>{title}</small></h3>\n      </div>\n      <div class="modal-body">\n           <pre>{body}</pre>\n      </div>\n    </div>\n  </div>\n</div>',
        T = '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {percent}%\n     </div>\n</div>',
        y = '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">{caption}</div>\n    {progress} {actions}\n</div>',
        F = '<div class="file-actions">\n    <div class="file-footer-buttons">\n        {upload}{delete}{other}    </div>\n    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n    <div class="clearfix"></div>\n</div>',
        E = '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
        k = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">   {uploadIcon}\n</button>\n',
        $ = '<button type="button" class="btn btn-default btn-xs btn-block" title="{zoomTitle}: {caption}" onclick="{dialog}">\n   {zoomInd}\n</button>\n',
        I = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n   {content}\n   {footer}\n</div>\n',
        S = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n    <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n       ' + p + "\n    </object>\n   {footer}\n</div>",
        D = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + d + ">\n   {footer}\n</div>\n",
        P = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n   <pre class="file-preview-text" title="{caption}" ' + d + ">{data}</pre>\n   {zoom}\n   {footer}\n</div>",
        U = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + d + '>\n   <video width="{width}" height="{height}" controls>\n       <source src="{data}" type="{type}">\n       ' + p + "\n   </video>\n   {footer}\n</div>\n",
        j = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + d + '>\n   <audio controls>\n       <source src="{data}" type="{type}">\n       ' + p + "\n   </audio>\n   {footer}\n</div>",
        A = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + d + '>\n   <object class="file-object" type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' + c + "       " + p + "\n   </object>\n   {footer}\n</div>\n",
        L = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + d + '>\n   <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n       <param name="movie" value="{caption}" />\n' + c + "         " + p + "\n   </object>\n   {footer}\n</div>",
        O = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + d + '>\n   <div class="file-preview-other-frame">\n   ' + p + '\n   </div>\n   <div class="file-preview-other-footer">{footer}</div>\n</div>',
        R = {
            main1: f,
            main2: v,
            preview: g,
            zoom: $,
            icon: m,
            caption: h,
            modal: x,
            progress: T,
            footer: y,
            actions: F,
            actionDelete: E,
            actionUpload: k,
            btnDefault: w,
            btnLink: b,
            btnBrowse: C
        },
        z = {
            generic: I,
            html: S,
            image: D,
            text: P,
            video: U,
            audio: j,
            flash: A,
            object: L,
            other: O
        },
        M = ["image", "html", "text", "video", "audio", "flash", "object"],
        B = {
            image: {
                width: "auto",
                height: "160px"
            },
            html: {
                width: "213px",
                height: "160px"
            },
            text: {
                width: "160px",
                height: "136px"
            },
            video: {
                width: "213px",
                height: "160px"
            },
            audio: {
                width: "213px",
                height: "80px"
            },
            flash: {
                width: "213px",
                height: "160px"
            },
            object: {
                width: "160px",
                height: "160px"
            },
            other: {
                width: "160px",
                height: "160px"
            }
        },
        N = {
            image: function(e, i) {
                return void 0 !== e ? e.match("image.*") : i.match(/\.(gif|png|jpe?g)$/i)
            },
            html: function(e, i) {
                return void 0 !== e ? "text/html" === e : i.match(/\.(htm|html)$/i)
            },
            text: function(e, i) {
                return void 0 !== e && e.match("text.*") || i.match(/\.(txt|md|csv|nfo|ini|json|php|js|css)$/i)
            },
            video: function(e, i) {
                return void 0 !== e && e.match(/\.video\/(ogg|mp4|webm|3gp)$/i) || i.match(/\.(og?|mp4|webm|3gp)$/i)
            },
            audio: function(e, i) {
                return void 0 !== e && e.match(/\.audio\/(ogg|mp3|wav)$/i) || i.match(/\.(ogg|mp3|wav)$/i)
            },
            flash: function(e, i) {
                return void 0 !== e && "application/x-shockwave-flash" === e || i.match(/\.(swf)$/i)
            },
            object: function() {
                return !0
            },
            other: function() {
                return !0
            }
        },
        Z = function(i, t) {
            return void 0 === i || null === i || 0 === i.length || t && "" === e.trim(i)
        },
        H = function(e) {
            return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e)
        },
        W = function(e, i) {
            return "object" == typeof i && e in i
        },
        _ = function(i, t, a) {
            return Z(i) || Z(i[t]) ? a : e(i[t])
        },
        q = function() {
            return Math.round((new Date).getTime() + 100 * Math.random())
        },
        V = function(e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
        },
        K = function(i, t) {
            var a = i;
            return t ? (e.each(t, function(e, i) {
                "function" == typeof i && (i = i()), a = a.split(e).join(i)
            }), a) : a
        },
        X = window.URL || window.webkitURL,
        J = function(t, a) {
            var r = this;
            r.$element = e(t), r.validate() && (r.isPreviewable = n(), r.isIE9 = i(9), r.isIE10 = i(10), r.isPreviewable || r.isIE9 ? (r.init(a), r.listen()) : r.$element.removeClass("file-loading"))
        };
    J.prototype = {
        constructor: J,
        validate: function() {
            var e, i = this;
            return "file" === i.$element.attr("type") ? !0 : (e = '<div class="help-block alert alert-warning"><h4>Invalid Input Type</h4>You must set an input <code>type = file</code> for <b>bootstrap-fileinput</b> plugin to initialize.</div>', i.$element.after(e), !1)
        },
        init: function(i) {
            var t, n = this,
                d = n.$element;
            e.each(i, function(e, i) {
                switch (e) {
                    case "minFileCount":
                    case "maxFileCount":
                    case "maxFileSize":
                        n[e] = r(i);
                        break;
                    default:
                        n[e] = i
                }
            }), n.fileInputCleared = !1, n.fileBatchCompleted = !0, n.isPreviewable || (n.showPreview = !1), n.uploadFileAttr = Z(d.attr("name")) ? "file_data" : d.attr("name"), n.reader = null, n.formdata = {}, n.filestack = [], n.uploadCount = 0, n.uploadStatus = {}, n.fileprogress = [], n.ajaxRequests = [], n.isError = !1, n.ajaxAborted = !1, n.cancelling = !1, t = n.getLayoutTemplate("progress"), n.progressTemplate = t.replace("{class}", n.progressClass), n.progressCompleteTemplate = t.replace("{class}", n.progressCompleteClass), n.dropZoneEnabled = l() && n.dropZoneEnabled, n.isDisabled = n.$element.attr("disabled") || n.$element.attr("readonly"), n.isUploadable = o() && !Z(n.uploadUrl), n.slug = "function" == typeof i.slugCallback ? i.slugCallback : n.slugDefault, n.mainTemplate = n.getLayoutTemplate(n.showCaption ? "main1" : "main2"), n.captionTemplate = n.getLayoutTemplate("caption"), n.previewGenericTemplate = n.getPreviewTemplate("generic"), Z(n.$element.attr("id")) && n.$element.attr("id", q()), void 0 === n.$container ? n.$container = n.createContainer() : n.refreshContainer(), n.$progress = n.$container.find(".kv-upload-progress"), n.$btnUpload = n.$container.find(".fileinput-upload"), n.$captionContainer = _(i, "elCaptionContainer", n.$container.find(".file-caption")), n.$caption = _(i, "elCaptionText", n.$container.find(".file-caption-name")), n.$previewContainer = _(i, "elPreviewContainer", n.$container.find(".file-preview")), n.$preview = _(i, "elPreviewImage", n.$container.find(".file-preview-thumbnails")), n.$previewStatus = _(i, "elPreviewStatus", n.$container.find(".file-preview-status")), n.$errorContainer = _(i, "elErrorContainer", n.$previewContainer.find(".kv-fileinput-error")), Z(n.msgErrorClass) || s(n.$errorContainer, n.msgErrorClass), n.$errorContainer.hide(), n.fileActionSettings = e.extend(u, i.fileActionSettings), n.previewInitId = "preview-" + q(), n.id = n.$element.attr("id"), a.init(n), n.initPreview(!0), n.initPreviewDeletes(), n.options = i, n.setFileDropZoneTitle(), n.$element.removeClass("file-loading"), n.$element.attr("disabled") && n.disable()
        },
        parseError: function(i, t, a) {
            var r = this,
                n = e.trim(t + ""),
                l = "." === n.slice(-1) ? "" : ".",
                o = void 0 !== i.responseJSON && void 0 !== i.responseJSON.error ? i.responseJSON.error : i.responseText;
            return r.cancelling && r.msgUploadAborted && (n = r.msgUploadAborted), r.showAjaxErrorDetails && o ? (o = e.trim(o.replace(/\n\s*\n/g, "\n")), o = o.length > 0 ? "<pre>" + o + "</pre>" : "", n += l + o) : n += l, r.cancelling = !1, a ? "<b>" + a + ": </b>" + n : n
        },
        raise: function(i, t) {
            var a = this,
                r = e.Event(i);
            if (void 0 !== t ? a.$element.trigger(r, t) : a.$element.trigger(r), r.isDefaultPrevented()) return !1;
            if (!r.result) return r.result;
            switch (i) {
                case "filebatchuploadcomplete":
                case "filebatchuploadsuccess":
                case "fileuploaded":
                case "fileclear":
                case "filecleared":
                case "filereset":
                case "fileerror":
                case "filefoldererror":
                case "fileuploaderror":
                case "filebatchuploaderror":
                case "filedeleteerror":
                case "filecustomerror":
                case "filesuccessremove":
                    break;
                default:
                    a.ajaxAborted = r.result
            }
            return !0
        },
        getLayoutTemplate: function(e) {
            var i = this,
                t = W(e, i.layoutTemplates) ? i.layoutTemplates[e] : R[e];
            return Z(i.customLayoutTags) ? t : K(t, i.customLayoutTags)
        },
        getPreviewTemplate: function(e) {
            var i = this,
                t = W(e, i.previewTemplates) ? i.previewTemplates[e] : z[e];
            return Z(i.customPreviewTags) ? t : K(t, i.customPreviewTags)
        },
        parseFilePreviewIcon: function(i, t) {
            var a, r = this,
                n = r.previewFileIcon;
            return t && t.indexOf(".") > -1 && (a = t.split(".").pop(), r.previewFileIconSettings && r.previewFileIconSettings[a] && (n = r.previewFileIconSettings[a]), r.previewFileExtSettings && e.each(r.previewFileExtSettings, function(e, i) {
                r.previewFileIconSettings[e] && i(a) && (n = r.previewFileIconSettings[e])
            })), i.indexOf("{previewFileIcon}") > -1 ? i.replace(/\{previewFileIconClass\}/g, r.previewFileIconClass).replace(/\{previewFileIcon\}/g, n) : i
        },
        getOutData: function(e, i, t) {
            var a = this;
            return e = e || {}, i = i || {}, t = t || a.filestack.slice(0) || {}, {
                form: a.formdata,
                files: t,
                extra: a.getExtraData(),
                response: i,
                reader: a.reader,
                jqXHR: e
            }
        },
        listen: function() {
            var i = this,
                a = i.$element,
                r = i.$captionContainer,
                n = i.$btnFile,
                l = a.closest("form"),
                o = i.$container;
            t(a, "change", e.proxy(i.change, i)), t(n, "click", function() {
                i.raise("filebrowse"), i.isError && !i.isUploadable && i.clear(), r.focus()
            }), t(l, "reset", e.proxy(i.reset, i)), t(o.find(".fileinput-remove:not([disabled])"), "click", e.proxy(i.clear, i)), t(o.find(".fileinput-cancel"), "click", e.proxy(i.cancel, i)), i.isUploadable && i.dropZoneEnabled && i.showPreview && i.initDragDrop(), i.isUploadable || t(l, "submit", e.proxy(i.submitForm, i)), t(i.$container.find(".fileinput-upload"), "click", function(t) {
                var a, r = e(this),
                    n = !r.hasClass("disabled") && Z(r.attr("disabled"));
                return i.isUploadable ? (t.preventDefault(), void(n && i.upload())) : void(n && "submit" !== r.attr("type") && (a = r.closest("form"), a.length && a.trigger("submit"), t.preventDefault()))
            })
        },
        submitForm: function() {
            var e = this,
                i = e.$element,
                t = i.get(0).files;
            return t && e.minFileCount > 0 && e.getFileCount(t.length) < e.minFileCount ? (e.noFilesError({}), !1) : !e.abort({})
        },
        abort: function(i) {
            var t, a = this;
            return a.ajaxAborted && "object" == typeof a.ajaxAborted && void 0 !== a.ajaxAborted.message ? (t = e.extend(a.getOutData(), i), t.abortData = a.ajaxAborted.data || {}, t.abortMessage = a.ajaxAborted.message, a.cancel(), a.setProgress(100), a.showUploadError(a.ajaxAborted.message, t, "filecustomerror"), !0) : !1
        },
        noFilesError: function(e) {
            var i = this,
                t = i.minFileCount > 1 ? i.filePlural : i.fileSingle,
                a = i.msgFilesTooLess.replace("{n}", i.minFileCount).replace("{files}", t),
                r = i.$errorContainer;
            i.addError(a), i.isError = !0, i.updateFileDetails(0), r.fadeIn(800), i.raise("fileerror", [e]), i.clearFileInput(), s(i.$container, "has-error")
        },
        setProgress: function(e, i) {
            var t = this,
                a = Math.min(e, 100),
                r = 100 > a ? t.progressTemplate : t.progressCompleteTemplate;
            i = i || t.$progress, Z(r) || i.html(r.replace(/\{percent\}/g, a))
        },
        upload: function() {
            var i, t, a, r = this,
                n = r.getFileStack().length,
                l = {},
                o = !e.isEmptyObject(r.getExtraData());
            if (r.minFileCount > 0 && r.getFileCount(n) < r.minFileCount) return void r.noFilesError(l);
            if (r.isUploadable && !r.isDisabled && (0 !== n || o)) {
                if (r.resetUpload(), r.$progress.removeClass("hide"), r.uploadCount = 0, r.uploadStatus = {}, r.lock(), r.setProgress(2), 0 === n && o) return void r.uploadExtraOnly();
                if (a = r.filestack.length, r.hasInitData = !1, r.uploadAsync && r.showPreview)
                    for (t = r.getOutData(), r.raise("filebatchpreupload", [t]), r.fileBatchCompleted = !1, r.uploadCache = {
                            content: [],
                            config: [],
                            tags: [],
                            append: !0
                        }, i = 0; a > i; i += 1) void 0 !== r.filestack[i] && r.uploadSingle(i, r.filestack, !0);
                else r.uploadBatch()
            }
        },
        lock: function() {
            var e = this;
            e.resetErrors(), e.disable(), e.showRemove && s(e.$container.find(".fileinput-remove"), "hide"), e.showCancel && e.$container.find(".fileinput-cancel").removeClass("hide"), e.raise("filelock", [e.filestack, e.getExtraData()])
        },
        unlock: function(e) {
            var i = this;
            void 0 === e && (e = !0), i.enable(), i.showCancel && s(i.$container.find(".fileinput-cancel"), "hide"), i.showRemove && i.$container.find(".fileinput-remove").removeClass("hide"), e && i.resetFileStack(), i.raise("fileunlock", [i.filestack, i.getExtraData()])
        },
        resetFileStack: function() {
            var i = this,
                t = 0,
                a = [];
            i.getThumbs().each(function() {
                var r = e(this),
                    n = r.attr("data-fileindex"),
                    l = i.filestack[n]; - 1 !== n && (void 0 !== l ? (a[t] = l, r.attr({
                    id: i.previewInitId + "-" + t,
                    "data-fileindex": t
                }), t += 1) : r.attr({
                    id: "uploaded-" + q(),
                    "data-fileindex": "-1"
                }))
            }), i.filestack = a
        },
        destroy: function() {
            var e = this,
                i = e.$container;
            i.find(".file-drop-zone").off(), e.$element.insertBefore(i).off(".fileinput").removeData(), i.off().remove()
        },
        refresh: function(i) {
            var t = this,
                a = t.$element;
            i = i ? e.extend(t.options, i) : t.options, t.destroy(), a.fileinput(i), a.val() && a.trigger("change.fileinput")
        },
        initDragDrop: function() {
            var i = this,
                a = i.$container.find(".file-drop-zone"),
                r = "dragenter.fileinput dragover.fileinput drop.fileinput";
            t(a, "dragenter.fileinput dragover.fileinput", function(t) {
                var a = e.inArray("Files", t.originalEvent.dataTransfer.types) > -1;
                return t.stopPropagation(), t.preventDefault(), i.isDisabled || !a ? (t.originalEvent.dataTransfer.effectAllowed = "none", void(t.originalEvent.dataTransfer.dropEffect = "none")) : void s(e(this), "highlighted")
            }, !0), t(a, "dragleave", function(t) {
                t.stopPropagation(), t.preventDefault(), i.isDisabled || e(this).removeClass("highlighted")
            }), t(a, "drop", function(t) {
                t.preventDefault(), i.isDisabled || Z(t.originalEvent.dataTransfer.files) || (i.change(t, "dragdrop"), e(this).removeClass("highlighted"))
            }), t(e(document), r, function(e) {
                e.stopPropagation(), e.preventDefault()
            }, !0)
        },
        setFileDropZoneTitle: function() {
            var e = this,
                i = e.$container.find(".file-drop-zone");
            i.find("." + e.dropZoneTitleClass).remove(), e.isUploadable && e.showPreview && 0 !== i.length && !(e.getFileStack().length > 0) && e.dropZoneEnabled && (0 === i.find(".file-preview-frame").length && i.prepend('<div class="' + e.dropZoneTitleClass + '">' + e.dropZoneTitle + "</div>"), e.$container.removeClass("file-input-new"), s(e.$container, "file-input-ajax-new"))
        },
        initFileActions: function() {
            var i = this;
            i.$preview.find(".kv-file-remove").each(function() {
                var r, n, l, o, s = e(this),
                    d = s.closest(".file-preview-frame"),
                    c = d.attr("id"),
                    p = d.attr("data-fileindex");
                t(s, "click", function(t) {
                    return o = i.raise("filepreremove", [c, p]), o !== !1 && i.validateMinCount() ? (r = d.hasClass("file-preview-error"), i.cleanMemory(d), void d.fadeOut("slow", function() {
                        i.filestack[p] = void 0, i.clearObjects(d), d.remove(), c && r && i.$errorContainer.find('li[data-file-id="' + c + '"]').fadeOut("fast", function() {
                            e(this).remove(), i.$errorContainer.find("li").length || i.$preview.find(".file-preview-frame.file-preview-error").length || i.resetErrors()
                        });
                        var t = i.getFileStack(!0),
                            o = t.length,
                            s = a.count(i.id),
                            u = i.showPreview && i.$preview.find(".file-preview-frame").length;
                        i.clearFileInput(), 0 !== o || 0 !== s || u ? (n = s + o, l = n > 1 ? i.getMsgSelected(n) : t[0] ? t[0].name : "", i.setCaption(l)) : i.reset(), i.raise("fileremoved", [c, p])
                    })) : !1
                })
            }), i.$preview.find(".kv-file-upload").each(function() {
                var a = e(this);
                t(a, "click", function() {
                    var e = a.closest(".file-preview-frame"),
                        t = e.attr("data-fileindex");
                    e.hasClass("file-preview-error") || i.uploadSingle(t, i.filestack, !1)
                })
            })
        },
        getMsgSelected: function(e) {
            var i = this,
                t = 1 === e ? i.fileSingle : i.filePlural;
            return i.msgSelected.replace("{n}", e).replace("{files}", t)
        },
        renderThumbProgress: function() {
            return '<div class="file-thumb-progress hide">' + this.progressTemplate.replace(/\{percent\}/g, "0") + "</div>"
        },
        renderFileFooter: function(e, i) {
            {
                var t, a, r = this,
                    n = r.fileActionSettings,
                    l = r.getLayoutTemplate("footer");
                r.progressTemplate
            }
            return r.isUploadable ? (t = l.replace(/\{actions\}/g, r.renderFileActions(!0, !0, !1, !1, !1)), a = t.replace(/\{caption\}/g, e).replace(/\{width\}/g, i).replace(/\{progress\}/g, r.renderThumbProgress()).replace(/\{indicator\}/g, n.indicatorNew).replace(/\{indicatorTitle\}/g, n.indicatorNewTitle)) : a = l.replace(/\{actions\}/g, "").replace(/\{caption\}/g, e).replace(/\{progress\}/g, "").replace(/\{width\}/g, i).replace(/\{indicator\}/g, "").replace(/\{indicatorTitle\}/g, ""), a = K(a, r.previewThumbTags)
        },
        renderFileActions: function(e, i, t, a, r) {
            if (!e && !i) return "";
            var n = this,
                l = a === !1 ? "" : ' data-url="' + a + '"',
                o = r === !1 ? "" : ' data-key="' + r + '"',
                s = n.getLayoutTemplate("actionDelete"),
                d = "",
                c = n.getLayoutTemplate("actions"),
                p = n.otherActionButtons.replace(/\{dataKey\}/g, o),
                u = n.fileActionSettings,
                f = t ? u.removeClass + " disabled" : u.removeClass;
            return s = s.replace(/\{removeClass\}/g, f).replace(/\{removeIcon\}/g, u.removeIcon).replace(/\{removeTitle\}/g, u.removeTitle).replace(/\{dataUrl\}/g, l).replace(/\{dataKey\}/g, o), e && (d = n.getLayoutTemplate("actionUpload").replace(/\{uploadClass\}/g, u.uploadClass).replace(/\{uploadIcon\}/g, u.uploadIcon).replace(/\{uploadTitle\}/g, u.uploadTitle)), c.replace(/\{delete\}/g, s).replace(/\{upload\}/g, d).replace(/\{other\}/g, p)
        },
        setThumbStatus: function(e, i) {
            var t = this,
                a = "indicator" + i,
                r = a + "Title",
                n = "file-preview-" + i.toLowerCase(),
                l = e.find(".file-upload-indicator"),
                o = t.fileActionSettings;
            e.removeClass("file-preview-success file-preview-error file-preview-loading"), "Error" === i && (e.find(".kv-file-upload").attr("disabled", !0), s(e, "btn disabled")), l.html(o[a]), l.attr("title", o[r]), e.addClass(n)
        },
        clearPreview: function() {
            var e = this,
                i = e.$preview.find(e.showUploadedThumbs ? ".file-preview-frame:not(.file-preview-success)" : ".file-preview-frame");
            i.remove(), e.$preview.find(".file-preview-frame").length && e.showPreview || e.resetUpload()
        },
        initPreview: function(e) {
            var i, t = this,
                r = t.initialCaption || "";
            return a.count(t.id) ? (i = a.out(t.id), r = e && t.initialCaption ? t.initialCaption : i.caption, t.$preview.html(i.content), t.setCaption(r), void(Z(i.content) || t.$container.removeClass("file-input-new"))) : (t.clearPreview(), void(e ? t.setCaption(r) : t.initCaption()))
        },
        initPreviewDeletes: function() {
            var i = this,
                r = i.deleteExtraData || {},
                n = function() {
                    var e = i.isUploadable ? a.count(i.id) : i.$element.get(0).files.length;
                    0 !== i.$preview.find(".kv-file-remove").length || e || (i.reset(), i.initialCaption = "")
                };
            i.$preview.find(".kv-file-remove").each(function() {
                var l = e(this),
                    o = l.data("url") || i.deleteUrl,
                    d = l.data("key");
                if (!Z(o) && void 0 !== d) {
                    var c, p, u, f, v = l.closest(".file-preview-frame"),
                        g = a.data[i.id],
                        m = v.data("fileindex");
                    m = parseInt(m.replace("init_", "")), u = Z(g.config) && Z(g.config[m]) ? null : g.config[m], f = Z(u) || Z(u.extra) ? r : u.extra, "function" == typeof f && (f = f()), p = {
                        id: l.attr("id"),
                        key: d,
                        extra: f
                    }, c = e.extend({
                        url: o,
                        type: "POST",
                        dataType: "json",
                        data: e.extend({
                            key: d
                        }, f),
                        beforeSend: function(e) {
                            i.ajaxAborted = !1, i.raise("filepredelete", [d, e, f]), i.ajaxAborted ? e.abort() : (s(v, "file-uploading"), s(l, "disabled"))
                        },
                        success: function(e, t, r) {
                            var o, s;
                            return Z(e) || Z(e.error) ? (a.unset(i.id, m), o = a.count(i.id), s = o > 0 ? i.getMsgSelected(o) : "", i.raise("filedeleted", [d, r, f]), i.setCaption(s), v.removeClass("file-uploading").addClass("file-deleted"), void v.fadeOut("slow", function() {
                                i.clearObjects(v), v.remove(), n(), o || 0 !== i.getFileStack().length || (i.setCaption(""), i.reset())
                            })) : (p.jqXHR = r, p.response = e, i.showError(e.error, p, "filedeleteerror"), v.removeClass("file-uploading"), l.removeClass("disabled"), void n())
                        },
                        error: function(e, t, a) {
                            var r = i.parseError(e, a);
                            p.jqXHR = e, p.response = {}, i.showError(r, p, "filedeleteerror"), v.removeClass("file-uploading"), n()
                        }
                    }, i.ajaxDeleteSettings), t(l, "click", function() {
                        return i.validateMinCount() ? void e.ajax(c) : !1
                    })
                }
            })
        },
        clearObjects: function(i) {
            i.find("video audio").each(function() {
                this.pause(), e(this).remove()
            }), i.find("img object div").each(function() {
                e(this).remove()
            })
        },
        clearFileInput: function() {
            var i, t, a, r = this,
                n = r.$element;
            Z(n.val()) || (r.isIE9 || r.isIE10 ? (i = n.closest("form"), t = e(document.createElement("form")), a = e(document.createElement("div")), n.before(a), i.length ? i.after(t) : a.after(t), t.append(n).trigger("reset"), a.before(n).remove(), t.remove()) : n.val(""), r.fileInputCleared = !0)
        },
        resetUpload: function() {
            var e = this;
            e.uploadCache = {
                content: [],
                config: [],
                tags: [],
                append: !0
            }, e.uploadCount = 0, e.uploadStatus = {}, e.$btnUpload.removeAttr("disabled"), e.setProgress(0), s(e.$progress, "hide"), e.resetErrors(!1), e.ajaxAborted = !1, e.ajaxRequests = []
        },
        cancel: function() {
            var i, t = this,
                a = t.ajaxRequests,
                r = a.length;
            if (r > 0)
                for (i = 0; r > i; i += 1) t.cancelling = !0, a[i].abort();
            t.getThumbs().each(function() {
                var i = e(this),
                    a = i.attr("data-fileindex");
                i.removeClass("file-uploading"), void 0 !== t.filestack[a] && (i.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), i.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), t.unlock()
            })
        },
        cleanMemory: function(e) {
            var i = e.is("img") ? e.attr("src") : e.find("source").attr("src");
            X.revokeObjectURL(i)
        },
        hasInitialPreview: function() {
            var e = this;
            return !e.overwriteInitial && a.count(e.id)
        },
        clear: function() {
            var i, t = this;
            t.$btnUpload.removeAttr("disabled"), t.getThumbs().find("video,audio,img").each(function() {
                t.cleanMemory(e(this))
            }), t.resetUpload(), t.filestack = [], t.clearFileInput(), t.resetErrors(!0), t.raise("fileclear"), t.hasInitialPreview() ? (t.showFileIcon(), t.resetPreview(), t.initPreviewDeletes(), t.$container.removeClass("file-input-new")) : (t.getThumbs().each(function() {
                t.clearObjects(e(this))
            }), t.isUploadable && (a.data[t.id] = {}), t.$preview.html(""), i = !t.overwriteInitial && t.initialCaption.length > 0 ? t.initialCaption : "", t.setCaption(i), t.$caption.attr("title", ""), s(t.$container, "file-input-new")), 0 === t.$container.find(".file-preview-frame").length && (t.initCaption() || t.$captionContainer.find(".kv-caption-icon").hide()), t.hideFileIcon(), t.raise("filecleared"), t.$captionContainer.focus(), t.setFileDropZoneTitle()
        },
        resetPreview: function() {
            var e, i, t = this;
            a.count(t.id) ? (e = a.out(t.id), t.$preview.html(e.content), i = t.initialCaption ? t.initialCaption : e.caption, t.setCaption(i)) : (t.clearPreview(), t.initCaption())
        },
        resetPreviewThumbs: function(e) {
            var i, t = this;
            return e ? (t.clearPreview(), void(t.filestack = [])) : void(t.hasInitialPreview() ? (i = a.out(t.id), t.$preview.html(i.content), t.setCaption(i.caption), t.initPreviewDeletes()) : t.clearPreview())
        },
        reset: function() {
            var e = this;
            e.resetPreview(), e.$container.find(".fileinput-filename").text(""), e.raise("filereset"), s(e.$container, "file-input-new"), (e.$preview.find(".file-preview-frame").length || e.isUploadable && e.dropZoneEnabled) && e.$container.removeClass("file-input-new"), e.setFileDropZoneTitle(), e.filestack = [], e.formdata = {}
        },
        disable: function() {
            var e = this;
            e.isDisabled = !0, e.raise("filedisabled"), e.$element.attr("disabled", "disabled"), e.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), e.initDragDrop()
        },
        enable: function() {
            var e = this;
            e.isDisabled = !1, e.raise("fileenabled"), e.$element.removeAttr("disabled"), e.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), e.initDragDrop()
        },
        getThumbs: function(e) {
            return e = e || "", this.$preview.find(".file-preview-frame:not(.file-preview-initial)" + e)
        },
        getExtraData: function(e, i) {
            var t = this,
                a = t.uploadExtraData;
            return "function" == typeof t.uploadExtraData && (a = t.uploadExtraData(e, i)), a
        },
        uploadExtra: function(i, t) {
            var a = this,
                r = a.getExtraData(i, t);
            0 !== r.length && e.each(r, function(e, i) {
                a.formdata.append(e, i)
            })
        },
        setAsyncUploadStatus: function(i, t, a) {
            var r = this,
                n = 0;
            r.setProgress(t, e("#" + i).find(".file-thumb-progress")), r.uploadStatus[i] = t, e.each(r.uploadStatus, function(e, i) {
                n += i
            }), r.setProgress(Math.ceil(n / a))
        },
        initXhr: function(e, i, t) {
            var a = this;
            return e.upload && e.upload.addEventListener("progress", function(e) {
                var r = 0,
                    n = e.loaded || e.position,
                    l = e.total;
                e.lengthComputable && (r = Math.ceil(n / l * 100)), i ? a.setAsyncUploadStatus(i, r, t) : a.setProgress(Math.ceil(r))
            }, !1), e
        },
        ajaxSubmit: function(i, t, a, r, n, l) {
            var o, s = this;
            s.raise("filepreajax", [n, l]), s.uploadExtra(n, l), o = e.extend({
                xhr: function() {
                    var i = e.ajaxSettings.xhr();
                    return s.initXhr(i, n, s.getFileStack().length)
                },
                url: s.uploadUrl,
                type: "POST",
                dataType: "json",
                data: s.formdata,
                cache: !1,
                processData: !1,
                contentType: !1,
                beforeSend: i,
                success: t,
                complete: a,
                error: r
            }, s.ajaxSettings), s.ajaxRequests.push(e.ajax(o))
        },
        initUploadSuccess: function(i, t, r) {
            var n, l, o, s, d, c, p, u = this;
            "object" != typeof i || e.isEmptyObject(i) || void 0 !== i.initialPreview && i.initialPreview.length > 0 && (u.hasInitData = !0, d = i.initialPreview || [], c = i.initialPreviewConfig || [], p = i.initialPreviewThumbTags || [], n = void 0 === i.append || i.append ? !0 : !1, u.overwriteInitial = !1, void 0 === t || r ? r ? (u.uploadCache.content.push(d[0]), u.uploadCache.config.push(c[0]), u.uploadCache.tags.push(p[0]), u.uploadCache.append = n) : (a.set(u.id, d, c, p, n), u.initPreview(), u.initPreviewDeletes()) : (o = a.add(u.id, d, c[0], p[0], n), l = a.get(u.id, o, !1), s = e(l).hide(), t.after(s).fadeOut("slow", function() {
                s.fadeIn("slow").css("display:inline-block"), u.initPreviewDeletes(), u.clearFileInput(), t.remove()
            })))
        },
        initSuccessThumbs: function() {
            var i = this;
            i.getThumbs(".file-preview-success").each(function() {
                var a = e(this),
                    r = a.find(".kv-file-remove");
                r.removeAttr("disabled"), t(r, "click", function() {
                    var e = i.raise("filesuccessremove", [a.attr("id"), a.data("fileindex")]);
                    i.cleanMemory(a), e !== !1 && a.fadeOut("slow", function() {
                        a.remove(), i.$preview.find(".file-preview-frame").length || i.reset()
                    })
                })
            })
        },
        uploadSingle: function(i, t, r) {
            var n, l, o, d, c, p, u, f = this,
                v = f.getFileStack().length,
                g = new FormData,
                m = f.previewInitId + "-" + i,
                h = e("#" + m + ":not(.file-preview-initial)"),
                w = h.find(".kv-file-upload"),
                b = h.find(".kv-file-remove"),
                C = f.filestack.length > 0 || !e.isEmptyObject(f.uploadExtraData),
                x = {
                    id: m,
                    index: i
                };
            f.formdata = g, e("#" + m).find(".file-thumb-progress").removeClass("hide"), 0 === v || !C || w.hasClass("disabled") || f.abort(x) || (l = function() {
                var e = f.getThumbs(".file-uploading");
                e.length > 0 || f.fileBatchCompleted || (f.fileBatchCompleted = !0, setTimeout(function() {
                    a.set(f.id, f.uploadCache.content, f.uploadCache.config, f.uploadCache.tags, f.uploadCache.append), f.hasInitData && (f.initPreview(), f.initPreviewDeletes()), f.unlock(), f.clearFileInput(), f.raise("filebatchuploadcomplete", [f.filestack, f.getExtraData()]), f.uploadCount = 0, f.uploadStatus = {}, f.setProgress(100)
                }, 100))
            }, o = function() {
                w.removeAttr("disabled"), b.removeAttr("disabled"), h.removeClass("file-uploading")
            }, d = function(t) {
                n = f.getOutData(t), h.hasClass("file-preview-success") || (f.setThumbStatus(h, "Loading"), s(h, "file-uploading")), w.attr("disabled", !0), b.attr("disabled", !0), r || f.lock(), f.raise("filepreupload", [n, m, i]), x = e.extend(x, n), f.abort(x) && (t.abort(), f.setProgress(100))
            }, c = function(t, a, l) {
                n = f.getOutData(l, t), x = e.extend(x, n), setTimeout(function() {
                    Z(t) || Z(t.error) ? (f.setThumbStatus(h, "Success"), w.hide(), f.filestack[i] = void 0, f.raise("fileuploaded", [n, m, i]), f.initUploadSuccess(t, h, r), r || f.resetFileStack()) : (f.setThumbStatus(h, "Error"), f.showUploadError(t.error, x))
                }, 100)
            }, p = function() {
                setTimeout(function() {
                    o(), r ? l() : f.unlock(!1), f.initSuccessThumbs()
                }, 100)
            }, u = function(a, n, l) {
                var o = f.parseError(a, l, r ? t[i].name : null);
                f.uploadStatus[m] = 100, f.setThumbStatus(h, "Error"), x = e.extend(x, f.getOutData(a)), f.showUploadError(o, x)
            }, g.append(f.uploadFileAttr, t[i]), g.append("file_id", i), f.ajaxSubmit(d, c, p, u, m, i))
        },
        uploadBatch: function() {
            var i, t, a, r, n, l = this,
                o = l.filestack,
                d = o.length,
                c = {},
                p = l.filestack.length > 0 || !e.isEmptyObject(l.uploadExtraData);
            l.formdata = new FormData, 0 !== d && p && !l.abort(c) && (i = function() {
                e.each(o, function(e) {
                    l.filestack[e] = void 0
                }), l.clearFileInput()
            }, t = function(i) {
                l.lock();
                var t = l.getOutData(i);
                l.showPreview && l.getThumbs().each(function() {
                    var i = e(this),
                        t = i.find(".kv-file-upload"),
                        a = i.find(".kv-file-remove");
                    i.hasClass("file-preview-success") || (l.setThumbStatus(i, "Loading"), s(i, "file-uploading")), t.attr("disabled", !0), a.attr("disabled", !0)
                }), l.raise("filebatchpreupload", [t]), l.abort(t) && (i.abort(), l.setProgress(100))
            }, a = function(t, a, r) {
                var n = l.getOutData(r, t),
                    o = l.getThumbs(),
                    s = 0,
                    d = Z(t) || Z(t.errorkeys) ? [] : t.errorkeys;
                Z(t) || Z(t.error) ? (l.raise("filebatchuploadsuccess", [n]), i(), l.showPreview ? (o.each(function() {
                    var i = e(this),
                        t = i.find(".kv-file-upload");
                    i.find(".kv-file-upload").hide(), l.setThumbStatus(i, "Success"), i.removeClass("file-uploading"), t.removeAttr("disabled")
                }), l.initUploadSuccess(t)) : l.reset()) : (l.showPreview && (o.each(function() {
                    var i = e(this),
                        t = i.find(".kv-file-remove"),
                        a = i.find(".kv-file-upload");
                    return i.removeClass("file-uploading"), a.removeAttr("disabled"), t.removeAttr("disabled"), 0 === d.length ? void l.setThumbStatus(i, "Error") : (-1 !== e.inArray(s, d) ? l.setThumbStatus(i, "Error") : (i.find(".kv-file-upload").hide(), l.setThumbStatus(i, "Success"), l.filestack[s] = void 0), void s++)
                }), l.initUploadSuccess(t)), l.showUploadError(t.error, n, "filebatchuploaderror"))
            }, r = function() {
                l.setProgress(100), l.unlock(), l.initSuccessThumbs(), l.clearFileInput(), l.raise("filebatchuploadcomplete", [l.filestack, l.getExtraData()])
            }, n = function(i, t, a) {
                var r = l.getOutData(i),
                    n = l.parseError(i, a);
                l.showUploadError(n, r, "filebatchuploaderror"), l.uploadFileCount = d - 1, l.showPreview && (l.getThumbs().each(function() {
                    var i = e(this),
                        t = i.attr("data-fileindex");
                    i.removeClass("file-uploading"), void 0 !== l.filestack[t] && l.setThumbStatus(i, "Error")
                }), l.getThumbs().removeClass("file-uploading"), l.getThumbs(" .kv-file-upload").removeAttr("disabled"), l.getThumbs(" .kv-file-delete").removeAttr("disabled"))
            }, e.each(o, function(e, i) {
                Z(o[e]) || l.formdata.append(l.uploadFileAttr, i)
            }), l.ajaxSubmit(t, a, r, n))
        },
        uploadExtraOnly: function() {
            var e, i, t, a, r = this,
                n = {};
            r.formdata = new FormData, r.abort(n) || (e = function(e) {
                r.lock();
                var i = r.getOutData(e);
                r.raise("filebatchpreupload", [i]), r.setProgress(50), n.data = i, n.xhr = e, r.abort(n) && (e.abort(), r.setProgress(100))
            }, i = function(e, i, t) {
                var a = r.getOutData(t, e);
                Z(e) || Z(e.error) ? (r.raise("filebatchuploadsuccess", [a]), r.clearFileInput(), r.initUploadSuccess(e)) : r.showUploadError(e.error, a, "filebatchuploaderror")
            }, t = function() {
                r.setProgress(100), r.unlock(), r.clearFileInput(), r.raise("filebatchuploadcomplete", [r.filestack, r.getExtraData()])
            }, a = function(e, i, t) {
                var a = r.getOutData(e),
                    l = r.parseError(e, t);
                n.data = a, r.showUploadError(l, a, "filebatchuploaderror")
            }, r.ajaxSubmit(e, i, t, a))
        },
        hideFileIcon: function() {
            this.overwriteInitial && this.$captionContainer.find(".kv-caption-icon").hide()
        },
        showFileIcon: function() {
            this.$captionContainer.find(".kv-caption-icon").show()
        },
        addError: function(e) {
            var i = this,
                t = i.$errorContainer;
            e && t.length && (t.html(i.errorCloseButton + e), t.find(".kv-error-close").off("click").on("click", function() {
                t.fadeOut("slow")
            }))
        },
        resetErrors: function(e) {
            var i = this,
                t = i.$errorContainer;
            i.isError = !1, i.$container.removeClass("has-error"), t.html(""), e ? t.fadeOut("slow") : t.hide()
        },
        showFolderError: function(e) {
            var i = this,
                t = i.$errorContainer;
            e && (i.addError(i.msgFoldersNotAllowed.replace(/\{n\}/g, e)), t.fadeIn(800), s(i.$container, "has-error"), i.raise("filefoldererror", [e]))
        },
        showUploadError: function(e, i, t) {
            var a = this,
                r = a.$errorContainer,
                n = t || "fileuploaderror",
                l = i && i.id ? '<li data-file-id="' + i.id + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === r.find("ul").length ? a.addError("<ul>" + l + "</ul>") : r.find("ul").append(l), r.fadeIn(800), a.raise(n, [i]), a.$container.removeClass("file-input-new"), s(a.$container, "has-error"), !0
        },
        showError: function(e, i, t) {
            var a = this,
                r = a.$errorContainer,
                n = t || "fileerror";
            return i = i || {}, i.reader = a.reader, a.addError(e), r.fadeIn(800), a.raise(n, [i]), a.isUploadable || a.clearFileInput(), a.$container.removeClass("file-input-new"), s(a.$container, "has-error"), a.$btnUpload.attr("disabled", !0), !0
        },
        errorHandler: function(e, i) {
            var t = this,
                a = e.target.error;
            switch (a.code) {
                case a.NOT_FOUND_ERR:
                    t.showError(t.msgFileNotFound.replace("{name}", i));
                    break;
                case a.SECURITY_ERR:
                    t.showError(t.msgFileSecured.replace("{name}", i));
                    break;
                case a.NOT_READABLE_ERR:
                    t.showError(t.msgFileNotReadable.replace("{name}", i));
                    break;
                case a.ABORT_ERR:
                    t.showError(t.msgFilePreviewAborted.replace("{name}", i));
                    break;
                default:
                    t.showError(t.msgFilePreviewError.replace("{name}", i))
            }
        },
        parseFileType: function(e) {
            var i, t, a, r, n = this;
            for (r = 0; r < M.length; r += 1)
                if (a = M[r], i = W(a, n.fileTypeSettings) ? n.fileTypeSettings[a] : N[a], t = i(e.type, e.name) ? a : "", !Z(t)) return t;
            return "other"
        },
        previewDefault: function(i, t, a) {
            if (this.showPreview) {
                var r = this,
                    n = X.createObjectURL(i),
                    l = "",
                    o = i ? i.name : "",
                    s = r.previewSettings.other || B.other,
                    d = r.renderFileFooter(i.name, s.width),
                    c = t.slice(t.lastIndexOf("-") + 1),
                    p = r.parseFilePreviewIcon(r.getPreviewTemplate("other"), o);
                a === !0 && (l = " btn disabled", r.isUploadable || (d += '<div class="file-other-error" title="' + r.fileActionSettings.indicatorErrorTitle + '">' + r.fileActionSettings.indicatorError + "</div>")), r.$preview.append("\n" + p.replace(/\{previewId\}/g, t).replace(/\{frameClass\}/g, l).replace(/\{fileindex\}/g, c).replace(/\{caption\}/g, r.slug(i.name)).replace(/\{width\}/g, s.width).replace(/\{height\}/g, s.height).replace(/\{type\}/g, i.type).replace(/\{data\}/g, n).replace(/\{footer\}/g, d)), a === !0 && r.isUploadable && r.setThumbStatus(e("#" + t), "Error")
            }
        },
        previewFile: function(e, i, t, a, r) {
            if (this.showPreview) {
                var n, l, o, s = this,
                    d = s.parseFileType(i),
                    c = i ? i.name : "",
                    p = s.slug(c),
                    u = s.allowedPreviewTypes,
                    f = s.allowedPreviewMimeTypes,
                    v = s.getPreviewTemplate(d),
                    g = u && u.indexOf(d) >= 0,
                    m = W(d, s.previewSettings) ? s.previewSettings[d] : B[d],
                    h = f && -1 !== f.indexOf(i.type),
                    w = s.renderFileFooter(p, m.width),
                    b = "",
                    C = a.slice(a.lastIndexOf("-") + 1);
                g || h ? (v = s.parseFilePreviewIcon(v, c.split(".").pop()), "text" === d ? (l = V(t.target.result), o = "text-" + q(), n = v.replace(/\{zoom\}/g, s.getLayoutTemplate("zoom")), b = s.getLayoutTemplate("modal").replace("{id}", o).replace(/\{title\}/g, p).replace(/\{body\}/g, l).replace(/\{heading\}/g, s.msgZoomModalHeading), n = n.replace(/\{previewId\}/g, a).replace(/\{caption\}/g, p).replace(/\{width\}/g, m.width).replace(/\{height\}/g, m.height).replace(/\{frameClass\}/g, "").replace(/\{zoomInd\}/g, s.zoomIndicator).replace(/\{footer\}/g, w).replace(/\{fileindex\}/g, C).replace(/\{type\}/g, i.type).replace(/\{zoomTitle\}/g, s.msgZoomTitle).replace(/\{dialog\}/g, "$('#" + o + "').modal('show')").replace(/\{data\}/g, l) + b) : n = v.replace(/\{previewId\}/g, a).replace(/\{caption\}/g, p).replace(/\{frameClass\}/g, "").replace(/\{type\}/g, i.type).replace(/\{fileindex\}/g, C).replace(/\{width\}/g, m.width).replace(/\{height\}/g, m.height).replace(/\{footer\}/g, w).replace(/\{data\}/g, r), s.$preview.append("\n" + n), s.validateImage(e, a, p)) : s.previewDefault(i, a)
            }
        },
        slugDefault: function(e) {
            return Z(e) ? "" : e.split(/(\\|\/)/g).pop().replace(/[^\w\u00C0-\u017F\-.\\\/ ]+/g, "")
        },
        getFileStack: function(e) {
            var i = this;
            return i.filestack.filter(function(i) {
                return e ? void 0 !== i : void 0 !== i && null !== i
            })
        },
        readFiles: function(i) {
            this.reader = new FileReader;
            var t, a = this,
                r = a.$element,
                n = a.$preview,
                l = a.reader,
                o = a.$previewContainer,
                s = a.$previewStatus,
                d = a.msgLoading,
                c = a.msgProgress,
                p = a.previewInitId,
                u = i.length,
                f = a.fileTypeSettings,
                v = a.filestack.length,
                g = function(r, n, l, o) {
                    var s = e.extend(a.getOutData({}, {}, i), {
                            id: l,
                            index: o
                        }),
                        d = {
                            id: l,
                            index: o,
                            file: n,
                            files: i
                        };
                    return a.previewDefault(n, l, !0), a.isUploadable && a.filestack.push(void 0), setTimeout(t(o + 1), 100), a.initFileActions(), a.isUploadable ? a.showUploadError(r, s) : a.showError(r, d)
                };
            t = function(e) {
                if (Z(r.attr("multiple")) && (u = 1), e >= u) return a.isUploadable && a.filestack.length > 0 ? a.raise("filebatchselected", [a.getFileStack()]) : a.raise("filebatchselected", [i]), o.removeClass("loading"), void s.html("");
                var m, h, w, b, C, x, T = v + e,
                    y = p + "-" + T,
                    F = i[e],
                    E = a.slug(F.name),
                    k = (F.size || 0) / 1e3,
                    $ = "",
                    I = X.createObjectURL(F),
                    S = 0,
                    D = a.allowedFileTypes,
                    P = Z(D) ? "" : D.join(", "),
                    U = a.allowedFileExtensions,
                    j = Z(U) ? "" : U.join(", ");
                if (Z(U) || ($ = new RegExp("\\.(" + U.join("|") + ")$", "i")), k = k.toFixed(2), a.maxFileSize > 0 && k > a.maxFileSize) return b = a.msgSizeTooLarge.replace("{name}", E).replace("{size}", k).replace("{maxSize}", a.maxFileSize), void(a.isError = g(b, F, y, e));
                if (!Z(D) && H(D)) {
                    for (w = 0; w < D.length; w += 1) C = D[w], h = f[C], x = void 0 !== h && h(F.type, E), S += Z(x) ? 0 : x.length;
                    if (0 === S) return b = a.msgInvalidFileType.replace("{name}", E).replace("{types}", P), void(a.isError = g(b, F, y, e))
                }
                return 0 !== S || Z(U) || !H(U) || Z($) || (x = E.match($), S += Z(x) ? 0 : x.length, 0 !== S) ? a.showPreview ? (n.length > 0 && void 0 !== FileReader ? (s.html(d.replace("{index}", e + 1).replace("{files}", u)), o.addClass("loading"), l.onerror = function(e) {
                    a.errorHandler(e, E)
                }, l.onload = function(i) {
                    a.previewFile(e, F, i, y, I), a.initFileActions()
                }, l.onloadend = function() {
                    b = c.replace("{index}", e + 1).replace("{files}", u).replace("{percent}", 50).replace("{name}", E), setTimeout(function() {
                        s.html(b), a.updateFileDetails(u), t(e + 1)
                    }, 100), a.raise("fileloaded", [F, y, e, l])
                }, l.onprogress = function(i) {
                    if (i.lengthComputable) {
                        var t = i.loaded / i.total * 100,
                            a = Math.ceil(t);
                        b = c.replace("{index}", e + 1).replace("{files}", u).replace("{percent}", a).replace("{name}", E), setTimeout(function() {
                            s.html(b)
                        }, 100)
                    }
                }, m = W("text", f) ? f.text : N.text, m(F.type, E) ? l.readAsText(F, a.textEncoding) : l.readAsArrayBuffer(F)) : (a.previewDefault(F, y), setTimeout(function() {
                    t(e + 1), a.updateFileDetails(u)
                }, 100), a.raise("fileloaded", [F, y, e, l])), void a.filestack.push(F)) : (a.filestack.push(F), setTimeout(t(e + 1), 100), void a.raise("fileloaded", [F, y, e, l])) : (b = a.msgInvalidFileExtension.replace("{name}", E).replace("{extensions}", j), void(a.isError = g(b, F, y, e)))
            }, t(0), a.updateFileDetails(u, !1)
        },
        updateFileDetails: function(e) {
            var i = this,
                t = i.$element,
                r = i.getFileStack(),
                n = t.val() || r.length && r[0].name || "",
                l = i.slug(n),
                o = i.isUploadable ? r.length : e,
                s = a.count(i.id) + o,
                d = o > 1 ? i.getMsgSelected(s) : l;
            i.isError ? (i.$previewContainer.removeClass("loading"), i.$previewStatus.html(""), i.$captionContainer.find(".kv-caption-icon").hide()) : i.showFileIcon(), i.setCaption(d, i.isError), i.$container.removeClass("file-input-new file-input-ajax-new"), 1 === arguments.length && i.raise("fileselect", [e, l]), a.count(i.id) && i.initPreviewDeletes()
        },
        validateMinCount: function() {
            var e = this,
                i = e.isUploadable ? e.getFileStack().length : e.$element.get(0).files.length;
            return e.validateInitialCount && e.minFileCount > 0 && e.getFileCount(i - 1) < e.minFileCount ? (e.noFilesError({}), !1) : !0
        },
        getFileCount: function(e) {
            var i = this,
                t = 0;
            return i.validateInitialCount && !i.overwriteInitial && (t = a.count(i.id), e += t), e
        },
        change: function(i) {
            var t = this,
                r = t.$element;
            if (!t.isUploadable && Z(r.val()) && t.fileInputCleared) return void(t.fileInputCleared = !1);
            t.fileInputCleared = !1;
            var n, l, o, s, d, c, p = arguments.length > 1,
                u = p ? i.originalEvent.dataTransfer.files : r.get(0).files,
                f = Z(r.attr("multiple")),
                v = 0,
                g = 0,
                m = t.filestack.length,
                h = t.isUploadable,
                w = f && m > 0,
                b = function(i, a, r, n) {
                    var l = e.extend(t.getOutData({}, {}, u), {
                            id: r,
                            index: n
                        }),
                        o = {
                            id: r,
                            index: n,
                            file: a,
                            files: u
                        };
                    return t.isUploadable ? t.showUploadError(i, l) : t.showError(i, o)
                };
            if (t.reader = null, t.resetUpload(), t.hideFileIcon(), t.isUploadable && t.$container.find(".file-drop-zone ." + t.dropZoneTitleClass).remove(), p)
                for (n = []; u[v];) s = u[v], s.type || s.size % 4096 !== 0 ? n.push(s) : g++, v++;
            else n = void 0 === i.target.files ? i.target && i.target.value ? [{
                name: i.target.value.replace(/^.+\\/, "")
            }] : [] : i.target.files;
            if (Z(n) || 0 === n.length) return h || t.clear(), t.showFolderError(g), void t.raise("fileselectnone");
            if (t.resetErrors(), c = n.length, o = t.isUploadable ? t.getFileStack().length + c : c, o = t.getFileCount(o), t.maxFileCount > 0 && o > t.maxFileCount) {
                if (!t.autoReplace || c > t.maxFileCount) return d = t.autoReplace && c > t.maxFileCount ? c : o, l = t.msgFilesTooMany.replace("{m}", t.maxFileCount).replace("{n}", d), t.isError = b(l, null, null, null), t.$captionContainer.find(".kv-caption-icon").hide(), t.setCaption("", !0), void t.$container.removeClass("file-input-new file-input-ajax-new");
                o > t.maxFileCount && t.resetPreviewThumbs(h)
            } else !h || w ? (t.resetPreviewThumbs(!1), w && (t.filestack = [])) : !h || 0 !== m || a.count(t.id) && !t.overwriteInitial || t.resetPreviewThumbs(!0);
            t.isPreviewable ? t.readFiles(n) : t.updateFileDetails(1), t.showFolderError(g)
        },
        validateImage: function(e, i, a) {
            var r, n, l, o = this,
                s = o.$preview,
                d = s.find("#" + i),
                c = d.find("img");
            a = a || "Untitled", c.length && t(c, "load", function() {
                n = d.width(), l = s.width(), n > l && (c.css("width", "100%"), d.css("width", "97%")), r = {
                    ind: e,
                    id: i
                }, o.checkDimensions(e, "Small", c, d, a, "Width", r), o.checkDimensions(e, "Small", c, d, a, "Height", r), o.checkDimensions(e, "Large", c, d, a, "Width", r), o.checkDimensions(e, "Large", c, d, a, "Height", r), o.raise("fileimageloaded", [i]), X.revokeObjectURL(c.attr("src"))
            })
        },
        checkDimensions: function(e, i, t, a, r, n, l) {
            var o, s, d, c, p = this,
                u = "Small" === i ? "min" : "max",
                f = p[u + "Image" + n];
            !Z(f) && t.length && (d = t[0], s = "Width" === n ? d.naturalWidth || d.width : d.naturalHeight || d.height, c = "Small" === i ? s >= f : f >= s, c || (o = p["msgImage" + n + i].replace("{name}", r).replace("{size}", f), p.showUploadError(o, l), p.setThumbStatus(a, "Error"), p.filestack[e] = null))
        },
        initCaption: function() {
            var e = this,
                i = e.initialCaption || "";
            return e.overwriteInitial || Z(i) ? (e.$caption.html(""), !1) : (e.setCaption(i), !0)
        },
        setCaption: function(i, t) {
            var a, r, n = this;
            if (t) a = e("<div>" + n.msgValidationError + "</div>").text(), r = '<span class="' + n.msgValidationErrorClass + '">' + n.msgValidationErrorIcon + a + "</span>";
            else {
                if (Z(i) || 0 === n.$caption.length) return;
                a = e("<div>" + i + "</div>").text(), r = n.getLayoutTemplate("icon") + a
            }
            n.$caption.html(r), n.$caption.attr("title", a), n.$captionContainer.find(".file-caption-ellipsis").attr("title", a)
        },
        initBrowse: function(e) {
            var i = this;
            i.$btnFile = e.find(".btn-file"), i.$btnFile.append(i.$element)
        },
        createContainer: function() {
            var i = this,
                t = e(document.createElement("div")).attr({
                    "class": "file-input file-input-new"
                }).html(i.renderMain());
            return i.$element.before(t), i.initBrowse(t), t
        },
        refreshContainer: function() {
            var e = this,
                i = e.$container;
            i.before(e.$element), i.html(e.renderMain()), e.initBrowse(i)
        },
        renderMain: function() {
            var e = this,
                i = e.isUploadable && e.dropZoneEnabled ? " file-drop-zone" : "",
                t = e.showPreview ? e.getLayoutTemplate("preview").replace(/\{class\}/g, e.previewClass).replace(/\{dropClass\}/g, i) : "",
                a = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass,
                r = e.captionTemplate.replace(/\{class\}/g, a + " kv-fileinput-caption");
            return e.mainTemplate.replace(/\{class\}/g, e.mainClass).replace(/\{preview\}/g, t).replace(/\{caption\}/g, r).replace(/\{upload\}/g, e.renderButton("upload")).replace(/\{remove\}/g, e.renderButton("remove")).replace(/\{cancel\}/g, e.renderButton("cancel")).replace(/\{browse\}/g, e.renderButton("browse"))
        },
        renderButton: function(e) {
            var i = this,
                t = i.getLayoutTemplate("btnDefault"),
                a = i[e + "Class"],
                r = i[e + "Title"],
                n = i[e + "Icon"],
                l = i[e + "Label"],
                o = i.isDisabled ? " disabled" : "",
                s = "button";
            switch (e) {
                case "remove":
                    if (!i.showRemove) return "";
                    break;
                case "cancel":
                    if (!i.showCancel) return "";
                    a += " hide";
                    break;
                case "upload":
                    if (!i.showUpload) return "";
                    i.isUploadable && !i.isDisabled ? t = i.getLayoutTemplate("btnLink").replace("{href}", i.uploadUrl) : s = "submit";
                    break;
                case "browse":
                    t = i.getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return a += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", t.replace("{type}", s).replace("{css}", a).replace("{title}", r).replace("{status}", o).replace("{icon}", n).replace("{label}", l)
        }
    }, e.fn.fileinput = function(t) {
        if (n() || i(9)) {
            var a = Array.apply(null, arguments),
                r = [];
            switch (a.shift(), this.each(function() {
                var i, n = e(this),
                    l = n.data("fileinput"),
                    o = "object" == typeof t && t,
                    s = o.language || n.data("language") || "en";
                l || (i = e.extend({}, e.fn.fileinput.defaults), "en" === s || Z(e.fn.fileinputLocales[s]) || (i = e.extend(i, e.fn.fileinputLocales[s])), l = new J(this, e.extend(i, o, n.data())), n.data("fileinput", l)), "string" == typeof t && r.push(l[t].apply(l, a))
            }), r.length) {
                case 0:
                    return this;
                case 1:
                    return r[0];
                default:
                    return r
            }
        }
    }, e.fn.fileinput.defaults = {
        language: "en",
        showCaption: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showCancel: !0,
        showUploadedThumbs: !0,
        autoReplace: !1,
        mainClass: "",
        previewClass: "",
        captionClass: "",
        mainTemplate: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        layoutTemplates: R,
        previewTemplates: z,
        allowedPreviewTypes: M,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewSettings: B,
        fileTypeSettings: N,
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconClass: "file-icon-4x",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> &nbsp;',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i> ',
        removeClass: "btn btn-default",
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ',
        cancelClass: "btn btn-default",
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
        uploadClass: "btn btn-default",
        uploadUrl: null,
        uploadAsync: !0,
        uploadExtraData: {},
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        maxFileSize: 0,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        previewFileType: "image",
        zoomIndicator: '<i class="glyphicon glyphicon-zoom-in"></i>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0
    }, e.fn.fileinputLocales.en = {
        fileSingle: "file",
        filePlural: "files",
        browseLabel: "Browse &hellip;",
        removeLabel: "Remove",
        removeTitle: "Clear selected files",
        cancelLabel: "Cancel",
        cancelTitle: "Abort ongoing upload",
        uploadLabel: "Upload",
        uploadTitle: "Upload selected files",
        msgZoomTitle: "View details",
        msgZoomModalHeading: "Detailed Preview",
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: "You must select at least <b>{n}</b> {files} to upload.",
        msgFilesTooMany: "Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.",
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgUploadAborted: "The file upload was aborted",
        msgValidationError: "File Upload Error",
        msgLoading: "Loading file {index} of {files} &hellip;",
        msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.",
        msgSelected: "{n} {files} selected",
        msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.",
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        dropZoneTitle: "Drag & drop files here &hellip;"
    }, e.extend(e.fn.fileinput.defaults, e.fn.fileinputLocales.en), e.fn.fileinput.Constructor = J, e(document).ready(function() {
        var i = e("input.file[type=file]");
        i.length && i.fileinput()
    })
}(window.jQuery);