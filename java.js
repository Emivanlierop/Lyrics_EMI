
/* =========================================================
   PREMIUM SONGWRITER WEBSITE
   APP.JS
   ========================================================= */


/* =========================================================
   STAR FIELD BACKGROUND
   ========================================================= */

   window.history.scrollRestoration = "manual";

window.onload = function () {
    window.scrollTo(0, 0);
};

const canvas = document.getElementById("stars");
const ctx = canvas?.getContext("2d");

let stars = [];
let shootingStars = [];

function resizeCanvas(){

    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
()=>{

resizeCanvas();
createStars();

});



function createStars(){

    stars = [];

    const amount =
    Math.min(
        window.innerWidth / 4,
        250
    );


    for(let i = 0; i < amount; i++){

        stars.push({

            x:
            Math.random() * canvas.width,

            y:
            Math.random() * canvas.height,

            radius:
            Math.random() * 1.4,

            opacity:
            Math.random(),

            speed:
            Math.random() * 0.02 + 0.002

        });

    }

}


createStars();



function drawStars(){

    if(!ctx) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(star=>{


        star.opacity += star.speed;


        if(
            star.opacity > 1 ||
            star.opacity < .15
        ){

            star.speed *= -1;

        }


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
        `rgba(245,243,239,${star.opacity})`;

        ctx.shadowBlur = 8;
ctx.shadowColor = "rgba(245,243,239,.5)";
ctx.fill();
ctx.shadowBlur = 0;


    });



    shootingStars.forEach(
        (star,index)=>{


        star.x += star.speedX;
        star.y += star.speedY;


        ctx.beginPath();

        ctx.moveTo(
            star.x,
            star.y
        );

        ctx.lineTo(
            star.x - 80,
            star.y - 80
        );


        ctx.strokeStyle =
        "rgba(201,174,114,.6)";

        ctx.lineWidth = 1;

        ctx.stroke();



        if(
            star.x > canvas.width ||
            star.y > canvas.height
        ){

            shootingStars.splice(
                index,
                1
            );

        }


    });


    requestAnimationFrame(drawStars);

}


drawStars();



/* =========================================================
   SHOOTING STARS
   ========================================================= */


function createShootingStar(){

    if(!canvas) return;


    shootingStars.push({

        x:
        Math.random() *
        canvas.width,

        y:
        Math.random() *
        canvas.height / 2,


        speedX:
        Math.random()*3+3,


        speedY:
        Math.random()*3+3

    });

}



setInterval(()=>{

    if(Math.random() > .5){

        createShootingStar();

    }

},7000);




/* =========================================================
   MOUSE GLOW
   ========================================================= */


const glow =
document.getElementById(
    "mouse-glow"
);


if(glow){


document.addEventListener(
"mousemove",
(e)=>{


    glow.style.left =
    `${e.clientX}px`;


    glow.style.top =
    `${e.clientY}px`;


    glow.style.opacity =
    "1";


});


document.addEventListener(
"mouseleave",
()=>{

    glow.style.opacity="0";

});


}



/* =========================================================
   SCROLL REVEAL
   ========================================================= */


const revealElements =
document.querySelectorAll(
".reveal"
);


const revealObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){

        entry.target.classList.add(
            "active"
        );

    }


});


},
{

    threshold:.15

});



revealElements.forEach(
(element)=>{

    revealObserver.observe(element);

});



/* =========================================================
   HERO TEXT FADE
   ========================================================= */


window.addEventListener(
"load",
()=>{


document
.querySelector(".hero-content")
?.classList.add(
"fade-text"
);


});



/* =========================================================
   IMAGE PARALLAX
   ========================================================= */


const parallaxImages =
document.querySelectorAll(
".parallax"
);


window.addEventListener(
"scroll",
()=>{


const scroll =
window.scrollY;


parallaxImages.forEach(
(image)=>{


const speed =
0.04;


image.style.transform =
`translateY(${scroll * speed}px)`;


});


});



/* =========================================================
   LYRICS MODAL
   ========================================================= */


const modal =
document.querySelector(
".lyrics-modal"
);


const closeModal =
document.querySelector(
".close-modal"
);



const lyricsButtons =
document.querySelectorAll(
".lyrics-btn"
);



lyricsButtons.forEach(
(button)=>{


button.addEventListener(
"click",
()=>{


const song =
button.dataset.song;


const data =
window.songs?.[song];


if(data){


document.querySelector(
".modal-content h2"
).textContent =
data.title;


document.querySelector(
"#lyrics-container"
).textContent =
data.lyrics;


}


modal.classList.add(
"active"
);


});


});



closeModal?.addEventListener(
"click",
()=>{

modal.classList.remove(
"active"
);

});



modal?.addEventListener(
"click",
(e)=>{


if(
e.target === modal
){

modal.classList.remove(
"active"
);

}


});



/* =========================================================
   ESC CLOSE MODAL
   ========================================================= */


document.addEventListener(
"keydown",
(e)=>{


if(
e.key === "Escape"
){

modal?.classList.remove(
"active"
);

}


});



/* =========================================================
   SMOOTH ANCHOR OFFSET
   ========================================================= */


document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{


anchor.addEventListener(
"click",
function(e){


const target =
document.querySelector(
this.getAttribute("href")
);


if(target){

e.preventDefault();


window.scrollTo({

top:
target.offsetTop - 80,

behavior:
"smooth"

});


}


});


});



/* =========================================================
   SIMPLE AUDIO CONTROL
   ========================================================= */


const audioPlayers =
document.querySelectorAll(
"audio"
);


audioPlayers.forEach(
(audio)=>{


audio.addEventListener(
"play",
()=>{


audio.closest(
".audio-player"
)
?.classList.add(
"playing"
);


});


audio.addEventListener(
"pause",
()=>{


audio.closest(
".audio-player"
)
?.classList.remove(
"playing"
);


});


});



/* =========================================================
   PAGE LOAD FADE
   ========================================================= */


window.addEventListener(
"load",
()=>{


document.body.classList.add(
"loaded"
);


});


const contactForm = document.getElementById("contact-form");
const successMessage = document.querySelector(".form-success");


contactForm?.addEventListener("submit", async function(e){

    e.preventDefault();


    const formData = new FormData(contactForm);


    const response = await fetch(
        contactForm.action,
        {
            method:"POST",
            body:formData,
            headers:{
                "Accept":"application/json"
            }
        }
    );


    if(response.ok){

        contactForm.style.display="none";

        successMessage.style.display="block";

    }

});