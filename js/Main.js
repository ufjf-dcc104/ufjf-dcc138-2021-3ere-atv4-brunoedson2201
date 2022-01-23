import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import AssetManager from "./AssetManager.js";
import Mapa from "./Mapa.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";

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
canvas.width = 20 * 32;
canvas.height = 14 * 32;

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
});

const mapa1 = new Mapa(14, 20, 32);
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
cena1.adicionar(pc);

function perseguePC(dt){
    this.vx = 25*Math.sign(pc.x - this.x);
    this.vy = 25*Math.sign(pc.y - this.y);
}

const en1 = new Sprite({ x: 360, color: "red", controlar: perseguePC });
cena1.adicionar(en1);
cena1.adicionar(new Sprite({ x: 115, y: 70, vy: 10, color: "red", controlar: perseguePC }));
cena1.adicionar(new Sprite({ x: 115, y: 160, vy: -10, color: "red", controlar: perseguePC }));
cena1.adicionar(new Sprite({ x: 550, y: 220, vy: -20, color: "red", controlar: perseguePC }));
cena1.adicionar(new Sprite({ x: 450, y: 32, vy: -35, color: "red", controlar: perseguePC }));
cena1.adicionar(new Sprite({ x: 500, y: 350, vy: -50, color: "red", controlar: perseguePC }));

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