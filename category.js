  const endpointcategory = "http://localhost:8080/api/Category"
//const endpointcategory = "http://150.230.77.129:8080/api/Category"

let banderaPutPost = true;

function jsoncategory(){

     let data={}

    if(banderaPutPost){
        data = {
            name: $("#nombrectga").val(),
            description:$("#descriptionctga").val()
        }

    }else{
        data = {
            id: $("#idctg").val(),
            name: $("#nombrectga").val(),
            description:$("#descriptionctga").val()
        }
    }

    if(data.name =="" || data.description==""){
        return false;
    }else{
        return JSON.stringify(data)
    }
}

function saveCategory(){

    if(banderaPutPost){
        $.ajax({
            method:"POST",
            url:endpointcategory+"/save",
            data:jsoncategory(),
            dataType:"json",
            contentType:"application/json",
            complete:function(response){
                if(response.status==201){
                   swal("Good job!", "Registro hecho con exito", "success");
                   setTimeout(function(){ 
                    window.location.reload() 
                   }, 2000);
    
                }else{
                    if(!jsoncategory()){
                      swal("Error", "Campos vacios ", "warning");    
                    }else{
                      swal("Error", "Error al insertar datos " + response.status, "warning"); 
                    }
                }
            }
        })
    }else{

        $.ajax({
            method:"PUT",
            url:endpointcategory+"/update",
            data:jsoncategory(),
            dataType:"json",
            contentType:"application/json",
            complete:function(response){
                if(response.status==201){
                   swal("Good job!", "Registro actualziado con exito", "success");
                   setTimeout(function(){ 
                    window.location.reload() 
                   }, 2000);
    
                }else{
                    if(!jsoncategory()){
                      swal("Error", "Campos vacios ", "warning");    
                    }else{
                      swal("Error", "Error al insertar datos desde PUT" + response.status, "warning"); 
                    }
                }
            }
        })

    }
}

function delCategory(idctg) {
    $.ajax({
        method: "DELETE",
        url: endpointcategory +"/"+idctg,
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

function getCategory(){
    $.ajax({
        method:"GET",
        url: endpointcategory+"/all",
        success: function (data) {
            setMensaje(data);

        }
    });

    $("#Categoria").show();
    $("#Auditorio").hide();
    $("#Cliente").hide();
    $("#Mensaje").hide();
    $("#Reservas").hide();

}

function setMensaje(respuesta){
    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
       cadena +="<tr><th>"+element.id+"</th><td>"+element.name+"</td><td>"+element.description+"</td><td><button type='button' class='btn btn-danger' onclick='deltecategory("+element.id+")' style='width: auto;'>Delete</button>"
       cadena +="<button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#crearcategoria'  onclick=\"btnacctg("+element.id+",\'"+element.name+"',\'"+element.description+"')\" style='width: auto; margin-left: 16px'>Update</button></td></tr>" 
    });

    $("#retornarTabla").html(cadena);
}

function btnacctg(idsc,namec,descic){
   banderaPutPost= false;
   $("#idctg").val(idsc)
   $("#nombrectga").val(namec)
   $("#descriptionctga").val(descic) 
   console.log(idsc,namec,descic)
}

function deltecategory(respuesta) {

    swal("", "Esta seguro de eliminar el registro con id: " + respuesta, "warning")
    //swal("Esta seguro de eliminar el registro con id: " + respuesta)
        .then((value) => {
            delCategory(respuesta);
    });

}


$(".table").hide();

