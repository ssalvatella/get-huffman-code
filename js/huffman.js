/*##############################################################
#                                                             #
# Autor: Samuel Salvatella                                    #
# NIA: 680350                                                 #
# Programa en JavaScript que implementa el algoritmo de       #
# Huffman. Para la implementación se ha seguido la            #
# descripción de Wikipedia                                    #
#                                                             #
##############################################################*/


// Función que implementa el algoritmo de codificación 
// Huffman. Se ha seguido la descripción del algoritmo
// disponible en: 
// https://es.wikipedia.org/wiki/Codificaci%C3%B3n_Huffman#T.C3.A9cnica_b.C3.A1sica.
function CodigoHuffman(texto) {
	
	// Construcción del arbol
	
	// Función auxiliar que devuelve la frecuencia
	// de las letras del texto.
	function devuelveFrecuencias() {
		var frecuencias = {};
		for (var i = 0; i < texto.length; i++) {
			if(texto[i] in frecuencias) {
				frecuencias[texto[i]] ++;
			} else {
				frecuencias[texto[i]] = 1;
			}
		}
		return frecuencias;
	};
	
	// Para contruir el arbol binario utilizamos
	// la implementación disponible en 
	// http://eloquentjavascript.net/1st_edition/appendix2.html
	var arbol = new BinaryHeap(function(nodo) {return nodo[0];});
	
	var frecuencias = devuelveFrecuencias();
	
	// Creamos un nodo hoja para cada letra asociada a su
	// frecuencia y lo insertamos en el arbol.
	for (var letra in frecuencias) {
		arbol.push([frecuencias[letra], letra]);
	};
	
	// Mientras haya más de un nodo en el arbol
	// (ver implementación en Wikipedia)
	while(arbol.size() > 1) {
		
		// Eliminamos los dos nodos con menor probabilidad
		// (recordar que el arbol se ha construido de manera ascendente)
		var nodo1 = arbol.pop();
		var nodo2 = arbol.pop();
		
		// Creamos un nuevo nodo interno que enlace a los dos nodos anteriores
		// y lo añadimos al arbol.
		arbol.push([nodo1[0]+nodo2[0], [nodo1[1], nodo2[1]]]);
	};
	
	this.codificar = function(nodoRaiz, codigo) {
		
		// Mientras queden nodos por visitar
		if (nodoRaiz instanceof Array) {
			this.codificar(nodoRaiz[0], codigo + "0");
			this.codificar (nodoRaiz[1], codigo + "1");
		} else {
			this.codificacion[nodoRaiz] = codigo;
		}
		
	};
	
	// Variable donde se guarda el mensaje codificado finalmente
	this.textoCodificado = " ";
	

	
	this.mostrar_codigos =  function() {
		var resultado = "";
		for(var letra in this.codificacion) {
			resultado = resultado.concat("<li><p>" + letra + "    <span class=\"glyphicon glyphicon-arrow-right\"></span>    " + this.codificacion[letra] + "</p></li>");
		};
		return resultado;
	};
	
	// El nodo que queda es el nodo raiz
	var raiz = arbol.pop();
	
	// Aquí se guardará la codificacion de las letras
	this.codificacion = {};
	
	// Realizamos la codificación del arbol desde la raiz
	this.codificar(raiz[1], "");
	
	// Recorremos la codificación para tener el mensaje completo codificado
	for(var letra in texto) {
			this.textoCodificado = this.textoCodificado.concat(this.codificacion[texto[letra]]);
	};
	
	this.tamanio_original = 16 * texto.length;
	this.tamanio_codificado = this.textoCodificado.length;
}

// Cuando se clica en el botón "Generate Code" se ejecuta
// la función CodigoHuffman() y se añade el resultado al 
// panel para mostrarlo.
$(document).ready(function() {
    $('#button').click(function() {
	  var codificador = new CodigoHuffman(document.getElementById("textID").value);
      document.getElementById("result").innerHTML = codificador.textoCodificado;
	  document.getElementById("codeChar").innerHTML = codificador.mostrar_codigos();
	  document.getElementById("sizes").innerHTML = "<li><p>Original size: " + codificador.tamanio_original + " bits</p></li><li><p>Coded size: "+ codificador.tamanio_codificado + " bits</p></li>";
    });
});

// Activa el botón cuando el usuario pulsa ENTER 
// escribiendo el texto a cifrar.
$(document).ready(function(){
    $('#textFormID').keypress(function(e){

      if(e.keyCode==13) {
    	$('#button').click();
        e.preventDefault(); 
      } 

    });
});
