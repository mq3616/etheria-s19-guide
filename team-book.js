'use strict';
const bookScenes={all:'全部玩法',story:'推图过剧情',gear:'刷源器（符文）',shell:'刷智壳',hard:'高难挑战',event:'活动专项',pvp:'PvP 对战'};
const bookStages={all:'不限进度',early:'前期',mid:'中期',late:'后期'};
const bookTips={all:'先挑要解决的问题，再决定养哪队。',story:'先靠已送角色推进。只有推不动时，才换那一格。',gear:'游戏里对应「熔断禁区」：这里刷源器套装和主词条。',shell:'游戏里对应「凶影追缉」：这里刷智壳，和刷源器是两个入口。',hard:'先看原队条件与面板，再决定手里的角色能不能替。',event:'先看活动是否要打、要几队，再决定值不值得专门养人。',pvp:'竞技场进攻、实时对战和限时规则分开看。只玩 PvE 可以跳过整栏。'};
const bookTeams=()=>[...(window.teamPve||[]),...(window.teamPvp||[])];
const bookOpen=new Map();
// Repeatable farms span progression; activity/PvP are overlapping goals.
const bookAlso={ 'binghuo-gear':{stages:['late']}, 'aoluola-gear':{stages:['late']},'duoqi-gear':{stages:['late']},'abyss-nahe':{scenes:['hard']},'event-five-squads':{scenes:['pvp']} };
const bookDimensions=t=>({stages:[t.stage,...(bookAlso[t.id]?.stages||[])],scenes:[t.scene,...(bookAlso[t.id]?.scenes||[])]});
function bookNav(scene,stage){return '#roster/teams/'+scene+(stage==='all'?'':'/'+stage)}
function bookHero(name,owned){
 const e=encodeText,access=window.teamAccess?.[name]||['获取待核','S19 的固定来源和定向池尚未核实，先用已有角色。',''];
 const im=artEntry('people',name),route=personRoute(name);
 return '<div class="book-hero">'+(im?'<img loading="lazy" width="38" height="38" alt="" src="'+e(im.src)+'">':'')+'<div>'+
 (route?'<a class="book-name" href="#'+e(route)+'">'+e(name)+'</a>':'<strong class="book-name">'+e(name)+'</strong>')+(owned.has(name)?'<span class="book-owned">已有</span>':'')+
 '<div class="book-access">'+(access[2]?'<a href="'+e(access[2])+'" target="_blank" rel="noopener">'+e(access[0])+' ↗</a>':'<b>'+e(access[0])+'</b>')+' · '+e(access[1])+'</div></div></div>';
}
function bookCard(t,index,owned){
 const e=encodeText,open=bookOpen.get(t.id)??index===0;
 const slots=t.slots.map(([job,name,alt,note])=>'<li><h4>'+e(job)+'</h4><div class="book-pair"><div><small>首选</small>'+bookHero(name,owned)+'</div><div><small>替位</small>'+(alt?bookHero(alt,owned):'<span class="book-none">暂无已核实的同位平替</span>')+'</div></div>'+(note?'<p class="book-swap">'+e(note)+'</p>':'')+'</li>').join('');
 const chosen=new Set(t.slots.map(x=>x[1]).filter(n=>owned.has(n)));
 const match=owned.size&&t.slots.length?'<div class="book-match"><b>按你已勾选的角色</b><p>'+t.slots.map(([job,n,a])=>{
  if(owned.has(n))return e(n)+'上场';
  if(a&&owned.has(a)&&!chosen.has(a)){chosen.add(a);return e(a)+'代'+e(n)}
  return '还缺'+e(job)+'位';
 }).join('；')+'。</p></div>':'';
 const hit=t.slots.filter(([,n])=>owned.has(n)).length;
 return '<details class="book-card" data-team-id="'+e(t.id)+'" '+(open?'open':'')+'><summary><span class="book-kicker">'+bookDimensions(t).stages.map(k=>bookStages[k]).join('、')+' / '+bookDimensions(t).scenes.map(k=>bookScenes[k]).join('、')+'</span><strong>'+e(t.title)+'</strong><span class="book-lineup">'+(t.slots.length?t.slots.map(x=>e(x[1])).join(' · '):'规则与参与条件')+(owned.size&&t.slots.length?'　｜ 已有首选 '+hit+'/'+t.slots.length:'')+'</span></summary><div class="book-body"><p class="book-when">'+e(t.when)+'</p>'+match+'<p class="book-evidence"><b>依据</b> '+e(t.evidence)+'</p>'+
 (slots?'<ul class="book-slots">'+slots+'</ul>':'')+
 '<div class="book-move"><b>'+(slots?'出手与打法':'怎么参加')+'</b><p>'+e(t.order)+'</p></div><div class="book-pull"><b>为这队花票吗？</b><p>'+e(t.pull)+'</p></div>'+
 '<details class="book-refs"><summary>攻略原文与规则</summary>'+roleRefs(t.refs)+'</details></div></details>';
}
function teamBook(requestedScene,requestedStage){
 const scene=Object.hasOwn(bookScenes,requestedScene)?requestedScene:'story',stage=Object.hasOwn(bookStages,requestedStage)?requestedStage:'all';
 const all=bookTeams(),fits=(t,s,g)=>(s==='all'||bookDimensions(t).scenes.includes(s))&&(g==='all'||bookDimensions(t).stages.includes(g));
 const rows=all.filter(t=>fits(t,scene,stage)),owned=selectedHeroes();
 const nav=(items,isScene)=>Object.entries(items).map(([id,label])=>{
  let s=isScene?id:scene,g=isScene?stage:id;const active=(isScene?scene:stage)===id;
  // Keep both filters explicit, including when their intersection is empty.


  return '<a href="'+bookNav(s,g)+'" '+(active?'aria-current="page"':'')+'>'+label+'</a>';
 }).join('');
 return head('按玩法找队伍','S19 / 阵容手册')+'<div class="book-intro"><p>先找你要打的内容。点开一队，就能看到谁先动、少了谁能换，以及每个人从哪里拿。</p><a href="#draw/order">先看必要抽取顺序 →</a><a href="#draw/mine">算我下一抽 →</a><a href="#roster/mine">勾选我的角色 →</a><a href="#roster/tiers">对比角色强度 →</a></div>'+
 '<section class="book-filter" aria-label="筛选队伍"><div><b>打什么</b><div class="book-chips">'+nav(bookScenes,true)+'</div></div><div><b>当前进度</b><div class="book-chips">'+nav(bookStages,false)+'</div></div></section>'+
 '<div class="book-heading"><h3>'+bookScenes[scene]+'</h3><span>'+bookStages[stage]+' · '+rows.length+' 项</span></div><p class="book-tip">'+bookTips[scene]+'</p>'+
 (rows.length>1?'<div class="book-index"><b>直接看</b>'+rows.map(t=>'<button type="button" data-show-team="'+encodeText(t.id)+'">'+encodeText(t.title)+'</button>').join('')+'</div>':'')+
 (rows.map((t,i)=>bookCard(t,i,owned)).join('')||'<p>暂无这个阶段、这个玩法的队伍资料。</p><div class="book-intro"><a href="'+bookNav(scene,'all')+'">看「'+bookScenes[scene]+'」的其他进度 →</a><a href="'+bookNav('all',stage)+'">看「'+bookStages[stage]+'」的其他玩法 →</a></div>')+
 '<div class="book-intro"><a href="#roster/rank">新区培养顺序 →</a><a href="#roster/scene">副本条件详解 →</a><a href="#roster/person">查看角色档案 →</a></div>';
}
document.addEventListener('toggle',e=>{const card=e.target;if(card.matches?.('details[data-team-id]')&&card.isConnected)bookOpen.set(card.dataset.teamId,card.open)},true);

document.addEventListener('click',e=>{const b=e.target.closest('[data-show-team]');if(!b)return;const c=Array.from(document.querySelectorAll('[data-team-id]')).find(n=>n.dataset.teamId===b.dataset.showTeam);if(c){c.open=true;c.querySelector('summary').focus({preventScroll:true});c.scrollIntoView({block:'start'});}});
