window.onload = function()
{
    var canvas = document.getElementById('mon_canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }

    //responsive
    canvas.width = screen.width;
    canvas.height = screen.height;


    //global 
    var size = 50;
    var space = 1;
    var color = { snake1 : "#ff0000", snake2 : "#00bfff" , strawberry : "#ff007e", poop : "#8b4513", font : "#15e95d"};
    var keyDirection = { up : 90, down : 83, left : 81, right : 68};
    var width = Math.floor(canvas.width / (size +space) ),
    height = Math.floor(canvas.height / (size +space) );
    var key;
    var head = "head.jpg";
    var straw = "straw.jpg";

    function getDirection()
    {
        return document.addEventListener('keydown', function(e) 
        {
            key = e.keyCode;
        }
        , false);
    }

    function gameOver()
    {
        var myCanvas = document.getElementsByTagName('canavs')[0];
        document.body.removeChild(canvas);

        var h1 = document.createElement('h1');
        document.body.appendChild(h1);
        h1.id = 'myFuckinBeautifulTitle';
        h1.className = 'blue';
        h1.innerHTML = 'Score de malade!!!';

        var div = document.createElement('div');
        document.body.appendChild(div);
        div.id = 'myColoredDiv';
        div.className = 'titre1';

        var p = document.createElement('p');
        div.appendChild(p);
        p.innerHTML = "T'as " + mySnake.tail.length + " bordel!";


        var clignotement = function()
        { 
            if (document.getElementById('myColoredDiv').className == 'blue')
            { 
                document.getElementById('myColoredDiv').className = 'orange'; 
                document.getElementById('myFuckinBeautifulTitle').className = 'titre2';
            } 
            else
            { 
                document.getElementById('myColoredDiv').className = 'blue';
                document.getElementById('myFuckinBeautifulTitle').className = 'titre1';
            } 
        }; 

        // mise en place de l appel de la fonction toutes les n/1000 secondes 
        // Pour arrêter le clignotement : clearInterval(periode); 
        periode = setInterval(clignotement, 300); 
    }

    
    function play()
    {
        context.clearRect(0,0,canvas.width,canvas.height);    //je réinitialise le canvas
        getDirection();
        mySnake.key = key;
        if (myLayer.eaten == true) {
            myLayer.poop = mySnake.eat(myLayer.strawberry, myLayer.poop);
        };
        mySnake.move();
        if(myLayer.eaten == true)
        {
            myLayer.initStrawberry(mySnake.tail);
        }
        if(mySnake.tail[mySnake.tail.length-1].x == myLayer.strawberry.x && mySnake.tail[mySnake.tail.length-1].y == myLayer.strawberry.y)
        {
            //On agrandit la taille du snake
            myLayer.eaten = true;
        }
        myLayer.drawTheGame(mySnake.tail ,context);
        //mySnake.debug();
        if (!mySnake.isDead(myLayer.poop)) {
            setTimeout(play, myLayer.interval(mySnake.tail.length));
        }
        else{
            context.clearRect(0,0,canvas.width,canvas.height);    //je réinitialise le canvas
            gameOver();
        }
    }

    var mySnake = new Snake(width, height, keyDirection);
    mySnake.initTail();
    var myLayer = new Layer(width, height, size, space, color, head, straw);
    myLayer.initStrawberry(mySnake.tail);
    myLayer.eaten = false;
    
    play();
}