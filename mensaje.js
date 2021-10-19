/**
 * endpoint de mensaje
 */

//const endpointmensaje = "http://localhost:8080/api/Message"
const endpointmensaje = "http://150.230.77.129:8080/api/Message"

function jsonMensaje() {
    const datamsn = {
        messageText: $("#mensajemsn").val(),
        client: {
            idClient: 1
        },
        audience: {
            id: 1
        }
    }

    if (datamsn.messageText == "" || datamsn.client == "" || datamsn.audience == "") {
        return false;
    } else {
        return JSON.stringify(datamsn)
    }
}

function saveMensaje() {

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

function setMesageFinal(respuesta){

    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
       cadena +="<tr><th>"+element.idMessage+"</th><td>"+element.messageText+"</td><td><button type='button' class='btn btn-danger' style='width: auto;'>Delete</button>"
       cadena +="<button type='button' id='escoger' class='btn btn-success'style='width: auto; margin-left: 16px'>Update</button></td></tr>" 
    });

    $("#retornarTablaMensaje").html(cadena);
}