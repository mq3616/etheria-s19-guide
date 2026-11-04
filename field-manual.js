'use strict';
const guideGroups = [
 ['growth','起号与资源',()=>window.growthNotes],['hero','选人与配装',()=>window.heroNotes],['boss','逐个打 Boss',()=>window.bossNotes],['compare','实录与版本核对',()=>window.comparisonNotes]
];
function encodeText(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function topicHref(g,i){return '#manual/'+g+'/'+i}
function topicMatch(g,pattern){const group=guideGroups.find(x=>x[0]===g);let i=group[2]().findIndex(x=>pattern.test(x.title));return topicHref(g,Math.max(0,i))}
function fieldRelated(key,n){
 let choices=[];
 if(key==='route')choices=n<2?[['growth','首日与任务',/从建号|首日|开局|超链之证/],['compare','S19起号与实际预算',/零氪/]]:[['growth','体力和装备怎么投',/体力|资源|源器/],['boss','逐本对照作业',/兵祸/]];
 if(key==='draw')return '<div class="related"><span class="label">继续查</span><a href="#roster/rank">当前角色培养顺序 ↗</a><a href="#manual/compare/0">S19 卡池条件与预算 ↗</a></div>';
 if(key==='roster')choices=[['hero','角色替代与投入条件',[/实际领取/,/当季新卡/,/谛听觉醒/][n]]];
 if(key==='fight' && n===0)return '<div class="related"><a href="#roster/scene/0">看起步队和换人顺序 ↗</a></div>';
 if(key==='fight')choices=[['boss','打开详细编队与翻车排查',[/兵祸/,/兵祸/,/娜娜/,/多琪/,/奥[洛罗]拉/,/赫妍|莎朗/][n]]];
 if(key==='calendar')choices=[['growth','体力怎么分',/体力|资源/]];
 if(key==='evidence')choices=[['compare','看近期实录与 S19 实战核对',/自选|起号/]];
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
window.comparisonNotes = [
  {
    "title": "S19起号：先分清三个池，再选第一只目标",
    "subtitle": "按S19公告和10月新号实录，先核池面，再按实际缺口补首只。",
    "sections": [
      [
        "公告确认了什么",
        "11月5日开放S19；夜离与逆翎有新手限时UP，芙蕾雅加入新手定向。定向名单增加一人，不等于官方宣布她优先级最高。先领可得奖励、看已持有角色和每个池的规则，再确定补位。"
      ],
      [
        "三笔券不能混算",
        "夜离/逆翎新手池、达罗斯极相限定、常驻召唤分别核票种、剩余次数与时间。达罗斯专属公告写80抽内必得，但S19开服公告没有详述两个新手目标的全部规则，不跨池套用。常驻券不计作限定保底资金。"
      ],
      [
        "本站建议怎样停手",
        "免费队能推时先推进；有明确缺口且当前池预算可覆盖，再补一个本体。逆翎作为驱散/增伤候选，芙蕾雅作为增益/调度候选，均不是建号门槛。已经拥有就保存，不为了抽原质或“垫抽”追加。"
      ],
      [
        "自选与活动箱分开核对",
        "实际领到自选物品时，打开预览核对名称、名单和到期日；还没有领到就不预支这份资源。祈祝之礼的三选一跃格箱不当作梨梨或其他极相角色自选。先把免费队任务推进，活动奖励到账后再分配。"
      ]
    ],
    "sources": [
      [
        "国服官方｜S19开服与本服赠送、卡池名单",
        "https://www.taptap.cn/moment/866719390408642161"
      ],
      [
        "国服官方｜达罗斯极相限定80抽公告，仅指该召唤类型",
        "https://www.taptap.cn/moment/865337798482199546"
      ],
      [
        "x佛系摸鱼｜2026-10-17修改，新号专属资源与三本机制正文",
        "https://www.taptap.cn/moment/860227779365438892"
      ]
    ]
  },
  {
    "title": "三个本，检查三种不同的出手窗口",
    "subtitle": "按10月原玩家实录检查副本窗口，先让机制生效，再追主攻伤害。",
    "sections": [
      [
        "兵祸：先防止队员被击杀",
        "10月17日原攻略强调BOSS击杀后再动的危险。本站验收顺序是先确认保护能及时生效，再检查驱散和破防，最后才追求一轮秒。队员第一轮就倒时，增加第二名打手通常不是第一项修正。"
      ],
      [
        "多琪：先让控制解除减伤",
        "同一近期原作把“控制后才能有效输出”列为核心。先看怪物吃的是哪类控制、控制是否实际命中，再让群攻接上。免疫、抵抗与控制断档要分别排查，不能只加主C攻击。"
      ],
      [
        "奥洛拉：看拉条结算后的实际顺序",
        "近期正文明确凌罗需要在被梨梨拉条后的谛听之前完成治疗。验证的是拉条结算后谁先动，不是把裸速度从高到低抄一遍。伤害还没解锁就交掉爆发，装备再好也会浪费。"
      ],
      [
        "怎样从一场扩到连续战斗",
        "本站操作建议：手动过一场→同队同装短批自动→观察进入BOSS的首轮与技能循环。每次只修一个问题，目标错误先调目标，顺序错误先调速度/拉条，机制完整后再补伤害。三场只是观察样本，不代表官方稳定率保证。"
      ]
    ],
    "sources": [
      [
        "x佛系摸鱼｜2026-10-17修改，新号专属资源与三本机制正文",
        "https://www.taptap.cn/moment/860227779365438892"
      ]
    ]
  },
  {
    "title": "凑不齐豪华阵容，先交接免费队的岗位",
    "subtitle": "先给免费队交接岗位和专属资源，再判断抽到的人能解决什么问题。",
    "sections": [
      [
        "先写这关缺哪一件事",
        "输出负责击杀、削弱负责提高有效伤害、增益/调度负责铺垫、生存负责保住关键回合。四人和五人本分别看实际人数，不把某个作者的五人队硬塞进剧情关。"
      ],
      [
        "新送的人先接原岗位",
        "克洛斯接原削弱位、凌罗接过渡生存位。先移交当前岗位装备再跑同一关，别为新人一次重做全队。瑞玛丽和宁芙涅走14日系列任务，不写成某个固定日必定到账。"
      ],
      [
        "通用晶格先与专属材料分账",
        "近期新号攻略明确专属金块重置后仍专属。专属资源随任务用，通用SSR材料先看关键节点能否改善当前结果，不因“迟早要练”就一次点满所有人。"
      ],
      [
        "再考虑替补的条件",
        "只有单体BOSS拖轮、而现有输出确实不适合时，再让已有SR谛听试单体位；缺控制或生存，就先修相应岗位。让替补先达到能活着出手的程度，再用同一关对比是否减少回合和翻车。"
      ]
    ],
    "sources": [
      [
        "国服官方｜S19开服与本服赠送、卡池名单",
        "https://www.taptap.cn/moment/866719390408642161"
      ],
      [
        "x佛系摸鱼｜2026-10-17修改，新号专属资源与三本机制正文",
        "https://www.taptap.cn/moment/860227779365438892"
      ],
      [
        "LilyQAQ｜2026-10-28新号1到80级，已读正文",
        "https://www.taptap.cn/moment/864509086933189597"
      ]
    ]
  },
  {
    "title": "首次打炼狱：把面板截图变成检查表",
    "subtitle": "看当前技能页、关卡规则和库存，先完成一个能改变通关结果的节点。",
    "sections": [
      [
        "先认数字，不先抄数字",
        "511只表示三个技能的当前等级，不等于该角色永远该这样养。专属材料是否覆盖、关键概率在哪一级、是否缩短冷却，都在当前技能页面确认。觉醒前后、普通与异体角色分别核对。"
      ],
      [
        "看主C为什么能在那一轮输出",
        "面板截图需要配合录像的增益、破防、目标减伤和技能循环理解。单看暴伤或战力无法解释一枪过关。本站建议记录首轮实际收到的状态，再决定缺的是装备还是辅助。"
      ],
      [
        "检查目标设置的作用边界",
        "自动攻击目标决定打哪个敌人；己方顺序由速度、行动条与再动效果共同决定。保存前看目标预览，开场再观察一轮。若主攻被拉到治疗或削弱之前，先改相关速度和目标，不继续堆输出。"
      ],
      [
        "稳定之后再省回合",
        "第一次手动赢说明能够通关；持续自动不减员、不失去机制窗口后，才尝试减生存或加速。记录失败发生的阶段，每次只改速度、命中、生存或输出中的一项。"
      ]
    ],
    "sources": [
      [
        "x佛系摸鱼｜2026-10-17修改，新号专属资源与三本机制正文",
        "https://www.taptap.cn/moment/860227779365438892"
      ],
      [
        "国服官方｜2026-11-04：达罗斯、祈祝之礼与日常优化",
        "https://www.taptap.cn/moment/866390674507827526"
      ]
    ]
  },
  {
    "title": "速度胚怎么挑：先保上阵与替补，再处理库存",
    "subtitle": "先锁住正在穿和明确会用的备件，再用当前确认页检查继承、重构与回收。",
    "sections": [
      [
        "先保实际会用的装备",
        "本站建议先锁主队正穿、已确定的替补件与功能主词条。速度、效果命中、生命等价值取决于岗位，不用“没有双暴就全清”的单一规则。"
      ],
      [
        "升级前先看会不会破坏出手顺序",
        "输出换装后若抢到破防之前，面板上升未必提升通关效率。辅助换生存装后若来不及出手，也要回头看速度。先同关复测，再决定是否追加随机词条投入。"
      ],
      [
        "继承前看结果预览",
        "先选要保留的本体和矩阵，再核对消耗品、星级与被动将怎样变化。预览与目标不一致就退出；先做一件并回到角色面板核对，再考虑批量。赌速只处理已有可靠替代的多余件。"
      ],
      [
        "回收加成只处理淘汰品",
        "11月5日至12日的回收活动按符合条件的源器提高基础回收价格，不是鼓励先强化垃圾再卖。先看资格与倍率，再单件确认；主队与替补件不为活动进度拆掉。"
      ]
    ],
    "sources": [
      [
        "国服官方｜2026-11-04：达罗斯、祈祝之礼与日常优化",
        "https://www.taptap.cn/moment/866390674507827526"
      ]
    ]
  },
  {
    "title": "陪跑改成四个节点，不追别人的“第几天”",
    "subtitle": "把任务推进、账号升级、过渡装备和第二套队分开处理，按通关结果前进。",
    "sections": [
      [
        "节点一：可用队先推主线",
        "先用已领取的人完成教程与任务，不等梨梨、逆翎、芙蕾雅齐全再开始。培养计划与超链之证同时查看，能一场兼顾两份任务时优先。"
      ],
      [
        "节点二：分清两种经验",
        "账号等级卡住不代表角色经验道具不足。先看主队面板，人物经验够用时刷能补当前潜能或装备缺口的稳定本；人物升级材料确实不足才补经验。做完这次提升就回原关复测。"
      ],
      [
        "节点三：壳能上场就先用",
        "当前主动效果有用、矩阵能接上已有装备，就具备过渡价值。早期暂不为理想三矩阵停住主线；换新壳前对比实际套装阈值和行动顺序。"
      ],
      [
        "节点四：按机制扩第二套队",
        "主队已经稳定刷本，再准备单体、控制或不同保护方式的替补。先读目标本限制，再看已有角色谁能满足；不用为每个副本都重新抽一队。签到、双倍与任务领取分别看当前活动页。"
      ]
    ],
    "sources": [
      [
        "国服官方｜S19开服与本服赠送、卡池名单",
        "https://www.taptap.cn/moment/866719390408642161"
      ],
      [
        "LilyQAQ｜2026-10-28新号1到80级，已读正文",
        "https://www.taptap.cn/moment/864509086933189597"
      ]
    ]
  },
  {
    "title": "领了瑞玛丽，要不要立刻换掉炼？",
    "subtitle": "S19确认14日系列任务送人；具体领取日与替换收益都需要自己的任务进度和同关测试。",
    "sections": [
      [
        "先确认真的到手，再安排培养",
        "没领取时继续现有主C，不提前把通用材料花完。领到后先读当前技能伤害依据与被动触发条件，按当前倍率另配装备，不能假设整套炼的攻击装一定合适。"
      ],
      [
        "挑你真正卡住的那种关卡比较",
        "在同一个多波次关卡，分别让两名输出接同一组辅助。看清小怪需要几轮、进入BOSS时关键技能还剩什么、是否有人减员。不要拿一场有利属性的小怪录像推导所有单体本结论。"
      ],
      [
        "先不要重置旧主C",
        "新队尚未验收时，保留炼的过渡装备和原岗位。确实更稳更省回合，再集中后续材料；仍是单体BOSS拖轮时，先判断是否需要专门单体位，别默认所有问题由换群攻解决。"
      ],
      [
        "保留两套能交换的输出装备",
        "先给两人各留一套适合当前技能的装备，锁住关键主属性与配速件。同一关比较击杀回合、减员与技能衔接，再决定后续资源给谁。单体首领与多波小怪分别比较，不用一场成绩决定全部岗位。"
      ]
    ],
    "sources": [
      [
        "国服官方｜S19开服与本服赠送、卡池名单",
        "https://www.taptap.cn/moment/866719390408642161"
      ],
      [
        "LilyQAQ｜2026-10-28新号1到80级，已读正文",
        "https://www.taptap.cn/moment/864509086933189597"
      ]
    ]
  }
];

document.addEventListener('click',e=>{if(!e.target.matches('.toggle-sections'))return;const list=[...document.querySelectorAll('.field-section')];const open=!list.every(x=>x.open);list.forEach(x=>x.open=open);e.target.textContent=open?'收起本篇步骤':'展开本篇全部步骤';e.target.setAttribute('aria-expanded',String(open))});