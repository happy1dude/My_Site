// Определяем самовызывающуюся функцию
(function() {
    // Получаем элемент Canvas по id
    let canvas = document.getElementById('canvas');
    // Опредеяем контекст как 2d
    let ctx = canvas.getContext('2d');

    // Ширина и высота для определения окна пользователя
    let w = canvas.width = document.documentElement.clientWidth;
    let h = canvas.height = innerHeight;

    // Массив для частиц
    let particles = [];
    // Настройки объктов
    let properties = {
        bgColor: 'rgba(37, 37, 37, 1)', 
        particleColor: 'rgba(139, 144, 148, 0.5)',
        particleRadius: 3,
        particleCount: 13,
        particleMaxVelocity: 2,
        lineLength: 350
    };

    // Функция, которая меняет размер canvas под размер экрана пользователя
    window.onresize = function(){
        w = canvas.width = document.documentElement.clientWidth;
        h = canvas.height = innerHeight;
    }

    
    class Particle {
        // Определяем свойства частиц
        constructor() {
            // Определим положение по осям X, Y. Размер кубиков, скорость "перемещения"
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.sizeCube = Math.floor(Math.random() * (200 - 350)) + 200;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
        }
        // Позицианирование в пространстве
        position() {
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        // Отрисовывает частицы на canvas
        reDraw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.sizeCube, this.sizeCube);
            ctx.strokeStyle = properties.particleColor;
            ctx.lineWidth = '2';
            ctx.stroke();
            ctx.closePath();
        }
    }

    // Соединительные линии между объектами
    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLength) {
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = properties.particleColor;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    // Применяем цвет к фону canvas
    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h)
    }

    // 
    function reDrawParticles(){
        for(let i in particles){
            particles[i].position();
            particles[i].reDraw();
        }
    }

    // Рекурсия функций
    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop); 
    }

    // Запаускает рекурсивную функцию loop
    function init() {
        for(let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop();
    }
    
    init();

}())
