export default class Mapa {
    constructor(linhas = 14, colunas = 20, tamanho = 32) {
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = tamanho;
        this.tiles = [];

        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = 0;
            }
        }
        this.cena = null;
        this.mapa = null;
    }

    desenhar(ctx) {
        for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
                switch (this.tiles[l][c]) {
                    case 0:
                        ctx.drawImage(
                            this.cena.assets.img("chao"),
                            32,
                            40,
                            32,
                            32,
                            c * this.SIZE,
                            l * this.SIZE,
                            this.SIZE,
                            this.SIZE
                        );
                        break;
                    case 1:
                        ctx.drawImage(
                            this.cena.assets.img("parede"),
                            32,
                            20,
                            40,
                            32,
                            c * this.SIZE,
                            l * this.SIZE,
                            40,
                            32
                        );
                        break;
                    default:
                        ctx.drawImage(
                            this.cena.assets.img("chao"),
                            32,
                            40,
                            32,
                            32,
                            c * this.SIZE,
                            l * this.SIZE,
                            this.SIZE,
                            this.SIZE
                        );
                        break;
                }
            }
        }
    }

    carregaMapa(modelo) {
        this.LINHAS = modelo.length;
        this.COLUNAS = modelo[0]?.length ?? 0;
        this.tiles = [];

        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = modelo[l][c];
            }
        }
    }
}