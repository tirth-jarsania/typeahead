class MyTypeAhead {
    constructor() {
        this.dataSource = [];
        this.domElement = undefined;
    }
    mount = (ele) => this.domElement = ele;
    addSingleData = (data) => this.dataSource.push(data);
    addMultipleData = (...data) => {
      for(let i=0 ; i<data.length ; i++){
          this.dataSource.push(data[i]);
      }
    };
    getData = () =>{ return this.dataSource;};
    getDomElement = () => { return this.domElement;};
    destroyData = () => this.dataSource.clear();
};

const myTypeAheadInstance = new MyTypeAhead();
myTypeAheadInstance.mount(document.getElementById("myInput"));
myTypeAheadInstance.addSingleData(
  "India"
);
myTypeAheadInstance.addSingleData(
  "Pakistan"
);
myTypeAheadInstance.addSingleData(
  "Indonesia"
);

myTypeAheadInstance.addMultipleData(["Australia" , "Russia" , "China" , "Japan" , 
"Cuba" , "Canada" , "Afghanistan" , "Bangladesh" , "Srilanka" , "Nepal",
"Bhutan" , "Mongolia" , "Sweden" , "Switzarland" , "Netherland" , "Andaman-Nokabar"]);

function autocomplete(element , arr ){
  let cur; // dropdown list index
  // firstly implements basic functionality then implements addEventListener
  function closedDropDown(y){
    const x = document.getElementsByClassName("autocomplete-items");
    for(let i=0 ; i<x.length; i++ ){
      if(x[i] != y) {x[i].parentNode.removeChild(x[i]);}
    }
  };
  function addActive(x){
    if( !x ) return false;
    removeActive(x);
    if(cur >= x.length) cur = 0;
    if(cur < 0) cur = (x.length-1);
    x[cur].classList.add("autocomplete-active");
  };
  function removeActive(x){
    for(let i=0 ; i<x.length ; i++ ){
      x[i].classList.remove("autocomplete-active");
    }
  };
  element.addEventListener("input",function(e){
    cur = -1;
    let val = this.value.toLowerCase();
    if (!val) { return false;}
    let a , b ;
    closedDropDown();

    // learn how to create element in javascript;
    a = document.createElement("DIV");
    a.setAttribute("id" , this.id + "autocomplete-list");
    a.setAttribute("class" , "autocomplete-items" );
    this.parentNode.appendChild(a);
    for(let i = 0 ; i<arr.length ; i++ ){
      if( arr[i].substr(0,val.length).toLowerCase() == val ){
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function(e){
          element.value = this.getElementsByTagName("input")[0].value;
          closedDropDown();
        });
        a.appendChild(b);
      }
    }
  });
  element.addEventListener("keydown", function(e){
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      cur++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      cur--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (cur > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[cur].click();
      }
    }
  } );
  document.addEventListener("click", function (e) {
    closedDropDown(e.target);
});
}
autocomplete(myTypeAheadInstance.getDomElement() , myTypeAheadInstance.getData());

let x = myTypeAheadInstance.getData();
