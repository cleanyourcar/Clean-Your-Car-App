<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="Clean Your Car"/>
<title>Clean Your Car</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
:root{
  --bg:#0a0a0a;--bg2:#111111;--bg3:#1a1a1a;--card:#141414;
  --border:rgba(160,100,255,0.15);--accent:#a050ff;--accent-l:rgba(160,80,255,0.12);
  --green:#22c98a;--green-l:rgba(34,201,138,0.12);
  --amber:#f5a623;--amber-l:rgba(245,166,35,0.12);
  --red:#f25f5c;--red-l:rgba(242,95,92,0.12);
  --text:#f0f0f0;--muted:#777;--dim:#444;
  --neon:rgba(160,80,255,0.5);
}

body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
button{font-family:inherit;cursor:pointer;}
input,select,textarea{font-family:inherit;font-size:15px;width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--bg3);color:var(--text);outline:none;box-sizing:border-box;}
textarea{resize:none;min-height:70px;}
#app{display:flex;flex-direction:column;min-height:100vh;}
#content{flex:1;overflow-y:auto;padding-bottom:80px;}
#tabbar{position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,10,0.97);border-top:1px solid rgba(160,80,255,0.2);display:flex;padding-bottom:env(safe-area-inset-bottom);}
.tab-btn{flex:1;background:transparent;border:none;padding:10px 0 4px;display:flex;flex-direction:column;align-items:center;gap:3px;color:rgba(255,255,255,0.3);}
.tab-label{font-size:10px;font-weight:600;}
.tab-dot{width:4px;height:4px;border-radius:2px;background:var(--accent);display:none;margin-top:1px;}
.tab-btn.active{color:var(--accent);}
.tab-btn.active .tab-dot{display:block;}
.tab-btn svg{transition:color 0.15s;}
.page{display:none;} .page.active{display:block;}
.section-header{display:flex;justify-content:space-between;align-items:center;padding:0 20px;margin-bottom:10px;}
.section-title{font-size:17px;font-weight:700;letter-spacing:-0.02em;}
.page-header{padding:20px 20px 16px;display:flex;justify-content:space-between;align-items:center;}
.page-title{font-size:22px;font-weight:800;}
.btn-accent{background:var(--accent);color:#fff;border:none;border-radius:10px;padding:6px 14px;font-weight:700;font-size:12px;box-shadow:0 0 10px var(--neon);}
.btn-primary{background:var(--accent);color:#fff;border:none;border-radius:14px;padding:14px;font-size:15px;font-weight:700;width:100%;box-shadow:0 0 16px var(--neon);}
.btn-danger{background:var(--red-l);border:1px solid rgba(242,95,92,0.3);border-radius:12px;padding:13px 16px;color:var(--red);font-weight:700;font-size:13px;}
.btn-ghost{background:transparent;border:1px solid var(--border);border-radius:8px;padding:5px 13px;color:var(--text);font-weight:500;font-size:13px;}
.row-item{display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;border-bottom:1px solid var(--border);}
.row-item:active{background:var(--bg2);}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px 18px;margin-bottom:10px;}
.badge{font-size:10px;padding:2px 8px;border-radius:20px;font-weight:700;}
.badge-green{background:var(--green-l);color:var(--green);}
.badge-amber{background:var(--amber-l);color:var(--amber);}
.empty{margin:0 20px;background:var(--card);border-radius:16px;padding:18px;text-align:center;color:var(--dim);font-size:14px;}
.fld{margin-bottom:14px;}
.fld label{font-size:11px;color:var(--muted);font-weight:700;display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:100;display:flex;flex-direction:column;justify-content:flex-end;}
.sheet{background:var(--bg2);border-radius:24px 24px 0 0;max-height:88vh;display:flex;flex-direction:column;}
.sheet-handle{display:flex;justify-content:center;padding:10px 0 0;}
.sheet-handle div{width:36px;height:4px;border-radius:2px;background:var(--dim);}
.sheet-header{display:flex;justify-content:space-between;align-items:center;padding:12px 20px 10px;}
.sheet-title{font-weight:700;font-size:17px;}
.sheet-close{background:var(--bg3);border:none;border-radius:20px;width:28px;height:28px;color:var(--muted);font-size:14px;display:flex;align-items:center;justify-content:center;}
.sheet-body{overflow-y:auto;padding:0 20px 40px;}
.confirm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;}
.confirm-box{background:var(--bg2);border-radius:20px;padding:24px 20px;width:100%;max-width:300px;text-align:center;border:1px solid var(--border);}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:300;background:var(--accent);color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;font-weight:700;white-space:nowrap;display:none;}
.toggle{width:28px;height:16px;border-radius:8px;background:var(--dim);position:relative;cursor:pointer;flex-shrink:0;transition:background 0.2s;}
.toggle.on{background:var(--accent);}
.toggle div{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:6px;background:#fff;transition:left 0.2s;}
.toggle.on div{left:14px;}
.prestation-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.prest-card{padding:12px;border-radius:12px;border:2px solid var(--border);background:var(--bg3);cursor:pointer;text-align:center;}
.prest-card.selected{border-color:var(--accent);background:var(--accent-l);}
.prest-card .pname{font-size:12px;font-weight:700;color:var(--text);margin-bottom:2px;}
.prest-card.selected .pname{color:var(--accent);}
.prest-card .pprix{font-size:16px;font-weight:800;color:var(--muted);}
.prest-card.selected .pprix{color:var(--accent);}
.pay-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.pay-card{padding:10px;border-radius:12px;border:2px solid var(--border);background:var(--bg3);cursor:pointer;text-align:center;font-size:13px;font-weight:700;color:var(--muted);}
.pay-card.paye{border-color:var(--green);background:var(--green-l);color:var(--green);}
.pay-card.nonpaye{border-color:var(--amber);background:var(--amber-l);color:var(--amber);}
.hours{display:flex;flex-wrap:wrap;gap:6px;}
.hour-btn{padding:8px 12px;border-radius:10px;border:1.5px solid var(--border);background:var(--bg3);color:var(--text);font-size:13px;font-weight:700;}
.hour-btn.selected{border-color:var(--accent);background:var(--accent-l);color:var(--accent);}
.hour-btn.taken{border-color:transparent;background:var(--bg);color:var(--dim);cursor:not-allowed;}
.avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;}
.stat-box{border-radius:14px;padding:12px 10px;text-align:center;}
.stat-val{font-size:18px;font-weight:800;line-height:1;margin-bottom:4px;}
.stat-label{font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.04em;}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
.cal-day{aspect-ratio:1;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;}
.cal-day.today{background:var(--accent-l);}
.cal-day.selected{background:var(--accent);}
.cal-day span{font-size:13px;}
.cal-day.today span{color:var(--accent);font-weight:700;}
.cal-day.selected span{color:#fff;font-weight:700;}
.cal-dot{width:4px;height:4px;border-radius:2px;background:var(--accent);margin-top:1px;}
.cal-day.selected .cal-dot{background:#fff;}
.home-header{padding:20px 20px 24px;background:linear-gradient(160deg,#1a0a2e 0%,#0a0a0a 100%);}
.garage-photo{width:54px;height:54px;border-radius:14px;flex-shrink:0;overflow:hidden;border:1px solid var(--border);background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:26px;}
.garage-photo img{width:100%;height:100%;object-fit:cover;}
.photo-preview{width:90px;height:90px;border-radius:20px;overflow:hidden;border:2px dashed var(--border);background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:40px;margin-bottom:10px;}
.photo-preview img{width:100%;height:100%;object-fit:cover;}
</style>
</head>
<body>
<div id="toast" class="toast"></div>
<div id="app">
  <div id="content">
    <div id="page-home" class="page active"></div>
    <div id="page-calendar" class="page"></div>
    <div id="page-clients" class="page"></div>
    <div id="page-vehicules" class="page"></div>
    <div id="page-garages" class="page"></div>
  </div>
  <div id="tabbar">
    <button class="tab-btn active" onclick="setTab('clients')"><span class="tab-icon">👥</span><span class="tab-label">Clients</span><div class="tab-dot"></div></button>
    <button class="tab-btn" onclick="setTab('calendar')"><span class="tab-icon">📅</span><span class="tab-label">Agenda</span><div class="tab-dot"></div></button>
    <button class="tab-btn" onclick="setTab('home')"><span class="tab-icon">⊞</span><span class="tab-label">Accueil</span><div class="tab-dot"></div></button>
    <button class="tab-btn" onclick="setTab('vehicules')"><span class="tab-icon">🚗</span><span class="tab-label">Véhicules</span><div class="tab-dot"></div></button>
    <button class="tab-btn" onclick="setTab('garages')"><span class="tab-icon">🏪</span><span class="tab-label">Garages</span><div class="tab-dot"></div></button>
  </div>
</div>
<div id="modal-container"></div>

<script>
const PRESTATIONS=[{id:'express',nom:'Formule Express',prix:35},{id:'complete',nom:'Formule Complète',prix:55}];
const OPTIONS=[{id:'jantes',nom:'Nettoyage jantes',prix:7}];
const HOURS=['08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'];
const MONTHS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS=['L','M','M','J','V','S','D'];

let DB={clients:[],vehicules:[],rdvs:[],garages:[]};
let calMonth=new Date().getMonth(), calYear=new Date().getFullYear(), selDay=null;

function genId(){return Math.random().toString(36).slice(2,9);}
function save(){localStorage.setItem('autoclean',JSON.stringify(DB));}
function load(){try{const d=localStorage.getItem('autoclean');if(d)DB=JSON.parse(d);}catch(e){}}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2200);}

function hue(nom){return nom.charCodeAt(0)*7%360;}
function avatar(nom,size=36){
  const i=nom.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
  const h=hue(nom);
  return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${size*0.36}px;background:hsl(${h},45%,22%);color:hsl(${h},70%,65%);border:1px solid hsl(${h},45%,32%)">${i}</div>`;
}
function badge(paiement){return paiement==='payé'?`<span class="badge badge-green">payé</span>`:`<span class="badge badge-amber">non payé</span>`;}

function setTab(tab){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+tab).classList.add('active');
  event.currentTarget.classList.add('active');
  render(tab);
}

function render(tab){
  if(tab==='home') renderHome();
  if(tab==='calendar') renderCalendar();
  if(tab==='clients') renderClients();
  if(tab==='vehicules') renderVehicules();
  if(tab==='garages') renderGarages();
}

// ── HOME ──
function renderHome(){
  const today=new Date().toISOString().slice(0,10);
  const todayRdvs=DB.rdvs.filter(r=>r.date===today);
  const upcoming=[...DB.rdvs].filter(r=>r.date>=today).sort((a,b)=>a.date>b.date?1:-1).slice(0,3);
  const unpaid=DB.rdvs.filter(r=>r.paiement==='non payé').reduce((s,r)=>s+r.prix_total,0);
  const revenue=DB.rdvs.filter(r=>r.paiement==='payé').reduce((s,r)=>s+r.prix_total,0);
  document.getElementById('page-home').innerHTML=`
    <div class="home-header">
      <div style="font-size:26px;font-weight:800;letter-spacing:-0.03em;margin-bottom:20px">Clean Your Car</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="stat-box" style="background:var(--accent-l);border:1px solid rgba(79,110,247,0.13);grid-column:span 2"><div class="stat-val" style="color:var(--accent)">${DB.clients.length}</div><div class="stat-label">Clients</div></div>
        <div class="stat-box" style="background:var(--amber-l);border:1px solid rgba(245,166,35,0.13)"><div class="stat-val" style="color:var(--amber)">${DB.rdvs.length}</div><div class="stat-label">RDV total</div></div>
      </div>
    </div>
    <div style="padding:16px 20px">
      <button class="btn-primary" onclick="openRdvForm()">+ Nouveau rendez-vous</button>
    </div>
    <div style="margin-bottom:24px">
      <div class="section-header"><span class="section-title">Aujourd'hui · ${todayRdvs.length} RDV</span></div>
      ${todayRdvs.length===0?'<div class="empty">Aucun RDV aujourd\'hui</div>':todayRdvs.map(rdvRow).join('')}
    </div>
    <div style="margin-bottom:24px">
      <div class="section-header"><span class="section-title">À venir</span></div>
      ${upcoming.length===0?'<div class="empty">Aucun RDV à venir</div>':upcoming.map(rdvRow).join('')}
    </div>`;
}

function rdvRow(r){
  const cl=DB.clients.find(c=>c.id===r.client_id)||{nom:'—'};
  const ve=DB.vehicules.find(v=>v.id===r.vehicule_id)||{marque:'',modele:''};
  const pr=PRESTATIONS.find(p=>p.id===r.prestation_id)||{nom:''};
  return `<div class="row-item" onclick="openRdvForm('${r.id}')">
    <div style="width:44px;height:44px;border-radius:12px;background:var(--accent-l);display:flex;align-items:center;justify-content:center;flex-shrink:0">
      <span style="font-size:11px;font-weight:800;color:var(--accent)">${r.heure}</span>
    </div>
    <div style="flex:1;min-width:0">
      <div style="font-weight:700;font-size:14px;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${cl.nom}</div>
      <div style="font-size:12px;color:var(--muted)">${ve.marque} ${ve.modele} · ${pr.nom}</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:3px">${r.prix_total}€</div>
      ${badge(r.paiement)}
    </div>
  </div>`;
}

// ── CALENDAR ──
function renderCalendar(){
  const firstDay=new Date(calYear,calMonth,1).getDay();
  const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
  const offset=firstDay===0?6:firstDay-1;
  const today=new Date();
  let cells='';
  for(let i=0;i<42;i++){
    const day=i-offset+1, valid=day>=1&&day<=daysInMonth;
    if(!valid){cells+=`<div></div>`;continue;}
    const ds=`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const dr=DB.rdvs.filter(r=>r.date===ds);
    const isToday=today.getDate()===day&&today.getMonth()===calMonth&&today.getFullYear()===calYear;
    const isSel=selDay===day;
    cells+=`<div class="cal-day${isToday?' today':''}${isSel?' selected':''}" onclick="selDay=${isSel?'null':day};renderCalendar()">
      <span>${day}</span>${dr.length>0?'<div class="cal-dot"></div>':''}
    </div>`;
  }
  const selRdvs=selDay?DB.rdvs.filter(r=>r.date===`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(selDay).padStart(2,'0')}`):null;
  const listRdvs=selRdvs||[...DB.rdvs].sort((a,b)=>a.date>b.date?1:-1);
  document.getElementById('page-calendar').innerHTML=`
    <div style="padding:20px 20px 12px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:22px;font-weight:800">${MONTHS[calMonth]}</div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-ghost" onclick="calMonth===0?(calMonth=11,calYear--):(calMonth--);selDay=null;renderCalendar()">‹</button>
        <span style="font-size:14px;font-weight:600;color:var(--muted);min-width:36px;text-align:center">${calYear}</span>
        <button class="btn-ghost" onclick="calMonth===11?(calMonth=0,calYear++):(calMonth++);selDay=null;renderCalendar()">›</button>
      </div>
    </div>
    <div style="padding:0 20px 12px">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:6px">
        ${DAYS.map(d=>`<div style="text-align:center;font-size:11px;font-weight:700;color:var(--dim);padding:4px 0">${d}</div>`).join('')}
      </div>
      <div class="cal-grid">${cells}</div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0 20px;margin-bottom:10px">
        <span style="font-weight:700;font-size:15px">${selDay?selDay+' '+MONTHS[calMonth]:'Tous les RDV'}</span>
        <button class="btn-accent" onclick="openRdvForm()">+ Ajouter</button>
      </div>
      ${listRdvs.length===0?'<div class="empty">Aucun RDV</div>':listRdvs.map(rdvRow).join('')}
    </div>`;
}

// ── CLIENTS ──
function renderClients(search=''){
  const filtered=DB.clients.filter(c=>c.nom.toLowerCase().includes(search.toLowerCase())||c.telephone.includes(search));
  document.getElementById('page-clients').innerHTML=`
    <div class="page-header"><div class="page-title">Clients</div><button class="btn-accent" onclick="openClientForm()">+ Nouveau</button></div>
    <div style="padding:0 20px 12px"><input placeholder="🔍 Rechercher..." oninput="renderClients(this.value)" value="${search}"/></div>
    ${filtered.length===0?'<div class="empty">Aucun client</div>':filtered.map(c=>{
      const crdvs=DB.rdvs.filter(r=>r.client_id===c.id), total=crdvs.reduce((s,r)=>s+r.prix_total,0);
      return `<div class="row-item" onclick="openClientForm('${c.id}')">
        ${avatar(c.nom,44)}
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">${c.nom}</div>
          <div style="font-size:12px;color:var(--muted)">${c.telephone}</div>
          ${c.notes?`<div style="font-size:11px;color:var(--amber);margin-top:2px">📝 ${c.notes}</div>`:''}
        </div>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:2px">${total}€</div>
          <div style="font-size:11px;color:var(--dim)">${crdvs.length} RDV</div>
        </div>
      </div>`;
    }).join('')}`;
}

// ── VEHICULES ──
function renderVehicules(){
  document.getElementById('page-vehicules').innerHTML=`
    <div class="page-header"><div class="page-title">Véhicules</div><button class="btn-accent" onclick="openVehiculeForm()">+ Nouveau</button></div>
    ${DB.vehicules.length===0?'<div class="empty">Aucun véhicule</div>':DB.vehicules.map(v=>{
      const cl=DB.clients.find(c=>c.id===v.client_id)||{nom:'—'};
      return `<div class="row-item" onclick="openVehiculeForm('${v.id}')">
        <div style="width:44px;height:44px;border-radius:12px;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🚗</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">${v.marque} ${v.modele}</div>
          <div style="font-size:12px;color:var(--muted)">${v.couleur}${v.immatriculation?' · '+v.immatriculation:''}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:12px;color:var(--muted)">${cl.nom.split(' ')[0]}</div>
          ${v.kilometrage?`<div style="font-size:11px;color:var(--dim);margin-top:3px">${v.kilometrage} km</div>`:''}
        </div>
      </div>`;
    }).join('')}`;
}

// ── GARAGES ──
function renderGarages(){
  document.getElementById('page-garages').innerHTML=`
    <div class="page-header"><div class="page-title">Garages</div><button class="btn-accent" onclick="openGarageForm()">+ Nouveau</button></div>
    ${DB.garages.length===0?'<div class="empty">Aucun garage enregistré</div>':DB.garages.map(g=>`
      <div class="row-item" onclick="openGarageForm('${g.id}')">
        <div class="garage-photo">${g.photo?`<img src="${g.photo}"/>`:'🏪'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:15px;margin-bottom:3px">${g.nom}</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:2px">👤 ${g.contact}</div>
          <div style="font-size:12px;color:var(--accent)">📞 ${g.telephone}</div>
        </div>
        ${g.notes?'<div style="width:8px;height:8px;border-radius:4px;background:var(--amber);flex-shrink:0"></div>':''}
      </div>`).join('')}`;
}

// ── MODALS ──
function closeModal(){document.getElementById('modal-container').innerHTML='';}
function confirmDelete(msg,cb){
  document.getElementById('modal-container').innerHTML+=`
    <div class="confirm-overlay" id="confirm-overlay">
      <div class="confirm-box">
        <div style="font-size:32px;margin-bottom:12px">🗑</div>
        <div style="font-weight:700;font-size:16px;margin-bottom:8px">Confirmer la suppression</div>
        <div style="font-size:13px;color:var(--muted);margin-bottom:20px">${msg}</div>
        <div style="display:flex;gap:10px">
          <button style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:12px;color:var(--text);font-weight:700;font-size:14px" onclick="document.getElementById('confirm-overlay').remove()">Annuler</button>
          <button style="flex:1;background:var(--red);border:none;border-radius:12px;padding:12px;color:#fff;font-weight:700;font-size:14px" onclick="(${cb})();document.getElementById('confirm-overlay').remove()">Supprimer</button>
        </div>
      </div>
    </div>`;
}

function sheet(title,body){
  return `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="sheet">
      <div class="sheet-handle"><div></div></div>
      <div class="sheet-header"><span class="sheet-title">${title}</span><button class="sheet-close" onclick="closeModal()">✕</button></div>
      <div class="sheet-body">${body}</div>
    </div>
  </div>`;
}

// RDV FORM
function openRdvForm(id){
  const rdv=id?DB.rdvs.find(r=>r.id===id):null;
  const isEdit=!!rdv;
  const clientOpts=DB.clients.map(c=>`<option value="${c.id}"${rdv?.client_id===c.id?' selected':''}>${c.nom}</option>`).join('');
  const clientId=rdv?.client_id||'';
  const vOpts=DB.vehicules.filter(v=>v.client_id===clientId).map(v=>`<option value="${v.id}"${rdv?.vehicule_id===v.id?' selected':''}>${v.marque} ${v.modele}</option>`).join('');
  const prix=calcPrix(rdv?.prestation_id||'express',rdv?.option_ids||[]);
  document.getElementById('modal-container').innerHTML=sheet(isEdit?'Modifier le RDV':'Nouveau RDV',`
    <div class="fld"><label>Client *</label>
      <select id="f-client" onchange="updateVehicules(this.value)"><option value="">Sélectionner...</option>${clientOpts}</select>
    </div>
    <div class="fld" id="f-v-wrap" style="${clientId?'':'display:none'}"><label>Véhicule *</label>
      <select id="f-vehicule"><option value="">Sélectionner...</option>${vOpts}</select>
    </div>
    <div class="fld"><label>Prestation</label>
      <div class="prestation-cards">
        ${PRESTATIONS.map(p=>`<div class="prest-card${(rdv?.prestation_id||'express')===p.id?' selected':''}" onclick="selectPrest('${p.id}')"><div class="pname">${p.nom}</div><div class="pprix">${p.prix}€</div></div>`).join('')}
      </div>
    </div>
    <div class="fld"><label>Option jantes +7€</label>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:12px;background:var(--bg3);border:1px solid var(--border)" onclick="toggleJantes()">
        <span style="font-size:14px">Nettoyage jantes</span>
        <div class="toggle${(rdv?.option_ids||[]).includes('jantes')?' on':''}" id="toggle-jantes"><div></div></div>
      </div>
    </div>
    <div class="fld"><label>Date *</label><input type="date" id="f-date" value="${rdv?.date||''}" oninput="renderHours()"/></div>
    <div class="fld" id="f-hours-wrap"><label>Horaire *</label><div class="hours" id="f-hours"></div></div>
    <div class="fld"><label>Paiement</label>
      <div class="pay-cards">
        <div class="pay-card${(rdv?.paiement||'non payé')==='non payé'?' nonpaye':''}" onclick="selectPay('non payé')">⏳ Non payé</div>
        <div class="pay-card${rdv?.paiement==='payé'?' paye':''}" onclick="selectPay('payé')">✓ Payé</div>
      </div>
    </div>
    <div class="fld"><label>Notes</label><textarea id="f-notes" placeholder="Remarques...">${rdv?.notes_admin||''}</textarea></div>
    <div style="display:flex;gap:10px;margin-top:8px">
      ${isEdit?`<button class="btn-danger" onclick="confirmDelete('Ce RDV sera supprimé.',function(){deleteRdv('${id}')})">🗑</button>`:''}
      <button id="f-save-rdv" class="btn-primary" style="border-radius:14px" onclick="saveRdv('${id||''}')">
        ${isEdit?'Enregistrer':'Ajouter · '+prix+'€'}
      </button>
    </div>`);
  if(rdv?.date) renderHours(rdv.date,rdv.heure);
  window._rdvPrest=rdv?.prestation_id||'express';
  window._rdvOpts=rdv?.option_ids||[];
  window._rdvPay=rdv?.paiement||'non payé';
  window._rdvHeure=rdv?.heure||'';
}
function updateVehicules(cid){
  const wrap=document.getElementById('f-v-wrap');
  const sel=document.getElementById('f-vehicule');
  const opts=DB.vehicules.filter(v=>v.client_id===cid).map(v=>`<option value="${v.id}">${v.marque} ${v.modele}</option>`).join('');
  sel.innerHTML='<option value="">Sélectionner...</option>'+opts;
  wrap.style.display=cid?'':'none';
}
function selectPrest(id){
  window._rdvPrest=id;
  document.querySelectorAll('.prest-card').forEach(c=>c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  updateSaveBtn();
}
function toggleJantes(){
  const t=document.getElementById('toggle-jantes');
  if(t.classList.contains('on')){t.classList.remove('on');window._rdvOpts=[];}
  else{t.classList.add('on');window._rdvOpts=['jantes'];}
  updateSaveBtn();
}
function selectPay(p){
  window._rdvPay=p;
  document.querySelectorAll('.pay-card').forEach(c=>{c.classList.remove('paye','nonpaye');});
  const cards=document.querySelectorAll('.pay-card');
  cards[0].classList.toggle('nonpaye',p==='non payé');
  cards[1].classList.toggle('paye',p==='payé');
}
function calcPrix(prest,opts){
  return (PRESTATIONS.find(p=>p.id===prest)?.prix||0)+(opts||[]).reduce((s,o)=>s+(OPTIONS.find(x=>x.id===o)?.prix||0),0);
}
function updateSaveBtn(){
  const btn=document.getElementById('f-save-rdv');
  if(btn) btn.textContent='Ajouter · '+calcPrix(window._rdvPrest,window._rdvOpts)+'€';
}
function renderHours(date,selected){
  const d=date||document.getElementById('f-date')?.value;
  if(!d) return;
  const booked=DB.rdvs.map(r=>r.date+r.heure);
  const h=document.getElementById('f-hours');
  if(!h) return;
  h.innerHTML=HOURS.map(hr=>{
    const taken=booked.includes(d+hr);
    const isSel=(selected||window._rdvHeure)===hr;
    return `<button class="hour-btn${isSel?' selected':''}${taken?' taken':''}" ${taken?'disabled':''} onclick="selectHour('${hr}')">${hr}</button>`;
  }).join('');
}
function selectHour(h){
  window._rdvHeure=h;
  document.querySelectorAll('.hour-btn').forEach(b=>{b.classList.toggle('selected',b.textContent===h);});
}
function saveRdv(id){
  const cid=document.getElementById('f-client')?.value;
  const vid=document.getElementById('f-vehicule')?.value;
  const date=document.getElementById('f-date')?.value;
  const notes=document.getElementById('f-notes')?.value||'';
  if(!cid||!vid||!date||!window._rdvHeure) return alert('Remplis tous les champs obligatoires');
  const prix=calcPrix(window._rdvPrest,window._rdvOpts);
  if(id){
    const i=DB.rdvs.findIndex(r=>r.id===id);
    DB.rdvs[i]={...DB.rdvs[i],client_id:cid,vehicule_id:vid,prestation_id:window._rdvPrest,option_ids:window._rdvOpts,date,heure:window._rdvHeure,prix_total:prix,paiement:window._rdvPay,notes_admin:notes};
    toast('Mis à jour ✓');
  } else {
    DB.rdvs.push({id:genId(),client_id:cid,vehicule_id:vid,prestation_id:window._rdvPrest,option_ids:window._rdvOpts,date,heure:window._rdvHeure,prix_total:prix,paiement:window._rdvPay,notes_admin:notes});
    toast('Rendez-vous ajouté ✓');
  }
  save(); closeModal(); renderActive();
}
function deleteRdv(id){DB.rdvs=DB.rdvs.filter(r=>r.id!==id);save();closeModal();toast('Supprimé');renderActive();}

// CLIENT FORM
function openClientForm(id){
  const c=id?DB.clients.find(x=>x.id===id):null;
  document.getElementById('modal-container').innerHTML=sheet(c?'Modifier le client':'Nouveau client',`
    <div class="fld"><label>Nom *</label><input id="f-nom" value="${c?.nom||''}" placeholder="Jean Dupont"/></div>
    <div class="fld"><label>Téléphone *</label><input id="f-tel" value="${c?.telephone||''}" placeholder="06 00 00 00 00"/></div>
    <div class="fld"><label>Email</label><input id="f-email" value="${c?.email||''}" placeholder="jean@mail.com"/></div>
    <div class="fld"><label>Notes</label><textarea id="f-notes" placeholder="Remarques...">${c?.notes||''}</textarea></div>
    <div style="display:flex;gap:10px;margin-top:8px">
      ${c?`<button class="btn-danger" onclick="confirmDelete('\"${c.nom}\" et ses RDV seront supprimés.',function(){deleteClient('${id}')})">🗑</button>`:''}
      <button class="btn-primary" style="border-radius:14px" onclick="saveClient('${id||''}')">
        ${c?'Enregistrer':'Ajouter'}
      </button>
    </div>`);
}
function saveClient(id){
  const nom=document.getElementById('f-nom')?.value?.trim();
  const tel=document.getElementById('f-tel')?.value?.trim();
  if(!nom||!tel) return alert('Nom et téléphone requis');
  const email=document.getElementById('f-email')?.value||'';
  const notes=document.getElementById('f-notes')?.value||'';
  if(id){
    const i=DB.clients.findIndex(c=>c.id===id);
    DB.clients[i]={...DB.clients[i],nom,telephone:tel,email,notes};
    toast('Client mis à jour ✓');
  } else {
    DB.clients.push({id:genId(),nom,telephone:tel,email,notes,date_creation:new Date().toISOString().slice(0,10)});
    toast('Client ajouté ✓');
  }
  save();closeModal();renderActive();
}
function deleteClient(id){
  DB.clients=DB.clients.filter(c=>c.id!==id);
  DB.vehicules=DB.vehicules.filter(v=>v.client_id!==id);
  DB.rdvs=DB.rdvs.filter(r=>r.client_id!==id);
  save();closeModal();toast('Supprimé');renderActive();
}

// VEHICULE FORM
function openVehiculeForm(id){
  const v=id?DB.vehicules.find(x=>x.id===id):null;
  const clientOpts=DB.clients.map(c=>`<option value="${c.id}"${v?.client_id===c.id?' selected':''}>${c.nom}</option>`).join('');
  document.getElementById('modal-container').innerHTML=sheet(v?'Modifier le véhicule':'Nouveau véhicule',`
    <div class="fld"><label>Client *</label><select id="f-client"><option value="">Sélectionner...</option>${clientOpts}</select></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="fld"><label>Marque *</label><input id="f-marque" value="${v?.marque||''}" placeholder="Peugeot"/></div>
      <div class="fld"><label>Modèle *</label><input id="f-modele" value="${v?.modele||''}" placeholder="308"/></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="fld"><label>Couleur *</label><input id="f-couleur" value="${v?.couleur||''}" placeholder="Gris"/></div>
      <div class="fld"><label>Immatriculation</label><input id="f-immat" value="${v?.immatriculation||''}" placeholder="AB-123-CD"/></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="fld"><label>Kilométrage</label><input id="f-km" value="${v?.kilometrage||''}" placeholder="42000"/></div>
      <div class="fld"><label>Commentaires</label><input id="f-comment" value="${v?.commentaires||''}"/></div>
    </div>
    <div style="display:flex;gap:10px;margin-top:8px">
      ${v?`<button class="btn-danger" onclick="confirmDelete('Ce véhicule sera supprimé.',function(){deleteVehicule('${id}')})">🗑</button>`:''}
      <button class="btn-primary" style="border-radius:14px" onclick="saveVehicule('${id||''}')">
        ${v?'Enregistrer':'Ajouter'}
      </button>
    </div>`);
}
function saveVehicule(id){
  const cid=document.getElementById('f-client')?.value;
  const marque=document.getElementById('f-marque')?.value?.trim();
  const modele=document.getElementById('f-modele')?.value?.trim();
  const couleur=document.getElementById('f-couleur')?.value?.trim();
  if(!cid||!marque||!modele||!couleur) return alert('Champs obligatoires manquants');
  const obj={id:id||genId(),client_id:cid,marque,modele,couleur,immatriculation:document.getElementById('f-immat')?.value||'',kilometrage:document.getElementById('f-km')?.value||'',commentaires:document.getElementById('f-comment')?.value||''};
  if(id){const i=DB.vehicules.findIndex(v=>v.id===id);DB.vehicules[i]=obj;toast('Mis à jour ✓');}
  else{DB.vehicules.push(obj);toast('Véhicule ajouté ✓');}
  save();closeModal();renderActive();
}
function deleteVehicule(id){
  DB.vehicules=DB.vehicules.filter(v=>v.id!==id);
  DB.rdvs=DB.rdvs.filter(r=>r.vehicule_id!==id);
  save();closeModal();toast('Supprimé');renderActive();
}

// GARAGE FORM
function openGarageForm(id){
  const g=id?DB.garages.find(x=>x.id===id):null;
  document.getElementById('modal-container').innerHTML=sheet(g?'Modifier le garage':'Nouveau garage',`
    <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:18px">
      <div class="photo-preview" id="photo-preview">${g?.photo?`<img src="${g.photo}"/>`:'🏪'}</div>
      <label style="background:var(--accent-l);color:var(--accent);border:1px solid rgba(79,110,247,0.3);border-radius:10px;padding:6px 16px;font-size:13px;font-weight:700;cursor:pointer">
        📷 Ajouter une photo<input type="file" accept="image/*" onchange="previewPhoto(this)" style="display:none"/>
      </label>
    </div>
    <div class="fld"><label>Nom du garage *</label><input id="f-nom" value="${g?.nom||''}" placeholder="Garage Central"/></div>
    <div class="fld"><label>Contact (nom) *</label><input id="f-contact" value="${g?.contact||''}" placeholder="Pierre Martin"/></div>
    <div class="fld"><label>Téléphone *</label><input id="f-tel" value="${g?.telephone||''}" placeholder="01 23 45 67 89"/></div>
    <div class="fld"><label>Notes</label><textarea id="f-notes" placeholder="Remises, horaires...">${g?.notes||''}</textarea></div>
    <div style="display:flex;gap:10px;margin-top:8px">
      ${g?`<button class="btn-danger" onclick="confirmDelete('\"${g.nom}\" sera supprimé.',function(){deleteGarage('${id}')})">🗑</button>`:''}
      <button class="btn-primary" style="border-radius:14px" onclick="saveGarage('${id||''}')">
        ${g?'Enregistrer':'Ajouter'}
      </button>
    </div>`);
  window._garagePhoto=g?.photo||'';
}
function previewPhoto(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{window._garagePhoto=e.target.result;document.getElementById('photo-preview').innerHTML=`<img src="${e.target.result}"/>`;};
  reader.readAsDataURL(file);
}
function saveGarage(id){
  const nom=document.getElementById('f-nom')?.value?.trim();
  const contact=document.getElementById('f-contact')?.value?.trim();
  const tel=document.getElementById('f-tel')?.value?.trim();
  if(!nom||!contact||!tel) return alert('Champs obligatoires manquants');
  const obj={id:id||genId(),nom,contact,telephone:tel,notes:document.getElementById('f-notes')?.value||'',photo:window._garagePhoto||''};
  if(id){const i=DB.garages.findIndex(g=>g.id===id);DB.garages[i]=obj;toast('Mis à jour ✓');}
  else{DB.garages.push(obj);toast('Garage ajouté ✓');}
  save();closeModal();renderActive();
}
function deleteGarage(id){DB.garages=DB.garages.filter(g=>g.id!==id);save();closeModal();toast('Supprimé');renderActive();}

function renderActive(){
  const active=document.querySelector('.page.active');
  if(active) render(active.id.replace('page-',''));
}

load();
renderHome();
</script>
</body>
</html>
  
