/// managing all the interaction with todo task object here

Application.addService('todoservice',function(){
  var task;
  var taskid;
  var filter;
  var cid;
  var main;
  if(!sessionStorage.getItem('main')) {
    main={};
  } else {
    main=JSON.parse(sessionStorage.getItem('main'));
  }


return{
  isEmpty:function(){
    return Object.keys(main).length === 0;
  },

  addEmptyList:function(cid){
    main[cid]={};
    main[cid].taskid=0;
    main[cid].task={};
    main[cid].filter='all';
    sessionStorage.setItem('main',JSON.stringify(main));
    console.log(main);
  },
  add: function(title,cid){
    var taskid=main[cid].taskid;
    var index=taskid;
  //  console.log("sjhdjshdjs "+ index);
    main[cid].task[index]={
      id:index,
      title:title,
      complete: false
    };
    main[cid].taskid++;
    sessionStorage.setItem('main',JSON.stringify(main));
    console.log(main);
    return index;
  },

  remove : function(id,cid){
    if(main[cid].task[id]){
      delete main[cid].task[id];
      sessionStorage.setItem('main',JSON.stringify(main));
    }
  },



  getlist: function(cid){
    var tasklist=[];
    Object.keys(main[cid].task).forEach(function(id){
      if(main[cid].filter==="all"){
        tasklist.push(main[cid].task[id]);
      }
      else if(main[cid].filter==="complete" && main[cid].task[id].complete){
        tasklist.push(main[cid].task[id]);
      }
      else if(main[cid].filter==="incomplete" && !main[cid].task[id].complete){
        tasklist.push(main[cid].task[id]);
      }
    });
    return tasklist;
  },

  markComplete: function(id,cid){
    if(main[cid].task[id]){
      main[cid].task[id].complete=true;
      sessionStorage.setItem('main',JSON.stringify(main));
    }
  },

  markIncomplete: function(id,cid){
    if(main[cid].task[id]){
      main[cid].task[id].complete=false;
      sessionStorage.setItem('main',JSON.stringify(main));
    }
  },

  applyFilter:function(filterType,cid){
    main[cid].filter=filterType;
    sessionStorage.setItem('main',JSON.stringify(main));
    console.log(main);
  },

   getFilter:function(cid){
     return main[cid].filter;
   }

}

});
