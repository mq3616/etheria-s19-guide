'use strict';
const legacyMapKeys=['','nana','binghuo','duoqi','aoluola','shalang','heyan',''];
const octoberRun=['LilyQAQ · 10/28 新号从 1 到 80 级的实际路线','https://www.taptap.cn/moment/864509086933189597?group_id=333480'];
const octoberReview=['璟璃佛系摸鱼 · 10/28 修订 · PvE 角色点评','https://www.taptap.cn/moment/814947599944516602?group_id=333480'];
const serverDetails=['国服公告 · S19 赠送与召唤名单','https://www.taptap.cn/moment/866719390408642161?group_id=333480'];
const roleRefs=refs=>'<div class="chapter-list">'+refs.map(([label,url])=>'<a target="_blank" rel="noopener" href="'+encodeText(url)+'">'+encodeText(label)+' ↗</a>').join('')+'</div>';
const starterScene={
 name:'主线与多波小怪', goal:'先进剧情，再用到账的赠角逐个换位。下列开局四人来自 10 月新号实录，S19 的到账时间看自己的活动页。',
 teamComplete:true,verifiedTeam:['幻音千明','炼','卡奇','格雷'],teamLabel:'开局四人 · 10/28 新号实录',
 team:'幻音千明、炼、卡奇、格雷。千明先拉行动条并加攻，炼负责清怪。能过关就继续推剧情，不用为开局重新抽号。',
 rotation:'先让千明把队友拉起来。克洛斯到手后换掉格雷，让削弱先于炼的主攻生效。领到凌罗后，保留炼和克洛斯，过不去的波次用凌罗稳住血线。',
 order:[['先给炼现有输出装','十月实录用炼起步。普通关仍能清波，就不必再抽一个群攻。'],['削弱位先换，治疗位看掉血','克洛斯和凌罗有 S19 培养计划及专属晶格；领取以新号实际条件为准。'],['再补辅助或主攻','伤害够而打不进窗口，优先看逆翎。能活但清不掉多波，先试任务给的瑞玛丽，再决定夜离值不值得花一份限定预算。']],
 limit:'低配实录来自开服前的新号。出手和换位可以照着试，剧情领取章节不作为 S19 的承诺。',sources:[octoberRun,serverDetails,octoberReview]
};
const originalPeople=['炼','克洛斯','凌罗','逆翎','梨梨','芙蕾雅','谛听','宁芙涅','葵诺丝','玄骊','艾莉尔','莉拉姆','夜离','瑞玛丽','莎朗','缬草','卡奇','恶命','伯诺瓦','幻音千明','格雷','拂秋','酣梦一宵','水生绫','戍守卡奇'];
const briefDecisions={
 '缬草':'十月评价列入可培养的觉醒 SR。队里已有凌罗时，先检查关卡是否真的需要第二个保护位。',
 '卡奇':'10 月新号用普通卡奇推开局。能用现有练度通过就保留，在这个位置还没卡关前，先投入主攻。',
 '恶命':'10 月点评仅确认部分高难有用。没有近期同难度的固定阵容可照抄，先留着，不为娜娜专门提练。',
 '伯诺瓦':'10/02 国际服拿鹤计分队的两位输出之一。作者面板为 229 速度、431% 暴击伤害。把这个练度留作成型参考。',
 '罗魍':'十月国际服拿鹤计分实录用她与伯诺瓦一同输出。零氪首周先用拿得到的打手。',
 '多琪':'十月国际服拿鹤实录的辅助。此处是己方英雄多琪，同名源器 Boss 的打法见副本页。',
 '幻音千明':'十月新号起手四人之一。利用教程智壳先出手，给炼创造清场机会。',
 '格雷':'十月新号先用格雷，克洛斯到账后接替他的铺垫位。过渡时够上场就行。',
 '蝰蛇':'十月的多琪配队示意里有他。先确认技能能处理你当前层的机制，再投资命中和速度。',
 '绯月鞠':'9 月觉醒谛听实录中提供驻场光环。作者提出缺她可试逆翎破甲，原片的 42 秒成绩使用的是绯月鞠。',
 '赫妍':'9 月觉醒谛听双人队的爆发核心。样本暴击伤害 404%，已有她且有接近的装备才值得模仿。',
 '戍守卡奇':'与普通卡奇分开。十月点评提到这是可觉醒 SR；没有近期完整队时，不把觉醒投资排到主力前。'
};
function allScenes(){return [starterScene,...window.sceneRanks]}
function rosterPeople(){
 const profiles=new Map([...window.coreProfiles,...window.strongProfiles,...(window.currentHeroes||[])].map(p=>[p.name,p]));
 const names=new Set([...originalPeople,...profiles.keys(),...allScenes().flatMap(s=>s.verifiedTeam||[])]);
 return [...names].map(name=>{
  if(profiles.has(name))return profiles.get(name);
  const scenes=allScenes().filter(scene=>scene.verifiedTeam?.includes(name));
  const sources=scenes.length?scenes[0].sources:briefDecisions[name]?[octoberReview]:[];
  return {name,role:'角色速查',brief:true,sources,
   priority:briefDecisions[name]||'尚缺近期国服 PvE 培养依据。先用现有练度试本，暂缓通用晶格。'};
 });
}
function personFaces(names,label){
 const people=rosterPeople();
 return '<div class="roster-faces" aria-label="'+encodeText(label)+'">'+names.map(name=>{
  const index=people.findIndex(p=>p.name===name);
  if(index<0)return '';
  const art=artEntry('people',name);
  const avatar=art?'<img loading="lazy" decoding="async" src="'+encodeText(art.src)+'" alt="">':'';
  return '<a class="roster-face" href="#roster/person/'+index+'">'+avatar+'<strong>'+encodeText(name)+'</strong></a>';
 }).join('')+'</div>';
}
function rankingOverview(){
 const sections=[
  ['先养谁','进剧情先用炼，拿到克洛斯就替下格雷，缺续航再上凌罗。三人有专属培养资源。零氪把第一套能用的输出装交给炼，资源不足时先练这一队。',['炼','克洛斯','凌罗'],[octoberRun,serverDetails]],
  ['第一笔限定给谁','喜欢辅助铺垫、主攻收尾，先考虑逆翎首只。10 月低配新号用她一路打到 80 级，近期作者也认可她的泛用性。预算不够保底就继续用克洛斯。夜离补群伤，而 S19 的 14 日任务还会给瑞玛丽，已有清场位可以停抽。',['逆翎','夜离','瑞玛丽'],[octoberRun,octoberReview,serverDetails]],
  ['已经出了更强的输出，换哪一格','已有葵诺丝，优先在输出位与炼对照，特别是之后要打黑渊或暗笼时。她不承担逆翎的辅助职责。缺的是单体爆发才看莉拉姆；遇到能吃持续伤害的目标，才另试莎朗。两者都不用为推普通剧情另开一队。',['葵诺丝','莉拉姆','莎朗'],[octoberReview]],
  ['新卡和觉醒，哪些现在用','十月的什炎限定在 11/4 结束；S19 次日开服，首抽不围绕他组队。旭光妮璐到手再看增伤位。普通 SR 谛听在 9 月新增觉醒，须到 80 级且全技能满，比较首周阵容时按未觉醒算。达罗斯是承伤与复活位。你这条爆发路线先用免费的凌罗稳血，把限定预算留给实际缺口。',['什炎','旭光妮璐','谛听','达罗斯','闪萝','荼蘼'],[src.octpatch,src.awake,src.dar,src.nicole]]
 ];
 const opened=Array.isArray(state.rankOpen)?state.rankOpen:[Number(state.rankAuthor)||0];
 const cards=sections.map(([title,body,names,refs],i)=>'<details class="rank-author" data-author="'+i+'" '+(opened.includes(i)?'open':'')+'><summary>'+String(i+1).padStart(2,'0')+' · '+title+'</summary><div class="rank-author-body"><p>'+body+'</p>'+personFaces(names,title)+roleRefs(refs)+'</div></details>').join('');
 return '<p class="lead">国服 S19 · 11 月 4 日开服前校订。顺序按你作为零氪 PvE 新人的资源安排；角色页区分当期实测、技能说明和暂缓投资。</p><div class="related"><b>第一支队怎么站？</b><a href="#roster/scene/0">看 10 月新号的开局四人和换人顺序 →</a><a href="#roster/scene/7">后期 · 国际服拿鹤五人队 →</a><a href="#roster/scene/9">觉醒谛听 · 双人速刷与替代 →</a></div><div class="rank-studies roster-ranks">'+cards+'</div>';
}
function libraryPicker(kind,items,idx){
 const label=kind==='person'?'选择角色':'选择场景';
 return '<label class="note" for="roster-pick">'+label+' · 共 '+items.length+' 项</label><select class="choice" id="roster-pick" data-kind="'+kind+'">'+items.map((item,i)=>'<option value="'+i+'" '+(idx===i?'selected':'')+'>'+encodeText(item.name)+'</option>').join('')+'</select>';
}
function roleLibrary(section,topic){
 const kind=['mine','scene','person','rank','tiers'].includes(section)?section:'mine';
 const modes=[['mine','我的角色配队'],['tiers','PvE 强度表'],['rank','新区培养顺序'],['scene','按场景配队'],['person','逐个看角色'],['0','按职责速查']];
 const links='<div class="libnav" aria-label="角色攻略">'+modes.map(([id,t])=>'<a href="#roster/'+id+'" '+(id===kind?'aria-current="page"':'')+'>'+t+'</a>').join('')+'</div>';
 if(kind==='tiers')return head('PvE 角色强度表','国服 S19')+tierTable()+jump('draw','按我已有的角色决定下一抽')+jump('roster/mine','回到我的配队');
 let body='';
 if(kind==='mine')body=ownedPlanner(topic);
 else if(kind==='rank')body=rankingOverview();
 else{
  const scenes=allScenes(),items=kind==='scene'?scenes:rosterPeople();
  const index=Number(topic),idx=Number.isInteger(index)&&index>=0&&index<items.length?index:0,item=items[idx],e=encodeText;
  body=libraryPicker(kind,items,idx);
  if(kind==='scene'){
   const picture=artEntry('maps',item.mapKey||legacyMapKeys[idx]);
   body+=panel('roster-scene','国服 PvE / 场景核对',e(item.name),
    '<p class="lead">'+e(item.goal)+'</p>'+jump('roster/mine/'+idx,'用我的角色配这关')+'<p class="stripe">'+e(item.teamLabel||'尚缺近期同场景完整队伍')+'</p>'+
    personFaces(item.verifiedTeam||[],'原文点名队员')+
    (picture?makePlates([picture],'maps scene-photo'):'')+
    '<details class="scene-plan" open><summary>本场怎么打</summary>'+step([['已核实的配置',e(item.team)],['出手与技能',e(item.rotation)]])+'</details>'+
    '<details class="scene-plan"><summary>什么时候换人或换刷法</summary>'+step(item.order.map(pair=>pair.map(e)))+step([['适用范围',e(item.limit)]])+'</details>'+
    '<details class="scene-plan"><summary>本场的资料和日期</summary>'+roleRefs(item.sources)+'</details>');
  }else{
   const portrait=artEntry('people',item.name);
   const related=scenes.map((scene,i)=>(scene.verifiedTeam||[]).includes(item.name)?'<a href="#roster/scene/'+i+'">'+e(scene.name)+' →</a>':'').filter(Boolean).join('');
   const identity=item.name==='莎朗'?'<p class="note">这里是可培养的英雄莎朗；副本里的莎朗 Boss 请从场景页进入。</p>':'';
   const intro='<div class="person-intro">'+(portrait?makePlates([portrait],'portraits person-portrait'):'<div class="person-no-art">'+e(item.name)+'<small>角色图片待补充</small></div>')+'<div><div class="label">'+e(item.role)+'</div><h3>'+e(item.name)+'</h3>'+identity+('<p class="stripe">'+e(item.priority)+'</p>')+'</div></div>';
   body+=panel('roster-person','角色 / 认人与用途','角色档案',intro+
    '<section class="person-scenes"><h4>近期哪些场景点名用到</h4>'+(related?'<div class="libnav">'+related+'</div>':'<p class="note">当前收录的近期副本实录未点名此人。</p>')+'</section>'+
    (item.brief?'':step([['用在哪',e(item.scene)],['跟谁上场',e(item.team)],['先给什么资源',e(item.build)],['什么时候换人',e(item.limit)]]))+
    (item.availability?step([['S19 获取',e(item.availability)],['同位替换',e(item.replacement)]]):'')+
    '<details><summary>攻略与图片出处</summary>'+roleRefs(item.sources||[])+(portrait?roleRefs([[portrait.credit,portrait.url]]):'')+'</details>');
  }
 }
 return head('角色与配队','03 / PvE ROSTER')+links+body+'<details><summary>萌新术语 · 511、拉条、短轴</summary><p>技能写成 511，表示一、二、三技能分别为 5、1、1 级。拉条是让队友提早行动；短轴是用少数几轮打完战斗。低配作业也要核对技能和装备，尤其是先手顺序。</p></details>';
}
document.addEventListener('change',e=>{if(e.target.id==='roster-pick')location.hash='roster/'+e.target.dataset.kind+'/'+e.target.value;});

document.addEventListener('toggle',event=>{
 const card=event.target;
 if(!card.matches?.('details.rank-author')||!card.isConnected)return;
 state.rankOpen=Array.from(document.querySelectorAll('.rank-author[open]'),el=>Number(el.dataset.author));
 save();
},true);
