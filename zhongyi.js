(function(){
	return zy ={
		assign:function(id, datas, tps){
			var tps = (tps == undefined) || (tps == '') ? false: tps;
			
			var templateContext =  "";
		    var depin_check_language_values  = new Object();
		    var replaceTemplateVar = "@lisonglin@";
		    var tag_keyword_values = ['for','while','if','switch','break','break',"}","else","do","var"];
		    let result_object = new  Object();
		    /***组合标签是否是关键字或则系统函数***/
		    this.is_tag_keyword_values = function(tag_values) {
		    	for(var i = 0; i<tag_keyword_values.length; i++) {
		    		if(tag_values.indexOf(tag_keyword_values[i]) >=0){
		    			return true;
		    		}
		    	}
		    	return false;
		    }
		    /**进行递归解析语法**/
		    this.completeTemplate_depin = function(compateContext)
		    {

		    	var completeTemplate_depin_values = new Object();
		    	completeTemplate_depin_values.compateContext_code = compateContext.protype.temlate_tag_context
		    	completeTemplate_depin_values.html = "";
		    	completeTemplate_depin_values.lisonglin = 0;

		    	/***则例哟给你二路归并见关键字左右两边字符进行替换并每个关键字解析***/
		    	for(var i=0; i<compateContext.complate_values.length; i++) 
		    	{
		    		completeTemplate_depin_values.prototype_tags = "<s:"+compateContext.complate_values[i]+">";
		    		completeTemplate_depin_values.tag_indexOf = completeTemplate_depin_values.compateContext_code.indexOf(completeTemplate_depin_values.prototype_tags);
		           
		           	/****如果不是关键字，或则系统函数***/
		            if(this.is_tag_keyword_values(compateContext.complate_values[i]) == false) {
		            	if(0 == completeTemplate_depin_values.tag_indexOf) {

		            		completeTemplate_depin_values.html = "html=html+"+completeTemplate_depin_values.html+compateContext.complate_values[i] +"+";
		            	}else{
			  				completeTemplate_depin_values.replace_tags = completeTemplate_depin_values.compateContext_code.substr(0, completeTemplate_depin_values.tag_indexOf).replace(/(\"|\')/g,function(d1){
				    				return "\\"+d1;
				    		});

		            		completeTemplate_depin_values.html = "html=html+"+completeTemplate_depin_values.html +"\""+completeTemplate_depin_values.replace_tags+"\"+"+compateContext.complate_values[i]+"+";
		            	}
						completeTemplate_depin_values.compateContext_code = completeTemplate_depin_values.compateContext_code.substr((completeTemplate_depin_values.tag_indexOf+completeTemplate_depin_values.prototype_tags.length), completeTemplate_depin_values.compateContext_code.length);  
		    		}else{
		    			/***不作死，就不会死，看不懂就不要看***/

		    			if(0 == completeTemplate_depin_values.tag_indexOf) {
		    				completeTemplate_depin_values.html = completeTemplate_depin_values.html +"\'\';"+compateContext.complate_values[i] +"html=html+";
		    			}else{
			 				completeTemplate_depin_values.replace_tags = completeTemplate_depin_values.compateContext_code.substr(0, completeTemplate_depin_values.tag_indexOf).replace(/(\"|\')/g,function(d1){
					    				return "\\"+d1;
					    	});
		    				completeTemplate_depin_values.html =  completeTemplate_depin_values.html + "\'" + completeTemplate_depin_values.replace_tags + "\';";
		    				completeTemplate_depin_values.html =  completeTemplate_depin_values.html + compateContext.complate_values[i];
		    				completeTemplate_depin_values.html =  "html=html+"+completeTemplate_depin_values.html + "html=html+";
		    			}
						completeTemplate_depin_values.compateContext_code = completeTemplate_depin_values.compateContext_code.substr((completeTemplate_depin_values.tag_indexOf+completeTemplate_depin_values.prototype_tags.length), completeTemplate_depin_values.compateContext_code.length);  
		    		}

		    		if(i == compateContext.complate_values.length - 1) {
		    			completeTemplate_depin_values.html = completeTemplate_depin_values.html +"\'" +completeTemplate_depin_values.compateContext_code+"\'; ";
		    		}
		    	}
		    	completeTemplate_depin_values.html = completeTemplate_depin_values.html.substr(0,(completeTemplate_depin_values.html.length-1));
		    	return completeTemplate_depin_values;
		    }
		    /**编译成自己能解析的数据结构**/
		    this.completeTemplate = function(Context)
		    {

		    	var completeTemplate_values = new Object();
		    	completeTemplate_values.tags = "";
		    	completeTemplate_values.ds = "";
		    	completeTemplate_values.tmp_tags = Context.temlate_tag_context;
		    	completeTemplate_values.ks = new Array();
		    	completeTemplate_values.flag = false;
		        completeTemplate_values.kas = "";
		        completeTemplate_values.bs = "";
		        completeTemplate_values.tmp_tags_replace ="";
		
		//       completeTemplate_values.zs = Context.tag;
		//       completeTemplate_values.ks.push(Context.tag);
		              //  console.log(completeTemplate_values);
		        completeTemplate_values.zs =  Context.temlate_tag_context.replace(/<s:(.+?)>/g,function(d1,d2,d3){
		        		if(d2.indexOf("if")>=0) {
				        	 var temps  =   Context.temlate_tag_context.replace(/{\s*>/g,"{");
				        	 temps = temps.replace(/<s:/g,"");
				         	 completeTemplate_values.ks.push(temps);
		        			 return temps;
		        		}else{

		        			 completeTemplate_values.ks.push(d2);
		        			 return d2;
		        		}
			    });

			    if(completeTemplate_values.ks.length == 0) {
			        completeTemplate_values.tmp_tags_replace = completeTemplate_values.tmp_tags_replace = Context.temlate_tag_context.replace(/(\"|\')/g,function(d1){
			    		return "\\"+d1;
			    	});
			    	return "html = html+\'"+Context.temlate_tag_context+"\';";
			    }
			    if(completeTemplate_values.tmp_tags == "") {  return ""; }
			  	for(var i = 0; i<completeTemplate_values.ks.length; i++){
			 		if(this.is_tag_keyword_values(completeTemplate_values.ks[i]) == true){
			 		   completeTemplate_values.flag = true;
			 		}
			  	}

			  	if(completeTemplate_values.flag) {
			  		 completeTemplate_values.ds =  this.completeTemplate_depin({protype:Context,complate_values:completeTemplate_values.ks}).html;
			  	}else{
			  		 completeTemplate_values.bs = "html=html+"+this.completeTemplate_depin({protype:Context,complate_values:completeTemplate_values.ks}).html;
			  	}
			  	return (completeTemplate_values.ds+completeTemplate_values.bs);
		    }
		    /**依旧老套楼深度检测语法，说好听深度，说的不好听就是递归**/
			this.depin_check_language = function(context, dpin) {

				/**熟悉的递归，定义一个变量用来标示递归的深度***/
				if(dpin == null) {
					dpin = [];
					dpin.push("let html=\'\';");
				}
				depin_check_language_values.codeLength = context.length;
				/**将模板语法已换行切割成每条豫剧**/
				depin_check_language_values.runCodeLength  = context.indexOf("\n");
				depin_check_language_values.runCode = context.substr(0, depin_check_language_values.runCodeLength);
				depin_check_language_values.nex = context.substr(depin_check_language_values.runCodeLength + 1,depin_check_language_values.codeLength);
				depin_check_language_values.TagObject = new Object();	
				/**下面是算法的核心也是递归的精髓**/
				if(depin_check_language_values.runCodeLength > 1) {

				        depin_check_language_values.TagObject.tag = depin_check_language_values.runCode.trim().replace(/<s:(.+?)>/g,function(d1,d2,d3){
					 			tm  = d2;
						  		return tm;
						});
				        if(depin_check_language_values.TagObject.tag.indexOf("if") >= 0) {
				        	 depin_check_language_values.TagObject.tag  =  depin_check_language_values.runCode.trim().replace(/{\s*>/g,"{");
				         	 depin_check_language_values.TagObject.tag  =  depin_check_language_values.TagObject.tag.replace(/<s:/g,"");
				        }
				      
						depin_check_language_values.TagObject.tag =  depin_check_language_values.TagObject.tag.trim();
						if(0<=depin_check_language_values.runCode.trim().search("<s:(.+?)>")){
						    depin_check_language_values.TagObject.fag = true;
						}else{
							depin_check_language_values.TagObject.fag = false;
						}
						depin_check_language_values.TagObject.temlate_tag_context = depin_check_language_values.runCode.trim();
						dpin.push(this.completeTemplate(depin_check_language_values.TagObject));
				}else{
						depin_check_language_values.TagObject.tag = depin_check_language_values.nex.trim().replace(/<s:(.+?)>/g,function(d1,d2,d3){
						 			tm = d2;
							  		return d2;
						});
						if(depin_check_language_values.TagObject.tag.indexOf("if") >= 0) {
				        	 depin_check_language_values.TagObject.tag  =  depin_check_language_values.runCode.trim().replace(/{\s*>/g,"{");
				         	 depin_check_language_values.TagObject.tag  =  depin_check_language_values.TagObject.tag.replace(/<s:/g,"");
				        }
						
						depin_check_language_values.TagObject.tag =  depin_check_language_values.TagObject.tag.trim();
						if(0<=depin_check_language_values.runCode.trim().search("<s:(.+?)>")){
							depin_check_language_values.TagObject.fag = true;
						}else{
							depin_check_language_values.TagObject.fag = false;
						}
						depin_check_language_values.TagObject.temlate_tag_context =  depin_check_language_values.nex.trim();
				    //	this.completeTemplate(depin_check_language_values.TagObject);
				    	dpin.push(this.completeTemplate(depin_check_language_values.TagObject))
						
						return dpin;
				}
				return this.depin_check_language(depin_check_language_values.nex,dpin);
			}
		    result_object.ids =  id;
		    result_object.datas =  datas;
		    result_object.replaceTemplateVar = tag_keyword_values;
		    this.formatTemplate = function(script){
			/*	if(script.trim().indexOf(",") == 0){
					script = script.trim().substr(1,script.length);
					this.formatTemplate(script);
				}
				if(script.trim().indexOf("\"") == 0){
					script = script.trim().substr(1,script.length);
					this.formatTemplate(script);
				}
				if(script.trim().indexOf(";") == 0){
					script = script.trim().substr(1,script.length);
					this.formatTemplate(script);
				}
			*/
				return script;
		    }
		    /**运行代码**/
			this.RuncodeTemplate = function(TemplacteCodeArray,datas){
	
				let Codes = "";
				let script = "";
				let function_name  = "li_"+Date.parse(new Date())+"_songlin";
				result_object.function_name  = function_name;
			
		    	for(var i = 0; i<TemplacteCodeArray.length; i++) {
					script = script + this.formatTemplate(TemplacteCodeArray[i]);
				}
				script = script.replace(/;"";/g,function(d1){
					return ";";
				});
				script = script.replace(/=html\+html/g,function(d1){
					return "";
				});
				script = script.replace(/html=html\+"";/g,function(d1){
					return "";
				});
				result_object.script  = script;
				Codes = "(function(){return "+function_name+"={complate:function(){ "+script+" return html; }} })();"+function_name+".complate()";
				//result_object.script  = Codes;
				result_object.context  = eval(Codes);
				return result_object;
		    }
		    this.loader_template = function(id,fun){
		    	var template_ids = id+".lin";

	    		try { XMLHttpReq = new ActiveXObject('Msxml2.XMLHTTP');}catch(E) {  
		       		 try { XMLHttpReq = new ActiveXObject('Microsoft.XMLHTTP');}  
		        catch(E) { XMLHttpReq = new XMLHttpRequest();}  
		   		}  
			    if(XMLHttpReq) {
					XMLHttpReq.open('get', template_ids, true);					
					XMLHttpReq.send(null);
			    }
			    XMLHttpReq.onreadystatechange = function () { 
					switch (XMLHttpReq.readyState) {
						case 1:{break;}
						case 2:{break;}
						case 3:{break;}
						case 4:{
							if (XMLHttpReq.status == 200 || XMLHttpReq.status == 0) { 
								fun(XMLHttpReq.responseText);
							}
						}
					}
				}
		    }
		    if(tps == false) {
		 	   templateContext =  zy.get.Id(id).innerHTML.trim();
		 	   let  templateCodeArrays = this.depin_check_language(templateContext);
		 	   return this.RuncodeTemplate(templateCodeArrays,datas);
		    } else{
		       var _this = this;
		       return this.loader_template(id,function(e){
		       	 	
		       		 templateCodeArrays = _this.depin_check_language(e);
		       		 tps(_this.RuncodeTemplate(templateCodeArrays,datas));
		       });
		    }
			
		},
		 /**显示编译后的额结果代码**/
		display:function(id,template_object) {
			zy.get.Id(id).innerHTML = template_object.context;
		},
		string:{
			toJson:function(str) {
				if(zy.is.object(str))
				{
					return str;
				}
				return eval('('+str+')');
			},
			eqlower:function(str1, str2) {
				if(str1.toLowerCase() == str2.toLowerCase()){
				   return true;
				}
				return false;
			},
			utf8to16:function(str){
				var out, i, len, c;
				var char2, char3;
				out = "";
				len = str.length;
				i = 0;
				while(i < len) {
					c = str.charCodeAt(i++);
					switch(c >> 4) {
						case 0: case 1: case 2: case 3: case 4: case 5: case 6: 
						case 7:{
							out += str.charAt(i-1); break;
						}	
						case 12: case 13:{
							char2 = str.charCodeAt(i++);
							out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
							break;
						}
						case 14: {
							char2 = str.charCodeAt(i++);
							char3 = str.charCodeAt(i++);
							out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
							break;
						}
					}
					
				}
				return out;
			},
			base64encode:function(str){
				var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
				var base64DecodeChars = new Array(
										-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
										-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
										-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
										52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
										-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
										15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
										-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
										41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
				 var out, i, len;
				 var c1, c2, c3;
				 len = str.length;
				 i = 0;
				 out = "";
				 while(i < len) {
					 c1 = str.charCodeAt(i++) & 0xff;
					 if(i == len)
					 {
						 out += base64EncodeChars.charAt(c1 >> 2);
						 out += base64EncodeChars.charAt((c1 & 0x3) << 4);
						 out += "==";
						 break;
					 }
					 c2 = str.charCodeAt(i++);
					 if(i == len)
					 {
						 out += base64EncodeChars.charAt(c1 >> 2);
						 out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
						 out += base64EncodeChars.charAt((c2 & 0xF) << 2);
						 out += "=";
						 break;
					 }
					 c3 = str.charCodeAt(i++);
					 out += base64EncodeChars.charAt(c1 >> 2);
					 out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
					 out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
					 out += base64EncodeChars.charAt(c3 & 0x3F);
				 }
				 return out;
			},
			base64decode:function(str){
				var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
				var base64DecodeChars = new Array(
										-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
										-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
										-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
										52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
										-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
										15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
										-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
										41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
				var c1, c2, c3, c4;
				var i, len, out;
				len = str.length;
				i = 0;
				out = "";
			    while(i < len) 
			    {
			    	
			    	 do {
			    		 
			    		 c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
			    		 
			    	 }while(i < len && c1 == -1);
			    	 
			    	 if(c1 == -1) { break; }
			         
			    	 do {
			    		 c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
			    	 }while(i < len && c2 == -1);
			    	 
			    	 if(c2 == -1) { break; }
			    	
			    	 out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
			    	 do {
			    		 
			    		 c3 = str.charCodeAt(i++) & 0xff;
			    		 
			    		 if(c3 == 61) { return out; }
			    		 
			    		 c3 = base64DecodeChars[c3];
			    		 
			    	 }while(i < len && c3 == -1);
			    	 
			    	 if(c3 == -1) {  break; }
			    	 
			    	 out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
			    	 
			    	 do{
			    		 
			    		 c4 = str.charCodeAt(i++) & 0xff;
			    		 if(c4 == 61) {return out;}
			    		 c4 = base64DecodeChars[c4];
			    		 
			    	 }while(i < len && c4 == -1);
			    	 
			    	 if(c4 == -1) { break; }
			    	 
			    	 out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
				}
			    return string.utf8to16(out);
			}
		},
		is:{
			 set:function(str){
				return typeof(str) == 'undefined' ? false : str;
			 },
			 html5:function () {
				return (!/*@cc_on!@*/~0x1111111111111111) ? false : true;
			 },
			 tel:function(tel){
				var pattern = /^1[34578]\d{9}$/;  
			    if (pattern.test(tel)) {  
			        return tel;  
			    }
			    return false;  
			 },
			 card:function(sId){
	 			var card_area={
					 
	                11:'北京', 12:'天津', 13:'河北', 14:'山西', 21:'辽宁', 15:'内蒙古',
	 
	                22:'吉林', 31:'上海', 32:'江苏', 33:'浙江', 34:'安徽', 23:'黑龙江',
	 
	                35:'福建', 36:'江西', 37:'山东', 41:'河南', 42:'湖北', 43:'湖南',
	 
	                44:'广东', 45:'广西', 46:'海南', 50:'重庆', 51:'四川', 52:'贵州',
	 
	                53:'云南', 54:'西藏', 61:'陕西', 62:'甘肃', 63:'青海', 64:'宁夏',
	 
	                65:'新疆', 71:'台湾', 81:'香港', 82:'澳门', 91:'国外'
	 
	            };
	            var iSum=0
	            var info=''
	            var card_info=Array(2);
	            var error = '';
	            sId=sId.replace(/x$/i,'a');             
	            
	            if (0 == sId.length)
	            {            
	               error = '请填写你的身份证';
	               return false;
	            } 
	            
	            if (null == card_area[parseInt(sId.substr(0,2))]) 
	            {
	            
	               error = '非法证件你的地区填写有错误请仔细填写';
	               return false;
	            }
	            
	            sBirthday=sId.substr(6,4)+'-'+Number(sId.substr(10,2)) + '-'+Number(sId.substr(12,2));
	            var d = new Date(sBirthday.replace(/-/g,'/'));
	 
	            if (sBirthday!=(d.getFullYear()+'-'+ (d.getMonth()+1) + '-' + d.getDate()))  {
	               error = '非法证件你的生日填写有错误请仔细填写';
	               return false;
	            }
	           
	            for(var i = 17; i>=0; i--){
	                iSum += (Math.pow(2,i) % 11) * 
	                parseInt(sId.charAt(17 - i),11)
	            }           
	 
	            if (1 != iSum%11){
	               error = '非法证号你确认你是地球人请认真填写哦~~~~'; 
	               return false;
	            }
	            if (sId.length>19){
	            	error = '你确认你的身份证是有效证件？';
	                return false;
	            }
	            
	            card_info[0] = card_area[parseInt(sId.substr(0, 2))];
	            card_info[1] = sBirthday;
	            card_info[2] = sId.substr(16, 1) % 2 ? '男' : '女';
	            return card_info;
			 },
			 object:function(type) {
				return 'object' == typeof(type) ? true:false;
			 },
		 	 string:function(type) {
				return 'string' == typeof(type) ? true:false;
			 },
			 int:function(type) {
				if ('number' == typeof(type)) {
					if(0 > type.toString().indexOf('.')) {
						return true;
					}
				}
				return false;
		 	 },
		 	 double:function(type) {
				if('number' == typeof(type)) {
					if (0<=type.toString().indexOf('.')) {
						return true;
					}
				}
				return false;
		 	 }
		},
		add:{
			Dom:function(obj, dom) {
		        var dom = document.createElement(dom);
		        zy.get.Id(obj).appendChild(dom);
		        return dom
		    },
		    Attr: function(obj, key, value) {
		        var styledata = value;
		        if (zy.is.object(value)) {
		            styledata = '';
		            for (json in value) {
		                styledata += json + ':' + value[json] + ';'
		            }
		        }
		        obj.setAttribute(key, styledata);
		        return obj
		    }
		},
		/**注意跨域只能同级域名*/
		Ajax:{
			Call:function(json){
				var json = zy.is.object(json)?json:zy.string.toJson(json);
				let type = (json.type == undefined) || (json.type == '') ? 'get' : json.type;
				let url = (json.url == undefined) || (json.url == '') ? console.log('请求url不能为空') : json.url;
				let header = (json.header == undefined) || (json.header == "") ? [{'Content-Type':'application/x-www-form-urlencoded'}]:json.header;
				let success_callback =  (json.success == undefined) || (json.success == '') ? '' : json.success;
				let dataType = (json.dataType == undefined) || (json.dataType == '') ? 'json' : json.dataType;
				let jsonp = (json.jsonp == undefined) || (json.jsonp == '') ? false: json.jsonp;
				let data = "";

				if(json.data != undefined) {
					if(zy.is.object(json.data)) {
						for(d in json.data) {
						  data = data + d + '=' + json.data[d] + '&';
						}
						if(zy.string.eqlower(type,'get')) {
							data ='?' +  data.substring(0, data.length-1);
						}

					}else{
						 if(json.data.length>=1) {
							data  = json.data.indexOf('?') < 0 ? '?'+json.data:json.data+'';
						}
					}
				}
				if(jsonp){
					var body = zy.get.body();
					var ifram_ids_name = "lin_"+Date.parse(new Date());
					if (zy.string.eqlower(type, 'post')) {		
						var ifm = zy.add.Dom(body,"iframe");
						zy.add.Attr(ifm,"id",ifram_ids_name);
						zy.add.Attr(ifm,"style",{"display":"none"});
						var ifmobj = window.frames[ifram_ids_name].contentWindow.document;
						let forms = "<form id=\""+ifram_ids_name+"_forms\" action=\""+url+"\" method=\""+type+"\"   enctype=\"multipart/form-data\">";
						if(json.data != undefined) {
							for(d in json.data) {
								forms = forms +"\n<input name=\""+d+"\" value=\""+json.data[d]+"\"/>";
							}
							forms = forms + "\n</form>";
						}
					 	ifmobj.body.innerHTML = forms;
					 	window.onload=function(){
 						    var script = ifmobj.createElement("script");
 						    ifmobj.body.appendChild(script);
 						    script.innerHTML = "(function(){document.getElementById(\""+ifram_ids_name+"_forms\").submit();})();";
    						window.frames[ifram_ids_name].onload = function(){
    							try{
    								if(this.contentWindow.hasOwnProperty("document")) {
		    							  if (zy.string.eqlower(dataType,'json')) {
		    							 	success_callback(zy.string.toJson(this.contentWindow.document.body.innerHTML));
		    							  }else{
		    								success_callback(this.contentWindow.document.body.innerHTML);
		    							  }
    								}
    							}catch(e) {
    							}
    						}
					 	}
					}
					return ;		
			
				}
				try {let XMLHttpReq = new ActiveXObject('Msxml2.XMLHTTP');}catch(E) {  
			        try { let XMLHttpReq = new ActiveXObject('Microsoft.XMLHTTP');}  
			        catch(E) { let XMLHttpReq = new XMLHttpRequest();}  
			    }  

			    if(XMLHttpReq) {
					if (zy.string.eqlower(type, 'post')) {					
						XMLHttpReq.open('post', url, true);
						for (headers in header) {
							for(h in header[headers]) {
							    XMLHttpReq.setRequestHeader(h, header[headers][h]);
							}
						}
						XMLHttpReq.send(data);
					}else if (zy.string.eqlower(type, 'get')) {
						XMLHttpReq.open('get', url+data, true);					
						XMLHttpReq.send(null);
					}
			    }
				XMLHttpReq.onreadystatechange = function () { 
					setTimeout(function(){
						switch (XMLHttpReq.readyState) {
							case 1:{break;}
							case 2:{break;}
							case 3:{break;}
							case 4:{
								if (XMLHttpReq.status == 200 || XMLHttpReq.status == 0) { 
									if(success_callback != '') {
									   if (zy.string.eqlower(dataType,'json')) {
										   //console.log(zy.string.toJson(XMLHttpReq.responseText));
										   success_callback(zy.string.toJson(XMLHttpReq.responseText));
									   }else{
										   success_callback(XMLHttpReq.responseText);
									   }
									}
								}
							}
						}
					},100);
				}
			}
		},
		animate:{
			loaderPages:function(id){
				var mobileHeight=window.innerHeight;
				let html = '<div id="pgs" class="out">';
				html = html + '<div class="fade-in"><div class="container">';
				html = html+'<div class="one common"></div><div class="two common"></div><div class="three common"></div><div class="four common"></div><div class="five common"></div><div class="six common"></div><div class="seven common"></div><div class="eight common"></div></div>';
				html = html + '<div class="bar"><div class="progress"></div></div>';
				html = html +'</div></div>';
				zy.get.Id(id).innerHTML = html;
				anHeight = zy.get.Id("pgs").offsetHeight;
				zy.get.Id("pgs").style.marginTop=mobileHeight/2-anHeight +"px";
			}
		},
		get:{
			Id:function(obj,fun){
				 if(undefined == fun) {
					 return  zy.is.object(obj) ? obj : (document.getElementById(obj));
				 }else{
				 	var cls_zy_intval_get_id = setInterval(function(){
						objs = document.getElementById(obj);
				 		if(null != objs){
				 			fun(objs);
				 			clearInterval(cls_zy_intval_get_id);
				 		}
				 	},100);
				 }
			},
			Attr:function(id,attr_str,fun){
				 if(undefined == fun) {
					 return zy.get.Id(id).getAttribute(attr_str);
				 }else{
					 zy.get.Id(id,function(callback){
						 fun(callback.getAttribute(attr_str));
					 });
				 }
			},
			body:function(){
			 	 return document.body;
			},
			Tag:function(obj, Tagname) {
				return zy.get.Id(obj).getElementsByTagName(Tagname);
			},
			Name:function (Name) {
			 	 return document.getElementsByName(Name);
			},
			urlencode:function (str) {
				 return document.getElementsByName(Name);
			},
			Os:function(){
				var OsObject = "";  
				if(navigator.userAgent.indexOf("MSIE")>0) {  
					 return "MSIE";  
				}  
				if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
					 return "Firefox";  
				}  
				if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
					 return "Safari";  
				}   
				if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
					 return "Camino";  
				}  
				if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
					 return "Gecko";  
				}  
			},
			Param : function (name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
				var r = window.location.search.substr(1).match(reg); 
				
				if (null != r) 
				{
					return unescape(r[2]);
				}
				return null;
			}, 
			Request:function() {
				 var url = location.search; 
					var theRequest = new Object(); 
					if (url.indexOf("?") != -1) 
					{ 
						var str = url.substr(1);
						var i = 0;
						strs = str.split("&"); 
						while (i<strs.length)
						{
							theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
							i = -~1;
						}
					} 
				 return theRequest;
			 }
		}
	}
})();
