

//we are making it a function so we can use async

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