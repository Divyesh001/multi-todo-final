Application.addModule('list',function(context){
  var todoser;
  var mod;
  var list;

  // function getCorrespondingli(element) {
  //
  // 		var matcher =  element.webkitMatchesSelector || element.mozMatchesSelector
  // 		while (element) {
  // 			if (matcher.bind(element)('li')) {
  // 				return element;
  // 			} else {
  // 				element = element.parentNode;
  // 			}
  // 		}
  // 		return false;
  // 	}

  return {

    messages:['taskadded','filterchanged','taskremoved'],

    init :function(){
      todoser=context.getService('todoservice');
      mod= context.getElement();
      list=mod.querySelector('.taskslist');
      if(!todoser.isEmpty()){
        this.render();
      }

    },
    destroy : function(){
      todoser=null;
      mod=null;
      list=null;
    },

    onmessage: function(name,data){
      if(name === "taskadded" || name==="taskremoved" || name==='filterchanged'){

        this.render();
        list.scrollTop = list.scrollHeight;
      }
    },

    createItem:function(Item){
      id=Item.id;
      title=Item.title;
      complete=Item.complete;

      var item = mod.querySelector('.todo-template li').cloneNode(true);
      item.querySelector('label').textContent=title;
      item.setAttribute('task-id',id);
      if(complete){
        item.querySelector('label').classList.add('completeTodo');
        item.querySelector('input[type="checkbox"]').checked = true;
        //console.log("hello");
      }
      return item;
    },

    clearList: function() {
       var list=mod.querySelector('.taskslist');
			while (list.hasChildNodes()) {
				list.removeChild(list.lastChild);
			}
		},

    render :function(){

      this.clearList();
      var cid=mod.parentNode.getAttribute('id');
      var tasklist= todoser.getlist(cid);
        if(tasklist.length >0){
        for (var i = 0; i < tasklist.length; i++) {
          list.appendChild(this.createItem(tasklist[i]));
        }
      }
    },

    onchange: function(event,element,elementType){
      if(elementType==='complete-btn'){
        var taskCheck=element.parentNode.parentNode.parentNode;
        var id=taskCheck.getAttribute("task-id");
        var cid=mod.parentNode.getAttribute('id');
        if(element.checked){
          todoser.markComplete(id,cid);
        }
        else{
          todoser.markIncomplete(id,cid);
        }
        this.render();
      }
    },

    onclick: function(event, element, elementType) {

			if (elementType === 'delete-btn') {
				var taskDelete= element.parentNode.parentNode;
        var liId = taskDelete.getAttribute("task-id");
        var cid=mod.parentNode.getAttribute('id');

				mod.querySelector('.taskslist').removeChild(taskDelete);
				todoser.remove(liId,cid);

				;

			}

		}

  }
});
