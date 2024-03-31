
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
    gsap.from(".Data_text", { opacity: 0, y: 30, duration: 1 });
    gsap.fromTo("#download_counter",{opacity: 0, y: 30,}, { opacity: 1, y:0, duration: 1 ,delay:1});
    gsap.fromTo("#view_counter",{opacity: 0, y: 30,}, { opacity: 1, y:0, duration: 1 ,delay:1});
    setdata();


}

function setdata(){
    getdata().then(
        function(data){

            //this somehow works
            if (download_counter.textContent!=data[0] && download_counter.textContent!=10){
                gsap.fromTo("#download_counter",{opacity:1,y:0}, { opacity: 0, y: -30, duration: 0.5 });

                gsap.fromTo("#download_counter",{opacity: 0, y: 30,}, { opacity: 1, y:0, duration: 1 ,delay:1});
            }
            if (view_counter.textContent!=data[1] && view_counter.textContent!=10) {
                gsap.fromTo("#view_counter",{opacity:1,y:0}, { opacity: 0, y: -30, duration: 0.5 });

                gsap.fromTo("#view_counter",{opacity: 0, y: 30,}, { opacity: 1, y:0, duration: 1 ,delay:1})
            }
            download_counter.textContent=data[0];
            view_counter.textContent = data[1];
            //max downloads
            let downloadbound=100;
            //max views
            let view_bound=400;

            let ratio=(data[0]/downloadbound)*70;
            download_bar.style.width=ratio.toString()+"vw";
            ratio=(data[1]/view_bound)*90;
            view_bar.style.width=ratio.toString()+"vw";

        }
    )
}

//after the page loads
document.addEventListener('DOMContentLoaded',load);
//every 2 seconds
setInterval(setdata, 2000);

