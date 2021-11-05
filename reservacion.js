/**
 * endpoint reservas
 */
const endpointreservas = "http://localhost:8080/api/Reservation"


function jsonReservas(){
    const data = {
        startDate: $("#startdate").val(),
        devolutionDate: $("#devolutiondate").val(),
        status: $("#retornaDataReservaStatus").val(),
        audience: {
            id: $("#retornaDataReservaAudit").val()
        },
        client:{
            idClient: $("#retornaDataReservaCliente").val()
        }
    }

    return JSON.stringify(data);
}
function getDataSelectOp(){
    $.ajax({
        method:"GET",
        url: endpointcliente+"/all",
        success: function (data) {          
            retornaSelectCliente(data);
        }
    });

    $.ajax({
        method:"GET",
        url: endpointadiencia+"/all",
        success: function (data) {          
            retornaSelectAuditorio(data);
        }
    });
}
function getDataTable(){
    $.ajax({
        method:"GET",
        url: endpointreservas+"/all",
        success: function (data) {          
            retornaSelectTable(data);
        }
    });

    $("#Categoria").hide();
    $("#Auditorio").hide();
    $("#Cliente").hide();
    $("#Mensaje").hide();
    $("#Reservas").show();
} 

function saveReservas(){
    $.ajax({
        method: "POST",
        url: endpointreservas + "/save",
        data: jsonReservas(),
        dataType: "json",
        contentType: "application/json",
        complete: function (response) {
            if (response.status == 201) {
                swal("Good job!", "Registro hecho con exito", "success")
                .then((value)=>{
                    setTimeout(function () {
                        window.location.reload()
                    }, 500);
                });
            } else {
                if (!jsonAuditorio()) {
                    swal("Error", "Campos vacios ", "warning");
                } else {
                    swal("Error", "Error al insertar datos " + response.status, "warning")
                    .then((value)=>{
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    });
                }
            }
        }
    })
}
function eliminarReserva(id){
    $.ajax({
        method: "DELETE",
        url: endpointreservas +"/"+id,
        success:function(data){
            console.log(data);
            swal("", `Registro eliminado con exito `, "success").then(value=>{
                setTimeout(function(){
                    window.location.reload();
                },100);
            });
        },
        error:function(data){
            console.log(data.responseJSON.message);
            swal("", `Hubo un problema al eliminar el registro `, "error");
        }
    });
}

function deltereservas(id){
    swal("","Esta seguro de eliminar el registro con id: " + id, "warning").then(value=>{
        eliminarReserva(id);
    })
}

function retornaSelectCliente(data){
    let cadena = "";

    data.forEach(element => {
        cadena += "<option value="+element.idClient+">"+element.name+"</option>"
    });

    $("#retornaDataReservaCliente").html(cadena);

}

function retornaSelectAuditorio(data){
    let cadena = "";

    data.forEach(element => {
        cadena += "<option value="+element.id+">"+element.name+"</option>"
    });

    $("#retornaDataReservaAudit").html(cadena);

}

function retornaSelectTable(data){

    let cadena = "";

    data.forEach(element=>{

        let sd = new Date(element.startDate);
        let dd = new Date(element.devolutionDate);

        cadena += "<tr><th>"+element.idReservation+"</th><td>"+sd.toISOString().slice(0,10)+"</td><td>"+dd.toISOString().slice(0,10)+"</td><td>"+element.client.name+"</td><td>"+element.audience.name+"</td><td>"+element.status+"</td><td><button type='button' class='btn btn-danger'  onclick='deltereservas("+element.idReservation+")' style='width: auto;'>Delete</button>"
        cadena += "<button type='button' data-bs-toggle='modal' data-bs-target='#crearauditorio' class='btn btn-success'style='width: auto; margin-left: 16px' onclick=\"btnacaudi("+element.idReservation+",\'"+element.startDate+"',\'"+element.devolutionDate+"',\'"+element.client.name+"',\'"+element.audience.name+"',\'"+element.status+"')\" >Update</button></td></tr>" 
    });

    $("#retornarTablaReservas").html(cadena);


}