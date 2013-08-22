var PantallaExplorador = function(opt){
    this.o = opt;
    this.start();
};

PantallaExplorador.prototype.start = function(){
    this.ui = $("#pantalla_explorador");    
    $.mobile.changePage (this.ui);
    
    this.encabezado = this.ui.find("#encabezado");
    this.encabezado.text(this.o.usuario.nombre);
    var pos_obelisco = new google.maps.LatLng(-34.603683,-58.381569);
    
    var $content = this.ui.find("div:jqmData(role=content)");
    $content.height (screen.height - 50);
    
    var mapOptions = {
        zoom: 18,
        center: pos_obelisco, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapa = new google.maps.Map($content[0], mapOptions);
    google.maps.event.trigger(this.mapa, 'resize');
    
    this.transmisor = new TransmisorDePosicion({ usuario: this.o.usuario});
};
