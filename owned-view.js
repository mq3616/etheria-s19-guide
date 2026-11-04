'use strict';

function selectedHeroes(){
 const known=new Set(rosterPeople().map(p=>p.name));
 return new Set((Array.isArray(state.ownedHeroes)?state.ownedHeroes:[]).filter(name=>known.has(name)));
}

function unreviewedHeroes(){
 return Array.isArray(state.unreviewedHeroes)?state.unreviewedHeroes.filter(name=>typeof name==='string'):[];
}
function boxCount(owned){
 const extra=unreviewedHeroes().length;
 return (owned.size+extra)+' 人'+(extra?'（'+extra+' 人待核实）':'');
}
function extraChips(){
 return unreviewedHeroes().map(name=>'<button type="button" data-remove-extra="'+encodeText(name)+'" aria-label="移除'+encodeText(name)+'">'+encodeText(name)+' ×</button>').join(' ');
}

function savedScene(value){
 const index=Number(value);
 return Number.isInteger(index)&&index>=0&&index<allScenes().length?index:0;
}

function ownedEditor(owned){
 const primary=['逆翎','夜离','炼','幻音千明','卡奇','格雷','克洛斯','凌罗','梨梨','瑞玛丽','芙蕾雅','谛听'];
 const others=rosterPeople().map(p=>p.name).filter(n=>!primary.includes(n));
 function choice(name){
  const art=artEntry('people',name);
  return '<label class="box-choice"><input type="checkbox" data-hero="'+encodeText(name)+'" '+(owned.has(name)?'checked':'')+'>'+
   (art?'<img width="36" height="36" loading="lazy" alt="" src="'+encodeText(art.src)+'">':'')+
   '<span>'+encodeText(name)+'</span></label>';
 }
 return '<details class="box-editor" '+(!owned.size?'open':'')+'><summary>勾选已有角色 <span data-owned-count>'+boxCount(owned)+'</span></summary>'+
  '<p class="note">只勾已经到账的角色。勾选后建议会更新，并保存在这个浏览器。</p>'+
  '<fieldset><legend>新区常用角色</legend><div class="box-choices">'+primary.map(choice).join('')+'</div></fieldset>'+
  '<button type="button" data-add-starter>我已领齐教程四人，一键勾选</button><small class="note"> 幻音千明、炼、卡奇、格雷</small>'+
  '<details class="more-heroes"><summary>其他角色（'+others.length+'）</summary><div class="box-choices">'+others.map(choice).join('')+'</div>'+
  '<label for="extra-hero">没找到角色？可以先记下名字</label><div class="extra-hero-row"><input id="extra-hero" maxlength="22" placeholder="角色全名"><button type="button" data-add-extra>记入名单</button></div><p class="note">未收录的角色单列为待核实，不据名字推测其强度。</p><div id="extra-hero-list">'+extraChips()+'</div><p class="note" id="extra-status" role="status"></p></details>'+
  '<a class="jump" href="#box-results" data-show-results>看配队结果 ↓</a></details>';
}

function ownedBulletList(items){
 return '<ol class="box-steps">'+items.map(item=>'<li>'+encodeText(item)+'</li>').join('')+'</ol>';
}
const evidenceLabels={recorded:'完整阵容有近期实战',partial:'仅部分位置有近期依据',trial:'按持有角色推算 · 待试打',gap:'缺少近期实战依据'};

function teamOutcome(index,owned){
 const scene=allScenes()[index];
 if(!owned.size&&unreviewedHeroes().length)return '<p class="box-empty">已记录的角色暂缺近期资料，无法可靠给出上场和先后顺序。领到教程角色、或有其他已收录角色时，可继续勾选。</p>';
 if(!owned.size)return '<p class="box-empty">先勾你手里的人。活动送的角色领到后再勾，就能看到该换下谁。</p>';
 const plan=ownedTeamPlan(index,owned);
 return '<div class="box-team-head"><strong>'+encodeText(scene.name)+'</strong><span class="box-level '+plan.level+'">'+evidenceLabels[plan.level]+'</span></div>'+
  '<p>'+encodeText(plan.evidence)+'</p>'+
  (plan.members.length?'<h4>从你的人里上这些</h4><div class="box-party">'+plan.members.map(({name,role})=>{
   const art=artEntry('people',name);
   return '<a href="#'+personRoute(name)+'">'+(art?'<img width="40" height="40" src="'+encodeText(art.src)+'" alt="">':'')+'<span><strong>'+encodeText(name)+'</strong><small>'+encodeText(role)+'</small></span></a>';
  }).join('')+'</div>':'<p class="stripe">当前名单凑不出有依据的上场位。</p>')+
  '<h4>谁先动</h4>'+ownedBulletList(plan.order)+'<h4>下一步先练谁</h4>'+ownedBulletList(plan.train)+
  (plan.missing.length?'<p class="note"><b>缺口或待确认</b>　'+encodeText(plan.missing.join('、'))+'</p>':'')+
  '<p class="stripe">'+encodeText(plan.limit)+'</p><details><summary>查看本场依据与原始样本</summary>'+roleRefs(plan.sources)+jump('roster/scene/'+index,'打开场景详解')+'</details>';
}

function ownedPullContents(owned){
 if(!owned.size&&unreviewedHeroes().length)return '<h3>先保留抽卡预算</h3><p>名单中只有待核实角色，无法判断你已有哪些功能。先补充能核实的上场角色，再决定要不要投入限定票。</p>'+roleRefs([serverDetails]);
 const base=ownedPullPlan(owned,'unknown');
 const target=base.budgetTarget;
 const budget=target?state.pullBudgets?.[target]:'unknown';
 const plan=ownedPullPlan(owned,['covered','short'].includes(budget)?budget:'unknown');
 const chooser=target?'<label for="box-budget">按「'+encodeText(target)+'」池面核算</label><select class="choice" id="box-budget" data-budget-target="'+encodeText(target)+'">'+
  [['unknown','还没确认目标保底或可用票数'],['short','已确认，预算不够拿到目标'],['covered','已确认，预算足够拿到目标']].map(([key,title])=>'<option value="'+key+'" '+((budget||'unknown')===key?'selected':'')+'>'+title+'</option>').join('')+'</select>':'';
 return '<h3>'+encodeText(plan.title)+'</h3>'+chooser+'<p class="stripe"><b>'+encodeText(plan.action)+'</b></p><p>'+encodeText(plan.reason)+'</p>'+
  '<p><b>停手线</b>　'+encodeText(plan.stop)+'</p>'+
  '<details><summary>其他池与本期依据</summary>'+ownedBulletList(plan.alternatives)+'<p class="note">按 11 月 4 日能核实的 S19 池子和近期国服 PvE 资料判断。缺少同练度横向实测时，只给适合补的位置。</p>'+roleRefs(plan.sources)+'</details>';
}

function ownedPlanner(topic){
 const index=savedScene(topic??state.boxScene),owned=selectedHeroes();
 const options=allScenes().map((scene,i)=>'<option value="'+i+'" '+(i===index?'selected':'')+'>'+encodeText(scene.name)+'</option>').join('');
 return '<article class="panel box-workbench"><div class="label">国服 S19 · 2026/11/04</div><h3>我的角色，怎么上场？</h3>'+
  ownedEditor(owned)+'<section id="box-results" tabindex="-1"><label for="box-scene">这次准备打哪里</label><select id="box-scene" class="choice">'+options+'</select>'+
  '<div id="box-team">'+teamOutcome(index,owned)+'</div></section></article>'+
  '<article class="panel box-pulls"><div class="label">按当前名单 · 零氪 PvE 抽卡</div><div class="box-pull-content">'+ownedPullContents(owned)+'</div></article>';
}

function updateBoxResults(){
 const owned=selectedHeroes(),selector=document.getElementById('box-scene'),team=document.getElementById('box-team');
 const count=document.querySelector('[data-owned-count]');
 if(count)count.textContent=boxCount(owned);
 if(team&&selector)team.innerHTML=teamOutcome(savedScene(selector.value),owned);
 const pull=document.querySelector('.box-pull-content');
 if(pull)pull.innerHTML=ownedPullContents(owned);
}
document.addEventListener('change',event=>{
 const input=event.target;
 if(input.matches('[data-hero]')){
  const owned=selectedHeroes();
  if(input.checked)owned.add(input.dataset.hero);else owned.delete(input.dataset.hero);
  state.ownedHeroes=[...owned];save();updateBoxResults();
 }else if(input.id==='box-scene'){
  const index=savedScene(input.value);
  state.boxScene=index;save();
  history.replaceState(history.state,'','#roster/mine/'+index);
  document.getElementById('box-team').innerHTML=teamOutcome(index,selectedHeroes());
 }else if(input.id==='box-budget'){
  state.pullBudgets={...state.pullBudgets,[input.dataset.budgetTarget]:input.value};save();
  const pull=document.querySelector('.box-pull-content');
  pull.innerHTML=ownedPullContents(selectedHeroes());
  document.getElementById('box-budget')?.focus({preventScroll:true});
 }
});
document.addEventListener('click',event=>{
 const remove=event.target.closest('[data-remove-extra]');
 if(remove||event.target.closest('[data-add-extra]')){
  const input=document.getElementById('extra-hero'),status=document.getElementById('extra-status');
  const name=input.value.trim();
  if(remove){
   state.unreviewedHeroes=unreviewedHeroes().filter(n=>n!==remove.dataset.removeExtra);
   status.textContent='已移除。';
  }else if(!name){status.textContent='先输入角色名。';input.focus();return}
  else{
   const match=rosterPeople().find(p=>p.name===name||p.alias?.split('（')[0]===name);
   if(match){
    const known=selectedHeroes();known.add(match.name);state.ownedHeroes=[...known];
    for(const box of document.querySelectorAll('[data-hero]'))box.checked=known.has(box.dataset.hero);
    status.textContent='已勾选 '+match.name+'。';
   }else{
    state.unreviewedHeroes=[...new Set([...unreviewedHeroes(),name])];
    status.textContent='已记为待核实角色。';
   }
   input.value='';
  }
  document.getElementById('extra-hero-list').innerHTML=extraChips();
  save();updateBoxResults();return;
 }
 if(event.target.closest('[data-add-starter]')){
  const owned=selectedHeroes();
  for(const n of ['幻音千明','炼','卡奇','格雷'])owned.add(n);
  state.ownedHeroes=[...owned];save();
  for(const input of document.querySelectorAll('[data-hero]'))input.checked=owned.has(input.dataset.hero);
  updateBoxResults();
 }else if(event.target.closest('[data-show-results]')){
  event.preventDefault();const results=document.getElementById('box-results');
  results.focus({preventScroll:true});results.scrollIntoView({block:'start'});
 }
});
