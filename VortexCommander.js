var onDeviceReady = function() {         
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 100);             
    NodoRouter.instancia.conectarBidireccionalmenteCon(clienteHTTP);
    
    var panel_principal = $("#panel_principal");
    var _this = this;
    var login = new PantallaLogin({
        callback_usuario: function(un_usuario){
            //var transmisor = new TransmisorDePosicion({ usuario: un_usuario});
            var pantalla_explorador = new PantallaExplorador({ usuario: un_usuario});
        }
    });
};

$(document).ready(function() {  
    // are we running in native app or in browser?
    window.isphone = false;
    if(document.URL.indexOf("file://") == -1) {
        window.isphone = true;
    }

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

