var onDeviceReady = function() {         
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 1000);             
    NodoRouter.instancia.conectarBidireccionalmenteCon(clienteHTTP);
    
    var pantalla_explorador = $("#pantalla_panel_control_rangers");
    var _this = this;
    var login = new PantallaLogin({
        callback_usuario: function(un_usuario){
            var ranger = new Ranger({ nombre: un_usuario.nombre});
            var panel_control = new PanelControlRangers();        
            panel_control.dibujarEn(pantalla_explorador.find("#contenido"));          
            $.mobile.changePage (pantalla_explorador);
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

