<%@page import="java.io.FileOutputStream"%>
<%@page import="sun.misc.BASE64Decoder"%>
<%@page import="java.io.OutputStream"%>
<%@ page contentType="text/html;charset=gbk" %>
<%
		BASE64Decoder decoder = new BASE64Decoder();  
		
		String base64_data=request.getParameter("data");
		String image_name=request.getParameter("image_name");
		//System.out.println("base64_data=="+base64_data);
		String hz=base64_data.substring(base64_data.indexOf("/")+1,base64_data.indexOf(";"));
		//System.out.println("hz=="+hz);
		String dec_str=base64_data.substring(base64_data.indexOf(",")+1,base64_data.length());
		//System.out.println("dec_str=="+dec_str);
		OutputStream out2 = new FileOutputStream("F:\\workspace\\myeclipse\\.metadata\\.me_tcat7\\webapps\\TEMP_IMAGE\\"+image_name+"."+hz);
		try   
        {  
            //Base64����  
            byte[] b = decoder.decodeBuffer(dec_str);  
          //  System.out.println("�������");
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {//�����쳣����  
                    b[i]+=256;  
                }  
            }
            System.out.println("��ʼ����ͼƬ");
            //����jpegͼƬ     
            out2.write(b);  
            out2.flush();  
            out2.close();
            String dy=""+image_name+""+hz;
            System.out.println(dy);   
        }   
        catch (Exception e)   
        {  
            if(out2!=null){out2.flush();out2.close();}
        } finally{
        	if(out2!=null){out2.flush();out2.close();}
        }
%>
