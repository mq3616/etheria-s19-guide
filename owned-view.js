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
  '<button type="button" data-add-starter>这四人已到手，一键勾选</button><small class="note"> 幻音千明、炼、卡奇、格雷；只在实际已获得时勾选。</small>'+
  '<details class="more-heroes"><summary>其他角色（'+others.length+'）</summary><div class="box-choices">'+others.map(choice).join('')+'</div>'+
  '<label for="extra-hero">没找到角色？可以先记下名字</label><div class="extra-hero-row"><input id="extra-hero" maxlength="22" placeholder="角色全名"><button type="button" data-add-extra>记入名单</button></div><p class="note">未收录的角色单列为待核实，不据名字推测其强度。</p><div id="extra-hero-list">'+extraChips()+'</div><p class="note" id="extra-status" role="status"></p></details>'+
  '<p class="note owned-change-status" data-owned-status role="status"></p><a class="jump" href="#box-results" data-show-results>看配队结果 ↓</a></details>';
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
  '<p class="stripe">'+encodeText(plan.limit)+'</p><details data-team-basis><summary>查看本场依据与原始样本</summary>'+roleRefs(plan.sources)+jump('roster/scene/'+index,'打开场景详解')+'</details>';
}

function ownedPullContents(owned){
 const goals=[['start','按我的角色排下一抽'],['waves','小怪清得慢，想现在补群攻'],['boss','清得掉小怪，首领打到超时'],['turns','主攻伤害够，下一轮大招太慢'],['survive','会减员，缺治疗/净化/保护'],['abyss','要打黑渊/暗笼，补专项角色'],['mechanics','卡在持续伤害/控制等机制'],['future','暂时能打，比较中后期候选']];
 const [,part,topic]=location.hash.split('/');
 const requested=location.hash.startsWith('#draw/')&&part==='next'?(topic||(owned.has('逆翎')?'start':'turns')):state.pullGoal;
 const goal=goals.some(([id])=>id===requested)?requested:'start';
 const target=ownedPullPlan(owned,'unknown',goal).budgetTarget;
 const budget=state.pullBudgets?.[target]||'unknown';
 const plan=ownedPullPlan(owned,budget,goal);
 const select=(id,label,choices,selected,attrs='')=>'<label for="'+id+'">'+label+'</label><select class="choice" id="'+id+'" '+attrs+'>'+choices.map(([key,title])=>'<option value="'+key+'" '+(selected===key?'selected':'')+'>'+title+'</option>').join('')+'</select>';
 const onDraw=location.hash.split('/')[0]==='#draw';
 const keyNames=['逆翎','夜离','梨梨','莉拉姆','瑞玛丽','谛听','葵诺丝','玄骊','莎朗','艾莉尔','斐莫莉安','魁洛'];
 const editor=onDraw?'<fieldset class="pull-owned"><legend>我已经有谁</legend>'+keyNames.map(name=>'<label><input type="checkbox" data-pull-hero="'+name+'" '+(owned.has(name)?'checked':'')+'> '+name+'</label>').join('')+'</fieldset>':'';
 const ownedNote=owned.size?'':'<p class="note">'+(unreviewedHeroes().length?'已记下的名字尚待核实。以下先显示新号示例。':'还没有勾选角色，以下是刚进新区的示例。')+'</p>';
 const chooser=target?select('box-budget',target+'池的票够拿到首只吗？',[['unknown','还没算'],['short','保底不够'],['covered','已核实，保底够']],budget,'data-budget-target="'+target+'"'):'';
 const opportunities=plan.opportunities?'<section class="pull-options"><h4>现在手里的票怎么花</h4>'+plan.opportunities.map(item=>'<div><b>'+encodeText(item.label)+'</b><p>'+encodeText(item.text)+'</p>'+(item.goal?'<button type="button" data-pull-goal="'+item.goal+'">'+encodeText(item.button||'查看这个缺口 →')+'</button>':'')+'</div>').join('')+'</section>':'';
 return '<section class="pull-answer" aria-live="polite"><span class="label">'+(owned.size?'按已勾选的角色':'新号示例')+'</span><h3>'+plan.title+'</h3><p>'+plan.action+'</p>'+
  '<h4>'+(plan.opportunities?'什么情况下换目标':'下一步')+'</h4><p>'+plan.next+'</p></section>'+
  select('pull-goal','这次要解决什么问题',goals,goal)+opportunities+editor+(onDraw?jump('roster/mine','勾全其他角色，避免重复补位'):'')+chooser+
  (!owned.size&&unreviewedHeroes().length?ownedNote:'')+
  '<details data-pull-basis><summary>为什么这样排？看实战和获取条件</summary><p>'+plan.basis+'</p>'+roleRefs(plan.sources)+'</details>';
}

function ownedPlanner(topic){
 const index=savedScene(topic??state.boxScene),owned=selectedHeroes();
 const options=allScenes().map((scene,i)=>'<option value="'+i+'" '+(i===index?'selected':'')+'>'+encodeText(scene.name)+'</option>').join('');
 return '<article class="panel box-workbench"><div class="label">国服 S19 · 2026/11/05</div><h3>我的角色，怎么上场？</h3>'+
  ownedEditor(owned)+'<section id="box-results" tabindex="-1"><label for="box-scene">这次准备打哪里</label><select id="box-scene" class="choice">'+options+'</select>'+
  '<div id="box-team">'+teamOutcome(index,owned)+'</div></section></article>'+
  '<article class="panel box-pulls"><div class="label">按当前名单 · 零氪 PvE 抽卡</div><div class="box-pull-content">'+ownedPullContents(owned)+'</div></article>';
}

function replaceOwnedPull(pull){
 const basisOpen=pull.querySelector('[data-pull-basis]')?.open;
 pull.innerHTML=ownedPullContents(selectedHeroes());
 if(basisOpen)pull.querySelector('[data-pull-basis]').open=true;
}

function updateBoxResults(){
 const owned=selectedHeroes(),selector=document.getElementById('box-scene'),team=document.getElementById('box-team');
 const count=document.querySelector('[data-owned-count]');
 if(count)count.textContent=boxCount(owned);
 const status=document.querySelector('[data-owned-status]');
 if(status)status.textContent='已保存 '+boxCount(owned)+'，下方配队与抽卡建议已更新。';
 if(team&&selector){
  const basisOpen=team.querySelector('[data-team-basis]')?.open;
  team.innerHTML=teamOutcome(savedScene(selector.value),owned);
  if(basisOpen&&team.querySelector('[data-team-basis]'))team.querySelector('[data-team-basis]').open=true;
 }
 const pull=document.querySelector('.box-pull-content');
 if(pull)replaceOwnedPull(pull);
}
document.addEventListener('change',event=>{
 const input=event.target;
 if(input.matches('[data-pull-hero], #pull-goal')){
  if(input.id==='pull-goal'){
   state.pullGoal=input.value;
   if(location.hash.startsWith('#draw/next'))history.replaceState(history.state,'','#draw/mine');
  }
  else{
   const owned=selectedHeroes(), name=input.dataset.pullHero;
   if(input.checked)owned.add(name);else owned.delete(name);
   state.ownedHeroes=[...owned];
  }
  save();updateBoxResults();
  const selector=input.id?'#pull-goal':'[data-pull-hero="'+input.dataset.pullHero+'"]';
  document.querySelector(selector)?.focus({preventScroll:true});return;
 }
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
  replaceOwnedPull(pull);
  document.getElementById('box-budget')?.focus({preventScroll:true});
 }
});
document.addEventListener('click',event=>{
 const pick=event.target.closest('[data-pull-goal]');
 if(pick){
  const select=document.getElementById('pull-goal');
  select.value=pick.dataset.pullGoal;select.dispatchEvent(new Event('change',{bubbles:true}));
  document.getElementById('box-budget')?.focus();return;
 }
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
  save();updateBoxResults();input.focus({preventScroll:true});return;
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

document.addEventListener('keydown',event=>{if(event.target.id==='extra-hero'&&event.key==='Enter'){event.preventDefault();document.querySelector('[data-add-extra]')?.click();}});
