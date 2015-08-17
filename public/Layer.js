function Layer(width, height, size, space, color, head, straw)
{
	//global
	this.size = size;
    this.width = width;
    this.height = height;
    this.space = space;
    this.color = color;

    this.timeMax = 550;
    this.timeMin = 40;

    this.strawberry;
    this.eaten;
    this.poop = new Array();

    this.head = new Image();
    this.head.src = head;

    this.straw = new Image();
    this.straw.src = straw;

    //here i go
    this.interval = function(n)
    {
        n-=1;
        var time = this.timeMax * Math.exp(-0.5*n) + this.timeMin;
        console.log("interval = "+time);
        return time;
    }

    this.getRandomArbitrary = function(min, max) 
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.initStrawberry = function(tail)
    {
        this.strawberry = { x : 0, y : 0};

        //Faire 
        do
        {
            var myBool = true;
            this.strawberry.x = this.getRandomArbitrary(0, this.width);
            this.strawberry.y = this.getRandomArbitrary(0, this.height);
            for (var i = 0; i < this.poop.length; i++) {
                if (this.poop[i].x == this.strawberry.x && this.poop[i].y == this.strawberry.y) {
                    myBool = false;
                };
            };

        }while(tail[0].x == this.strawberry.x && tail[0].y == this.strawberry.y && myBool == true);
        this.eaten = false;
    }

    /*
    dessine le plateau de jeux
    prend en parametre :
    le tableau formant le tail
    + la fraise
    */
    this.drawTheGame = function(tail, context)
    {

        for (var i = 0; i < this.height; i++) {

            for (var j = 0; j < this.width; j++) {

                if (this.strawberry.x == j && this.strawberry.y == i) {
                    //context.fillStyle = this.color.strawberry;
                    context.drawImage(this.straw, j*(this.size+this.space), i*(this.size+this.space));

                } else if(tail[0].x == j && tail[0].y == i){

                    context.drawImage(this.head, j*(this.size+this.space), i*(this.size+this.space));
                }else{

                    context.fillStyle = this.color.font;
                    
                    for (var k = 0; k < this.poop.length; k++) {
                        if (this.poop[k].x == j && this.poop[k].y == i) {
                            context.fillStyle = this.color.poop;
                        };
                    };

                    for(var k = 0; k < tail.length; k++) {
                        if (tail[k].x == j && tail[k].y == i) {
                            if (k % 2 == 0) {
                            context.fillStyle = this.color.snake1;
                            } else {
                                context.fillStyle = this.color.snake2;                            
                            };
                            k = tail.length;
                        }
                    }
                    context.fillRect( j*(this.size+space), i*(this.size+space) , this.size, this.size);
                }
            };
        };
    }

}