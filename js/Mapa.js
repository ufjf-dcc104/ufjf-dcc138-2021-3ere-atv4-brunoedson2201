export default class Mapa {
    constructor(linhas = 8, colunas = 12, tamanho = 32) {
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
    }

    desenhar(ctx){
        for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
                switch (this.tiles[l][c]) {
                    case 1:
                        ctx.fillStyle = "grey";
                        ctx.lineWidth = 1;
                        ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                        ctx.strokeStyle = "black";
                        ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                        break;

                    default:
                        ctx.fillStyle = "black";
                        ctx.lineWidth = 1;
                        ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                        ctx.strokeStyle = "grey";
                        ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                }

            }
        }

    }
}