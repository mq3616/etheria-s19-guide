'use strict';
/* Pure owned-box planner. Scene indices follow allScenes() at f053a45.
 * A role-based trial is never promoted to a recorded team by completing its slots. */
function ownedTeamPlan(sceneIndex, ownedSet) {
 const owned=new Set(ownedSet instanceof Set||Array.isArray(ownedSet)?ownedSet:[]);
 const has=name=>owned.has(name);
 const first=names=>names.find(has);
 const L=['LilyQAQ · 2026/10/28 · 1–80级国服新号实录','https://www.taptap.cn/moment/864509086933189597'];
 const X=['x佛系摸鱼 · 2026/10/17修订 · 机制与选人示意，不是通关录像','https://www.taptap.cn/moment/860227779365438892'];
 const J=['璟璃佛系摸鱼 · 2026/10/28修订 · PvE用途评价','https://www.taptap.cn/moment/814947599944516602?group_id=333480'];
 const A=['千里漫漫 · 2026/10/02 · 国际服黑渊拿鹤五人实录与赛后面板','https://www.bilibili.com/video/BV1hjaU6BE5c/?t=187'];
 const D=['韶华阿斯加德 · 2026/09/04 · 觉醒谛听双人实战与替换说明','https://www.bilibili.com/video/BV1wstB6UEB7/?t=1'];
 const role={幻音千明:'拉条与加攻',炼:'清波输出',卡奇:'普通R控制位',格雷:'开局削弱过渡',克洛斯:'减益与破防',凌罗:'治疗与净化',逆翎:'驱散与减益铺垫',夜离:'群攻输出',瑞玛丽:'生命型输出',梨梨:'主攻再动与轮转',谛听:'单体输出',莉拉姆:'单体输出',缬草:'分摊与保护',蝰蛇:'减速与辅助对策',戍守卡奇:'免疫保护（非普通卡奇）',罗魍:'防御型输出',多琪:'队伍轮转辅助（英雄）',伯诺瓦:'单体持续输出',绯月鞠:'驻场光环',赫妍:'被动爆发核心',葵诺丝:'生命输出与追击',玄骊:'防御输出与结界',芙蕾雅:'增益与行动辅助',艾莉尔:'治疗净化与保核',旭光妮璐:'增伤与减伤辅助',宁芙涅:'护盾与免疫',达罗斯:'承伤复活候选（缺普通号实测）',什炎:'单体连动输出',闪萝:'持续输出候选（缺新号对照）',莎朗:'持续伤害输出（须目标可中毒）',荼蘼:'高难专项角色，主线职责未核实',酣梦一宵:'控制候选',拂秋:'保护对策',恶命:'嘲讽对策',水生绫:'辅助轮转候选'};
 const plan={members:[],order:[],train:[],evidence:'',level:'gap',limit:'',missing:[],sources:[]};
 const add=(name,label)=>{if(name&&has(name)&&!plan.members.some(p=>p.name===name))plan.members.push({name,role:label||role[name]||'机制位置待核实'});};
 const addAll=names=>names.forEach(n=>add(n));
 const need=(condition,text)=>{if(!condition)plan.missing.push(text);};
 const train=(names,verb)=>names.filter(name=>has(name)&&plan.members.some(p=>p.name===name)).forEach(name=>plan.train.push(name+'：'+verb));
 const core=()=>{
  const c=first(['谛听','莉拉姆','夜离','炼','瑞玛丽']);
  add(c);add(first(['逆翎','克洛斯']));add(first(['凌罗','缬草']));
  if(plan.members.length<4)add(first(['梨梨','幻音千明','戍守卡奇']));
  return c;
 };
 const trialNote='以下是按你已有角色的功能试配，未有同条件整队实测；先在可稳定通关的低难度试一次，不为这张名单新开抽卡或升级全队。';
 const empty=()=>{if(!plan.members.length){plan.level='gap';plan.order=['先继续能完成的主线与日常，不按原作的未拥有角色安排技能顺序。'];plan.train=[owned.size?'你已有角色记录，但本关缺少已核适用位置；保留通用材料，不为缺证高难追加养成。':'先在“我的角色”勾选已经获得的人；未勾选的赠角也不会被自动加入。'];}};
 if(sceneIndex===0){
  const n=has('逆翎'),y=has('夜离');
  plan.sources=[L,J];
  const c=first(['夜离','炼','瑞玛丽','葵诺丝','玄骊','莉拉姆','谛听','伯诺瓦','罗魍','赫妍','什炎','闪萝','莎朗']);
  add(n?'逆翎':first(['幻音千明','克洛斯','芙蕾雅','旭光妮璐','梨梨','多琪']));add(c);
  if(!n&&has('幻音千明'))add(first(['克洛斯','卡奇']));
  add(first(['凌罗','艾莉尔','缬草','宁芙涅','达罗斯']));
  for(const name of ['梨梨','克洛斯','幻音千明','芙蕾雅','旭光妮璐','多琪','卡奇','酣梦一宵','蝰蛇','戍守卡奇','拂秋','恶命','水生绫','格雷','荼蘼'])if(plan.members.length<4)add(name);
  plan.evidence=(n?(y?'已有逆翎＋夜离':'已有逆翎、没有夜离'):(y?'没有逆翎、已有夜离':'逆翎与夜离都没有'))+'。10/28新号原作确认千明＋炼＋卡奇＋格雷起步，克洛斯换格雷、领取凌罗后跟御三家任务；逆翎/夜离组合是本站按当前box的角色职责试配。';
  plan.level='trial';
  if(!n&&!y&&['幻音千明','炼','卡奇','格雷'].every(has)&&!has('克洛斯')&&!has('凌罗')&&!has('缬草')&&!has('梨梨')){
   plan.members=[];addAll(['幻音千明','炼','卡奇','格雷']);plan.level='recorded';
  }
  need(c,'已有记录里缺少明确输出位：先用现有辅助完成能过的任务，再补已领取的主攻；不默认你还拥有没有勾选的人');
  need(['凌罗','艾莉尔','缬草'].some(has),'治疗位：掉血卡关后再补，优先领取活动/任务的凌罗');
  plan.order.push(n?'逆翎的驱散/削弱赶在主攻之前；不指定未实测的速度数值。':has('幻音千明')?'千明先拉条加攻；已有克洛斯时让减益先于主攻生效。':plan.members.some(p=>p.name==='克洛斯')?'克洛斯先铺减益；其余位置顺序缺实测，不编固定行动轴。':'现有位置缺少实测配速，先按技能说明确认各自作用，不硬排辅助先动。');
  if(c)plan.order.push(c+(['夜离','炼','瑞玛丽'].includes(c)?'承担清波；队内有增益/削弱位时先让其铺垫，再用主攻技能。':'承担本队伤害试配；单体型逐个点怪，持续伤害型先确认目标不免疫。'));
  if(has('梨梨')&&plan.members.some(p=>p.name==='梨梨'))plan.order.push('梨梨开自动前核对实际拉起的人；这份试配没有验证自动目标和插队情况。');
  if(c)plan.train.push(c+(['夜离','炼','瑞玛丽'].includes(c)?'：先给一套可用清波输出装和等级，能推进就不同时练第二个C；瑞玛丽按生命倍率配装。':'：先用符合自身倍率的现有装备试一波，主线作用按角色用途推断，不是同队实录；不同时养第二个输出。'));
  if(c&&!['夜离','炼','瑞玛丽'].includes(c))plan.order.push(c+'是当前勾选中可承担伤害的候选；只用当前练度先测一波，不因角色可用就认定群怪清场和自动轴已验证。');
  for(const member of plan.members)if(member.name!==c&&!['逆翎','夜离','炼','瑞玛丽','克洛斯','凌罗'].includes(member.name))plan.train.push(member.name+'：仅补到能完成'+member.role+'，主攻尚能推进时不追加通用技能材料。');
  train(['克洛斯','凌罗'],'优先用本人专属任务资源，够完成当前减益/续航职责即可；领取以S19实际活动为准。');
  if(n)plan.train.push('逆翎：再补能赶在主攻前出手的速度与生存；没有门槛证据不盲追高速。');
  plan.limit='实录仅认证当时新号起步四人；其余换人骨架/夜离试配不等于作者完整通关阵容。瑞玛丽吃生命，不能照搬攻击型输出装备。御三家有专属资源，不为夜离先同时追加另一份通用技能投资。';
 }else if(sceneIndex===7){
  const original=['罗魍','多琪','梨梨','克洛斯','伯诺瓦'];addAll(original);plan.sources=[A];
  plan.missing=original.filter(n=>!has(n));plan.level=plan.missing.length?'partial':'recorded';
  plan.evidence='10/02国际服拿鹤实录的实际五人队；这里只保留已拥有的原队员，不把其他输出当等效替补。';
  plan.order=['作者面板速度：梨梨349 → 多琪337 → 克洛斯314 → 伯诺瓦229 → 罗魍220；仅作原作条件对照。','三个辅助先于两个输出建立窗口；战斗拉条会改变实际回合顺序，缺人时这条轴不成立。'];
  train(['克洛斯','梨梨','多琪'],'先检查能否在输出前完成辅助动作，不为复制数字牺牲生存。');
  train(['伯诺瓦','罗魍'],'原作伯诺瓦431%暴伤、罗魍3445防御是成型样本，先用当前练度试分，不以此作首周目标。');
  plan.limit='仅对应作者该期拿鹤。原作无同条件替补录像，缺人时返回的是部分成员而非可直接出战的队伍；角色齐全也不保证5928分。';
 }else if(sceneIndex===8){
  addAll(['瑞玛丽','逆翎','凌罗']);plan.sources=[L];plan.level='partial';
  need(has('瑞玛丽'),'瑞玛丽');need(has('逆翎'),'逆翎');need(has('凌罗'),'凌罗');plan.missing.push('善雅：原文未明确SR/SSR形态，暂不认定已勾选的同名/异形态满足原队');
  plan.evidence='10/28作者自述四人玛丽＋逆翎＋善雅＋绫罗；统一显示瑞玛丽、凌罗。善雅形态未能确认，不能把目前三人标成完整原阵。';
  plan.evidence+=' 原作要求凌罗320以上速度先开大免疫，善雅浴血堆生命。';
  plan.order=['80级才考虑觉醒本；原作没有明确这次挑战的难度。',has('凌罗')?'已有凌罗时，先验证320以上速度开大免疫；其余三人内部顺序未给出。':'当前缺已证开场免疫位置，先不挑战这套觉醒作业。'];
  train(['凌罗'],'先验证320以上速度与开场免疫能否复现，不把这个速度挪到所有副本。');
  train(['瑞玛丽','逆翎'],'原作没有完整面板/技能阈值；先保留原队方向，暂不为未确认善雅的队伍追极限装备。');
  plan.limit='受限觉醒槽位不塞任意御三家或其他已勾选角色。善雅虽有浴血堆生命的说明，但身份未确认，返回缺口而非猜一个角色；本原作也没有可验证的替补。';
 }else if(sceneIndex===9){
  plan.sources=[D];add('赫妍');
  const partner=first(['绯月鞠','逆翎']);add(partner,partner==='逆翎'?'原作者建议的破甲替位，未展示替换胜利':undefined);
  need(has('赫妍'),'赫妍：原视频被动爆发核心');need(partner,'绯月鞠；或原作者建议但未在同片实战的逆翎');
  plan.level=has('赫妍')&&has('绯月鞠')?'recorded':has('赫妍')&&has('逆翎')?'trial':'partial';
  plan.evidence='9/04原片双人绯月鞠＋赫妍，实际战斗后胜利页42秒。绯月鞠换逆翎是作者提出的破甲方向，不是原片第二套实战。';
  plan.order=['本关只允许破序与虚相性，不给受限觉醒硬塞普通御三家或治疗。',!has('赫妍')?'你缺少这套实录的爆发核心；当前先不为它追加养成。':partner==='逆翎'?'先验证逆翎破甲能否覆盖赫妍爆发，片中没有替换后的明确速度轴。':partner==='绯月鞠'?'绯月鞠提供驻场光环，核心靠赫妍被动输出；原作没有要求两人固定几速。':'先保留赫妍现有装备；配套辅助缺失时不按双人速刷追加投资。'];
  train(['赫妍'],'参考狂怒＋洞悉穿刺＋暴烈利刃；样本攻4372、速230、暴击96%、暴伤404%，作者注明面板偏高，不能作最低门槛。');
  if(partner)plan.train.push(partner+'：先确保完成'+(partner==='绯月鞠'?'光环':'破甲')+'职责，不在核心缺失时先养替位。');
  plan.limit='觉醒谛听是关卡，不能把勾选己方谛听当作补上Boss的位置。缺赫妍时没有这套速刷核心，先做其他可完成的觉醒目标；不承诺两人任意练度42秒。';
 }else if(Number.isInteger(sceneIndex)&&sceneIndex>=1&&sceneIndex<=6){
  plan.sources=[L,X,J];plan.level='trial';
  if(sceneIndex===1){
   const c=core();need(c,'可用主攻');need(has('凌罗')||has('缬草'),'能让主攻存活的治疗/保护');
   plan.evidence='10月资料确认娜娜刷取时机、武者/疾驰匠目标及炼狱虚相性惩罚，没有认证本返回阵容。'+trialNote;
   plan.order=['先核对当前难度对虚相性伤害惩罚；有被克制角色时先降低难度，不以高稀有硬顶。','先让已有辅助铺垫、主攻输出；未有同条件配速和自动证据，不列固定先后。'];
   if(c)plan.train.push(c+'：缺输出智壳再刷武者，先用正确主词条；辅助按需补疾驰匠。');
   plan.limit='已有角色试配，不是2025旧版嘲讽队复用。先能刷哪档就刷哪档；没有速度/生存证据，不承诺炼狱挂机。';
  }else if(sceneIndex===2){
   add(first(['逆翎','克洛斯']));add(first(['谛听','莉拉姆','夜离','炼','瑞玛丽']));add(first(['缬草','凌罗']));if(plan.members.length<4)add(first(['梨梨','凌罗','戍守卡奇']));
   need(has('逆翎'),'敌方免疫的驱散方案：缺逆翎时本模块没有核实等效替位');
   plan.evidence='10/17示意可确认谛听、缬草；10/28实录另有逆翎过渡智壳。把已拥有位置组合是试配，不是同一原作完整队。';
   plan.order=['先检查免疫能否解除；克洛斯是减益位，不能直接补掉驱散缺口。','优先攻击手，再慢打本体；前轮存活不足先补保护，不急着把辅助改成第二C。'];
   train(['缬草','凌罗'],'先解决首轮死亡；有减员会让Boss再动。');train(['逆翎'],'先用胡狼/黑旗/匠，能速刷后才考虑为万魔专门投入。');
   plan.limit='炼狱对异相性额外伤害、开场免疫与推条抗性需按当前说明核对。没有已有角色的最低面板，队伍少人也不补无依据的相性角色。';
  }else if(sceneIndex===3){
   add(first(['卡奇','酣梦一宵']),'控制候选，是否对当前目标生效须试');if(!plan.members.length)add('蝰蛇');add(first(['逆翎','克洛斯']));add(first(['夜离','炼','瑞玛丽','谛听','莉拉姆']));if(plan.members.length<4)add(first(['凌罗','戍守卡奇','缬草']));
   need(has('卡奇')||has('酣梦一宵'),'能真正生效的控制：减速、免疫保护不自动算控制');
   plan.evidence='10/17只确认控制解除减伤，以及蝰蛇、戍守卡奇的选人示意；10/28另提启示录逆翎补群攻。控制候选及组合属于功能推断。';
   plan.order=['先在当前难度试控制能否移除减伤，再交输出技能；控制未生效先停下，不靠加攻击硬刷。','逆翎启示录是作者缺群攻时的方向；这里不保证逆翎加蝰蛇就等于整队控制和清波齐备。'];
   train(['卡奇','酣梦一宵'],'只在技能确认对目标生效后补速度/命中，不给未经核实的命中硬门槛。');train(['逆翎'],'已有启示录可试补群攻，先看首波能否处理。');
   plan.limit='不将戍守卡奇当普通卡奇，也不把蝰蛇减速自动算合格硬控。炼狱帮手对理相性有额外伤害；未证替换不能保证挂机。';
  }else if(sceneIndex===4){
   add('凌罗');add(first(['谛听','莉拉姆','夜离','炼','瑞玛丽']));add(first(['逆翎','克洛斯']));add(first(['梨梨','缬草','幻音千明']));
   need(has('凌罗'),'已证治疗位置凌罗；其余治疗没有同条件替换实证');
   plan.evidence='10/17示意有梨梨、逆翎、谛听；10/28两份原创确认凌罗及治疗配置。合并box候选不等于已认证四人队。';
   plan.order=['先让治疗解决盾的限制，再让主攻打有效伤害；近期来源未给固定通用速度轴。','带梨梨时看主攻被拉起后是否抢在治疗前，不照抄旧版240/270速表。'];
   train(['凌罗'],'优先大招满和治愈8件；作者炼狱用大招加被动缓回，不必未经验证先刷超新星。');
   train(['谛听','莉拉姆','夜离','炼','瑞玛丽'],'先确认治疗窗口后才补伤害，当前出战主攻只投入一位。');
   plan.limit='奶量是该账号经验，不是任意队伍保证；无凌罗返回的是缺治疗的试配，不能用缬草名字填成等效替代。炼狱虚相性惩罚也需核对。';
  }else{
   const c=core();need(c,'已培养的主攻');
   plan.evidence=(sceneIndex===5?'10/28仅确认莎朗40级按任务推进。':'10/28仅确认赫妍45级可补胡狼、双倍后再集中刷智壳。')+trialNote;
   plan.order=['先用当前主队在任务要求难度试一轮，记录第一处失败：生存、输出还是机制。','没有近期已有角色的完整轴，不指定必须谁一速；不要因试配页出现四人就直接挑战炼狱。'];
   if(c)plan.train.push(c+'：沿用已有输出装，能完成任务先不换C。');train(['凌罗'],'先保证已有主攻能完成回合；缺续航才加投入。');
   plan.train.push(sceneIndex===5?'莎朗按任务所需次数推进，不为未经证实的速刷队追加培养。':'需要替换黑旗时再补胡狼；新号双倍阶段先把装备本刷稳。');
   plan.limit='近期完整配队、替补、最高难度面板仍有缺口，本结果只是可控成本的试法。此处角色赫妍/英雄莎朗与同名Boss分开处理。';
  }
 }else{
  plan.evidence='没有对应场景索引。';plan.limit='支持allScenes的0–9；没有匹配时不借用其他副本队伍。';plan.missing=['有效场景索引'];
 }
 if(sceneIndex===0&&plan.members.length===1)plan.order=['当前只录了'+plan.members[0].name+'，还排不出队内先后；先完成能单独通过的任务，补齐已获得角色的记录后再配队。'];
 if(Number.isInteger(sceneIndex)&&sceneIndex>=1&&sceneIndex<=6){
  const selected=new Set(plan.members.map(p=>p.name));
  const damage=['谛听','莉拉姆','夜离','炼','瑞玛丽'].some(n=>selected.has(n));
  need(damage,'伤害位尚不完整：当前未选出已核主攻；辅助的群攻方案仍需装备与实战确认');
  need(['凌罗','缬草','戍守卡奇'].some(n=>selected.has(n)),'治疗/保护缺口：先在低难度确认能否存活，当前没有已选的续航或保护位置');
 }
 if(Number.isInteger(sceneIndex)&&sceneIndex>=0&&sceneIndex<=6&&plan.members.length>0&&plan.members.length<4)plan.missing.push('当前只匹配到'+plan.members.length+'个候选位置，尚不足四人；先从已有主队补齐缺失功能，不为此追抽指定角色');
 empty();
 return plan;
}
