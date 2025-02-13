
// Funcion encargada de manejar el menu de opciones.
// 1- El usuario solo podra ingresar las opciones precreadas.
function menuOpciones() {
  let opcion;
  do {
    opcion = parseInt(prompt("BIENVENIDO A SOFTHARD \n 1 - Iniciar sesion \n 2 - Crear una cuenta "));
    
    if (![1,2].includes(opcion)) {
      alert("Opcion invalida, introduzca una opcion valida (1,2)");
    }
  } while(![1,2].includes(opcion))

  return opcion;
}

// Funcion encargada de manejar el redireccionamiento al menu.
// 1- Logica simple que dependiendo del numero ingresado de las opciones prehechas ejecuta una funcion u otra. 
function mostrarMenuOpciones() {
  let opcion = menuOpciones();

  if (opcion === 1) {
    iniciarSesion();
  } else if (opcion === 2) {
    crearCuenta();
  }
}

// Función que valida el nombre de usuario y la contraseña.
// 1- Para el nombre: debe tener más de 4 caracteres, no ser solo números, y no estar registrado.
// 2- Para la contraseña: debe tener más de 6 caracteres.
// 3- Si algo es inválido, muestra un mensaje de error y retorna false.
function validadorNombreContraseña(tipo,valor) {
  if(tipo === "nombre") {

    if (!valor || valor.length < 4 || /^\d+$/.test(valor)) {
      alert("El nombre de usuario no puede estar vacío, debe contener más de 4 caracteres y no solo números.");
      return false;
    }

    const usuariosGuardados = JSON.parse(sessionStorage.getItem("usuarios")) || [];
    const nombreExistente = usuariosGuardados.some((usuario) => usuario.nombre === valor);

    if(nombreExistente){
      alert("El nombre de usuario ya esta registrado. Por favor, elige otro.");
      return false;
    }

  } else if(tipo === "contrasena") {
    if(!valor || valor.length < 6) {
      alert("La contraseña no puede estar vacia y debe tener mas de 6 caracteres.");
      return false;
    }
  }
  return true;
}

// Funcion encargada de manejar la creacion de cuentas
// 1- Se pide nombre y contraseña.
// 2- Se valida con la funcion anterior el nombre y contraseña del usuario.
// 3- Si el usuario cumple con los requisitos establecidos sus datos son guardados mediante sessionStorage.
// 4- Luego de guardar los datos la cuenta es creada exitosamente y se redirecciona al menu.
function crearCuenta() {
  let nombre, contrasena;

  nombre = prompt("Ingrese un nombre de usuario a crear");
  while (!validadorNombreContraseña("nombre", nombre)) {
    nombre = prompt("Ingrese un nombre de usuario valido para crear");
  }
  alert("Nombre creado con exito");

  contrasena = prompt("Ingrese su contraseña a crear");
  while (!validadorNombreContraseña("contrasena", contrasena)) {
    contrasena = prompt("Ingrese una contraseña de usuario valido para crear");
  }
  alert("Contraseña creada con exito");

  const nuevoUsuario = { nombre, contrasena };
  const usuariosGuardados = JSON.parse(sessionStorage.getItem("usuarios")) || [];

  usuariosGuardados.push(nuevoUsuario);
  sessionStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

  alert("Cuenta creada con exito! Redireccionando al menu de opciones.");
  mostrarMenuOpciones();
}

// Función que maneja los intentos de login.
// 1- Solicita al usuario un valor (nombre o contraseña) usando un prompt.
// 2- Si el valor es inválido, muestra un mensaje y permite hasta 3 intentos.
// 3- Si los intentos se agotan, redirige al menú de opciones.
// 4- Si el valor es válido, lo retorna.
function intentarLogin(funcion, mensaje, maxIntentos = 3){
  let i = 0;
  let valor = prompt(mensaje);

  while(!funcion(valor) && i < maxIntentos) {
    i++;
    alert(`Intento invalido. Intentos restantes: ${maxIntentos - i}`);
    if(i === maxIntentos){
      alert("Agotaste los intentos. Intentalo de nuevo mas tarde.");
      mostrarMenuOpciones();
      return null;
    }
    valor = prompt(mensaje);
  }

  return valor;
}

// Funcion encargada de manejar el inicio de menu
// 1- Se verifica que existan usuarios, caso contrario se pedira que cree una cuenta.
// 2- Se solicita el nombre del usuario si coincide avanza, si no, se le dara 3 intentos y se le redireccionara al menu.
// 3- Se solicita la contraseña si coincide avanza, si no, se le dara 3 intentos y se le redireccionara al menu.
// 4- Si se verifica correctamente inicia sesion.
function iniciarSesion() {
  const usuariosGuardados = JSON.parse(sessionStorage.getItem("usuarios")) || [];

  if(usuariosGuardados.length === 0) {
    alert("No hay usuarios registrados, crea una cuenta.");
    crearCuenta();
    return;
  }

  let nombre = intentarLogin((valor) => usuariosGuardados.some((usuario) => usuario.nombre === valor), "Ingrese su nombre de usuario");

  if (nombre === null) return;

  const usuario = usuariosGuardados.find((usuario) => usuario.nombre === nombre);

  let contrasena = intentarLogin((valor) => usuario.contrasena === valor, "Ingrese su contraseña");
  if (contrasena === null) return;

  alert(`Bienvenido ${nombre}!!`);
}

// Menu del algoritmo
// 1- Dependiendo de la opcion que retorne la funcion de menuOpciones avanza hacia una opcion.
// 2- Si es 1 ejecuta iniciarSesion();
// 3- Si es 2 ejecuta crearCuenta();
mostrarMenuOpciones()
