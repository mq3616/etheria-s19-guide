'use strict';
const src={
 nymph:['社区 · 宁芙涅的增益与保护','https://www.taptap.cn/moment/722934609112729232'],
 mary:['社区 · 瑞玛丽的生命倍率与配装','https://news.17173.com/content/10222025/223906449.shtml'],
 s19:['S19 开服与赠送规则','https://www.taptap.cn/moment/866719390408642161?group_id=333480'],
 patch:['11 月 4 日版本活动','https://www.taptap.cn/moment/866390674507827526?group_id=333480'],
 dar:['达罗斯限定召唤规则','https://www.taptap.cn/moment/865337798482199546?group_id=333480'],
 cost:['抽卡货币与同类保底说明','https://www.taptap.cn/moment/763867206806146473'],
 rank:['社区 · 角色培养与功能分析','https://www.taptap.cn/moment/814947599944516602?group_id=333480'],
 start:['社区 · 教程炼与过渡队','https://www.taptap.cn/moment/679409355551932831'],
 low:['社区 · 智壳与源器低配打法','https://www.gamekee.com/yise/672683.html'],
 hell:['社区 · 炼狱机制与配速','https://www.taptap.cn/moment/722929067929634778'],
 early:['社区 · 开荒等级节点','https://www.taptap.cn/moment/720359147366777402'],
 select:['国际服资料 · 历史自选池参考','https://www.prydwen.gg/etheria-restart/guides/reroll-guide'],
 grey:['社区 · 格雷与拉条辅助','https://forum.gamer.com.tw/C.php?bsn=75405&snA=139'],
 plume:['社区 · 逆翎技能与 PvE 用途','https://www.taptap.cn/app/236627/strategy/entity-collection/316793']
};
const stages=[
 {name:'开服当天',code:'D01',date:'11.05',title:'先搭出第一支能打的队',intro:'11 月 5 日 10:00 开服。零氪默认：极相优先逆翎首只，新手定向优先考虑芙蕾雅，缺票就留；炼＋克洛斯＋凌罗先推，不为开局重刷。',steps:[
 ['选对服务器','北京时间 10:00 后选 S19「忘忧梦火」。暂时看不到时，按官方说明重启后再看。'],
 ['跟主线和超链之证走','先用教程 SSR 炼清小怪，优先升级她和当前上阵的队员。打开新链成长计划，能领的套装就先穿。'],
 ['找到两个送卡入口','培养计划看克洛斯、凌罗各自条件；14 日任务看瑞玛丽、宁芙涅。按实际到账顺序换人，过渡期用格雷等已有角色。'],
 ['分开三笔资源','极相票留给想要的限定；常驻券只用到队伍能推；通用晶钻先存。新手定向先看倒计时和可选名单。']],tasks:['确认 S19，领首次签到','在活动页标记四名赠送英雄','完成一场辅助先动、炼后动的战斗'],next:'先去「抽卡决策」看逆翎和夜离怎么二选一。',refs:['s19','start','grey']},
 {name:'第 2–3 天',code:'D02—03',date:'11.06—07',title:'定主攻，补一个缺口',intro:'把免费抽取和任务奖励摊开看，再决定第一笔定向资源。不要求重新刷号。',steps:[
 ['只补最缺的功能','先看有没有稳定削弱、治疗和对单伤害。教程炼能过图，就先等培养奖励；若常驻出了逆翎或夜离，立刻更新抽卡计划。'],
 ['遇到自选箱，再作选择','如果实际可选名单有梨梨且未拥有，优先补她。已有梨梨、首领打得慢，再看莉拉姆。别把原相定向和极相自选当作同一个池。'],
 ['调一次真实出手顺序','用同一难度连续打一场，观察克洛斯能否在主攻手出手前挂上减益。先解决出手顺序，再给输出换攻击装备。']],tasks:['核对自选范围和使用期限','确定一个主攻和一个治疗','查看自动战斗首轮顺序'],next:'如果 Boss 扛得住但小怪清不掉，先练群攻；反过来则补谛听这样的单体位。',refs:['s19','rank','start','select']},
 {name:'第 4–7 天',code:'D04—07',date:'11.08—11',title:'把手动首通变成稳定自动',intro:'比账号等级更有用的进度标志，是能否用同一队连续刷一个材料本。',steps:[
 ['体力跟着卡点走','等级不够刷秘闻调查，潜能卡技能刷源点前哨，装备主词条不对刷熔断禁区。三者都在新服双倍名单。'],
 ['挑一份过渡装备','输出先保暴击稳定与角色技能所需的属性；辅助先速度、生存，挂减益的再补效果命中。有好主词条就先穿，别为凑套装打乱配速。'],
 ['把体力花在能稳过的层','社区常用约 35 级作为尝试地狱的节点。解锁后先手动观察一次，再自动连打；掉人、断奶就降一层。'],
 ['给活动留一笔常驻券','11/10 起可以参加 EWS 投票。能推图的话，把非必要常驻抽取留到 11/12 的祈祝之礼。']],tasks:['稳定自动完成一组资源本','看过 Boss 的免疫/减伤说明','检查限时池的实际剩余天数'],next:'输出面板够却打不动时，去「副本配队」查先控、先驱散或先治疗。',refs:['s19','patch','early','low']},
 {name:'第 8–14 天',code:'D08—14',date:'11.12—18',title:'收齐赠送，搭出第二种打法',intro:'日期按 11 月 5 日创角推算。奖励取决于任务完成情况，各活动以游戏内倒计时为准。',steps:[
 ['逐条核对 14 日任务','优先补瑞玛丽、宁芙涅的任务和培养计划中的专属晶格。专属材料给对应角色，通用完美晶格留给准备长期使用的关键技能。'],
 ['让新成员解决一个问题','瑞玛丽到手后先试群伤和追击；宁芙涅先给攻击型主攻挂加攻和护盾，或在控制本提供免疫。固定一队作对照，别一次换光成员和源器。'],
 ['顺路吃常驻积分','11/12 04:00 起，已攒且原打算用的常驻券可集中用。抽完预算就停，检查已经解锁的领奖档。'],
 ['结算前查漏','核对双倍、签到、特训营普通任务和积分页的倒计时。无需为头衔、冲榜或高额累计抽数花钻。']],tasks:['检查四名任务 SSR 的领取进度','把常驻积分奖励领到已达档','保存一套稳定队和一套对策队'],next:'双倍结束后，把体力转向当前提升最明显的一个本，逐个替换装备。',refs:['s19','patch','rank']},
 {name:'进入高难后',code:'NEXT',date:'按解锁进度',title:'从一队通用，过渡到按机制换人',intro:'约 50 级尝试炼狱是社区开荒节点，不设首周达标要求。先求连续通关，再缩短用时。',steps:[
 ['先定一个长期本','从属性适配、机制能解决的源器或智壳本开始。先选要服务的主攻，再决定刷哪个套装、哪只智壳。'],
 ['再养第一位对策手','卡开局免疫就补驱散；打不穿减伤就补控制或治疗；单 Boss 太慢再补谛听、莉拉姆。只补导致翻车的那一位。'],
 ['每次只改一个变量','固定难度，记录输在第几波、哪名队员先倒、破防是否在爆发前。一次改速度、命中、生存或输出中的一项，再测试。']],tasks:['稳定自动一项高难副本','练好第一位对策角色','比较换装前后的稳定性'],next:'长期抽卡只为扩大副本覆盖，已有解法就保持储蓄。',refs:['early','hell','low']}
];
const pools=[
 ['逆翎 UP','优先取一只','你的长期 PvE 第一目标。逆羽增伤和破防都能给队伍其他输出使用。已有炼，之后还能领瑞玛丽，因此先提高全队爆发收益。','条件：预算能覆盖池面剩余保底，或已确认同类继承且接受延期。没把握就先靠克洛斯；出了逆翎即停，不追重复。','s19 plume cost'],
 ['新手定向','默认芙蕾雅','用一次定向补先手、拉推条和增益，让主攻更早出手。先把手头免费召唤和任务奖励看一遍，别选已经能领的克洛斯或凌罗。','已有芙蕾雅／节奏辅助充足：先保留选择，看目标本缺口和池面清单；临近到期再补未拥有且会上阵的功能位。定向仍需召唤，以页面所需次数为准。','s19 start select'],
 ['极相自选箱','若有，先看梨梨','若账号实际拿到包含梨梨的自选，且没抽到她，优先用来补拉条、缩技能冷却和协战。已有梨梨又缺对单爆发，才考虑名单里的莉拉姆。','这只是见到该箱时的决策。S19 公告没有承诺第 2 天给箱，也没有公开完整名单；不要把国际服攻略中的领取日、名单当作新区保证。','s19 rank select'],
 ['夜离 UP','第二目标／按偏好','喜欢多段爆发和清波、已拥有逆翎，且没有合适群攻时，夜离首只可考虑。也可以优先夜离，用免费克洛斯先手铺垫。','代价是占用另一笔极相预算，而炼和后续瑞玛丽也能打群伤。零氪默认只锁一个 UP；先拿免费输出跑一次目标本，再决定是否补她。','s19 rank'],
 ['达罗斯限定','默认跳过','版本新卡偏承伤、复活与持续消耗。对本路线，凌罗先负责续航，首笔稀有票留给能放大主攻的角色。','专属公告确认：序章后开放，极相限定 80 抽内必得、出 SSR 即达罗斯。仅当你明确改玩防御长线且预算够时再考虑；不要为了原质突破奖励追复本。','dar patch'],
 ['常驻召唤','只花计划内的券','开服先用必要的免费券补人，队伍能推就停。11/12 起祈祝之礼仅统计常驻召唤，留给它的券到活动开始后再花。','活动自选跃格加密箱只有柯卡尔迪、魁洛、席琳丝三个选项，和新手定向、极相自选是不同物品。档位以客户端为准，不为箱子换券冲累计。','patch cost']
];
const roles=[
 ['免费骨架','炼','主线清波／先养','教程取得，接超链之证和专属培养。先把资源集中到能稳定清怪，再考虑为第二位群攻换装备。'],
 ['免费骨架','克洛斯','破防铺垫／先养','新区培养计划。优先调到主攻前行动，副本挂不上减益时看命中与敌方免疫；有专属晶格先用专属。'],
 ['免费骨架','凌罗','治疗续航／先养','新区培养计划。保证她活着且赶得上治疗；机制要求先治疗的 Boss，把她调整到输出之前。'],
 ['免费骨架','瑞玛丽','群攻补强／领取后试用','完成 14 日系列任务获得。她的生命系输出与炼的配装需求不同，先看技能倍率，再按生命和暴击需求重配。'],
 ['免费骨架','宁芙涅','免疫护盾／需要时投入','提供全队加攻、免疫与护盾。需要预防控制或给攻击型主 C 爆发时，安排她在主攻前行动，优先速度和生命；治疗已足时可试替补上场。'],
 ['抽到再练','逆翎','泛用削弱','先于打手挂逆羽与破防。与克洛斯可按机制替换；已有足够削弱时，空位优先补拉条、驱散或单体输出。'],
 ['抽到再练','芙蕾雅／梨梨','全队节奏／单核轮转','芙蕾雅管全队节奏与增益；梨梨让指定核心更快再次行动。拉起主攻前先确认破防已经挂好。两人来自不同选择渠道。'],
 ['抽到再练','夜离／莉拉姆','群攻／单体','夜离适合清多波和追击。莉拉姆偏单体爆发，尤其适合给 Boss 收尾。没莉拉姆先用 SR 谛听，不必停在卡池等人。'],
 ['低星对策','格雷／谛听','削弱过渡／打单体','格雷可在免费克洛斯到账前补减防。谛听针对单体，先给现有暴击和攻击向装备，辅助铺好再输出。'],
 ['低星对策','卡奇／恶命','控制／嘲讽','按 Boss 是否吃控制决定上场。优先给速度、生存，把技能留给需要打断的小怪；没有这个缺口时先不升。'],
 ['低星对策','蝰蛇／戍守卡奇','驱散削弱／保护','遇到免疫或全队被控制，再培养对应机制位。同名卡注意区分普通卡奇与戍守卡奇。'],
 ['低星对策','奥波尔＋方格斯','持续伤害备选','在不免疫持续伤害、直伤又打不动的本中再组毒队。你的第一队仍按爆发路线养，无须为毒队提前培养两套装备。']
];
const events=[
 ['新区 · 14 天','两组送卡任务','优先','培养计划取克洛斯、凌罗与专属晶格；另一组 14 日系列任务取瑞玛丽、宁芙涅。逐条看任务，签到本身不等于领齐四人。','s19'],
 ['新区 · 14 天','签到、成长计划与特训营','优先','每日领签到的召唤道具。成长计划最高奖励档到 100 级，是长期目标；特训营前 14 天先做能顺手完成的任务，零氪不追排行。','s19'],
 ['新区 · 14 天','三项副本双倍','优先','秘闻调查（经验）、熔断禁区（源器）、源点前哨（潜能）按卡点花体力。凶影追缉是智壳本，不在这份双倍名单。','s19'],
 ['11/05 04:00 — 11/12 03:59','源器回收协议','顺手','服务器时间。只有符合条件的回收才有价格倍率。先锁速度、暴击、命中等有用胚子，再清理确定不用的装备。','patch'],
 ['11/10 04:00 — 12/23 03:59','EWS 总决赛投票','顺手','UTC+8。选赛区后每日在活动页投票拿决胜星徽，留意累计奖励。看得见入口就参与，不要求你去打 PvP。','patch'],
 ['11/12 04:00 — 11/19 03:59','祈祝之礼','优先','服务器时间。已有常驻券集中用，积分阶段可给晶格和三选一跃格加密箱等。新增 400、500 抽高档位，不作零氪目标。','patch'],
 ['11/04 16:00 — 12/02 15:59','达罗斯池及原质突破','跳过','UTC+8。侧重防御、承伤和复活，培养与激活潜能才有对应奖励。零氪爆发队建议不为它改计划。','dar'],
 ['11/05 04:00 — 11/12 03:59','超级元件计划','跳过','服务器时间。需购买支援箱；新区月卡买一送一也属于付费，均不计入免费资源。','patch'],
 ['11/04 16:00 — 11/11 15:59','竞策争锋','跳过','UTC+8。需要组五队竞技，培养五队会分走主力资源。同期巅峰竞技场至 12/02，纯 PvE 可以略过。','patch']
];
const fights=[
 ['通用推图','先让减益挂上，再让打手动','默认骨架','炼＋克洛斯＋凌罗；按关卡开放的队伍位置补节奏或单体。没领克洛斯时格雷过渡，没梨梨用已有加速或控制。','先手辅助／驱散 → 破防或易伤 → 主攻。梨梨若会让主攻抢在破防前，就调整她的速度或拉人时机。治疗按生存压力安插，不固定末速。','自动翻车先看第一波出手。有输出没窗口就调配速；第一轮扛不住就加治疗速度/生存；群怪顺、Boss 慢则加 SR 谛听。','start grey rank'],
 ['兵祸','先清免疫，再打破防','免疫增益','驱散位＋克洛斯或逆翎＋谛听或莉拉姆＋凌罗；空位按缺口用拉条或保护。先看手里角色技能文本含不含驱散。','让能驱散敌方增益的角色先动，看到免疫消失后再挂减益。确认 Boss 身上已有破防，主 C 才交高倍率技能。','减益一轮都挂不上，先检查驱散顺序与命中。不要立刻换更贵的输出。','low hell'],
 ['妮可娜娜','破解速度带来的减伤','速度差','克洛斯＋速度/拉条辅助＋属性合适的主 C＋凌罗；手里有逆翎可承担增伤位。','先用疾驰矩阵、速度副词条或速度增益改善速度差，再挂削弱让主攻出手。观察属性克制和伤害变化，不套别人的固定速度线。','清小怪快但打 Boss 像刮痧，先核对减伤说明；先取能稳定打的层，留一套高速装备再向上试。','low hell'],
 ['多琪','先控制，再开爆发','控制减伤','带能稳定施加有效控制的对策手（如酣梦一宵）＋削弱＋主攻＋续航，按怪物说明选控制类型。','先判断本体与小怪的控制规则；采用控小怪路线时，让控制在输出前落到小怪，再交大招。自动模式若把输出技能放早了，调速度或改技能顺序。','先区分控制抵抗、目标免疫和没有在控制窗口出手；别用纯堆爆伤的方法绕过机制。','low hell'],
 ['奥洛拉','先治疗消盾，再让主攻收尾','治疗机制','凌罗作为关键机制位，配克洛斯和单体主攻；生存够再上梨梨。','需要用治疗处理诅咒之盾时，奶妈必须赶在爆发前行动。手动首通看清盾何时消失，再按同样顺序调自动。','同样面板伤害忽高忽低，回放时先看主攻出手那一刻盾是否还在。','low hell'],
 ['赫妍／莎朗','用替补换机制，不整队推倒','高难换位','赫妍：小怪分摊和反击会干扰集火，先控小怪再集火，或用能生存的持续伤害队。莎朗：面对本体免疫减益和毒伤，优先能净化、免疫或保护的队友。','主攻在适合的窗口再爆发；若减益无效，换己方增益辅助比继续堆命中有用。','先试换 1 位对策手。没有相应角色或装备时，回到稳定层，不为单一 Boss 临时抽整套队伍。','low hell']
];
const tabs=[['day1','首周清单'],['manual','实战详解'],['route','进度路线'],['draw','抽卡决策'],['roster','角色与配队'],['fight','副本打法'],['calendar','活动日历'],['evidence','资料来源'],['atlas','开荒图鉴']];
const app=document.getElementById('app'),nav=document.getElementById('nav');
const ref=ids=>'<div class="sources">'+ids.map(k=>'<a href="'+src[k][1]+'" target="_blank" rel="noopener">'+src[k][0]+' ↗</a>').join('')+'</div>';
function loadState(){try{return JSON.parse(localStorage.getItem('etheria-s19-notebook-v1'))||{}}catch(e){return {}}}
const state=loadState();function save(){try{localStorage.setItem('etheria-s19-notebook-v1',JSON.stringify(state))}catch(e){}}
const panel=(type,code,title,content)=>'<article class="panel '+type+'"><div class="label">'+code+'</div><h3>'+title+'</h3>'+content+'</article>';
const grid=(a,b)=>'<div class="grid">'+a+b+'</div>';
const head=(a,b)=>'<div class="sectionhead"><h2>'+a+'</h2><span class="code">'+b+'</span></div>';
const step=(arr)=>arr.map(([a,b],i)=>'<div class="step"><b class="num">'+String(i+1).padStart(2,'0')+'</b><div><strong>'+a+'</strong><p>'+b+'</p></div></div>').join('');
const sub=(arr,n)=>'<div class="sub" aria-label="内容筛选">'+arr.map((x,i)=>'<button type="button" data-sub="'+i+'" class="'+(i===n?'active':'')+'" aria-pressed="'+(i===n)+'">'+x+'</button>').join('')+'</div>';
const jump=(key,t)=>'<a class="jump" href="#'+key+'">'+t+' →</a>';
function route(n){const s=stages[n],checks=s.tasks.map((t,i)=>'<label><input type="checkbox" data-task="'+n+'-'+i+'" '+(state['t'+n+'-'+i]?'checked':'')+'><span>'+t+'</span></label>').join('');
 return head('进度路线','01 / PROGRESSION')+sub(stages.map(s=>s.name),n)+grid(panel('',s.code+'　/　'+s.date,s.title,'<p class="lead">'+s.intro+'</p>'+step(s.steps)+ref(s.refs)),panel('tint','CHECKLIST / 本阶段','我今天要做什么','<div aria-live="polite" class="note" id="done"></div><div class="progress" aria-hidden="true"><i id="bar"></i></div><div class="checks">'+checks+'</div><p class="stripe">'+s.next+'</p>'+jump(n>=3?'fight':'draw',n>=3?'查看副本解法':'看抽取优先级')))}
const branches=[
 ['还没有逆翎、夜离','默认把极相预算留给逆翎首只。炼先清波，克洛斯负责前期削弱，14 日任务再补瑞玛丽。距离保底太远就先推图攒票。'],
 ['已有逆翎','停止该池。先让逆翎给炼或瑞玛丽铺增伤。若免费群攻已能清图，保留所有极相票；仍想用夜离且能独立覆盖保底时才追首只。'],
 ['已有夜离，没有逆翎','夜离直接当主攻，克洛斯站她前面。下一笔极相预算看逆翎；没到保底前先用免费阵容，不再为第二个群攻花票。'],
 ['已有逆翎和夜离','极相直接停手。缺轮转看梨梨，缺治疗领凌罗，缺免疫/驱散先找低稀有对策手。把钻留给下次真正缺的功能。'],
 ['只想休闲，不想为 UP 花钻','限定先全留。炼、克洛斯、凌罗加已有对策位即可推；用 14 日任务扩充角色。只在有清晰缺口且有对应免费券／自选时行动。']
];
function draw(n){const p=pools[n];return head('抽卡决策','02 / SUMMON')+sub(pools.map(x=>x[0]),n)+grid(panel('',p[0]+'　/　路线建议',p[1],'<p>'+p[2]+'</p><p class="stripe">'+p[3]+'</p>'+ref(p[4].split(' '))+'<details><summary>下池前核对三件事</summary><p>① 正在用的是哪种票？② 这页写的是几抽内必得哪名角色、当前还差多少？③ 倒计时前能否攒齐？同期开两个同类池官方按同一保底统计；跨期、定向与不同池型分开看池面说明。</p></details>'),panel('tint','MY ROSTER / 按持有调整','下一笔极相票给谁？','<label for="owned" class="note">选择你的实际情况</label><select id="owned" class="choice">'+branches.map((x,i)=>'<option value="'+i+'" '+(Number(state.branch||0)===i?'selected':'')+'>'+x[0]+'</option>').join('')+'</select><p id="advice" aria-live="polite"></p><details style="margin-top:15px"><summary>算一笔保底预算</summary><p>例：池面还差 60 抽，你有可用于此池的 18 张极相原型，缺 42 抽；按官方折算约 12,600 晶钻。只计算同池可用票，到账前的奖励不计入。</p>'+ref(['cost'])+'</details>'))}
const roleCats=['免费骨架','抽到再练','低星对策'];
function roster(n){const tips=[['先照顾能带队的人','主攻升级优先，破防手速度比主攻快，奶妈先保生存。拿到专属晶格就投本人，通用技能材料等卡点再用。'],['先确定上场位置','抽到新英雄，先问她替谁、解决哪个 Boss，再转移主套装。相同定位先养一位，首只比复本优先。'],['替补解决具体机制','先用已有材料升到能出手且不死；成功解决卡点后再加资源。跨属性的低星不必一次全养。']][n];
return head('培养名单','03 / ROSTER')+jump('roster/rank','看作者优先级与场景组队')+sub(roleCats,n)+grid(panel('',roleCats[n]+'　/　按职责选人','这一组怎么养',roles.filter(x=>x[0]===roleCats[n]).map((x,i)=>'<details '+(i===0?'open':'')+'><summary>'+x[1]+' <span class="tag">'+x[2]+'</span></summary><p>'+x[3]+'</p></details>').join('')+ref(n===0?['s19','rank','start','nymph','mary']:['rank','low'])),panel('tint','INVESTMENT / 投入顺序',tips[0],'<p>'+tips[1]+'</p><p class="stripe">目标：首支队能自动刷，再扩第二套角色。根据敌方机制调整第五个或可替换的位置。</p>'+jump('fight','按副本配队')))}
function fight(n){const f=fights[n];return head('副本配队','04 / BOSS LAB')+sub(fights.map(x=>x[0]),n)+grid(panel('',f[2]+'　/　'+f[0],f[1],step([['上阵与替代',f[3]],['行动顺序',f[4]],['卡关先改什么',f[5]]])+ref(f[6].split(' '))),panel('tint','FARM MAP / 体力去向','今天要刷什么？',step([['缺经验 → 秘闻调查','优先升主攻与核心辅助，完成当日进度即可。'],['缺潜能材料 → 源点前哨','围绕主力技能和升阶需求刷，优先利用新区双倍。'],['缺装备 → 熔断禁区','刷源器；初期先拿正确主词条与速度顺序。'],['缺智壳 → 凶影追缉','单独补适配智壳，并非本次三项双倍之一。']])+ref(['s19','low'])))}
const filters=['新区专属','顺手可做','限时抽卡','可以跳过'];
function cal(n){const group=[[0,1,2],[3,4],[5,6],[7,8]][n];return head('活动日历','05 / CALENDAR')+sub(filters,n)+grid(panel('',filters[n]+'　/　11 月服表','活动与截止时间',group.map((id,i)=>{const e=events[id];return '<details '+(i===0?'open':'')+'><summary>'+e[1]+' <span class="tag">'+e[2]+'</span></summary><div class="code" style="margin-top:9px">'+e[0]+'</div><p>'+e[3]+'</p>'+ref([e[4]])+'</details>'}).join('')),panel('tint','CLOCK / 两种时间','别错过两个节点',step([['11/12 04:00　常驻积分开始','准备花的常驻券留到这时；新手专属池、极相限定抽数另算。'],['11/19 03:59　常驻积分截止','开服第 14 天是 11/18。签到、培养和特训营分别核对活动页，截止时刻不一律按零点推算。']])+'<p class="note">日期按北京时间规划。标「服务器时间」的活动遵照区服重置。此页为开服前已公布的排期，后续更新以官方为准。</p>'+ref(['s19','patch'])))}
function evidence(){return head('资料与核对','06 / REFERENCES')+grid(panel('','PRIMARY SOURCES / 一手信息','已确认的规则','<p>开服时刻、赠送角色、UP 名单以及活动周期优先使用国服 S19 原公告。页面内的抽取优先级和体力安排是面向零氪 PvE 的规划建议。</p>'+ref(['s19','patch','dar','cost'])+'<p class="stripe">开服要现场确认：夜离与逆翎的倒计时、各池保底和继承范围、光暗自选是否发放及其名单、各任务的逐日门槛。没有把旧服的总抽数当作新区承诺。</p>'),panel('tint','FIELD NOTES / 玩家实战','配队与版本差异','<p>社区攻略用于核对英雄功能和 Boss 解法。旧攻略的装备门槛与领取日可能变动，先认机制，再用当前练度试一场。</p>'+ref(['rank','low','hell','early','start','grey','plume','select'])))}
function refreshProgress(){const inputs=[...app.querySelectorAll('[data-task]')];if(!inputs.length)return;let d=inputs.filter(x=>x.checked).length;document.getElementById('done').textContent='本阶段完成 '+d+' / '+inputs.length;document.getElementById('bar').style.width=(100*d/inputs.length)+'%'}
function render(){
 const [page,part,topic]=location.hash.slice(1).split('/');
 const idx=Math.max(0,tabs.findIndex(t=>t[0]===(page==='week'?'day1':page)));
 const key=tabs[idx][0];
 const sizes=[openingPlan.length,1,stages.length,pools.length,roleCats.length,fights.length,filters.length,1,3];
 let n=Number(part)||0;if(!Number.isInteger(n)||n<0||n>=sizes[idx])n=0;
 if(!page && state.lastChecklist!=='day1'){state.lastChecklist='day1';save()}
 if(key==='day1' && page && /^(day1(\/[0-3])?|week\/[2-7])$/.test(location.hash.slice(1))){state.lastChecklist=location.hash.slice(1);save()}
 nav.classList.remove('expanded');nav.innerHTML=guideNav(key);
 if(page==='week' && weekDays.some(plan=>plan.day===Number(part))){app.innerHTML=weeklyChecklist(Number(part))}
 else if(key==='roster' && !['0','1','2'].includes(part)){app.innerHTML=roleLibrary(part,topic)}
 else if(key==='manual'){app.innerHTML=fieldManual(part,topic)}
 else{app.innerHTML=[dayOne,null,route,draw,roster,fight,cal,evidence,atlasView][idx](n,topic);const link=fieldRelated(key,n);if(link)app.querySelector('.sectionhead')?.insertAdjacentHTML('afterend',link)}
 if(key==='fight'){
  const scenes=[starterScene,...sceneRanks],names=['主线','重构兵祸','妮可娜娜','多琪','奥洛拉','赫妍'];
  const match=scenes.findIndex(scene=>scene.name.startsWith(names[n]));
  if(match>=0)app.querySelector('.related')?.insertAdjacentHTML('beforeend','<a href="#roster/scene/'+match+'">本场人选优先级与原片 ↗</a>');
 }
 app.dataset.key=key;if(key!=='roster'||['0','1','2'].includes(part))illustratePage(key,n,part,topic);refreshProgress();
 if(key==='draw')document.getElementById('advice').textContent=branches[Number(state.branch)||0][1];
 flowAfterRender(key);
 document.title=tabs[idx][1]+' · 伊瑟 S19 开荒手册';
}
app.addEventListener('click',e=>{const el=e.target.closest('[data-sub]');if(el)location.hash=app.dataset.key+'/'+el.dataset.sub});
app.addEventListener('change',e=>{if(e.target.matches('[data-task]')){state['t'+e.target.dataset.task]=e.target.checked;save();refreshProgress()}if(e.target.id==='owned'){state.branch=Number(e.target.value);save();document.getElementById('advice').textContent=branches[state.branch][1]}});
// Save the reading position before leaving a view. Browser Back can then restore it.
function saveScroll(){history.replaceState({...history.state,guideY:scrollY},'')}
document.addEventListener('click',e=>{if(e.target.closest('a[href^="#"],[data-sub]'))saveScroll()},true);
document.addEventListener('change',e=>{if(e.target.matches('select'))saveScroll()},true);
window.addEventListener('hashchange',()=>{
 const previousY=history.state?.guideY;
 if(findDialog.open)findDialog.close();
 render();
 if(Number.isFinite(previousY))requestAnimationFrame(()=>window.scrollTo(0,previousY));
 else {const headingY=app.getBoundingClientRect().top+scrollY-nav.offsetHeight;if(scrollY>headingY)window.scrollTo(0,Math.max(0,headingY));}
 if(document.activeElement===document.body)app.focus({preventScroll:true});
});
if(!location.hash && state.lastChecklist)history.replaceState(null,'','#'+checklistLocation());
render();
