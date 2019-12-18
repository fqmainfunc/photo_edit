var init_imgurl="detail.jpg";
var image_all = new Image();
image_all.src= "detail.jpg";
var monment_method=1;
function public_saveimg(){
	var r=confirm("are you sure to save?");
	  if (r==true)
	    {
	    	if(monment_method==1){
	    		canva1_toimg();
	    	}else if(monment_method==2){
	    		$("#canvas2_toimg").click();
	    	}else if(monment_method==3){
	    		canva3_toimg();
	    	}else if(monment_method==4){
	    		save_allopt();
	    	}
	    	return true;
	    }
	  else
	    {
	    	 return false;
	    }
}
function base1(){
	if(public_saveimg()){
	canvas1_refresh();
	$(".big_right_01").show();
    $(".big_right_02").hide();
    $(".big_right_03").hide();
    $(".big_right_04").hide();
    $(".col-lg-1").show();
    $(".col-lg-3").hide();
    monment_method=1;
	}
}
function canva1_toimg() {
	var base64 = document.getElementById("canvas").toDataURL('image/jpeg'); //将图片数据转为base64.
	image_all.src=base64;
	 
	}
function downLoadToLocal(){
	 //var base64 = document.getElementById("canvas").toDataURL('image/jpeg'); //将图片数据转为base64.
	if(monment_method==1){
		canva1_toimg();
	}else if(monment_method==2){
		$("#canvas2_toimg").click();
	}else if(monment_method==3){
		canva3_toimg();
	}else if(monment_method==4){
		save_allopt();
	}
	base64=image_all.src ;
	 if(base64.indexOf("data:image")>-1&&base64.indexOf("base64")>-1){
	   $.post( 
		"upload.jsp", //服务器接口(返回图片路径)
		{data:base64,image_name:"test"}, 
		function(data) {
			alert("保存成功！");
		}, "json");
	 }else{
		 alert("illegal image");
	 }
}
function  canvas1_refresh(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	  img.crossOrigin = '';
	  img.src = image_all.src;

	  img.onload = function() {
	    canvas.width = img.width;
	    canvas.height = img.height;
	    ctx.drawImage(img, 0, 0, img.width, img.height);
	  }
}



function return_init(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	  img.crossOrigin = '';
	  img.src = init_imgurl;
	  
	  img.onload = function() {
	    canvas.width = img.width;
	    canvas.height = img.height;
	    ctx.drawImage(img, 0, 0, img.width, img.height);
	  }
}
$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  /* Enable Cross Origin Image Editing */
  var img = new Image();
  img.crossOrigin = '';
  img.src = image_all.src;
  //img.src = "detail.jpg";
  img.src="data:image/jpeg;base64,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";
  
  
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  }
  
  /*canvas.onmousedown = function (e) {
		var location = getLocation(e.clientX, e.clientY);
		var msk_mhcd=$("#msk_mhcd").val();
		var msk_hbdx=$("#msk_hbdx").val();
		draw(canvas,location.x,location.y,msk_mhcd,msk_hbdx);
  };*/
  
  var $reset = $('#resetbtn');
  var $brightness = $('#brightnessbtn');
  var $noise = $('#noisebtn');
  var $sepia = $('#sepiabtn');
  var $contrast = $('#contrastbtn');
  var $color = $('#colorbtn');

  var $vintage = $('#vintagebtn');
  var $lomo = $('#lomobtn');
  var $emboss = $('#embossbtn');
  var $tiltshift = $('#tiltshiftbtn');
  var $radialblur = $('#radialblurbtn');
  var $edgeenhance = $('#edgeenhancebtn');

  var $posterize = $('#posterizebtn');
  var $clarity = $('#claritybtn');
  var $orangepeel = $('#orangepeelbtn');
  var $sincity = $('#sincitybtn');
  var $sunrise = $('#sunrisebtn');
  var $crossprocess = $('#crossprocessbtn');

  var $hazydays = $('#hazydaysbtn');
  var $love = $('#lovebtn');
  var $grungy = $('#grungybtn');
  var $jarques = $('#jarquesbtn');
  var $pinhole = $('#pinholebtn');
  var $oldboot = $('#oldbootbtn');
  var $glowingsun = $('#glowingsunbtn');

  var $hdr = $('#hdrbtn');
  var $oldpaper = $('#oldpaperbtn');
  var $pleasant = $('#pleasantbtn');

  var $save = $('#savebtn');

  /* As soon as slider value changes call applyFilters */
  $('input[type=range]').change(applyFilters);

  function applyFilters() {
    var hue = parseInt($('#hue').val());
    var cntrst = parseInt($('#contrast').val());
    var vibr = parseInt($('#vibrance').val());
    var sep = parseInt($('#sepia').val());

    Caman('#canvas', img, function() {
      this.revert(false);
      this.hue(hue).contrast(cntrst).vibrance(vibr).sepia(sep).render();
    });
  }
  
  function convertCanvasToImage(canvas) {
	  image.src = canvas.toDataURL("image/png");
  }

  /* Creating custom filters */
  Caman.Filter.register("oldpaper", function() {
    this.pinhole();
    this.noise(10);
    this.orangePeel();
    this.render();
  });

  Caman.Filter.register("pleasant", function() {
    this.colorize(60, 105, 218, 10);
    this.contrast(10);
    this.sunrise();
    this.hazyDays();
    this.render();
  });

  $reset.on('click', function(e) {
    $('input[type=range]').val(0);
    Caman('#canvas', img, function() {
      this.revert(false);
      this.render();
    });
  });

  /* In built filters */
  $brightness.on('click', function(e) {
    Caman('#canvas', function() {
      this.brightness(30).render();
    });
  });

  $noise.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.noise(10).render();
    });
  });

  $contrast.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.contrast(10).render();
    });
  });

  $sepia.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.sepia(20).render();
    });
  });

  $color.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.colorize(60, 105, 218, 10).render();
    });
  });

  $vintage.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.vintage().render();
    });
  });

  $lomo.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.lomo().render();
    });
  });

  $emboss.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.emboss().render();
    });
  });

  $tiltshift.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.tiltShift({
        angle: 90,
        focusWidth: 600
      }).render();
    });
  });

  $radialblur.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.radialBlur().render();
    });
  });

  $edgeenhance.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.edgeEnhance().render();
    });
  });

  $posterize.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.posterize(8, 8).render();
    });
  });

  $clarity.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.clarity().render();
    });
  });

  $orangepeel.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.orangePeel().render();
    });
  });

  $sincity.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.sinCity().render();
    });
  });

  $sunrise.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.sunrise().render();
    });
  });

  $crossprocess.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.crossProcess().render();
    });
  });

  $love.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.love().render();
    });
  });

  $grungy.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.grungy().render();
    });
  });

  $jarques.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.jarques().render();
    });
  });

  $pinhole.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.pinhole().render();
    });
  });

  $oldboot.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.oldBoot().render();
    });
  });

  $glowingsun.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.glowingSun().render();
    });
  });

  $hazydays.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.hazyDays().render();
    });
  });

  /* Calling multiple filters inside same function */
  $hdr.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.contrast(10);
      this.contrast(10);
      this.jarques();
      this.render();
    });
  });

  /* Custom filters that we created */
  $oldpaper.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.oldpaper();
      this.render();
    });
  });

  $pleasant.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.pleasant();
      this.render();
    });
  });

  /* You can also save it as a jpg image, extension need to be added later after saving image. */

  $save.on('click', function(e) {
    Caman('#canvas', img, function() {
      this.render(function() {
        this.save('png');
      });
    });
  });
});