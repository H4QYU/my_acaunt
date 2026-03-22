// إعداد الأصوات
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
const hoverSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");

document.querySelectorAll("a, .btn").forEach(el=>{
  el.addEventListener("mouseenter", ()=>{
    hoverSound.currentTime=0;
    hoverSound.play();
  });
  el.addEventListener("click", ()=>{
    clickSound.currentTime=0;
    clickSound.play();
  });
});

// عناصر Intro
const intro = document.getElementById("intro");
const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");
const aboutPopup = document.getElementById("aboutPopup");
const avatar = document.getElementById("avatar");

const main = document.getElementById("main");
const miniLogo = document.getElementById("miniLogo");
const aboutExpanded = document.getElementById("aboutExpanded");

// Typing effect
function typeText(element,text,delay=150,callback){
  let i=0;
  element.innerHTML="";
  const interval=setInterval(()=>{
    element.innerHTML += text[i];
    i++;
    if(i>=text.length){
      clearInterval(interval);
      if(callback) callback();
    }
  },delay);
}

// Intro animation
function showIntroContent(){
  typeText(nameEl,"H4QYU",100,()=>{
    typeText(roleEl,"Developer",100,()=>{
      aboutPopup.classList.add("active");
      avatar.classList.add("active");
      setTimeout(()=>avatar.classList.remove("active"),1000);
    });
  });
}

// Show Main Content
function showMainContent(){
  intro.style.display="none";
  main.style.display="block";
  miniLogo.style.display="block";
  aboutExpanded.classList.add("active");
}

// Event listeners
window.addEventListener("load", showIntroContent);
intro.addEventListener("click", showMainContent);
window.addEventListener("wheel", showMainContent);
window.addEventListener("keydown", e=>{
  if(["ArrowDown","Enter"," "].includes(e.key)) showMainContent();
});

/* --------------------------
   HACKER / MATRIX EFFECT – النسخة الأصلية مع Background قابل للتغيير
---------------------------- */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// هنا يمكنك تغيير لون الخلفية بسهولة
const BACKGROUND_COLOR = 'rgba(23, 19, 43, 0.1)'; // مثال: أسود شفاف (Fade)
// const BACKGROUND_COLOR = 'rgba(255,255,255,0.1)'; // لو تريد أبيض فاتح
// const BACKGROUND_COLOR = 'rgba(20,20,40,0.1)'; // لو تريد لون غامق مختلف

const chars = '0123456789ABCDEF<>/{}[]()@$%#&*!'.split('');
const particles = [];

class Particle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.speed = Math.random()*1.5+0.5;
    this.char = chars[Math.floor(Math.random()*chars.length)];
    this.opacity = Math.random();
    this.color = '#00ff00'; // اللون الأخضر الأصلي
    this.size = Math.random()*16+8;
  }
  update(){
    this.y += this.speed;
    if(this.y > canvas.height){
      this.y = 0;
      this.x = Math.random()*canvas.width;
      this.char = chars[Math.floor(Math.random()*chars.length)];
      this.opacity = Math.random();
      this.size = Math.random()*16+8;
    }
  }
  draw(){
    ctx.fillStyle = `rgba(0,255,0,${this.opacity})`;
    ctx.font = `${this.size}px monospace`;
    ctx.fillText(this.char,this.x,this.y);
  }
}

// إنشاء الجسيمات
for(let i=0;i<300;i++) particles.push(new Particle());

// رسم الحروف
function drawHacker(){
  ctx.fillStyle = BACKGROUND_COLOR; // الخلفية يمكن تغييرها هنا
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.update();
    p.draw();
  });

  requestAnimationFrame(drawHacker);
}

drawHacker();

// تحديث حجم canvas عند تغيير حجم الشاشة
window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});