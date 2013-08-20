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
    this.portal.enviarMensaje({
                tipoDeMensaje: "vortex.commander.posicion",
                usuario: this.o.usuario,
                latitud: posicion.coords.latitude,
                longitud: posicion.coords.longitude
            });
    console.log("Obtenida posicion: ", posicion);
    setTimeout(this.obtenerPosicion.bind(this), 100);
};

TransmisorDePosicion.prototype.obtenerPosicion = function(){
    navigator.geolocation.getCurrentPosition(
        this.onPosicionObtenida.bind(this),
        this.onErrorAlObtenerPosicion.bind(this),
        this.opcionesGPS);
};