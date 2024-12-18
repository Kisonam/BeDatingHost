import {
  CommonModule
} from "./chunk-LTKD4ZI5.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  Output,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-NLUMCQWJ.js";
import "./chunk-ZPEIAAMA.js";

// node_modules/ng2-file-upload/fesm2022/ng2-file-upload.mjs
var FileLikeObject = class {
  constructor(fileOrInput) {
    this.rawFile = fileOrInput;
    const fakePathOrObject = fileOrInput instanceof HTMLInputElement ? fileOrInput.value : fileOrInput;
    const postfix = typeof fakePathOrObject === "string" ? "FakePath" : "Object";
    const method = `_createFrom${postfix}`;
    this[method](fakePathOrObject);
  }
  _createFromFakePath(path) {
    this.lastModifiedDate = void 0;
    this.size = void 0;
    this.type = `like/${path.slice(path.lastIndexOf(".") + 1).toLowerCase()}`;
    this.name = path.slice(path.lastIndexOf("/") + path.lastIndexOf("\\") + 2);
  }
  _createFromObject(object) {
    this.size = object.size;
    this.type = object.type;
    this.name = object.name;
  }
};
var FileItem = class {
  constructor(uploader, some, options) {
    this.url = "/";
    this.headers = [];
    this.withCredentials = true;
    this.formData = [];
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;
    this.uploader = uploader;
    this.some = some;
    this.options = options;
    this.file = new FileLikeObject(some);
    this._file = some;
    if (uploader.options) {
      this.method = uploader.options.method || "POST";
      this.alias = uploader.options.itemAlias || "file";
    }
    this.url = uploader.options.url;
  }
  upload() {
    try {
      this.uploader.uploadItem(this);
    } catch (e) {
      this.uploader._onCompleteItem(this, "", 0, {});
      this.uploader._onErrorItem(this, "", 0, {});
    }
  }
  cancel() {
    this.uploader.cancelItem(this);
  }
  remove() {
    this.uploader.removeFromQueue(this);
  }
  onBeforeUpload() {
    return void 0;
  }
  onBuildForm(form) {
    return {
      form
    };
  }
  onProgress(progress) {
    return {
      progress
    };
  }
  onSuccess(response, status, headers) {
    return {
      response,
      status,
      headers
    };
  }
  onError(response, status, headers) {
    return {
      response,
      status,
      headers
    };
  }
  onCancel(response, status, headers) {
    return {
      response,
      status,
      headers
    };
  }
  onComplete(response, status, headers) {
    return {
      response,
      status,
      headers
    };
  }
  _onBeforeUpload() {
    this.isReady = true;
    this.isUploading = true;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;
    this.onBeforeUpload();
  }
  _onBuildForm(form) {
    this.onBuildForm(form);
  }
  _onProgress(progress) {
    this.progress = progress;
    this.onProgress(progress);
  }
  _onSuccess(response, status, headers) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = true;
    this.isCancel = false;
    this.isError = false;
    this.progress = 100;
    this.index = void 0;
    this.onSuccess(response, status, headers);
  }
  _onError(response, status, headers) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = true;
    this.progress = 0;
    this.index = void 0;
    this.onError(response, status, headers);
  }
  _onCancel(response, status, headers) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = true;
    this.isError = false;
    this.progress = 0;
    this.index = void 0;
    this.onCancel(response, status, headers);
  }
  _onComplete(response, status, headers) {
    this.onComplete(response, status, headers);
    if (this.uploader.options.removeAfterUpload) {
      this.remove();
    }
  }
  _prepareToUploading() {
    this.index = this.index || ++this.uploader._nextIndex;
    this.isReady = true;
  }
};
var FileType = class {
  static {
    this.mime_doc = ["application/msword", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.wordprocessingml.template", "application/vnd.ms-word.document.macroEnabled.12", "application/vnd.ms-word.template.macroEnabled.12"];
  }
  static {
    this.mime_xsl = ["application/vnd.ms-excel", "application/vnd.ms-excel", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.spreadsheetml.template", "application/vnd.ms-excel.sheet.macroEnabled.12", "application/vnd.ms-excel.template.macroEnabled.12", "application/vnd.ms-excel.addin.macroEnabled.12", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"];
  }
  static {
    this.mime_ppt = ["application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.presentationml.template", "application/vnd.openxmlformats-officedocument.presentationml.slideshow", "application/vnd.ms-powerpoint.addin.macroEnabled.12", "application/vnd.ms-powerpoint.presentation.macroEnabled.12", "application/vnd.ms-powerpoint.presentation.macroEnabled.12", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"];
  }
  static {
    this.mime_psd = ["image/photoshop", "image/x-photoshop", "image/psd", "application/photoshop", "application/psd", "zz-application/zz-winassoc-psd"];
  }
  static {
    this.mime_compress = ["application/x-gtar", "application/x-gcompress", "application/compress", "application/x-tar", "application/x-rar-compressed", "application/octet-stream", "application/x-zip-compressed", "application/zip-compressed", "application/x-7z-compressed", "application/gzip", "application/x-bzip2"];
  }
  static getMimeClass(file) {
    let mimeClass = "application";
    if (file?.type && this.mime_psd.indexOf(file.type) !== -1) {
      mimeClass = "image";
    } else if (file?.type?.match("image.*")) {
      mimeClass = "image";
    } else if (file?.type?.match("video.*")) {
      mimeClass = "video";
    } else if (file?.type?.match("audio.*")) {
      mimeClass = "audio";
    } else if (file?.type === "application/pdf") {
      mimeClass = "pdf";
    } else if (file?.type && this.mime_compress.indexOf(file.type) !== -1) {
      mimeClass = "compress";
    } else if (file?.type && this.mime_doc.indexOf(file.type) !== -1) {
      mimeClass = "doc";
    } else if (file?.type && this.mime_xsl.indexOf(file.type) !== -1) {
      mimeClass = "xls";
    } else if (file?.type && this.mime_ppt.indexOf(file.type) !== -1) {
      mimeClass = "ppt";
    }
    if (mimeClass === "application" && file?.name) {
      mimeClass = this.fileTypeDetection(file.name);
    }
    return mimeClass;
  }
  static fileTypeDetection(inputFilename) {
    const types = {
      jpg: "image",
      jpeg: "image",
      tif: "image",
      psd: "image",
      bmp: "image",
      png: "image",
      nef: "image",
      tiff: "image",
      cr2: "image",
      dwg: "image",
      cdr: "image",
      ai: "image",
      indd: "image",
      pin: "image",
      cdp: "image",
      skp: "image",
      stp: "image",
      "3dm": "image",
      mp3: "audio",
      wav: "audio",
      wma: "audio",
      mod: "audio",
      m4a: "audio",
      compress: "compress",
      zip: "compress",
      rar: "compress",
      "7z": "compress",
      lz: "compress",
      z01: "compress",
      bz2: "compress",
      gz: "compress",
      pdf: "pdf",
      xls: "xls",
      xlsx: "xls",
      ods: "xls",
      mp4: "video",
      avi: "video",
      wmv: "video",
      mpg: "video",
      mts: "video",
      flv: "video",
      "3gp": "video",
      vob: "video",
      m4v: "video",
      mpeg: "video",
      m2ts: "video",
      mov: "video",
      doc: "doc",
      docx: "doc",
      eps: "doc",
      txt: "doc",
      odt: "doc",
      rtf: "doc",
      ppt: "ppt",
      pptx: "ppt",
      pps: "ppt",
      ppsx: "ppt",
      odp: "ppt"
    };
    const chunks = inputFilename.split(".");
    if (chunks.length < 2) {
      return "application";
    }
    const extension = chunks[chunks.length - 1].toLowerCase();
    if (types[extension] === void 0) {
      return "application";
    } else {
      return types[extension];
    }
  }
};
function isFile(value) {
  return File && value instanceof File;
}
var FileUploader = class {
  constructor(options) {
    this.isUploading = false;
    this.queue = [];
    this.progress = 0;
    this._nextIndex = 0;
    this.options = {
      autoUpload: false,
      isHTML5: true,
      filters: [],
      removeAfterUpload: false,
      disableMultipart: false,
      formatDataFunction: (item) => item._file,
      formatDataFunctionIsAsync: false,
      url: ""
    };
    this.setOptions(options);
    this.response = new EventEmitter();
  }
  setOptions(options) {
    this.options = Object.assign(this.options, options);
    this.authToken = this.options.authToken;
    this.authTokenHeader = this.options.authTokenHeader || "Authorization";
    this.autoUpload = this.options.autoUpload;
    this.options.filters?.unshift({
      name: "queueLimit",
      fn: this._queueLimitFilter
    });
    if (this.options.maxFileSize) {
      this.options.filters?.unshift({
        name: "fileSize",
        fn: this._fileSizeFilter
      });
    }
    if (this.options.allowedFileType) {
      this.options.filters?.unshift({
        name: "fileType",
        fn: this._fileTypeFilter
      });
    }
    if (this.options.allowedMimeType) {
      this.options.filters?.unshift({
        name: "mimeType",
        fn: this._mimeTypeFilter
      });
    }
    for (let i = 0; i < this.queue.length; i++) {
      this.queue[i].url = this.options.url;
    }
  }
  addToQueue(files, _options, filters) {
    let options = _options;
    const list = [];
    for (const file of files) {
      list.push(file);
    }
    const arrayOfFilters = this._getFilters(filters);
    const count = this.queue.length;
    const addedFileItems = [];
    list.map((some) => {
      if (!options) {
        options = this.options;
      }
      const temp = new FileLikeObject(some);
      if (this._isValidFile(temp, arrayOfFilters, options)) {
        const fileItem = new FileItem(this, some, options);
        addedFileItems.push(fileItem);
        this.queue.push(fileItem);
        this._onAfterAddingFile(fileItem);
      } else {
        if (typeof this._failFilterIndex === "number" && this._failFilterIndex >= 0) {
          const filter = arrayOfFilters[this._failFilterIndex];
          this._onWhenAddingFileFailed(temp, filter, options);
        }
      }
    });
    if (this.queue.length !== count) {
      this._onAfterAddingAll(addedFileItems);
      this.progress = this._getTotalProgress();
    }
    this._render();
    if (this.options.autoUpload) {
      this.uploadAll();
    }
  }
  removeFromQueue(value) {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    if (item.isUploading) {
      item.cancel();
    }
    this.queue.splice(index, 1);
    this.progress = this._getTotalProgress();
  }
  clearQueue() {
    while (this.queue.length) {
      this.queue[0].remove();
    }
    this.progress = 0;
  }
  uploadItem(value) {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    const transport = this.options.isHTML5 ? "_xhrTransport" : "_iframeTransport";
    item._prepareToUploading();
    if (this.isUploading) {
      return;
    }
    this.isUploading = true;
    this[transport](item);
  }
  cancelItem(value) {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    const prop = this.options.isHTML5 ? item._xhr : item._form;
    if (item && item.isUploading) {
      prop.abort();
    }
  }
  uploadAll() {
    const items = this.getNotUploadedItems().filter((item) => !item.isUploading);
    if (!items.length) {
      return;
    }
    items.map((item) => item._prepareToUploading());
    items[0].upload();
  }
  cancelAll() {
    const items = this.getNotUploadedItems();
    items.map((item) => item.cancel());
  }
  isFile(value) {
    return isFile(value);
  }
  isFileLikeObject(value) {
    return value instanceof FileLikeObject;
  }
  getIndexOfItem(value) {
    return typeof value === "number" ? value : this.queue.indexOf(value);
  }
  getNotUploadedItems() {
    return this.queue.filter((item) => !item.isUploaded);
  }
  getReadyItems() {
    return this.queue.filter((item) => item.isReady && !item.isUploading).sort((item1, item2) => item1.index - item2.index);
  }
  onAfterAddingAll(fileItems) {
    return {
      fileItems
    };
  }
  onBuildItemForm(fileItem, form) {
    return {
      fileItem,
      form
    };
  }
  onAfterAddingFile(fileItem) {
    return {
      fileItem
    };
  }
  onWhenAddingFileFailed(item, filter, options) {
    return {
      item,
      filter,
      options
    };
  }
  onBeforeUploadItem(fileItem) {
    return {
      fileItem
    };
  }
  onProgressItem(fileItem, progress) {
    return {
      fileItem,
      progress
    };
  }
  onProgressAll(progress) {
    return {
      progress
    };
  }
  onSuccessItem(item, response, status, headers) {
    return {
      item,
      response,
      status,
      headers
    };
  }
  onErrorItem(item, response, status, headers) {
    return {
      item,
      response,
      status,
      headers
    };
  }
  onCancelItem(item, response, status, headers) {
    return {
      item,
      response,
      status,
      headers
    };
  }
  onCompleteItem(item, response, status, headers) {
    return {
      item,
      response,
      status,
      headers
    };
  }
  onCompleteAll() {
    return void 0;
  }
  _mimeTypeFilter(item) {
    return !(item?.type && this.options.allowedMimeType && this.options.allowedMimeType?.indexOf(item.type) === -1);
  }
  _fileSizeFilter(item) {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }
  _fileTypeFilter(item) {
    return !(this.options.allowedFileType && this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
  }
  _onErrorItem(item, response, status, headers) {
    item._onError(response, status, headers);
    this.onErrorItem(item, response, status, headers);
  }
  _onCompleteItem(item, response, status, headers) {
    item._onComplete(response, status, headers);
    this.onCompleteItem(item, response, status, headers);
    const nextItem = this.getReadyItems()[0];
    this.isUploading = false;
    if (nextItem) {
      nextItem.upload();
      return;
    }
    this.onCompleteAll();
    this.progress = this._getTotalProgress();
    this._render();
  }
  _headersGetter(parsedHeaders) {
    return (name) => {
      if (name) {
        return parsedHeaders[name.toLowerCase()] || void 0;
      }
      return parsedHeaders;
    };
  }
  _xhrTransport(item) {
    const that = this;
    const xhr = item._xhr = new XMLHttpRequest();
    let sendable;
    this._onBeforeUploadItem(item);
    if (typeof item._file.size !== "number") {
      throw new TypeError("The file specified is no longer valid");
    }
    if (!this.options.disableMultipart) {
      sendable = new FormData();
      this._onBuildItemForm(item, sendable);
      const appendFile = () => sendable.append(item.alias, item._file, item.file.name);
      if (!this.options.parametersBeforeFiles) {
        appendFile();
      }
      if (this.options.additionalParameter !== void 0) {
        Object.keys(this.options.additionalParameter).forEach((key) => {
          let paramVal = this.options.additionalParameter?.[key];
          if (typeof paramVal === "string" && paramVal.indexOf("{{file_name}}") >= 0 && item.file?.name) {
            paramVal = paramVal.replace("{{file_name}}", item.file.name);
          }
          sendable.append(key, paramVal);
        });
      }
      if (appendFile && this.options.parametersBeforeFiles) {
        appendFile();
      }
    } else {
      if (this.options.formatDataFunction) {
        sendable = this.options.formatDataFunction(item);
      }
    }
    xhr.upload.onprogress = (event) => {
      const progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
      this._onProgressItem(item, progress);
    };
    xhr.onload = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response);
      const gist = this._isSuccessCode(xhr.status) ? "Success" : "Error";
      const method = `_on${gist}Item`;
      this[method](item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onerror = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response);
      this._onErrorItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onabort = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response);
      this._onCancelItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    if (item.method && item.url) {
      xhr.open(item.method, item.url, true);
    }
    xhr.withCredentials = item.withCredentials;
    if (this.options.headers) {
      for (const header of this.options.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (item.headers.length) {
      for (const header of item.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (this.authToken && this.authTokenHeader) {
      xhr.setRequestHeader(this.authTokenHeader, this.authToken);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        that.response.emit(xhr.responseText);
      }
    };
    if (this.options.formatDataFunctionIsAsync) {
      sendable.then((result) => xhr.send(JSON.stringify(result)));
    } else {
      xhr.send(sendable);
    }
    this._render();
  }
  _getTotalProgress(value = 0) {
    if (this.options.removeAfterUpload) {
      return value;
    }
    const notUploaded = this.getNotUploadedItems().length;
    const uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    const ratio = 100 / this.queue.length;
    const current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
  }
  _getFilters(filters) {
    if (!filters) {
      return this.options?.filters || [];
    }
    if (Array.isArray(filters)) {
      return filters;
    }
    if (typeof filters === "string") {
      const names = filters.match(/[^\s,]+/g);
      return this.options?.filters || [].filter((filter) => names?.indexOf(filter.name) !== -1);
    }
    return this.options?.filters || [];
  }
  _render() {
    return void 0;
  }
  _queueLimitFilter() {
    return this.options.queueLimit === void 0 || this.queue.length < this.options.queueLimit;
  }
  _isValidFile(file, filters, options) {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter) => {
      if (typeof this._failFilterIndex === "number") {
        this._failFilterIndex++;
      }
      return filter.fn.call(this, file, options);
    });
  }
  _isSuccessCode(status) {
    return status >= 200 && status < 300 || status === 304;
  }
  _transformResponse(response) {
    return response;
  }
  _parseHeaders(headers) {
    const parsed = {};
    let key;
    let val;
    let i;
    if (!headers) {
      return parsed;
    }
    headers.split("\n").map((line) => {
      i = line.indexOf(":");
      key = line.slice(0, i).trim().toLowerCase();
      val = line.slice(i + 1).trim();
      if (key) {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  }
  _onWhenAddingFileFailed(item, filter, options) {
    this.onWhenAddingFileFailed(item, filter, options);
  }
  _onAfterAddingFile(item) {
    this.onAfterAddingFile(item);
  }
  _onAfterAddingAll(items) {
    this.onAfterAddingAll(items);
  }
  _onBeforeUploadItem(item) {
    item._onBeforeUpload();
    this.onBeforeUploadItem(item);
  }
  _onBuildItemForm(item, form) {
    item._onBuildForm(form);
    this.onBuildItemForm(item, form);
  }
  _onProgressItem(item, progress) {
    const total = this._getTotalProgress(progress);
    this.progress = total;
    item._onProgress(progress);
    this.onProgressItem(item, progress);
    this.onProgressAll(total);
    this._render();
  }
  _onSuccessItem(item, response, status, headers) {
    item._onSuccess(response, status, headers);
    this.onSuccessItem(item, response, status, headers);
  }
  _onCancelItem(item, response, status, headers) {
    item._onCancel(response, status, headers);
    this.onCancelItem(item, response, status, headers);
  }
};
var FileDropDirective = class _FileDropDirective {
  constructor(element) {
    this.fileOver = new EventEmitter();
    this.onFileDrop = new EventEmitter();
    this.element = element;
  }
  getOptions() {
    return this.uploader?.options;
  }
  getFilters() {
    return "";
  }
  onDrop(event) {
    const transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    }
    const options = this.getOptions();
    const filters = this.getFilters();
    this._preventAndStop(event);
    if (options) {
      this.uploader?.addToQueue(transfer.files, options, filters);
    }
    this.fileOver.emit(false);
    this.onFileDrop.emit(transfer.files);
  }
  onDragOver(event) {
    const transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }
    transfer.dropEffect = "copy";
    this._preventAndStop(event);
    this.fileOver.emit(true);
  }
  onDragLeave(event) {
    if (this.element) {
      if (event.currentTarget === this.element[0]) {
        return;
      }
    }
    this._preventAndStop(event);
    this.fileOver.emit(false);
  }
  _getTransfer(event) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }
  _preventAndStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  _haveFiles(types) {
    if (!types) {
      return false;
    }
    if (types.indexOf) {
      return types.indexOf("Files") !== -1;
    } else if (types.contains) {
      return types.contains("Files");
    } else {
      return false;
    }
  }
  static {
    this.ɵfac = function FileDropDirective_Factory(t) {
      return new (t || _FileDropDirective)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FileDropDirective,
      selectors: [["", "ng2FileDrop", ""]],
      hostBindings: function FileDropDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("drop", function FileDropDirective_drop_HostBindingHandler($event) {
            return ctx.onDrop($event);
          })("dragover", function FileDropDirective_dragover_HostBindingHandler($event) {
            return ctx.onDragOver($event);
          })("dragleave", function FileDropDirective_dragleave_HostBindingHandler($event) {
            return ctx.onDragLeave($event);
          });
        }
      },
      inputs: {
        uploader: "uploader"
      },
      outputs: {
        fileOver: "fileOver",
        onFileDrop: "onFileDrop"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileDropDirective, [{
    type: Directive,
    args: [{
      selector: "[ng2FileDrop]"
    }]
  }], () => [{
    type: ElementRef
  }], {
    uploader: [{
      type: Input
    }],
    fileOver: [{
      type: Output
    }],
    onFileDrop: [{
      type: Output
    }],
    onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }],
    onDragOver: [{
      type: HostListener,
      args: ["dragover", ["$event"]]
    }],
    onDragLeave: [{
      type: HostListener,
      args: ["dragleave", ["$event"]]
    }]
  });
})();
var FileSelectDirective = class _FileSelectDirective {
  constructor(element) {
    this.onFileSelected = new EventEmitter();
    this.element = element;
  }
  getOptions() {
    return this.uploader?.options;
  }
  getFilters() {
    return "";
  }
  isEmptyAfterSelection() {
    return !!this.element.nativeElement.attributes.multiple;
  }
  onChange() {
    const files = this.element.nativeElement.files;
    const options = this.getOptions();
    const filters = this.getFilters();
    this.uploader?.addToQueue(files, options, filters);
    this.onFileSelected.emit(files);
    if (this.isEmptyAfterSelection()) {
      this.element.nativeElement.value = "";
    }
  }
  static {
    this.ɵfac = function FileSelectDirective_Factory(t) {
      return new (t || _FileSelectDirective)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FileSelectDirective,
      selectors: [["", "ng2FileSelect", ""]],
      hostBindings: function FileSelectDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("change", function FileSelectDirective_change_HostBindingHandler() {
            return ctx.onChange();
          });
        }
      },
      inputs: {
        uploader: "uploader"
      },
      outputs: {
        onFileSelected: "onFileSelected"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileSelectDirective, [{
    type: Directive,
    args: [{
      selector: "[ng2FileSelect]"
    }]
  }], () => [{
    type: ElementRef
  }], {
    uploader: [{
      type: Input
    }],
    onFileSelected: [{
      type: Output
    }],
    onChange: [{
      type: HostListener,
      args: ["change"]
    }]
  });
})();
var FileUploadModule = class _FileUploadModule {
  static {
    this.ɵfac = function FileUploadModule_Factory(t) {
      return new (t || _FileUploadModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _FileUploadModule,
      declarations: [FileDropDirective, FileSelectDirective],
      imports: [CommonModule],
      exports: [FileDropDirective, FileSelectDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileUploadModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [FileDropDirective, FileSelectDirective],
      exports: [FileDropDirective, FileSelectDirective]
    }]
  }], null, null);
})();
export {
  FileDropDirective,
  FileItem,
  FileLikeObject,
  FileSelectDirective,
  FileUploadModule,
  FileUploader
};
//# sourceMappingURL=ng2-file-upload.js.map
