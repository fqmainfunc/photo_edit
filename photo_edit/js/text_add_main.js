var can4 = document.getElementById("can4");
		var ctx4 = can4.getContext("2d");
		var img4 = new Image();
		var init_x="";
		var init_y="";
		  img4.crossOrigin = '';
		  img4.src = image_all.src;
		  var init_img4=img4;
		  
		  img4.onload = function() {
		    can4.width = img4.width;
		    can4.height = img4.height;
		    ctx4.drawImage(img4, 0, 0, img4.width, img4.height);
		  }

$('#qpk_input').bind('input propertychange', function() {
   		add_qpk();
	});
function tjwz4(){
	if(public_saveimg()){
	canvas4_refresh();
	$(".big_right_01").hide();
    $(".big_right_02").hide();
    $(".big_right_03").hide();
    $(".big_right_04").show();
    $(".col-lg-1").hide();
    $(".col-lg-3").hide();
    monment_method=4;
	}
}
function  canvas4_refresh(){
	var canvas4 = document.getElementById('can4');
	var ctx4 = canvas4.getContext('2d');
	var img3 = new Image();
	  img3.crossOrigin = '';
	  img3.src = image_all.src;
	  init_img4.src=image_all.src;
	  img3.onload = function() {
	    canvas4.width = img3.width;
	    canvas4.height = img3.height;
	    ctx4.drawImage(img3, 0, 0, img3.width, img3.height);
	  }
}
function save_allopt(){
	image_all.src=document.getElementById("can4").toDataURL('image/jpeg');
}
function return_init4(){
		//鼠标按下，将鼠标按下坐标保存在x,y中
		ctx4.clearRect(0,0,can4.width,can4.height);
		ctx4.drawImage(init_img4, 0, 0, img4.width, img4.height);
	}
function change_qpk(){
	var shape=$("#qpk_shape").val();
	if(shape==3){
		$("#qpk_rect_cc").hide();
		$("#qpk_ellipse_cc").show();
	}else{
		$("#qpk_rect_cc").show();
		$("#qpk_ellipse_cc").hide();
	}
	change_all();
}
function change_all(){
		//鼠标移动每一帧都清楚画布内容，然后重新画圆
		if(init_x!=null&&init_x!=""){
			ctx4.clearRect(0,0,can4.width,can4.height);
			ctx4.drawImage(img4, 0, 0, img4.width, img4.height);
			createBlock(init_x,init_y);
		}else{
			createBlock(50,50);
		}
	}
function add_qpk(){
		//鼠标按下，将鼠标按下坐标保存在x,y中
		change_all();
	}
function save_current(){
	var base64 = document.getElementById("can").toDataURL('image/jpeg'); //将图片数据转为base64.
	img4.src=base64;
	init_x="";
	init_y="";
}
//创建圆滑块 一定要先写fill(),固定回话框
function createBlock(a,b){
init_x=a;
init_y=b;
var nr=$("#qpk_input").val();
var tmd=$("#qpk_tmd").val();
var shape=$("#qpk_shape").val();
var text_color=$("#text_color").val();
var rect_color=$("#rect_color").val();
var qpk_kd=parseInt($("#qpk_kd").val());
var qpk_gd=parseInt($("#qpk_gd").val());
var ellipse_kd=parseInt($("#ellipse_kd").val());
var ellipse_gd=parseInt($("#ellipse_gd").val());
	if(nr!=null){
		ctx4.beginPath();
		ctx4.fillStyle = rect_color;
		ctx4.globalAlpha=tmd;
		if(shape==3){
			ctx4.ellipse(a+ellipse_kd,b+ellipse_gd,ellipse_kd,ellipse_gd,0,0,Math.PI*2);
		}else{
			ctx4.rect(a,b,qpk_kd,qpk_gd);
		}
		ctx4.fill();
		//alert(nr);
		ctx4.globalAlpha=1;
		var words = nr.split('\n')
		for(var i=0;i<words.length;i++){
			ctx4.fillStyle = text_color;
			var text_zt=$('#text_zt').val();
			var text_size=$('#text_size').val();
			ctx4.font=text_size+"px "+text_zt;
			ctx4.fillText(words[i],a+5,b+5+text_size*i);
		}
		
	}
}
		
can4.onmousedown = function(ev){
	var e = ev||event;
	/* var x = e.clientX;
	var y = e.clientY; */
	var local =getLocation4(e.clientX, e.clientY);
	var x = local.x;
	var y = local.y;
	drag(x,y);
};
//获取
function getLocation4(x, y) {
	var canvas4 = document.getElementById("can");
	var bbox = canvas4.getBoundingClientRect();
	return {
		x: (x - bbox.left) * (canvas4.width / bbox.width),
		y: (y - bbox.top) * (canvas4.height / bbox.height)
		
		/*
				 * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后

是表面积拉大而实际
				 * 显示像素不变而造成的坐标获取不准的情况
				x: (x - bbox.left),
				y: (y - bbox.top)
				*/
	};
}
//拖拽函数
function drag(x,y){
	// 按下鼠标判断鼠标位置是否在圆上，当画布上有多个路径时，isPointInPath只能判断最后那一个绘制的路径
	if(ctx4.isPointInPath(x,y)){
		//路径正确，鼠标移动事件
		can4.onmousemove = function(ev){
			var e = ev||event;
			/* var ax = e.clientX;
			var ay = e.clientY; */
			var local =getLocation4(e.clientX, e.clientY);
			var ax = local.x;
			var ay = local.y;
			//鼠标移动每一帧都清楚画布内容，然后重新画圆
			ctx4.clearRect(0,0,can4.width,can4.height);
			ctx4.drawImage(img4, 0, 0, img4.width, img4.height);
			createBlock(ax,ay);
			
		};
		//鼠标移开事件
		can4.onmouseup = function(){
			can4.onmousemove = null;
			can4.onmouseup = null;
		};
	};
}