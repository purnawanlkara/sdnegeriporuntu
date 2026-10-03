
let DATA=null;

const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const placeholder=(text="Belum ada foto")=>`<div class="empty">${esc(text)}</div>`;

async function api(url,options={}){
  const method=(options.method||"GET").toUpperCase();
  let stored=localStorage.getItem("sdnegeri_poruntu_data");
  let localData=stored?JSON.parse(stored):null;
  if(url==="/api/me") return {authenticated:sessionStorage.getItem("poruntu_admin")==="1"};
  if(url==="/api/login" && method==="POST"){const b=JSON.parse(options.body||"{}"); if(b.username==="40200453"&&b.password==="40200453"){sessionStorage.setItem("poruntu_admin","1");return {ok:true};} throw new Error("Username atau password salah");}
  if(url==="/api/logout"){sessionStorage.removeItem("poruntu_admin");return {ok:true};}
  if(url==="/api/data" && method==="GET") return localData || defaultStaticData();
  if(url==="/api/data" && method==="PUT"){localData=JSON.parse(options.body);localStorage.setItem("sdnegeri_poruntu_data",JSON.stringify(localData));return localData;}
  throw new Error("Fungsi tidak tersedia pada versi HTML statis.");
}
function defaultStaticData(){return {school:{name:"SD NEGERI PORUNTU",npsn:"40200453",curriculum:"Merdeka",email:"sdnegeriporuntu@gmail.com",phone:"",facebook:"SD Negeri Poruntu",address:"Kecamatan Marawola Barat, Kabupaten Sigi",vision:"Terwujudnya Peserta Didik yang Beriman, Berkarakter, Cerdas, Mandiri, Peduli Lingkungan dan Berbudaya, serta Mampu Berkembang sesuai Potensi Diri dan Tantangan Zaman",mission:["Menyelenggarakan pembelajaran yang bermutu dan berpusat pada peserta didik dengan memperhatikan kebutuhan, kemampuan, dan kondisi lingkungan sekolah.","Menanamkan nilai keimanan, ketakwaan, akhlak mulia, dan karakter positif melalui pembiasaan dalam kehidupan sehari-hari di sekolah.","Meningkatkan kemampuan literasi, numerasi, berpikir kritis, kreativitas, dan keterampilan peserta didik sebagai dasar untuk melanjutkan pendidikan dan menghadapi perkembangan zaman.","Mengembangkan kemandirian dan sikap gotong royong agar peserta didik mampu menghadapi berbagai tantangan sesuai kondisi lingkungan tempat tinggalnya.","Mengembangkan potensi, bakat, dan minat peserta didik melalui kegiatan pembelajaran dan kegiatan pengembangan diri yang sesuai dengan kemampuan sekolah.","Menumbuhkan kepedulian terhadap lingkungan alam dan sosial serta membiasakan perilaku hidup bersih, sehat, aman, dan bertanggung jawab."],mottoTitle:"Pakagali, Pakagaya, Posikola",mottoText:"Program Sekolah Bersih, Indah, dan Nyaman Kabupaten Sigi merupakan salah satu upaya Pemerintah Kabupaten Sigi dalam menciptakan lingkungan sekolah yang sehat, bersih, tertata, hijau, dan nyaman bagi peserta didik, guru, serta seluruh warga sekolah.\n\nProgram ini mendorong setiap sekolah untuk membangun budaya hidup bersih dan peduli lingkungan melalui kegiatan kebersihan rutin, pengelolaan sampah, penghijauan, penataan halaman dan taman sekolah, serta pemeliharaan fasilitas sanitasi. Selain meningkatkan kualitas lingkungan belajar, program ini diharapkan dapat menanamkan karakter disiplin, gotong royong, tanggung jawab, dan kepedulian terhadap lingkungan sejak dini.",students:{total:56,female:26,male:30},principal:{name:"PURNAWAN L. KARA, S.Pd",nip:"198803152010011002",phone:"",email:"purnawanlkara@gmail.com",photo:""}},teachers:[],admins:[],facilities:[{name:"Gedung A — Kelas Induk",description:"3 ruang, berjumlah 6 rombel",photo:""},{name:"Gedung B — Perpustakaan/Kantor",description:"Gedung perpustakaan dan kantor sekolah",photo:""},{name:"Gedung C — Kelas Jauh",description:"3 ruang, berjumlah 6 rombel",photo:""}],spmb:{title:"Sistem Penerimaan Murid Baru",description:"Informasi penerimaan murid baru SD NEGERI PORUNTU.",contact:"sdnegeriporuntu@gmail.com",link:"",requirements:["Mengikuti ketentuan SPMB yang berlaku","Menyiapkan dokumen persyaratan calon peserta didik","Mengikuti jadwal pendaftaran resmi sekolah"],schedule:["Pendaftaran: Menyesuaikan pengumuman resmi","Verifikasi: Menyesuaikan pengumuman resmi","Pengumuman: Menyesuaikan pengumuman resmi"]},schoolPhotos:[],damages:[],news:[],extracurriculars:[{name:"Pramuka",description:"Kegiatan pembentukan karakter, disiplin, kemandirian dan kerja sama.",photos:["","","",""]},{name:"Pencak Silat",description:"Pengembangan kebugaran, disiplin, sportivitas dan budaya.",photos:["","","",""]},{name:"Program Ekstrakurikuler 3",description:"Program pengembangan bakat dan minat peserta didik.",photos:["","","",""]}],settings:{primary:"#0b5ed7",secondary:"#0ea5e9",accent:"#f5b700",background:"#f4f8ff",surface:"#ffffff",text:"#102033",muted:"#60708a",hero:"#eaf5ff",radius:18}}}
async function load(){
  DATA=await api("/api/data");
  if(!DATA.teachers || DATA.teachers.length!==18){DATA.teachers=[]; for(let i=1;i<=6;i++)DATA.teachers.push({slot:"Kelas Induk "+i,group:"Kelas Induk",role:"Guru Kelas",name:"",nip:"",photo:""}); for(let i=1;i<=6;i++)DATA.teachers.push({slot:"Kelas Jauh "+i,group:"Kelas Jauh",role:"Guru Kelas",name:"",nip:"",photo:""}); for(let i=1;i<=2;i++)DATA.teachers.push({slot:"Guru PJOK "+i,group:"Mata Pelajaran",role:"PJOK",name:"",nip:"",photo:""}); for(let i=1;i<=2;i++)DATA.teachers.push({slot:"Guru Pendidikan Agama Kristen "+i,group:"Mata Pelajaran",role:"Pendidikan Agama Kristen",name:"",nip:"",photo:""}); for(let i=1;i<=2;i++)DATA.teachers.push({slot:"Guru Mulok "+i,group:"Mata Pelajaran",role:"Mulok",name:"",nip:"",photo:""});}
  if(!DATA.admins || DATA.admins.length!==3){DATA.admins=[{name:"",nip:"",role:"Tenaga Administrasi",photo:""},{name:"",nip:"",role:"Tenaga Administrasi",photo:""},{name:"",nip:"",role:"Tenaga Administrasi",photo:""}];}
  localStorage.setItem("sdnegeri_poruntu_data",JSON.stringify(DATA)); applyTheme();
  if(new URLSearchParams(location.search).get("view")==="public"){ $("loginScreen").classList.add("hidden"); $("app").classList.remove("hidden"); renderPublic(); showPanel("preview"); return; }
  const me=await api("/api/me");
  if(!me.authenticated){$("loginScreen").classList.remove("hidden");return;}
  $("loginScreen").classList.add("hidden");$("app").classList.remove("hidden"); renderAll();
}
function showPublicStatic(){DATA=JSON.parse(localStorage.getItem("sdnegeri_poruntu_data")||"null")||defaultStaticData();applyTheme();$("loginScreen").classList.add("hidden");$("app").classList.remove("hidden");renderPublic();showPanel("preview");}
function showPanel(id){
  document.querySelectorAll(".panel").forEach(x=>x.classList.toggle("active",x.id===id));
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.target===id));
  if(id==="preview") renderPublic();
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>showPanel(b.dataset.target)));
$("publicBtn").onclick=()=>showPanel("preview");
$("logoutBtn").onclick=async()=>{await api("/api/logout",{method:"POST"});location.reload()};
$("loginForm").addEventListener("submit",async e=>{
  e.preventDefault();$("loginError").textContent="";
  try{await api("/api/login",{method:"POST",body:JSON.stringify({username:$("username").value,password:$("password").value})});load()}
  catch(err){$("loginError").textContent=err.message}
});

async function save(){await api("/api/data",{method:"PUT",body:JSON.stringify(DATA)});toast("Perubahan tersimpan.");renderAll()}
function toast(msg){let t=document.createElement("div");t.textContent=msg;t.style.cssText="position:fixed;right:20px;bottom:20px;background:#122033;color:#fff;padding:12px 16px;border-radius:12px;z-index:99;font-weight:800;box-shadow:0 12px 30px rgba(0,0,0,.2)";document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
function applyTheme(){
 const s=DATA.settings||{}; const root=document.documentElement;
 Object.entries({primary:s.primary,secondary:s.secondary,accent:s.accent,bg:s.background,surface:s.surface,text:s.text,muted:s.muted,hero:s.hero}).forEach(([k,v])=>{if(v)root.style.setProperty("--"+k,v)});
 if(s.radius)root.style.setProperty("--radius",s.radius+"px");
}
function renderAll(){renderDashboard();renderSchool();renderPrincipal();renderTeachers();renderAdmins();renderFacilities();renderSPMB();renderPhotos();renderDamages();renderNews();renderExtras();renderAppearance();renderPublic()}
function renderDashboard(){
 const d=DATA; $("stats").innerHTML=[
  ["56","Siswa (default)"],[d.teachers.length,"Slot Guru"],[d.admins.length,"Tenaga Administrasi"],[d.news.length,"Berita"]
 ].map(x=>`<div class="stat"><div class="num">${x[0]}</div><div class="label">${x[1]}</div></div>`).join("");
}
function renderSchool(){
 const s=DATA.school;
 [["schoolName",s.name],["npsn",s.npsn],["curriculum",s.curriculum],["schoolEmail",s.email],["schoolPhone",s.phone],["facebook",s.facebook],["address",s.address],["vision",s.vision],["mottoTitle",s.mottoTitle],["mottoText",s.mottoText]].forEach(([id,v])=>$(id).value=v||"");
 $("studentTotal").value=s.students.total;$("studentFemale").value=s.students.female;$("studentMale").value=s.students.male;
 $("missionEditor").innerHTML=s.mission.map((m,i)=>`<div class="inline-row"><input value="${esc(m)}" data-mission="${i}"><button class="btn danger-outline" onclick="removeMission(${i})">Hapus</button></div>`).join("");
}
function saveSchool(){
 const s=DATA.school;
 s.name=$("schoolName").value;s.npsn=$("npsn").value;s.curriculum=$("curriculum").value;s.email=$("schoolEmail").value;s.phone=$("schoolPhone").value;s.facebook=$("facebook").value;s.address=$("address").value;s.vision=$("vision").value;s.mottoTitle=$("mottoTitle").value;s.mottoText=$("mottoText").value;
 s.mission=[...document.querySelectorAll("[data-mission]")].map(x=>x.value).filter(Boolean);
 s.students={total:+$("studentTotal").value||0,female:+$("studentFemale").value||0,male:+$("studentMale").value||0};save()
}
function addMission(){DATA.school.mission.push("Misi baru dapat diedit.");renderSchool()}
function removeMission(i){DATA.school.mission.splice(i,1);renderSchool()}
function renderPrincipal(){
 const p=DATA.school.principal;
 [["principalName",p.name],["principalNip",p.nip],["principalPhone",p.phone],["principalEmail",p.email]].forEach(([id,v])=>$(id).value=v||"");
 $("principalPreview").innerHTML=p.photo?`<img src="${p.photo}" alt="Foto Kepala Sekolah">`:"Belum ada foto";
}
async function uploadImage(file){return await new Promise((resolve,reject)=>{if(!file)return reject(new Error("Pilih file"));const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error("Upload gagal"));r.readAsDataURL(file);})}
async function uploadPrincipalPhoto(){
 const f=$("principalPhoto").files[0];if(!f)return toast("Pilih foto terlebih dahulu.");
 try{DATA.school.principal.photo=await uploadImage(f);await save()}catch(e){alert(e.message)}
}
function savePrincipal(){const p=DATA.school.principal;p.name=$("principalName").value;p.nip=$("principalNip").value;p.phone=$("principalPhone").value;p.email=$("principalEmail").value;save()}
function renderTeachers(){
 $("teacherGrid").innerHTML=DATA.teachers.map((t,i)=>entityTeacher(t,i)).join("");
}
function entityTeacher(t,i){
 return `<div class="entity-card"><div class="photo-box">${t.photo?`<img src="${t.photo}" alt="">`:"Foto guru"}</div><h3>${esc(t.slot)}</h3><small>${esc(t.group)} · ${esc(t.role)}</small><div class="form-grid" style="margin-top:12px"><label>Nama<input value="${esc(t.name)}" onchange="DATA.teachers[${i}].name=this.value"></label><label>NIP<input value="${esc(t.nip)}" onchange="DATA.teachers[${i}].nip=this.value"></label></div><input type="file" accept="image/*" onchange="replaceTeacherPhoto(${i},this)"><div class="actions"><button class="btn primary" onclick="saveTeacher(${i})">Simpan</button></div></div>`
}
async function replaceTeacherPhoto(i,input){if(!input.files[0])return;try{DATA.teachers[i].photo=await uploadImage(input.files[0]);renderTeachers();await save()}catch(e){alert(e.message)}}
function saveTeacher(i){save()}
function renderAdmins(){
 $("adminGrid").innerHTML=DATA.admins.map((a,i)=>`<div class="entity-card"><div class="photo-box">${a.photo?`<img src="${a.photo}" alt="">`:"Foto tenaga administrasi"}</div><h3>Tenaga Administrasi ${i+1}</h3><div class="form-grid"><label>Nama<input value="${esc(a.name)}" onchange="DATA.admins[${i}].name=this.value"></label><label>NIP<input value="${esc(a.nip)}" onchange="DATA.admins[${i}].nip=this.value"></label><label class="span-2">Jabatan<input value="${esc(a.role)}" onchange="DATA.admins[${i}].role=this.value"></label></div><input type="file" accept="image/*" onchange="replaceAdminPhoto(${i},this)"><div class="actions"><button class="btn primary" onclick="save()">Simpan</button></div></div>`).join("");
}
async function replaceAdminPhoto(i,input){if(!input.files[0])return;try{DATA.admins[i].photo=await uploadImage(input.files[0]);renderAdmins();await save()}catch(e){alert(e.message)}}
function renderFacilities(){
 $("facilityGrid").innerHTML=DATA.facilities.map((f,i)=>`<div class="entity-card"><div class="photo-box">${f.photo?`<img src="${f.photo}" alt="">`:"Foto sarpras"}</div><h3>${esc(f.name)}</h3><label>Nama<input class="inline-input" value="${esc(f.name)}" onchange="DATA.facilities[${i}].name=this.value"></label><label>Deskripsi<textarea onchange="DATA.facilities[${i}].description=this.value">${esc(f.description)}</textarea></label><input type="file" accept="image/*" onchange="replaceFacilityPhoto(${i},this)"><div class="actions"><button class="btn primary" onclick="save()">Simpan</button></div></div>`).join("");
}
async function replaceFacilityPhoto(i,input){if(!input.files[0])return;try{DATA.facilities[i].photo=await uploadImage(input.files[0]);renderFacilities();await save()}catch(e){alert(e.message)}}
function renderSPMB(){
 const s=DATA.spmb;$("spmbTitle").value=s.title;$("spmbDesc").value=s.description;$("spmbContact").value=s.contact;$("spmbLink").value=s.link;
 $("requirements").innerHTML=s.requirements.map((x,i)=>`<div class="inline-row"><input value="${esc(x)}" onchange="DATA.spmb.requirements[${i}]=this.value"><button class="btn danger-outline" onclick="DATA.spmb.requirements.splice(${i},1);renderSPMB()">Hapus</button></div>`).join("");
 $("schedule").innerHTML=s.schedule.map((x,i)=>`<div class="inline-row"><input value="${esc(x)}" onchange="DATA.spmb.schedule[${i}]=this.value"><button class="btn danger-outline" onclick="DATA.spmb.schedule.splice(${i},1);renderSPMB()">Hapus</button></div>`).join("");
}
function saveSPMB(){const s=DATA.spmb;s.title=$("spmbTitle").value;s.description=$("spmbDesc").value;s.contact=$("spmbContact").value;s.link=$("spmbLink").value;save()}
function addRequirement(){DATA.spmb.requirements.push("Persyaratan baru");renderSPMB()}
function addSchedule(){DATA.spmb.schedule.push("Jadwal baru");renderSPMB()}
function renderPhotos(){
 $("photoGrid").innerHTML=DATA.schoolPhotos.length?DATA.schoolPhotos.map((p,i)=>`<div class="entity-card"><div class="photo-box">${p.url?`<img src="${p.url}" alt="">`:"Belum ada foto"}</div><label>Judul<input value="${esc(p.title)}" onchange="DATA.schoolPhotos[${i}].title=this.value"></label><label>Deskripsi<textarea onchange="DATA.schoolPhotos[${i}].description=this.value">${esc(p.description)}</textarea></label><input type="file" accept="image/*" onchange="replacePhoto(${i},this)"><div class="actions"><button class="btn primary" onclick="save()">Simpan</button><button class="btn danger-outline" onclick="deletePhoto(${i})">Hapus</button></div></div>`).join(""):placeholder("Belum ada foto sekolah. Klik + Tambah Foto.");
}
function addPhotoItem(){DATA.schoolPhotos.push({id:Date.now(),title:"Foto Sekolah",description:"",url:""});renderPhotos()}
async function replacePhoto(i,input){if(!input.files[0])return;try{DATA.schoolPhotos[i].url=await uploadImage(input.files[0]);renderPhotos();await save()}catch(e){alert(e.message)}}
function deletePhoto(i){DATA.schoolPhotos.splice(i,1);save()}
function renderDamages(){
 $("damageGrid").innerHTML=DATA.damages.length?DATA.damages.map((d,i)=>`<div class="entity-card"><div class="photo-box">${d.photo?`<img src="${d.photo}" alt="">`:"Foto kerusakan"}</div><div class="form-grid"><label>Lokasi<input value="${esc(d.location)}" onchange="DATA.damages[${i}].location=this.value"></label><label>Status<select class="inline-input" onchange="DATA.damages[${i}].status=this.value"><option ${d.status==="Belum Ditangani"?"selected":""}>Belum Ditangani</option><option ${d.status==="Dalam Penanganan"?"selected":""}>Dalam Penanganan</option><option ${d.status==="Selesai"?"selected":""}>Selesai</option></select></label><label class="span-2">Keterangan<textarea onchange="DATA.damages[${i}].description=this.value">${esc(d.description)}</textarea></label></div><input type="file" accept="image/*" onchange="replaceDamagePhoto(${i},this)"><div class="actions"><button class="btn primary" onclick="save()">Simpan</button><button class="btn danger-outline" onclick="DATA.damages.splice(${i},1);save()">Hapus</button></div></div>`).join(""):placeholder("Belum ada dokumentasi kerusakan.");
}
function addDamage(){DATA.damages.push({id:Date.now(),location:"Lokasi kerusakan",status:"Belum Ditangani",description:"",photo:""});renderDamages()}
async function replaceDamagePhoto(i,input){if(!input.files[0])return;try{DATA.damages[i].photo=await uploadImage(input.files[0]);renderDamages();await save()}catch(e){alert(e.message)}}
function renderNews(){
 $("newsGrid").innerHTML=DATA.news.length?DATA.news.map((n,i)=>`<div class="entity-card"><div class="form-grid"><label>Judul<input value="${esc(n.title)}" onchange="DATA.news[${i}].title=this.value"></label><label>Tanggal<input value="${esc(n.date)}" onchange="DATA.news[${i}].date=this.value"></label><label class="span-2">Isi<textarea onchange="DATA.news[${i}].body=this.value">${esc(n.body)}</textarea></label></div><div class="actions"><button class="btn primary" onclick="save()">Simpan</button><button class="btn danger-outline" onclick="DATA.news.splice(${i},1);save()">Hapus</button></div></div>`).join(""):placeholder("Belum ada berita/pengumuman.");
}
function addNews(){DATA.news.unshift({id:Date.now(),title:"Judul Berita",date:new Date().toISOString().slice(0,10),body:"Isi berita/pengumuman dapat diedit admin."});renderNews()}
function renderExtras(){
 $("extraGrid").innerHTML=DATA.extracurriculars.map((e,i)=>`<div class="card extra-card"><div class="form-grid"><label>Nama Program<input value="${esc(e.name)}" onchange="DATA.extracurriculars[${i}].name=this.value"></label><label>Deskripsi<textarea onchange="DATA.extracurriculars[${i}].description=this.value">${esc(e.description)}</textarea></label></div><h3>4 Kolom Foto</h3><div class="extra-photos">${e.photos.map((p,j)=>`<div class="extra-slot">${p?`<img src="${p}" alt="">`:`Foto ${j+1}`}</div>`).join("")}</div><div class="row" style="margin-top:10px">${e.photos.map((p,j)=>`<input type="file" accept="image/*" onchange="replaceExtraPhoto(${i},${j},this)">`).join("")}</div><div class="actions"><button class="btn primary" onclick="save()">Simpan Program</button></div></div>`).join("");
}
async function replaceExtraPhoto(i,j,input){if(!input.files[0])return;try{DATA.extracurriculars[i].photos[j]=await uploadImage(input.files[0]);renderExtras();await save()}catch(e){alert(e.message)}}
function renderAppearance(){
 const s=DATA.settings; [["colorPrimary",s.primary],["colorSecondary",s.secondary],["colorAccent",s.accent],["colorBackground",s.background],["colorSurface",s.surface],["colorText",s.text],["colorMuted",s.muted],["colorHero",s.hero]].forEach(([id,v])=>$(id).value=v||"#000000");$("radius").value=s.radius||18;
}
function saveAppearance(){
 const s=DATA.settings;s.primary=$("colorPrimary").value;s.secondary=$("colorSecondary").value;s.accent=$("colorAccent").value;s.background=$("colorBackground").value;s.surface=$("colorSurface").value;s.text=$("colorText").value;s.muted=$("colorMuted").value;s.hero=$("colorHero").value;s.radius=$("radius").value;applyTheme();save()
}

function renderPublic(targetId="publicSite"){
 const s=DATA.school,p=DATA.school.principal;
 const mission=s.mission.map(x=>`<li>${esc(x)}</li>`).join("");
 const teachers=DATA.teachers.filter(x=>x.name).map(t=>`<div class="public-card"><h3>${esc(t.name)}</h3><p>${esc(t.slot)} · ${esc(t.role)}</p><small>NIP: ${esc(t.nip||"-")}</small></div>`).join("");
 const news=DATA.news.slice(0,6).map(n=>`<article class="public-card"><small>${esc(n.date)}</small><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></article>`).join("");
 const photos=DATA.schoolPhotos.filter(x=>x.url).map(x=>`<div class="gitem"><img src="${x.url}" alt="${esc(x.title)}"><div class="caption">${esc(x.title)}</div></div>`).join("");
 const damages=DATA.damages.map(d=>`<div class="public-card">${d.photo?`<img src="${d.photo}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;margin-bottom:10px" alt="">`:""}<span class="status ${d.status==="Dalam Penanganan"?"process":d.status==="Belum Ditangani"?"pending":""}">${esc(d.status)}</span><h3>${esc(d.location)}</h3><p>${esc(d.description)}</p></div>`).join("");
 const extras=DATA.extracurriculars.map(e=>`<div class="public-card"><h3>${esc(e.name)}</h3><p>${esc(e.description)}</p><div class="extra-photos">${e.photos.map(p=>p?`<img src="${p}" alt="">`:`<div class="extra-slot">Foto</div>`).join("")}</div></div>`).join("");
 const facilities=DATA.facilities.map(f=>`<div class="public-card">${f.photo?`<img src="${f.photo}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px;margin-bottom:12px" alt="">`:""}<h3>${esc(f.name)}</h3><p>${esc(f.description)}</p></div>`).join("");
 $(targetId).innerHTML=`<div class="public-site">
  <nav class="public-nav"><div class="public-brand"><img src="logo-poruntu.jpeg" alt="Logo"><span>${esc(s.name)}</span></div><div class="public-navlinks"><a href="#profil">Profil</a><a href="#guru">Guru</a><a href="#spmb-publik">SPMB</a><a href="#galeri">Galeri</a><a href="#berita">Berita</a></div></nav>
  <section class="public-hero"><div><div class="eyebrow" style="color:#ffe082">WEBSITE RESMI SEKOLAH</div><h1>${esc(s.name)}</h1><p>${esc(s.vision)}</p><a class="btn" style="background:var(--accent);color:#122033" href="#spmb-publik">Informasi SPMB</a></div><img class="hero-logo" src="logo-poruntu.jpeg" alt="Logo ${esc(s.name)}"></section>
  <section class="public-section" id="profil"><div class="section-head"><div class="eyebrow">TENTANG SEKOLAH</div><h2>Profil ${esc(s.name)}</h2><p>NPSN ${esc(s.npsn)} · Kurikulum ${esc(s.curriculum)} · ${esc(s.address)}</p></div><div class="public-grid"><div class="public-card"><h3>Visi</h3><p>${esc(s.vision)}</p></div><div class="public-card"><h3>Misi</h3><ol class="mission-list">${mission}</ol></div><div class="public-card"><h3>Data Peserta Didik</h3><div style="font-size:2rem;font-weight:900;color:var(--primary)">${s.students.total}</div><p>${s.students.female} perempuan · ${s.students.male} laki-laki</p></div></div>
  <div class="motto" style="margin-top:18px"><h2>${esc(s.mottoTitle)}</h2><p>${esc(s.mottoText)}</p></div></section>
  <section class="public-section"><div class="section-head"><div class="eyebrow">KEPALA SEKOLAH</div><h2>Pimpinan Sekolah</h2></div><div class="public-card principal">${p.photo?`<img src="${p.photo}" alt="Foto ${esc(p.name)}">`:`<div class="principal img" style="width:170px;height:200px">Foto Kepala Sekolah</div>`}<div><h2>${esc(p.name)}</h2><p>NIP. ${esc(p.nip)}</p><p>📧 ${esc(p.email)} ${p.phone?` · 📱 ${esc(p.phone)}`:""}</p></div></div></section>
  <section class="public-section" id="guru"><div class="section-head"><div class="eyebrow">GURU & TENAGA KEPENDIDIKAN</div><h2>Tim Sekolah</h2><p>18 slot guru sesuai struktur kelas dan mata pelajaran.</p></div><div class="public-grid">${teachers||placeholder("Data guru belum diisi.")}</div></section>
  <section class="public-section"><div class="section-head"><div class="eyebrow">SARANA</div><h2>Sarana & Prasarana</h2></div><div class="public-grid">${facilities}</div></section>
  <section class="public-section" id="spmb-publik"><div class="section-head"><div class="eyebrow">PENERIMAAN PESERTA DIDIK BARU</div><h2>${esc(DATA.spmb.title)}</h2><p>${esc(DATA.spmb.description)}</p></div><div class="public-grid"><div class="public-card"><h3>Persyaratan</h3><ul>${DATA.spmb.requirements.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>Informasi akan diperbarui.</li>"}</ul></div><div class="public-card"><h3>Jadwal</h3><ul>${DATA.spmb.schedule.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>Informasi akan diperbarui.</li>"}</ul></div><div class="public-card"><h3>Kontak SPMB</h3><p>${esc(DATA.spmb.contact)}</p>${DATA.spmb.link?`<a class="btn primary spmb-link" href="${esc(DATA.spmb.link)}" target="_blank" rel="noopener">Buka Pendaftaran</a>`:""}</div></div></section>
  <section class="public-section" id="galeri"><div class="section-head"><div class="eyebrow">GALERI SEKOLAH</div><h2>Foto Sekolah</h2></div><div class="gallery">${photos||placeholder("Belum ada foto sekolah.")}</div></section>
  <section class="public-section"><div class="section-head"><div class="eyebrow">LINGKUNGAN SEKOLAH</div><h2>Dokumentasi Kerusakan & Penanganan</h2></div><div class="public-grid">${damages||placeholder("Belum ada dokumentasi kerusakan.")}</div></section>
  <section class="public-section"><div class="section-head"><div class="eyebrow">PENGEMBANGAN DIRI</div><h2>Ekstrakurikuler</h2></div>${extras}</section>
  <section class="public-section" id="berita"><div class="section-head"><div class="eyebrow">INFORMASI TERBARU</div><h2>Berita & Pengumuman</h2></div><div class="public-grid">${news||placeholder("Belum ada berita atau pengumuman.")}</div></section>
  <footer class="public-footer"><div><h2>${esc(s.name)}</h2><p>${esc(s.address)}</p><p>${esc(s.email)}</p></div><div><strong>Kontak</strong><p>${esc(p.email)}</p>${p.phone?`<p>${esc(p.phone)}</p>`:""}</div><div><strong>Media Sosial</strong><p>${esc(s.facebook)}</p></div></footer>
 </div>`;
}
load();
