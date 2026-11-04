'use strict';
const guideGroups = [
 ['growth','起号与资源',()=>window.growthNotes],['hero','选人与配装',()=>window.heroNotes],['boss','逐个打 Boss',()=>window.bossNotes],['compare','原片拆招',()=>window.comparisonNotes]
];
function encodeText(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function topicHref(g,i){return '#manual/'+g+'/'+i}
function topicMatch(g,pattern){const group=guideGroups.find(x=>x[0]===g);let i=group[2]().findIndex(x=>pattern.test(x.title));return topicHref(g,Math.max(0,i))}
function fieldRelated(key,n){
 let choices=[];
 if(key==='route')choices=n<2?[['growth','首日与任务',/从建号|首日|开局|超链之证/],['compare','老区起号与 S19 的差异',/零氪/]]:[['growth','体力和装备怎么投',/体力|资源|源器/],['boss','逐本对照作业',/兵祸/]];
 if(key==='draw')choices=[['hero','查看英雄养成详解',new RegExp(['逆翎','定向','梨梨','夜离','停手','停手'][n])],['compare','原片如何按预算分流',/零氪/]];
 if(key==='roster')choices=[['hero','英雄配装及替代位',[/炼与克洛斯/,/梨梨/,/缺角色/][n]]];
 if(key==='fight')choices=[['boss','打开详细编队与翻车排查',[/兵祸/,/兵祸/,/娜娜/,/多琪/,/奥[洛罗]拉/,/赫妍|莎朗/][n]]];
 if(key==='calendar')choices=[['growth','体力怎么分',/体力|资源/]];
 if(key==='evidence')choices=[['compare','看视频规则与 S19 的实战对照',/自选|起号/]];
 return choices.length?'<div class="related"><span class="label">进阶读法</span>'+choices.map(([g,label,re])=>'<a href="'+topicMatch(g,re)+'">'+label+' ↗</a>').join('')+'</div>':''
}
function fieldManual(part,topic){
 const g=guideGroups.find(x=>x[0]===part)||guideGroups.find(x=>x[0]==='compare'),notes=g[2]();const n=Number(topic)>=0&&Number.isInteger(Number(topic))&&Number(topic)<notes.length?Number(topic):0;
 const item=notes[n],link=i=>topicHref(g[0],i),esc=encodeText;
 const switcher='<div class="libnav" aria-label="实战专题">'+guideGroups.map(([k,label,fn])=>'<a '+(k===g[0]?'aria-current="true"':'')+' href="'+topicHref(k,0)+'">'+label+' · '+fn().length+'</a>').join('')+'</div>';
 const sourceLinks=item.sources.map(([label,url])=>'<a target="_blank" rel="noopener" href="'+esc(url)+'">'+esc(label)+' ↗</a>').join('');
 const dirs=notes.map((x,i)=>'<a href="'+link(i)+'" '+(n===i?'aria-current="page"':'')+'>'+String(i+1).padStart(2,'0')+'　'+esc(x.title)+'</a>').join('');
 const textBlocks=item.sections.map(([k,t],i)=>'<details class="field-section" '+(i<2?'open':'')+'><summary><span class="field-no">'+String(i+1).padStart(2,'0')+'</span>'+esc(k)+'</summary><p>'+esc(t)+'</p></details>').join('');
 const pager='<div class="notepager">'+(n>0?'<a href="'+link(n-1)+'">← 上一篇</a>':'<span></span>')+(n+1<notes.length?'<a href="'+link(n+1)+'">下一篇 →</a>':'')+'</div>';
 return head('开荒实战详解','FIELD MANUAL / S19')+switcher+'<label class="lib-mobile">选择本组条目<select aria-label="选择本组条目" class="choice" id="topicSelect">'+notes.map((x,i)=>'<option value="'+link(i)+'" '+(n===i?'selected':'')+'>'+esc(x.title)+'</option>').join('')+'</select></label><div class="grid libgrid"><article class="panel"><div class="label">'+esc(g[1])+' / '+(n+1)+' OF '+notes.length+'</div><h3>'+esc(item.title)+'</h3><p class="lead">'+esc(item.subtitle)+'</p>'+'<button type="button" class="toggle-sections" aria-expanded="false">展开本篇全部步骤</button>'+textBlocks+pager+'</article><aside class="panel"><div class="side-topics"><div class="label">本组目录</div><div class="topic-links">'+dirs+'</div></div><div class="label">本篇依据与演示</div><div class="chapter-list">'+sourceLinks+'</div></aside></div>';
}
document.addEventListener('change',e=>{if(e.target.id==='topicSelect')location.hash=e.target.value});
const s19Official=['新区 · S19 忘忧梦火开服公告','https://www.taptap.cn/moment/866719390408642161?group_id=333480'];
const clip=(name,bv,sec)=>[name,'https://www.bilibili.com/video/'+bv+'/?t='+sec];
window.comparisonNotes=[
 {title:'零氪该攒票，还是抽第一只逆翎？',subtitle:'两位作者聊的是不同预算。先看自己手里是什么票，再谈角色谁更强。',sections:[
 ['视频里的取舍','解说七老爷分别讨论开局体验、长期泛用和零氪预算。前段认可逆翎的长期用途，也看重夜离的清图体验；到专讲纯零氪的一段，他给出了放过两个光暗限时池的打法。这两条建议适用的人不同。'],
 ['另一份首周路线','yys靠脸混饭在首周规划中把逆翎当泛用辅助，也区分了可以先用常驻试水的账号和资源有限的账号。两份旧攻略真正共同的提醒，是别在开局把每个池都当必抽。'],
 ['S19 第一轮实际怎么做','先用炼清图，检查培养计划何时领克洛斯、凌罗。能打就保留晶钻；有必须使用的赠券再按票种花。目标写“逆翎第一只”，不等于要求第一天把晶钻换成极相票。'],
 ['什么时候按抽取键','若倒计时内仅靠已到账的专用票和愿意投入的晶钻便能覆盖剩余保底，而且你会让逆翎在打手之前挂削弱，抽一只即停。否则继续用克洛斯，能稳定刷本就算开局成功。'],
 ['开服旧截图里出现的自选','旧视频展示的是当年的启鸣活动。S19 明列四名任务赠送 SSR、夜离/逆翎 UP 和新增的新手定向人选，但没有重申旧极相箱的领取日或名单。看到自己的箱子再选。']],sources:[clip('解说七老爷 · 02:50 起分预算讨论，约 03:00 转入零氪方案','BV1anJ9zTEX5',170),clip('yys靠脸混饭 · 03:32 起看限定和常驻取舍；约 04:36 看旧签到页面','BV1RLntzBEZv',212),s19Official]},
 {title:'同一组辅助，打三个本要换三次顺序',subtitle:'原片是 2025 年炼狱自动示范。看主攻真正出手的时刻，比抄一个裸面板速度更可靠。',sections:[
 ['兵祸：逆翎 → 芙蕾雅或宁芙涅 → 主攻','这是 yys靠脸混饭展示的直伤轴。芙蕾雅吃到增益后会自拉条；梨梨又会拉主攻。真正的验收是两次拉条结算完，主攻仍吃得到辅助增益。视频示范还用了缬草，零氪新号不要预设已有。'],
 ['多琪：逆翎 → 酣梦一宵 → 输出','先处理削弱，再让控制覆盖小怪。梨梨拉完条后，主攻仍须在酣梦一宵之后。原片把满三技能的莉露摩卡作为输出选项；已经养了夜离的账号可以继续用夜离，免得仅为这一本再养一个昂贵打手。'],
 ['奥洛拉：主攻排在辅助之后，尤其是凌罗','原片一套五人是梨梨、逆翎、夜离或莉拉姆、蝰蛇、凌罗。治疗与驱散处理完这波机制，再交输出。拿同一组速度装从兵祸直接搬来，很容易在奶妈出手前就放掉主攻大招。'],
 ['把视频作业改成自己的队','开场先手动观察一轮，再开自动对照目标。只改一个变量：先修自动攻击目标，再修谁先动，最后才加伤害。买票或抽新角无法修正自动打错目标。']],sources:[clip('yys靠脸混饭 · 01:10 起，兵祸队伍与拉条后的实战顺序','BV1QvxYzZEJK',70),clip('同片 · 03:04 起，多琪控小怪；03:36 起看配速','BV1QvxYzZEJK',184),clip('同片 · 05:05 起，奥洛拉配队和治疗顺序','BV1QvxYzZEJK',305)]},
 {title:'凑不出豪华阵容，先换哪一个位置？',subtitle:'把“少一名 SSR”拆成速度问题、伤害问题，或者能否活到第二轮的问题。',sections:[
 ['敌人第二手打出来就减员','甜茶狸Clo 的开荒演示专门给了低稀有恶命一个位置：他的群体减攻、推条可以让低练队多活一轮。遇到吃这类减益的敌人，用他换下一个打不出多少伤害的副 C，再观察第一位倒下的人。免疫目标不能照搬。'],
 ['已经活得住，但 Boss 打太慢','此时再把保护位换回单体主攻或破防位，别一直挂着双奶。先看攻击落下前破防标识在不在；看不到就改速度、命中或驱散。缺单体 SSR 时，优先试已有的 SR 谛听。'],
 ['新号只有炼时怎么穿','甜茶狸Clo 演示过偏攻击的过渡搭法，也列了带暴击、暴伤的输出思路。开局先用现成主词条正确的攻装把小怪清掉；暴击并不稳定时，别为了暴伤显示更高而拆掉暴率。'],
 ['本轮 S19 怎么省','任务会给克洛斯和凌罗。可过图时暂不重投第二个破防手或第二个治疗。等遇到需要免疫、解控、承伤方式不同的本，再决定把哪位替补练到能活着出手。']],sources:[clip('甜茶狸Clo · 01:10 起，炼的智壳与源器过渡','BV1Lw4BzSETj',70),clip('甜茶狸Clo · 02:46 起，低练补恶命的演示','BV1Lw4BzSETj',166),s19Official]},
 {title:'首次打炼狱：看懂录像里的装备与技能数字',subtitle:'这是一套作者曾用过的面板，拿它定位短板；开服第一周不需要把所有人养到这个规格。',sections:[
 ['技能 511 到底是什么意思','三个数字依次是 S1、S2、S3 的等级。yys靠脸混饭在兵祸段列过梨梨 511，兼顾速度与生存；同片对逆翎给出了低投入起步与满技能终点。别把片中毕业数字当入场券。'],
 ['主攻的参考配置','这套炼狱直伤作业给莉拉姆配狂怒、穿刺或乘势的输出组合，智壳举例伯爵、白獠武者；夜离举例启示录。原片也讲了没有目标矩阵时先用攻势、收割等过渡。照抄外壳前先看自己的暴击和行动顺序。'],
 ['自动打到谁，比谁面板高更早排查','连续战斗设置里可以调整自动攻击目标优先级，也能设置失败停止。开一场看是打本体还是打手。不要把“目标顺序”误当成能拖动己方英雄出手顺序，后者要用角色速度和拉条控制。'],
 ['用哪一层刷','第一次勉强手动过，只说明这队能赢。下一步开几轮自动，记下失败时对应的免疫、控制与治疗窗口；连续翻车先退到稳定层。视频里的通关秒数有装备与技能前提，不用为追那个秒数升级整队。']],sources:[clip('yys靠脸混饭 · 00:50 起，自动设置与目标优先级','BV1QvxYzZEJK',50),clip('同片 · 01:36 起，辅助技能与词条','BV1QvxYzZEJK',96),clip('同片 · 02:20 起，输出矩阵和过渡替代','BV1QvxYzZEJK',140)]}
];
window.comparisonNotes.push(
 {title:'速度胚怎么挑？先把“赌高速”和“马上能穿”分开',subtitle:'芥末Glacier 的装备界面实录 · 先看矩阵点数，再决定哪些胚子值得强化。',sections:[
 ['先算点数，再锁一件','在角色面板把源器与智壳的同名矩阵点数相加，检查是否刚好跨档。旧片用 12 疾驰配 6 迅光天击或疾影强袭举例：前者兼顾命中，后者兼顾攻击。对需要先动又得挂减益的辅助，先考虑实际收益对应的那一组。'],
 ['把备件和赌速胚分成两堆','第一堆留给马上要上场的角色，主属性对、矩阵接得上，先锁。第二堆才是专为速度副词条摸奖的多余件。视频中出现的“+3 没给速度就放弃”，指的是后者，不适用于全队仅有的一件合格暴率或效果命中主属性。'],
 ['智壳继承看准方向','视频约 04:10 展示“当前智壳”与“消耗智壳”。当时的界面写明：保留当前壳矩阵，把消耗壳的星级、等级和被动继承过来。先选你想留下的矩阵胚，再检查左右预览；当期界面结果不一致就退出。'],
 ['S19 的操作顺序','先锁正穿装备与替补件 → 给破防手凑速度和命中 → 装上跑一轮 → 确认主攻顺序没被打乱 → 最后才批量回收。新区回收加成只处理淘汰品，不改变上述判断。']],sources:[clip('芥末Glacier · 00:10 起，源器与智壳合计矩阵','BV1D3nyzLERZ',10),clip('同片 · 02:30 起，备用源器与赌速装备分流','BV1D3nyzLERZ',150),clip('同片 · 03:55 起看被动，04:10 起看继承界面','BV1D3nyzLERZ',235)]},
 {title:'陪跑视频里的“第几天”，改成四个通关节点',subtitle:'对照两位 UP 的第一周实录：抓能复用的推进顺序，把旧签到、买体力次数与抽卡数剥离。',sections:[
 ['节点一：剧情队够用就先走','月见黑black 的四人剧情段先用炼，给辅助和奶各留位置，并展示格雷与恶命。S19 可先让格雷给炼铺垫，培养计划领到克洛斯后再换；如果一直被敌方先手打死，保留恶命试一轮。四人剧情和五人副本的上阵位要分开。'],
 ['节点二：没主线时再交任务','两个视频都展示了超链之证。暂停剧情后先打开未完成页，对照它点名的副本、件数或角色成长目标；同一次战斗能同时推进培养计划和超链之证时优先。做完仍卡等级，再补经验本。'],
 ['节点三：先给主力装一个能用的壳','月见黑在约 05:00 展示前期过渡的输出壳黄昏骑士。刷到能用的一只就让它上岗，先看效果是否帮主攻收小怪。后续到了智壳本再替换；没必要为了过渡壳把所有体力都用完。'],
 ['节点四：缺单体时再分资源','陪跑后段演示了 SR 谛听的面板，再转向高难智壳本。把“多养一名输出”的时点设在能清小怪但 Boss 残血反复拖轮的时候。如果问题是减益没中、奶没跟上，先解决那件事，暂缓养第二个打手。']],sources:[clip('月见黑black · 01:10 起，剧情队与低稀有辅助','BV1nhHtzHEHH',70),clip('同片 · 04:55 起，前期智壳选择','BV1nhHtzHEHH',295),clip('同片 · 07:05 起，谛听与后续智壳本','BV1nhHtzHEHH',425),clip('yys靠脸混饭 · 00:35 起，卡等级与超链之证','BV1RLntzBEZv',35),s19Official]},
 {title:'领了瑞玛丽，要不要立刻换掉炼？',subtitle:'看瑞玛丽的触发条件，再判断自己卡的是一群小怪还是一个高血量 Boss。',sections:[
 ['实战要观察什么','甜茶狸Clo 的技能演示把额外释放大招和技能冷却分开讲：瑞玛丽被动随战场受伤积累，满足条件可额外打出群攻。场上单位多、频繁受伤或倒下的关卡，与孤立的高血量目标，触发节奏会不一样。'],
 ['不要默认对首领也能斩杀','视频特别区分了对首领的限制。普通怪被处理掉的画面不能推导出同样能对 Boss 直接斩杀。当前服的触发阈值、目标描述与冷却逐项看角色技能页。'],
 ['S19 的免费试队','先保留炼原装备，给瑞玛丽一套能触发生命倍率优势的生命与暴击向装备。在同一个多波次关卡分别跑两次，观察谁能在小怪第二轮前结束、谁更常触发额外攻击。只有单体 Boss 太慢，就让谛听或已有莉拉姆试位置。']],sources:[clip('甜茶狸Clo · 00:18 起，瑞玛丽被动与首领限制','BV1BdsVzUET7',18),clip('同片 · 00:52 起，看受伤触发与组队思路','BV1BdsVzUET7',52),['瑞玛丽面板、生命倍率与配装交叉参考','https://news.17173.com/content/10222025/223906449.shtml'],s19Official]}
);

document.addEventListener('click',e=>{if(!e.target.matches('.toggle-sections'))return;const list=[...document.querySelectorAll('.field-section')];const open=!list.every(x=>x.open);list.forEach(x=>x.open=open);e.target.textContent=open?'收起本篇步骤':'展开本篇全部步骤';e.target.setAttribute('aria-expanded',String(open))});