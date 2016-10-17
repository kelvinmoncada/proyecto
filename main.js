
$(function() {

	var app_id = '176804779436626';// id que nos da facebbok
	var scopes = 'email, user_friends, user_online_presence';//permisos de la aplicación 

	var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar sesión</a>';

	var div_session = "<div id='facebook-session'>"+ //en este bloque cuando se entra y se cambia la apariencia
					  "<strong></strong>"+
					  "<img>"+
					  "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
					  "</div>";

	window.fbAsyncInit = function() { //inicia el  SDK

	  	FB.init({
	    	appId      : app_id,
	    	status     : true,
	    	cookie     : true, 
	    	xfbml      : true, 
	    	version    : 'v2.5'
	  	});


	  	FB.getLoginStatus(function(response) {
	    	statusChangeCallback(response, function() {});
	  	});
  	};

	
  	var statusChangeCallback = function(response, callback) {
  		console.log(response);
   		
    	if (response.status === 'connected') {
      		{getFacebookData();
			 
			}
    	} else {
     		callback(false);
    	}
  	}
	

  	var checkLoginState = function(callback) {
    	FB.getLoginStatus(function(response) {//nos manda una respuesta si estamos conectados o no
      		callback(response);
    	});
  	}

  	var getFacebookData =  function() { //nos trae la infomacion de facebook
  		FB.api('/me', function(response) {
	  		$('#login').after(div_session);
	  		$('#login').remove();
			
	  		$('#facebook-session strong').text("Bienvenido: "+response.name);//nombre de la persona
	  		$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large'); //foto de perfil
        
		});
  	}

  	var facebookLogin = function() {
  		checkLoginState(function(data) {
  			if (data.status !== 'connected') {
  				FB.login(function(response) {
  					if (response.status === 'connected')
					{ getFacebookData();
				        var inicio=true;
						inicios();
				}
					
					function inicios(){
						if(inicio)
						{
					alert("el enlace es :   locahost/proyecto/proyect1.html");	
						}
						
					}
					
  				}, {scope: scopes});
  			}
  		})
  	}

	
	
  	var facebookLogout = function() {
  		checkLoginState(function(data) {
  			if (data.status === 'connected') {
				FB.logout(function(response) {
					$('#facebook-session').before(btn_login);
					$('#facebook-session').remove();
				})
			}
  		})

  	}



  	$(document).on('click', '#login', function(e) {
  		e.preventDefault();
          facebookLogin();
		    
		
  	})

  	$(document).on('click', '#logout', function(e) {
  		e.preventDefault();

  		if (confirm("¿Está seguro?"))
  			facebookLogout();
  		else 
  			return false;
  	})

})
