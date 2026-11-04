'use strict';
Object.assign(window.peopleArt,window.reinforceArt,window.squadArt);
const atlasMapNames={hub:'挑战入口',forge:'熔断禁区选关',binghuo:'重构兵祸',duoqi:'多琪',aoluola:'奥洛拉',nana:'妮可娜娜',heyan:'赫妍',shalang:'莎朗',growth:'超链之证',sourceweb:'源网征令'};
const atlasRole={炼:'清波主攻',克洛斯:'破防铺垫',凌罗:'治疗续航',逆翎:'驱散与增伤',梨梨:'拉条与轮转',夜离:'追击爆发',瑞玛丽:'生命型群攻',宁芙涅:'护盾与免疫',芙蕾雅:'节奏辅助',莉拉姆:'单体输出',谛听:'单体输出'};
function artSet(group){return group==='people'?window.peopleArt:group==='explore'?window.exploreArt:window.mapArt}
function artEntry(group,key){let data=artSet(group)?.[key];if(!data)return null;return {...data,key,group,title:group==='people'?key:(data.title||atlasMapNames[key]||key)}}
function makePlates(entries,layout){const items=entries.filter(Boolean);if(!items.length)return '';
 return '<div class="plates '+layout+'">'+items.map(im=>{const e=encodeText,portrait=im.group==='people';return '<figure class="plate '+(portrait?'is-person':'is-map')+'"><button type="button" class="art-trigger" data-group="'+e(im.group)+'" data-art="'+e(im.key)+'" aria-label="放大查看'+e(im.title)+'"><img loading="lazy" decoding="async" src="'+e(im.src)+'" alt="'+e(im.title)+'"><span class="art-enlarge" aria-hidden="true">⤢</span></button><figcaption><strong>'+e(im.title)+'</strong><span>'+e(portrait?(atlasRole[im.key]||im.caption):im.caption)+'</span></figcaption></figure>'}).join('')+'</div>'}
function atlasView(n,place){
 const groups=['people','explore','maps'],g=groups[n], titles=['角色认人','主线地图','副本现场'];
 const text=['对照头像找人，点击图片可查看大图和出处。','按图上的地名和地标对照自己的地图。截图对应发布时的版本。','先认挑战入口与选关画面，再看对应 Boss。原片入口在大图下方。'];
 const info=Object.keys(artSet(g)||{}).map(k=>artEntry(g,k));
 const pageSize=9,pages=Math.ceil(info.length/pageSize);
 const num=Number(place)||1,page=Math.min(pages,Math.max(1,Math.floor(num)));
 const item=info.find(im=>im.key===place),shown=item?[item]:info.slice((page-1)*pageSize,page*pageSize);
 const pager=item?'<a class="jump" href="#atlas/'+n+'">← 返回本组全部图片</a>':pages>1?'<div class="atlas-pages" aria-label="图鉴页码">'+Array.from({length:pages},(_,i)=>'<a href="#atlas/'+n+'/'+(i+1)+'" '+(page===i+1?'aria-current="page"':'')+'>第 '+(i+1)+' 页</a>').join('')+'</div>':'';
 return head('开荒图鉴','08 / VISUAL ATLAS')+sub(titles,n)+'<article class="panel atlas-page"><div class="label">图鉴 / '+info.length+' 张</div><h3>'+titles[n]+'</h3><p class="lead">'+text[n]+'</p>'+pager+makePlates(shown,'archive')+'</article>';
}
function inlineArt(group,keys,label){const imgs=keys.map(k=>artEntry(group,k)).filter(Boolean);if(!imgs.length)return '';return '<section class="inline-art" aria-label="'+encodeText(label)+'"><header><b>'+encodeText(label)+'</b><a href="#atlas/'+({people:0,explore:1,maps:2}[group])+'">同类图鉴 ↗</a></header>'+makePlates(imgs,group==='people'?'portraits':'maps')+'</section>'}
function illustratePage(key,n,part,topic){
 const main=document.querySelector('#app article');if(!main)return;
 const put=(group,keys,label)=>{const html=inlineArt(group,keys,label),anchor=main.querySelector('.lead')||main.querySelector('h3');if(anchor&&html)anchor.insertAdjacentHTML('afterend',html)};
 const p=(names)=>put('people',names,'对照角色');
 const m=(...keys)=>put('maps',keys,'游戏画面对照');
 const explore=()=>put('explore',Object.keys(window.exploreArt||{}).slice(0,1),'主线地图参考');
 if(key==='roster'){p([['炼','克洛斯','凌罗','瑞玛丽','宁芙涅'],['逆翎','梨梨','夜离','芙蕾雅','莉拉姆'],['谛听','卡奇','恶命']][n]);return}
 if(key==='draw'){p([['逆翎'],['芙蕾雅','克洛斯'],['梨梨','莉拉姆'],['夜离'],['达罗斯'],[]][n]);return}
 if(key==='fight'){m(...[['hub','forge'],['binghuo'],['nana'],['duoqi'],['aoluola'],['heyan','shalang']][n]);return}
 if(key==='route'){if(n===0)explore();else if(n===1)p(['炼','克洛斯','凌罗']);else if(n===2)m('hub');else if(n===3)p(['瑞玛丽','宁芙涅']);else m('forge');return}
 if(key!=='manual')return;
 const section=Object.hasOwn({growth:1,hero:1,boss:1,compare:1},part)?part:'compare', i=Number(topic)||0;
 if(section==='boss'){m(['nana','binghuo','duoqi','aoluola','heyan','shalang'][i]);return}
 if(section==='hero'){p([['炼','克洛斯','凌罗'],['逆翎','夜离'],['梨梨','芙蕾雅','莉拉姆'],['炼','克洛斯'],['梨梨'],['凌罗'],['瑞玛丽','宁芙涅'],['谛听','恶命'],['逆翎'],['夜离']][i]||[]);return}
 if(section==='growth'){if(i===0)explore();else if(i===1)m('hub','growth');else if(i===3)m('forge');else if(i===4)m('binghuo');return}
 if(i===0)p(['逆翎','夜离']);else if(i===1)m('binghuo','duoqi','aoluola');else if(i===2)p(['炼','克洛斯','凌罗']);else if(i===3)m('forge');else if(i===5)explore();else if(i===6)p(['瑞玛丽'])
}
let artItems=[],artIndex=0;
function showArtIndex(i){const dlg=document.querySelector('#artViewer'),im=artItems[i];if(!im)return;artIndex=i;
 activeArtLink(im);setArtZoom(false);dlg.querySelector('h2').textContent=im.title;const img=dlg.querySelector('img');img.src=im.full||im.src;img.alt=im.title;dlg.classList.toggle('portrait-mode',im.group==='people');dlg.querySelector('.art-caption').textContent=im.caption;dlg.querySelector('.art-credit').textContent=im.credit+' ↗';dlg.querySelector('.art-credit').href=im.url;dlg.querySelector('.art-count').textContent=(i+1)+' / '+artItems.length;
 for(const [cls,bound] of [['prev',i===0],['next',i===artItems.length-1]])dlg.querySelector('.art-'+cls).disabled=bound;
}
document.addEventListener('click',e=>{const btn=e.target.closest('.art-trigger');if(!btn)return;const peers=[...btn.closest('.plates').querySelectorAll('.art-trigger')];
 artItems=peers.map(b=>artEntry(b.dataset.group,b.dataset.art));showArtIndex(peers.indexOf(btn));document.querySelector('#artViewer').showModal()});
const artDialog=document.querySelector('#artViewer');
function setArtZoom(on){const stage=artDialog.querySelector('.zoom-stage'),button=artDialog.querySelector('.art-zoom');stage.classList.toggle('zoomed',on);button.setAttribute('aria-pressed',String(on));button.textContent=on?'适应窗口':'查看原图尺寸';stage.scrollLeft=0;stage.scrollTop=0;}
artDialog.querySelector('.art-zoom').addEventListener('click',e=>setArtZoom(e.currentTarget.getAttribute('aria-pressed')!=='true'));
artDialog.querySelector('.zoom-stage img').addEventListener('click',()=>setArtZoom(!artDialog.querySelector('.zoom-stage').classList.contains('zoomed')));
artDialog.querySelector('.art-close').addEventListener('click',()=>artDialog.close());
artDialog.querySelector('.art-prev').addEventListener('click',()=>showArtIndex(artIndex-1));
artDialog.querySelector('.art-next').addEventListener('click',()=>showArtIndex(artIndex+1));
artDialog.addEventListener('click',e=>{if(e.target===artDialog)artDialog.close()});
artDialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showArtIndex(artIndex+(e.key==='ArrowLeft'?-1:1))}});
window.addEventListener('hashchange',()=>{if(artDialog.open)artDialog.close()});
