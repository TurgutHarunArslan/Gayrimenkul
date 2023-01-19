  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { ref, onValue, set, getDatabase, query, limitToLast,update,get,child,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  import { getStorage,ref as Sref, uploadBytes,uploadBytesResumable,getDownloadURL,deleteObject,listAll   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
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
var nexbtn = document.getElementById("nsubmit");
var fileItem;
var fileName;
let AccName;
let Pass;
var filesDownloaded = [];
var z = 0;
window.addEventListener('load', function() {
  this.document.getElementsByClassName("container")[0].style.display = "none";
  const dbRef2 = ref(getDatabase());
  let Name = prompt("Hesabın Mail'ini girin!")
  let pasz = prompt("Hesabın şifresini girin")
  get(child(dbRef2,"AdminAcc")).then((snapshot) => {
    if (snapshot.exists()) {
        AccName = snapshot.val().Name
        Pass = snapshot.val().Pass
        if (AccName == Name && Pass == pasz) {
          dataForEstate()
          this.document.getElementsByClassName("container")[0].style.display = "flex";
        }else{
          this.location.reload()
        }
        }});
})
// document.getElementById('nsubmit2').style.display = "none";
document.getElementById('htxt2').style.display = "none";
// document.getElementById('nsubmit3').style.display = "none";
document.getElementById('htxt3').style.display = "none";
// document.getElementById('nsubmit5').style.display = "none";
document.getElementById('htxt5').style.display = "none";
document.getElementById('nsubmit4').style.display = "none";
document.getElementById('nsubmit1').style.display = "none";
document.getElementById('himg').style.display = "none";
document.getElementById('himgl').style.display = "none";
document.getElementById('htxt6').style.display = "none";
document.getElementById('htxt6l').style.display = "none";
document.getElementById('htxt7').style.display = "none";
document.getElementById('htxt7l').style.display = "none";
document.getElementById('htxt8').style.display = "none";
document.getElementById('htxt8l').style.display = "none";
function writeUserData(name) {
  set(ref(db, '/' + name), {
    isim: name
  });
}
function uploadImage(file,no){
  const storageRef = Sref(storage, document.getElementById("htxt").value + "/" + no );

  // Upload the file and metadata
  const uploadTask = uploadBytesResumable(storageRef, file).then(
    () =>{
      getDownloadURL(storageRef).then(function(url){
        console.log(url);
        filesDownloaded.push(url);
        if(imagesUploaded()){
          document.getElementById("himgl").innerHTML = "Bütün Resimler Yüklendi";
          update(ref(db, '/' + document.getElementById('htxt').value), {
            links:filesDownloaded
          });
        }})
    }
  );}
      
      
function val(){
  if (this.value == "Konut"){
    document.getElementById('htxt8').style.display = "block";
    document.getElementById('htxt8l').style.display = "block";
  }else{
    document.getElementById('htxt8').style.display = "none";
    document.getElementById('htxt8l').style.display = "none";
  }
}
document.getElementById('htxt7').addEventListener('change',val)
function uploadAllImages(zg){
  for(let i = 0; i < zg.files.length; i++){
    document.getElementById("himgl").innerHTML = "Resimler Yükleniyor";
    uploadImage(zg.files[i],i)
  }
}
function imagesUploaded(){
  return document.getElementById('himg').files.length == filesDownloaded.length;
}
nexbtn.onclick = function(){
    if(document.getElementById("htxt").value.length > 0){
      writeUserData(document.getElementById('htxt').value);
      document.getElementById('nsubmit').style.display = "none";
      document.getElementById('htxt').style.display = "none";
      document.getElementById('nsubmit1').style.display = "block";
      document.getElementById('htxt2').style.display = "block";
      document.getElementById('htxt3').style.display = "block";
      document.getElementById('htxt5').style.display = "block";
      document.getElementById('nsubmit4').style.display = "block";
      document.getElementById('nsubmit1').style.display = "block";
      document.getElementById('himgl').style.display = "block";
      document.getElementById('htxt6').style.display = "block";
      document.getElementById('htxt6l').style.display = "block";
      document.getElementById('htxt7').style.display = "block";
      document.getElementById('htxt7l').style.display = "block";
      document.getElementById('htxt8').style.display = "block";
      document.getElementById('htxt8l').style.display = "block";
    }
}
document.getElementById('nsubmit1').onclick = function(){
  var m2 = document.getElementById('htxt2').value
  var fiyat = document.getElementById('htxt5').value;
  var durum = document.getElementById('htxt6').options[ document.getElementById('htxt6').selectedIndex].value;
  var type = document.getElementById('htxt7').options[ document.getElementById('htxt7').selectedIndex].value;
  var Oda = document.getElementById('htxt8').options[ document.getElementById('htxt8').selectedIndex].value;
  var adres = document.getElementById('htxt3').value
  if(type == 'Konut'){  update(ref(db, '/' + document.getElementById('htxt').value), {
    m2 : m2,
    fiyat : fiyat,
    adres:adres,
    durum:durum,
    type:type,
    Oda:Oda
  });
}else{update(ref(db, '/' + document.getElementById('htxt').value), {
  m2 : m2,
  fiyat : fiyat,
  adres:adres,
  durum:durum,
  type:type,
});}

  window.alert("İlan oluşturulmuştur")
}
// document.getElementById('nsubmit5').onclick = function(){
//   var fiyat = document.getElementById('htxt4').value;
//   document.getElementById('nsubmit5').style.display = "none";
//   document.getElementById('htxt4').style.display = "none";
//   document.getElementById('nsubmit6').style.display = "block";
//   document.getElementById('htxt6').style.display = "block";
//   update(ref(db, '/' + document.getElementById('htxt').value), {
//     fiyat : fiyat
//   });
// }
// document.getElementById('nsubmit6').onclick = function(){
//   var durum = document.getElementById('htxt6').options[ document.getElementById('htxt5').selectedIndex].text;
//   document.getElementById('nsubmit6').style.display = "none";
//   document.getElementById('htxt6').style.display = "none";
//   document.getElementById('nsubmit4').style.display = "block";
//   document.getElementById('himg').style.display = "block";
//   update(ref(db, '/' + document.getElementById('htxt').value), {
//     fiyat : fiyat
//   });
// }
// document.getElementById('nsubmit3').onclick = function(){
//   var adres = document.getElementById('htxt3').value
//   document.getElementById('nsubmit3').style.display = "none";
//   document.getElementById('htxt3').style.display = "none";
//   document.getElementById('nsubmit5').style.display = "block";
//   document.getElementById('htxt3').style.display = "block";
//   update(ref(db, '/' + document.getElementById('htxt').value), {
//     adres : adres
//   });
// }
document.getElementById('nsubmit4').onclick = function(){
  var izm = document.getElementById("himg");
  uploadAllImages(izm);
  imagesUploaded();
}

function CreateEstate(adres,durum,fiyat,name,m2,FirstLink){
  // const div1 = document.createElement("div");
  // div1.classList.add("row", "g-3")
  // maindiv.appendChild(div1)
  const div2 = document.createElement("div");
  div2.classList.add("col-12", "col-md-6", "col-lg-4")
  document.getElementById("row1").appendChild(div2);
  const div3 = document.createElement("div");
  div3.classList.add("card");
  div2.appendChild(div3);
  const img = document.createElement("img");
  img.src = FirstLink;
  img.classList.add("card-img-top");
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
  p1.innerHTML = "M2: "+ m2;
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
  a.innerHTML = "İlani Sil";
  a.classList.add("btn","btn-danger");
  a.addEventListener("click", onPressed);
}
function onPressed(){
  var parent = event.target.parentNode;
  console.log(parent.title)
  var deleted = parent.title;
  const DeleteRef = Sref(storage, deleted);
  const deleteDataRef = ref(db,deleted);
  remove(deleteDataRef);
  listAll(DeleteRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      deleteObject(itemRef)
    });
    window.alert("İlan Silindi!")
    setTimeout(() => {
      location.reload()
    }, 500);
  })

}
function dataForEstate(){
  const dbRef2 = ref(getDatabase());
  get(child(dbRef2,"/")).then((snapshot) => {
    if (snapshot.exists()) {
          var dataz = snapshot.val()
          let dl = Object.keys(dataz).length
          // console.log(dl,"   ",Object.values(dataz)[0])
          for (let i = 0; i <= dl; i++) {
             let datah = Object.values(dataz)[i]
              var name = datah.isim
              var links = datah.links;
              var adres = datah.adres;
              var durum = datah.durum;
              var fiyat = datah.fiyat;
              var m2 = datah.m2;
              if (links !== undefined){
                CreateEstate(adres,durum,fiyat,name,m2,links[0])  
              }
                
          }
        }});
      }
// 