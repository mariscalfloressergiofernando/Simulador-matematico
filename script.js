document.addEventListener("DOMContentLoaded", () => {
    
    // --- EJERCICIO 1: TRANSFERENCIA DE CALOR ---
    const btnCalor = document.getElementById("btn-calcular-calor");
    
    btnCalor.addEventListener("click", () => {
        // Captura de datos estrictamente por ID y conversión a flotantes
        const t0 = parseFloat(document.getElementById("t0").value);
        const ts = parseFloat(document.getElementById("ts").value);
        const k = parseFloat(document.getElementById("k").value);
        const t = parseFloat(document.getElementById("time").value);

        // Validación básica de campos vacíos o incorrectos
        if (isNaN(t0) || isNaN(ts) || isNaN(k) || isNaN(t)) {
            alert("Por favor, completa todos los campos del simulador de calor con números válidos.");
            return;
        }

        // Aplicación de la fórmula: T = Ts + (T0 - Ts) * e^(-k * t)
        const temperaturaFinal = ts + (t0 - ts) * Math.exp(-k * t);
        
        // Redondeo al entero más cercano
        const resultadoRedondeado = Math.round(temperaturaFinal);

        // Renderizado dinámico removiendo la clase 'hidden'
        const boxResultado = document.getElementById("resultado-calor");
        document.getElementById("val-calor").textContent = resultadoRedondeado;
        boxResultado.classList.remove("hidden");
    });


    // --- EJERCICIO 2: COMBINACIONES COMPLEJAS ---
    const btnCombinaciones = document.getElementById("btn-calcular-combinaciones");

    // Función propia obligatoria para el cálculo factorial de forma iterativa
    // Se utiliza BigInt para evitar desbordamientos de enteros (JavaScript maneja de forma imprecisa números > 2^53 - 1)
    function calcularFactorial(numero) {
        if (numero < 0) return 0n;
        let resultado = 1n;
        for (let i = 1; i <= numero; i++) {
            resultado *= BigInt(i);
        }
        return resultado;
    }

    // Función para calcular combinaciones individuales C(n, r) = n! / (r! * (n - r)!)
    function calcularCombinacion(n, r) {
        if (r > n) return 0n; // Validación explícita obligatoria para evitar errores matemáticos
        
        const num = calcularFactorial(n);
        const den = calcularFactorial(r) * calcularFactorial(n - r);
        
        return num / den;
    }

    btnCombinaciones.addEventListener("click", () => {
        // Captura de datos
        const n1 = parseInt(document.getElementById("n1").value, 10);
        const r1 = parseInt(document.getElementById("r1").value, 10);
        const n2 = parseInt(document.getElementById("n2").value, 10);
        const r2 = parseInt(document.getElementById("r2").value, 10);

        // Validaciones requeridas de consistencia
        if (isNaN(n1) || isNaN(r1) || isNaN(n2) || isNaN(r2)) {
            alert("Por favor, introduce valores numéricos válidos en el simulador de sorteos.");
            return;
        }

        if (r1 > n1) {
            alert(`Error en Grupo 1: El número de elementos elegidos (${r1}) no puede ser mayor que el total disponible (${n1}).`);
            return;
        }

        if (r2 > n2) {
            alert(`Error en Grupo 2: El número de elementos elegidos (${r2}) no puede ser mayor que el total disponible (${n2}).`);
            return;
        }

        // Ejecución de los cálculos de combinaciones utilizando BigInt
        const combinacionGrupo1 = calcularCombinacion(n1, r1);
        const combinacionGrupo2 = calcularCombinacion(n2, r2);
        
        // Multiplicación total de ambos grupos independientes
        const totalCombinaciones = combinacionGrupo1 * combinacionGrupo2;

        // Formatear el número de forma legible (ej. 175,223,510) antes de renderizarlo
        const resultadoFormateado = totalCombinaciones.toLocaleString('es-ES');

        // Renderizado dinámico
        const boxResultado = document.getElementById("resultado-combinaciones");
        document.getElementById("val-combinaciones").textContent = resultadoFormateado;
        boxResultado.classList.remove("hidden");
    });
});
