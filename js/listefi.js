/*
* Listefi - Frontend Framework
* Desarrollado por el equipo Debred - contacto@debred.com
* V 17.11.09
*/
var listefi = function(e){return document.querySelector(e)};
/*
	AJAX
*/
listefi.ajax = function(conf){
	var url = conf.url;
	var method = conf.method.toLowerCase() || 'get';
	var data = null;
	var isFormData = conf.data instanceof FormData;
	conf.success || ( conf.success = function(a){} );

	//Preparamos los datos a enviar si son requeridos
	if( !isFormData && (typeof conf.data == 'object') ){
		data = Object.keys(conf.data).map(function(k){
			return encodeURIComponent(k) + '=' + encodeURIComponent(conf.data[k])
		}).join('&');
	}else data = conf.data || null;

	//Se agregan los datos a enviar a la url en caso de peticion get
	if( typeof data == 'string' && method == 'get' ) url += ((/\?/).test(url)?"&":"?")+data;

	//Evitamos que se guarde en cache la peticion
	if( !conf.cache ) url += ((/\?/).test(url)?"&":"?")+(new Date()).getTime();

	//Preparamos el objeto de la peticion ajax
	var xhr = new XMLHttpRequest();
	xhr.open( method, url );

	//Establecemos los encabezados necesarios para peticion post
	if( method == 'post' && !isFormData ){
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}

	//Manejador de eventos para procesar respuesta
	if( typeof conf.success == 'function' ){
		xhr.addEventListener('readystatechange', function(){
			if(xhr.readyState > 3){
				if( xhr.status==200 ) conf.success(xhr.responseText);
				if( typeof conf.complete == 'function' ) conf.complete(xhr);
			}
		});
	}

	//Manejador de eventos inicio de transferencia
	if( typeof conf.loadstart == 'function' )
		xhr.addEventListener('loadstart', conf.loadstart);

	//Manejador de eventos rastreo de proceso de transferencia (Download)
	if( typeof conf.progress == 'function' )
		xhr.addEventListener('progress', conf.progress);

	//Manejador de eventos rastreo de proceso de transferencia (Upload)
	if( typeof conf.uploadProgress == 'function' )
		xhr.upload.addEventListener('progress', conf.uploadProgress);

	//Manejador de eventos transferencia completa
	if( typeof conf.load == 'function' )
		xhr.addEventListener('load', conf.load);

	//Manejador de eventos error de transferencia
	if( typeof conf.error == 'function' )
		xhr.addEventListener('error', conf.error);

	//Enviamos peticion y retornamos objeto ajax
	xhr.send(data);
	return xhr;
};
/*
	AJAX - Load
*/
listefi.load = function(container, url){
	listefi.ajax({method: 'get', url: url, success: function(resultado){
		listefi(container).innerHTML = resultado;
	}});
};

listefi.getRand = function(){var nran = 0; nran = Math.ceil(Math.random()*1000000); return nran;}
/*
	Modal Windows
*/
listefi.mw = function(conf){
    var mwid = "mw-"+listefi.getRand(), newmw, newscreen;
	conf.controls = conf.controls || false;

    function createElement(clase,tipo,texto){
        var elemento = document.createElement(tipo);
        elemento.setAttribute('class',clase);
        elemento.innerHTML = texto;
        return elemento;
    }

    function removeModal(){
        var modal = document.getElementById(mwid);
        newscreen = document.getElementById(mwid+'-screen');
        modal.setAttribute('data-estado','cerrado');
        newscreen.setAttribute('data-estado','cerrado');
        setTimeout(function(){listefi("body").removeChild(newscreen);}, 500);
    }

    function createClose(){
        var close = createElement('mw-close','button','&times;');
        close.addEventListener('click',removeModal);
        return close;
    }

    function createHeader(text){
        var btnClose = createClose();
        var header = createElement('mw-header','div',text);
        header.appendChild(btnClose);
        return header;
    }

    function createBody(text){
        return createElement('mw-body','div',text);
    }

    function createBox(){
        var box = createElement('mw-box','div',"");
        box.setAttribute('id',mwid);
        box.appendChild(createHeader(conf.header));
        box.appendChild(createBody(conf.body));
		box.addEventListener("click", function(e){
			e.stopPropagation();
		});
        return box;
    }

    function insert(){
        var screen = createScreen();
        screen.appendChild(newmw);
        document.body.appendChild(screen);
    }

    function createScreen(){
        var screen = createElement('mw-screen','div','');
        screen.setAttribute('id',mwid+'-screen');
		screen.addEventListener('click',removeModal);
        return screen;
    }

    function init(){
        newmw = createBox();
        return {id: mwid, mw: newmw, insert: insert, removeModal: removeModal};
    }
    return init();
};
/*
	Modal Windows - Confirm
*/
listefi.confirm = function(contenido, callback){
	var modalert = new this.mw({
		header: 'Confirmar:',
		body: contenido
	});
	var callback = callback || function(result){};

	var controlcont = document.createElement('div');
	controlcont.setAttribute('class', 'mw-controls');

	var btnacept = document.createElement('button');
	btnacept.setAttribute('class', 'btn');
	btnacept.setAttribute('type', 'button');
	btnacept.innerHTML = 'Aceptar';
	btnacept.addEventListener('click', function(){
		modalert.removeModal();
		callback(true);
	});

	var btncancel = document.createElement('button');
	btncancel.setAttribute('class', 'btn');
	btncancel.setAttribute('type', 'button');
	btncancel.innerHTML = 'Cancelar';
	btncancel.addEventListener('click', function(){
		modalert.removeModal();
		callback(false);
	});

	controlcont.appendChild(btnacept);
	controlcont.appendChild(btncancel);
	modalert.mw.appendChild(controlcont);

	modalert.insert();
}
/*
	Modal Windows - Alert
*/
listefi.alert = function(contenido, header){
	var header = header || 'Alerta:';
	var modalert = new this.mw({'header': header, 'body': contenido});
	modalert.insert();
}
/*
	ScrollTo
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2; if (t < 1) return c/2*t*t + b; t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
var requestAnimFrame = (function(){
	return 	window.requestAnimationFrame || function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();
listefi.scrollTo = function(to, duration, callback) {
	function move(amount) {
		document.documentElement.scrollTop = amount;
		document.body.parentNode.scrollTop = amount;
		document.body.scrollTop = amount;
	}
	function position() {
		return document.documentElement.scrollTop ||
			document.body.parentNode.scrollTop ||
			document.body.scrollTop;
	}
	var start = position(),	change = to - start, currentTime = 0, increment = 20;
	duration = (typeof(duration) === 'undefined') ? 500 : duration;
	var animateScroll = function() {
		currentTime += increment;
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		move(val);
		if (currentTime < duration) requestAnimFrame(animateScroll);
		else {if (callback && typeof(callback) === 'function') callback();}
	};
	animateScroll();
};

/*
	Cookies - Set cookie, get cookie y delete cookie
*/
listefi.getCookie = function( name ){
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
};
listefi.setCookie = function( name, value, days ){
	var d = new Date; d.setTime(d.getTime() + 24*60*60*1000*days);
	document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};
listefi.deleteCookie = function(name) { listefi.setCookie(name, '', -1); };
/*
	Helpers
*/
//Get the position of any element relative to the viewport
listefi.offset = function(el){
	var rect = el.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
listefi.validURL = function(str){
	var a  = document.createElement('a'); a.href = str;
	return (a.host && a.host != window.location.host);
}
/*
	Pdraggable - Set top and left of an element on click
*/
listefi.pdrag = function(e) {
   listefi.pdrag.data.startX = e.clientX;
   listefi.pdrag.data.startY = e.clientY;
   if( !listefi.pdrag.data.dactive ) listefi.pdrag.data.dactive = this;
   listefi.pdrag.data.startLeft = parseInt(window.getComputedStyle(listefi.pdrag.data.dactive).left, 10);
   listefi.pdrag.data.startTop = parseInt(window.getComputedStyle(listefi.pdrag.data.dactive).top, 10);
   document.addEventListener('mousemove', listefi.pdrag.doDrag);
   document.addEventListener('mouseup', listefi.pdrag.stopDrag);
   e.preventDefault();
}
listefi.pdrag.data = {startX: 0, startY: 0, startLeft: 0, startTop: 0, dactive: null};
listefi.pdrag.doDrag = function(e) {
   listefi.pdrag.data.dactive.style.left = (listefi.pdrag.data.startLeft + e.clientX - listefi.pdrag.data.startX) + 'px';
   listefi.pdrag.data.dactive.style.top = (listefi.pdrag.data.startTop + e.clientY - listefi.pdrag.data.startY) + 'px';
}
listefi.pdrag.stopDrag = function(e) {
	listefi.pdrag.data.dactive = null;
    document.removeEventListener('mousemove', listefi.pdrag.doDrag);
	document.removeEventListener('mouseup', listefi.pdrag.stopDrag);
}
