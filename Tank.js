

$(document).ready(function () {
    $("#voltar").click(function () {
        window.location.replace("Tank.html");
    });



    // prevenir teclas das setas de fazer scroll Up  e down 
    window.addEventListener("keydown", function (e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
});









//Modo de jogo

var singlePlayer;
var texttank1;
var texttank2;
var mapa;

function modojogo(choice) {
    singlePlayer = choice;

    init()

}

//geometrias
var geomCanhao = new THREE.BoxGeometry(0.4, 0.4, 2.7);
var geomBase = new THREE.BoxGeometry(3, 1, 5, 1, 1, 5);
var geomTorre = new THREE.BoxGeometry(1, 0.5, 1.5);

//Bot

var nBots; // entre 3 e 6 
var espacamentoBots;
var espacamentoz = 25;
var geomBaseBot = new THREE.BoxGeometry(2, 1, 3);
var geomCanhaoBot = new THREE.BoxGeometry(0.4, 0.4, 2.7);
var baseBot;
var Bot;
var canhaoBot;
var hpBot = 5;
var somaHP=0;
var hpbots = [];
var bots = [];
var incmovbot = 0.2;
var balahitbot = false;
var balahitbot2 = false;
var balahitbot3 = false;
var balahitbot4 = false;
var balahitbot5 = false;
var balahitbot6 = false;
var goverbots=false;





// tank
var tank, base, torre, canhao, canhaoPivo;
var tankfrente = 0, tankdireita = 0;
var canhaovirar;
var texturaSelecionada
var angCanhaovirar = Math.PI / 2;
var HpTank = 5;
var arrayVtank = [];
var v;
var BBoxtank;

//tank2

var tank2, base2, torre2, canhao2, canhaoPivo2;
var tankfrente2 = 0, tankdireita2 = 0;
var canhaovirar2;
var texturaSelecionada2;
var angCanhaovirar2 = Math.PI / 2;
var HpTank2 = 5;
var arrayVtank2 = [];
var v2;
var BBoxtank2;


//balas 

var reload = false;
var disparar = false;
var reload2 = false;
var disparar2 = false;
var inc = 1;
var inc2 = 1;
var sphere;
var sphere2;
var bullets = [];
var bullets2 = [];
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var sphereGeo = new THREE.SphereGeometry(0.2, 10, 10);
var bala1hit2;
var bala2hit1;
var worldNormal;
var worldNormal2;



//Movimento
var char;
var positionx;
var positionz;
var positionx2;
var positionz2;
var velocidade = 0.2;
var velocidade2 = 0.2;

// textures

var textureDcamo = new THREE.TextureLoader().load('./resources/camouflage.jpg');
var textureLcamo = new THREE.TextureLoader().load('./resources/camolight.jpg');
var texturePinkcamo = new THREE.TextureLoader().load('./resources/camopink.jpg');
var textureBotcamo = new THREE.TextureLoader().load('./resources/camobot.jpg');
var textureForest = new THREE.TextureLoader().load('./resources/camoforest.jpg');

textureBotcamo.minFilter = textureLcamo.magFilter = THREE.LinearFilter;
textureLcamo.minFilter = textureLcamo.magFilter = THREE.LinearFilter;
texturePinkcamo.minFilter = texturePinkcamo.magFilter = THREE.LinearFilter;
textureDcamo.minFilter = textureDcamo.magFilter = THREE.LinearFilter;




//collisions
var BBox;
var collisiontank;
var collisiontank2;
var ctanktank;


// http://isaacsukin.com/news/2012/06/how-build-first-person-shooter-browser-threejs-and-webglhtml5-canvas

//Maze

var corchao
var chao;
var scene;
var texturaMuro;
var cubo;
var tamanhacubomaze = 1.5;
var mazeSingle = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
var mazeMulti = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
var mazeMulti2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
var maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


var cubosporlinha = 0;
var cubosporcoluna;
var arraycubos = []
var arraycubos2 = [];





function init() {

    texttank1=document.getElementById("tankskin").value;
    texttank2=document.getElementById("tank2skin").value;
    mapa=document.getElementById("bioma").value;
    
    //textura tank1
    if(texttank1=="forest"){
        texturaSelecionada=textureDcamo;
        nBots=6;
    }
    if(texttank1=="rosa"){
        texturaSelecionada=texturePinkcamo;
        nBots=4;
    }
    if(texttank1=="neve"){
        texturaSelecionada=textureLcamo;
        nBots=6;

    }
    if(texttank1=="robot"){
        texturaSelecionada=textureBotcamo;
        nBots=3;
    }

    // textura tank2
    if(texttank2=="forest"){
        texturaSelecionada2=textureDcamo;
    }
    if(texttank2=="rosa"){
        texturaSelecionada2=texturePinkcamo;
    }
    if(texttank2=="neve"){
        texturaSelecionada2=textureLcamo;
    }
    if(texttank2=="robot"){
        texturaSelecionada2=textureBotcamo;
    }

    // Bioma selecionado

    if (mapa=="neve"){
        texturaMuro=textureLcamo;
        corchao=0x7caaf4;
        
    }

    if (mapa=="forest"){
        texturaMuro=textureForest;
        corchao=0x422913;

    }




    if (singlePlayer) {
        maze = mazeSingle;
    }
    
    if (!singlePlayer ) {
        maze = mazeMulti;
    }
    if (!singlePlayer && mapa=="neve" ) {
        maze = mazeMulti2;
    }

    cubosporcoluna = maze.length;



    //Keys
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);


    //scene
    scene = new THREE.Scene();
    var axes = new THREE.AxisHelper(200);




    //Cameras

    // Camera Singleplayer
    cameraSingleplayer = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraSingleplayer.position.y = 10;
    cameraSingleplayer.position.z = 20;
    cameraSingleplayer.lookAt(new THREE.Vector3(0, 0, 0));

    cameraPositionTPV = function animate() {
        // camera TO object relative offset
        var relativeOffset = new THREE.Vector3(0, 20, -35);
        // updates (multiplies) the offset with the object ‘s global transformation matrix 
        var cameraOffset = relativeOffset.applyMatrix4(tank.matrixWorld);
        // updates the camera position with the new offset
        cameraSingleplayer.position.copy(cameraOffset);
        // camera looks at the object’s position
        cameraSingleplayer.lookAt(tank.position);
    }


    //Camera Multiplayer
    var cameraMulti = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 200);
    // position and point the camera to the center of the scene
    cameraMulti.position.set(35, 45, 55);
    cameraMulti.lookAt(scene.position);




    //renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x364615, 0);

    renderer.setSize(window.innerWidth, window.innerHeight * 0.9);

    //show canvas

    document.getElementById('canvas-container').appendChild(renderer.domElement);



    // Cenário


    for (var i = 0; i < maze.length; i++) {
        cubosporlinha = maze[i].length;

        for (var j = 0; j < cubosporlinha; j++) {

            if (maze[i][j] == 1) {
                createcenario(i + 1, j + 1);
            }
        }
    }
    function createchao() {
        var materialchao = new THREE.MeshBasicMaterial({ color: corchao, wireframe: false });
        var geomchao = new THREE.BoxGeometry(cubosporlinha * tamanhacubomaze, 0.01, cubosporcoluna * tamanhacubomaze);
        chao = new THREE.Mesh(geomchao, materialchao);
        chao.position.set(tamanhacubomaze / 2, -0.5, tamanhacubomaze / 2);
        scene.add(chao);
    }

    function createcenario(i, j) {

        
        var materialcubo = new THREE.MeshBasicMaterial({ map: texturaMuro, color: 0xffffff, wireframe: false });
        var box3;
        var geocubo = new THREE.BoxGeometry(tamanhacubomaze, tamanhacubomaze, tamanhacubomaze);

        cubo = new THREE.Mesh(geocubo, materialcubo);

        cubo.position.set(-cubosporlinha * tamanhacubomaze / 2 + j * tamanhacubomaze, 0, -cubosporcoluna * tamanhacubomaze / 2 + i * tamanhacubomaze)
        box3 = new THREE.Box3().setFromObject(cubo);
        scene.add(cubo);
        arraycubos.push(box3);
        arraycubos2.push(false);


    }


    //tank Singleplayer

    function createTankSinglePlayer() {




        tank = new THREE.Object3D();

        
        var materialTank = new THREE.MeshBasicMaterial({ map: texturaSelecionada });
        var materialCanhao = new THREE.MeshBasicMaterial({ map: texturaSelecionada, color: 0xCacaca, wireframe: false });

        base = new THREE.Mesh(geomBase, materialTank);
        tank.add(base);

        torre = new THREE.Mesh(geomTorre, materialCanhao);
        torre.position.y = 0.75;
        tank.add(torre);


        var verts = base.geometry.vertices;
        for (var i = 0; i < verts.length; i++) {
            var v = verts[i];
            arrayVtank.push(verts[i])
        }


        // Create the canhao
        canhaoPivo = new THREE.Object3D();
        canhao = new THREE.Mesh(geomCanhao, materialCanhao);
        canhao.position.z = 2;

        canhaoPivo.add(canhao);
        torre.add(canhaoPivo);


        tank.position.set(25, 0, -26)
        scene.add(tank);


        base.geometry.computeBoundingBox();
        // bbHelper = new THREE.BoxHelper(base, 0x00FFFF);
        // scene.add(bbHelper); // adds AABB to the scene



    }


    function createBots(nBots, espacamentoBots) {

        texturaSelecionada = textureBotcamo;

        var materialBot = new THREE.MeshBasicMaterial({ map: texturaSelecionada });
        var materialCanhaoBot = new THREE.MeshBasicMaterial({ map: texturaSelecionada, color: 0xCacaca, wireframe: false });



        for (var i = 0; i < nBots; i++) {

            if (i % 2 == 0) {

                espacamentoz = 10;
            }
            else {
                espacamentoz = 25;
            }

            hpbots[i] = hpBot;
            Bot = new THREE.Object3D();


            baseBot = new THREE.Mesh(geomBaseBot, materialBot);
            baseBot.position.set(40 + espacamentoBots - i * 10, 0, espacamentoz);
            Bot.add(baseBot);

            canhaoBot = new THREE.Mesh(geomCanhaoBot, materialCanhaoBot);
            canhaoBot.position.set(40 + espacamentoBots - i * 10, 0, espacamentoz - 2);
            Bot.add(canhaoBot);

            scene.add(Bot);

            bots.push(Bot);

        }



    }

    function MovimentoBots(nBots) {

        // console.log(bots[0].position.x);

        for (var i = 0; i < bots.length; i++) {

            bots[i].position.x += incmovbot;

            if (bots[0].position.x > 7) {
                bots[0].position.x = 7
                incmovbot = -incmovbot
            }
            if (bots[0].position.x < -5) {
                bots[0].position.x = -5
                incmovbot = -incmovbot
            }
        }

    }



    //Tanks Multiplayer

    function createTanks() {



        //tank1
        tank = new THREE.Object3D();

        
        var materialTank = new THREE.MeshBasicMaterial({ map: texturaSelecionada, wireframe: false });
        var materialCanhao = new THREE.MeshBasicMaterial({ map: texturaSelecionada, color: 0xCacaca, wireframe: false });

        base = new THREE.Mesh(geomBase, materialTank);
        tank.add(base);

        torre = new THREE.Mesh(geomTorre, materialCanhao);
        torre.position.y = 0.75;
        tank.add(torre);


        // Create the canhao
        canhaoPivo = new THREE.Object3D();
        canhao = new THREE.Mesh(geomCanhao, materialCanhao);
        canhao.position.z = 2;
        canhaoPivo.add(canhao);
        torre.add(canhaoPivo);


        var verts = base.geometry.vertices;
        for (var i = 0; i < verts.length; i++) {
            var v = verts[i];
            arrayVtank.push(verts[i])
        }

        base.geometry.computeBoundingBox();
        // bbHelper = new THREE.BoxHelper(base, 0x00FFFF);
        // scene.add(bbHelper); // adds AABB to the scene



        scene.add(tank);


        // tank2 

        tank2 = new THREE.Object3D();


        
        var materialTank2 = new THREE.MeshBasicMaterial({ map: texturaSelecionada2, wireframe: false });
        var materialCanhao2 = new THREE.MeshBasicMaterial({ map: texturaSelecionada2, color: 0xCacaca, wireframe: false });


        base2 = new THREE.Mesh(geomBase, materialTank2);
        tank2Offsetx = 15;
        tank2.position.x = tank2Offsetx;
        tank2.add(base2);

        torre2 = new THREE.Mesh(geomTorre, materialCanhao2);
        torre2.position.y = 0.75;
        tank2.add(torre2);

        canhaoPivo2 = new THREE.Object3D();
        canhao2 = new THREE.Mesh(geomCanhao, materialCanhao2);
        canhao2.position.z = 2;

        canhaoPivo2.add(canhao2);
        torre2.add(canhaoPivo2);


        var verts2 = base2.geometry.vertices;

        for (var i = 0; i < verts2.length; i++) {
            var v = verts2[i];
            arrayVtank2.push(verts2[i])
        }

        base2.geometry.computeBoundingBox();

        // bbHelper2 = new THREE.BoxHelper(base2, 0x00FFFF);
        // scene.add(bbHelper2); // adds AABB to the scene



        scene.add(tank2);

    }

    // Settings 
    if (singlePlayer) {
        camera = cameraSingleplayer;
        createchao()
        createTankSinglePlayer();
        //nBots = 6;

        if (nBots > 4) {
            espacamentoBots = -15;
        } else {
            espacamentoBots = -25;
        }


        createBots(nBots, espacamentoBots);


    }

    if (!singlePlayer) {
        camera = cameraMulti;
        createchao()
        createTanks();
    }






    //Bullets 



    function createBullet() {

        sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
        sphere.position.set(canhao.position.x, canhao.position.y, canhao.position.z + 1.35);
        sphere.position.applyMatrix4(torre.matrix);
        sphere.position.applyMatrix4(tank.matrix);




        var normalMatrix = new THREE.Matrix3().getNormalMatrix(canhao.matrixWorld);
        var normal = canhao.geometry.faces[8].normal.clone();
        worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();


        bullets.push(sphere);
        scene.add(sphere);


    }



    function createBullet2() {

        sphere2 = new THREE.Mesh(sphereGeo, sphereMaterial);
        sphere2.position.set(canhao2.position.x, canhao2.position.y, canhao2.position.z + 1.35);
        sphere2.position.applyMatrix4(torre2.matrix);
        sphere2.position.applyMatrix4(tank2.matrix);




        var normalMatrix2 = new THREE.Matrix3().getNormalMatrix(canhao2.matrixWorld);
        var normal2 = canhao2.geometry.faces[8].normal.clone();
        worldNormal2 = normal2.clone().applyMatrix3(normalMatrix2).normalize();


        bullets2.push(sphere2);
        scene.add(sphere2);


    }



    //controls
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.OrbitControls(camera);
    // controls.addEventListener('change', function () { renderer.render(scene, camera); });



    //render scene
    var render = function () {


        // bbHelper.update(base); // updates AABB 
        BBoxtank = new THREE.Box3().setFromObject(tank);


        cameraPositionTPV();
        movimento();




        //Singleplayer

        if (singlePlayer) {
             document.getElementById('stats').innerHTML = "Bem-vindo ao tiro ao alvo, destrua os Bots e dispare para celebrar ! ";
             

            //console.log(nBots)

            if (nBots == 3 ) {
                BBoxBot = new THREE.Box3().setFromObject(bots[0]);
                BBoxBot2 = new THREE.Box3().setFromObject(bots[1]);
                BBoxBot3 = new THREE.Box3().setFromObject(bots[2]);
            } if (nBots == 4 && nBots<5 ) {
                BBoxBot = new THREE.Box3().setFromObject(bots[0]);
                BBoxBot2 = new THREE.Box3().setFromObject(bots[1]);
                BBoxBot3 = new THREE.Box3().setFromObject(bots[2]);
                BBoxBot4 = new THREE.Box3().setFromObject(bots[3]);
            } if (nBots == 5 && nBots<6) {
                BBoxBot = new THREE.Box3().setFromObject(bots[0]);
                BBoxBot2 = new THREE.Box3().setFromObject(bots[1]);
                BBoxBot3 = new THREE.Box3().setFromObject(bots[2]);
                BBoxBot4 = new THREE.Box3().setFromObject(bots[3]);
                BBoxBot5 = new THREE.Box3().setFromObject(bots[4]);
            } if (nBots == 6 && nBots<7) {
                BBoxBot = new THREE.Box3().setFromObject(bots[0]);
                BBoxBot2 = new THREE.Box3().setFromObject(bots[1]);
                BBoxBot3 = new THREE.Box3().setFromObject(bots[2]);
                BBoxBot4 = new THREE.Box3().setFromObject(bots[3]);
                BBoxBot5 = new THREE.Box3().setFromObject(bots[4]);
                BBoxBot6 = new THREE.Box3().setFromObject(bots[5]);
            }


            MovimentoBots(nBots);

            for (var i = 0; i < arrayVtank.length; i++) {
                var v = arrayVtank[i].clone();
                v.applyMatrix4(tank.matrix)
            }

            if (disparar) {
                balahitbot = BBoxBot.containsPoint(bullets[0].position)
                balahitbot2 = BBoxBot2.containsPoint(bullets[0].position)
                balahitbot3 = BBoxBot3.containsPoint(bullets[0].position)
                 if (hpbots[0] <=0 && hpbots[1] <=0 &&hpbots[2] <=0 ){
                         goverbots=true;
                      
                 }
              if (nBots == 4 ) {
                   balahitbot4 = BBoxBot4.containsPoint(bullets[0].position)
                    if (hpbots[0] <=0 && hpbots[1] <=0 &&hpbots[2] <=0 &&hpbots[3] <=0  ){
                         goverbots=true;
                      
                 }
              } 
              if (nBots == 5 ) {
                   balahitbot4 = BBoxBot4.containsPoint(bullets[0].position)
                   balahitbot5 = BBoxBot5.containsPoint(bullets[0].position)
                    if (hpbots[0] <=0 && hpbots[1] <=0 &&hpbots[2] <=0 &&hpbots[3] <=0 &&hpbots[4] <=0 ){
                         goverbots=true;
                      
                 }
              } 
              if (nBots == 6 ) {
                  balahitbot4 = BBoxBot4.containsPoint(bullets[0].position)
                   balahitbot5 = BBoxBot5.containsPoint(bullets[0].position)
                   balahitbot6 = BBoxBot6.containsPoint(bullets[0].position)
                     if (hpbots[0] <=0 && hpbots[1] <=0 &&hpbots[2] <=0 &&hpbots[3] <=0 &&hpbots[4] <=0 &&hpbots[5] <=0 ){
                         goverbots=true;
                      
                 }
              } 
               
               

                for(var i =0;i<hpbots.length;i++){

                }

              if (balahitbot || balahitbot2 || balahitbot3 || balahitbot4 || balahitbot5 || balahitbot6){

                        if (balahitbot) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    hpbots[0] = hpbots[0] - 1;
                    disparar = false;
                    reload = false
                    inc = 1;
                  
                    if (hpbots[0] == 0) {
                        scene.remove(bots[0]);
                       
                        //gameoverbots();
                    }

                }
                if (balahitbot2) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    hpbots[1] = hpbots[1] - 1;
                    disparar = false;
                    reload = false
                    inc = 1;
                  
                    if (hpbots[1] == 0) {
                        scene.remove(bots[1]);
                        
                    }

                }
                if (balahitbot3) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    hpbots[2] = hpbots[2] - 1;
                    disparar = false;
                    reload = false
                    inc = 1;
                  
                    if (hpbots[2] == 0) {
                        scene.remove(bots[2]);
                    }

                }

                if (balahitbot4) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    hpbots[3] = hpbots[3] - 1;
                    disparar = false;
                    reload = false
                    inc = 1;
                   
                    if (hpbots[3] == 0) {
                        scene.remove(bots[3]);
                    }

                }

                if (balahitbot5) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    hpbots[4] = hpbots[4] - 1;
                    disparar = false;
                    reload = false
                    inc = 1;
                
                    if (hpbots[4] == 0) {
                        scene.remove(bots[4]);
                    }

                }

                if (balahitbot6) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    hpbots[5] = hpbots[5] - 1;
                    disparar = false;
                    reload = false
                    inc = 1;
                  
                    if (hpbots[5] == 0) {
                        scene.remove(bots[5]);
                    }

                }


               //  console.log(hpbots[0],hpbots,somaHP)

                }else {

                    var n = worldNormal.clone()
                    bullets[0].position.addVectors(tank.position, n.multiplyScalar(inc));
                    inc++;

                }

            }

            for (var i = 0; i < arraycubos.length; i++) {

                BBox = arraycubos[i];


                if (disparar) {
                    collisionbala = BBox.containsPoint(bullets[0].position); // checks collision 
                    if (collisionbala == true) {
                        scene.remove(bullets[0])
                        bullets.splice(0, 1);
                        disparar = false;
                        reload = false;
                        inc = 1;
                        collisionbala = false;
                    }
                }

                for (var h = 0; h < arrayVtank.length; h++) {

                    v = arrayVtank[h].clone();
                    v.applyMatrix4(tank.matrix)

                    collisiontank = BBox.containsPoint(v); // checks collision


                    if (collisiontank == true) {
                        break;
                    }

                }
                if (collisiontank == true) {
                    break;
                }
            }

        }

 if (goverbots){
     gameover("3");
 }
        //Multiplayer
        if (!singlePlayer) {

            document.getElementById('stats').innerHTML = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0 HP Tank Jogador 1 :  " + HpTank + "  \xa0\xa0\xa0\xa0\xa0\xa0\xa0--------------------------------\xa0\xa0\xa0\xa0\xa0\xa0\xa0  " + "HP Tank Jogador 2 : " + HpTank2;

            for (var i = 0; i < arrayVtank.length; i++) {
                var v = arrayVtank[i].clone();
                v.applyMatrix4(tank.matrix)
            }


            for (var j = 0; j < arrayVtank2.length; j++) {
                var v2 = arrayVtank2[j].clone();
                v2.applyMatrix4(tank2.matrix);

            }



            // bbHelper2.update(base2); // updates AABB 
            BBoxtank2 = new THREE.Box3().setFromObject(tank2);



            ctanktank= BBoxtank2.intersectsBox(BBoxtank)
            
            
            

            if (disparar) {

                	// bala tank1 acerta 2 
                bala1hit2 = BBoxtank2.containsPoint(bullets[0].position)

                if (bala1hit2) {

                    scene.remove(bullets[0])
                    bullets.splice(0, 1);
                    HpTank2 = HpTank2 - 1;
                    disparar = false;
                    reload = false;

                    inc = 1;
                    if (HpTank2 == 0) {
                        gameover("1");
                    }

                }
                else {

                    var n = worldNormal.clone();

                    bullets[0].position.addVectors(tank.position, n.multiplyScalar(inc));

                    inc++;

                }

            }


            if (disparar2) {
                // bala tank2 acerta 1 
                bala2hit1 = BBoxtank.containsPoint(bullets2[0].position)
                if (bala2hit1) {

                    scene.remove(bullets2[0])
                    bullets2.splice(0, 1);
                    HpTank = HpTank - 1;
                    disparar2 = false;
                    reload2 = false;
                    inc2 = 1;
                    if (HpTank == 0) {
                        gameover("2");
                    }

                }
                else {

                    var n2 = worldNormal2.clone();

                    bullets2[0].position.addVectors(tank2.position, n2.multiplyScalar(inc2));

                    inc2++;


                }

            }

            for (var i = 0; i < arraycubos.length; i++) {

                BBox = arraycubos[i];

                //colisao balas com arena 

                if (disparar) {
                    collisionbala = BBox.containsPoint(bullets[0].position); // checks collision 
                    if (collisionbala == true) {
                        scene.remove(bullets[0])
                        bullets.splice(0, 1);
                        disparar = false;
                        reload = false;
                        inc = 1;
                        collisionbala = false;
                    }
                }

                if (disparar2) {
                    collisionbala2 = BBox.containsPoint(bullets2[0].position); // checks collision 
                    if (collisionbala2 == true) {
                        scene.remove(bullets2[0])
                        bullets2.splice(0, 1);
                        disparar2 = false;
                        reload2 = false;
                        inc2 = 1;
                        collisionbala2 = false;
                    }
                }



                //colisao com a arena
                for (var h = 0; h < arrayVtank.length; h++) {

                    v = arrayVtank[h].clone();
                    v.applyMatrix4(tank.matrix)

                    v2 = arrayVtank2[h].clone();
                    v2.applyMatrix4(tank2.matrix)

                   

                    collisiontank = BBox.containsPoint(v); // checks collision
                    collisiontank2 = BBox.containsPoint(v2); // checks collision  



                    if (collisiontank == true) {
                        break;
                    }
                    if (collisiontank2 == true) {
                        break;
                    }


                }
                if (collisiontank == true) {
                    break;
                }
                if (collisiontank2 == true) {
                    break;
                }
            }

        }




        renderer.render(scene, camera);
        requestAnimationFrame(render);

    };

    function gameover(tank) { 
        if(tank=="1"){
              alert(" Parabéns Jogador 1 ! \n Jogo acabou o Tank do jogador 2 foi destruido !")
        }
        if(tank=="2"){
              alert(" Parabéns Jogador 2 ! \n Jogo acabou o Tank do jogador 1 foi destruido !")
        }
        if(tank=="3"){
                alert("\n Parabéns ! \n Destruiu com sucesso os Bots ! \n Experimente o Modo 2 jogadores com um amigo ! ")
        }
      
          window.location.replace("Tank.html");
    }

   

    function shoot1() {

        if (reload == false) {
            createBullet();
        }

        disparar = true;
        reload = true;


    }
    function shoot2() {

        if (reload2 == false) {
            createBullet2();
        }

        disparar2 = true;
        reload2 = true;


    }



    function movimento() {

        //collision
        if (collisiontank == true) {
            tank.position.x = positionx;
            tank.position.z = positionz;
        }

        if (collisiontank2 == true) {
            tank2.position.x = positionx2;
            tank2.position.z = positionz2;
        }

        if (ctanktank == true) {
            tank2.position.x = positionx2;
            tank2.position.z = positionz2;
            tank.position.x = positionx;
            tank.position.z = positionz;
        }

        //Tank1

        if (canhaovirar == 1) {
            torre.rotation.y += 0.06;
            canhaovirar = 0;

        }

        if (canhaovirar == -1) {
            torre.rotation.y += -0.06;
            canhaovirar = 0;
        }

        if (tankfrente == 1) {
            positionx = tank.position.x + 2 * (velocidade * Math.cos(-angCanhaovirar));
            positionz = tank.position.z + 2 * (velocidade * Math.sin(-angCanhaovirar));
            tank.position.x -= velocidade * Math.cos(-angCanhaovirar);
            tank.position.z -= velocidade * Math.sin(-angCanhaovirar);


        }
        if (tankfrente == -1) {
            positionx = tank.position.x - 2 * (velocidade * Math.cos(-angCanhaovirar));
            positionz = tank.position.z - 2 * (velocidade * Math.sin(-angCanhaovirar));
            tank.position.x += velocidade * Math.cos(-angCanhaovirar);
            tank.position.z += velocidade * Math.sin(-angCanhaovirar);

        }

        if (tankdireita == -1) {
            angCanhaovirar += 0.01;
            tank.rotation.y = angCanhaovirar - Math.PI / 2;


        }

        if (tankdireita == 1) {
            angCanhaovirar -= 0.01;
            tank.rotation.y = angCanhaovirar - Math.PI / 2;

        }

        //tank2


        if (canhaovirar2 == 1) {
            torre2.rotation.y += 0.06;
            canhaovirar2 = 0;
        }

        if (canhaovirar2 == -1) {
            torre2.rotation.y += -0.06;
            canhaovirar2 = 0;
        }

        if (tankfrente2 == 1) {
            positionx2 = tank2.position.x + 2 * (velocidade * Math.cos(-angCanhaovirar2));
            positionz2 = tank2.position.z + 2 * (velocidade * Math.sin(-angCanhaovirar2));
            tank2.position.x -= velocidade * Math.cos(-angCanhaovirar2);
            tank2.position.z -= velocidade * Math.sin(-angCanhaovirar2);


        }
        if (tankfrente2 == -1) {
            positionx2 = tank2.position.x - 2 * (velocidade * Math.cos(-angCanhaovirar2));
            positionz2 = tank2.position.z - 2 * (velocidade * Math.sin(-angCanhaovirar2));
            tank2.position.x += velocidade * Math.cos(-angCanhaovirar2);
            tank2.position.z += velocidade * Math.sin(-angCanhaovirar2);

        }

        if (tankdireita2 == -1) {
            angCanhaovirar2 += 0.01;
            tank2.rotation.y = angCanhaovirar2 - Math.PI / 2;


        }

        if (tankdireita2 == 1) {
            angCanhaovirar2 -= 0.01;
            tank2.rotation.y = angCanhaovirar2 - Math.PI / 2;

        }






    }


    function handleKeyDown(event) {

        char = String.fromCharCode(event.keyCode);

        switch (char) {

            // tank 1
            case "M":
                canhaovirar = 1;
                break;

            case "N":
                canhaovirar = -1;
                break;

            case "W":
                tankfrente = 1;
                break;

            case "S":
                tankfrente = -1;
                break;

            case "A":
                tankdireita = -1;
                break;

            case "D":
                tankdireita = 1;
                break;

            case " ":
                shoot1();
                break;

            //tank2 

            case "b":
                canhaovirar2 = 1;
                break;

            case "a":
                canhaovirar2 = -1;
                break;

            case "&":
                tankfrente2 = 1;
                break;

            case "(":
                tankfrente2 = -1;
                break;

            case "%":
                tankdireita2 = -1;
                break;

            case "'":
                tankdireita2 = 1;
                break;

            case "`":
                shoot2();
                break;



        }
    }



    function handleKeyUp(event) {

        char = String.fromCharCode(event.keyCode);

        switch (char) {

            //tank1 
            case "M":
                canhaovirar = 0;
                break;
            case "N":
                canhaovirar = 0;
                break;

            case "W":
                tankfrente = 0;
                break;
            case "S":
                tankfrente = 0;
                break;
            case "A":
                tankdireita = 0;
                break;
            case "D":
                tankdireita = 0;
                break;

            //tank2
            case "b":
                canhaovirar2 = 0;
                break;

            case "a":
                canhaovirar2 = 0;
                break;

            case "&":
                tankfrente2 = 0;
                break;

            case "(":
                tankfrente2 = 0;
                break;

            case "%":
                tankdireita2 = 0;
                break;

            case "'":
                tankdireita2 = 0;
                break;

        }
    }
    render();

}

