Application.addModule('topnav',function(context){

   var cid;


   return{
     init:function(){
       if(!sessionStorage.getItem('cid')){
         cid=1;
         sessionStorage.setItem('cid',cid);
       }
       else{
         cid=parseInt(sessionStorage.getItem('cid'));
       }
     },

     destroy:function(){
       cid=null;
     },

     onclick:function(event,element,elementType){
       var k=cid;
       cid=cid+1;
       sessionStorage.setItem('cid',cid);
        if(elementType==="add_new_btn"){
          context.broadcast('newtodoadded',{tid:k});

        }
     }
   }
});
