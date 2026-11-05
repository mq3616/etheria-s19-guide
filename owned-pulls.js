/* 国服 S19，2026-11-05。按实际缺口和获取渠道判断；名册不等于当前定向池。 */
(function (root) {
 'use strict';
 const official=['官方 S19 · 赠送、双UP与新手定向','https://www.taptap.cn/moment/866719390408642161?group_id=333480'];
 const run=['LilyQAQ · 10/28 国服新号1—80级','https://www.taptap.cn/moment/864509086933189597?group_id=333480'];
 const review=['璟璃 · 10/28 角色用途点评（非同练度竞速榜）','https://www.taptap.cn/moment/814947599944516602?group_id=333480'];
 const farm=['佛系摸鱼 · 10/17 兵祸与奥洛拉角色及出手','https://www.taptap.cn/moment/860227779365438892'];
 const selector=['韶华 · 6/17 SS5建议中仍提新人第2天自选','https://www.taptap.cn/moment/816136040531101395'];
 const event=['官方 · 11月常驻积分与当前版本','https://www.taptap.cn/moment/866390674507827526'];
 const initial=['官方开发者日志 · 初期普池含光暗及盛典协议设计','https://www.taptap.cn/moment/712685122675018666'];
 const box='先查本号活动有没有「盛典之邀」和第2天极相自选协议。旧官方名单含梨梨、莉拉姆等7人，6月攻略仍提这项；尚无11月本号奖励页，不能保证白送，也不能因为S19公告未写就认定取消。';
 function ownedPullPlan(owned,budget,goal='start'){
  const has=n=>owned.has(n),first=names=>names.find(has),list=names=>names.filter(has);
  const wave=first(['葵诺丝','瑞玛丽','夜离','夏妲','弥瑟亚','柯洛罗','千羽']);
  const single=first(['莉拉姆','谛听','伯诺瓦','赫妍','什炎','吉安克']);
  const sustain=first(['艾莉尔','斐莫莉安','米娅','缇亚马特','缬草','凌罗','宁芙涅']);
  const turn=first(['梨梨','多琪','玄骊','幻音千明','芙蕾雅','月夜见','艾罗安']);
  const decision=(title,action,next,basis,sources)=>({title,action,next,basis,sources,budgetTarget:''});
  const after='主线能过后按卡点切换目标：刷源器差第二轮看梨梨，首领一轮伤害不足看单体，缺保护看生存；黑渊另按当期首领组队。';
  const banner=(name,reason)=>{
   const advice=budget==='covered'?'你已确认这个池的保底够：决定投入就拿首只，之后重排缺口。':budget==='short'?'核实共享范围后仍不够保底就先存票；两个池能否合并计算以本号池面规则为准。':'先读本号池面：票种、截止时间和距目标必得还差多少抽，能覆盖再决定。';
   return {...decision((budget==='short'?'先存票，目标留给':'新人 UP 可选：')+name,reason+advice,after,'S19确认新人逆翎/夜离UP。推荐按职责与现有队伍判断，未将原相、极相、超限、常驻和新手定向的保底混算。',[official,run,review]),budgetTarget:name};
  };
  if(goal==='waves'){
   if(wave)return decision('先让已有的'+wave+'负责清波','集中一套符合角色倍率的输出装，先试当前小怪关；并非清波角色之间任意装备都能互换。','如果已经能清波，就把夜离池预算转为后续定向/自选缺口；没过先检查速度、暴击和伤害窗口。','这些角色在10月点评中有群体输出用途，但没有它们在你同练度账号的横向通关对照。',[review,run,official]);
   return banner('夜离','现有名单未勾到已核群攻候选。先用炼；想立刻补清波才考虑夜离，愿意等任务瑞玛丽可保留预算。');
  }
  if(goal==='boss'){
   if(single)return decision('首领先试已有的'+single,'已有单体不必先追另一位。先让减益覆盖主攻，并在当前首领试打；赫妍等专项型尤其要核对触发条件。',has('梨梨')?'你已有梨梨，检查她能否在正确窗口拉起主攻，再按失败点调装。':box+' 若一轮打得疼而次数不够，可把能选梨梨的名额给她。','普通谛听有10月国服源器作业；其他打手用途取自10月点评，单体定位不证明能在所有首领等效互换。',[farm,review,selector]);
   return decision('缺单体：自选里再比较莉拉姆','先查已经抽出的普通SR谛听。确实没有适合当前首领的主攻、且手头协议包含莉拉姆，再考虑用名额解决伤害缺口。',box+' 只有当前首领一轮伤害不足时，单体才可能排到轮转辅助前。','莉拉姆的首领用途来自10月点评，不是所有自选或新手定向都包含她，也没有S19同装换人竞速对照。',[review,farm,selector,official]);
  }
  if(goal==='turns'){
   if(has('梨梨'))return decision('已有梨梨，先把再动给正确的主攻','检查自动拉起目标和治疗/减益窗口；主攻一轮伤害足够时，再动价值才会兑现。','之后按生存、首领或黑渊缺口选人，不重复把梨梨列成下一抽。','10月国服兵祸与奥洛拉均有梨梨拉谛听的具体行动说明。',[farm,review]);
   return decision('缺主攻再动：优先核对梨梨自选',box,'已有'+(turn||'幻音千明等过渡辅助')+'先用来提供各自的行动增益；多琪/玄骊的群体轮转、千明拉条与梨梨指定主攻再动不能视为同一个机制。','国服两份源器作业支持梨梨的位置；是否已有新手协议要查本号，不能一律写成等未来UP。',[farm,selector,initial]);
  }
  if(goal==='survive'){
   return decision(sustain?'生存先试已有的'+sustain:'先领凌罗，再判断保护缺口',sustain?'治疗、净化、分摊、免疫各解不同问题；已有'+sustain+'先检查当前首领需要的是哪一项，不因另一位榜高就换。':'S19培养计划能领凌罗，宁芙涅走14日系列任务。先用固定资源把现有治疗/保护养到能完成机制。','高难仍缺净化/保核可比较艾莉尔、斐莫莉安；缺分摊可比较缇亚马特、缬草。当期达罗斯是承伤复活对策，先看新版本实测，不把上述人全列成必抽。','机制用途来自10月作者点评和11月官方说明。当前没有同练度整队替换实录证明某治疗能跨所有关卡等效。',[official,review,event]);
  }
  if(goal==='abyss'){
   const present=list(['魁洛','桑提克','荼蘼','柯洛罗','伯诺瓦','葵诺丝','莎朗','梨梨','玄骊']);
   return decision('黑渊/暗笼：按本期首领补关键位',present.length?'已拥有可查专项用途的角色：'+present.join('、')+'。先从这些人匹配当期Boss和限制，勿直接拼成一支无实测的队。':'先选本期Boss、再查机制和队伍。魁洛、桑提克、荼蘼、柯洛罗、伯诺瓦等都有作者提及的专项用途，缺名字不等于都要抽。','11/12–19常驻积分箱含魁洛、柯卡尔迪、席琳丝；自然够档且缺对应位置再选。主线党不为冲分先追齐专项角色，毒免首领也不能照抄莎朗。','这里依据10月用途点评生成候选，不是给你承诺本期最高分或同条件五人实战；需要与当期Boss作业再核。',[review,event]);
  }
  if(goal==='mechanics'){
   return decision(has('莎朗')?'已有莎朗：先查首领是否吃持续伤害':'毒伤/控制是专项缺口，先查机制',has('莎朗')?'目标能吃持续伤害时可试莎朗，免疫毒时不能靠这个位置解决；不要据此认定单卡可通所有本。':'先用已有R/SR控制或毒手试机制：卡奇、恶命、蝰蛇、方格斯、奥波尔各有不同职责。需要毒伤体系再比较莎朗，不为角色索引里出现名字就新养一队。','如果实际缺的是开场免疫、净化或保护，请切换生存目标；需要打特定觉醒本，先核相性和原作条件。','10月角色点评给到莎朗的持续伤害适用范围和低稀有对策；实际能否生效以目标说明和当前难度为准。',[review,farm]);
  }
  if(goal==='future'){
   const ownedLong=list(['葵诺丝','玄骊','艾莉尔','莎朗','斐莫莉安','魁洛','桑提克','荼蘼','柯洛罗','伯诺瓦']);
   return decision('长期预算：输出、保核、专项分别补',ownedLong.length?'你已经有这些长期/专项候选：'+ownedLong.join('、')+'。先看实际能覆盖哪些关卡，再比较缺的功能。':'把葵诺丝/玄骊的输出与轮转、艾莉尔/斐莫莉安的保核、莎朗的毒伤和黑渊专项角色分开比较。没有通用的“抽齐这几张就毕业”。','能指定目标时才比较本体价值；UP结束不等于无法常驻获取。最新角色和超限例外必须读收录表，未官宣的新池也不编复刻日期。','10月作者点评支持这些角色的不同用途，不构成所有人都要抽的绝对排名，也不证明当前每张都在同一池。',[review,initial,event]);
  }
  if(!has('逆翎'))return banner('逆翎',wave?'已拥有'+wave+'，群攻不作为第一缺口；逆翎补驱散与减益。免费克洛斯能帮你推进时，也可先保留预算。':'新人期先比较逆翎的驱散减益，主攻先用炼。已有其他强力输出/辅助也应勾全，才不会重复补同一职责。');
  if(has('梨梨')){
   const refs=[farm,review,official,['万魔法典 · 分本评级','https://docs.qq.com/sheet/DSGxZd05GYmNXa0pN?tab=7ptfa0']];
   if(!has('莉拉姆')&&!single)return decision('下一张等莉拉姆','逆翎破防，梨梨给主攻再动。等能指定莉拉姆的极相定向或她自己的 UP，凑够目标保底拿首只。','已有能稳定过本的单体时改等玄骊；先倒人则先用免费凌罗。','11/5 未核到下一期莉拉姆日期。国服评级和角色点评支持这一单体用途。',refs);
   if(!has('玄骊'))return decision('先试已有单体，打得过再等玄骊','先用'+single+'，让梨梨拉主攻打目标本。若能稳定通过，下一次包含玄骊的极相定向或角色 UP 再投入。','若仍缺单体且还没有莉拉姆，优先等莉拉姆；若先减员，先补免费凌罗。','这是按持有角色给出的资源取舍。不同首领的触发条件和装备仍需试打。',refs);
   return decision('已有玄骊和单体，先存票','先让手里的主攻与梨梨过本；能推进就保留下一份定向预算。','需要生存时先试凌罗；准备打黑渊再选本期专项位。','按本号缺口留资源。',refs);
  }
  const opportunities=[];
  opportunities.push({label:'先查领取页 · 梨梨/莉拉姆条件自选',text:box,goal:'turns',button:'按轮转缺口比较 →'});
  if(!wave)opportunities.push({label:'新手池换目标 · 夜离可选',text:'想立即补清波、且核对新手池换目标后的剩余保底仍够再抽；能等任务瑞玛丽则不抢这笔。',goal:'waves',button:'按夜离目标算预算 →'});
  opportunities.push({label:'中后期仍有抽取目标',text:'输出候选葵诺丝、玄骊；生存保核艾莉尔、斐莫莉安；持续伤害莎朗；黑渊/暗笼再看魁洛、桑提克、荼蘼、柯洛罗、伯诺瓦。先选下面要解决的卡点，不按名单依次追抽。',goal:'future',button:'看长期候选 →'});
  opportunities.push({label:'11/12–19 · 计划内常驻券',text:'祈祝之礼的积分箱含柯卡尔迪、魁洛、席琳丝；没有梨梨、莉拉姆。先看真实奖励档，不为凑档拿晶钻盲捞。',goal:'abyss',button:'看黑渊专项缺口 →'});
  const title='逆翎已有：先查自选，再补实际缺口';
  return {...decision(title,'已勾到'+(wave?'群攻'+wave:'群攻未勾，教程炼领到后先用')+'；'+(single?'单体'+single:'首领输出尚需按当前卡点核对')+'；'+(sustain?'续航/保护'+sustain:'固定赠送凌罗先领')+'。主线能推时先别重复抽相同职责。',box+' 若主攻伤害够，优先比较梨梨的再动；伤害不足则先查已有单体。','按你的实际勾选和玩法选项给出候选；已结合国服实录、用途点评、历史协议和当前S19规则，未将任何来源未确认的卡写成正在UP。',[official,run,farm,review,selector,event]),opportunities};
 }
 root.ownedPullPlan=ownedPullPlan;
 if(typeof module!=='undefined'&&module.exports)module.exports=ownedPullPlan;
})(typeof window!=='undefined'?window:globalThis);
