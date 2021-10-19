
/**
 * endpoint de categoria
 */
//const endpointcliente = "http://150.230.77.129:8080/api/Client"
const endpointcliente = "http://localhost:8080/api/Client"

/**
 * variables del fomulario
 */
function jsoncliente() {
    const data = {
        email: $("#emailcliente").val(),
        password: $("#contrasenacliente").val(),
        name: $("#nombrecliente").val(),
        age: $("#edadcliente").val()
    }

    if (data.email == "" || data.password == "" || data.name == "" || data.age == "") {
        return false;
    } else {
        console.log("esta pansado");
        return JSON.stringify(data)  
    }
}


function savecliente() {
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

}

function getCliente() {
    $.ajax({
        method: "GET",
        url: endpointcliente + "/all",
        success: function (data) {
            setCliente(data);
        }
    });

    $("#Categoria").hide();
    $("#Auditorio").hide();
    $("#Cliente").show();
    $("#Mensaje").hide();

}

function setCliente(respuesta) {

    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
        cadena += "<tr><th>" + element.idClient + "</th><td>" + element.name + "</td><td>" + element.password + "</td><td>" + element.name + "</td><td>" + element.age + "</td><td><button type='button' class='btn btn-danger' style='width: auto;'>Delete</button>"
        cadena += "<button type='button' id='escoger' class='btn btn-success'style='width: auto; margin-left: 16px'>Update</button></td></tr>"
    });

    $("#retornarTablaCliente").html(cadena);
}
