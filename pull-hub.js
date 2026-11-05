'use strict';
const pullViews=[['order','先抽谁'],['ranks','分本节奏榜'],['channels','卡池与自选'],['catalog','角色索引'],['basis','榜单原文'],['mine','按我的角色算']];
function pullTabs(key){return '<div class="libnav" aria-label="抽卡攻略">'+pullViews.map(([id,t])=>'<a href="#draw/'+id+'" '+(id===key?'aria-current="page"':'')+'>'+t+'</a>').join('')+'</div>'}
const pullBooks={
 atlas:['GameKee · 国服中文角色图鉴','https://www.gamekee.com/yise/'],
 guide:['TapTap 攻略站 · 榜单与工具目录','https://www.taptap.cn/app/236627/topic?type=strategy'],
 sheet:['光之瑞拉、芥末、七老爷 · 全角色分析原帖','https://www.taptap.cn/moment/709067279190462383'],
 live:['作者维护的腾讯文档 · 查看逐本 PvE 与独立 PvP 栏','https://docs.qq.com/sheet/DSGxZd05GYmNXa0pN?tab=7ptfa0'],
 log:['全角色表 · 修订日志（最近一条 2026/10/20）','https://docs.qq.com/sheet/DSGxZd05GYmNXa0pN?tab=bl899r'],
 lala:['lala · 分功能 PvE 榜原帖（2025 测试期）','https://www.taptap.cn/moment/709541535162565339'],
 lance:['lance · 节奏榜 6.1（RTA 选禁）','https://www.taptap.cn/moment/847522802398397107?group_id=333480'],
 review:['璟璃 · 10/28 修订，角色培养优先级','https://www.taptap.cn/moment/814947599944516602?group_id=333480'],
 farm:['佛系摸鱼 · 10/17 兵祸与奥洛拉实战','https://www.taptap.cn/moment/860227779365438892'],
 run:['LilyQAQ · 10/28 新号 1–80 级路线','https://www.taptap.cn/moment/864509086933189597?group_id=333480'],
 kui:['官方 · 葵诺丝上一期 UP 时间','https://www.taptap.cn/moment/851171629613450759']};
function pullLinks(keys){return roleRefs(keys.map(k=>pullBooks[k]||pullChannels.sources[k]).filter(Boolean))}
const ratedScenes={"多琪":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","炼狱津","高难"],"渺渺":["多琪"],"弥瑟亚":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","高难"],"夜离":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","炼狱津","柯洛罗","刺血大公","维斯佩拉","高难"],"瑞玛丽":["重构兵祸","多琪","奥洛拉","猎焰赫妍","炼狱津","柯洛罗","刺血大公","高难"],"斐莫莉安":["重构兵祸","多琪","奥洛拉","莎朗","柯洛罗","刺血大公","高难"],"玄骐":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","刺血大公","高难"],"皮耶娜":[],"孽女善雅":["重构兵祸","妮可娜娜","猎焰赫妍","高难"],"梨梨":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","刺血大公","高难"],"莉拉姆":["重构兵祸","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","刺血大公","高难"],"海因里希":["重构兵祸","多琪","奥洛拉","妮可娜娜","猎焰赫妍","炼狱津","柯洛罗","高难"],"逆翎":["重构兵祸","多琪","奥洛拉","妮可娜娜","猎焰赫妍","炼狱津","柯洛罗","刺血大公","高难"],"罗魍":["重构兵祸","奥洛拉","妮可娜娜","炼狱津","柯洛罗","刺血大公","高难"],"玄骊":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","刺血大公","维斯佩拉","高难"],"莎朗":["重构兵祸","妮可娜娜"],"艾莉尔":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","刺血大公","维斯佩拉","高难"],"葵诺丝":["高难"],"克洛斯":["重构兵祸","多琪","妮可娜娜","猎焰赫妍","炼狱津","柯洛罗","高难"],"拂秋":["重构兵祸","多琪","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","高难"],"席琳丝":["多琪","猎焰赫妍"],"莉露摩卡":["多琪","炼狱津"],"芙蕾雅":["重构兵祸","多琪","莎朗","猎焰赫妍","炼狱津","维斯佩拉","高难"],"赫妍":["重构兵祸","高难"],"莉莉斯":["多琪"],"罗喉":["多琪","炼狱津","高难"],"水生绫":["重构兵祸","多琪","莎朗","柯洛罗","高难"],"奈薇忒":["多琪","柯洛罗","高难"],"伯诺瓦":["重构兵祸","多琪","柯洛罗","高难"],"奥萨尔":["多琪","高难"],"纳伽兰":["多琪","猎焰赫妍","维斯佩拉"],"欧里亚斯":[],"拿鹤":["多琪","妮可娜娜","猎焰赫妍","炼狱津","高难"],"荼蘼":["奥洛拉","妮可娜娜","柯洛罗","刺血大公","高难"],"博尔涅":[],"月夜见":["多琪","奥洛拉","妮可娜娜","猎焰赫妍","高难"],"夏妲":["多琪","奥洛拉","妮可娜娜","高难"],"缇亚马特":["多琪","奥洛拉","妮可娜娜"],"凌罗":["多琪","奥洛拉","妮可娜娜","炼狱津","柯洛罗","高难"],"宁芙涅":["多琪","奥洛拉","妮可娜娜","猎焰赫妍","炼狱津","柯洛罗","高难"],"贝兹比":["多琪","奥洛拉","炼狱津","高难"],"佩希思":[],"吉安克":[],"络薇":[],"魁洛":["多琪","奥洛拉","妮可娜娜","炼狱津","刺血大公","高难"],"丹弗里":[],"闪萝":[],"赫尔基德":["维斯佩拉","高难"],"维罗妮卡":["重构兵祸"],"赫同":["重构兵祸","奥洛拉"],"彼安汀":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","高难"],"炼":["重构兵祸","高难"],"米娅":["重构兵祸","奥洛拉","妮可娜娜","莎朗","炼狱津","高难"],"柯洛罗":["重构兵祸","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","高难"],"柯卡尔迪":["重构兵祸","妮可娜娜","炼狱津","高难"],"光狩谛听":["重构兵祸","妮可娜娜","莎朗","刺血大公","高难"],"桑提克":["重构兵祸","妮可娜娜","莎朗","高难"],"千羽":["重构兵祸","妮可娜娜","莎朗","维斯佩拉","高难"],"克索司":["重构兵祸","奥洛拉","妮可娜娜","炼狱津","刺血大公","维斯佩拉"],"西尔维娅":[],"艾罗安":["重构兵祸","奥洛拉","妮可娜娜","莎朗","炼狱津","高难"],"什炎":["重构兵祸"],"多乐丝":[],"马维尔":["重构兵祸","妮可娜娜","高难"],"缬草":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","炼狱津","高难"],"凛心戴娜":["重构兵祸"],"谛听":["重构兵祸","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","炼狱津","柯洛罗","刺血大公","高难"],"戍守卡奇":["重构兵祸","妮可娜娜","莎朗","炼狱津","高难"],"维克托":[],"妮璐":["重构兵祸","多琪","奥洛拉","妮可娜娜","莎朗","猎焰赫妍","高难"],"绯月鞠":["重构兵祸","多琪","妮可娜娜","莎朗","猎焰赫妍"],"水月真":["重构兵祸"],"善雅":["炼狱津","高难"],"格雷":["重构兵祸","多琪","高难"],"幻音千明":["重构兵祸","多琪","莎朗","猎焰赫妍","高难"],"勉":[],"酣梦一宵":["多琪"],"旭光妮露":["高难"],"奥波尔":["多琪","妮可娜娜","猎焰赫妍","高难"],"炀":["多琪","高难"],"砺行阿凛":[],"RC-77":["多琪","妮可娜娜","高难"],"胧":[],"克拉肯":["多琪","妮可娜娜","猎焰赫妍","高难"],"蝰蛇":["奥洛拉","妮可娜娜","炼狱津","柯洛罗","高难"],"希尔芙":["多琪","奥洛拉","高难"],"寻愿多乐丝":["重构兵祸","奥洛拉","妮可娜娜","莎朗","猎焰赫妍"],"千明":["重构兵祸","奥洛拉","炼狱津","高难"],"阿凛":["重构兵祸","炼狱津","高难"],"杜兰铎":["重构兵祸","妮可娜娜","高难"],"方格斯":["重构兵祸","妮可娜娜","猎焰赫妍","高难"],"黛纳":["重构兵祸","奥洛拉","妮可娜娜","柯洛罗","高难"],"风见一宵":["重构兵祸","奥洛拉","妮可娜娜","莎朗","高难"],"恶命":["重构兵祸","多琪","炼狱津","高难"],"41号":[],"阿灰":["高难"],"安德鲁（坚盾）":[],"西比尔":[],"卡奇":["妮可娜娜","猎焰赫妍","炼狱津"],"安德鲁（突击）":[]};
const pullRankEvidence={"多琪": 9, "渺渺": 10, "弥瑟亚": 11, "夜离": 12, "瑞玛丽": 13, "斐莫莉安": 14, "玄骐": 15, "皮耶娜": 16, "孽女善雅": 17, "梨梨": 18, "莉拉姆": 19, "海因里希": 20, "逆翎": 21, "罗魍": 22, "玄骊": 23, "莎朗": 24, "艾莉尔": 25, "葵诺丝": 26, "克洛斯": 27, "拂秋": 28, "席琳丝": 29, "莉露摩卡": 30, "芙蕾雅": 31, "赫妍": 32, "莉莉斯": 33, "罗喉": 34, "水生绫": 35, "奈薇忒": 36, "伯诺瓦": 37, "奥萨尔": 38, "纳伽兰": 39, "欧里亚斯": 40, "拿鹤": 41, "荼蘼": 42, "博尔涅": 43, "月夜见": 44, "夏妲": 45, "缇亚马特": 46, "凌罗": 47, "宁芙涅": 48, "贝兹比": 49, "佩希思": 50, "吉安克": 51, "络薇": 52, "魁洛": 53, "丹弗里": 54, "闪萝": 55, "赫尔基德": 56, "维罗妮卡": 57, "赫同": 58, "彼安汀": 59, "炼": 60, "米娅": 61, "柯洛罗": 62, "柯卡尔迪": 63, "光狩谛听": 64, "桑提克": 65, "千羽": 66, "克索司": 67, "西尔维娅": 68, "艾罗安": 69, "什炎": 70, "多乐丝": 73, "马维尔": 74, "缬草": 75, "缬草（觉醒）": 76, "凛心戴娜": 77, "谛听": 78, "谛听（觉醒）": 79, "戍守卡奇": 80, "戍守卡奇（觉醒）": 81, "维克托": 82, "妮璐": 83, "绯月鞠": 84, "水月真": 85, "善雅": 86, "善雅（觉醒）": 87, "格雷": 88, "幻音千明": 89, "勉": 90, "酣梦一宵": 91, "旭光妮露": 92, "奥波尔": 93, "炀": 94, "砺行阿凛": 95, "RC-77": 96, "RC-77（觉醒）": 97, "胧": 98, "克拉肯": 99, "蝰蛇": 100, "蝰蛇（觉醒）": 101, "希尔芙": 102, "寻愿多乐丝": 103, "千明": 104, "阿凛": 105, "杜兰铎": 106, "杜兰铎（觉醒）": 107, "方格斯": 108, "黛纳": 109, "戴娜（觉醒）": 110, "风见一宵": 111, "恶命": 113, "41号": 114, "阿灰": 115, "安德鲁（坚盾）": 116, "西比尔": 117, "卡奇": 118, "安德鲁（突击）": 119};
const nameVariations={'旭光妮璐':['旭光妮露'],'砥行阿凛':['砺行阿凛'],'凛心黛娜':['凛心戴娜'],'安德鲁':['安德鲁（突击）'],'孽女善雅':['孽生之棘·善雅']};
function pullAliases(n){return [...(pullRoster.aliases[n]||[]),...(nameVariations[n]||[])]}
const knownPullNames=new Map(pullRoster.rows.flatMap(([k])=>[k,...pullAliases(k)].map(v=>[v,k])));
function pullCanonical(n){return knownPullNames.get(n)||n}
function catalogLink(name){return '<a href="#draw/catalog/'+encodeURIComponent(pullCanonical(name))+'">'+encodeText(name)+'</a>'}
const pairPriority = [
 {title:'先等莉拉姆', names:['莉拉姆'], reason:'最缺一个专打首领的输出。'},
 {title:'已有可靠的单体输出，再等玄骊', names:['玄骊'], reason:'跨本持续输出，也能缩短全队技能冷却。'},
 {title:'经常减员才提前拿', names:['艾莉尔','斐莫莉安'], reason:'治疗保护优先看艾莉尔。若主要输在控制和减益，再比较斐莫莉安。先试任务给的凌罗。'},
 {title:'已有就练，有明确缺口再花票', names:['葵诺丝','玄骐','夜离','罗魍','莎朗','伯诺瓦','荼蘼','桑提克','魁洛','柯洛罗','克索司'], reason:'葵诺丝留作后期主攻候选。玄骐、夜离要看现有输出能否替代。莎朗看毒免，黑渊计分再考虑伯诺瓦、荼蘼、桑提克、魁洛、柯洛罗。'},
];
function remainingPairGroups(){
 const fixed=new Set(['逆翎','梨梨','幻音千明','克洛斯','凌罗','瑞玛丽','宁芙涅']);
 const rows=summonTop.rows.filter(([name])=>!fixed.has(name)&&!name.endsWith('（觉醒）'));
 const groups=pairPriority.map(item=>({...item}));
 const named=new Set(groups.flatMap(item=>item.names));
 const others=rows.filter(([name])=>!named.has(name));
 const singleScene=others.filter(r=>r[2]==='SSR'&&r[3].length===1);
 const specialists=new Set(singleScene.map(r=>r[0]));
 groups.push({title:'暂缓专抽，打到对应本再看',names:others.filter(r=>r[2]==='SSR'&&!specialists.has(r[0])).map(r=>r[0]),reason:'先按正在打的首领选队。已有逆翎、梨梨时，这些位置还可以用已经领到或练好的队员。'});
 groups.push({title:'只在一个评级栏进高档，先跳过',names:singleScene.map(r=>r[0]),reason:'点名字能查该本和票种。「高难」是原作者的综合栏。芙蕾雅用新手定向，席琳丝有积分箱机会，各按自己的渠道比较。'});
 groups.push({title:'低稀有角色随票拿，不专抽',names:others.filter(r=>r[2]!=='SSR').map(r=>r[0]),reason:'尤其留意普通 SR 谛听，拿到就可让梨梨拉他刷兵祸、奥洛拉。觉醒投入看本体，另在完整榜查。'});
 return groups;
}
function pullOrderPage(){
 const groups=remainingPairGroups();
 return '<article class="pair-plan"><h3>下一张，等莉拉姆</h3>'+
 '<p>逆翎负责破防，梨梨能让主攻再出手。按你喜欢的爆发打法，先补一个打首领的单体主攻。莉拉姆在兵祸、奥洛拉等 8 个具体副本是 T0。</p>'+
 '<p class="pair-action"><strong>现在存极相原型和晶钻。</strong>等名单含莉拉姆的「极相·定向召唤」，或她自己的限定 UP。11 月 5 日还没查到下一期开池日期。能覆盖目标保底时拿首只就停。</p>'+
 '<p><b>手里已经有普通 SR 谛听？</b>先让梨梨拉他打兵祸、奥洛拉。如果能稳定过，把下一份定向留给<b>玄骊</b>，补持续输出和全队减冷却。若是队伍先倒，先练免费凌罗，仍站不住才把<b>艾莉尔</b>提前。</p><p>'+['逆翎','梨梨','莉拉姆'].map(skillProfileLink).join('　')+'</p></article>'+
 sbBudgetBox({showCalculator:true})+'<section class="pair-skip"><h3>这几个 T0 可以先跳过</h3><p><b>海因里希</b>只有兵祸一栏到 T0，已有逆翎能驱散。<b>莉露摩卡</b>只有多琪到 T0，先用任务瑞玛丽清场。<b>拂秋</b>只有莎朗本到 T0，等真卡在这关再考虑。</p><p>开服的夜离先让位给任务瑞玛丽；当前达罗斯池给承伤和复活，这份极相票继续留给输出。</p></section>'+
 '<details class="draw-detail" data-pair-priority><summary>查看剩余 '+groups.reduce((n,g)=>n+g.names.length,0)+' 个本体的抽取优先级</summary>'+groups.map(g=>'<section class="pair-band"><h4>'+encodeText(g.title)+'</h4><p>'+encodeText(g.reason)+'</p><div>'+g.names.map(catalogLink).join('　')+'</div></section>').join('')+'</details>'+
 '<details class="draw-detail"><summary>看排序依据和卡池日期</summary><p>这是按已有逆翎、梨梨的零氪账号做的取舍。10/20 玩家榜逐本评级，10/28 角色点评说明莉拉姆的单体用途。10/17 有梨梨配普通谛听的国服作业；暂无 S19 同装备换成莉拉姆的竞速对照。</p><p>玄骊在 11 栏里有 10 栏达到 T0 或 T0.5。葵诺丝在原表只有「高难」T0.5，但另一位作者看好她的长期输出，所以打黑渊时仍值得比较。9 月开过极相定向，11/4 更新确认当期极相限定为达罗斯。</p>'+pullLinks(['live','review','farm','sep','nov','s19'])+'</details>'+
 '<details class="draw-detail"><summary>查任务与全部 T0 / T0.5 角色</summary>'+summonBoard('order')+'</details>'+pullTabs('order');
}
function pullChannelPage(){
 return '<p class="lead">按你的账号核对领取页和召唤详情。「历史上有」与「本服确定能拿」分开写。先找固定奖励，再把票分给解决当前卡点的池。</p>'+pullChannels.channels.map(c=>'<details class="draw-detail"><summary>'+encodeText(c.title)+'</summary><p class="note">'+encodeText(c.when)+'</p>'+(c.names.length?'<p>'+c.names.map(catalogLink).join('　')+'</p>':'')+'<p>'+encodeText(c.rule)+'</p><p><b>你的操作：</b>'+encodeText(c.action)+'</p>'+pullLinks(c.names.includes('逆翎')?['s19','merge','faq']:c.source==='jun'?['launch','merge','jun','s19']:c.source==='s19'&&c.names.includes('炼')?['run','s19']:[c.source])+'</details>').join('');
}
function pullBasisPage(){
 const groups=[
 ['国服规则｜能不能拿','S19 官方公告确认新人双 UP、培养计划与 14 日任务；11/4 更新公告确认常驻积分箱。六月攻略提过次日光暗自选，但不是十一月每个新区必发的证据。',['s19','nov','jun']],
 ['名册范围｜怎么查漏','国服中文图鉴提供本体和稀有度基准；再用 11/4 公告补上达罗斯。查到名字不等于查到强度，没有评级或近期实战时不强行定档。',['atlas','nov']],
 ['国服培养点评｜哪些值得投入','10/28 修订的角色长评覆盖输出、辅助和专本角色。用于解释职责和培养候选，不代表每个人都有同装备实测，也不能据此推断正在 UP。',['review']],
 ['国服实战｜哪些队伍打过','10/28 新号实录回答前期先练谁；10/17 兵祸和奥洛拉攻略给到梨梨、谛听的具体分工。两条路线都不能代表全角色强度。',['run','farm']],
 ['TapTap 榜单｜先辨别用途和版本','全角色表在 10/20 加入什炎、旭光妮璐。主表按副本分别评 PvE，PvP 单列；108 条里有 8 条觉醒记录、89 条至少有一项 PvE 评级，不能解读为 108 个可抽本体。11/4 新增达罗斯不在表内。分功能 PvE 榜原帖来自 2025 测试期；9/11 发布的 lance 6.1 榜按 RTA 选禁分档。两者均不作为 S19 新手 PvE 抽卡梯度。',['guide','sheet','live','log','lala','lance']]
 ];return groups.map(([title,body,keys])=>'<article class="panel"><h3>'+title+'</h3><p>'+body+'</p>'+pullLinks(keys)+'</article>').join('');
}
function pullIcon(n){const im=artEntry('people',n);return im?'<img width="30" height="30" loading="lazy" style="vertical-align:middle;border-radius:4px;margin-right:6px" src="'+encodeText(im.src)+'" alt="">':''}
let pullQ='',pullPg=0,pullRouteQ=null;
function pullCatalogRows(){
 const rows=pullRoster.rows.filter(row=>[...row.slice(0,3),...pullAliases(row[0]),...(ratedScenes[[row[0],...pullAliases(row[0])].find(k=>k in ratedScenes)]||[]),pullRoster.rarities[row[0]]].some(v=>String(v).toLowerCase().includes(pullQ.trim().toLowerCase()))),pages=Math.max(1,Math.ceil(rows.length/10));pullPg=Math.min(Math.max(0,pullPg),pages-1);
 const matches=rows.slice(pullPg*10,pullPg*10+10).map(([name,role,tags,advice,key])=>{
  const refs=(Array.isArray(key)?key:[key]).map(k=>pullRoster.sources[k]).filter(Boolean);
  refs.push(['中文图鉴 / 角色来源',pullRoster.detailUrls[name]]);
  const rankName=[name,...pullAliases(name)].find(k=>pullRankEvidence[k]);
  const acquisition=window.summonAccess?.[pullCanonical(name)];
  if(acquisition)refs.push(...acquisition.refs.filter(ref=>!refs.some(v=>v[1]===ref[1])));
  const channels=pullChannels.channels.filter(c=>c.names.some(n=>pullCanonical(n)===name));
  return '<details class="draw-detail" '+(name===pullQ?'open':'')+'><summary>'+pullIcon(name)+encodeText(name)+' <small> · '+encodeText(pullRoster.rarities[name])+' · '+encodeText(role.replace(/^(SSR|SR|R) · /,''))+'</small></summary><p>'+skillProfileLink(name)+'</p><p>'+encodeText(tags)+'</p><p>'+encodeText(key==='atlas'&&rankName?'可在下面的榜单行查各本评分；本站尚未核到近期国服配队实录或专抽依据，不列作必抽。':advice)+'</p><p class="note">'+(acquisition?encodeText(acquisition.title+'：'+acquisition.path):channels.length?'已查到的渠道：'+channels.map(c=>encodeText(c.title)).join('；')+'。具体资格见「卡池与自选」。':'尚未核到 S19 固定领取或当期定向；常驻能否抽到请核对本号池面。')+'</p><p class="note">'+(rankName?'10/20 全角色表：第 '+pullRankEvidence[rankName]+' 行。'+(ratedScenes[rankName]?.length?'有评级：'+ratedScenes[rankName].join('、')+'。评级涵盖高低各档，有记录不等于强。':'未给出具体 PvE 档位，不能把空白理解为弱。'):'10/20 全角色表未匹配此本体，请以新公告为准。')+'</p>'+roleRefs(rankName?[...refs,pullBooks.live]:refs)+'</details>';
 }).join('');
 return '<p class="note" role="status">匹配 '+rows.length+' 位 · 第 '+(pullPg+1)+' / '+pages+' 页</p>'+ (matches||'<p>没有匹配项。可以输入名字的一部分，或点「清空」查看全部。</p>')+'<div class="tier-pager"><button type="button" data-pull-page="-1" '+(pullPg===0?'disabled':'')+'>上一页</button><button type="button" data-pull-page="1" '+(pullPg===pages-1?'disabled':'')+'>下一页</button></div>';
}
function pullCatalogPage(){
 const val=location.hash.split('/')[2]||'';if(val!==pullRouteQ){try{pullQ=decodeURIComponent(val)}catch{pullQ=''}pullRouteQ=val;pullPg=0}
 return '<p class="lead"><b>'+pullRoster.rows.length+' 位角色</b>。'+encodeText(pullRoster.scope)+'</p><label class="tier-search">找角色或用途 <input type="search" id="pull-find" value="'+encodeText(pullQ)+'" placeholder="例如：葵诺丝、黑渊"></label> <button type="button" data-clear-pull>清空</button><section id="pull-list">'+pullCatalogRows()+'</section>';
}

function pullHub(key){
 const title={order:'零氪 PvE：下一笔资源给谁',channels:'哪些角色能领、能选、能定向',catalog:'国服角色与抽取索引',basis:'抽卡建议用了哪些资料',ranks:'按副本查 PvE 节奏榜'}[key];
 if(key==='order')return head('已有逆翎和梨梨，接下来抽谁','零氪 PvE · 11/5 核对')+pullOrderPage();
 return head(title,'S19 / 2026.11.05 核对')+pullTabs(key)+({order:pullOrderPage,channels:pullChannelPage,catalog:pullCatalogPage,basis:pullBasisPage,ranks:()=>summonBoard('ranks')}[key])();
}
document.addEventListener('input',e=>{if(e.target.id==='pull-find'){pullQ=e.target.value;pullPg=0;document.querySelector('#pull-list').innerHTML=pullCatalogRows()}});
document.addEventListener('click',e=>{const btn=e.target.closest('[data-pull-page],[data-clear-pull]');if(!btn)return;if(btn.hasAttribute('data-clear-pull')){pullQ='';pullPg=0;document.querySelector('#pull-find').value='';document.querySelector('#pull-find').focus()}else{pullPg+=Number(btn.dataset.pullPage)}const list=document.querySelector('#pull-list');list.innerHTML=pullCatalogRows();if(btn.hasAttribute('data-pull-page')){list.querySelector('summary')?.focus({preventScroll:true});list.scrollIntoView({block:'start'})}});
