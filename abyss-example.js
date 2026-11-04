'use strict';
const abyssClip='https://www.bilibili.com/video/BV1hjaU6BE5c/';
const abyssCredit='千里漫漫 · B站 · 2026/10/02 · 黑渊狩场拿鹤 5928 分';
window.mapArt.abyssNahe={
 title:'黑渊狩场 · 拿鹤',src:'art/maps/abyss-nahe.webp',url:abyssClip+'?t=189',credit:abyssCredit+' · 03:09',
 caption:'结束后的阵容配置画面。左侧正在展示罗魍的属性，继续播放可逐个看其余队员的速度与装备。'
};
for(const [name,id,time] of [['罗魍','luowang',189],['多琪','duoqi-hero',193]]){
 window.peopleArt[name]={src:'art/squad/'+id+'.webp',full:'art/maps/abyss-'+id+'.webp',url:abyssClip+'?t='+time,credit:abyssCredit,caption:name+' · 赛后角色面板，可与头像对照。'};
}
const abyssExample={
 name:'黑渊狩场｜拿鹤计分（成型账号）',mapKey:'abyssNahe',verifiedTeam:['罗魍','多琪','梨梨','克洛斯','伯诺瓦'],teamComplete:true,teamLabel:'10/02 B站录像 · 五人面板及 5928 分结算',
 goal:'想玩“辅助先铺垫、输出最后动”，成型后可参考这个计分实例。它针对该期拿鹤，并非首周必养五人。',
 team:'罗魍、多琪、梨梨、克洛斯、伯诺瓦。03:07 左右结算，随即展示这套阵容及五张面板。这里的多琪是己方英雄。',
 rotation:'看录像的面板速度：梨梨 349、多琪 337、克洛斯 314、伯诺瓦 229、罗魍 220。三位辅助更快，给两名输出留出窗口；战斗内的拉条会改变实际回合顺序。',
 order:[['先看辅助能否赶在输出前','克洛斯是新区能领的辅助，到了黑渊仍能上场。可以沿用她，不用因榜单出现了更稀有的辅助就把她撤掉。'],['输出到位再追分','片中伯诺瓦暴击伤害 431%，罗魍防御 3445。这是作者当场面板，不是开荒毕业线，也无证据说明换成任意单体都能得到相同分数。']],
 limit:'三个辅助的配速、角色练度和该期目标都影响分数。原片没有同条件测试葵诺丝等替换位，不以此比较两人的强弱。',
 sources:[['千里漫漫 · 10/02 · 黑渊拿鹤全程实战',abyssClip],['03:07 结算 → 03:09 罗魍 → 03:13 多琪',abyssClip+'?t=187'],['03:15 起 · 梨梨、克洛斯、伯诺瓦的实际面板',abyssClip+'?t=195']]
};

window.mapArt.awakeDiting={
 title:'觉醒谛听 · 炼狱选人',src:'art/maps/awake-diting.webp',url:'https://www.bilibili.com/video/BV1wstB6UEB7/?t=1',credit:'韶华阿斯加德 · 2026/09/04 · 00:01',caption:'出战人数 2/4。选中的是绯月鞠与赫妍；右侧未勾选的卡片是备选列表。'
};
for(const [name,id] of [['绯月鞠','feiyueju'],['赫妍','heyan-hero']]){
 window.peopleArt[name]={src:'art/squad/'+id+'.webp',full:'art/maps/awake-diting.webp',url:window.mapArt.awakeDiting.url,credit:window.mapArt.awakeDiting.credit,caption:name+' · 觉醒谛听双人实战选人画面'};
}
window.peopleArt['蝰蛇']={
 src:'art/squad/viper.webp',full:'art/maps/duoqi.webp',url:'https://www.taptap.cn/moment/860227779365438892',credit:'x佛系摸鱼 · 10/17 修订 · 多琪配队示意',caption:'蝰蛇 · 在配队图底部可看到他的名字及头像。'
};
