document.addEventListener('DOMContentLoaded', function() {
    const Button1 = document.querySelector(".button1");
    
    const bg = document.querySelector(".background");
    const gamesect= document.querySelector(".gameSection")
    Button1.addEventListener("mouseover", () => {
        if(!bg.classList.contains("Hide")){
            bg.classList.add("Hide")
            gamesect.classList.remove("Hide")
            console.log("Hover");
        }
        
    });

    Button1.addEventListener("mouseout", () => {
        if(bg.classList.contains("Hide")){
            bg.classList.remove("Hide")
            gamesect.classList.add("Hide")
        }
            
    });
});