$(document).ready(function(){
    
    var users = [
        {
            "id" : 1,
            "name" : "Aaqib",
            "username" : "aaqibgouher",
            "age" : 19
        },
        {
            "id" : 2,
            "name" : "Nazish",
            "username" : "nazishfraz",
            "age" : 25
        },
        {
            "id" : 3,
            "name" : "Danish",
            "username" : "gouherdanish",
            "age" : 29
        }
    ];


    function user_list(){
        var user_html = "";

        if(users.length){
            for(user in users){
                user_html += '<tr data-id="'+users[user]["id"]+'">'
                user_html += '<td>'+users[user]["id"]+'</td>';
                user_html += '<td>'+users[user]["name"]+'</td>';
                user_html += '<td>'+users[user]["username"]+'</td>';
                user_html += '<td>'+users[user]["age"]+'</td>';
                user_html += '<td>';
                user_html += '<div class="btn-group">';
                user_html += '<button class="btn btn-info btn-xs user_edit_btn" data-toggle="modal" data-target="#user_edit_modal" ><span class="glyphicon glyphicon-pencil"></span></button>';
                user_html += '<button class="btn btn-danger btn-xs user_delete_btn" ><span class="glyphicon glyphicon-trash"></span></button>';
                user_html += '</div>';
                user_html += '</td></tr>';
            }
        }
        else{
            user_html += '<tr><td colspan="5" class="text-center">No Data Available</td></tr>'
        }

        $("#user_list").html(user_html);
        
    }

    function get_user_by_id(id){
        for(i in users){
            if(users[i]["id"] == id) return users[i];
        }
        return false;
    }

    function get_user_index_by_id(id){
        for(i in users){
            if(users[i]["id"] == id) return i;
        }
        return -1;
    }

    function user_add(){
        $("#user_add_btn").click(function(e){
            try{
                var id = $("#add_id").val();
                var name = $("#add_name").val();
                var username = $("#add_user_name").val();
                var age = $("#add_age").val();
                
                if($("#user_add_form").valid()){
                    if(get_user_by_id(id)) throw "This id already exist.";

                    users.push({
                        id: id,
                        name: name,
                        username: username,
                        age: age
                    });
                    user_list();

                    $("#add_id").val("");
                    $("#add_name").val("");
                    $("#add_username").val("");
                    $("#add_age").val("");

                    $("#user_add_modal").modal("hide");
                }
            }catch(e){
                alert(e);
            }   
        })
    }

    function user_edit_modal(){
        $(document).on("click", ".user_edit_btn", function(e){
            try{
                var id = $(this).closest("tr").data("id");
                var user = get_user_by_id(id);
                console.log(user);
                if(!user) throw "User does not exist.";

                $("#edit_id").val(user.id);
                $("#edit_name").val(user.name);
                $("#edit_username").val(user.username);
                $("#edit_age").val(user.age);                
            }catch(e){
                alert(e);
            }   
        })
    }

    function user_edit(){
        $(document).on("click", "#user_edit_btn", function(e){
            try{
                var id = $("#edit_id").val();
                var name = $("#edit_name").val();
                var username = $("#edit_user_name").val();
                var age = $("#edit_age").val();
                
                if($("#user_edit_form").valid()){
                    var user = get_user_by_id(id);
                    var user_index = get_user_index_by_id(id);
                    if(!user) throw "User does not exist.";

                    users[user_index]["name"] = $("#edit_name").val();
                    users[user_index]["username"] = $("#edit_username").val();
                    users[user_index]["age"] = $("#edit_age").val();
                    user_list();

                    $("#edit_id").val("");
                    $("#edit_name").val("");
                    $("#edit_username").val("");
                    $("#edit_age").val("");

                    $("#user_edit_modal").modal("hide");
                }
            }catch(e){
                alert(e);
            }   
        })
    }
    
    function user_delete(){
        $(document).on("click",".user_delete_btn",function(){
            var is_confirm = confirm("Do you really want to delete?");

            if(is_confirm){
                var id = $(this).closest("tr").data("id");
                var user_index = get_user_index_by_id(id);
                console.log(user_index);
                if(user_index == -1) throw "User does not exist.";

                users.splice(user_index,1);
                user_list();
            }
        })
    }

    function user_search(){
        $("#search_input").keyup(function(e){
            var search_input = $(this).val();

            var tr = $("#user_list").find("tr");
            
            for(i=0; i<tr.length; i++) {
                var name = tr.eq(i).find("td")[1].innerText;
                var username = tr.eq(i).find("td")[2].innerText;
                var age = tr.eq(i).find("td")[3].innerText;

                if(name.toUpperCase().indexOf(search_input.toUpperCase()) > -1 || username.toUpperCase().indexOf(search_input.toUpperCase()) > -1 || age.toUpperCase().indexOf(search_input.toUpperCase()) > -1){
                    tr.eq(i).show();
                }else{
                    tr.eq(i).hide();
                }
            }
        })
    }


    function init(){
        user_list();
        user_add();
        user_edit_modal();
        user_edit();
        user_delete();
        user_search();
    }
    
    init();
})