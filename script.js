/**
 * autor juan carlos coronado
 * escrito 29/09/2021
 * 
 */
/**
 * endpoint api audience Oracle Cloud
 */
const endpoint = "https://g313c6a565bda1d-db202109260213.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience"
const endpointcli = "http://150.230.77.129:8080/api/Client"
const endpointmess = "https://g313c6a565bda1d-db202109260213.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message"
const etp = document.getElementById("informacion");
/**
 * variables form auditorio
 */
const idaudi = document.getElementById("id");
const owneraudi = document.getElementById("owner");
const capacityaudi = document.getElementById("capacity");
const category_idaudi = document.getElementById("category_id");
const nameaudi = document.getElementById("name");

const idaudiac =document.getElementById("idaudiac");
const owneraudiac = document.getElementById("owneraudiac");
const capacityaudiac = document.getElementById("capacityaudiac");
const category_idaudiac = document.getElementById("category_idaudiac");
const nombreaudiac = document.getElementById("nombreaudiac");

const ideliac = document.getElementById("ideliac");

const tabledatosaudi = document.getElementById("tabledatosaudi");

/**
 * variables form cliente
 */
 const contrasena = document.getElementById("contrasena");
const nombrecli = document.getElementById("nombrecli");
const correo = document.getElementById("correo");
const edad = document.getElementById("edad");

const idclieac = document.getElementById("idclieac");
const nombrecliac = document.getElementById("nombrecliac");
const emailcliac = document.getElementById("emailcliac");
const edadcliac = document.getElementById("edadcliac");

const idclieeli = document.getElementById("idclieeli");

const tabledatoscli = document.getElementById("tabledatoscli");

/**
 *  variables form mensaje
 */
const idmess = document.getElementById("idme");
const mensaje = document.getElementById("mensaje");

const idmensajeac = document.getElementById("idmensajeac");
const mensajeac = document.getElementById("mensajeac");

const ideliminar = document.getElementById("ideliminar");

const tabledats = document.getElementById("tabledats");
/**
 * recibir datos de front tipo json
 */

function jsonauditorio(){
    
    const data = {
        id:idaudi.value,
        owner:owneraudi.value,
        capacity:capacityaudi.value,
        category_id:category_idaudi.value,
        name: nameaudi.value
    }

    return JSON.stringify(data);
}
function jsonauditorioac(){
    const data = {
        id:idaudiac.value,
        owner:owneraudiac.value,
        capacity:capacityaudiac.value,
        category_id:category_idaudiac.value,
        name: nombreaudiac.value
    }
    return JSON.stringify(data);

}
function jsonauditorioelimi(){
    const data = {
        "id":ideliac.value
    }
    return JSON.stringify(data);
}
function jsoncliente(){
    const data = {
        name: nombrecli.value,
        email:correo.value,
        password: contrasena.value,
        age: edad.value
    }

    return JSON.stringify(data);
}
function jsonclienteac(){
    const data = {
        id: idclieac.value,
        name: nombrecliac.value,
        email: emailcliac.value,
        age: edadcliac.value
    }
    return JSON.stringify(data);
}
function jsonclienteelimi(){
    const data = {
        "id":idclieeli.value
    }
    return JSON.stringify(data);
}
function jsonmensaje(){
    const data = {
        id: idmess.value,
        messagetext: mensaje.value
        
    }
    return JSON.stringify(data);
}
function jsonmensajeac(){
    const data = {
        id: idmensajeac.value,
        mensaje: mensajeac.value      
    }
    return JSON.stringify(data);
}

function jsonmensajeeli(){
    const data = {
        id: ideliminar.value 
    }
    return JSON.stringify(data);
}
function jsoncategoria(){
    const data
}
/**
 * Metodo POST
 */
 function peticionpos(){

    $.ajax({
        method:"POST",
        url:endpoint,
        data:jsonauditorio(),
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            //console.log(response.status)
            if(response.status==201){
                swal("Good job!", "Registro hecho con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            }
        }
    })    
}
function peticionposcli(){
    $.ajax({
        method:"POST",
        url: endpointcli+"/save",
        data: jsoncliente(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            console.log(jsoncliente())
            if(response.status==201){
                swal("Good job!", "Registro hecho con exito", "success");
                console.log(url);
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
                console.log(url);
            } 
        }
        
    })
}
function peticionmensa(){
    $.ajax({
        method:"POST",
        url: endpointmess,
        data: jsonmensaje(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            console.log(jsonmensaje())
            if(response.status==201){
                swal("Good job!", "Registro hecho con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
}
/**
 * METODO PUT
 */
function peticionaudiac(){
    $.ajax({
        method:"PUT",
        url: endpoint,
        data: jsonauditorioac(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            console.log(jsonauditorioac())
            if(response.status==201){
                swal("Good job!", "Registro actulizado con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
}

function peticionclieac(){
    $.ajax({
        method:"PUT",
        url: endpointcli,
        data: jsonclienteac(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            if(response.status==201){
                swal("Good job!", "Registro actulizado con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
}
function peticionmensac(){
    $.ajax({
        method:"PUT",
        url: endpointmess,
        data: jsonmensajeac(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            if(response.status==201){
                swal("Good job!", "Registro actulizado con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
}
/**
 * PETICION DELETE
 */
function peticionauditoeli(){
    $.ajax({
        method:"DELETE",
        url: endpoint,
        data: jsonauditorioelimi(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            console.log(jsonauditorioac())
            if(response.status==204){
                swal("Good job!", "Registro eliminado con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
    
}
function peticionclienteeli(){
    $.ajax({
        method:"DELETE",
        url: endpointcli,
        data: jsonclienteelimi(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            if(response.status==204){
                swal("Good job!", "Registro eliminado con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
    
}

function peticionmensajeeli(){
    $.ajax({
        method:"DELETE",
        url: endpointmess,
        data: jsonmensajeeli(),
        dataType: "json",
        contentType: "application/json",
        complete:function(response){
            if(response.status==204){
                swal("Good job!", "Registro eliminado con exito", "success");
            }else{
                swal("Error", "Error al insertar datos " + response.status, "warning");
            } 
        }
    })
    
}
/**
 * PETICIO GET
 */

function obtenermensaje(){

    $.ajax({
        method: "GET",
        url: endpointmess,
        success: function (data) {
            mostrarMensaje(data.items);
            /*mostrarhtml(data.items);*/
        }
    });

}

function mostrarMensaje(data){

    let cadena = ""

    data.forEach(element =>{
        cadena +="<tr><td>"+ element.id + "</td><td>" + element.messagetext +"</td></tr>"
    })

    tabledats.innerHTML = cadena;


}

function obtenerclientes(){
    $.ajax({
        method: "GET",
        url: endpointcli,
        success: function (data) {
            mostarclientes(data.items);
            /*mostrarhtml(data.items);*/
        }
    });
}
function mostarclientes(data){
    let cadenacli = "";

    data.forEach(element=>{
        cadenacli +="<tr><td>" + element.name +"</td><td>"+ element.email +"</td><td>"+ element.age +"</td><td>"+ element.contrasena +"</td></tr>"
    })

    tabledatoscli.innerHTML = cadenacli;

}

function obtenerauditorio(){
    $.ajax({
        method: "GET",
        url: endpoint,
        success: function (data) {
            mostrarauditorio(data.items);
            /*mostrarhtml(data.items);*/
        }
    });
}

function mostrarauditorio(data){

    let cadenaaudi = ""

    data.forEach(element=>{
        cadenaaudi +="<tr><td>"+ element.id +"</td><td>" + element.owner +"</td><td>"+ element.capacity +"</td><td>"+ element.category_id +"</td><td>"+ element.name +"</td></tr>"
    })

    tabledatosaudi.innerHTML = cadenaaudi;

}


/**
 * funciones de click
 */

/*if(btnaddaudi == null && btnaddmensaj == null ){
    addclid.addEventListener("click",(e)=>{
        peticionposcli(jsoncliente());
    })
}else if(btnaddaudi == null && addclid == null){
    btnaddmensaj.addEventListener("click",(e)=>{
        peticionmensa(jsonmensaje());
    })
}else{
    btnaddaudi.addEventListener("click",(e)=>{
        peticionpos(jsonauditorio());
    })
}*/






/**
 * peticion get de la api audience
 */

function peticionget() {

    /**
     * peticion Asincronas al servidor  con ajax
     */
    $.ajax({
        method: "GET",
        url: endpoint,
        success: function (data) {
            console.log(data.items);
            mostrarAuditorio(data.items);
            /*mostrarhtml(data.items);*/
        }
    });
}

function peticionput(){

    const data={
        id:2,
        owner:"lolo",
        capacity:10,
        category_id:20,
        name:"sebastian"
    }

    let datasend=JSON.stringify(data)

    $.ajax({
        method:"PUT",
        url:endpoint,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            console.log("Actualizar registro")
        }
    })
}

function peticiondelete(){

    const data={
        id:2
    }

    let datasend=JSON.stringify(data)

    $.ajax({
        method:"DELETE",
        url:endpoint,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            console.log("Elimina registro")
        }
    })
}
/**
 * funcion mostrar producto
 */
function mostrarAuditorio(auditorio){
    console.log("***************************");
    auditorio.forEach(element => {
        console.log("id " + element.id);
        console.log("owner " + element.owner);
        console.log("capacity " + element.capacity);
        console.log("category_id " + element.category_id);
        console.log("name " + element.name);
    console.log("***************************");

    });
}

/*function mostrarhtml(auditorio){
    let cadena = "";

    auditorio.forEach(element=>{
        cadena+="<p>id: " + element.id + "<br><p>owner: " + element.owner + "<br><p>capacity: " + element.capacity + "<br>"+             
        "<p>category_id: " + element.category_id + "<br>"+
        "<p>name: " + element.name + "<br>"

    })

    etp.innerHTML = cadena;
}*/

/**
 *  llamdo a la funcion peticion get
 */
//peticionget();
//peticionpos();
//peticionput();
//peticiondelete();