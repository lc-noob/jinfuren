window.onload=function(){
	/*flag
		获得焦点：2
		error：1
		success：3
	*/
	var userRegExp=/^[\s\S]*.*[^\s][\s\S]*$/;//不能全部为空的1-16字符
	var RegExpNULL=/\s/;//没有空字符找到一个就停止直接返回
	var pwdRegExpLength=/^.{8,16}$/;//长度验证最多16位字符
	var pwdRegExp=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!?_])[A-Za-z\d!?_]{3,}$/;//不能单独字母或者数字，符号只能为？！_并且长度8-16字符
	var reg=/^(?![\d]+$)(?![A-Za-z]+$)[\dA-Za-z]{3,10}$/;
	var phoneRegExp=/^(\+86|0086)?\s*1[3-9]\d{9}$///电话号码的正则
	var focusFlag=2,errorFlag=1,successFlag=3;
	var form=document.getElementsByClassName("content-form")[0];
	var inputS=form.getElementsByClassName("inputs");//输入框dom集合
	var verifiticationImg=document.getElementsByClassName("verification-img")[0];//获取验证码的dom元素
	var pwdS=document.getElementsByClassName("pwd")[0].children[0]//获取密码inputdom元素
	var pwdP=document.getElementsByClassName("pwd-p");//获取密码提示元素的dom集合
	var pwdSpan=document.getElementsByClassName("pwd")[0].children[2]////获取密码input span dom元素
	var verification=document.getElementsByClassName("verification-number")[0].children[0];//获取验证码的dom元素
	var submit=document.getElementsByClassName("submit")[0]//获取注册按钮的dom元素
	var calousel=document.getElementsByClassName("calousel")[0].children[0];//获取轮播图的dom元素
	var calouselImgS=["imgqq/01-4.jpg","imgqq/01_3.jpg","imgqq/01_1.jpg"];
	var Timer;//计数器
	var codeS;//保存验证码
	//创建一个计时器

	Timer=setInterval(calouselImg,4000);
	SetVerification();//设置一个验证码
	
	for(var i=0;i<inputS.length;i++){
		//给inputs元素的第一个子元素（input）绑定事件
		inputS[i].children[0].onfocus=function (){
			//input获取焦点设置边框样式
			SetColor(this.parentNode,focusFlag);
			//input获取焦点根据input类型设置样式
			InputNameSelect(this.getAttribute("name"),this,event.type);
		}
		inputS[i].children[0].onblur=function (){
			InputNameSelect(this.getAttribute("name"),this,event.type);
		}
	}
	//为注册按钮绑定个点击事件
	form.onsubmit=function(){
		if(!(verification.getAttribute("data-flag")*1)==1){
			SetVerification();
			return false;
		}
		for(var i=0;i<inputS.length;i++)
		{
			if(!(inputS[i].children[0].getAttribute("data-flag")*1)==1){
				SetVerification();
				return false;
			}
		}
		return true;
	}
	//给验证码元素添加一个点击事件
	verifiticationImg.addEventListener("click",upVerification);
	//为输入验证码框绑定个失去焦点事件
	verification.addEventListener("blur",verificationNumber);
	//为pwd span 绑定 mousedown（鼠标按下）事件
	pwdSpan.addEventListener("mousedown",function(){
		InputNameSelect(this.getAttribute("name"),this,event.type);
	});
	//为pwd span 绑定 mouseup（鼠标松开）事件
	pwdSpan.addEventListener("mouseup",function(){
		InputNameSelect(this.getAttribute("name"),this,event.type);
		
	});
	//为pwd input 绑定 input响应事件
	pwdS.addEventListener("input",function(){
		pwdFocus(this);
	});
	function calouselImg(){
		calouselImgS.push(calouselImgS.shift());
		calousel.setAttribute("src",calouselImgS[0]);
		return 0;
	}
	//判断不同的input类型
	function InputNameSelect(InputType,NewElement,event){
		switch(InputType){
			case "phone":
				event == "blur" ? InputBlur(NewElement) : (NewElement.parentNode.nextElementSibling.children[0].setAttribute("class",""),NewElement.parentNode.setAttribute("class","inputs"));
				break;
			case "visible":
			case "pwd":
				event == "blur"  ? (pwdSpan.getAttribute("data-flag")==1 ? "" : InputBlur(NewElement)): (event == "focus" ? (NewElement.parentNode.nextElementSibling.children[0].setAttribute("class",""),pwdFocus(NewElement)) : "");
				event == "mousedown" ? (NewElement.previousElementSibling.previousElementSibling.setAttribute("type","text"),NewElement.setAttribute("data-flag",1)) : (event == "mouseup" ? (NewElement.previousElementSibling.previousElementSibling.setAttribute("type","password"),NewElement.setAttribute("data-flag",0),InputBlur(pwdS)): "");
				break;
			case "user":
				event == "blur" ? InputBlur(NewElement) : (NewElement.parentNode.nextElementSibling.children[0].setAttribute("class",""),NewElement.parentNode.setAttribute("class","inputs"));
		}
		return 0;
	}
	
	//进行正则验证
	function TestRegExp(NewElement){
		var flag=[];
		switch(NewElement.getAttribute("name")){
			case "pwd":
				flag.push(!RegExpNULL.test(NewElement.value));//非空验证
				flag.push(pwdRegExpLength.test(NewElement.value));//长度验证
				flag.push(pwdRegExp.test(NewElement.value));//规则验证
				break;
			case "user":
				flag.push(userRegExp.test(NewElement.value));//不能全部为空
				break;
			case "phone":
				flag.push(phoneRegExp.test(NewElement.value));
		}
		return flag;
	}
	
	//pwd元素获取焦点时根据正则判断设置 input独有的样式
	function pwdFocus(NewElement){
		//显示查看按钮
		NewElement.value.length ? pwdSpan.setAttribute("class","values") : pwdSpan.setAttribute("class","");
		//设置pwd input当前样式
		NewElement.parentNode.nextElementSibling.children[2].setAttribute("class","mask");
		NewElement.parentNode.nextElementSibling.children[1].setAttribute("class","active");
		NewElement.nextElementSibling.setAttribute("class","");
		NewElement.parentNode.setAttribute("class","inputs pwd bulr");
		var flag=TestRegExp(NewElement);
		for(var i=0;i<flag.length;i++){
			pwdP[i].setAttribute("class","pwd-p focus");
			flag[i] ? pwdP[i].children[0].setAttribute("class","i-success") : pwdP[i].children[0].setAttribute("class","i-info");
		}
		return 0;
	}
	
	//pwd元素失去焦点时根据正则判断设置 input独有的样式
	function InputBlur(NewElement){
		var flag=TestRegExp(NewElement);
		//input pwd的提示样式全部初始化
		for(var i=0;i<3;i++){
			pwdP[i].setAttribute("class","pwd-p");
			pwdP[i].children[0].setAttribute("class","");
		}
		if(flag.length == 1){
			if(flag[0]){
				NewElement.parentNode.setAttribute("class","inputs");
				NewElement.nextElementSibling.setAttribute("class","div-success");
				NewElement.parentNode.nextElementSibling.children[0].setAttribute("class","");
				SetColor(NewElement.parentNode,successFlag);
				DataTrue(NewElement,true);
			}else{
				NewElement.parentNode.setAttribute("class","inputs bulr");
				NewElement.parentNode.nextElementSibling.children[0].setAttribute("class","p-error");
				NewElement.nextElementSibling.setAttribute("class","");
				SetColor(NewElement.parentNode,errorFlag);
				DataTrue(NewElement,false);
			}
		}else{
			for(var i=0;i<flag.length;i++){
				if(!flag[i]){
					NewElement.parentNode.setAttribute("class","inputs bulr");
					NewElement.parentNode.nextElementSibling.children[0].setAttribute("class","p-error");
					NewElement.parentNode.nextElementSibling.children[2].setAttribute("class","ver-mask");
					NewElement.parentNode.nextElementSibling.children[1].setAttribute("class","ver-pwd");
					SetColor(NewElement.parentNode,errorFlag);
					DataTrue(NewElement,false);
					return false;
				}
			}
			DataTrue(NewElement,true);
			pwdSpan.setAttribute("class","");
			NewElement.parentNode.nextElementSibling.children[2].setAttribute("class","ver-mask");
			NewElement.parentNode.nextElementSibling.children[1].setAttribute("class","ver-pwd");
			NewElement.nextElementSibling.setAttribute("class","div-success");
			SetColor(NewElement.parentNode,successFlag);
		}
		return 0;
	}
	
	//验证输入的验证码
	function verificationNumber(){
		verification.value.toUpperCase() == codeS.toUpperCase() ? DataTrue(this,true) : DataTrue(this,false);
		return 0;
	}
	//设置一个自定义属性来保持验证的结果
	function DataTrue(NewElement,flag){
		NewElement.setAttribute("data-flag",flag*1);
		return 0;
	}

	//设置input边框样式
	function SetColor(NewElement,flag){
		switch(flag*1){
			case 1:
				NewElement.style.borderColor="red";
				break;
			case 2:
				NewElement.style.borderColor="blue";
				break;
			case 3:
				NewElement.style.borderColor="#aaa";
		}
		return 0;
	}
	
	
	//更新验证码
	function upVerification(){
		SetVerification();
		return 0;
	}
	//向页面设置验证码
	function SetVerification(){
		codeS=randVerification();
		verifiticationImg.innerHTML=codeS;
		return 0;
	}
	/*生成一个随机验证码*/
	function randVerification(){
		var strS="",code="";
		for(var i=48;i<=57;i++)
			strS += String.fromCharCode(i);
		for(var i=65;i<=90;i++)
			strS += String.fromCharCode(i);
		for(var i=97;i<=122;i++)
			strS += String.fromCharCode(i);
		while(code.length<4){
			var rand=Math.floor(Math.random()*(strS.length));
			code.indexOf(strS[rand]) == -1 ? (code+=strS[rand]) : '';
		}
		return code;
	}

}