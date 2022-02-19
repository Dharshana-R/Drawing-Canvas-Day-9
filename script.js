const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = ctx.lineCap = 'round';
ctx.lineWidth = .5;

let isDrawing = false;
let hue = 0;
let points = []

function draw(e) {


    if (!isDrawing) return;

    points.push({ x: e.offsetX, y: e.offsetY })

    ctx.strokeStyle = `hsl(${hue % 360}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
    // go to
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].yY);
    ctx.stroke();

    points.forEach((p, i) => {
        dx = points[i].x - points[points.length - 1].x;
        dy = points[i].y - points[points.length - 1].y;
        d = dx * dx + dy * dy

        if (d < 2000) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${hue % 360}, 100%, 50%)`;
            ctx.moveTo(points[points.length - 1].x + (dx * 0.2), points[points.length - 1].y + (dy * 0.2));
            ctx.lineTo(points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
            ctx.stroke();
        }
    })

    hue++;
}

canvas.addEventListener('mousedown', (e) => {
    points = []
    isDrawing = true;
    points.push({ x: e.offsetX, y: e.offsetY });
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        points = []
        isDrawing = !isDrawing;
        points.push({ x: e.offsetX, y: e.offsetY });
    }
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    points = [];
});
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    points = [];
});