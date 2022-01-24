import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import AssetManager from "./AssetManager.js";
import Mapa from "./Mapa.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaImagem("chao", "assets/chao.png");
assets.carregaImagem("parede", "assets/parede.png");

assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");
assets.carregaAudio("colisao", "assets/colisao.wav");


const canvas = document.querySelector("canvas");
canvas.width = 24 * 32;
canvas.height = 18 * 32;

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
});

const mapa1 = new Mapa(18, 24, 32);
mapa1.carregaMapa(modeloMapa1);

const cena1 = new Cena(canvas, assets, mapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({ x: 50, y: 150, vx: 10 });
pc.controlar = function(dt){
    if(input.comandos.get("MOVE_ESQUERDA")){
        this.vx = -50;
    }else if(input.comandos.get("MOVE_DIREITA")){
        this.vx = +50;
    }else{
        this.vx = 0;
    }
    if(input.comandos.get("MOVE_CIMA")){
        this.vy = -50;
    }else if(input.comandos.get("MOVE_BAIXO")){
        this.vy = +50;
    }else{
        this.vy = 0;
    }
}

const game = new Game(canvas, assets, input);

cena1.adicionar(pc);
game.adicionarCena("jogo", cena1);

function perseguePC(dt){
    this.vx = 25 * Math.sign(pc.x - this.x);
    this.vy = 25 * Math.sign(pc.y - this.y);
}

adicionaInimigo();

function adicionaInimigo(){
    let p = 0, q = 0;
    while (mapa1.tiles[p][q] !== 0){
        p = Math.floor(Math.random() * (mapa1.LINHAS - 1 + 1) + 1);
        q = Math.floor(Math.random() * (mapa1.COLUNAS - 1 + 1) + 1);
    }

    cena1.adicionar(new Sprite({x: q * 32 + 32 / 2, y: p * 32 + 32 / 2, color: "red", controlar: perseguePC,}));
    setTimeout(adicionaInimigo, 10000);
}


const en1 = new Sprite({ x: 600, color: "red", controlar: perseguePC });
cena1.adicionar(en1);
cena1.adicionar(new Sprite({ x: 300, y: 190, vy: 10, color: "red", controlar: perseguePC }));
cena1.adicionar(new Sprite({ x: 450, y: 357, vy: -80, color: "red", controlar: perseguePC }));

cena1.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S":
            cena1.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "p":
            assets.play("boom");
            break;
    }
});