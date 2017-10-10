function AudioBridge() {
  this.localId = "";
  this.serverId = "";
  var _this = this;
  if (typeof AudioBridge._initialized == 'undefined') {

    AudioBridge.prototype.getLocalId= function(){
      return this.localId;
    }

    AudioBridge.prototype.getServerId = function () {
      return this.serverId;
    }

    AudioBridge.prototype.StartRecord = function () {
      XuntongJSBridge.call('startRecord', {},
        function (result) { }
      );
    }

    AudioBridge.prototype.StopRecord = function (callback) {
      XuntongJSBridge.call('stopRecord', {},
        function (result) {
          if (result.success == true) {
            _this.localId = result.data.localId;
            callback.call(_this);
          }
          else {
            alert(result.error);
          }
        }
      );
    }

    AudioBridge.prototype.UploadVoice = function (callback) {
      XuntongJSBridge.call('uploadVoice',
        {
          localId: _this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
        },
        function (result) {
          if (result.success == true) {
            _this.serverId = result.data.serverId;
            callback.call(_this);
          }
          else {
            alert(result.error);
          }
        }
      );
    }
  }
  AudioBridge._initialized = true;
}