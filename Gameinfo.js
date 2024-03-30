//we are making it a function so we can use async

async function getdata(){
    //just a precaution
    let debug_url ="https://itch.io/api/1/ZQ2JiAnQXLKUv4vJB4ReFB9UvRpmGm3Kmji7hTA7/my-games"
    //accessing the itch api. We HAVE TO use a proxy otherwise we get CORS errors
    let url="https://api.codetabs.com/v1/proxy/?quest=https://itch.io/api/1/ZQ2JiAnQXLKUv4vJB4ReFB9UvRpmGm3Kmji7hTA7/my-games"

    //awaiting a response from the server
    let response = await fetch(url);
    //turning into a json
    response = await response.json();

    //gets only the games
    response=response["games"];
    //gets the number of games
    leng=Object.keys(response).length;
    //for each game
    for (let i=0; i<leng; i++){
        //if its it lies in the dark
        if (response[i]["id"]===2549040){
            //gets the downloads and views
            let downloads =(response[i]["downloads_count"])
            let views =(response[i]["views_count"])

            return [downloads, views];
        }
    }
}

function load(){
    let download_counter=document.getElementById("download_counter")
    let view_counter=document.getElementById("view_counter")
    let download_bar= document.getElementById("download_bar");
    let view_bar= document.getElementById("view_bar");
    setdata();
    const cursor= document.querySelector('.cursor');
    let flashlightable= document.querySelector('.flashlightable');
    let mouseX=0;
    let mouseY=0;
    const bro=document.getElementById('bro');
    const positionElement = (e)=> {

        mouseY = e.clientY;
        mouseX = e.clientX;

        cursor.style.transform = `translate3d(${mouseX-10}px, ${mouseY-5}px, 0)`;
        //if stuff


        flashlightable.style.webkitMaskImage = `radial-gradient(circle at ${mouseX/window.innerWidth*100}% ${mouseY/window.innerHeight*100}%, black -10%, transparent 30%)`;

// And set the mask-image property
        flashlightable.style.maskImage = `radial-gradient(circle at ${mouseX/window.innerWidth*100}% ${mouseY/window.innerHeight*100}%, black 0%, transparent 40%)`;
    }


    function removebro(){
        bro.classList.add("animate_adios")
        bro.opacity="0";
    }
    window.addEventListener('mousemove', positionElement);
    bro.addEventListener("mouseover",removebro)
}

function setdata(){
    getdata().then(
        function(data){

            //this somehow works
            download_counter.textContent=data[0];

            view_counter.textContent=data[1];
            //max downloads
            let downloadbound=100;
            //max views
            let view_bound=400;

            let ratio=(data[0]/downloadbound)*90;
            download_bar.style.width=ratio.toString()+"vh";
            ratio=(data[1]/view_bound)*90;
            view_bar.style.width=ratio.toString()+"vh";

        }
    )
}

//after the page loads
document.addEventListener('DOMContentLoaded',load);
//every 2 seconds
setInterval(setdata, 2000);

