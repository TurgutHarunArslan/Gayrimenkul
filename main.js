  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { ref, onValue, set, getDatabase, query, limitToLast,update,get,child} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  import { getStorage,ref as Sref, uploadBytes,uploadBytesResumable,listAll,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
  
  $(document).ready(function(){
    $('.slider').slick({
        infinite:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        
        prevArrow:"<a class='slick-prev pull-left btn text-white' style='z-index:1;'><i class='fa fa-angle-left' aria-hidden='true'></i>Geri</a>",
        nextArrow:"<a class='slick-next pull-right btn text-white' style='z-index:1;><i class='fa fa-angle-right' aria-hidden='true'></i>İleri</a>"
    });
  });
  $('.left').click(function(){
    $('.slider').slick('slickPrev');
  })
  
  $('.right').click(function(){
    $('.slider').slick('slickNext');
  })
  // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    $( ".pull-left" ).after( $( "pull-right" ) );
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
      apiKey: "AIzaSyBaJ2yq9z2LN7XKiqsdb0JoX5Q8P2pbaQ8",
      authDomain: "emlak-9d685.firebaseapp.com",
      projectId: "emlak-9d685",
      storageBucket: "emlak-9d685.appspot.com",
      messagingSenderId: "945175018661",
      appId: "1:945175018661:web:2a76f51b60f7e0be2b614c",
      measurementId: "G-78Q6CN36Q7"
    };
  
    // Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const db = getDatabase();
document.getElementById("page").style.display="none";
let Created;
let filter;
let zh;
var ditem = document.getElementsByClassName('dropdown-item');
var zitems = document.getElementsByClassName('Selectors2');
let currentPage;
var maindiv = document.getElementById('row1')
// create element
window.onresize = function() {
  addMargin()
}
zitems = [].slice.call(zitems)
ditem = [].slice.call(ditem);
zitems.forEach(item => {
  item.addEventListener('click', function handleClick(event) {
    filter = event.target.id;
    var zitem = document.getElementsByClassName('ilans');
    zitem = [].slice.call(zitem);
    zitem.forEach(zit =>{
      zit.remove()
    })
    dataForEstate();
  });
});
ditem.forEach(item => {
  item.addEventListener('click', function handleClick(event) {
    filter = event.target.id;
    var zitem = document.getElementsByClassName('ilans');
    zitem = [].slice.call(zitem);
    zitem.forEach(zit =>{
      zit.remove()
    })
    dataForEstate();
  });
});

function onPressed(){
  var parent = event.target.parentNode;
  console.log(parent.title)
  var currentPage = parent.title;
  HideMain()
  newContent(currentPage)
  addMargin()
}
function Contact(){
  console.log("ez")
  document.getElementById("maindiv").style.display = "none";
  document.getElementById("Anasayfa").style.display = "none";
  document.getElementById("page").style.display ="none";
  document.getElementById("ContactPage").style.display = "block";
  document.getElementsByTagName("footer")[0].style.display = "none";
}
function onGeri(){
  HideMain();
}
function Sayfa(){
  location.reload();
}
document.getElementsByClassName('navbar-toggler')[0].addEventListener('click',addMargin)
document.getElementsByClassName('dropdown-toggle')[0].addEventListener('click',addMargin)
document.getElementsByClassName('dropdown-toggle')[1].addEventListener('click',addMargin)

function addMargin(){
  let tg = document.getElementsByClassName("navbar-toggler")[0].getAttribute('aria-Expanded');
  let tz = document.getElementsByClassName("dropdown-menu")[0].getAttribute('data-bs-popper');
  let tz1 = document.getElementsByClassName("dropdown-menu")[1].getAttribute('data-bs-popper');
  const vw = $( window ).width()
  if (vw < 700  && tz == "static"){
    console.log("1")
    console.log(tg)
    document.getElementsByClassName("slider")[0].style.marginTop = '110%';
    document.getElementById("stuff").style.marginTop = "115%";
    document.getElementById('findTitle').style.marginTop = "55%";
    document.getElementsByClassName('Selectors2')[0].style.marginTop = "60%";
    document.getElementsByClassName('Selectors2')[1].style.marginTop = "60%";
    }else if(vw < 700 && tz1 == "static"){
      console.log("1.1")
      console.log(tg)
      document.getElementsByClassName("slider")[0].style.marginTop = '110%';
      document.getElementById("stuff").style.marginTop = "115%";
      document.getElementById('findTitle').style.marginTop = "55%";
      document.getElementsByClassName('Selectors2')[0].style.marginTop = "60%";
      document.getElementsByClassName('Selectors2')[1].style.marginTop = "60%";
    }else if(vw < 700 && tg == 'true'){
      console.log("2")
      document.getElementsByClassName("slider")[0].style.marginTop = '65%';
      document.getElementById("stuff").style.marginTop = "95%";
      document.getElementById('findTitle').style.marginTop = "10%";
      document.getElementsByClassName('Selectors2')[0].style.marginTop = "10%";
      document.getElementsByClassName('Selectors2')[1].style.marginTop = "10%";
    }else if(vw < 700 && tg == 'false'){
      console.log("3")
      document.getElementsByClassName("slider")[0].style.marginTop = '25%';
      document.getElementById("stuff").style.marginTop = "95%";
      document.getElementById('findTitle').style.marginTop = "0%";
      document.getElementsByClassName('Selectors2')[0].style.marginTop = "10%";
      document.getElementsByClassName('Selectors2')[1].style.marginTop = "10%";
    }
    else if( vw > 701){
      console.log("5")
      document.getElementsByClassName("slider")[0].style.marginTop = '0%';
      document.getElementById("stuff").style.marginTop = "0%";
      document.getElementById('findTitle').style.marginTop = "0%";
      document.getElementsByClassName('Selectors2')[0].style.marginTop = "0%";
      document.getElementsByClassName('Selectors2')[1].style.marginTop = "0%";
    }
  }
document.getElementById('anasayfa').addEventListener("click", Sayfa);

function CreateEstate(adres,durum,fiyat,name,m2,FirstLink){
  // const div1 = document.createElement("div");
  // div1.classList.add("row", "g-3")
  // maindiv.appendChild(div1)
  Created = true
  CheckİfCreated()
  const div2 = document.createElement("div");
  div2.classList.add("col-12", "col-md-6", "col-lg-4","ilans")
  maindiv.appendChild(div2);
  const div3 = document.createElement("div");
  div3.classList.add("card");
  div2.style.marginTop = "5%";
  div2.appendChild(div3);
  const img = document.createElement("img");
  img.src = FirstLink;
  img.classList.add("card-img-top");
  img.style = "height:16rem"
  div3.appendChild(img);
  const div4 = document.createElement("div");
  div4.classList.add("card-body");
  div4.title = name;
  div3.appendChild(div4);
  const h5 = document.createElement("h5")
  h5.classList.add("card-title");
  h5.innerHTML = name;
  div4.appendChild(h5)
  const p1 = document.createElement("p")
  p1.classList.add("card-text");
  p1.innerHTML = "m2: "+ m2;
  div4.appendChild(p1)
  const p2 = document.createElement("p")
  p2.classList.add("card-text");
  p2.innerHTML = "Adres: "+adres;
  div4.appendChild(p2)
  const p3 = document.createElement("p")
  p3.classList.add("card-text");
  p3.innerHTML = fiyat + " tl";
  div4.appendChild(p3)
  const p4 = document.createElement("p")
  p4.classList.add("card-text");
  p4.innerHTML = durum;
  div4.appendChild(p4)
  const a = document.createElement("a");
  div4.appendChild(a)
  a.innerHTML = "İlani Aç";
  a.classList.add("btn","btn-primary");
  a.addEventListener("click", onPressed);
}
function HideMain(){
  if($(".maindiv").css('display') == 'none'){
    document.getElementById("maindiv").style.display = "block";
    document.getElementById("page").style.display="none";
    document.getElementsByTagName("footer")[0].style.display = "block";
    document.getElementById("ContactPage").style.display = "none";
  }else{
    document.getElementById("maindiv").style.display = "none";
    document.getElementById("page").style.display="flex";
    document.getElementsByTagName("footer")[0].style.display = "none";
    document.getElementById("ContactPage").style.display = "none";
  }
}


document.getElementById("geri").addEventListener("click", onGeri);
document.getElementById("cont").addEventListener("click", Contact);
function newContent(page){
  const dbRef = ref(getDatabase());
  get(child(dbRef, page)).then((snapshot) => {
    if (snapshot.exists()) {
      var data = snapshot.val()
      var links = data.links;
      var adres = data.adres;
      var durum = data.durum;
      var type = data.type;
      var Oda = data.Oda;
      var fiyat = data.fiyat;
      var m2 = data.m2;
      var name = data.isim;
      document.getElementById('Fiyat2').textContent = fiyat;
      document.getElementById('Name').textContent = name;
      document.getElementById('m2_2').textContent = m2;
      document.getElementById('Durum2').textContent = durum;
      document.getElementById('Adres_2').textContent = adres;
      document.getElementById('type_2').textContent = type;
      if(type == "Konut"){
        document.getElementById("Oda").style.display = "flex";
        document.getElementById("Oda_2").style.display = "flex";
        document.getElementById('Oda_2').textContent = Oda;
      }else if(document.getElementById("Oda") !== "none"){
        document.getElementById("Oda").style.display = "none";
        document.getElementById("Oda_2").style.display = "none";
        addMargin()
      }
      $('.slider').slick('removeSlide', null, null, true);
      links.forEach(link => {
        // let div = document.createElement("div")
        // div.classList.add("container","slider","d-flex","jel")
        // document.getElementById("page").appendChild(div)
        $('.slider').slick('slickAdd',' <div><img src='+ '"' +link+'"' + ' class="card-img-top zgz float-left" alt="ev resim" ></div>')
      });
    }
  }).catch((error) => {
    console.error(error);
});
}
function dataForEstate(){
  document.getElementById('Anasayfa').style.display = 'none';
  document.getElementById('page').style.display = 'none';
  document.getElementById("ContactPage").style.display = "none";
  Created = false;
  CheckİfCreated()
  const dbRef2 = ref(getDatabase());
  get(child(dbRef2,"/")).then((snapshot) => {
    if (snapshot.exists()) {
          var dataz = snapshot.val()
          let dl = Object.keys(dataz).length
          // console.log(dl,"   ",Object.values(dataz)[0])
          for (let i = 0; i <= dl; i++) {
            // Firefox doesnt support this type of getting data
              let datah = Object.values(dataz)[i]

              var name = datah.isim;
              var links = datah.links;
              var adres = datah.adres;
              var durum = datah.durum;
              var fiyat = datah.fiyat;
              var m2 = datah.m2;
              var type = datah.type;
              var have = document.querySelector(`[title="${name}"]`);
              if(have == null){
                if (filter == "Kkonut" && durum == "Kira" && type == "Konut"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if(filter == "Skonut" && durum == "Satılık"&& type == "Konut"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if (filter == "Karsa" && durum == "Kira" && type == "Arsa"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if(filter == "Sarsa" && durum == "Satılık"&& type == "Arsa"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if (filter == "Kwork" && durum == "Kira" && type == "İşYeri"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if(filter == "Swork" && durum == "Satılık"&& type == "İşYeri"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if(filter == "Sall" && durum == "Satılık"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }else if(filter == "Kall" && durum == "Kira"){
                 CreateEstate(adres,durum,fiyat,name,m2,links[0])
               }
              }
          //  CreateEstate(adres,durum,fiyat,name,m2,links[0])
          }
        }});
      }
function CheckİfCreated(){
if (Created == false) {
  if(document.getElementsByClassName('loader')[0]){}else{
  var loader = document.createElement('div');
  document.body.appendChild(loader)
  loader.classList.add("loader")
  document.getElementById("maindiv").style.display = "none";
  document.getElementsByTagName("footer")[0].style.display = "none";
  setTimeout(() => {
    CheckİfCreated()
  }, 100);
  }

}else if(Created == true){
  document.getElementsByClassName('loader')[0].style.display = "none";
  document.getElementById("maindiv").style.display = "block";
  document.getElementsByTagName("footer")[0].style.display = "block";
  Created = false;
}

}
// dataForEstate()
// CreateEstate("fatih","satılık","3500tl","keder","45","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
// CreateEstate("fatih","satılık","3500tl","mader","45","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
// CreateEstate("fatih","satılık","3500tl","sc","45","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
// CreateEstate("fatih","satılık","3500tl","ass","45","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
// CreateEstate("fatih","satılık","3500tl","gggg","45","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
// CreateEstate("fatih","satılık","3500tl","ggggz","45","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")
