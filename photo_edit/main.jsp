<%@ page contentType="text/html;charset=gbk" %>
<%
	String path="detail.jpg";
%>
<html>
<head>
	<link href="main.css" rel=stylesheet> 
	<link rel="stylesheet" href="css/cropper.min.css">
  	<link rel="stylesheet" href="css/crop-avatar-main.css">
  	<script src="js/jquery-1.12.4.min.js"></script>
<style>
.big_top{
	background-color:#aaa;
	height:30px;
	float:left;
	position:fixed;
	margin-top:0px;
	width:100%;
}
.left_01{
	height:25px;
	width:150px;
	background-color:#eee;
	float:left;
}
.left_02{
	height:25px;
	width:150px;
	background-color:#eee;
	float:left;
}
.left_03{
	height:25px;
	width:150px;
	background-color:#eee;
	float:left;
}
.left_04{
	height:25px;
	width:150px;
	background-color:#eee;
	float:left;
}
.big_all{
	margin-top:0px;
}
.big_left{
	width:150px;
	float:left;
	position:fixed;
	margin-left:0px;
	margin-top:30px;
}

.col-lg-1{
	/* display:none; */
}
.col-lg-3{
	display:none;
}
.big_right_01{
	margin-top:25px;
	margin-left:150px;
}
.big_right_02{
	display:none;
	margin-top:25px;
	margin-left:150px;
}
.big_right_03{
	display:none;
	margin-top:25px;
	margin-left:150px;
}
.big_right_04{
	display:none;
	margin-top:25px;
	margin-left:150px;
}
</style>	
</head>
<body>
<div class="big_top"><button onclick="downLoadToLocal()">���浱ǰ��ͼ��������</button></div>&nbsp;
<div class="big_all" id="crop-avatar">
	<div class="big_left" onclick=""> 
		<div class="left_01"  onclick="base1();">
			��������
		</div>
		<div class="col-lg-1">
	    	<label for="hue">ɫ��</label>
	    	<input id="hue" name="hue" type="range" min="0" max="300" value="0">
	    </div>
	    <div class="col-lg-1">
	    	<label for="contrast">����</label>
	    	<input id="contrast" name="contrast" type="range" min="-20" max="20" value="0">
	  	</div>
	  	<div class="col-lg-1">
		    <label for="vibrance">��Ȼ���Ͷ�</label>
		    <input id="vibrance" name="vibrance" type="range" min="0" max="400" value="0">
		</div>
	  	<div class="col-lg-1">
		    <label for="sepia">��ɫ</label>
		    <input id="sepia" name="sepia" type="range" min="0" max="100" value="0">
		</div>
		<div class="left_02"  onclick="crop2();">
			�ü�
		</div>
		<div class="left_03"  onclick="masic3();">
			������
		</div>
		<div class="col-lg-3">
		    <label for="vibrance">ģ���̶�</label>
		    <input id="msk_mhcd" name="msk_mhcd" type="range" min="2" max="10" value="5">
		</div>
		<div class="col-lg-3">
		    <label for="vibrance">���ʴ�С</label>
		    <input id="msk_hbdx" name="msk_hbdx" type="range" min="10" max="100" value="50">
		</div>
		<div class="left_04" onclick="tjwz4();">
			��������
		</div>
		
	</div>

	<div class="big_right_01"> 
		<div class="col-lg-6">
		  <canvas id="canvas"></canvas>
		</div>
	  <nav class="filters">
	    <button id="resetbtn" class="btn btn-success">Reset Photo</button>
	    <button id="brightnessbtn" class="btn btn-primary">Brightness</button>
	    <button id="noisebtn" class="btn btn-primary">Noise</button>
	    <button id="sepiabtn" class="btn btn-primary">Sepia</button>
	    <button id="contrastbtn" class="btn btn-primary">Contrast</button>
	    <button id="colorbtn" class="btn btn-primary">Colorize</button>
	    <button onclick="downLoadToLocal()" id="save" style="display:none;">����ͼƬ����</button>
	    <button onclick="return_init()" id="ret1">��ԭ��ʼ�汾</button>
	  </nav>
	</div>

	<div class="big_right_02"> 
		<div class="row" id="avatar-modal">
	                  <div class="col-md-9">
	                    <div class="avatar-wrapper"></div>
	                  </div>
	                  <div class="col-md-3">
	                    <div class="avatar-preview preview-lg" style="display:none;"></div>
	                    <div class="preview-md" id="preview-md" style="display:none;">
	
	                      <canvas id="preview-canvas"></canvas>
	                    </div>
	                    <div class="avatar-preview preview-sm" style="display:none;"></div>
	                  </div>
	     </div>
		<div class="row avatar-btns">
	         <div class="col-md-9">
		           <div class="btn-group">
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate -90 degrees">����ת</button>
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="-15">-15��</button>
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="-30">-30��</button>
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45">-45��</button>
		           </div>
		           <div class="btn-group">
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate 90 degrees">����ת</button>
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="15">15��</button>
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="30">30��</button>
		             <button type="button" class="btn btn-primary" data-method="rotate" data-option="45">45��</button>
		           </div>
	         </div>
	         <div class="col-md-3">
	           <button id="canvas2_toimg">ȷ�ϲü�</button>
	           <button  id="save2">���浽������</button>
	           <button   id="refresh" >ˢ��</button>
	         </div>
	      </div>
	</div>
	<div class="big_right_03"> 
		<div class="col-lg-6">
		  <canvas id="canvas3"></canvas>
		</div>
	  <nav class="filters">
	    <button onclick="return_init()" id="ret3">��ԭ��ʼ�汾</button>
	  </nav>
	</div>
	<div class="big_right_04"> 
		 <canvas id="can4" ></canvas>
		   <br>
		  ���壺<select id="text_zt" onchange="change_all()">
		   	<option value="Arial">Arial</option>
		   	<option value="Arial">Arial</option>
		   </select>
		 ������ɫ<select id="text_color" onchange="change_all()">
		 	<option value="#000">��ɫ</option>
		   	<option value="#fff">��ɫ</option>
		   	<option value="#eee">��ɫ</option>
		   </select>
		  �ֺţ�<select id="text_size" onchange="change_all()">
		   	<option>12</option>
		   	<option>14</option>
		   	<option>16</option>
		   	<option>18</option>
		   	<option>20</option>
		   	<option>22</option>
		   	<option>24</option>
		   	<option>26</option>
		   	<option>28</option>
		   	<option>30</option>
		   </select>
		  <textarea id="qpk_input" rows="3" cols="40"></textarea>
		  <br>
			  �Ự����״:<select id="qpk_shape" onchange="change_qpk()">
			 			 <option value="3">��Բ</option>
					   	<option value="1">ֱ�Ǿ���</option>
				    </select>
			 �Ự����ɫ<select id="rect_color" onchange="change_all()">
			   	<option value="#fff">��ɫ</option>
			   	<option value="#000">��ɫ</option>
			   	<option value="#eee">��ɫ</option>
			   </select>
			  <div id="qpk_rect_cc">���ο�ߴ�:<input id="qpk_kd" value="100">*<input id="qpk_gd" value="50"></div>
			  <div id="qpk_ellipse_cc" style="display:none;">��Բ�뾶��<input id="ellipse_kd" value="100" onchange="change_all()">
			  		��Բ�뾶��<input id="ellipse_gd" value="50" onchange="change_all()"></div>
			   �Ự��͸����:<select id="qpk_tmd" onchange="change_all()">
					   	<option>0</option>
					   	<option>0.1</option>
					   	<option selected="selected">0.2</option>
					   	<option>0.3</option>
					   	<option>0.4</option>
					   	<option>0.5</option>
					   	<option>0.6</option>
					   	<option>0.7</option>
					   	<option>0.8</option>
					   	<option>0.9</option>
					   	<option>1</option>
					   </select>
			<br>
			  <button onclick="add_qpk()">Ӧ�õ�ǰ���ݿ�����</button>
			  <button onclick="save_current()">���浱ǰ���ݿ�</button>
			  <button onclick="save_allopt()">���汾�����в���</button>
			  <button onclick="return_init()">һ����ԭ</button>
				  </nav>
	</div>
	
</div>
	<script src="caman.full.js" type="text/javascript"></script>
	<script src="main.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js"></script>
 	<script src="js/cropper.js"></script>
  	<script src="js/crop-avatar-main.js"></script>
  	<script src="js/msk_add_main.js" type="text/javascript"></script>
  	<script src="js/text_add_main.js" type="text/javascript"></script>
  	
</body>
</html>