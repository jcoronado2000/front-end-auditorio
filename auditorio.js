/**
 * endpont de audience
 */
const endpointadiencia = "http://localhost:8080/api/Audience"

function jsonAuditorio() {
    const auditoriodata = {
        owner: $("#ownerauditorio").val(),
        capacity: $("#capacityauditorio").val(),
        category: {
            id: 1
        },
        name: $("#nameauditorio").val(),
        description: $("#descriptionauditorio").val()
    }

    if (auditoriodata.owner == "" || auditoriodata.capacity == "" || auditoriodata.name == "" || auditoriodata.description == "" || auditoriodata.category=="") {
        return false;
    } else {
        return JSON.stringify(auditoriodata)
    }
}

function saveAuditorio() {
    console.log(jsonAuditorio());
    $.ajax({
        method: "POST",
        url: endpointadiencia + "/save",
        data: jsonAuditorio(),
        dataType: "json",
        contentType: "application/json",
        complete: function (response) {
            if (response.status == 201) {
                swal("Good job!", "Registro hecho con exito", "success");
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
            } else {
                if (!jsonAuditorio()) {
                    swal("Error", "Campos vacios ", "warning");
                } else {
                    swal("Error", "Error al insertar datos " + response.status, "warning");
                }
            }
        }
    })
}

function getAuditorio(){
    $.ajax({
        method:"GET",
        url: endpointadiencia+"/all",
        success: function (data) {
            setAuditorio(data);
        }
    });

    $("#Categoria").hide();
    $("#Auditorio").show();
    $("#Cliente").hide();
    $("#Mensaje").hide();

}

function setAuditorio(respuesta){

    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
       cadena +="<tr><th>"+element.id+"</th><td>"+element.name+"</td><td>"+element.owner+"</td><td>"+element.capacity+"</td><td>"+element.description+"</td><td><button type='button' class='btn btn-danger' style='width: auto;'>Delete</button>"
       cadena +="<button type='button' id='escoger' class='btn btn-success'style='width: auto; margin-left: 16px'>Update</button></td></tr>" 
    });

    $("#retornarTablaAuditorio").html(cadena);
}