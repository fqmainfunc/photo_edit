function crop2(){
	if(public_saveimg()){
	$("#refresh").click();
	$(".big_right_01").hide();
    $(".big_right_02").show();
    $(".big_right_03").hide();
    $(".big_right_04").hide();
    $(".col-lg-1").hide();
    $(".col-lg-3").hide();
    monment_method=2;
	}
}
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
})
(function ($) {

    'use strict';

    var console = window.console || { log: function () {} };

    function CropAvatar($element) {
        this.$container = $element;

        //this.$avatarView = this.$container.find('.avatar-view');
        //this.$avatar = this.$avatarView.find('img');
        this.$avatarModal = this.$container.find('#avatar-modal');
        //this.$loading = this.$container.find('.loading');

        this.$avatarSave = this.$container.find('#save2');
        this.$avatarCanvas2_toimg=this.$container.find('#canvas2_toimg');
        this.$avatarRefresh = this.$container.find('#refresh');
        this.$avatarBtns = this.$container.find('.avatar-btns');
        
        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');
        this.$previewCanvas = this.$container.find('#preview-canvas');
        this.$avatarPreviewmdimg = this.$avatarModal.find('#preview-md-img');
        this.$avatarPreviewmd = this.$avatarModal.find('#preview-md');
        
        this.init();
        
        this.$avatarModal.modal('show');
    }

    CropAvatar.prototype = {
        constructor: CropAvatar,    
        
        init: function () {
        	this.initPreview();
        	this.startCropper();
        	this.addListener();
        },

        initPreview: function () {
            //this.$avatarPreview.html('<img src="/TEMP_IMAGE/test.jpeg">');

        },
  
        addListener: function () {
            this.$avatarSave.on('click', $.proxy(this.save_tolocal, this));
            this.$avatarCanvas2_toimg.on('click', $.proxy(this.canvas2_toimg, this));
            this.$avatarRefresh.on('click', $.proxy(this.refresh, this));
            this.$avatarBtns.on('click', $.proxy(this.rotate, this));
        },
        rotate: function (e) {
            var data;
                data = $(e.target).data();

                if (data.method) {
                    this.$img.cropper(data.method, data.option);
                }
        },

     
        startCropper: function () {
            var _this = this;
            this.url=image_all.src;
            
            this.active=false;

            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
            	this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    resizable:true,
                    dragCrop:true,
                    autoCrop:false,
                    strict:true,
                    preview: this.$avatarPreview.selector,
                    crop: function () {
                        _this.urlCanvas();

                    }
                });


                this.active = true;
            }

            this.$avatarModal.one('hidden.bs.modal', function () {
                _this.$avatarPreview.empty();
                _this.stopCropper();
            });
        },
        urlCanvas:function(){
            var dataurl = this.$img.cropper("getCroppedCanvas");
            var rectImage = document.createElement('img');
            rectImage.src = dataurl.toDataURL('image/jpeg');
            this.$avatarPreviewmd.html('').append(rectImage);
        },
        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
            }
        },

        cropDone: function () {
            this.stopCropper();
            this.$avatarModal.modal('hide');
        },
        
        canvas2_toimg:function(){
        	var dataurl = this.$img.cropper("getCroppedCanvas");
            image_all.src = dataurl.toDataURL('image/jpeg');
            //alert(image_all.src);
        },
        save_tolocal: function () {
            var base64 = image_all.src;
            $.post( 
            		"upload.jsp", //服务器接口(返回图片路径)
            		{data:base64,image_name:"test"}, 
            		function(data) {
            			//alert(data);
            			//alert(eval(data));
            			//修改上传文件的路径名字(图片完整路径)
            			//$('#img').val('http://path/'+data.target);
            			image.src="/test.jpeg";
            		}, "json");
        },
       refresh: function(){
    	   this.stopCropper();
           this.$avatarModal.modal('hide');
    	   this.init();
    	   this.$avatarModal.modal('show');
       }
    };

    $(function () {
        return new CropAvatar($('#crop-avatar'));
    });

});
