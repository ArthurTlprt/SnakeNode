function Snake(width, height, keyDirection)
{
    //global 
    this.tail;
    this.key;
    this.dead = false;
    this.width = width;
    this.height = height;
    this.keyDirection = keyDirection;

    //here i go
    this.getRandomArbitrary = function(min, max) 
    {
        return Math.floor(Math.random() * (max - min)) + min;
    };

	this.debug = function()
    {
        for (var i = 0; i < this.tail.length; i++) { 
            console.log("this.tail["+ i +"].x = " + this.tail[i].x);
            console.log("this.tail["+ i +"].y = " + this.tail[i].y);
        }
    };

    this.initTail = function()
    {
        this.tail = new Array( {x : 0, y : 0} );
        this.tail[0].x = this.getRandomArbitrary(0,this.width);
        this.tail[0].y = this.getRandomArbitrary(0, this.height);
        console.log(this.tail[0].x);
    };

    this.isDead = function(poop)
    {
        for (var i = 1; i < this.tail.length; i++) {
            if (this.tail[0].x == this.tail[i].x && this.tail[0].y == this.tail[i].y) {
                this.dead == true;
                return true;
            };
            for (var j = 0; j < poop.length; j++) {
                if (this.tail[0].x == poop[j].x && this.tail[0].y == poop[j].y) {
                    this.dead == true;
                    return true;
                };
            };
        };
    }

    /*
    //merdre
    this.funct = function(e) 
    {
        this.key = e.keyCode;
        console.log("getDirection, this.key"+this.key);
    }

    this.getDirection = function()
    {
        return document.addEventListener('keydown', this.funct, false);
    }*/


    this.ondulation = function()
    {
        if(this.tail.length > 1)
        {
            for(var i = this.tail.length-1; i > 0; i--)
            {
                this.tail[i].x = this.tail[i-1].x;
                this.tail[i].y = this.tail[i-1].y;
            }
        }
    };

    this.move = function()
    {
        
        this.ondulation();
        //bouge dans la direction
        console.log("move "+this.key);
        switch (this.key) {
            case this.keyDirection.left:

                //return 'left';
                this.tail[0].x -= 1;
                //bouge tout le corps
                //ondulation();
                console.log("x" + this.tail[0].x);
            break;

            case this.keyDirection.up:

                //return 'up';
                this.tail[0].y -= 1;
                
                //bouge tout le corps
                //ondulation();

                console.log("y" + this.tail[0].y);
            break;

            case this.keyDirection.right:
                //return 'right';
                this.tail[0].x += 1;
                //bouge tout le corps
                //ondulation();
                console.log("x" + this.tail[0].x);
            break;

            case this.keyDirection.down:
                //return 'down';
                this.tail[0].y += 1;
                //bouge tout le corps
                //ondulation();
                console.log("y" + this.tail[0].y);
            break;
            }

            //thorique
            if (this.tail[0].x == -1) {
                    this.tail[0].x = this.width;
            }
            else if (this.tail[0].y == -1) {
                    this.tail[0].y = this.height;
            }
            else if (this.tail[0].x == this.width) {
                    this.tail[0].x = 0;
            }
            else if (this.tail[0].y == this.height) {
                    this.tail[0].y = 0;
            };

    };

    this.eat = function(strawberry, poop){
        //si mangé, on agrandit
        this.tail[this.tail.length] = { x : strawberry.x , y : strawberry.y };
        //On initialise une autre strawberry
        poop[poop.length] = { x : strawberry.x, y : strawberry.y};
        return poop;
    }
}