// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Asignatura {
  
  string public version = "2022";
  // Address del usuario que ha desplegado el contrato. El contrato lo despliega el owner
  address public owner;
  // Coordinador de la asignatura
  address public coordinador;

  // Nombre de la asignatura
  string public nombre;
  // Curso académico de la asignatura
  string public curso;
  // Estado de la asignatura
  bool public cerrada;
  // Acceder al nombre de un profesor dada su dirección
  mapping (address => string) public datosProfesor;
  // Array con las direcciones de los profesores añadidos
  address[] public profesores;
  // Datos de un alumno
  struct DatosAlumno {
      string nombre;
      string dni;
      string email;
  }
  // Dada una dirección, devuelve una estructura DatosAlumno, cuyo nombre será 'datosAlumno'
  mapping (address => DatosAlumno) public datosAlumno;
  // Valores de DNI usados (clave: DNI, valor: dirección del alumno)
  mapping (string => address) public dniUsados;
  // En este array (público) se guardan las direcciones de usuario de los alumnos matriculados
  address[] public matriculas;
  // Datos de una evaluación
  struct Evaluacion {
      string nombre;
      uint fecha;
      uint porcentaje;
      uint minimo;
  }
  // Array de objetos del tipo Evaluacion con las evaluaciones de la asignatura
  Evaluacion[] public evaluaciones;
  // Enumerado que representa el tipo de nota: Sin usar, no presentado y normal
  enum TipoNota {Empty, NP, Normal}
  // Datos de una nota. Calificación multiplicada por 100 porque no hay decimales
  struct Nota {
      TipoNota tipo;
      uint calificacion;
  }
  // Dada la dirección de un alumno y el indice de evaluación, devuelve la nota del alumno
  mapping (address => mapping (uint => Nota)) public calificaciones;
  // Error usado para indicar DNI duplicado
  error DNIDuplicadoError (string dni);
  // Constructor: @param _nombre Nombre asingatura. @param _curso Curso académico.
  constructor(string memory _nombre, string memory _curso) {
      // No se ejecuta nada más si no se cumple lo incluido en 'require'
      require(bytes(_nombre).length != 0, "El nombre no puede estar vacio");
      require(bytes(_curso).length != 0, "El curso no puede estar vacio");
      nombre = _nombre;
      curso = _curso;
      owner = msg.sender;
  }
  // Asignar la dirección del usuario coordinador: @param addr Dirección del usuario coordinador
  function setCoordinador(address addr) soloOwner soloAbierta public {
    coordinador = addr;
  }
  // Cerrar la asignatura
  function cerrar() soloCoordinador public {
    cerrada = true;
  }
  // Añadir un profesor nuevo (impide que se pueda meter un nombre vacío): @param _addr Dirección del profesor. @param _nombre Nombre del profesor
  function addProfesor(address _addr, string memory _nombre) soloOwner soloAbierta public {
    require(bytes(datosProfesor[_addr]).length == 0, "El profesor ya ha sido anadido como profesor");
    require(bytes(_nombre).length != 0, "El nombre del profesor no puede ser vacio");
    datosProfesor[_addr] = _nombre;
    profesores.push(_addr);
  }
  // Número de profesores añadidos
  function profesoresLength() public view returns(uint) {
    return profesores.length;
  }
  // Funcion para que puedan matricularse los alumnos (impedir nombre o dni vacios) Se añade el dni en este caso con respecto a la otra practica
  function automatricula (string memory _nombre, string memory _dni, string memory _email) soloNoMatriculados soloAbierta public {
    _matricular(msg.sender, _nombre, _dni, _email);
  }
  // El owner puede matricular alumnos (impedir nombre o dni vacios y dni debe ser unico)
  function matricular (address _addr, string memory _nombre, string memory _dni, string memory _email) soloOwner soloNoMatriculados soloAbierta public {
    _matricular(_addr, _nombre, _dni, _email);
  }

  function _matricular(address _addr, string memory _nombre, string memory _dni, string memory _email) soloNoMatriculados soloAbierta private {
    require(bytes(_nombre).length != 0, "El nombre del alumno no puede estar vacio");
    require(bytes(_dni).length != 0, "El DNI del alumno no puede estar vacio");
    if (dniUsados[_dni] != address(0x0)) {
      revert DNIDuplicadoError({dni: _dni});
    }
    DatosAlumno memory datos = DatosAlumno(_nombre, _dni, _email); // Creo un objeto temporal de tipo DatosAlumno
    datosAlumno[_addr] = datos; // Para este usuario, me guardo sus datos en el array
    dniUsados[_dni] = _addr;
    matriculas.push(_addr);
  }
  // Devuelve el número de alumnos matriculados
  function matriculasLength() public view returns(uint) {
      return matriculas.length;
  }
  // Permite a un alumno obtener sus propios datos
  function quienSoy() soloMatriculados public view returns(string memory _nombre, string memory _dni, string memory _email) {
      DatosAlumno memory datos = datosAlumno[msg.sender];
      _nombre = datos.nombre;
      _dni = datos.dni;
      _email = datos.email;
  }
  // Crea una prueba de evaluación de una asignatura, recibe 3 parametros y devuelve la posición en el array evaluaciones
  function creaEvaluacion(string memory _nombre, uint _fecha, uint _porcentaje, uint _minimo) soloCoordinador soloAbierta public returns(uint) {
      require(bytes(_nombre).length != 0, "El nombre de la evaluacion no puede ser vacio");
      evaluaciones.push(Evaluacion(_nombre, _fecha, _porcentaje, _minimo));
      return evaluaciones.length -1;
  }
  // Edita una prueba de evaluación de una asignatura existente, recibe 4 parametros (anteriores más índice a modificar) y devuelve la posición en el array evaluaciones
  function editaEvaluacion(uint _index, string memory _nombre, uint _fecha, uint _porcentaje, uint _minimo) soloCoordinador soloAbierta public returns(uint) {
      require(bytes(_nombre).length != 0, "El nombre de la evaluacion no puede ser vacio");
      evaluaciones[_index] = Evaluacion(_nombre, _fecha, _porcentaje, _minimo);
      return evaluaciones.length -1;
  }
  // Devuelve el número de evaluaciones creadas
  function evaluacionesLength() public view returns(uint) {
      return evaluaciones.length;
  }

  function califica(address alumno, uint evaluacion, TipoNota tipo, uint calificacion) soloAbierta soloProfesor public {
    require(estaMatriculado(alumno), "Solo se puede calificar a un alumno matriculado");
    require(evaluacion < evaluaciones.length, "No se puede calificar una evaluacion que no existe");
    require(calificacion <= 1000, "No se puede calificar con una nota mayor a la permitida");
    Nota memory nota = Nota(tipo, calificacion);
      
    calificaciones[alumno][evaluacion] = nota;
  }
  // Devuelve el tipo de nota y la calificacion obtenida por el alumno que invoca el metodo en la calificacion pasada como parametro
  function miNota(uint evaluacion) soloMatriculados public view returns(TipoNota tipo, uint calificacion) {
      require(evaluacion < evaluaciones.length, "El indice de la evaluacion no existe");
      Nota memory nota = calificaciones[msg.sender][evaluacion];
      tipo = nota.tipo;
      calificacion = nota.calificacion;
  }
  // Devuelve la nota final del alumno que llama al método
  function miNotaFinal() soloMatriculados public view returns (TipoNota tipo, uint calificacion) {
    return _notaFinal(msg.sender);
  }
  function notaFinal(address _addr) soloCoordinador public view returns (TipoNota tipo, uint calificacion) {
    return _notaFinal(_addr);
  }
  function _notaFinal(address _addr) private view returns (TipoNota tipo, uint calificacion) {
    tipo = TipoNota.NP;
    for (uint i = 0; i < evaluaciones.length; i++) {
      if (calificaciones[_addr][i].tipo == TipoNota.Empty) {
        return (TipoNota.Empty, 0);
      }
      if (calificaciones[_addr][i].tipo == TipoNota.Normal) {
        tipo = TipoNota.Normal;
        continue;
      }
    }
    if (tipo == TipoNota.NP) {
      return (tipo, 0);
    }
    bool suspenso = false;
    uint nota = 0;
    for (uint i = 0; i < evaluaciones.length; i++) {
      if (calificaciones[_addr][i].calificacion < evaluaciones[i].minimo) {
        suspenso = true;
      }
      nota += calificaciones[_addr][i].calificacion * evaluaciones[i].porcentaje / 100;
    }
    if (suspenso && nota > 499) {
      nota = 499;
    }
    tipo = TipoNota.Normal;
    calificacion = nota;
  }
  // Consulta si una dirección pertenece a un alumno matriculado
  function estaMatriculado (address alumno) private view returns(bool) {
      string memory _nombre = datosAlumno[alumno].nombre;
      bytes memory b = bytes(_nombre);
      return b.length != 0;
  }
  // Modificador para que la función sólo la pueda ejecutar el owner (Usada en setCoordinador y addProfesor)
  modifier soloOwner() {
    require(msg.sender == owner, "Solo permitido al owner");
    _;
  }
  // Modificador para que la función sólo la pueda ejecutar el coordinador (Usada en cerrar y creaEvaluacion)
  modifier soloCoordinador() {
    require(msg.sender == coordinador, "Solo permitido al coordinador");
    _;
  }
  // Modificador para que la función sólo la pueda ejecutar el profesor (Usada en califica)
  modifier soloProfesor() {
    string memory _nombre = datosProfesor[msg.sender];
    require(bytes(_nombre).length != 0, "Solo permitido a un profesor");
    _;
  }
  // Modificador para que la función sólo la pueda ejecutar un alumno matriculado
  modifier soloMatriculados() {
    require(estaMatriculado(msg.sender), "Solo permitido a alumnos matriculados");
    _;
  }
  // Modificador para que la función sólo la pueda ejecutar un alumno no matriculado
  modifier soloNoMatriculados() {
    require(!estaMatriculado(msg.sender), "Solo permitido a alumnos no matriculados");
    _;
  }
  // Modificador para que una función solo la pueda ejecutar si la asignatura no esta cerrada (Usado en setCoordinador, addProfesor, automatricula, creaEvaluacion y califica)
  modifier soloAbierta() {
    require(!cerrada, "Solo permitido si la asignatura no esta cerrada");
    _;
  }

  // Impide los pagos y gestiones con dinero en este contrato
  receive() external payable {
      revert("Este contrato no acepta gestiones con dinero");
  }
}

