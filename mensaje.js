/**
 * endpoint de mensaje
 */

//const endpointmensaje = "http://localhost:8080/api/Message"
const endpointmensaje = "http://150.230.77.129:8080/api/Message"

let banderaM = true;

function jsonMensaje() {
    let datamsn = {}

    if(banderaM){
        datamsn = {
            messageText: $("#mensajemsn").val(),
            client: {
                idClient: $("#retornaDataCliente").val()
            },
            audience: {
                id: $("#retornaDataAuditorio").val()
            }
        }
    }else{
        datamsn = {
            idMessage: $("#idmensaje").val(),
            messageText: $("#mensajemsn").val(),
            client: {
                idClient: $("#retornaDataCliente").val()
            },
            audience: {
                id: $("#retornaDataAuditorio").val()
            }
        }
    }


    if (datamsn.messageText == "" || datamsn.client == "" || datamsn.audience == "") {
        return false;
    } else {
        return JSON.stringify(datamsn)
    }
}

function saveMensaje() {

    if(banderaM){
        $.ajax({
            method: "POST",
            url: endpointmensaje + "/save",
            data: jsonMensaje(),
            dataType: "json",
            contentType: "application/json",
            complete: function (response) {
                if (response.status == 201) {
                    swal("Good job!", "Registro hecho con exito", "success");
                    setTimeout(function () {
                        window.location.reload()
                    }, 2000);
                } else {
                    if(!jsonMensaje()){
                        swal("Error", "Campos vacios ", "warning");    
                      }else{
                        swal("Error", "Error al insertar datos " + response.status, "warning"); 
                      }
                }
            }
        })
    }else{
        $.ajax({
            method: "PUT",
            url: endpointmensaje + "/update",
            data: jsonMensaje(),
            dataType: "json",
            contentType: "application/json",
            complete: function (response) {
                if (response.status == 201) {
                    swal("Good job!", "Registro actualizado con exito", "success");
                    setTimeout(function () {
                        window.location.reload()
                    }, 2000);
                } else {
                    if(!jsonMensaje()){
                        swal("Error", "Campos vacios ", "warning");    
                      }else{
                        swal("Error", "Error al insertar datos en  " + response.status, "warning"); 
                      }
                }
            }
        })
    }



}

function getMensajeFinal(){
    $.ajax({
        method:"GET",
        url: endpointmensaje+"/all",
        success: function (data) {
            setMesageFinal(data);
        }
    });

    $("#Categoria").hide();
    $("#Auditorio").hide();
    $("#Cliente").hide();
    $("#Mensaje").show();

}

function delMensaje(idmsn) {
    $.ajax({
        method: "DELETE",
        url: endpointmensaje +"/"+idmsn,
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

function deltemensaje(respuesta) {

    swal("", "Esta seguro de eliminar el registro con id: " + respuesta, "warning")
    //swal("Esta seguro de eliminar el registro con id: " + respuesta)
        .then((value) => {
            delMensaje(respuesta);
    });

}

function setMesageFinal(respuesta){

    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
       cadena +="<tr><th>"+element.idMessage+"</th><td>"+element.messageText+"</td><td><button type='button' onclick='deltemensaje("+element.idMessage+")' class='btn btn-danger' style='width: auto;'>Delete</button>"
       cadena +="<button type='button' data-bs-toggle='modal' data-bs-target='#crearmensaje' class='btn btn-success'style='width: auto; margin-left: 16px' onclick=\"btnacmsn("+element.idMessage+",\'"+element.messageText+"')\">Update</button></td></tr>" 
    });

    $("#retornarTablaMensaje").html(cadena);
}

function btnacmsn(idMessage,messageText){
    banderaM =false;
    setMsnCliente()
    clickbtn()
    $("#idmensaje").val(idMessage)
    $("#mensajemsn").val(messageText)
}