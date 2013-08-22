var VistaLogin = function(opt){
    this.o = opt;
    this.start();
};

VistaLogin.prototype.start = function(un_panel){
    this.ui = $('#plantilla_login').clone();
    this.txt_nombre_usuario = this.ui.find('#txt_nombre_usuario');
    this.btn_log_in = this.ui.find("#btn_log_in");
    
    var _this = this;

    this.btn_log_in.click(function() { 
         if(_this.txt_nombre_usuario.val() != ""){
            _this.o.callback_usuario(new Usuario(_this.txt_nombre_usuario.val()));
         }
     });
};

VistaLogin.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);  
};