Application.addModule('filtertodo',function(context){
  var todoser;

  var mod;
  return {
    init :function(){
      todoser=context.getService('todoservice');
      mod= context.getElement();
      //if(!todoser.isEmpty()){
        var cid=mod.parentNode.getAttribute('id');
        console.log(cid);

       var filter=todoser.getFilter(cid);
        this.colorFilter(filter);
          this.decolorOtherfilter(filter);
      }
    ,

    destroy :function(){
      todoser=null;
    },

    onclick:function(event,element,elementType){
        var cid=mod.parentNode.getAttribute('id');
      todoser.applyFilter(elementType,cid);
      this.colorFilter(elementType);

      this.decolorOtherfilter(elementType);

      context.broadcast('filterchanged');
    },

    colorFilter:function(filter){
      var filterButton = mod.querySelector('.'+filter);
      filterButton.classList.remove('unselectedFilter');
      filterButton.classList.add('selectedFilter');

    },

    decolorFilter:function(filter){
      var filterButton = mod.querySelector('.'+filter);
      filterButton.classList.remove('selectedFilter');
      filterButton.classList.add('unselectedFilter');

    },

    decolorOtherfilter: function(elementType){

      if(elementType==='all'){
        this.decolorFilter('complete');
        this.decolorFilter('incomplete');
      }
      else if(elementType==='complete'){
        this.decolorFilter('all');
        this.decolorFilter('incomplete');
      }
      else if(elementType==='incomplete'){
        this.decolorFilter('complete');
        this.decolorFilter('all');
      }

    }



  }
});
