export class Balloons {

    balloonContainer: HTMLElement | null = null;

    constructor (container: HTMLElement) {
        this.balloonContainer = container;
    }

    random(num: number) {
        return Math.floor(Math.random() * num);
    }

    getRandomStyles() {
        var r = this.random(255);
        var g = this.random(255);
        var b = this.random(255);
        var mt = this.random(200);
        var ml = this.random(50);
        var dur = this.random(5) + 5;
        return `
      background-color: rgba(${r},${g},${b},0.7);
      color: rgba(${r},${g},${b},0.7); 
      box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
      margin: ${mt}px 0 0 ${ml}px;
      animation: balloon-float ${dur}s ease-in infinite
      `;
    }

    createBalloons(num: number) {
        this.balloonContainer!.classList.add('balloon-container');
        for (var i = num; i > 0; i--) {
            var balloon = document.createElement("div");
            balloon.className = "balloon";
            balloon.style.cssText = this.getRandomStyles();
            this.balloonContainer!.append(balloon);
        }
    }

    removeBalloons() {
        var balloons = this.balloonContainer?.querySelectorAll('.balloon');
        for (const balloon of balloons!) {
            balloon.remove();
        }

    }
}

