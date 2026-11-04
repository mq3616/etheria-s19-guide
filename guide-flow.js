'use strict';

function checklistLocation(){
 const hash=String(state.lastChecklist||'day1');
 return /^(day1(\/[0-3])?|week\/[2-7])$/.test(hash)?hash:'day1';
}
function checklistLabel(hash){
 return hash.startsWith('week/')?'第 '+hash.slice(-1)+' 天清单':'首日 · '+openingPlan[Number(hash.split('/')[1])||0].tab;
}
function guideNav(key){
 const primary=['day1','roster','fight'];
 function link([id,text]){
  const href=id==='day1'?checklistLocation():id;
  return '<a href="#'+href+'" '+(id===key?'aria-current="page"':'')+'>'+text+'</a>';
 }
 const active=tabs.find(([id])=>id===key);
 return primary.map(id=>link(tabs.find(([k])=>id===k))).join('')+
  '<button class="find-open" type="button" aria-haspopup="dialog">查找</button><button type="button" class="nav-more" aria-controls="extra-nav" aria-expanded="false">'+(primary.includes(key)?'更多':active[1])+' ▾</button>'+
  '<div class="extra-nav" id="extra-nav">'+tabs.filter(([id])=>!primary.includes(id)).map(link).join('')+'</div>';
}
function flowAfterRender(key){
 if(key!=='day1' && state.lastChecklist){
  const h=checklistLocation();app.querySelector('.sectionhead')?.insertAdjacentHTML('beforebegin','<a class="plan-back" href="#'+h+'">← 回到'+checklistLabel(h)+'</a>');
 }
}
function personRoute(name){
 const i=rosterPeople().findIndex(p=>p.name===name);
 return i<0?'':'roster/person/'+i;
}
const atlasRoutes={
 hub:'fight',growth:'manual/growth/0',sourceweb:'manual/growth/0',forge:'fight',
 binghuo:'roster/scene/2',duoqi:'roster/scene/3',aoluola:'roster/scene/4',nana:'roster/scene/1',shalang:'roster/scene/5',heyan:'roster/scene/6'
};
function activeArtLink(im){
 let href='',label='';
 if(im.group==='people'){href=personRoute(im.key);label='看'+im.title+'的角色资料'}
 if(im.group==='maps'){const scene=allScenes().findIndex(s=>s.mapKey===im.key);href=scene>=0?'roster/scene/'+scene:atlasRoutes[im.key];label=href?.startsWith('roster/')?'看这个副本的阵容与打法':'看相关开荒步骤'}
 const a=document.querySelector('.art-guide-link');a.hidden=!href;
 if(href){a.href='#'+href;a.textContent=label+' →'}
}
function checklistPeople(names){
 const items=names.map(name=>{
  const route=personRoute(name),im=artEntry('people',name);
  return route?'<a href="#'+route+'">'+(im?'<img src="'+encodeText(im.src)+'" alt="" loading="lazy">':'')+encodeText(name)+'</a>':'';
 });
 return '<div class="photo-links" aria-label="本段角色资料">'+items.join('')+'</div>';
}
function contextualChecklist(day,n){
 const topics=day===1?[
  ['认起步队','roster/scene/0'],['对照卡池','draw/0'],['看体力副本入口','atlas/2'],['看首周活动','calendar']
 ][n]:[
  ['看起步队与替补','roster/scene/0'],['看克洛斯怎么配','roster/person/1'],['看兵祸已验证的位置','roster/scene/2'],['看单体输出谛听','roster/person/6'],['核对限定预算','draw/0'],['对照首周活动','calendar']
 ][day-2];
 return '<a class="task-reference" href="#'+topics[1]+'">'+topics[0]+' ↗</a>';
}
function searchGuide(query){
 const q=query.trim().toLowerCase();
 const row=(title,type,route,words='')=>({title,type,route,words});
 const days=[row('第 1 天 · 进服与首抽','清单','day1','首日抽卡资源'),...weekDays.map(d=>row('第 '+d.day+' 天 · '+d.title,'清单','week/'+d.day,d.focus))];
 const people=rosterPeople().map((p,i)=>row(p.name,'角色','roster/person/'+i,[p.role,p.alias].filter(Boolean).join(' ')));
 const scenes=allScenes().map((s,i)=>row(s.name,'阵容','roster/scene/'+i,s.goal));
 const notes=guideGroups.flatMap(([kind,label,get])=>get().map((v,i)=>row(v.title,label,'manual/'+kind+'/'+i)));
 const poolsList=pools.map((p,i)=>row(p[0],'卡池','draw/'+i,p[1]));
 const catalogs=tabs.map(([k,title])=>row(title,'栏目',k));
 const pictures=['explore','maps'].flatMap((g,i)=>Object.keys(artSet(g)).map(key=>{const im=artEntry(g,key);return row(im.title,'图鉴','atlas/'+(i+1)+'/'+key,im.caption)}));
 const results=[row('抽卡优先级与固定获取','抽卡','draw','免费领取 赠送 抽取优先级 首抽 自选 培养计划 瑞玛丽 克洛斯 凌罗 宁芙涅'),row('我的角色配队','工具','roster/mine','已抽 持有 抽卡 推荐 谁先动'),...people,...scenes,...days,...poolsList,...pictures,...notes,...catalogs];
 const norm=s=>s.toLowerCase().replace(/\s+/g,'');
 const needle=norm(q);
 const byTitle=results.filter(r=>norm(r.title).includes(needle));
 const matches=q?[...byTitle,...results.filter(r=>!byTitle.includes(r)&&norm(r.words).includes(needle))]:[days[0],people.find(x=>x.title==='逆翎'),scenes[0],poolsList[0]].filter(Boolean);
 const count=document.querySelector('#find-count'),out=document.querySelector('#find-results');
 count.textContent=q?(matches.length?'找到 '+matches.length+' 项':'没有找到。试试角色名、副本名或“体力”。'):'常用入口';
 out.innerHTML=matches.map(r=>'<a href="#'+encodeText(r.route)+'"><small>'+encodeText(r.type)+'</small><b>'+encodeText(r.title)+'</b><span>→</span></a>').join('');
}
const findDialog=document.querySelector('#guide-find'),findInput=document.querySelector('#find-input');
document.addEventListener('click',e=>{
 const more=e.target.closest('.nav-more');
 if(more){const open=more.getAttribute('aria-expanded')==='false';more.setAttribute('aria-expanded',String(open));nav.classList.toggle('expanded',open);return}
 if(!nav.contains(e.target)||e.target.closest('a')){nav.classList.remove('expanded');nav.querySelector('.nav-more')?.setAttribute('aria-expanded','false')}
 if(e.target.closest('.find-open')){findInput.value='';searchGuide('');findDialog.showModal();findInput.focus();return}
 if(e.target.closest('.find-close, #find-results a')||e.target===findDialog)findDialog.close();
 if(e.target.closest('.art-guide-link')&&artDialog.open)artDialog.close();
});
findInput.addEventListener('input',()=>searchGuide(findInput.value));
findInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const first=document.querySelector('#find-results a');if(first){e.preventDefault();first.click()}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('expanded')){nav.classList.remove('expanded');const b=nav.querySelector('.nav-more');b.setAttribute('aria-expanded','false');b.focus()}});
