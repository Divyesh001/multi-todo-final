
Application.addModule('header',function(context){
  var todoser;
  var mod;
  return {

    init: function(){
      todoser = context.getService('todoservice');
      mod=context.getElement();
    },
    destroy: function(){
      todoser=null;
    },

    onkeydown : function(event,element, elementType){


      if(elementType==="input-task" && event.keyCode === 13){

          var task= element.value;
          var cid=mod.parentNode.getAttribute('id');
          if(task.length>0){

            todoser.add(task,cid);
          //  console.log("hello "+ taskid);
            context.broadcast('taskadded',{
              });
          }

          element.value='';
          event.preventDefault();
          event.stopPropagation();
      }
    },



}
});
