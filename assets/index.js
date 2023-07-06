const contenedor = document.getElementById("ctn-tablas");
let longitud = 20;
const cantidad = 8;
const crearTablas = (contenedor,cantidad = 1) =>{
    const tablas = []
    tam = "48%"
    if(cantidad == 1){
        const {width,height} = contenedor.getBoundingClientRect();
        tam = Math.min(width,height) + "px";
    }
    for(let i = 0;i<cantidad;i++){
        const root = document.createElement("div");
        root.style.height = tam;
        root.style.aspectRatio = "1/1";
        root.id = `tabla${i}`;
        contenedor.append(root);
        tablas.push(root);
    }
    return tablas;
}
const getGrid = (contenedor,cantidad,longitud) =>{
    contenedor.innerHTML  = "";
    const tablasGrid = crearTablas(contenedor,cantidad);
    const cCanvasGrid = tablasGrid.map(e=>{return new ControllerCanvas({root:e})});
    return cCanvasGrid.map(e=>{
        return new Grilla({
            controllerCanvas:e,
            nw:longitud,
            nh:longitud
        })
    });
}

let Grids = getGrid(contenedor,cantidad,longitud);




const lblIteraciones = document.getElementById("lbl-iteraciones");
const lblGeneraciones = document.getElementById("lbl-generaciones");

let timer = null
let data = []
const host = "https://server-nreinas-genetico.onrender.com/"
const pedirDatos = async (longitud,cantidad) =>{
    lblGeneraciones.textContent ="Espere...";
    lblIteraciones.textContent = "";
    if(timer){
        clearInterval(timer);
    }
    const response = await fetch(`${host}reinas?len=${longitud}&cant=${cantidad}`);
    data = await response.json();
    const n = data.length;
    i = 0;
    lblGeneraciones.textContent = "Generaciones: " + n;
    timer = setInterval(()=>{
        Grids.forEach((g,index)=>{
            g.graficarGrilla();
            g.graficarReinas(data[i][index]);
        })
        lblIteraciones.textContent = `Iteraciones: ${i+1}`;
        i++;
        if(i>=n){
            clearInterval(timer);
        }
    },100)
}
const limpiar = () =>{
    if(timer) clearInterval(timer);
    lblGeneraciones.textContent = "";
    lblIteraciones.textContent = "";
}
const toLast = () =>{
    if(data.length == 0) return;
    if(timer){
        clearInterval(timer);
    }
    const n = data.length;
    Grids.forEach((g,index)=>{
        g.graficarGrilla();
        g.graficarReinas(data[n-1][index]);
    });
    lblIteraciones.textContent = `Iteraciones: ${n}`;
}

pedirDatos(longitud,cantidad);

const hcLongitud = new HerramientaController({
    idLabel: "value-herramienta-longitud",
    idInput:"herramienta-longitud",
    name:"Longitud",
    valor:8
})
hcLongitud.changeValue(longitud);
hcLongitud.setOnChangeEventCasilla(Grids,limpiar);

const hcCasillas = new HerramientaController({
    idLabel : "value-herramienta-casillas",
    idInput: "herramienta-casillas",
    name: "Casillas",
    valor:1
})
hcCasillas.changeValue(cantidad);
hcCasillas.inputHerramienta.onchange = (evt) =>{
    console.log(evt.target.value,hcCasillas.value);
    limpiar();
    Grids = getGrid(contenedor,hcCasillas.value,hcLongitud.value);
    hcLongitud.setOnChangeEventCasilla(Grids,limpiar);
}

const btnInciar = document.getElementById("btn-inciar");
btnInciar.onclick = (evt) =>{
    evt.preventDefault()
    pedirDatos(hcLongitud.value,hcCasillas.value);
}
const btnLast = document.getElementById("btn-utitma-generacion");
btnLast.onclick = (evt) =>{
    evt.preventDefault();
    toLast();
}