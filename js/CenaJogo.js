import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) {
            this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b);
        }
        if (a.tags.has("pc") && b.tags.has("enemy")) {
            this.game.selecionaCena("fim");
        }
    }
    preparar() {
        super.preparar();

        const mapa1 = new Mapa(18, 24, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({ x: 50, y: 150, vx: 10 });
        pc.tags.add("pc");
        
        const cena = this;

        pc.controlar = function (dt) {
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
            } else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = +50;
            } else {
                this.vx = 0;
            }
            if (cena.input.comandos.get("MOVE_CIMA")) {
                this.vy = -50;
            } else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vy = +50;
            } else {
                this.vy = 0;
            }
        }

        this.adicionar(pc);

        function perseguePC(dt) {
            this.vx = 25 * Math.sign(pc.x - this.x);
            this.vy = 25 * Math.sign(pc.y - this.y);
        }

        const en1 = new Sprite({ x: 600, color: "red", controlar: perseguePC, tags: ["enemy"] });
        this.adicionar(en1);
        
        adicionaInimigo();

        function adicionaInimigo() {
            let p = 0, q = 0;
            while (mapa1.tiles[p][q] !== 0) {
                p = Math.floor(Math.random() * (mapa1.LINHAS - 1 + 1) + 1);
                q = Math.floor(Math.random() * (mapa1.COLUNAS - 1 + 1) + 1);
            }
            cena.adicionar(new Sprite({ x: q * 32 + 32 / 2, y: p * 32 + 32 / 2, color: "red", controlar: perseguePC, tags: ["enemy"] }));
            setTimeout(adicionaInimigo, 10000);
        }

    }
}