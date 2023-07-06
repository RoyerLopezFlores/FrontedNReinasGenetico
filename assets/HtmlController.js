class HerramientaController{
    constructor({idLabel,idInput,name,valor}){
        this.idLabel = idLabel;
        this.idInput = idInput;
        this.name = name;
        this.value = valor;
        this.iniciar();
    }
    iniciar(){
        const inputHerramienta = document.getElementById(this.idInput);
        const lblHerramienta = document.getElementById(this.idLabel);
        inputHerramienta.oninput = (evt) =>{
            this.value = evt.target.value;
            lblHerramienta.textContent = `${this.name}(${this.value}):`;
        }
        this.inputHerramienta = inputHerramienta;
        this.lblHerramienta = lblHerramienta;
    }
    setOnChangeEvent(){
        this.inputHerramienta.onchange = () =>{
            this.value = this.inputHerramienta.value;
            this.lblHerramienta.textContent = `${this.name}(${this.value}):`;
        }
    }
    setOnChangeEventCasilla(grids,fun = null){
        this.inputHerramienta.onchange = () =>{
            this.value = this.inputHerramienta.value;
            this.lblHerramienta.textContent = `${this.name}(${this.value}):`;
            grids.forEach(g=>{
                
                g.setChangeDim(this.value,this.value);
            })
            if(fun) fun();
        }
    }
    changeValue(value){
        this.value = value;
        this.lblHerramienta.textContent = `${this.name}(${this.value}):`;
        this.inputHerramienta.value = this.value;
    }
}
