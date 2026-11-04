'use strict';
const dailyRankClip='https://www.bilibili.com/video/BV1fEnpzcEmH/';
const marchRank='https://www.taptap.cn/moment/783092314758187535';
const currentRank='https://www.taptap.cn/moment/814947599944516602?group_id=333480';
const roleRefs=refs=>'<div class="chapter-list">'+refs.map(([label,url])=>'<a target="_blank" rel="noopener" href="'+encodeText(url)+'">'+encodeText(label)+' ↗</a>').join('')+'</div>';
const starterScene={
  name:'主线与多波小怪',goal:'新号先用活动能拿到的三人，到了群怪关再挑主攻。这里按成队成本排培养步骤。',
  order:[['先有负责清场的人 · 炼','璟璃把炼、克洛斯、凌罗列为开荒组合。炼先用已有输出装；抽到夜离已有可用装备时，也可以让她承担清波。'],['再补破防与保命 · 克洛斯、凌罗','克洛斯先于主攻施加削弱，凌罗负责治疗。没领齐前，沿用格雷或手里的治疗。两人到账后用各自的专属培养资源。'],['再补一个能让主攻击中窗口的辅助 · 梨梨或芙蕾雅','梨梨让核心再次行动。自动选人要核对攻击面板，生命型瑞玛丽有可能吃不到拉条。芙蕾雅则为攻击型队伍提供全队增益与行动条支持。']],
  team:'LilyQAQ 的 1–80 级低配实录从幻音千明＋炼＋卡奇＋格雷开始：千明拉条和加攻，炼清怪；领到克洛斯后让她替换格雷，凌罗到手再建立三人核心。作者实录的领取章节属于当时账号；S19 按新区培养任务的实际到账进度换人。',
  rotation:'手动试一波：削弱先生效 → 攻击型主攻吃增益 → 主攻清场。梨梨要拉主攻时，看敌方破防是否已经出现；开自动后再看一次实际被拉的是谁。',
  limit:'此处是新号培养顺序。沐什么春风把成型瑞玛丽列入开荒 T0，但她的技能吃生命，炼的攻击套不能整套照搬。没有固定要求在第几天换掉炼。',
  sources:[['LilyQAQ · 2026/10/28 · 低配实录的完整起始四人和换人顺序','https://www.taptap.cn/moment/864509086933189597'],['璟璃佛系摸鱼 · 新手推图三人组与专属资源',currentRank],['沐什么春风 · 2026/03/17 · 群攻与单体适用面',marchRank],['Limbo_Prime · 2025/09/25 · 00:40 梨梨自动选择目标',dailyRankClip+'?t=40'],['国服官方 · S19 培养计划与 14 日任务', 'https://www.taptap.cn/moment/866719390408642161?group_id=333480']]
};
const budgetSupport='https://www.taptap.cn/moment/783092934781175571';
const budgetProfiles=[
 {name:'缬草',role:'增攻与保护',priority:'已有时先看生存压力。沐什么春风把缬草放在开荒辅助推荐里，理由是一人能兼顾进攻和保护。',scene:'队友能扛住一击、需要在下轮爆发前重新拉回血线时，分摊血线、治疗与无敌都有价值。',team:'飞鸥不下灬的奥洛拉手动队把她放在梨梨、逆翎、凌罗、夜离之后。此队同时带凌罗，分工是保护与补治疗。',build:'先复现所抄队伍里的行动位置，关注缬草能否活到保命技能出手。攻克需要先治疗的机制时，实战顺序比练成第二个纯奶更重要。',limit:'掉血太快、单靠她奶不回来时，先保留凌罗。S19 列出的免费赠送角色不含缬草。',sources:[['沐什么春风 · 2026/03 · 开荒辅助原帖',budgetSupport],['飞鸥不下灬 · 2025/10 · 奥洛拉手动队的尾速缬草','https://www.bilibili.com/video/BV1gz4nzhEv4/?t=5']]},
 {name:'卡奇',role:'低稀有控制与行动条',priority:'需要控小怪时优先试这张 R 卡。这里指普通卡奇。',scene:'莎朗和赫妍的实战都有卡奇的上场位。先确认打算控制的小怪是否吃控。',team:'宇宙级乱斗选手的莎朗自动队用卡奇、梨梨和夜离，第四人有水生绫与缬草两种示范。卡奇提供控制，夜离负责输出。',build:'先保证卡奇能及时行动，再看控制是否命中；点自动后确认目标顺序。卡奇练到能完成这两件事，再考虑额外强化。',limit:'戍守卡奇是另一名角色。关卡只需要补治疗或目标免控时，把位置交给治疗或增益位。',sources:[['宇宙级乱斗选手 · 2025/10 · 炼狱莎朗自动目标','https://www.bilibili.com/video/BV1Ff4DzFECa/?t=5'],['沐什么春风 · 2026/03 · 卡奇适用关卡',budgetSupport]]},
 {name:'恶命',role:'低稀有嘲讽',priority:'打妮可娜娜需要有人接住攻击时再投入。已有可用的嘲讽方案就先沿用。',scene:'适合目标能被嘲讽、队伍输在后排被干扰的关。恶命能借被动续航。',team:'b站新阳的低配娜娜实录用谛听＋梨梨＋恶命＋凌罗：谛听专打单体，梨梨给他再动，恶命和凌罗腾出安全输出时间。',build:'先把资源投到能扛住被嘲讽敌人的攻击，并核对实际上嘲讽的目标；稳定后再给谛听补伤害。',limit:'缺破防或输出超时是另一种问题，增加恶命练度不能替代主攻。其余副本需重新看控制抗性。',sources:[['b站新阳 · 2025/10 · 妮可娜娜低配实战','https://www.bilibili.com/video/BV1N6HLzoE2q/?t=135'],['沐什么春风 · 2026/03 · 嘲讽与回血机制',budgetSupport]]}
];
// Explicit original-video casts: alternates and boss names never become team members.
const sceneCasts=[
 ['幻音千明','炼','卡奇','格雷'],
 ['谛听','梨梨','恶命','凌罗'],
 ['拂秋','逆翎','缬草','梨梨','夜离'],
 ['酣梦一宵','水生绫','缬草','梨梨','夜离'],
 ['梨梨','逆翎','凌罗','夜离','缬草'],
 ['卡奇','梨梨','夜离','水生绫'],
 ['莉拉姆','卡奇','逆翎','梨梨'],
 ['梨梨','莉拉姆','凌罗','戍守卡奇','克洛斯']
];
const sceneMapKeys=['','nana','binghuo','duoqi','aoluola','shalang','heyan',''];
const rankFaces=[
 [['梨梨','夜离','逆翎','凌罗'],['克洛斯']],
 [['逆翎','瑞玛丽'],['莉拉姆','谛听','夜离','玄骊','伯诺瓦','梨梨']],
 [['葵诺丝','逆翎'],['炼','克洛斯','凌罗']]
];
function rosterPeople(){
 const detailed=[...window.coreProfiles,...window.strongProfiles,...budgetProfiles];
 const names=[...new Set([...rankFaces.flat(2),...sceneCasts.flat(),'艾莉尔','莎朗',...Object.keys(window.peopleArt||{})])];
 return detailed.concat(names.filter(name=>!detailed.some(p=>p.name===name)).map(name=>{
  const sceneIndex=sceneCasts.findIndex(team=>team.includes(name));
  const scenes=[starterScene,...window.sceneRanks];
  const refs=sceneIndex>=0?scenes[sceneIndex].sources:rankFaces[1].flat().includes(name)?[['沐什么春风 · 2026/03/17 · 开荒角色评价',marchRank]]:[['璟璃佛系摸鱼 · 角色培养评价',currentRank]];
  return {name,role:'角色认人',brief:true,sources:refs};
 }));
}
function personFaces(names,label){
 const people=rosterPeople(),e=encodeText;
 return '<div class="roster-faces" aria-label="'+e(label)+'">'+names.map(name=>{
  const idx=people.findIndex(p=>p.name===name),art=artEntry('people',name);
  return '<a class="roster-face" href="#roster/person/'+idx+'">'+(art?'<img loading="lazy" decoding="async" src="'+e(art.src)+'" alt="">':'<span class="face-empty" aria-hidden="true">'+e(name.slice(0,1))+'</span>')+'<strong>'+e(name)+'</strong></a>';
 }).join('')+'</div>';
}
function rankingOverview(){
 const row=(label,desc,names)=>'<section class="rank-tier"><h4>'+label+'</h4>'+personFaces(names,label)+'<p>'+desc+'</p></section>';
 let authorIndex=0;
 const selectedAuthor=[0,1,2].includes(state.rankAuthor)?state.rankAuthor:0;
 const study=(title,body)=>{const i=authorIndex++;return '<details class="rank-author" data-author="'+i+'" '+(i===selectedAuthor?'open':'')+'><summary>'+title+'</summary><div class="rank-author-body">'+body+'</div></details>'};
 const b=study('01 · Limbo_Prime｜2025 国服公测 · 日常副本',
  row('最高档 · 同档不分先后','原片依次讲协战拉条、群攻追击、驱散减益和群体治疗。作者评价多个日常副本的出场面及投入回报。',rankFaces[0][0])+
  row('下一档 · 克洛斯','减速、破防与额外易伤，培养比逆翎容易。低一档的理由是属性和副本覆盖面。炼在片中单列，按新手任务投入。',rankFaces[0][1])+
  roleRefs([['原片 00:32 · 梨梨的 511 起点',dailyRankClip+'?t=32'],['00:48 · 夜离的技能投资',dailyRankClip+'?t=48'],['01:12 · 逆翎的驱散与减益',dailyRankClip+'?t=72'],['01:36 · 凌罗的群体治疗',dailyRankClip+'?t=96'],['02:06 · 克洛斯为什么低一档',dailyRankClip+'?t=126']]),true);
 const m=study('02 · 沐什么春风｜2026 年 3 月 · 新号开荒',
  row('T0 · 两种职责','逆翎创造输出窗口；瑞玛丽靠生命倍率、群攻和击杀连动清场。',rankFaces[1][0])+
  row('T0.5 · 六人同档','作者看好莉拉姆的短回合单体爆发，也指出迅速清小怪时她会吃亏；技能材料少时，SR 谛听是对单选择。',rankFaces[1][1])+
  roleRefs([['沐什么春风 · 2026/03/17 · 原帖梯度与逐人说明',marchRank]]));
 const c=study('03 · 璟璃佛系摸鱼｜11 月 4 日核对 · 培养优先级',
  row('并列第一 · 作者明确评价','葵诺丝偏压制和输出，逆翎偏辅助；作者列举了葵诺丝的黑渊狩场、暗笼激斗用途。',rankFaces[2][0])+
  row('新区先上场 · 专属资源三人','同一篇推荐三名领得到专属资源的角色推图。',rankFaces[2][1])+
  '<p>原文还看好下列人物，但没有逐名排位：</p>'+personFaces(['瑞玛丽','玄骊','艾莉尔','莉拉姆','梨梨','莎朗'],'未逐名排序的人物')+
  roleRefs([['璟璃佛系摸鱼 · 原帖角色分析（本页只取 PvE 段）',currentRank],['S19 官方 · 免费与 UP 获取途径',src.s19[1]]]));
 return '<div class="related"><b>刚进新区</b><a href="#roster/scene/0">千明＋炼＋卡奇＋格雷的起步队 →</a></div><p class="lead">点击作者展开一份排序，点击头像看角色。各作者的时间与评判场景不同；同档不强行分先后。</p><div class="rank-studies roster-ranks">'+b+m+c+'</div>';
}
function libraryPicker(kind,items,idx){
 const label=kind==='person'?'选择角色':'选择场景';
 return '<label class="note" for="roster-pick">'+label+' · 共 '+items.length+' 项</label><select class="choice" id="roster-pick" data-kind="'+kind+'">'+items.map((item,i)=>'<option value="'+i+'" '+(idx===i?'selected':'')+'>'+encodeText(item.name)+'</option>').join('')+'</select>';
}
function roleLibrary(section,topic){
 const kind=['scene','person','rank'].includes(section)?section:'rank';
 const modes=[['rank','作者优先级'],['scene','按场景配队'],['person','逐个看角色'],['0','按职责速查']];
 const links='<div class="libnav" aria-label="角色攻略">'+modes.map(([id,t])=>'<a href="#roster/'+id+'" '+(id===kind?'aria-current="page"':'')+'>'+t+'</a>').join('')+'</div>';
 let body='';
 if(kind==='rank')body=rankingOverview();
 else{
  const scenes=[starterScene,...window.sceneRanks],items=kind==='scene'?scenes:rosterPeople();
  const index=Number(topic),idx=Number.isInteger(index)&&index>=0&&index<items.length?index:0,item=items[idx],e=encodeText;
  body=libraryPicker(kind,items,idx);
  if(kind==='scene'){
   const picture=artEntry('maps',sceneMapKeys[idx]);
   body+=panel('roster-scene','实证阵容 / 点击队员',e(item.name),
    '<p class="lead">'+e(item.goal)+'</p>'+personFaces(sceneCasts[idx]||[],'原作主阵容')+
    '<p class="note">'+(idx===5?'展示原片实例 A；实例 B 的缬草替换见下方。':idx===0?'低配实录的起始四人；领取角色后的换人见下方。':'仅列下方原作主阵容，替选不计入队员。')+'</p>'+
    (picture?makePlates([picture],'maps scene-photo'):'')+
    '<details class="scene-plan" open><summary>阵容与出手顺序</summary>'+step([['出场阵容',e(item.team)],['出手与技能',e(item.rotation)]])+'</details>'+
    '<details class="scene-plan"><summary>功能优先级与替换限制</summary>'+step(item.order.map(pair=>pair.map(e)))+step([['适用范围',e(item.limit)]])+'</details>'+
    '<details class="scene-plan"><summary>原作者与实战出处</summary>'+roleRefs(item.sources)+'</details>');
  }else{
   const portrait=artEntry('people',item.name);
   const related=scenes.map((scene,i)=>(sceneCasts[i]||[]).includes(item.name)?'<a href="#roster/scene/'+i+'">'+e(scene.name)+' →</a>':'').filter(Boolean).join('');
   const identity=item.name==='莎朗'?'<p class="note">这里是可培养的英雄莎朗；副本里的莎朗 Boss 请从场景页进入。</p>':'';
   const intro='<div class="person-intro">'+(portrait?makePlates([portrait],'portraits person-portrait'):'<div class="person-no-art">'+e(item.name)+'<small>角色图片待补充</small></div>')+'<div><div class="label">'+e(item.role)+'</div><h3>'+e(item.name)+'</h3>'+identity+(item.brief?'<p>此条用于认人。暂未整理独立培养详解，先按有出处的原作阵容查看。</p>':'<p class="stripe">'+e(item.priority)+'</p>')+'</div></div>';
   body+=panel('roster-person','角色 / 认人与用途','角色档案',intro+
    '<section class="person-scenes"><h4>在哪些原作阵容上场</h4>'+(related?'<div class="libnav">'+related+'</div>':'<p class="note">当前收录的原作主阵容未列此人；作者评价见优先级栏目。</p>')+'</section>'+
    (item.brief?'':step([['用在哪',e(item.scene)],['跟谁上场',e(item.team)],['先给什么资源',e(item.build)],['什么时候换人',e(item.limit)]]))+
    '<details><summary>攻略与图片出处</summary>'+roleRefs(item.sources||[])+(portrait?roleRefs([[portrait.credit,portrait.url]]):'')+'</details>');
  }
 }
 return head('角色与配队','03 / PvE ROSTER')+links+body+'<details><summary>萌新术语 · 511、拉条、短轴</summary><p>技能写成 511，表示一、二、三技能分别为 5、1、1 级。拉条是让队友提早行动；短轴是用少数几轮打完战斗。低配作业也要核对技能和装备，尤其是先手顺序。</p></details>';
}
document.addEventListener('change',e=>{if(e.target.id==='roster-pick')location.hash='roster/'+e.target.dataset.kind+'/'+e.target.value;});
document.addEventListener('toggle',e=>{if(!e.target.matches?.('.rank-author[open]')||!e.target.isConnected)return;state.rankAuthor=Number(e.target.dataset.author);save();for(const other of document.querySelectorAll('.rank-author[open]'))if(other!==e.target)other.open=false;},true);
