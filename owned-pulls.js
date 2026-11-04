/* 国服 S19，2026-11-04。目标、获取渠道和实际是否该花票分别判断。 */
(function (root) {
  'use strict';
  const official = ['S19 公告 · 固定赠送与新人召唤', 'https://www.taptap.cn/moment/866719390408642161?group_id=333480'];
  const run = ['LilyQAQ · 10/28 新号实录', 'https://www.taptap.cn/moment/864509086933189597?group_id=333480'];
  const review = ['璟璃 · 10/28 角色培养评价', 'https://www.taptap.cn/moment/814947599944516602?group_id=333480'];
  const video = ['千里漫漫 · 10/02 国际服黑渊拿鹤结算与面板', 'https://www.bilibili.com/video/BV1hjaU6BE5c/?t=187'];
  const oldPool = ['官方 · 葵诺丝上一轮限时召唤日期', 'https://www.taptap.cn/moment/851171629613450759?group_id=333480'];
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
      return has('梨梨') ? decision('用已有的梨梨，省下这次自选','把梨梨调到主攻前，优先拉主攻接第二轮技能。','已能顺利轮转时，存票等下一个明确卡点。','国际服拿鹤实战里梨梨先于两名输出，成型号速度只作参考。',[video,review]) :
        decision('下一位优先拿梨梨','能指定梨梨时优先拿首只。S19 尚未确认这样的自选箱或定向池，今天先存晶钻。','在能拿到她以前，先用教程的幻音千明拉条加攻。','10 月国际服拿鹤的 5928 分队用了梨梨。配合 10 月培养评价，适合想让主攻多动的账号。',[video,review,official]);
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
    return decision('逆翎已经到手，新人池先停',has('夜离')?'让逆翎先铺减益、夜离收尾。两位的首只都已齐。':'先让逆翎铺减益、炼收尾，任务瑞玛丽领到后再试群攻。',later,'10 月低配实录验证了这条开荒路线；作者到 80 级时只试了部分觉醒本。',[run,official,video]);
  }
  root.ownedPullPlan=ownedPullPlan;
  if(typeof module!=='undefined' && module.exports)module.exports=ownedPullPlan;
})(typeof window!=='undefined'?window:globalThis);
