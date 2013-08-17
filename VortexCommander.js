var onDeviceReady = function() {
    var portal =  new NodoPortalBidi();           
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 100);             
    portal.conectarCon(clienteHTTP);
    clienteHTTP.conectarCon(portal);
    
    watch_id = navigator.geolocation.watchPosition(
        // Success
        function(position){
            portal.enviarMensaje({
                tipoDeMensaje: "vortex.commander.posicion",
                latitud: position.coords.latitude,
                longitud: position.coords.longitude 
            });
        },
        // Error
        function(error){
            console.log(error);
        },
        // Settings
        { timeout: 3000, enableHighAccuracy: true });
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

