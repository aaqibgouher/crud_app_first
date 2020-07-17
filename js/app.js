$(document).ready(function(){
    
    // var id = 1;
    

    var crud_array = [
        {
            "id" : 1,
            "name" : "Aaqib",
            "user_name" : "aaqibgouher",
            "age" : 19
        },
        {
            "id" : 2,
            "name" : "Nazish",
            "user_name" : "nazishfraz",
            "age" : 25
        },
        {
            "id" : 3,
            "name" : "Danish",
            "user_name" : "gouherdanish",
            "age" : 29
        }
    ];


    function crud_list(){
        var crud_list_html = "";

        if(crud_array.length){
            for(crud in crud_array){
                crud_list_html += '<tr class="text-danger"><td id="td_id">'+crud_array[crud]["id"]+'</td><td id="td_name">'+crud_array[crud]["name"]+'</td><td id="td_user_name">'+crud_array[crud]["user_name"]+'</td><td id="td_age">'+crud_array[crud]["age"]+'</td><td><center><button class="btn btn-info btn-xs update_btn" data-toggle="modal" data-target="#myModal2" ><span class="glyphicon glyphicon-pencil"></span></button><button class="btn btn-danger btn-xs delete_btn" ><span class="glyphicon glyphicon-trash"></span></button></center></td></tr>';
                // id ++;
            }
        }
        else{
            crud_list_html += '<tr><td colspan="5" class="text-center">No Data Available</td></tr>'
        }

        $("#tbody_id").html(crud_list_html);
        
    }

    function crud_add(){
        $("#modal_add_btn").click(function(){
            var crud_object = {};

                crud_object["id"] = $("#input_id").val();
                crud_object["name"] = $("#input_name").val();
                crud_object["user_name"] = $("#input_user_name").val();
                crud_object["age"] = $("#input_age").val();
                // console.log(crud_object);
                
                if(crud_object["id"] && crud_object["name"] && crud_object["user_name"] && crud_object["age"]){
                    crud_array.push(crud_object);
                    // console.log(crud_array)
                    // id = 1;
                    crud_list();
                }
                else{
                    alert("Data is Not Completed.")
                }

                $("#input_id").val("");
                $("#input_name").val("");
                $("#input_user_name").val("");
                $("#input_age").val("");
                
        })
    }

    function crud_update_row(id,name,user_name,age){
        for(i in crud_array){
            if(id == crud_array[i]["id"]){
                crud_array[i]["name"] = name;
                crud_array[i]["user_name"] = user_name;
                crud_array[i]["age"] = age;
                // console.log(crud_array);
                break;
            }
        }
    }

    function crud_update(){
        $(".update_btn").click(function(){
            var crud_update_id = $(this).closest("tr").find("td").first().text();
            for(i in crud_array){
                if(crud_update_id == crud_array[i]["id"]){
                    console.log(crud_update_id);
                    $("#input_id_2").val(crud_array[i]["id"]);
                    $("#input_name_2").val(crud_array[i]["name"]);
                    $("#input_user_name_2").val(crud_array[i]["user_name"]);
                    $("#input_age_2").val(crud_array[i]["age"]);   
                    break; 
                }
            }    
        })

        $("#modal_update_btn").click(function(){
            var crud_update_id = $("#input_id_2").val();
            var updated_name = $("#input_name_2").val();
            var updated_user_name = $("#input_user_name_2").val();
            var updated_age = $("#input_age_2").val();
            // console.log(crud_update_id);
            // console.log(updated_name);
            // console.log(updated_user_name);
            // console.log(updated_age);
            crud_update_row(crud_update_id,updated_name,updated_user_name,updated_age);
            crud_list();
            $("#input_id_2").val("");
            $("#input_name_2").val("");
            $("#input_user_name_2").val("");
            $("#input_age_2").val("");
        })
    }

    function crud_delete_row(del_id){
        for(i in crud_array){
            if(del_id == crud_array[i]["id"]){
                crud_array.splice(i,1);
                console.log(crud_array);
            }
        }
        // crud_array.splice(del_id,1);
        // console.log(crud_array);
    }
    
    function crud_delete(){
        $(document).on("click",".delete_btn",function(){
            var isConfirm = confirm("Do You Want TO Move In Trash ?");

            if(isConfirm){
                var del_id =  $(this).closest("tr").find("td").first().text();
                // console.log(del_id);
                crud_delete_row(del_id);
                // id = 1;
                crud_list();
            }
        })
    }

    function crud_search(){
        var search_input_value;
        // console.log(search_input_value);

        $("#search_input").keyup(function(e){
            e.preventDefault();
            if(e.keyCode === 13){
                search_input_value = $(this).val();
                console.log(search_input_value);
            }
        })
    }


    function init(){
        crud_list();
        crud_add();
        crud_update();
        crud_delete();
        crud_search();
    }
    
    init();
})