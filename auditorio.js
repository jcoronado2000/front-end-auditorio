/**
 * endpont de audience
 */
//const endpointadiencia = "http://localhost:8080/api/Audience"
const endpointadiencia = "http://150.230.77.129:8080/api/Audience"
//const endpointctg = "http://localhost:8080/api/Category"
const endpointctg = "http://150.230.77.129:8080/api/Category"

let opcionD = true;
let banderaF = true;

function jsonAuditorio() {
    let auditoriodata = {}

    if(banderaF){
        auditoriodata = {
            owner: $("#ownerauditorio").val(),
            capacity: $("#capacityauditorio").val(),
            category: {
                id: $("#retornaDataCategoria").val()
            },
            name: $("#nameauditorio").val(),
            description: $("#descriptionauditorio").val()
        }
    }else{
        auditoriodata = {
            id: $("#idauditorio").val(),
            owner: $("#ownerauditorio").val(),
            capacity: $("#capacityauditorio").val(),
            category: {
                id: $("#retornaDataCategoria").val()
            },
            name: $("#nameauditorio").val(),
            description: $("#descriptionauditorio").val()
        }
    }
     

    if (auditoriodata.owner == "" || auditoriodata.capacity == "" || auditoriodata.name == "" || auditoriodata.description == "" || auditoriodata.category=="") {
        return false;
    } else {
        return JSON.stringify(auditoriodata)
    }
}

function saveAuditorio() {

    if(banderaF){
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
    }else{
        $.ajax({
            method: "PUT",
            url: endpointadiencia + "/update",
            data: jsonAuditorio(),
            dataType: "json",
            contentType: "application/json",
            complete: function (response) {
                if (response.status == 201) {
                    swal("Good job!", "Registro actualziado con exito", "success");
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

}

function getAuditorio(){
    $.ajax({
        method:"GET",
        url: endpointadiencia+"/all",
        success: function (data) {          
            if(opcionD==true){
                setAuditorio(data);
            }else{
                mtrAuditoriomsn(data);
            }
        }
    });

    $("#Categoria").hide();
    $("#Auditorio").show();
    $("#Cliente").hide();
    $("#Mensaje").hide();

}

function getCtgAudi(){
    $.ajax({
        method:"GET",
        url: endpointctg+"/all",
        success: function (data) {
            mostrarCatgoriaAuditorio(data);
        }
    });
}
function delAuditorio(idaudi) {
    $.ajax({
        method: "DELETE",
        url: endpointadiencia +"/"+idaudi,
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

function delteadutorio(respuesta) {

    swal("", "Esta seguro de eliminar el registro con id: " + respuesta, "warning")
    //swal("Esta seguro de eliminar el registro con id: " + respuesta)
        .then((value) => {
            delAuditorio(respuesta);
    });

}

function clickbtn(){
    opcionD = false;
    getAuditorio();

}



function setAuditorio(respuesta){

    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
       cadena +="<tr><th>"+element.id+"</th><td>"+element.name+"</td><td>"+element.owner+"</td><td>"+element.capacity+"</td><td>"+element.description+"</td><td>"+element.category.name+"</td><td><button type='button' class='btn btn-danger'  onclick='delteadutorio("+element.id+")' style='width: auto;'>Delete</button>"
       cadena +="<button type='button' data-bs-toggle='modal' data-bs-target='#crearauditorio' class='btn btn-success'style='width: auto; margin-left: 16px' onclick=\"btnacaudi("+element.id+",\'"+element.name+"',\'"+element.owner+"',\'"+element.capacity+"',\'"+element.description+"')\" >Update</button></td></tr>" 
    });

    $("#retornarTablaAuditorio").html(cadena);
}

function btnacaudi(id,name,owner,capacity,description){
    banderaF = false;
    getCtgAudi();
    $("#idauditorio").val(id)
    $("#nameauditorio").val(name)
    $("#ownerauditorio").val(owner)
    $("#capacityauditorio").val(capacity)
    $("#descriptionauditorio").val(description)

}


function mostrarCatgoriaAuditorio(respuesta){
    let cadenaUnica = "";

    console.log(respuesta.id)

    respuesta.forEach(element=>{
        cadenaUnica += "<option  value="+element.id+">"+element.name+"</option>"
    });

    $("#retornaDataCategoria").html(cadenaUnica);
}

function mtrAuditoriomsn(respuesta){
    let cadena = "";

    respuesta.forEach(element=>{
        cadena += "<option  value="+element.id+">"+element.name+"</option>"
    })

    $("#retornaDataAuditorio").html(cadena);
}