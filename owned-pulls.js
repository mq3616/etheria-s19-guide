/* 国服 S19，2026-11-04。目标、获取渠道和实际是否该花票分别判断。 */
(function (root) {
  'use strict';
  const official = ['S19 公告 · 固定赠送与新人召唤', 'https://www.taptap.cn/moment/866719390408642161?group_id=333480'];
  const run = ['LilyQAQ · 10/28 新号实录', 'https://www.taptap.cn/moment/864509086933189597?group_id=333480'];
  const review = ['璟璃 · 10/28 角色培养评价', 'https://www.taptap.cn/moment/814947599944516602?group_id=333480'];
  const farm = ['10/17 国服开荒：兵祸、奥洛拉的梨梨与谛听', 'https://www.taptap.cn/moment/860227779365438892'];
  const video = ['千里漫漫 · 10/02 国际服黑渊拿鹤结算与面板', 'https://www.bilibili.com/video/BV1hjaU6BE5c/?t=187'];
  const oldPool = ['官方 · 葵诺丝上一轮限时召唤日期', 'https://www.taptap.cn/moment/851171629613450759?group_id=333480'];
  const eventRules = ['官方 · 11 月祈祝之礼常驻积分与自选箱名单','https://www.taptap.cn/moment/866390674507827526?group_id=333480'];
  function ownedPullPlan(owned, budget, goal = 'start') {
    const has = name => owned.has(name);
    const later = has('梨梨') ? (has('莉拉姆')?'梨梨、莉拉姆都已到手。让梨梨先拉主攻，首领关换莉拉姆收尾，暂存自选机会。':'梨梨已经能拉主攻。以后若首领超时，先试单体打手，再考虑莉拉姆。') : '下一位优先留意梨梨。主攻能打出高伤时，她能拉主攻再动、缩短技能冷却。等能选到她的自选箱或定向池。';
    function decision(title, action, next, basis, sources) {
      return {title, action, next, basis, sources, budgetTarget:''};
    }
    function banner(name, reason) {
      const advice = budget === 'covered' ? '已确认本池保底够，抽到第一只就停。' : budget === 'short' ? '本池保底不够，这轮先存票。' : '先看池面「距必得目标」还差多少抽。票和准备投入的晶钻能覆盖，再抽首只。';
      const firstMove=name==='逆翎'?(has('夜离')?'逆翎铺减益，让已有的夜离收尾。':'用逆翎先铺减益、炼收尾。'):'想等免费瑞玛丽就先存；若要夜离立即清波，再看她自己的保底。';
      const next = name==='夜离'&&!has('逆翎') ? '夜离到手先当主攻，克洛斯从培养计划领来破防。之后再评估逆翎的驱散、增伤是否用得上。' : later;
      return {...decision((budget==='short'?'先存票，目标留给':'新人 UP 优先')+name,firstMove+advice,next,reason,[official,run,video,review]),budgetTarget:name};
    }
    if (goal==='boss') {
      if (has('莉拉姆')||has('谛听')) {
        const hitter=has('莉拉姆')?'莉拉姆':'谛听';
        return decision('先用已有的'+hitter+'打首领','先让破防位动，再让'+hitter+'用单体技能收尾。先试一次，再花自选机会。',later,'10 月评价支持莉拉姆打首领，现有资料缺 S19 新号同装备换人对照。',[review,run]);
      }
      return decision('单体输出优先看莉拉姆','能选莉拉姆的箱子到手后，再把名额给她。未见可指定她的入口时，晶钻先留着。','拿到后先试首领。单次伤害够、第二轮大招接不上，再补梨梨。','来自 10 月角色评价。没有本服次日送光暗箱的官方承诺，也没有她替换你的主攻后能快几回合的实测。',[review,official]);
    }
    if (goal==='turns') {
      return has('梨梨') ? decision('用已有的梨梨，省下这次自选','把梨梨调到主攻前，优先拉主攻接第二轮技能。','已能顺利轮转时，存票等下一个明确卡点。','国服兵祸和奥洛拉作业都让梨梨拉谛听；国际服拿鹤是另一场景的参考。',[farm,video,review]) :
        decision('下一位优先拿梨梨','能指定梨梨时优先拿首只。S19 尚未确认这样的自选箱或定向池，今天先存晶钻。','在能拿到她以前，先用教程的幻音千明拉条加攻。','10 月国服兵祸、奥洛拉均有梨梨拉谛听的具体打法；她的再动位在中期就有用途。',[farm,review,official]);
    }
    if (goal==='future') {
      return decision(has('葵诺丝')?'先养已有的葵诺丝':'留票关注葵诺丝',has('葵诺丝')?'让她做生命型输出，保留抽重复本体的资源。':'上一轮 UP 在 10 月 14 日结束。等官方公布可指定她的新池，再按当期表现决定。','现在先领任务瑞玛丽练群伤。后面有明确复刻日期，再给那个池单独算保底。','璟璃的 10 月培养评价把她与逆翎并列。缺两人同练度、同副本的替换实测。',[review,oldPool,official]);
    }
    if (goal==='waves') {
      if (has('夜离')||has('瑞玛丽')||has('葵诺丝')||has('闪萝')) {
        const hitter=['夜离','瑞玛丽','葵诺丝','闪萝'].find(has);
        return decision('先用已有的'+hitter+'清波','把一套合适的输出装先集中给她，新人夜离池暂时停手。',later,'新号能靠炼过渡到任务瑞玛丽。已有群攻时，没有同配置实战支持再花一份限定保底。',[run,official]);
      }
      return banner('夜离','仅在你希望现在补群攻时选这条路线。能等就先用炼，14 日系列任务还会给瑞玛丽。');
    }
    if (!has('逆翎')) return banner('逆翎',has('夜离')?'夜离已经能收尾。逆翎补驱散、破防和增伤；若免费克洛斯已能帮你推进，可继续存票。':'按零氪推图和先辅助、后爆发的玩法选。教程炼负责收尾，10 月有新号用免费队加逆翎推进到 80 级。');
    // The first UP is complete. Choose the next missing role, then show how each
    // available currency can help. A future acquisition is never an active UP.
    const waveCarry=['夜离','瑞玛丽','葵诺丝','闪萝'].find(has);
    const opportunities=[];
    if(!waveCarry){
      opportunities.push({label:'开服可抽 · 夜离首只',text:'想马上换群攻收尾，下一池选夜离，按她自己的保底算票。愿意等 14 日任务瑞玛丽，就把这份晶钻留给后续。',goal:'waves'});
    }
    if(!has('芙蕾雅')&&!has('梨梨')){
      opportunities.push({label:'新手定向 · 芙蕾雅',text:'如果幻音千明拉完条，队友仍抢不到先手，定向机会可以给芙蕾雅。官方确认芙蕾雅在新手定向名单内，实际召唤次数看池面。'});
    }
    opportunities.push({label:'11/12–11/19 · 使用常驻券',text:'把计划内常驻券用在祈祝之礼。若积分自然够领三选一箱、还缺黑渊爆发输出且没有魁洛，可以选魁洛。箱里没有梨梨或莉拉姆，不为凑档用钻换券。'});
    let primary;
    if(!has('梨梨')){
      primary=decision('逆翎之后，优先争取梨梨','逆翎先破防增伤，梨梨把行动机会再给主攻。按你喜欢的爆发打法，下一次能指定梨梨的自选或召唤给她。','S19 还没确认梨梨的定向入口。若卡的是首领血量，单次伤害就低，莉拉姆的单体输出优先于梨梨。', '这是按玩法给的目标顺序。10 月国服兵祸和奥洛拉作业点名梨梨拉谛听；莉拉姆的单体用途来自玩家评价。S19 新人 UP 是逆翎和夜离。',[official,farm,review,eventRules]);
      if(has('莉拉姆')||has('谛听'))primary.next='S19 还没确认梨梨的定向入口。首领关先用已有的'+(has('莉拉姆')?'莉拉姆':'谛听')+'收尾，梨梨到手后再提轮转。';
    }else if(!has('莉拉姆')&&!has('谛听')){
      primary=decision('逆翎、梨梨已有，下一位看莉拉姆','两名辅助已经能铺减益、拉主攻。若目前缺打首领的单体输出，把下一次包含莉拉姆的自选留给她。','单体伤害已经够，就把未来输出预算留给葵诺丝的可指定池，再按届时表现决定。','莉拉姆是 10 月玩家点评的首领打手；目前没有公告承诺 S19 固定送她。',[review,official,eventRules,oldPool]);
      if(has('葵诺丝'))primary.next='葵诺丝也已到手，群伤先用现有本体。若首领也能打过，等遇到新机制再决定下一份自选。';
    }else if(!has('葵诺丝')){
      primary=decision('轮转和单体已有，下一笔长期预算看葵诺丝','已有梨梨和'+(has('莉拉姆')?'莉拉姆':'谛听')+'，再补强时优先看生命型输出。葵诺丝上轮 UP 于 10 月 14 日结束，等新池官宣后单独算保底。','当前群攻先用现有主攻或领取任务瑞玛丽，把常驻券和未来限定预算分开安排。','葵诺丝来自 10 月玩家评价，复刻时间截至 11 月 4 日尚未核到。',[review,oldPool,official,eventRules]);
    }else{
      primary=decision('核心位置已齐，下一抽按目标副本定','已有逆翎、梨梨、单体打手和葵诺丝。先选准备打的副本，缺哪项机制再补首只。','想打黑渊计分，可关注常驻活动箱；继续推图则先培养已有输出。','同一只角色在主线、觉醒与黑渊的用途不同，未见当前同练度通用升级的证明。',[review,official,eventRules]);
    }
    return {...primary,opportunities};

  }
  root.ownedPullPlan=ownedPullPlan;
  if(typeof module!=='undefined' && module.exports)module.exports=ownedPullPlan;
})(typeof window!=='undefined'?window:globalThis);
