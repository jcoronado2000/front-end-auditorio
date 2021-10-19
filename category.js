//const endpointcategory = "http://localhost:8080/api/Category"
const endpointcategory = "http://150.230.77.129:8080/api/Category"

function jsoncategory(){
    const data = {
        name: $("#nombrectga").val(),
        description:$("#descriptionctga").val()
    }

    if(data.name =="" || data.description==""){
        return false;
    }else{
        return JSON.stringify(data)
    }
}

function saveCategory(){
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

}

function setMensaje(respuesta){
    let cadena = "";

    console.log(respuesta)

    respuesta.forEach(element => {
       cadena +="<tr><th>"+element.id+"</th><td>"+element.name+"</td><td>"+element.description+"</td><td><button type='button' class='btn btn-danger' style='width: auto;'>Delete</button>"
       cadena +="<button type='button' id='escoger' class='btn btn-success'style='width: auto; margin-left: 16px'>Update</button></td></tr>" 
    });

    $("#retornarTabla").html(cadena);
}

$(".table").hide();


//EN PRUEBAS PARA RETO 4//
$("#escoger").on("click", function(event){
    //let idseleccionado = $(this).find("td:first-child").html();   
    alert("Hola mundo");
});

$("#escoger").click(function(event){
    alert("Hola mundo");
});