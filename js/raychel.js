/*
* Raychel - Frontend Framework
* Desarrollado por el equipo Debred - contacto@debred.com
* Version Beta2.0
*/
var raychel = function(){};

/***********************************Funcion de smoove.**********************/
raychel.smoove = function(smooveElements,topElement,dimension){
	window.addEventListener('scroll',function(){
		var smooveElementsJS = document.querySelectorAll(smooveElements);
		var highest = document.documentElement.scrollTop ||
				document.body.parentNode.scrollTop ||
				document.body.scrollTop;
		var topElementJS = document.querySelector(topElement);

		if( dimension == "3d" ){
			if( highest >= offset(topElementJS).top ){
				smooveElementsJS.forEach(function(i){
					i.setAttribute('id','smoove-3d');
					i.setAttribute('data-state','show');
				});
			}else{
				smooveElementsJS.forEach(function(i){
					i.setAttribute('id','smoove-3d');
					i.setAttribute('data-state','hide');
				});
			}
		}else{
			if( highest >= offset(topElementJS).top ){
				smooveElementsJS.forEach(function(i){
					i.setAttribute('id','smoove-up');
					i.setAttribute('data-state','show');
				});
			}else{
				smooveElementsJS.forEach(function(i){
					i.setAttribute('id','smoove-up');
					i.setAttribute('data-state','hide');
				});
			}
		}
	});
};
raychel.smooveSeveral = function(smooveElements,topElement,number,dimension){
	window.addEventListener('scroll',function(){
		var smooveElementsJS = document.querySelectorAll(smooveElements);
		var highest = document.documentElement.scrollTop ||
				document.body.parentNode.scrollTop ||
				document.body.scrollTop;
		var topElementJS = document.querySelector(topElement);

		if( dimension == "3d" ){
			if( number == 3 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement3d');
					smooveElementsJS[1].setAttribute('id','secondelElement3d');
					smooveElementsJS[2].setAttribute('id','thirdElement3d');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement3d-remove');
					smooveElementsJS[1].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[2].setAttribute('id','thirdElement3d-remove');
				}
			}else if( number == 4 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement3d');
					smooveElementsJS[1].setAttribute('id','secondelElement3d');
					smooveElementsJS[2].setAttribute('id','secondelElement3d');
					smooveElementsJS[3].setAttribute('id','thirdElement3d');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement3d-remove');
					smooveElementsJS[1].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[2].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[3].setAttribute('id','thirdElement3d-remove');
				}
			}else if( number == 5 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement3d');
					smooveElementsJS[1].setAttribute('id','secondelElement3d');
					smooveElementsJS[2].setAttribute('id','secondelElement3d');
					smooveElementsJS[3].setAttribute('id','secondelElement3d');
					smooveElementsJS[4].setAttribute('id','thirdElement3d');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement3d-remove');
					smooveElementsJS[1].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[2].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[3].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[4].setAttribute('id','thirdElement3d-remove');
				}
			}else if( number == 6 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement3d');
					smooveElementsJS[1].setAttribute('id','secondelElement3d');
					smooveElementsJS[2].setAttribute('id','secondelElement3d');
					smooveElementsJS[3].setAttribute('id','secondelElement3d');
					smooveElementsJS[4].setAttribute('id','secondelElement3d');
					smooveElementsJS[5].setAttribute('id','thirdElement3d');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement3d-remove');
					smooveElementsJS[1].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[2].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[3].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[4].setAttribute('id','secondelElement3d-remove');
					smooveElementsJS[5].setAttribute('id','thirdElement3d-remove');
				}
			}
		}else{
			if( number == 3 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement');
					smooveElementsJS[1].setAttribute('id','secondElement');
					smooveElementsJS[2].setAttribute('id','thirdElement');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement-remove');
					smooveElementsJS[1].setAttribute('id','secondElement-remove');
					smooveElementsJS[2].setAttribute('id','thirdElement-remove');
				}
			}else if( number == 4 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement');
					smooveElementsJS[1].setAttribute('id','secondElement');
					smooveElementsJS[2].setAttribute('id','secondElement');
					smooveElementsJS[3].setAttribute('id','thirdElement');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement-remove');
					smooveElementsJS[1].setAttribute('id','secondElement-remove');
					smooveElementsJS[2].setAttribute('id','secondElement-remove');
					smooveElementsJS[3].setAttribute('id','thirdElement-remove');
				}
			}else if( number == 5 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement');
					smooveElementsJS[1].setAttribute('id','secondElement');
					smooveElementsJS[2].setAttribute('id','secondElement');
					smooveElementsJS[3].setAttribute('id','secondElement');
					smooveElementsJS[4].setAttribute('id','thirdElement');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement-remove');
					smooveElementsJS[1].setAttribute('id','secondElement-remove');
					smooveElementsJS[2].setAttribute('id','secondElement-remove');
					smooveElementsJS[3].setAttribute('id','secondElement-remove');
					smooveElementsJS[4].setAttribute('id','thirdElement-remove');
				}
			}else if( number == 6 ){
				if( highest >= offset(topElementJS).top ){
					smooveElementsJS[0].setAttribute('id','firstElement');
					smooveElementsJS[1].setAttribute('id','secondElement');
					smooveElementsJS[2].setAttribute('id','secondElement');
					smooveElementsJS[3].setAttribute('id','secondElement');
					smooveElementsJS[4].setAttribute('id','secondElement');
					smooveElementsJS[5].setAttribute('id','thirdElement');
				}else{
					smooveElementsJS[0].setAttribute('id','firstElement-remove');
					smooveElementsJS[1].setAttribute('id','secondElement-remove');
					smooveElementsJS[2].setAttribute('id','secondElement-remove');
					smooveElementsJS[3].setAttribute('id','secondElement-remove');
					smooveElementsJS[4].setAttribute('id','secondElement-remove');
					smooveElementsJS[5].setAttribute('id','thirdElement-remove');
				}
			}
		}
	});
};


/***********************************Menu OffCanvas.**********************/
raychel.menuOffCanvas = function(){
	var btnMenuJS = document.querySelector('#btnMenu');
	var contMenuJS = document.querySelector('#contMenu');
	var contMainJS = document.querySelector('#contMain');
	btnMenuJS.addEventListener('click',function(){
		if( contMenuJS.getAttribute('data-state') == 'open' )
			contMenuJS.setAttribute('data-state','hide');
		else	contMenuJS.setAttribute('data-state','open');

		if( contMainJS.getAttribute('data-state') == 'open' )
			contMainJS.setAttribute('data-state','hide');
		else	contMainJS.setAttribute('data-state','open');
	});

	var mediaQuery = window.matchMedia('(max-width: 800px)');
	function changeSize(mq){
		if( mq.matches )
			if( contMenuJS.getAttribute('data-state') == 'open' && contMainJS.getAttribute('data-state') == 'open' ){
				 contMenuJS.setAttribute('data-state','hide');
				 contMainJS.setAttribute('data-state','hide');
			}
	}
		mediaQuery.addListener(changeSize);
		changeSize(mediaQuery);
};


/***********************************Menu DropDown.**********************/
raychel.munuDropDown = function(btn,cont){
	var btnJS = document.querySelector(btn);
	var contJS = document.querySelector(cont);
	btnJS.addEventListener('click',function(){
		if( contJS.getAttribute('data-state')  == 'reveal' )
			contJS.setAttribute('data-state','hide');
		else
		contJS.setAttribute('data-state', 'reveal');
	});
};

/***********************************Sticky Menu.**********************/
function offset(el) {
	    var rect = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
raychel.sticky = function(element){
	document.querySelectorAll(element).forEach(function(elementJS){
		elementJS.style.left = offset(elementJS).left+"px";

		var elemOfT = offset(elementJS).top;
		window.addEventListener('load', function(){
			elementJS.parentNode.style.height = elementJS.parentNode.offsetHeight+'px';
		});

		document.addEventListener('scroll',function(){
			var highest = document.documentElement.scrollTop ||
					document.body.parentNode.scrollTop ||
					document.body.scrollTop;
			if( highest >= elemOfT ) elementJS.setAttribute('data-state','sticky-menu');
			else elementJS.removeAttribute('data-state','sticky-menu');
		});
	});
};

/***********************************Scroll de Contenido.**********************/
raychel.scrollBarr = function(element){
		window.addEventListener('scroll',function(){
		var elementJS = document.querySelector(element);
		var hightDocument = document.documentElement.scrollHeight;
		var hightScreen = document.documentElement.clientHeight;
		var scrollBar = (hightDocument-hightScreen)/100;
		var elementJSSt = elementJS.style;
		elementJSSt.setProperty('--width-bar',Math.round(scrollY/scrollBar));
	});
};

/***********************************Ancla animada.**********************/
raychel.anchor = function(btn,to,segAnimate){
	var btnJS = document.querySelector(btn);
	var toJS = document.querySelector(to);
	btnJS.addEventListener('click',function(){
		listefi.scrollTo(offset(toJS).top,segAnimate,false);
	});
};
/***********************************Visor Upload.**********************/
raychel.visor = function(args){
	args.visorInput = document.querySelector(args.visorInput);
	args.visorInput.addEventListener('change',function(){
		var route = args.visorInput.value;
		var expression = args.exp;
		if( !expression.exec(route) ){
			listefi.alert(args.messageError,args.messageErrorTitle);
		}else{
			for( i = 0; i < args.visorInput.files.length; i++ ){
				if( args.visorInput.files && args.visorInput.files[i] ){
					var visor = new FileReader();
					visor.addEventListener('load',function(evt){
						var visorCont = document.querySelector(args.visor);
						visorCont.innerHTML = '<embed src="'+evt.target.result+'" width="'+args.width+'"  height="'+args.height+'">';
					});
					return visor.readAsDataURL(args.visorInput.files[i]);
				}
			}

		}
	});
};
