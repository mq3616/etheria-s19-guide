'use strict';

function checklistLocation(){
 const hash=String(state.lastChecklist||'day1');
 return /^(day1(\/[0-3])?|week\/[2-7])$/.test(hash)?hash:'day1';
}
function checklistLabel(hash){
 return hash.startsWith('week/')?'第 '+hash.slice(-1)+' 天清单':'首日 · '+openingPlan[Number(hash.split('/')[1])||0].tab;
}
function guideIcon(name){
 const paths={
  day1:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 9 1.5 1.5L12 8m-4 7 1.5 1.5L12 14m3-5h2m-2 6h2"/>',
  draw:'<path d="m12 3 2.8 5.6L21 12l-6.2 3.4L12 21l-2.8-5.6L3 12l6.2-3.4Z"/><path d="m12 8 2 4-2 4-2-4Z"/>',
  roster:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/>',
  fight:'<path d="m5 3 14 14m-2-14L3 17m1-1 4 4m8-4 4 4M3 21l3-3m12 0 3 3M5 3h4M5 3v4m12-4h4v4"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  more:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  back:'<path d="m10 5-7 7 7 7M3 12h18"/>',
  forward:'<path d="m14 5 7 7-7 7M3 12h18"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h1m6 0h1m-8 3h1"/>',
  manual:'<path d="M12 5v16m0-16C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z"/>',
  route:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h8a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h8"/>',
  evidence:'<path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8m-8 4h6"/>',
  atlas:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/>'
 };
 return '<svg class="guide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(paths[name]||paths.manual)+'</svg>';
}
function guideNav(key){
 const primary=['day1','draw','roster'];
 const labels={day1:'首周清单',draw:'抽卡顺序',roster:'角色配队'};
 function link([id,text]){
  const href=id==='day1'?checklistLocation():id==='draw'?'draw/order':id;
  return '<a href="#'+href+'" '+(id===key?'aria-current="page"':'')+'>'+guideIcon(id)+'<span>'+encodeText(labels[id]||text)+'</span></a>';
 }
 const active=tabs.find(([id])=>id===key);
 return primary.map(id=>link(tabs.find(([k])=>id===k))).join('')+
  '<button class="find-open" type="button" aria-haspopup="dialog" aria-controls="guide-find" aria-keyshortcuts="Control+k Meta+k">'+guideIcon('search')+'<span>查找</span></button><button type="button" class="nav-more '+(!primary.includes(key)?'contains-current':'')+'" aria-controls="extra-nav" aria-expanded="false" aria-label="更多栏目'+(!primary.includes(key)?'，当前'+encodeText(active[1]):'')+'">'+guideIcon('more')+'<span>更多</span></button>'+
  '<div class="extra-nav" id="extra-nav">'+tabs.filter(([id])=>!primary.includes(id)).map(link).join('')+'</div>';
}
function flowAfterRender(key){
 if(key!=='day1' && state.lastChecklist){
  const h=checklistLocation();app.querySelector('.sectionhead')?.insertAdjacentHTML('beforebegin','<a class="plan-back" href="#'+h+'">'+guideIcon('back')+'回到'+checklistLabel(h)+'</a>');
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
  ['看起步队与替补','roster/scene/0'],['看克洛斯怎么配','roster/person/1'],['看兵祸已验证的位置','roster/scene/2'],['看单体输出谛听','roster/person/6'],['按已有角色核对预算','draw/mine'],['对照首周活动','calendar']
 ][day-2];
 return '<a class="task-reference" href="#'+topics[1]+'">'+topics[0]+' →</a>';
}
function searchGuide(query){
 const q=query.trim().toLowerCase();
 const row=(title,type,route,words='')=>({title,type,route,words});
 const days=[row('第 1 天 · 进服与首抽','清单','day1','首日抽卡资源'),...weekDays.map(d=>row('第 '+d.day+' 天 · '+d.title,'清单','week/'+d.day,d.focus))];
 const people=rosterPeople().map((p,i)=>row(p.name,'角色','roster/person/'+i,[p.role,p.alias,...pullAliases(pullCanonical(p.name))].filter(Boolean).join(' ')));
 const scenes=allScenes().map((s,i)=>row(s.name,'阵容','roster/scene/'+i,s.goal));
 const notes=guideGroups.flatMap(([kind,label,get])=>get().map((v,i)=>row(v.title,label,'manual/'+kind+'/'+i)));
 const poolsList=pools.map((p,i)=>row(p[0],'卡池','draw/'+i,p[1]));
 const catalogs=tabs.map(([k,title])=>row(title,'栏目',k));
 const pictures=['explore','maps'].flatMap((g,i)=>Object.keys(artSet(g)).map(key=>{const im=artEntry(g,key);return row(im.title,'图鉴','atlas/'+(i+1)+'/'+key,im.caption)}));
 const concreteTeams=bookTeams().map(t=>row(t.title,'队伍','roster/teams/'+t.scene+'/'+t.stage+'/'+t.id,[t.when,t.slots.map(s=>s.slice(1,3).join(' ')).join(' ')].join(' ')));
 const teamPages=Object.entries(bookScenes).map(([id,label])=>row(label+' · 队伍与平替','配队','roster/teams/'+id,label+' 获取方式 '+bookTips[id]));
 const results=[...concreteTeams,...teamPages,row('按副本查节奏榜','抽卡','draw/ranks','原表 实战 兵祸 多琪 奥洛拉 高难'),row('卡池与自选时间表','抽卡','draw/channels','固定赠送 盛典之邀 极相自选'),row('国服角色抽取索引','抽卡','draw/catalog','全部 名册 图鉴'),row('TapTap 榜单出处','资料','draw/basis','节奏榜 来源'),row('PvE 角色强度表','强度','roster/tiers','整体 角色强度 排行 节奏榜 前期 后期 抽卡 T0'),row('逆翎之后抽谁','抽卡','draw/next','第二目标 梨梨 莉拉姆 夜离 葵诺丝 复刻 中后期'),row('必要抽取顺序与时间表','抽卡','draw/order','什么时候抽 逆翎 梨梨 莉拉姆 第二池 高难 开服'),row('抽卡优先级与固定获取','抽卡','draw/mine','免费领取 赠送 抽取优先级 首抽 自选 培养计划 瑞玛丽 克洛斯 凌罗 宁芙涅'),row('我的角色配队','工具','roster/mine','已抽 持有 抽卡 推荐 谁先动'),...people,...scenes,...days,...poolsList,...pictures,...notes,...catalogs];
 const norm=s=>s.toLowerCase().replace(/逆鳞/g,'逆翎').replace(/利拉姆/g,'莉拉姆').replace(/绫罗/g,'凌罗').replace(/瑞马丽/g,'瑞玛丽').replace(/奥罗拉/g,'奥洛拉').replace(/符文/g,'源器').replace(/\s+/g,'');
 const needle=norm(q);
 const byTitle=results.filter(r=>norm(r.title).includes(needle)).sort((a,b)=>Number(norm(b.title)===needle)-Number(norm(a.title)===needle));
 const matches=q?[...byTitle,...results.filter(r=>!byTitle.includes(r)&&norm(r.words).includes(needle))]:[
  results.find(x=>x.route==='draw/order'),teamPages.find(x=>x.route==='roster/teams/story'),results.find(x=>x.route==='roster/mine'),days[0]
 ].filter(Boolean);
 const count=document.querySelector('#find-count'),out=document.querySelector('#find-results');
 count.textContent=q?(matches.length?'找到 '+matches.length+' 项':'没有找到“'+query.trim()+'”'):'常用入口 · 可输入角色、队伍或副本名';
 out.innerHTML=matches.length?matches.map(r=>'<a href="#'+encodeText(r.route)+'"><small>'+encodeText(r.type)+'</small><b>'+encodeText(r.title)+'</b>'+guideIcon('forward')+'</a>').join(''):
  '<div class="find-empty"><p>试试“逆翎”“兵祸”“源器”或“第 2 天”。也可以直接进入：</p><a href="#roster/teams">'+guideIcon('roster')+'<b>按玩法找队伍</b></a><a href="#draw/order">'+guideIcon('draw')+'<b>查看抽卡顺序</b></a></div>';

}
const findDialog=document.querySelector('#guide-find'),findInput=document.querySelector('#find-input');
findInput.setAttribute('aria-controls','find-results');
findInput.setAttribute('aria-describedby','find-count');
function closeGuideMenu(returnFocus=false){
 nav.classList.remove('expanded');
 const button=nav.querySelector('.nav-more');
 button?.setAttribute('aria-expanded','false');
 if(returnFocus)button?.focus();
}
function openGuideSearch(){
 closeGuideMenu();findInput.value='';searchGuide('');
 if(!findDialog.open)findDialog.showModal();
 findInput.focus();
}
document.addEventListener('click',e=>{
 const more=e.target.closest('.nav-more');
 if(more){const open=more.getAttribute('aria-expanded')==='false';more.setAttribute('aria-expanded',String(open));nav.classList.toggle('expanded',open);return}
 if(!nav.contains(e.target)||e.target.closest('a'))closeGuideMenu();
 if(e.target.closest('.find-open')){openGuideSearch();return}
 if(e.target.closest('.find-close, #find-results a')||e.target===findDialog)findDialog.close();
 const result=e.target.closest('#find-results a');if(result?.hash===location.hash&&result.hash.includes('/teams/'))requestAnimationFrame(focusLinkedTeam);
 if(e.target.closest('.art-guide-link')&&artDialog.open)artDialog.close();
});
findInput.addEventListener('input',()=>searchGuide(findInput.value));
findInput.addEventListener('keydown',e=>{
 if(e.key==='Enter'){const first=document.querySelector('#find-results a');if(first){e.preventDefault();first.click()}}
 if(e.key==='ArrowDown'){const first=document.querySelector('#find-results a');if(first){e.preventDefault();first.focus()}}
});
findDialog.addEventListener('keydown',e=>{
 const links=[...findDialog.querySelectorAll('#find-results a')],index=links.indexOf(document.activeElement);
 if(index<0)return;
 if(e.key==='ArrowDown'&&index<links.length-1){e.preventDefault();links[index+1].focus()}
 if(e.key==='ArrowUp'){e.preventDefault();index===0?findInput.focus():links[index-1].focus()}
});
nav.addEventListener('keydown',e=>{
 if(e.key==='ArrowDown'&&e.target.closest('.nav-more')){
  e.preventDefault();nav.classList.add('expanded');nav.querySelector('.nav-more').setAttribute('aria-expanded','true');nav.querySelector('.extra-nav a')?.focus();
 }
});
nav.addEventListener('focusout',()=>{setTimeout(()=>{if(!nav.contains(document.activeElement))closeGuideMenu()},0)});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&nav.classList.contains('expanded')){e.preventDefault();closeGuideMenu(true);return}
 const editing=e.target.matches?.('input,textarea,select,[contenteditable="true"]');
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'&&!editing&&!artDialog.open){e.preventDefault();openGuideSearch()}
});
