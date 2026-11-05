'use strict';
const sbLabels={free:'任务／教程可领',choose:'自选或活动奖励',up:'可定向召唤',draw:'目前只核到抽卡途径',check:'首只途径待核',awake:'源质觉醒 · 不再抽'};
const sbState={scene:'all',tier:'all',query:'',category:'all'};
const sbSceneOrder=[0,1,2,10,3,4,5,6,7,8,9]; // Existing links 0..3 retain their prior scenes.
function sbName(v){return pullCanonical(v.replace(/（觉醒）$/,''))}
function sbInfo(r){const n=sbName(r[0]);const base=summonAccess[n]||{cat:'check',title:'尚未核到固定任务或当前定向',path:'检查该角色图鉴的获取途径及召唤详情名单；没有写目标保底的入口就不能当作定向。',budget:'先用已有角色；不为未证实的目标换票。',refs:[]};
 if(r[0].endsWith('（觉醒）'))return {cat:'awake',title:'先拿'+n+'的本体，再解锁源质觉醒',path:'本体：'+base.title+'。'+base.path,budget:'不另抽觉醒形态；先确认本体培养门槛，在源质觉醒界面查对应材料。',refs:[...(base.refs||[]),['官方 · 源质觉醒说明','https://www.taptap.cn/moment/843432594195353104?group_id=333480']]};return base}
function sbOptions(m,value){return m.map(([k,t])=>'<option value="'+encodeText(String(k))+'" '+(String(k)===value?'selected':'')+'>'+encodeText(t)+'</option>').join('')}
function sbControls(){return '<div class="sb-filters"><label>目标副本<select data-sb="scene">'+sbOptions([['all','全部 PvE'],...summonTop.scenes.map((s,i)=>[i,s])],sbState.scene)+'</select></label><label>原作者评级<select data-sb="tier">'+sbOptions([['all','T0 和 T0.5'],['T0','只看 T0'],['T0.5','只看 T0.5']],sbState.tier)+'</select></label><label>获取途径<select data-sb="category">'+sbOptions([['all','全部途径'],...Object.entries(sbLabels)],sbState.category)+'</select></label><label>查角色<input type="search" data-sb="query" placeholder="名字或别名" value="'+encodeText(sbState.query)+'"></label></div>'}
function sbMatches(){const {query,tier,category,scene}=sbState;return summonTop.rows.map(r=>({r,info:sbInfo(r),hits:r[3].filter(([i,t])=>(scene==='all'||Number(scene)===i)&&(tier==='all'||t===tier))})).filter(({r,info,hits})=>hits.length&&(category==='all'||info.cat===category)&&[r[0],sbName(r[0]),...pullAliases(sbName(r[0]))].some(n=>n.includes(query.trim())))}
function sbProof(refs){return roleRefs(refs||[])}
function sbRowHtml({r,info,hits}){
 const stage=(t)=>hits.filter(v=>v[1]===t).map(([i])=>summonTop.scenes[i]).join('、');
 return '<details class="sb-row"><summary>'+pullIcon(sbName(r[0]))+'<b>'+encodeText(r[0])+'</b> <span>'+encodeText(info.title)+'</span></summary><div class="sb-detail">'+['T0','T0.5'].map(t=>stage(t)?'<p><b>'+t+'</b>　'+encodeText(stage(t))+'</p>':'').join('')+'<dl><dt>怎么拿</dt><dd>'+encodeText(info.path)+'</dd><dt>资源怎么花</dt><dd>'+encodeText(info.budget)+'</dd></dl><small>评级来自原表第 '+r[1]+' 行；'+encodeText(r[2])+'。</small> '+catalogLink(sbName(r[0]))+sbProof([...(info.refs||[]),pullBooks.live])+'</div></details>';
}
function sbResult(){
 const rows=sbMatches();
 return '<p role="status" class="note">匹配 '+rows.length+' 条角色／形态记录。点名字看具体任务、卡池、用券建议和出处。</p>'+ (rows.length?Object.entries(sbLabels).map(([key,label])=>{const members=rows.filter(x=>x.info.cat===key);return members.length?'<section class="sb-group"><h4>'+label+' <small>'+members.length+'</small></h4><div class="sb-names">'+members.map(x=>'<button type="button" data-sb-focus="'+x.r[1]+'">'+encodeText(x.r[0])+' <small>'+[...new Set(x.hits.map(h=>h[1]))].sort().join(' / ')+'</small></button>').join('')+'</div><details class="sb-group-rows" '+((sbState.category!=='all'||sbState.query.trim()||key==='free')?'open':'')+'><summary>逐个看领取条件与用票</summary>'+members.map(x=>'<div data-sb-row="'+x.r[1]+'">'+sbRowHtml(x)+'</div>').join('')+'</details></section>':''}).join(''):'<p>这个组合没有匹配项。<button type="button" data-sb-clear>清除筛选</button></p>');
}
function sbBudgetForm(){return '<details class="sb-calc"><summary>算我还差多少抽／多少钻</summary><p>只填当前目标池承认的余额。「剩余抽数」要填距<b>必得目标</b>的数，不是距任意 SSR；不能指定目标的常驻池不适用。</p><div class="sb-filters">'+[['left','距必得目标还差几抽'],['ticket','该池能用的票（张）'],['price','池面每抽晶钻'],['dia','愿意投入的晶钻']].map(([k,t])=>'<label>'+t+'<input data-sb-num="'+k+'" type="number" min="0" step="1" inputmode="numeric" placeholder="按本号填写"></label>').join('')+'</div><output data-sb-out aria-live="polite">填完四项，就能看到能否覆盖本次保底。</output></details>'}
function sbCalc() {
 const inputs = document.querySelectorAll('[data-sb-num]');
 const values = Object.fromEntries(Array.from(inputs, input => [
   input.dataset.sbNum, input.value === '' ? NaN : Number(input.value)
 ]));
 const {left, ticket, price, dia} = values;
 const missing = Math.max(0, left - ticket);
 const cost = missing * price;
 const output = document.querySelector('[data-sb-out]');
 if (!Object.values(values).every(n => Number.isSafeInteger(n) && n >= 0) ||
     price <= 0 || !Number.isSafeInteger(cost)) {
   output.textContent = '请填写合理的非负整数，每抽单价须大于零。';
   return;
 }
 const balance = dia - cost;
 const decision = balance < 0
   ? '预算还差 '+(-balance)+' 钻，这轮先存。'
   : '当前预算能覆盖。预留之后，填入的预算还余 '+balance+' 钻可以另作安排。';
 output.textContent = '先用票后，最多还需 '+missing+' 抽（'+cost+' 钻）。'+decision;
}
function sbBudgetBox({showCalculator=false}={}) {
 const link=(label,url)=>'<a target="_blank" rel="noopener" href="'+encodeText(url)+'">'+encodeText(label)+' ↗</a>';
 const event=link('11 月活动公告',pullChannels.sources.nov[1]);
 const run=link('10/28 新号实录',pullBooks.run[1]);
 const rule=link('官方票种折算',pullChannels.sources.faq[1]);
 const server=link('S19 双倍范围',pullChannels.sources.s19[1]);
 return '<section id="summon-budget" class="sb-budget"><h3>普通票先攒，钻石先保下一张</h3>'+
  '<p><b>普通票（异格原型）</b>　11 月 5 日进服，先完成教程要求的常驻十连。用教程和培养计划拿到的角色能推图，剩下的票先收好。确有快到期的召唤任务，又值得拿奖励时，只用完成任务所需的普通票。 '+run+'</p>'+
  '<p><b>11 月 12 日 04:00 至 19 日 03:59（服务器时间）</b>　先开「祈祝之礼」看奖励档，再把原本准备花的普通票投进<b>常驻召唤</b>，只有这个入口计活动积分。若有同票种的原相目标，就先扣下它的预算。选现票够到、奖励有用的一档，领完就停。活动后队伍仍能推，就继续攒普通票。400、500 抽是新增奖励档，自选箱对应哪一档看活动页，差的抽数别拿钻补。 '+event+'</p>'+
  '<p><b>晶钻、极相原型</b>　还缺逆翎时，先给新手 UP 留预算；梨梨先查签到协议。两人都到手，再把下一份定向预算留给莉拉姆。目标池开前，普通池和商店刷新都分 <b>0 钻</b>。等池面能指定她，再按「距必得目标的抽数减去可用极相票」算需要多少钻。例：剩 30 抽、已有 12 张适用票，若池面每抽 300 钻，就先留 <b>5,400 钻</b>。手里若有 6,000 钻，可另作安排的最多 600 钻。300 是官方极相票统计折算，实际换票前看购买页。 '+rule+'</p>'+
  '<p><b>体力和养成材料</b>　我的零氪建议是平时买体力 <b>0 次</b>。先用自然回复和快到期的体力药。只有当天差一点就能解锁稳定刷的层、完成快到期的奖励，或能在双倍本刷到主队马上要用的材料，而且不会动到目标保底时，才考虑买当天最便宜的第一档，达成当天目标就停。缺经验刷秘闻调查，缺突破材料刷源点前哨，缺装备刷熔断禁区。专属晶格给对应角色，通用晶格先留到主力关键技能。 '+server+'</p>'+
  (showCalculator?sbBudgetForm():'')+'</section>';
}
function sbOriginal(){return '<article class="panel"><h3>完整节奏榜 · 万魔法典攻略组</h3><p>原作者的腾讯文档保留全部档位、觉醒行、PvP 栏和批注。下方本站速查只摘录与你抽卡有关的 PvE 高档，按 2026/10/20 这版计算。</p><details data-sb-frame><summary>在本页阅读作者原表</summary><div data-sb-mount></div></details>'+sbProof([pullBooks.live,pullBooks.log])+'</article>'}
let lastBoardView,lastBoardArg;
function summonBoard(page){
 // Clear scene when entering order from a different rank page; preserve all other manual filters.
 const sceneArg=location.hash.split('/')[2];if(page!==lastBoardView || (page==='ranks'&&sceneArg!==lastBoardArg)){sbState.scene=(page==='ranks'&&/^\d+$/.test(sceneArg||'')&&sbSceneOrder[Number(sceneArg)]!==undefined)?String(sbSceneOrder[Number(sceneArg)]):'all';lastBoardView=page;lastBoardArg=sceneArg}
 const intro='<section class="sb-board"><h3>T0 / T0.5：哪些先领，哪些再抽？</h3><p class="note">全 11 个 PvE 栏共 '+summonTop.rows.length+' 条高档记录，含觉醒形态。一个角色在兵祸是 T0，不代表在每个本都是 T0。</p>'+(page==='order'?'<p class="sb-first"><b>用票顺序：</b>先领任务本体 → 核对签到自选 → 确定缺口后才用对应池的票。 <button type="button" data-sb-budget>看资源分配／算保底 ↓</button></p>':'')+sbControls()+'<div data-sb-results>'+sbResult()+'</div></section>';
 return page==='order'?intro:sbOriginal()+intro;
}
function sbRefresh(){const target=document.querySelector('[data-sb-results]');if(target)target.innerHTML=sbResult()}
document.addEventListener('toggle',e=>{const el=e.target;if(!el.matches?.('[data-sb-frame]')||!el.open||el.querySelector('iframe'))return;const f=document.createElement('iframe');f.src=pullBooks.live[1];f.title='万魔法典攻略组 · 完整角色节奏榜';f.className='sb-frame';el.querySelector('[data-sb-mount]').append(f)},true);
document.addEventListener('change',e=>{if(e.target.matches('select[data-sb]')){sbState[e.target.dataset.sb]=e.target.value;sbRefresh()}});
document.addEventListener('input',e=>{if(e.target.matches('[data-sb="query"]')){sbState.query=e.target.value;sbRefresh()}if(e.target.matches('[data-sb-num]'))sbCalc()});
document.addEventListener('click',e=>{if(e.target.closest('[data-sb-budget]')){const section=document.querySelector('#summon-budget');section?.querySelector('summary')?.focus({preventScroll:true});section?.scrollIntoView({block:'start'});return}const b=e.target.closest('[data-sb-focus],[data-sb-clear]');if(!b)return;if(b.hasAttribute('data-sb-clear')){Object.assign(sbState,{scene:'all',tier:'all',query:'',category:'all'});document.querySelectorAll('[data-sb]').forEach(el=>el.value=sbState[el.dataset.sb]);sbRefresh();return}const row=document.querySelector('[data-sb-row="'+Number(b.dataset.sbFocus)+'"]');if(row){row.closest('details.sb-group-rows').open=true;const detail=row.querySelector('.sb-row');detail.open=true;detail.querySelector('summary').focus({preventScroll:true});detail.scrollIntoView({block:'center'})}});
