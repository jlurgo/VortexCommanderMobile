var PanelControlRangers = function(opt){
    this.o = opt;
    this.start();
};

PanelControlRangers.prototype.start = function(){
    this.ui = $('#plantilla_panel_control_rangers').clone();
    var pos_obelisco = new google.maps.LatLng(-34.603683,-58.381569);
    var mapOptions = {
        zoom: 18,
        center: pos_obelisco, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapa = new google.maps.Map(this.ui.find("#div_mapa")[0], mapOptions);
    var _this = this;
    this.ui.find("#div_mapa").show(function(){
        google.maps.event.trigger(_this.mapa, "resize");        
    });
    
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    
    this.rangers = {};
    
    var _this = this;
    this.portal.pedirMensajes(  new FiltroXClaveValor("tipoDeMensaje", "vortex.commander.posicion"),
                                function(mensaje){_this.posicionRecibida(mensaje);});
    var _this = this;
    google.maps.event.addListener(this.mapa, 'click', function(event) {
        _this.rangerSeleccionado.goTo(event.latLng);
    });
    
    this.rangerSeleccionado = {
        goTo: function(){}  
    };
};

PanelControlRangers.prototype.posicionRecibida = function(posicion){
    var _this = this;
    var lat_long_posicion = new google.maps.LatLng(posicion.latitud,posicion.longitud);
    if(this.rangers[posicion.ranger] !== undefined) return;
    this.rangers[posicion.ranger] = new VistaRangerEnMapa({
        mapa: this.mapa,
        nombre: posicion.ranger,
        posicionInicial: lat_long_posicion,
        onClick: function(ranger, e){
            _this.seleccionarRanger(ranger);             
        }
    });
};

PanelControlRangers.prototype.seleccionarRanger = function(ranger){
    this.rangerSeleccionado = ranger;
    for(var key_ranger in this.rangers){
        this.rangers[key_ranger].desSeleccionar();
    }
    ranger.seleccionar();  
    this.mapa.setOptions({draggableCursor:'crosshair'});
};

PanelControlRangers.prototype.dibujarEn = function(panel){
    panel.append(this.ui);
    var _this = this;
};
