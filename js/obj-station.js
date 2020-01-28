var Station = {
    init:function(data) {
        this.adresse = data.address;
        this.lat = data.position.lat;
        this.lng = data.position.lng;
        this.place = data.available_bike_stands;
        this.dispo = data.available_bikes;
        this.paiement = data.banking;
        this.status = data.status;
    },
//affiche information station vélo
    detailStation: function () {
        if(this.status === "CLOSED" || this.dispo === 0){
            $('#indispo').show();
            $('#clear').hide();  
            $('input').hide();
            $('section').css("visibility", "visible");
            $('#adress').text(this.adresse);
            $('#nbmax').text(this.place);
            $('#dispo').text(this.dispo)
        } 
        else {
            $('#indispo').hide();
            $('section').css("visibility", "visible");
            $('#clear').show();
            $('input').show();
            $('#adress').text(this.adresse);
            $('#nbmax').text(this.place);
            $('#dispo').text(this.dispo);
        }
    },
};






