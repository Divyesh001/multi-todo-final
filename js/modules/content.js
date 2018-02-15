Application.addModule('content',function(context){
  var mod;
  var todoser;
  var colorClassArray=['one','two','three','four','five','six'];
  var cardhtml=`<div id="x" class="card">

      <header class="header" data-module="header" >

        <h2 class="heading">To-Do</h2>
        <!-- <div class="outerdiv">
          <div class="divinput" contenteditable="true" data-type="input-task">What to do ?</div>
          </div> -->
        <input  type="text" data-type="input-task" placeholder="What to do ?" size="50" >
      </header>

      <div class="filter" data-module="filtertodo">
        <div class="all" data-type="all">All</div>
      <div class="complete" data-type="complete">Complete</div>
        <div class="incomplete" data-type="incomplete">Incomplete</div>
      </div>

      <section  data-module="list">

        <ul class="taskslist" >
        </ul>

        <ul class="todo-template" style="display: none">
          <li>
            <div class="tasks" >
              <div>
                <input type="checkbox" data-type="complete-btn">
              </div>
                <label class= "label" data-type="task"></label>
                <div class="deletebtn" data-type="delete-btn">
                  <i class="material-icons" style="font-size:18px">delete_forever</i>
                </div>
            </div>
          </li>
        </ul>

      </section>
  </div> `
  ;
  return {
    messages:['newtodoadded'],

    init:function(){
      todoser=context.getService('todoservice');
        mod= context.getElement();
        if(sessionStorage.getItem('content')){
          var htmlObject=JSON.parse(sessionStorage.getItem('content'));
          var html=htmlObject.html;
          mod.insertAdjacentHTML('beforeend',html);
          Application.startAll(document);
        }

    },

    destroy:function(){
      mod=null;
    },

    onmessage:function(name,data){
        if(name='newtodoadded'){
          var cardId=data.tid;
          todoser.addEmptyList(cardId);
          mod.insertAdjacentHTML('beforeend',cardhtml);
          var card=mod.querySelector("#x");
          card.setAttribute('id',cardId);
          var index=cardId%6;
          this.changeColor(index,cardId);
          var htmlObject={};
          htmlObject.html=mod.innerHTML;
          sessionStorage.setItem('content',JSON.stringify(htmlObject));
          Application.startAll(document);
        }
    },

    changeColor:function(index,cardId){
      var card=document.getElementById(cardId);
      card.classList.add(colorClassArray[index]);
      card.querySelector('.heading').classList.add(colorClassArray[index]);
      card.querySelector('.filter').classList.add(colorClassArray[index]);
      card.querySelector('.all').classList.add(colorClassArray[index]);
      card.querySelector('.complete').classList.add(colorClassArray[index]);
      card.querySelector('.incomplete').classList.add(colorClassArray[index]);
      card.querySelector('.deletebtn').classList.add(colorClassArray[index]);
    }

  }
});
