window.onload=function(){
	/*摄像基地切换效果*/
	var liS=document.getElementsByClassName("nav-ul-ul")[0].children;//获取li-title的dom集合
	var navpTextParent=document.getElementsByClassName("nav-p")[0].children[3];//父标题dom元素
	var navpTextChildren=document.getElementsByClassName("nav-p")[0].children[5];//子标题dom元素
	var navListPFirstS=liS[0].getElementsByClassName("nav-ul-list")[0].children;//获取默认展开的nav-list的dom集合
	var divS=document.getElementsByClassName("nav-content-div")//获取展示内容的div的dom集合
	var navUlTitleDivS=document.getElementsByClassName("nav-ul-title");
	var ImgS=["images2/长网页子页_09.png","images2/长网页子页1_12.png","images2/长网页子页1_15.png","images2/长网页子页2_05.png","images2/长网页子页2_08.png","images2/长网页子页3_05.png"];
	var ImgSCopy=["images2/长网页子页_09.png","images2/长网页子页1_12.png","images2/长网页子页1_15.png","images2/长网页子页2_05.png","images2/长网页子页2_08.png","images2/长网页子页3_05.png"];
	//初始化执行
	navListP(navListPFirstS);
	ImgSList(navListPFirstS[0]);
	//切换li-list后执行
	for(var i=0;i<liS.length;i++){
		liS[i].onclick=function (){
			if(this.getElementsByTagName("span")[0].innerHTML == "+"){
				var navListPS=this.getElementsByClassName("nav-ul-list")[0].children;//获取li-nav-list的dom集合
				for(var i=0;i<liS.length;i++){
					navUlTitleDivS[i].children[0].setAttribute("class","");
					liS[i].setAttribute("class","");
					navListPS[i].setAttribute("class","");
					divS[i].setAttribute("class","nav-content-div ");
					liS[i].getElementsByTagName("span")[0].innerHTML="+";
				}
				navUlTitleDivS[this.getAttribute("data-dy")*1].children[0].setAttribute("class","active");
				resetImgList();
				//切换li-list后设置nav-list p默认状态
				navListPS[0].setAttribute("class","nav-ul-list-p");
				//为初始化的nav-list默认第一个nav-list p绑定 按钮（轮播）图片响应事件
				ImgSList(navListPS[0]);
				//切换li-list后设置nav-content div默认状态
				// divS[this.getAttribute("data-dy")*1].setAttribute("class","nav-content-div active");
				divS[0].setAttribute("class","nav-content-div active");
				//切换li-list后设置nav p children text默认状态
				navpTextChildren.innerHTML=navListPS[0].innerHTML;
				//切换li-list后设置nav p parent text默认状态
				navpTextParent.innerHTML=this.children[0].children[1].innerHTML;
				//切换li-list后设置nav list span默认状态
				this.getElementsByTagName("span")[0].innerHTML="-";
				//切换li-list后设置nav list li默认状态
				this.setAttribute("class","active");
				//为nav list p绑定点击事件
				navListP(navListPS);
			}
			
		}
	}
	//nav-list切换
	function navListP(navList){
		for(var i=0;i<navList.length;i++){
			navList[i].onclick=function (){
				for(var i=0;i<navList.length;i++){
					navList[i].setAttribute("class","");
					divS[i].setAttribute("class","nav-content-div nav-content-d");
				}
				resetImgList();
				this.setAttribute("class","nav-ul-list-p");
				divS[this.getAttribute("data-dy")*1].setAttribute("class","nav-content-div active");
				navpTextChildren.innerHTML=this.innerHTML;
				ImgSList(this);
			}
		}
		return 0;
	}
	function ImgSList(navList){
		//在当前nav list 里为 当前的nav-content div设置 按钮（轮播）图片响应事件
		var navShowImgS=divS[navList.getAttribute("data-dy")*1].getElementsByClassName("nav-show-img-a")//换取轮播图的dom集合
		var navShowPS=divS[navList.getAttribute("data-dy")*1].getElementsByClassName("nav-show-img-p")//获取按钮dom集合
			for(var i=0;i<navShowPS.length;i++){
				navShowPS[i].onclick=function (){
					if(this.children[0].innerHTML == "&gt;"){
						ImgS.concat(ImgS.push(ImgS.shift()));
					}else{
						ImgS.concat(ImgS.unshift(ImgS.pop()));
					}
					for(var i=0;i<navShowImgS.length;i++){
						navShowImgS[i].children[0].setAttribute("src",ImgS[i]);
					}
				}
			}
		return 0;
	}
	function resetImgList(){
		//切换li-list后设置nav-show Img默认状态
		for(var j=0;j<divS.length;j++){
			var navShowImgS=divS[j].getElementsByClassName("nav-show-img-a")//换取轮播图的dom集合
			for(var i=0;i<navShowImgS.length;i++){
				navShowImgS[i].children[0].setAttribute("src",ImgSCopy[i]);
			}
		}
		return 0;
	}
}