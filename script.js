$(document).ready(()=>{
    $("input[type=checkbox]").removeAttr("checked");
    $(".projects").tabs();
    $(".btnAddTask").button().click(function(){
        $(".task-dialog").dialog({width : 400, resizable : false, modal : true,
            buttons:{
                "Add New Task" :function() {
                    $(".projects").tabs("refresh");
                    var activeTab = $(".projects").tabs("option","active");
                    var title = $(".tabs > li:nth-child("+(activeTab+1)+")>a").attr("href");
                    $(".projects "+title).append("<li><input type='checkbox'>"+$(".new-task").val()+"</li>");
                    $(".new-task").val(""); 
                    $(this).dialog("close");
                    console.log(title);
                },
                "Clear" :function() {
                    $(".new-task").val("");
                    $(this).dialog("close");
                }
            }
        });
    });
    $("ul").sortable({axis : "x", containment : ".projects"});
    $("ol").sortable({axis : "y", containment : ".projects"});
    $(".projects").on("click","input[type=checkbox]",function(){
        $(this).closest("li").slideUp(function(){
            $(this).remove();
        });
    })
    $(".projects").on("click", "span.ui-icon-close",function(){
        var index = $(this).closest("li").index();
        var id = $(".tabs li:eq("+index+") a").attr("href");
        $(".tabs li:eq("+index+")").remove();
        $(id).remove();
        $(".projects").tabs("refresh");
    })
    $(".btn").button().click(function(){
        $(".project-dialog").dialog({width : 400, resizable : false, modal : true,
             buttons : {
            "Add New Project" : function(){
                var projectName = $(".new-project").val();
                var replaceName = projectName.split(" ").join("_");
                $("<li><a href='#"+replaceName+"'>"+projectName+"</a><span class='ui-icon ui-icon-close'></span></li>").appendTo(".tabs");
                $(".projects").tabs("refresh");
                var tabcount = $(".projects .ui-tabs-nav li").length;
                $(".projects").tabs("option","active", tabcount-1); 
                $(".new-project").val("");
                $(this).dialog("close");
                $("<ol id='"+replaceName+"'></ol>").appendTo(".projects").sortable(); 
            },
            "Cancel" : function(){
                $(".new-project").val("");
                $(this).dialog("close");
            }
        }})
    });
})