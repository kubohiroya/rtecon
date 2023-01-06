import {Model} from "./model";

export class View {

    model: Model | null = null;

    width: number;
    height: number;

    canvas: HTMLCanvasElement = null;

    constructor(canvas: HTMLCanvasElement, model: Model) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.model = model;
	}

    repaint() {
        const ctx = this.canvas.getContext("2d");
        const wScale = this.width / this.model.country.numCities;
        const hScale = this.height / 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.width, this.height);
        const delta = this.model.country.getDelta();
        const data = this.model.country.getMShare();
        for (let i = 0; i < this.model.country.numCities; i++) {
            if (delta && delta[i] < 0) {
                ctx.fillStyle = '#ff0000'
            } else {
                ctx.fillStyle = '#0000ff';
            }
            ctx.fillRect(i * wScale,
                this.height - data[i] * hScale,
                wScale - 1,
                data[i] * hScale);
        }
    }
}
