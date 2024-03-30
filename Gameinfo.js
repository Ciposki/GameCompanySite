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
function setdata(){
    getdata().then(
        function(data){

            let download_counter=document.getElementById("download_counter")
            download_counter.textContent=data[0];
            let view_counter=document.getElementById("view_counter")
            view_counter.textContent=data[1];
            //max downloads
            let downloadbound=100;
            //max views
            let view_bound=400;
            let download_bar= document.getElementById("download_bar");
            let view_bar= document.getElementById("view_bar");
            let ratio=(data[0]/downloadbound)*90;
            download_bar.style.width=ratio.toString()+"vh";
            ratio=(data[1]/view_bound)*90;
            view_bar.style.width=ratio.toString()+"vh";

        }
    )
}
//after the page loads
document.addEventListener('DOMContentLoaded',setdata);
//every 2 seconds
setInterval(setdata, 2000);
function set_flash(){
    const cursor= document.querySelector('.cursor');

}