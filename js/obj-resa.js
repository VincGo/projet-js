var chrono = {
    init:function(){
        var timer = sessionStorage.getItem('chronoTime');
        if(timer != null && timer != 'undefined') {
            this.lauch = new Date();
            this.lauch.setTime(timer);
        } 
        else {
            this.lauch = new Date();
            this.lauch.setMinutes(this.lauch.getMinutes() + 20);
            sessionStorage.setItem('chronoTime', this.lauch.getTime());
        } 
        this.infoResa = $('#timer');
        this.interval;
    },
    start:function(){
        this.refresh();
        this.interval = setInterval(function(){chrono.refresh()}, 1000);
    },
    refresh:function(){
        var now = new Date();
        this.t = Math.floor((this.lauch.getTime() - now.getTime())/1000); 
        if(this.t == 0){
            clearInterval(this.interval);
            sessionStorage.removeItem('chronoTime');
            alert("Votre réservation est terminée.");
        };
        var min = Math.floor(this.t/60); 
        var sec = Math.floor(this.t%60);
        this.infoResa.html(min +'min '+sec+'sec ');
    },
    save:function() {
        if(sessionStorage!='undefined') {
            var dataResa = {
			   adress:document.getElementById('adress').textContent,
		    };
        sessionStorage.setItem('coord',JSON.stringify(dataResa));   
	    }
   },
    resume:function(){
        var coordonnees = JSON.parse(sessionStorage.getItem('coord'));
        if(coordonnees!=='undefined') {  
		    document.getElementById('adresse').innerHTML = coordonnees.adress;
        };
    },
    remove:function() {
        alert('Vous allez modifier votre réservation en cours.');
        clearInterval(this.interval);
        sessionStorage.removeItem('chronoTime');
        this.infoResa.html(" ");
        document.getElementById('adresse').innerHTML = "";
    },
};


   



