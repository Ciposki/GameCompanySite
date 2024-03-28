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

document.addEventListener('DOMContentLoaded', function() {
    const Button = document.querySelectorAll("button");
    const home = document.querySelectorAll("#home");
    const gamesect= document.querySelector(".gameSection")
    const itlies = document.querySelector(".itlies")

    const cursor= document.querySelector('.cursor');

    const positionElement = (e)=> {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
         
        
        cursor.style.transform = `translate3d(${mouseX-10}px, ${mouseY-5}px, 0)`;
       

      }

    window.addEventListener('mousemove', positionElement)

    

    Button.forEach(element => {
        element.addEventListener("mouseover", () => {
            HoverButton(element);
            cursor.setAttribute('style','background-color:rgba(8, 8, 8, 1)');
            cursor.style.border = "2px solid white";
            cursor.style.width = "2vw"
            cursor.style.height = "2vw"
            
        });
        element.addEventListener("mouseout", () => {
            OutButton();
            cursor.setAttribute('style','background-color:white');
            cursor.style.border = "0px solid white";
            cursor.style.width = "1vw"
            cursor.style.height = "1vw"
        });    
    });

    Button.forEach(button => {
        button.onclick = function() {buttonclick(button)};
    });

    getdata().then(
        function(data){
            
            let download_counter=document.getElementById("download_counter")
            download_counter.textContent=data[0];
            let view_counter=document.getElementById("view_counter")
            view_counter.textContent=data[1];
        }
    )




    function buttonclick(buttons){
        Button.forEach(buttonElement => {
            if(buttons == buttonElement){
                buttonElement.classList.add("Current");
                buttonElement.classList.remove("Active");
            }
            else{
                buttonElement.classList.remove("Current");
                buttonElement.classList.add("Active");
            }
        });
        if (buttons == Button[1]){
            for(i=0;i<home.length;i++){
                if(!home[i].classList.contains("Hide")){
                    home[i].classList.add("Hide");
                }
            }
            gamesect.classList.remove("Hide");
            
        }else if(buttons == Button[0]){
            for(i=0;i<home.length;i++){
                if(home[i].classList.contains("Hide")){
                    home[i].classList.remove("Hide");
                    
                }
            }
            gamesect.classList.add("Hide"); 
        };
    };

    function HoverButton(button){
        current = document.querySelector(".Current")
            if (button==Button[0] && button!=current) {
                for(i=0;i<home.length;i++){
                    home[i].classList.remove("Hide"); 
                }

                gamesect.classList.add("Hide");
                itlies.classList.add("Hide");
            }else if (button==Button[1] && button!=current) {

                gamesect.classList.remove("Hide");

                itlies.classList.add("Hide");
                for(i=0;i<home.length;i++){
                    home[i].classList.add("Hide");
                }
            }else if (button==Button[2] && button!=current) {
                itlies.classList.remove("Hide");

                gamesect.classList.add("Hide");
                for(i=0;i<home.length;i++){
                    home[i].classList.add("Hide");
                }
            }
    };

    function OutButton(){
        current = document.querySelector(".Current")
            if (current==Button[0]) {

                for(i=0;i<home.length;i++){
                    home[i].classList.remove("Hide"); 
                }

                gamesect.classList.add("Hide");
                itlies.classList.add("Hide");
            } else if(current==Button[1]) {

                gamesect.classList.remove("Hide");

                itlies.classList.add("Hide");
                for(i=0;i<home.length;i++){
                    home[i].classList.add("Hide");
                }
            }else if(current==Button[2]){
                itlies.classList.remove("Hide");

                gamesect.classList.add("Hide");
                for(i=0;i<home.length;i++){
                    home[i].classList.add("Hide");
                }
            }
    };

});