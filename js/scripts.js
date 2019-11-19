window.onload=function(){
	/*轮播图*/
	var imgInterface=document.getElementsByClassName("higt-img")[0];
	var imgSs=document.getElementsByClassName("higt-img")[0].getElementsByTagName("img");
	var btnS=document.getElementsByClassName("higt")[0].getElementsByTagName("button");
	var liS=document.getElementsByClassName("higt")[0].getElementsByTagName("li");
	var btnS=document.getElementsByClassName("higt")[0].getElementsByTagName("button");
	var k=0;
	var Timer;
	for(var i=0; i<btnS.length;i++){
		btnS[i].onclick=function (){
			higtCarousel(k*1,this.innerHTML)
		}
	}
	
	for(var j=0;j<liS.length; j++){
		liS[j].onclick=function(){
			higtCarousel((this.getAttribute("data-dy"))*1);
		}
	}
	Timer=setInterval(function(){
		higtCarousel(k*1,"&gt;");
	},4000);
	
		imgInterface.addEventListener("mouseover",function(){
			clearInterval(Timer);
			Timer=null;
		});
	
		imgInterface.addEventListener("mouseout",function(){
			Timer=setInterval(function (){
				higtCarousel(k*1,"&gt;");
			},4000);
		});
	
	function higtCarousel(subscript,flag){
		switch(flag){
			case "&gt;" :
				subscript+1 == 3 ? subscript=0 : subscript++; 
				break;
			case "&lt;" :
				subscript-1 == -1 ? subscript=2 :subscript--; 
		}
		for(var i=0; i<imgSs.length; i++){
			imgSs[i].setAttribute("class","");
			liS[i].setAttribute("class","");
		}
		imgSs[subscript].setAttribute("class","active");
		liS[subscript].setAttribute("class","active");
		k=subscript;
	}
	

}