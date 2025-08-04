 // *  <img src=html_v_css.jpg" id="memeImage"> */ 

     let img = document.getElementById("memeimage");
        let interval;
        let position = 0;

        function StartMove() {
            if (!interval) {
                interval = setInterval(() => {
                    position += 5;
                    img.style.marginLeft = position + "px";
                }, 100);
            }
        }

        function StopMove() {
            clearInterval(interval);
            interval = null;
        }