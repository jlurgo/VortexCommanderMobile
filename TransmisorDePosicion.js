var TransmisorDePosicion = function(opt){  
    this.o = opt;
    this.start();  
};

TransmisorDePosicion.prototype.start = function(){
    this.portal =  new NodoPortalBidi();         
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    this.opcionesGPS = {enableHighAccuracy: true };
    
    this.obtenerPosicion();
};

TransmisorDePosicion.prototype.onErrorAlObtenerPosicion = function(error){
    console.log(error);
    this.obtenerPosicion();
};

TransmisorDePosicion.prototype.onPosicionObtenida = function(posicion){
    var _this = this;
    this.portal.enviarMensaje({
                tipoDeMensaje: "vortex.commander.posicion",
                usuario: this.o.usuario.nombre,
                latitud: posicion.coords.latitude,
                longitud: posicion.coords.longitude
            });
    console.log("Obtenida posicion: ", posicion);
    setTimeout(function(){_this.obtenerPosicion();}
               , 1000);
};

TransmisorDePosicion.prototype.obtenerPosicion = function(){
    var _this = this;
    navigator.geolocation.getCurrentPosition(
        function(pos){_this.onPosicionObtenida(pos);},
        function(error){_this.onErrorAlObtenerPosicion(error);},
        this.opcionesGPS);
};