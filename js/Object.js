class Object{
    constructor(x,y,width,height){

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityY = 0;
        this.velocityX=0;
        this.image = loadImage("../images/car1.png");

    }
    display(){
        push();
        translate(this.x,this.y);
        imageMode(CENTER);
        image(0,0,20,50);
        pop();
    }

    isTouching(object){
        if(this.x-object.x < this.width/2+object.width/2 &&
            object.x-this.x < this.width/2+object.width/2 &&
            this.y-object.y < this.height/2+object.height/2 &&
            object.y-this.y < this.height/2+object.height/2){
                return true;
            } else {
                return false;
            }

    }
    bounceOff(object){
        if(this.x-object.x < this.width/2+object.width/2 &&
            object.x-this.x < this.width/2+object.width/2 &&
            this.y-object.y < this.height/2+object.height/2 &&
            object.y-this.y < this.height/2+object.height/2){
                this.velocityX =this.velocityX *(-1) ;
                this.velocityY =this.velocityY *(-1) ;
                object.velocityX =object.velocityX *(-1) ;
                object.velocityY =object.velocityY *(-1) ;
            } else {
                return false;
            }
    }
    bounce(object){
        if(this.x-object.x < this.width/2+object.width/2 &&
            object.x-this.x < this.width/2+object.width/2 &&
            this.y-object.y < this.height/2+object.height/2 &&
            object.y-this.y < this.height/2+object.height/2){
                this.velocityX =this.velocityX *(-1) ;
                this.velocityY =this.velocityY *(-1) ;
                object.velocityX =object.velocityX *(-1) ;
                object.velocityY =object.velocityY *(-1) ;
            } else {
                return false;
            }
    }
}