/* Mainland CN S19 preparation, checked 2026-11-04.
 * budget is the page's coverage status for the NEWCOMER TARGET ONLY.
 * It is not a cash balance, a guarantee of obtaining a hero, or a Daros budget.
 * Empty ownership means "not entered", never "owns no characters".
 */
(function (root) {
  'use strict';
  var official = ['伊瑟官方｜S19角色赠送、新人夜离/逆翎UP、芙蕾雅定向', 'https://www.taptap.cn/moment/866719390408642161?group_id=333480'];
  var practical = ['LilyQAQ｜10/28国服新号1—80级实战', 'https://www.taptap.cn/moment/864509086933189597?group_id=333480'];
  var currentPool = ['伊瑟官方｜达罗斯11/4—12/2独立极相卡池规则', 'https://www.taptap.cn/moment/865337798482199546?group_id=333480'];
  var names = {
    '逆鳞': '逆翎', '逆龄': '逆翎', '叶离': '夜离', '夜璃': '夜离',
    '绫罗': '凌罗', '利拉姆': '莉拉姆', '里拉姆': '莉拉姆',
    '瑞马丽': '瑞玛丽', '荼靡': '荼蘼'
  };
  var outputNames = ['炼', '瑞玛丽', '莉拉姆', '谛听', '葵诺丝', '玄骊', '莎朗', '什炎', '闪萝', '伯诺瓦'];
  var supportNames = ['克洛斯', '梨梨', '凌罗', '艾莉尔', '水生绫', '拂秋', '芙蕾雅'];
  function ownedPullPlan(ownedSet, budget) {
    var owned = new Set();
    if (ownedSet && typeof ownedSet !== 'string' && typeof ownedSet[Symbol.iterator] === 'function') {
      Array.from(ownedSet).forEach(function (name) {
        if (typeof name === 'string' && name.trim()) {
          var cleaned = name.trim();
          owned.add(names[cleaned] || cleaned);
        }
      });
    }
    var status = ['unknown', 'covered', 'short'].indexOf(budget) >= 0 ? budget : 'unknown';
    var hasPlume = owned.has('逆翎');
    var hasYeli = owned.has('夜离');
    var outputs = outputNames.filter(function (name) { return owned.has(name); });
    var supports = supportNames.filter(function (name) { return owned.has(name); });
    var result = {
      title: '', action: '', stop: '', reason: '', alternatives: [],
      sources: [official, practical],
      target: null,
      budgetTarget: '',
      budgetStatus: status,
      evidence: '只采用当前新服公告与近期普通号实战；已有角色用于识别重复投入，不由角色名推算练度或保证替代。',
      poolCheck: 'S19公告确认新人夜离、逆翎UP，但未公开两池完整票种、保底计数与截止日。实际出手前须核对本服池详情；页面预算状态不能代替卡池确认。'
    };
    if (!owned.size) {
      result.title = '先录入已有角色';
      result.action = '尚未录入卡盒，暂不生成抽取目标。先勾选实际已获得的角色，再看新人池与免费任务奖励。';
      result.stop = '未录入不代表零角色；此时不建议投入晶钻或打开自选。';
      result.reason = 'S19有免费培养与任务角色，空记录无法判断输出、辅助或重复风险。';
      result.alternatives = ['克洛斯、凌罗来自培养计划；瑞玛丽、宁芙涅来自14日系列任务，分别记录已领取与尚未领取。', '目标保底是否覆盖也先保留未知，不能将常驻票或其它卡池预算混算。'];
      result.caseId = 'unrecorded';
      return result;
    }
    if (hasPlume && hasYeli) {
      result.title = '夜离、逆翎都有：新人双池停手';
      result.action = '两名新人UP角色已各有本体，先停止为补角色而抽这两池，资源留给现有队伍养成。';
      result.stop = '本页不安排重复本体、补原质或因为预算覆盖而继续抽。';
      result.reason = '当前新人双池的本体缺口已经补齐；近期普通号实战也没有要求同时追重复本体才能推进。';
      result.alternatives = ['用现有角色按任务推进；任务瑞玛丽到账后先看实际关卡用途，不因免费到手就同时追加另一套主C投入。', '达罗斯属于另一张当期卡池；本页新人目标预算不用于判断其保底。当前未核到普通号PVE替换实测，不据新卡定位另开抽取目标。'];
      result.sources.push(currentPool);
      result.caseId = 'both';
    } else if (hasPlume) {
      result.title = '已有逆翎：不再补同一功能本体';
      result.action = outputs.length ? '已有逆翎，并已录入输出：' + outputs.join('、') + '。先验证现队能否推进，不把夜离设为自动追加目标。' : '逆翎本体已齐。先用任务输出推进，并录入实际可用主C；不能仅因没勾夜离就认定缺输出。';
      result.stop = '新人逆翎池停在已有本体；没有具体关卡的输出缺口前，不动用留存预算追夜离。';
      result.reason = 'LilyQAQ的近期新号以免费御三家加逆翎推进到80级，证明存在不依赖夜离的普通号路线；不代表所有已录角色都已成型。';
      result.alternatives = ['S19任务还提供瑞玛丽；先确认领取进度、现有输出练度与实际卡关原因。', '若之后确定喜欢夜离或确有对应需求，再单独核对夜离池与其预算；当前“新人目标已覆盖”不能直接视为夜离也覆盖。'];
      result.caseId = outputs.length ? 'plume-with-output' : 'plume-output-not-recorded';
    } else if (owned.has('克洛斯') && (hasYeli || outputs.length)) {
      result.title = hasYeli ? '夜离与克洛斯已有：先不追加新人池' : '输出与破防已有：先验证现队';
      result.action = '已录入输出：' + (hasYeli ? ['夜离'].concat(outputs) : outputs).join('、') + '，以及克洛斯。先用现队推进；当前没有具体功能缺口记录，不启动新的追保底目标。';
      result.stop = '新人双池先停；不因为预算覆盖就补另一个本体，也不把已有克洛斯直接判为必须淘汰。';
      result.reason = '近期普通号用免费输出和克洛斯继续推进；S19还将提供培养与任务角色。这里没有证据证明已录入队伍现在必须更换破防位，角色强度评价不能代替本关实测。';
      result.alternatives = ['确认治疗位、角色练度和当前卡点；若以后确有逆翎对应的功能缺口，再单独建立新人逆翎预算。', '已有的其他核心保留使用；当前没有同练度实测证明夜离或逆翎对所有同职能角色构成无条件升级。'];
      result.caseId = hasYeli ? 'yeli-with-kloss' : 'other-core-with-kloss';
    } else {
      result.target = '逆翎';
      result.budgetTarget = '逆翎';
      var withKloss = owned.has('克洛斯');
      var withCore = outputs.length > 0;
      result.caseId = hasYeli ? 'yeli-only' : withCore ? 'other-output' : supports.length ? 'support-box' : 'other-box';
      result.title = hasYeli ? '仅有夜离：先保已有输出投入' : withCore ? '已有其它输出：先不重复补夜离' : '尚未录入新人双UP：先用免费队核对缺口';
      var existing = hasYeli ? '夜离本体已经有了，先停止补夜离重复；' : withCore ? '已录入输出：' + outputs.join('、') + '；角色名不代表练度已够，先不追加另一个输出池。' : '没有勾选双UP不代表必须同时补两人；';
      var functionState = withKloss ? '你已拥有克洛斯，近期普通号用她继续推图，逆翎不是开局通行证。' : 'S19培养计划提供克洛斯和凌罗，可先完成免费队的输出、破防和续航。';
      result.reason = existing + functionState + '近期实战作者在御三家基础上补过逆翎，因此这里只保留逆翎作为待核验的新人功能目标，不据此宣称它在所有场景都优于已有辅助。';
      if (status === 'covered') {
        result.action = '页面记录新人目标保底已覆盖。先核实本服新人逆翎池确实指向逆翎、票种/计数/期限无误；若现队正在推进，可继续保留预算。确有功能缺口、并确认要补本体时，再执行这个单一目标。';
        result.stop = '目标本体到手即停；不要顺带追夜离、重复本体或把余票当作必须花完的额度。';
      } else if (status === 'short') {
        result.action = '页面记录新人目标保底未覆盖：先不追逆翎池，继续用现有角色及免费培养计划推进，保留专用票。';
        result.stop = '不为了补齐纸面阵容硬追缺口，不把达罗斯池或常驻票库存视作新人逆翎保底。';
      } else {
        result.action = '新人目标保底仍未知：先核对本服池目标、票种、当前计数、可用专用票与截止时间；确认之前保留晶钻。';
        result.stop = '未算清缺口时不以“先抽几次试试”启动追保底；确认后再选择覆盖或未覆盖。';
      }
      result.alternatives = [functionState,
        supports.length ? '已录入辅助：' + supports.join('、') + '。这些角色先检查养成与本关机制；本轮没有同练度实测证明新人逆翎能无条件替换其中所有角色。' : '已有辅助尚未完整录入；补全卡盒后再判断功能重复，先不要用缺记录代替缺角色。',
        hasYeli || withCore ? '已有输出先用起来；免费瑞玛丽领取后再验证用途，不自动同时养多个主C。' : '按近期普通号作者的免费御三家路线推进；这条路线不要求先凑齐夜离与逆翎。'];
    }
    return result;
  }
  root.ownedPullPlan = ownedPullPlan;
  if (typeof module !== 'undefined' && module.exports) module.exports = ownedPullPlan;
})(typeof window !== 'undefined' ? window : globalThis);
