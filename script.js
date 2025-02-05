
// Funcion encargada de manejar el menu de opciones.
// 1- El usuario solo podra ingresar las opciones precreadas.
function menuOpciones() {
  let opcion = parseInt(
    prompt(
      "BIENVENIDO A SOFTHARD \n 1 - Iniciar sesion \n 2 - Crear una cuenta "
    )
  );

  if (opcion !== 1 && opcion !== 2) {
    while (opcion !== 1 && opcion !== 2) {
      alert("Opcion invalida, introduzca una opcion valida (1,2)");
      opcion = parseInt(prompt("1 - Iniciar sesion \n2 - Crear una cuenta "));
    }
  }

  return opcion;
}

// Funcion encargada de manejar el redireccionamiento al menu.
// 1- Logica simple que dependiendo del numero ingresado de las opciones prehechas ejecuta una funcion u otra. 
function redirigirAlMenu() {
  let opcion = menuOpciones();

  if (opcion === 1) {
    iniciarSesion();
  } else if (opcion === 2) {
    crearCuenta();
  }
}

// Funcion encargada de manejar la validacion de los nombres a crear.
// 1- El usuario debera ajustarse a los requisitos de la validacion.
// 2- El nombre no puede estar vacio o ser el mismo existir.
function validadorNombre(nombre) {
  if (!nombre || nombre.trim() === "") {
    alert("El nombre de usuario no puede estar vacio");
    return false;
  }

  const usuariosGuardados =
    JSON.parse(sessionStorage.getItem("usuarios")) || [];

  const nombreExistente = usuariosGuardados.some(
    (usuario) => usuario.nombre === nombre
  );

  if (nombreExistente) {
    alert("El nombre de usuario ya esta registrado. Por favor, elige otro.");
    return false;
  }

  return true;
}

// Funcion encargada de manejar la validacion de las contraseñas a crear
// 1- La contraseña no debe estar vacia ni mucho menos con menos de 4 digitos.
function validadorContrasena(contrasena) {
  if ((!contrasena || contrasena.trim() === "") && contrasena.length < 4) {
    alert(
      "La contraseña no puede estar vacia y debe tener mas de 4 caracteres"
    );
    return false;
  } else if (contrasena.length < 4) {
    alert("La contraseña debe tener mas de 4 caracteres");
    return false;
  }
  return true;
}

// Funcion encargada de manejar la creacion de cuentas
// 1- Se pide nombre y contraseña.
// 2- Se valida con las funciones anteriores el nombre y contraseña del usuario.
// 3- Si el usuario cumple con los requisitos establecidos sus datos son guardados mediante sessionStorage.
// 4- Luego de guardar los datos la cuenta es creada exitosamente y se redirecciona al menu.
function crearCuenta() {
  let nombre, contrasena;

  nombre = prompt("Ingrese un nombre de usuario a crear");

  while (validadorNombre(nombre) === false) {
    nombre = prompt("Ingrese un nombre de usuario valido para crear");
  }

  alert("Nombre creado con exito");

  contrasena = prompt("Ingrese su contraseña a crear");

  while (validadorContrasena(contrasena) === false) {
    contrasena = prompt("Ingrese una contraseña de usuario valido para crear");
  }
  alert("Contraseña creada con exito");

  const nuevoUsuario = { nombre: nombre, contrasena: contrasena };

  const usuariosGuardados =
    JSON.parse(sessionStorage.getItem("usuarios")) || [];

  usuariosGuardados.push(nuevoUsuario);

  sessionStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

  alert("Cuenta creada con exito! Redireccionando al menu de opciones.");
  redirigirAlMenu();
}

// Funcion encargada de manejar el inicio de menu
// 1- Se verifica que existan usuarios, caso contrario se pedira que cree una cuenta.
// 2- Se solicita el nombre del usuario si coincide avanza, si no, se le dara 3 intentos y se le redireccionara al menu.
// 3- Se solicita la contraseña si coincide avanza, si no, se le dara 3 intentos y se le redireccionara al menu.
// 4- Si se verifica correctamente inicia sesion.
function iniciarSesion() {
  let nombre, contrasena, almacenUsuarios, usuarioExistente;
  let i = 0;

  const usuariosGuardados =
    JSON.parse(sessionStorage.getItem("usuarios")) || [];

  almacenUsuarios = usuariosGuardados.length;

  if (almacenUsuarios === 0) {
    alert("No hay usuarios registrados, crea una cuenta.");
    crearCuenta();
    return;
  }

  nombre = prompt("Ingrese su nombre de usuario");

  usuarioExistente = usuariosGuardados.some(
    (usuario) => usuario.nombre === nombre
  );

  if (usuarioExistente === false) {
    do {
      i++;
      alert("Nombre de usuario invalido. Intentos restantes " + (3 - i));
      nombre = prompt("Ingrese su nombre de usuario correctamente");
      usuarioExistente = usuariosGuardados.some(
        (usuario) => usuario.nombre === nombre
      );
    } while (usuarioExistente === false && i < 3);

    if (i === 3) {
      alert("Agotaste los intentos... Intentelo denuevo mas tarde.");
      redirigirAlMenu();

      return;
    }
  }

  const usuario = usuariosGuardados.find(
    (usuario) => usuario.nombre === nombre
  );

  contrasena = prompt("Ingrese su contraseña");

  if (usuario.contrasena !== contrasena) {
    do {
      i++;
      alert("Contraseña invalida. Intentos restantes " + (3 - i));
      contrasena = prompt("Ingrese su contraseña correctamente");
    } while (usuario.contrasena !== contrasena && i < 3);

    if (i === 3) {
      alert("Agotaste los intentos... Intentelo denuevo mas tarde.");
      redirigirAlMenu();

      return;
    }
  }

  alert(`Bienvenido ${nombre}!!`);
}

// Menu del algoritmo
// 1- Dependiendo de la opcion que retorne la funcion de menuOpciones avanza hacia una opcion.
// 2- Si es 1 ejecuta iniciarSesion();
// 3- Si es 2 ejecuta crearCuenta();
let opcion = menuOpciones();

if (opcion === 1) {
  iniciarSesion();
} else if (opcion === 2) {
  crearCuenta();
}
