class ControllerCanvas{
    constructor({root,pp={w:1,h:1}}){
        
        this.root = root; 
        this.pp = pp;
        this.inciarCanvas();
    }
    inciarCanvas(){
        const root = this.root;
        console.log(this.root);
        const {width,height} = root.getBoundingClientRect();
        const canvas = document.createElement("canvas");
        const wc = width*this.pp.w;
        const hc = height*this.pp.h;
        canvas.height = hc;
        canvas.width = wc;
        const context = canvas.getContext("2d");
        root.append(canvas);
        this.width = wc;
        this.height = hc;
        this.canvas = canvas;
        this.context = context;
    }
}
class Grilla{
    constructor({controllerCanvas,nw,nh,colores,colorReina,r }){
        this.controllerCanvas = controllerCanvas;
        this.width = this.controllerCanvas.width;
        this.height = this.controllerCanvas.height;
        this.nw = nw;
        this.nh = nh;
        this.colores = colores||["green","orange"];
        this.colorReina = colorReina || "white";
        this.r = r;
        this.graficarGrilla();
    }
    graficarGrilla(){
        this.rw =  Math.floor(this.width/(this.nw));
        this.rh = Math.floor(this.height/(this.nh));
        const colores = this.colores;
        const context = this.controllerCanvas.context;
        context.clearRect(0,0,this.width,this.height);
        for(let iw = 0;iw<this.nw;iw++){
            for(let ih = 0;ih<this.nh;ih++){
                context.save();
                if((iw + ih)%2 == 0) context.fillStyle = colores[0];
                else context.fillStyle = colores[1];
                
                context.translate(this.rw*iw,this.rh*ih);
                context.fillRect(0,0,this.rw,this.rh);
                context.restore();
            }
        }
    }
    graficarReinas(reinas,gen=null){
        const context = this.controllerCanvas.context;
        context.save();
        context.fillStyle = this.colorReina;
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.font = `${Math.max(this.rh-2,2)}px Arial`;
        reinas.forEach((reina,index)=>{
            const ix = this.rw*index;
            const iy = this.rh*reina;
            context.save();
            context.translate(ix + this.rw/2,iy + this.rh/2);
            context.fillText("Q",0,0);
            context.restore();
        });
        context.restore();
        
        if(gen!= null){
            context.save();
            context.font = `24px Arial`;
            context.textBaseline = "top";
            context.fillText(`Generación: ${gen}`,10,10);
            context.restore();
        }
        
    }
    setChangeDim(nw,nh){
        this.nh = nh;
        this.nw = nw;
        this.graficarGrilla();
    }
}