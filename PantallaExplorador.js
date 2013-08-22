var PantallaExplorador = function(opt){
    this.o = opt;
    this.start();
};

PantallaExplorador.prototype.start = function(){
    this.ui = $("#pantalla_explorador");
    this.encabezado = this.ui.find("#encabezado");
    this.encabezado.text(this.o.usuario.nombre);
    var pos_obelisco = new google.maps.LatLng(-34.603683,-58.381569);
    
    var contenido = this.ui.find("#contenido");
    contenido.height(screen.height - 50);
    var div_mapa = this.ui.find("#div_mapa");
    var mapOptions = {
        zoom: 18,
        center: pos_obelisco, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapa = new google.maps.Map(div_mapa[0], mapOptions);
    google.maps.event.trigger(this.mapa, 'resize');
};
