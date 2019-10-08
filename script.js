$(function () { //kodlar sayfa tamamen yüklendikten sonra çalışacak

    var svg = Pablo('#graund').svg({
        width: 1095,
        height: 690
    });

    // yılanımız düğümlerden oluşuyor yani yılan aslında birer array ve bu arrayim grafiğini pablojs kullanarak geliştirdik.
    var dugun_dizisi = new Array();
    var dugun_boyu = 15;

    var renkDızısı = new Array("#ff3838", "#ff9f1a", "#32ff7e", "#3d3d3d", "#3ae374");
    var renkIndex = 0;

    /* yılanın yönünü başlangıç olarak 1 seçtik*/
    var yön = 1;
    
    
    
    



    yılanOlustur(4, 300, 300);


    //yılan yemek kordinatları
    var yemek;
    var yemekx;
    var yemeky;
     
    //--------------------
    function yemekOlustur() {
        yemekx = Math.floor((Math.random() *67)+1)*15; //1100px
        yemeky = Math.floor((Math.random() *45)+1)*15; //700px




        yemek = svg.rect({
            x: yemekx,
            y: yemeky,
            width: 15,
            height: 15,
            fill: '#a55eea',
            stroke: '#006',
            'stroke-width': 2,
            'stroke-linejoin': 'round'


        });

        return yemek;
    }



    // yemek kontrol değişkeni 1 demek yemek var demek.
    var yemekKontrol = 1;
    // yılanın baş kısmknın x ve y kordinatların ihtiyacımız var.
    var yılanx;
    var yılany;

    //set inerval koymamız lazım yılanOlustur fonksiyonundan sonra
    //set interval fonksiyonunu kullanımında hız 200milisaniye olmakta.

    var hız = 200;
    setInterval(function () {
        YılanıHareketEttir();
        yemekYe();
        yılanıOldur();

    }, hız);

    function yemekYe() {
        if (yemekKontrol == 1) {
            yemek = yemekOlustur();
            yemekKontrol = 0;
            yemekx = yemek.attr('x');
            yemeky = yemek.attr('y');

        }

        yılanx = dugun_dizisi[dugun_dizisi.length - 1].attr('x');
        yılany = dugun_dizisi[dugun_dizisi.length - 1].attr('y');

        if (yılanx == yemekx && yılany == yemeky) {
            yemek.remove();
            yemekKontrol = 1;
            var yılanDugumu = svg.rect({

                x: yılanx,
                y: yılany,
                width: 15,
                height: 15,
                fill: renkDızısı[renkIndex],
                stroke: '#006',
                'stroke-width': 2,
                'stroke-linejoin': 'round'

            });
            dugun_dizisi.push(yılanDugumu);
            yılanDugumu =yılanDugumu+1;
        }

    }

    function yılanOlustur(dugum, x, y) {
        for (var i = 0; i < dugum; i++) {
            var renkIndex = Math.floor(Math.random() * 5);


            var yılanDugum = svg.rect({
                x: x,
                y: y,
                width: 15,
                height: 15,
                fill: renkDızısı[renkIndex],
                stroke: '#006',
                'stroke-width': 2,
                'stroke-linejoin': 'round'

            });


            x = x + dugun_boyu;
            dugun_dizisi.push(yılanDugum);

        }
    }

    //yılanı hareket ettiren fonksiyonu olşturduk.
    function YılanıHareketEttir() {
        var x;
        var y;

        x = dugun_dizisi[dugun_dizisi.length - 1].attr('x');
        y = dugun_dizisi[dugun_dizisi.length - 1].attr('y');

        if (yön == 1) {
            x = parseInt(x) + dugun_boyu;
        }
        if (yön == 2) {
            y = parseInt(y) + dugun_boyu;
        }
        if (yön == 3) {
            x = parseInt(x) - dugun_boyu;
        }
        if (yön == 4) {
            y = parseInt(y) - dugun_boyu;
        }
        var renkIndex = Math.floor(Math.random() * 5);


        var yılanDugum = svg.rect({
            x: x,
            y: y,
            width: 15,
            height: 15,
            fill: renkDızısı[renkIndex],
            stroke: '#006',
            'stroke-width': 2,
            'stroke-linejoin': 'round'

        });
        //yılanın ilk elemanını silmek istedik. yılan hareket ettiğinde.
        dugun_dizisi[0].remove();
        dugun_dizisi.shift();
        dugun_dizisi.push(yılanDugum);


    }


    // yılana oklar ile yön verme
    $(document).keydown(function (event) {
        var code = event.which;

        if (yön == 1 || yön == 3) {
            if (code == 38) yön = 4;
            if (code == 40) yön = 2;


        }
        if (yön == 2 || yön == 4) { // burada sola gittiğinde hata veriyor.
            if (code == 39) yön = 1;
            if (code == 37) yön = 3;
        }


    })
    //yılanın duvara  çarptığı zaman oyunun bitmesini istiyoruz.
    
    function yılanıOldur(){
        yılanx=dugun_dizisi[dugun_dizisi.length-1].attr('x');
        yılany=dugun_dizisi[dugun_dizisi.length-1].attr('y');
        
        if(yılanx<0 || yılanx>1080 || yılany<0 || yılany>675){
            if(confirm('Game Over')){
                window.location.reload(false); // oyun tekrar başlar
            }
            else{
                
            }
        }
        
        
        
        
    }
    




})
