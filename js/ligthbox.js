var listefi = {};
listefi.lightbox = function(args){
	var contBlack = document.createElement('div');
	contBlack.setAttribute('class','lht-bx-cover hide');
	contBlack.setAttribute('data-state','inactive');

	var show = function(){
		contBlack.classList.remove('hide');
		contBlack.setAttribute('data-state','active');
	};

	var remove = function(){
		document.body.removeChild(contBlack);
	};

	var hide = function(){
		contBlack.setAttribute('data-state','inactive');
		setTimeout(function () {
			contBlack.classList.add('hide');
		}, 600);
	};

	var addContent = function(cont){
		if( typeof cont == 'string' ) contBlack.innerHTML += cont;
		else contBlack.appendChild(cont);
	};

	contBlack.addEventListener('click',hide);
	if(args != null) addContent(args);
	document.body.appendChild(contBlack);

	return {
		show:show,
		hide:hide,
		remove:remove,
		addContent:addContent,
		cover:contBlack,
	};
};


var imglightbox = function(args){
	var list = document.querySelectorAll(args.selector);
	var cont = document.createElement('div');
	var imgs = document.createElement('img');
	cont.appendChild(imgs);
	cont.setAttribute("class", "container tx-center mg-sec");
	var newlightbox = listefi.lightbox('<button type="button" class="mw-close">×</button>');
	newlightbox.addContent(cont);

	imgs.addEventListener('click',function(e){
		e.stopPropagation();
	});

	list.forEach(function(i){
		i.addEventListener('click',function(e){
			e.preventDefault();
			imgs.src = i.getAttribute('data-src');
			newlightbox.show();
		});
	});
};

listefi.alert = function(body, head, controls, callback){
	var newlightbox = listefi.lightbox();
	function ccreate(){
		var cc = document.createElement('div');
		cc.setAttribute("class", "container cont-600 mg-sec");
		ccreate = function(){return cc.cloneNode();}
		return cc.cloneNode();
	}
	var cont = ccreate();
	listefi.alert = function(body, head, controls, callback){
		var continner = "";
		if( head != null ){
			continner = '<div class="card-header"><button type="button" class="mw-close">×</button><h4>'+head+'</h4></div>';
			continner += "<div class='card-frame'>"+body+"</div>";
		}else continner += "<div class='card-frame'><button type='button' class='mw-close'>×</button>"+body+"</div>";

		cont.addEventListener('click',function(e){e.stopPropagation();});
		cont.innerHTML = continner;

		if( controls != null ){
			var cfo = document.createElement("div");
			cfo.setAttribute("class", "card-footer tx-right");
			controls.forEach(function(i){
				var nbtn = document.createElement("button");
				nbtn.setAttribute("type", "button");
				nbtn.innerHTML = i.html;
				nbtn.setAttribute("class", i.class);
				nbtn.setAttribute("id", i.id);
				nbtn.addEventListener("click", function(){
					i.action(newlightbox);
				});
				cfo.appendChild(nbtn);
			});
			cont.appendChild(cfo);
		}

		cont.querySelector(".mw-close").addEventListener("click", newlightbox.hide);
		newlightbox.innerHTML = ""; newlightbox.addContent(cont);
		if( callback != null ) callback(newlightbox);
		newlightbox.show();
	}
	listefi.alert(body, head, controls, callback);
};

listefi.confirm = function(body, arg1, arg2){
	var header = arg1;
	var callback = arg2;
	if( typeof arg1 == "function" ){callback = arg1; header = 'Confirmar!';}
	function closeCallback(){
		callback(false);
		this.removeEventListener("click", closeCallback);
	}
	listefi.alert(body, header, [
		{
			html: "Aceptar",
			class: "btn btn-primary",
			id: "",
			action: function(l){callback(true); l.hide(); l.cover.querySelector(".mw-close").removeEventListener("click", closeCallback)}
		},
		{
			html: "Cancelar",
			class: "btn",
			id: "",
			action: function(l){callback(false); l.hide(); l.cover.querySelector(".mw-close").removeEventListener("click", closeCallback)}
		}
	], function(l){
		l.cover.querySelector(".mw-close").addEventListener("click", closeCallback);
	});
};
