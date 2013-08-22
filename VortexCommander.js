var onDeviceReady = function() {         
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 100);             
    NodoRouter.instancia.conectarBidireccionalmenteCon(clienteHTTP);
    
    var panel_principal = $("#panel_principal");
    var _this = this;
    var vista_login = new VistaLogin({
        callback_usuario: function(un_usuario){
            var transmisor = new TransmisorDePosicion({ usuario: un_usuario});
        }
    });
    
    vista_login.dibujarEn(panel_principal);
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

