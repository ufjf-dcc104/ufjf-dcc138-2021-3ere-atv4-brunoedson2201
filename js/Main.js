
import AssetManager from "./AssetManager.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";

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
    " ": "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);

const mapa1 = new Mapa(18, 24, 32);
const cena0 = new CenaCarregando(canvas, assets, mapa1);
const cena1 = new CenaJogo(canvas, assets, mapa1);
const cena2 = new CenaFim(canvas, assets, mapa1);
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("fim", cena2);

game.iniciar();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
        case "S":
            game.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "p":
            assets.play("boom");
            break;
    }
});