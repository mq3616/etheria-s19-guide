'use strict';
const src={
 s19:['S19 开服与赠送规则','https://www.taptap.cn/moment/866719390408642161?group_id=333480'],
 patch:['11 月 4 日版本活动','https://www.taptap.cn/moment/866390674507827526?group_id=333480'],
 kuiPool:['官方 · 葵诺丝上一期 UP 时间','https://www.taptap.cn/moment/851171629613450759?group_id=333480'],
 dar:['达罗斯限定召唤规则','https://www.taptap.cn/moment/865337798482199546?group_id=333480'],
 rank:['璟璃 · 10/28 修订 · 角色用途','https://www.taptap.cn/moment/814947599944516602?group_id=333480'],
 run:['LilyQAQ · 10/28 · 新号低配实录','https://www.taptap.cn/moment/864509086933189597?group_id=333480'],
 newbie:['x佛系摸鱼 · 10/17 修订 · 新人入坑开荒','https://www.taptap.cn/moment/860227779365438892'],
 octpatch:['官方 · 10/11 · 什炎限定截止时间','https://www.taptap.cn/app/236627/topic?group_label_id=2086663&page=4&type=group_label'],
 awake:['官方 · 9/2 生效 · SR 谛听觉醒门槛','https://www.taptap.cn/moment/843432594195353104'],
 nicole:['韶华 · 10/14 · 旭光妮璐解析','https://www.taptap.cn/moment/859615821306005237']
};
const stages=[
 {name:'开服当天',code:'D01',date:'11.05',title:'先搭出第一支能打的队',intro:'11 月 5 日 10:00 开服。零氪默认：限定预算先看逆翎首只，先用免费阵容，定向等缺口明确再决定；炼＋克洛斯＋凌罗先推，不为开局重刷。',steps:[
 ['选对服务器','北京时间 10:00 后选 S19「忘忧梦火」。暂时看不到时，按官方说明重启后再看。'],
 ['跟主线和超链之证走','先用教程 SSR 炼清小怪，优先升级她和当前上阵的队员。打开新链成长计划，能领的套装就先穿。'],
 ['找到两个送卡入口','培养计划看克洛斯、凌罗各自条件；14 日任务看瑞玛丽、宁芙涅。按实际到账顺序换人，过渡期用格雷等已有角色。'],
 ['分开三笔资源','限定票按池面所需类型单独预算；常驻券只用到队伍能推；通用晶钻先存。新手定向先看倒计时和可选名单。']],tasks:['确认 S19，领首次签到','在活动页标记四名赠送英雄','完成一场辅助先动、炼后动的战斗'],next:'先去「抽卡决策」看逆翎首只之后，何时补梨梨、单体或夜离。',refs:['s19','run']},
 {name:'第 2–3 天',code:'D02—03',date:'11.06—07',title:'定主攻，补一个缺口',intro:'把免费抽取和任务奖励摊开看，再决定第一笔定向资源。不要求重新刷号。',steps:[
 ['只补最缺的功能','先看有没有稳定削弱、治疗和对单伤害。教程炼能过图，就先等培养奖励；若常驻出了逆翎或夜离，立刻更新抽卡计划。'],
 ['遇到自选箱，再作选择','先查是否真的领到箱、有哪些候选。想让同一主攻多出手，又缺这项功能，名单里有梨梨才选她；已经能轮转，就保留到缺口明确。别把原相定向和角色自选当作同一个池。'],
 ['调一次真实出手顺序','用同一难度连续打一场，观察克洛斯能否在主攻手出手前挂上减益。先解决出手顺序，再给输出换攻击装备。']],tasks:['核对自选范围和使用期限','确定一个主攻和一个治疗','查看自动战斗首轮顺序'],next:'如果 Boss 扛得住但小怪清不掉，先练群攻；反过来则补谛听这样的单体位。',refs:['s19','rank','run']},
 {name:'第 4–7 天',code:'D04—07',date:'11.08—11',title:'把手动首通变成稳定自动',intro:'比账号等级更有用的进度标志，是能否用同一队连续刷一个材料本。',steps:[
 ['体力跟着卡点走','角色缺经验道具刷秘闻调查，缺潜能材料刷源点前哨，装备主词条不对刷熔断禁区。三者都在新服双倍名单。'],
 ['挑一份过渡装备','输出先保暴击稳定与角色技能所需的属性；辅助先速度、生存，挂减益的再补效果命中。有好主词条就先穿，别为凑套装打乱配速。'],
 ['把体力花在能稳过的层','地狱难度在你自己的账号解锁后再试。解锁后先手动观察一次，再自动连打；掉人、断奶就降一层。'],
 ['给活动留一笔常驻券','11/10 起可以参加 EWS 投票。能推图的话，把非必要常驻抽取留到 11/12 的祈祝之礼。']],tasks:['稳定自动完成一组资源本','看过 Boss 的免疫/减伤说明','检查限时池的实际剩余天数'],next:'输出面板够却打不动时，去「副本配队」查先控、先驱散或先治疗。',refs:['s19','patch','run']},
 {name:'第 8–14 天',code:'D08—14',date:'11.12—18',title:'核对赠送进度，搭出第二种打法',intro:'日期按 11 月 5 日创角推算。奖励取决于任务完成情况，各活动以游戏内倒计时为准。',steps:[
 ['逐条核对 14 日任务','优先补瑞玛丽、宁芙涅的任务和培养计划中的专属晶格。专属材料给对应角色，通用完美晶格留给准备长期使用的关键技能。'],
 ['让新成员解决一个问题','瑞玛丽到手后先试群伤和追击；宁芙涅先给攻击型主攻挂加攻和护盾，或在控制本提供免疫。固定一队作对照，别一次换光成员和源器。'],
 ['顺路吃常驻积分','11/12 04:00 起，已攒且原打算用的常驻券可集中用。抽完预算就停，检查已经解锁的领奖档。'],
 ['结算前查漏','核对双倍、签到、特训营普通任务和积分页的倒计时。无需为头衔、冲榜或高额累计抽数花钻。']],tasks:['检查四名任务 SSR 的领取进度','把常驻积分奖励领到已达档','保存一套稳定队和一套对策队'],next:'双倍结束后，把体力转向当前提升最明显的一个本，逐个替换装备。',refs:['s19','patch','rank']},
 {name:'进入高难后',code:'NEXT',date:'按解锁进度',title:'从一队通用，过渡到按机制换人',intro:'十月低配账号在 50 级解锁炼狱，不设首周达标要求。先求连续通关，再缩短用时。',steps:[
 ['先定一个长期本','从属性适配、机制能解决的源器或智壳本开始。先选要服务的主攻，再决定刷哪个套装、哪只智壳。'],
 ['再养第一位对策手','卡开局免疫就补驱散；查看目标的减伤触发条件，再决定控制或治疗；单 Boss 太慢再补谛听、莉拉姆。只补导致翻车的那一位。'],
 ['每次只改一个变量','固定难度，记录输在第几波、哪名队员先倒、破防是否在爆发前。一次改速度、命中、生存或输出中的一项，再测试。']],tasks:['稳定自动一项高难副本','练好第一位对策角色','比较换装前后的稳定性'],next:'长期抽卡只为扩大副本覆盖，已有解法就保持储蓄。',refs:['run','newbie']}
];
const pools=[
 ['逆翎 UP','需要增伤且保底够，再取一只','10 月低配号实录的优先辅助。逆翎增伤和破防都能给队伍其他输出使用。已有炼，之后还能领瑞玛丽，因此先提高全队爆发收益。','条件：预算能覆盖本池剩余目标保底，且现队确有功能缺口。没把握就先靠克洛斯；出了逆翎即停，不追重复。','s19 run rank'],
 ['新手定向','先等缺口，再考虑芙蕾雅','若常用队已经有输出和治疗，但需要先手与全队节奏，芙蕾雅才是这个定向池的候选。先把手头免费召唤和任务奖励看一遍，别选已经能领的克洛斯或凌罗。','已有芙蕾雅／节奏辅助充足：先保留选择，看目标本缺口和池面清单；临近到期再补未拥有且会上阵的功能位。定向仍需召唤，以页面所需次数为准。','s19 rank run'],
 ['角色自选箱','若领到，按队伍缺口选','本服尚未承诺发这种箱。实际拿到再展开名单：单核已有伤害却缺再动，梨梨能补拉条、冷却与协战；已有同类辅助且能通关就先留箱。若缺单体爆发，莉拉姆是名单内才考虑的人选。','这只是见到该箱时的决策。S19 公告没有承诺第 2 天给箱，也没有公开完整名单；不要把国际服攻略中的领取日、名单当作新区保证。','s19 rank'],
 ['夜离 UP','逆翎之后仍缺群攻，才开第二池','喜欢多段爆发和清波、已拥有逆翎，且没有合适群攻时，夜离首只可考虑。也可以优先夜离，用免费克洛斯先手铺垫。','代价是占用另一笔限定预算，而炼和后续瑞玛丽也能打群伤。先拿免费输出跑一次目标本；仍想立刻换群攻且夜离自己的保底够，再补首只，不能借用逆翎池的抽数。','s19 rank'],
 ['达罗斯限定','默认跳过','版本新卡偏承伤、复活与持续消耗。对本路线，凌罗先负责续航，首笔稀有票留给能放大主攻的角色。','专属公告确认：序章后开放，极相限定 80 抽内必得、出 SSR 即达罗斯。仅当你明确改玩防御长线且预算够时再考虑；不要为了原质突破奖励追复本。','dar patch'],
 ['常驻召唤','11/12 起用计划内的券','开服先用必要的免费券补人，队伍能推就停。11/12 起祈祝之礼仅统计常驻召唤，留给它的券到活动开始后再花。','活动自选跃格加密箱只有柯卡尔迪、魁洛、席琳丝三个选项，和新手定向、角色自选是不同物品。档位以客户端为准，不为箱子换券冲累计。','patch']
];
const events=[
 ['新区 · 14 天','两组送卡任务','优先','培养计划取克洛斯、凌罗与专属晶格；另一组 14 日系列任务取瑞玛丽、宁芙涅。逐条看任务，签到本身不等于领齐四人。','s19'],
 ['新区 · 14 天','签到、成长计划与特训营','优先','每日领签到的召唤道具。成长计划最高奖励档到 100 级，按本号活动期限和解锁进度完成；特训营前 14 天先做能顺手完成的任务，零氪不追排行。','s19'],
 ['新区 · 14 天','三项副本双倍','优先','秘闻调查（经验）、熔断禁区（源器）、源点前哨（潜能）按卡点花体力。凶影追缉是智壳本，不在这份双倍名单。','s19'],
 ['11/05 04:00 — 11/12 03:59','源器回收协议','顺手','服务器时间。只有符合条件的回收才有价格倍率。先锁速度、暴击、命中等有用胚子，再清理确定不用的装备。','patch'],
 ['11/10 04:00 — 12/23 03:59','EWS 总决赛投票','顺手','UTC+8。选赛区后每日在活动页投票拿决胜星徽，留意累计奖励。看得见入口就参与，不要求你去打 PvP。','patch'],
 ['11/12 04:00 — 11/19 03:59','祈祝之礼','优先','服务器时间。已有常驻券集中用，积分阶段可给晶格和三选一跃格加密箱等。新增 400、500 抽高档位，不作零氪目标。','patch'],
 ['11/04 16:00 — 12/02 15:59','达罗斯池及原质突破','跳过','UTC+8。侧重防御、承伤和复活，培养与激活潜能才有对应奖励。零氪爆发队建议不为它改计划。','dar'],
 ['11/05 04:00 — 11/12 03:59','超级元件计划','跳过','服务器时间。需购买支援箱；新区月卡买一送一也属于付费，均不计入免费资源。','patch'],
 ['11/04 16:00 — 11/11 15:59','竞策争锋','跳过','UTC+8。需要组五队竞技，培养五队会分走主力资源。同期巅峰竞技场至 12/02，纯 PvE 可以略过。','patch']
];
const fightRoutes=[
 ['通用推图',0],['兵祸',2],['妮可娜娜',1],['多琪',3],['奥洛拉',4],['赫妍／莎朗',6]
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
function pullPriority(){
 const resourceRows=[
  ['能固定领的角色','教程先用炼、幻音千明。培养计划领克洛斯和凌罗，14 日系列任务领瑞玛丽和宁芙涅。这些首只留给任务拿。'],
  ['新手定向召唤','如果缺全队先手，可以定向芙蕾雅。先试幻音千明，再看定向的次数和到期日。'],
  ['常驻券','教程按要求花。剩余本就打算用的常驻券，可留到 11 月 12–19 日的祈祝活动。积分箱只可选柯卡尔迪、魁洛、席琳丝。'],
  ['当期极相限定','达罗斯偏承伤和复活。零氪推图可以跳过本期；他的 80 抽保底只按极相规则算。']
 ];
 return '<details class="draw-detail" id="draw-free"><summary>免费角色、定向和常驻券怎么用？</summary>'+resourceRows.map(([title,copy])=>'<p><b>'+title+'</b><br>'+copy+'</p>').join('')+ref(['s19','run','patch','dar'])+'</details>';
}
function summonRoadmap(owned){
 const picked=name=>owned.has(name)?' · 已有，跳过首只':'';
 const rows=[
  ['11/5 开服 · 新人 UP','① 逆翎'+picked('逆翎'),'教程后还没有她，再核对新人池的剩余保底和截止时间；预算能覆盖，拿一只就停。她在主攻前驱散、铺减益，炼就能接着打。只有夜离也仍可补逆翎；票不够就用任务克洛斯过渡。','story','mid'],
  ['开始刷源器 · 下一次可指定时','② 梨梨'+picked('梨梨'),'主攻一轮伤害够、想让他再打一轮，优先拿梨梨。10 月国服兵祸和奥洛拉作业都用她拉谛听，不只是后期冲榜才有用。S19 未官宣她的定向池或赠箱；先用千明拉条，别用钻在常驻碰运气。','gear','mid'],
  ['首领超时 · 先查已有单体','③ 单体位：谛听先用，缺了再看莉拉姆','抽到普通 SR 谛听就先练：上述两本都有他的位置。没有合适单体、且破防后打一轮仍刮痧，遇到明确能指定莉拉姆的机会可以排在梨梨前。已有单体能打过，就跳过这笔；没有莉拉姆同练度替换的通关实测。','gear','mid']
 ];
 const future='葵诺丝是后期生命型输出的观察目标。上期 UP 已结束，复刻时间未定；先用免费瑞玛丽，到新池公布再对照实际要打的本。';
 return head('零氪 PvE：按时间决定抽谁','国服 S19 · 11/4 核对')+
 '<div class="book-intro"><p><strong>优先逆翎首只 → 能指定时拿梨梨 → 首领缺单体才补莉拉姆。</strong> 这是给「辅助铺垫、主攻收尾」的长期顺序。免费队能开荒，没有证据表明哪张限定是所有 PvE 的入场券。</p><a href="#draw/mine">按我已有的角色和余票调整 →</a><a href="#roster/teams">查看全部队伍与平替 →</a></div>'+
 '<article class="panel road-panel"><h3>三步决定下一笔资源</h3><ol class="road-list">'+rows.map(([when,name,body,scene,stage],i)=>{
  const hero=['逆翎','梨梨','谛听'][i],pic=artEntry('people',hero);
  return '<li><div class="road-who">'+(pic?'<img width="48" height="48" src="'+encodeText(pic.src)+'" alt="">':'')+'<div><small>'+when+'</small><h4>'+name+'</h4></div></div><p>'+body+'</p><a href="'+bookNav(scene,stage)+'">'+['看中期推图队','看梨梨在哪些源器本上场','看单体打手的首选与平替'][i]+' →</a></li>';
 }).join('')+'</ol><details class="road-refs"><summary>这三步的依据</summary><p>国服新号实录和源器本的出手说明支持前两步。第三步是按卡点给出的培养建议。</p>'+ref(['s19','run','newbie','rank'])+'</details></article>'+
 '<article class="panel"><h3>有截止时间，哪些要改变顺序？</h3>'+
 '<div class="book-pull"><b>新人池还有时间、但小怪清不动 → 夜离是可选第二池</b><p>先把能用的输出装给炼。仍想立刻换群攻，且夜离自己的保底够，再拿首只；已有夜离或能等 14 日系列任务的瑞玛丽，就不为清波再抽。两张新人 UP 的关池时间按本号池面，不把 14 日任务期限当卡池期限。</p></div>'+
 '<p><b>培养计划与 14 日系列任务：</b>克洛斯、凌罗、瑞玛丽、宁芙涅走固定领取。新手定向的芙蕾雅只在缺全队先手时考虑；她与梨梨解决的问题不同。</p>'+
 '<p><b>11/12 04:00–11/19 03:59（服务器时间）：</b>祈祝之礼只花原本要用的常驻券。积分箱仅有柯卡尔迪、魁洛、席琳丝，不能拿梨梨或莉拉姆。</p>'+
 '<details class="draw-detail"><summary>后期、高难和 PvP 要提前囤谁？</summary><p>'+future+'</p><p>觉醒谛听速刷里的赫妍、绯月鞠属于专项；当前达罗斯是承伤复活位，都不排在这条爆发路线前面。只玩 PvE 不为五队竞技活动临时追人。</p>'+ref(['dar','kuiPool','rank'])+'</details>'+ref(['s19','patch'])+'</article>';
}
function draw(n){
 const owned=selectedHeroes(),part=location.hash.split('/')[1];
 if(!part||part==='order')return summonRoadmap(owned);
 const poolLinks='<div class="draw-pool-links" aria-label="池规则">'+pools.map((p,i)=>'<a href="#draw/'+i+'" '+(part===String(i)?'aria-current="page"':'')+'>'+p[0]+'</a>').join('')+'</div>';
 const poolRules='<details class="draw-detail" id="draw-pools"><summary>查看各池规则与来源</summary>'+poolLinks+'</details>';
 if(/^[0-5]$/.test(part||'')){
  const pool=pools[n];
  return head(pool[0]+' · 池规则','02 / SUMMON')+'<p>'+jump('draw/mine','回到我的抽卡账单')+'</p>'+panel('','对应资源先查这里',pool[1],'<p>'+pool[2]+'</p><p class="stripe">'+pool[3]+'</p><details class="draw-detail"><summary>查看依据</summary>'+ref(pool[4].split(' '))+'</details>')+poolLinks;
 }
 return head('这笔资源给谁？','S19 / 零氪 PvE')+jump('draw/order','先看整条抽取顺序与时间表')+jump('roster/teams','按玩法查队员、平替和获取方式')+'<article class="panel box-pulls draw-current"><div class="box-pull-content">'+ownedPullContents(owned)+'</div></article>'+jump('roster/tiers','对比所有收录角色的前期、后期强度')+pullPriority()+poolRules;
}
const roleCats=['免费骨架','抽到再练','低星对策'];
function roster(n){
 const groups=[
  ['按任务到账顺序投入',['炼','克洛斯','凌罗','瑞玛丽','宁芙涅']],
  ['按你缺的位置选人',['逆翎','夜离','梨梨','芙蕾雅','葵诺丝','什炎','旭光妮璐','达罗斯']],
  ['低稀有先看门槛',['幻音千明','格雷','卡奇','谛听','恶命','缬草']]
 ];
 const [title,names]=groups[n];
 return head('按职责速查','03 / ROSTER')+jump('roster/rank','回到新区培养顺序')+sub(roleCats,n)+panel('',roleCats[n],title,
  names.map(name=>{
   const person=rosterPeople().find(p=>p.name===name);
   return person?'<details><summary>'+encodeText(name)+'</summary><p>'+encodeText(person.priority)+'</p>'+jump(personRoute(name),'看当前依据和替代条件')+'</details>':'';
  }).join('')+ref(n===0?['s19','run']:['rank','awake','nicole']));
}
function fight(n){
 const [label,index]=fightRoutes[n],scene=allScenes()[index];
 return head('副本打法','04 / BOSS LAB')+jump('roster/teams/'+(['story','gear','shell','gear','gear','shell'][n]),'查看这个玩法的具体队伍与替位')+sub(fightRoutes.map(([title])=>title),n)+grid(
  panel('',label,encodeText(scene.name),'<p class="lead">'+encodeText(scene.goal)+'</p><p class="stripe">'+encodeText(scene.teamLabel)+'</p>'+
   step([['配置',encodeText(scene.team)],['实际打法',encodeText(scene.rotation)]])+jump('roster/mine/'+index,'按我已有的角色配这关')+jump('roster/scene/'+index,'看完整场景、换人和出处')+(n===5?jump('roster/scene/5','另看莎朗'):'')+roleRefs(scene.sources)),
  panel('tint','体力去向','按材料缺口刷',
   step([['秘闻调查 · 经验','先检查背包。只养一队时角色经验可能有余，缺多少再刷多少。'],['源点前哨 · 潜能','主力被潜能卡住时刷对应材料。'],['熔断禁区 · 源器','先拿能用的主词条，再提高层数。'],['凶影追缉 · 智壳','先完成任务，需要具体智壳再刷。新区三项双倍没有这一项。']])+ref(['s19','run'])));
}
const filters=['新区专属','顺手可做','限时抽卡','可以跳过'];
function cal(n){const group=[[0,1,2],[3,4],[5,6],[7,8]][n];return head('活动日历','05 / CALENDAR')+jump('roster/teams/event','查看活动队伍和参与条件')+sub(filters,n)+grid(panel('',filters[n]+'　/　11 月服表','活动与截止时间',group.map((id,i)=>{const e=events[id];return '<details '+(i===0?'open':'')+'><summary>'+e[1]+' <span class="tag">'+e[2]+'</span></summary><div class="code" style="margin-top:9px">'+e[0]+'</div><p>'+e[3]+'</p>'+ref([e[4]])+'</details>'}).join('')),panel('tint','CLOCK / 两种时间','别错过两个节点',step([['11/12 04:00　常驻积分开始','准备花的常驻券留到这时；新手专属池、极相限定抽数另算。'],['11/19 03:59　常驻积分截止','开服第 14 天是 11/18。签到、培养和特训营分别核对活动页，截止时刻不一律按零点推算。']])+'<p class="note">日期按北京时间规划。标「服务器时间」的活动遵照区服重置。此页为开服前已公布的排期，后续更新以官方为准。</p>'+ref(['s19','patch'])))}
function evidence(){return head('资料与核对','06 / REFERENCES')+grid(panel('','PRIMARY SOURCES / 一手信息','已确认的规则','<p>开服时刻、赠送角色、UP 名单以及活动周期优先使用国服 S19 原公告。页面内的抽取优先级和体力安排是面向零氪 PvE 的规划建议。</p>'+ref(['s19','patch','dar'])+'<p class="stripe">开服要现场确认：夜离与逆翎的倒计时、各池保底和继承范围、光暗自选是否发放及其名单、各任务的逐日门槛。没有把旧服的总抽数当作新区承诺。</p>'),panel('tint','FIELD NOTES / 玩家实战','配队与版本差异','<p>11 月开服前以最近的新号通关和国服更新核对。图鉴保留带日期的旧截图用于认人、认入口。未见近期完整通关队的场景，只列原帖实测部分。</p>'+ref(['run','newbie','rank','nicole','awake'])))}
function refreshProgress(){const inputs=[...app.querySelectorAll('[data-task]')];if(!inputs.length)return;let d=inputs.filter(x=>x.checked).length;document.getElementById('done').textContent='本阶段完成 '+d+' / '+inputs.length;document.getElementById('bar').style.width=(100*d/inputs.length)+'%'}
function render(){
 const [page,part,topic]=location.hash.slice(1).split('/');
 const idx=Math.max(0,tabs.findIndex(t=>t[0]===(page==='week'?'day1':page)));
 const key=tabs[idx][0];
 const sizes=[openingPlan.length,1,stages.length,pools.length,roleCats.length,fightRoutes.length,filters.length,1,3];
 let n=Number(part)||0;if(!Number.isInteger(n)||n<0||n>=sizes[idx])n=0;
 if(!page && state.lastChecklist!=='day1'){state.lastChecklist='day1';save()}
 if(key==='day1' && page && /^(day1(\/[0-3])?|week\/[2-7])$/.test(location.hash.slice(1))){state.lastChecklist=location.hash.slice(1);save()}
 nav.classList.remove('expanded');nav.innerHTML=guideNav(key);
 if(page==='week' && weekDays.some(plan=>plan.day===Number(part))){app.innerHTML=weeklyChecklist(Number(part))}
 else if(key==='roster' && !['0','1','2'].includes(part)){app.innerHTML=roleLibrary(part,topic)}
 else if(key==='manual'){app.innerHTML=fieldManual(part,topic)}
 else{app.innerHTML=[dayOne,null,route,draw,roster,fight,cal,evidence,atlasView][idx](n,topic);const link=key==='draw'?'':fieldRelated(key,n);if(link)app.querySelector('.sectionhead')?.insertAdjacentHTML('afterend',link)}
 app.dataset.key=key;if(key!=='roster'||['0','1','2'].includes(part))illustratePage(key,n,part,topic);refreshProgress();
 flowAfterRender(key);
 const heading=app.querySelector('h2')?.textContent||tabs[idx][1];
 document.title=(key==='day1'?(page==='week'?'第 '+part+' 天':'第 1 天')+' · ':'')+heading+' · 伊瑟 S19 开荒手册';
}
app.addEventListener('click',e=>{const el=e.target.closest('[data-sub]');if(el)location.hash=app.dataset.key+'/'+el.dataset.sub});
app.addEventListener('change',e=>{if(e.target.matches('[data-task]')){state['t'+e.target.dataset.task]=e.target.checked;save();refreshProgress()}});
// Save the reading position before leaving a view. Browser Back can then restore it.
function saveScroll(){history.replaceState({...history.state,guideY:scrollY},'')}
document.addEventListener('click',e=>{if(e.target.closest('a[href^="#"],[data-sub]'))saveScroll()},true);
document.addEventListener('change',e=>{if(e.target.matches('select'))saveScroll()},true);
window.addEventListener('hashchange',()=>{
 const previousY=history.state?.guideY;
 if(findDialog.open)findDialog.close();
 render();
 if(!Number.isFinite(previousY)&&focusLinkedTeam())return;
 if(Number.isFinite(previousY))requestAnimationFrame(()=>window.scrollTo(0,previousY));
 else {const headingY=app.getBoundingClientRect().top+scrollY-nav.offsetHeight;if(scrollY>headingY)window.scrollTo(0,Math.max(0,headingY));}
 if(document.activeElement===document.body)app.focus({preventScroll:true});
});
document.querySelector('.skip-guide').addEventListener('click',()=>{app.focus({preventScroll:true});app.scrollIntoView({block:'start'});});
document.querySelector('.return-top').addEventListener('click',()=>{document.querySelector('#nav a')?.focus({preventScroll:true});window.scrollTo(0,0);});
if(!location.hash && state.lastChecklist)history.replaceState(null,'','#'+checklistLocation());
render();
requestAnimationFrame(focusLinkedTeam);
