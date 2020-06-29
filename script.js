class VocabularioIngles {
  constructor(obj) {
    this._data = [];
    this._templateHtml = "";
    this._Escritura = "";
    this._Pronunciacion = "";
    this._correctas = 0;
    this._incorrectas = 0;
    this._contador = 0;
    
   
  }



  getDataSource(number) {
    let self = this;
    return fetch("Vocabulario.json")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw "Ocurrio un Error " + r.status;
      })
      .then((r) => {
        self._data = r;
        console.log(self._data);
        self.Templates(number);
        self.Contadores();
        return r;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Contadores(){
    let self = this;
    let contadorDiv = document.querySelector("#textContador");
    contadorDiv.innerHTML = self._correctas + " / " + self._incorrectas;
   
    

  }

  Templates(number) {
    let self = this;
    let palabra = this._data[number];
    self._Escritura = palabra.Escritura;
    self._Pronunciacion = palabra.Pronunciacion;
    console.log(palabra.name);
    let template = `
  <div>
  
  <!-- Card -->
  <div class="card">
    <div class="card-header">
     ${palabra.name}
    </div>
    <!-- Card image -->
    <div style="overflow: hidden ; height:200px" class="text-center" >
    <img  src="${palabra.image}"  alt="Card image cap" style=" height:200px ; padding:20px">
    </div>
    
  
    <!-- Card content -->
    <div class="card-body">
  
      <!-- Title -->
      <h4 class="card-title"><a>${palabra.description}</a></h4>
      <!-- Text -->
     <form autocomplete="off">
  <div class="form-group">   
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Traduccion">
  </div>
  <div class="form-group">   
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="pronunciación">
  </div>
</form>
      <!-- Button -->
      <a href="#" class="btn btn-primary">Button</a>
  
    </div>
  
  </div>
  <!-- Card -->
  
  </div> `;
    let div = document.querySelector("#card");
    div.innerHTML = template;

    document
      .querySelector("#formGroupExampleInput2")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          self.ValidarParametros();
        }
      });

      let cursor = document.querySelector("#formGroupExampleInput");
      cursor.focus();
  }

  ValidarParametros() {
    let self = this;
    let escritura = document.querySelector("#formGroupExampleInput").value;
    let pronunciacion = document.querySelector("#formGroupExampleInput2").value;
    if((escritura === this._Escritura) && ( pronunciacion === this._Pronunciacion )){
      this._correctas++;
    }else{
      this._incorrectas++;
    }
    self._contador ++;
    let contad = self._contador;
    console.log(contad);
    self.getDataSource(contad);
    
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let vocabulario = new VocabularioIngles();
  vocabulario.getDataSource(0);
});

function cargarPalnilla() {
  let item = getDataSource();
}
function DesplazarIzquierda() {
  let div = document.querySelector("#left");
  div.addEventListener("click", function () {
    alert("Izquierda");
  });
}


