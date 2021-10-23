
/**
 * endpoint de categoria
 */
//const endpointcliente = "http://localhost:8080/api/Client"
const endpointcliente = "http://150.230.77.129:8080/api/Client"

let opcion = true;
let banderaclt = true;


/**
 * variables del fomulario
 */
function jsoncliente() {

    let data = {}

    if(banderaclt){

        data = {
            email: $("#emailcliente").val(),
            password: $("#contrasenacliente").val(),
            name: $("#nombrecliente").val(),
            age: $("#edadcliente").val()
        }

    }else{

        data = {
            idClient:$("#idcliente").val(),
            email: $("#emailcliente").val(),
            password: $("#contrasenacliente").val(),
            name: $("#nombrecliente").val(),
            age: $("#edadcliente").val()
        }

    }

     

    if (data.email == "" || data.password == "" || data.name == "" || data.age == "") {
        return false;
    } else {
        console.log("esta pansado");
        return JSON.stringify(data)
    }
}


function savecliente() {

    if(banderaclt){

        $.ajax({
            method: "POST",
            url: endpointcliente + "/save",
            data: jsoncliente(),
            dataType: "json",
            contentType: "application/json",
            complete: function (response) {
                if (response.status == 201) {
                    swal("Good job!", "Registro hecho con exito", "success");
                    setTimeout(function () {
                        window.location.reload()
                    }, 2000);
                } else {
                    if (!jsoncliente()) {
                        swal("Error", "Campos vacios ", "warning");
                    } else {
                        swal("Error", "Error al insertar datos " + response.status, "warning");
                    }
                }
            }
        })

    }else{

        $.ajax({
            method: "PUT",
            url: endpointcliente + "/update",
            data: jsoncliente(),
            dataType: "json",
            contentType: "application/json",
            complete: function (response) {
                if (response.status == 201) {
                    swal("Good job!", "Registro actualizado con exito", "success");
                    setTimeout(function () {
                        window.location.reload()
                    }, 2000);
                } else {
                    if (!jsoncliente()) {
                        swal("Error", "Campos vacios ", "warning");
                    } else {
                        swal("Error", "Error al insertar datos " + response.status, "warning");
                    }
                }
            }
        })

    }

}

function getCliente() {
    $.ajax({
        method: "GET",
        url: endpointcliente + "/all",
        success: function (data) {
            if (opcion == true) {
                setCliente(data);
            } else {
                getmsncl(data);
            }
        }
    });

    $("#Categoria").hide();
    $("#Auditorio").hide();
    $("#Cliente").show();
    $("#Mensaje").hide();

}

/*function delCliente(idclt) {
    $.ajax({
        method: "DELETE",
        url: endpointcliente +"/"+idclt,
        dataType: "json",
        contentType: "application/json"
    }).then(function(data){
        console.log("lado bueno " + data)
        swal("", `Registro eliminado con exito `, "success");
    }).catch(function(err){
        console.log("lado del erro" + err)
        swal("", `Hubo un problema al eliminar el registro `, "error");
    });
}*/

function delCliente(idclt) {
    $.ajax({
        method: "DELETE",
        url: endpointcliente +"/"+idclt,
        success:function(data){
            console.log(data);
            swal("", `Registro eliminado con exito `, "success");
        },
        error:function(data){
            console.log(data.responseJSON.message);
            swal("", `Hubo un problema al eliminar el registro `, "error");
        }
    });
}

function setCliente(respuesta) {

    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
        cadena += "<tr><th>" + element.idClient + "</th><td>" + element.email + "</td><td>" + element.password + "</td><td>" + element.name + "</td><td>" + element.age + "</td><td><button type='button'  class='btn btn-danger' onclick='delteclit(" + element.idClient + ")' style='width: auto;'>Delete</button>"
        cadena += "<button type='button' data-bs-toggle='modal' data-bs-target='#crearcliente' class='btn btn-success'style='width: auto; margin-left: 16px' onclick=\"btnacclient("+element.idClient+",\'"+element.email+"',\'"+element.password+"',\'"+element.name+"',\'"+element.age+"')\">Update</button></td></tr>"
    });

    $("#retornarTablaCliente").html(cadena);
}

function btnacclient(idclt,emeilt,pwdcl,namecl,ageclt){
    banderaclt= false;
    $("#idcliente").val(idclt)
    $("#emailcliente").val(emeilt)
    $("#contrasenacliente").val(pwdcl) 
    $("#nombrecliente").val(namecl) 
    $("#edadcliente").val(ageclt) 
 }
 

function setMsnCliente() {
    opcion = false;
    getCliente()
}

function getmsncl(respuesta) {
    let cadena = "";

    respuesta.forEach(element => {
        cadena += "<option value=" + element.idClient + ">" + element.name + "</option>"
    });

    $("#retornaDataCliente").html(cadena);

}

function delteclit(respuesta) {
    swal("", "Esta seguro de eliminar el registro con id: " + respuesta, "warning")
        .then((value) => {
            delCliente(respuesta);
    });
}


console.log(banderaclt);

