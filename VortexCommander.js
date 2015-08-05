var onDeviceReady = function() {         
    //Vx.conectarCon(new NodoConectorSocket('https://router-vortex.herokuapp.com'));
    Vx.conectarCon(new NodoConectorSocket('https://server-vortex.herokuapp.com'));
    
    var pantalla_explorador = $("#pantalla_panel_control_rangers");
    var _this = this;
    var login = new PantallaLogin({
        callback_usuario: function(un_usuario){
            var ranger = new Ranger({ nombre: un_usuario.nombre});
            var panel_control = new PanelControlRangers();        
            panel_control.dibujarEn(pantalla_explorador.find("#contenido"));          
            $.mobile.changePage (pantalla_explorador, { transition: "flip"});
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

(function() {
        var canvas = document.getElementById('layer_commander'),
                context = canvas.getContext('2d');

        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);
        
        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                /**
                 * Your drawings need to be inside this function otherwise they will be reset when 
                 * you resize the browser window and the canvas goes will be cleared.
                 */
                drawStuff(); 
        }
        resizeCanvas();
        
        function drawStuff() {
                // do your drawing stuff here
        }
})();