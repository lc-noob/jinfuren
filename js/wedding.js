window.onload=function (){
	var liS=document.getElementsByClassName("nav-ul-ul")[0].children;//获取li-title的dom集合
	var navpTextParent=document.getElementsByClassName("nav-p")[0].children[3];//父标题dom元素
	var divS=document.getElementsByClassName("nav-content-div")//获取展示内容的div的dom集合
	var navUlTitleDivS=document.getElementsByClassName("nav-ul-title");
	for(var i=0;i<liS.length;i++){
		liS[i].onclick=function (){
			if(this.getElementsByTagName("span")[0].innerHTML == "+"){
				for(var i=0;i<liS.length;i++){
					navUlTitleDivS[i].children[0].setAttribute("class","");
					liS[i].setAttribute("class","");
					divS[i].setAttribute("class","nav-content-div wedding-content");
					liS[i].getElementsByTagName("span")[0].innerHTML="+";
				}
				navUlTitleDivS[this.getAttribute("data-dy")*1].children[0].setAttribute("class","active");

				divS[this.getAttribute("data-dy")*1].setAttribute("class","nav-content-div wedding-content active");
				//切换li-list后设置nav p parent text默认状态
				navpTextParent.innerHTML=this.children[0].children[1].innerHTML;
				//切换li-list后设置nav list span默认状态
				this.getElementsByTagName("span")[0].innerHTML="-";
				//切换li-list后设置nav list li默认状态
				this.setAttribute("class","active");
				//为nav list p绑定点击事件
			}
			
		}
	}
	//nav-list切换
	function navListP(navList){
		for(var i=0;i<navList.length;i++){
			navList[i].onclick=function (){
				for(var i=0;i<navList.length;i++){
					navList[i].setAttribute("class","");
					divS[i].setAttribute("class","nav-content-div wedding-content");
				}
				this.setAttribute("class","nav-ul-list-p");
				divS[this.getAttribute("data-dy")*1].setAttribute("class","nav-content-div wedding-content active");
				navpTextChildren.innerHTML=this.innerHTML;
				ImgSList(this);
			}
		}
		return 0;
	}
	
	
	
}