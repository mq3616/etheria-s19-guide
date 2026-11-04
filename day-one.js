'use strict';

const openingPlan = [
  {
    tab:'进服领人', title:'先进 S19，用炼打通教程', refs:['s19','start'],
    tasks:[
      ['server','10:00 后选「S19－忘忧梦火」','11 月 5 日，北京时间。建角前看清服名；列表暂时没有就重启再看。'],
      ['lian','领到炼，把第一份经验给她','沿教程和主线解锁召唤与活动。炼负责清一波小怪，先穿背包里最好的攻击向源器。教程固定给炼就直接用。若随后是随机首抽，有逆翎就省下限定预算；有夜离就留下当主攻；两人都没出也继续推，后面还有定向和赠送角色。'],
      ['gifts','签到后看两张奖励表','先领当日签到和新链成长计划已解锁的源器、材料。点进异格者培养计划，记下离克洛斯、凌罗最近的领取条件。瑞玛丽和宁芙涅另走 14 日系列任务，今天只做已开放的部分。']
    ],
    hint:'现在能用的队伍', note:'三人骨架是炼＋削弱＋治疗。克洛斯还没到，用已有的格雷先手削弱；凌罗还没到，用已有的多乐丝等治疗。开放第四个位置再放节奏辅助。', people:['炼','克洛斯','凌罗']
  },{
    tab:'首抽停手', title:'看到池名，再决定按哪个召唤键',refs:['s19','cost','patch'],
    tasks:[
      ['select','新手定向优先选芙蕾雅','先领免费召唤再看持有。没有芙蕾雅就把她设为定向目标，用她给全队增益、调行动条，配炼推图；定向需要按池面规则召唤。已经有她就先留选择，克洛斯和凌罗走免费任务。'],
      ['pity','打开逆翎 UP，先算能否拿到首只','看目标姓名、倒计时、票种和「距必得目标」的剩余抽数。只算已到账的同池票和愿意投入的晶钻。比如还差 60 抽、手里 18 张极相票，缺 42 抽，按官方折算约需 12,600 晶钻。差得多就关池继续推图。'],
      ['limited','能覆盖保底才抽逆翎，第一只到手即停','逆翎先铺削弱，炼收尾，符合你喜欢的爆发节奏。今天夜离和达罗斯默认 0 抽，也不用给下一池垫抽。若已抽到夜离，用她收尾、克洛斯先手；若已有逆翎，直接存极相票。'],
      ['box','若真的领到极相自选箱，再看梨梨','名单有梨梨且未持有，优先选她来拉主攻、缩短技能冷却；已有梨梨且缺单体，才看名单里有没有莉拉姆。S19 公告没承诺首日或次日发这个箱，没见到就跳过。']
    ],
    hint:'普通券今天花多少',note:'常驻券只用教程或眼前任务确实要求的量。队伍能推进就留券，11 月 12 日 04:00（服务器时间）祈祝之礼开启后，再在常驻召唤里用。极相、新手定向单独看池面。',people:['逆翎','夜离','梨梨']
  },{
    tab:'养成与体力', title:'资源只投到能过下一关',refs:['s19','start','low'],
    tasks:[
      ['invest','经验、升星和潜能先给当班主攻','默认先炼；若已决定让夜离接主攻，就把主输出装备转给她，炼先做完眼前指定培养任务。默认培养顺序是炼 → 克洛斯 → 凌罗。主攻优先升等级和星级，克洛斯只要能先手挂削弱，凌罗先到能扛住并奶起全队。已经开始倒人时，提前补凌罗。留影等升星材料先满足主攻下一次升星。'],
      ['equipment','分好三套装备，再试一场手动','攻击、暴击向源器给主攻；速度、命中优先给克洛斯；生存和速度给凌罗。金币和强化材料先花在会穿上场的关键部件。让克洛斯挂出破防，再让炼放大招；小怪已清、Boss 太慢才试已有的 SR 谛听。'],
      ['stamina','第一管体力跟主线，卡住才刷对应本','先看超链之证当前任务。缺经验刷秘闻调查，缺潜能材料刷源点前哨，缺合适主词条源器再进熔断禁区。这三处有新区双倍。刷够下一次升级或突破就回主线；缺智壳才进凶影追缉。'],
      ['reserve','体力药、通用晶格与晶钻先留','自然体力快满时先刷能稳定过的层。体力药只在能立即完成任务或突破时开，限时道具先看到期日。专属晶格给对应本人，通用完美晶格先存。首日按零氪预算，晶钻买体力、刷新商店、补常驻抽数都按 0 算。']
    ],
    hint:'卡关时只改一件事',note:'主攻先动了，先换辅助的速度装；挂了破防还是超时，再补主攻等级或攻击装；第一轮就倒人，先补治疗速度和队员生存。改完重试同一关，再决定还缺哪种材料。'
  },{
    tab:'下线收尾',title:'领完今天能拿的，给次日留个起点',refs:['s19','patch'],
    tasks:[
      ['claim','回活动页和日常页领一次奖励','逐个看 14 日签到、异格者培养计划、新链成长计划和超链特训营。能领就领，差一天的明天再做；已开放协会就做签到。'],
      ['gear','下线前锁装，安排剩余自然体力','锁住打手正在用的攻击装和辅助速度、命中装。源器回收活动只处理确定不用的部件。剩余体力放在当前最缺的一项，尽量留出自然回复空间。'],
      ['tomorrow','记好明天的三个数字','记下逆翎池剩余保底、手上能用的极相票，以及下次主攻突破还缺多少材料。明天先补最接近的赠送角色任务；今天没抽到限定、队伍还能推，就按计划收工。']
    ],
    hint:'首日达标线',note:'能手动完成一次「辅助先动 → 削弱生效 → 主攻收尾」，知道下一份材料去哪刷，钻石和通用技能材料都有明确去向。首日无需追指定等级、抽齐全队或争特训排行。'
  }
];

function weekNav(day){
  const links=[1,2,3,4,5,6,7].map(d=>'<a href="'+(d===1?'#day1':'#week/'+d)+'" '+(day===d?'aria-current="date"':'')+'>第 '+d+' 天</a>');
  return '<div class="week-switch" role="navigation" aria-label="选择开服天数">'+links.join('')+'</div>';
}
function planMeter(day,tasks){
  const done=tasks.filter(([id])=>state['day'+day+'-'+id]).length;
  return '<div class="opening-meter" role="status"><span>第 '+day+' 天进度</span><b>'+done+' / '+tasks.length+'</b></div>';
}
function planRows(day,tasks,offset=0){
  return tasks.map(([id,title,body],i)=>{
    const key='day'+day+'-'+id;
    return '<label class="opening-task"><input type="checkbox" data-plan-task="'+key+'" '+(state[key]?'checked':'')+'><span><small>STEP '+String(i+offset+1).padStart(2,'0')+'</small><strong>'+title+'</strong><span>'+body+'</span></span></label>';
  }).join('');
}
function dayOne(n){
  const stage=openingPlan[n],tasks=openingPlan.flatMap(section=>section.tasks);
  const offset=tasks.findIndex(([id])=>id===stage.tasks[0][0]);
  const characterLinks=stage.people?checklistPeople(stage.people):'';
 const farmPhoto=n===2?inlineArt('maps',['hub'],'四种资源去哪里刷'):'';
  return head('首周清单','DAY 01 / 11.05')+weekNav(1)+planMeter(1,tasks)+sub(openingPlan.map(x=>x.tab),n)+grid(
    panel('','第 '+(n+1)+' 段 / 共 4 段',stage.title,contextualChecklist(1,n)+characterLinks+planRows(1,stage.tasks,offset)+(n<3?jump('day1/'+(n+1),'下一步 · '+openingPlan[n+1].tab):jump('week/2','接着做第 2 天'))),
    panel('tint','零氪 PvE / 实战备忘',stage.hint,'<p>'+stage.note+'</p>'+farmPhoto+ref(stage.refs))
  );
}
function weeklyChecklist(day){
  const plan=weekDays[day-2];
  const giftGuide='<details><summary>今天刚领到赠送角色，换谁？</summary><p><b>克洛斯</b>接格雷的削弱位，优先调到主攻前出手。<br><b>凌罗</b>接多乐丝等治疗位，先接生存装。<br><b>瑞玛丽</b>在群怪关试换炼，按生命倍率另配装。<br><b>宁芙涅</b>在怕控制时顶替机动位，先保留治疗。</p><p>前两人来自培养计划，后两人来自 14 日系列任务。按实际领奖进度换人，尚未领取就继续用原队。</p></details>';
  const terms='<details><summary>萌新词典 · 拉条、破防、机动位</summary><p><b>拉条</b>让队友的行动提前。<b>破防</b>降低敌人防御，生效后再让主攻放大招。<b>机动位</b>是按关卡换人的位置，缺单体输出就放打手，怕控制就放保护。<b>源器</b>是角色装备，<b>主词条</b>是装备的主要属性。</p></details>';
  const pictureKey={2:'growth',3:'hub',4:'forge',5:'nana',6:'hub',7:'hub'}[day];
 const next=day<7?jump('week/'+(day+1),'接着做第 '+(day+1)+' 天'):jump('route/3','接着看第 8–14 天');
  return head('首周清单','DAY 0'+day+' / '+plan.date)+weekNav(day)+planMeter(day,plan.tasks)+grid(
    panel('','第 '+day+' 天　／　11 月 '+(day+4)+' 日',plan.title,'<p class="lead">'+plan.focus+'</p>'+contextualChecklist(day,0)+checklistPeople(plan.people)+planRows(day,plan.tasks)+next),
    panel('tint','零氪 PvE / 萌新备忘','今天记住这一点','<p>'+plan.tip+'</p>'+inlineArt('maps',[pictureKey],'对照游戏界面')+giftGuide+terms+jump('atlas/2','看副本入口实景')+ref(plan.refs))
  );
}
document.addEventListener('change',event=>{
  const box=event.target.closest('[data-plan-task]');
  if(!box)return;
  state[box.dataset.planTask]=box.checked;
  save();
  const day=Number(box.dataset.planTask.split('-')[0].slice(3));
  const tasks=day===1?openingPlan.flatMap(section=>section.tasks):weekDays[day-2].tasks;
  document.querySelector('.opening-meter b').textContent=tasks.filter(([id])=>state['day'+day+'-'+id]).length+' / '+tasks.length;
});
