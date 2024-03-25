

//we are making it a function so we can use async
async function getdata(){
    //accessing the itch api. We HAVE TO use a proxy otherwise we get CORS errors
    let url ="https://corsproxy.io/?https%3A%2F%2Fitch.io%2Fapi%2F1%2FZQ2JiAnQXLKUv4vJB4ReFB9UvRpmGm3Kmji7hTA7%2Fmy-games"
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
//after the page loads
document.addEventListener('DOMContentLoaded', function() {
    //waits for getdata to finish
    getdata().then(
        function(data){
            
            let download_counter=document.getElementById("download_counter")
            download_counter.textContent=data[0];
            let view_counter=document.getElementById("view_counter")
            view_counter.textContent=data[1];
        }
    )


})