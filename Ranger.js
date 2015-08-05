var Ranger = function(opt){  
    this.o = opt;
    this.start();  
};

Ranger.prototype.start = function(){
    this.opcionesGPS = {enableHighAccuracy: true };
    var _this = this;
    Vx.when({tipoDeMensaje: "vortex.commander.goto",
             ranger: this.o.nombre},
             function(mensaje){_this.goToRecibido(mensaje);});
    
    this.obtenerPosicion();
};

Ranger.prototype.goToRecibido = function(mensaje){   
    this.destino = new google.maps.LatLng(mensaje.latitudDestino, mensaje.longitudDestino);
    Vx.send({
        tipoDeMensaje: "vortex.commander.goingTo",
        ranger: this.o.nombre,
        latitud: this.destino.lat(),
        longitud: this.destino.lng()
    });
};

Ranger.prototype.onErrorAlObtenerPosicion = function(error){
    console.log(error);
    var _this = this;
    setTimeout(function(){_this.obtenerPosicion();}
               , 1000);
};

Ranger.prototype.onPosicionObtenida = function(posicion){
    var _this = this;
    Vx.send({
        tipoDeMensaje: "vortex.commander.posicion",
        ranger: this.o.nombre,
        latitud: posicion.coords.latitude,
        longitud: posicion.coords.longitude
    });
    console.log("Obtenida posicion: ", posicion);
    setTimeout(function(){_this.obtenerPosicion();}
               , 1000);
};

Ranger.prototype.obtenerPosicion = function(){
    var _this = this;
    navigator.geolocation.getCurrentPosition(
        function(pos){_this.onPosicionObtenida(pos);},
        function(error){_this.onErrorAlObtenerPosicion(error);},
        this.opcionesGPS);
};