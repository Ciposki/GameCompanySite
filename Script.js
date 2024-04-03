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

document.addEventListener('DOMContentLoaded', function() {

    const Button = document.querySelectorAll("button");
    const home = document.querySelectorAll("#home");
    const gamesect= document.querySelector(".gameSection");
    const itlies = document.querySelector(".itlies");
    const background = document.querySelector(".background");
    const cursor= document.querySelector('.cursor');
    const footer = document.querySelector('footer');


    let open=false
    if(background.classList.contains("animateonce")){
        background.addEventListener("animationend", () => {
                footer.classList.remove("Hide")
                background.classList.remove("animateonce")
        });
    }
    const positionElement = (e)=> {
        const mouseY = e.clientY;
        const mouseX = e.clientX;


        cursor.style.transform = `translate3d(${mouseX-10}px, ${mouseY-5}px, 0)`;


      }

    window.addEventListener('mousemove', positionElement);



    Button.forEach(element => {
        element.addEventListener("mouseover", () => {
            if (!element.classList.contains("Hide") && !open){
            HoverButton(element);
            cursor.style.width="0px"
                cursor.style.height="0px"

            cursor.setAttribute('style','background-color:transparent');
            cursor.style.border = "3px solid white";
            cursor.style.width = "1.5vw"
            cursor.style.height = "1.5vw"
            }
        });
        element.addEventListener("mouseout", () => {
            if (!element.classList.contains("Hide") && !open){
            OutButton();
            cursor.setAttribute('style','background-color:white');
            cursor.style.border = "0px solid white";
            cursor.style.width = "1vw"
            cursor.style.height = "1vw"
            }
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


        if(buttons!=Button[0] && open == false){
                open=false;
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
        }
        current = document.querySelector(".Current")
        if (buttons == Button[3]&& open == false){
            for(i=0;i<home.length;i++){
                if(!home[i].classList.contains("Hide")){
                    home[i].classList.add("Hide");
                }
            }
            gamesect.classList.remove("Hide");
            itlies.classList.add("Hide")

        }else if(buttons == Button[1]&& open == false){
            for(i=0;i<home.length;i++){
                if(home[i].classList.contains("Hide")){
                    home[i].classList.remove("Hide");

                }
            }
            gamesect.classList.add("Hide");
            itlies.classList.add("Hide")
        }else if(buttons == Button[2]&& open == false){
            console.log("sium");
            gsap.to(Button,{xPercent: -300,delay:0,duration:3,ease: "sine.inOut",})
            gsap.to(".name",{yPercent: -200,delay:0.5,duration:3,ease: "sine.inOut",})
            gsap.to(".title",{xPercent: 600,delay:1,duration:3,ease: "sine.inOut",})
            gsap.to(".video",{xPercent: 600,delay:1.5,duration:3,ease: "sine.inOut",})
            gsap.to(".counter",{xPercent: 600,delay:2,duration:3,ease: "sine.inOut",})

            gsap.to(itlies,{backgroundColor:"black",delay:2.5,duration:3,ease: "sine.inOut",})
            gsap.to(cursor,{scale:0,delay:3,duration:2,ease: "sine.inOut",})
            gsap.delayedCall(7.5,newpage)
            for(i=0;i<home.length;i++){
                if(!home[i].classList.contains("Hide")){
                    home[i].classList.add("Hide");

                }
            }
            gamesect.classList.add("Hide");
            itlies.classList.remove("Hide");
            move.classList.add("goleft")


        }else if(buttons==Button[0]){
            if(open){
                background.classList.remove("animateInfo");
                gamesect.classList.remove("animateInfo");
                itlies.classList.remove("animateInfo");
                void background.offsetWidth;
                background.classList.add("animateback");
                gamesect.classList.add("animateback");
                itlies.classList.add("animateback");

                // Da cambiare con la gerarchia
                for(i =1;i<4;i++){
                    Button[i].classList.remove("Hide")
                }
                
                Button[0].textContent="Info"
                footer.style.zIndex="-1"
                if(current==Button[1]){home[1].classList.remove("Hide")}
                open=false;
            }else{
                background.classList.remove("animateback");
                gamesect.classList.remove("animateback");
                itlies.classList.remove("animateback");

                void background.offsetWidth;
                background.classList.add("animateInfo");
                gamesect.classList.add("animateInfo");
                itlies.classList.add("animateInfo");
                for(i =1;i<4;i++){
                    Button[i].classList.add("Hide")
                }
                Button[0].textContent="Close"
                footer.style.zIndex="3"
                home[1].classList.add("Hide")
                open=true;
            }
        };
    };

    function HoverButton(button){
        current = document.querySelector(".Current")
            if (button==Button[1] && button!=current) {
                for(i=0;i<home.length;i++){
                    home[i].classList.remove("Hide");
                }

                gamesect.classList.add("Hide");
                itlies.classList.add("Hide");
            }else if (button==Button[3] && button!=current) {

                gamesect.classList.remove("Hide");

                itlies.classList.add("Hide");
                for(i=0;i<home.length;i++){
                    home[i].classList.add("Hide");
                }
            }else if (button==Button[2] && button!=current) {
                itlies.classList.remove("Hide");
                console.log("help")
                gamesect.classList.add("Hide");
                for(i=0;i<home.length;i++){
                    home[i].classList.add("Hide");
                }
            }
    };

    function OutButton(){
        current = document.querySelector(".Current")
            if (current==Button[1]) {

                for(i=0;i<home.length;i++){
                    home[i].classList.remove("Hide");
                }

                gamesect.classList.add("Hide");
                itlies.classList.add("Hide");
            } else if(current==Button[3]) {

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
function newpage(){
//fix link
    window.location.href = 'C:/Users/admin/Desktop/GameCompanySite/Itlies.html';
    window.location.assign = 'C:/Users/admin/Desktop/GameCompanySite/Itlies.html';

    window.location.replace = 'C:/Users/admin/Desktop/GameCompanySite/Itlies.html';

}