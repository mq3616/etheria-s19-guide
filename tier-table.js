'use strict';

const tierGrades = {S:0,A:1,B:2,'?':3};
const pullOrder = ['优先首只','按缺口选','等池再看','任务领取','已有再练','暂缓投入'];
const tierPageSize = 10;
const tierOpenNames = new Set();
let tierQuery = '';
let tierPage = 0;

function tierSortKey(){
 const requested = location.hash.split('/')[2];
 return ['early','pull'].includes(requested) ? requested : 'late';
}
function tierTable(){
 const total = window.tierMain.length + window.tierMore.length;
 return '<section class="tier-panel" aria-label="PvE 角色强度表"><p class="tier-intro">前期看新号推图和刷本，后期看成型后打觉醒、黑渊等高难本。共收录 '+total+' 位，分档综合实录和玩家评价，跨服样本单独标明。核对至 2026 年 11 月 4 日。</p>'+
  '<p class="tier-key"><b>S</b> 优先核心　<b>A</b> 强力或专本主力　<b>B</b> 过渡或对策　<b>?</b> 近期依据不足</p>'+
  '<label class="tier-search">找角色 <input id="tier-search" type="search" placeholder="输入角色名" value="'+encodeText(tierQuery)+'"></label>'+
  '<span class="note">点列名排序，点角色看用途和出处。</span><div id="tier-results">'+tierRows()+'</div></section>';
}
function tierRows(){
 const sort = tierSortKey(), owned = selectedHeroes();
 const people = [...window.tierMain,...window.tierMore];
 const query=tierQuery.trim();
 const rows=people.filter(p=>p.name.includes(query)).sort((a,b)=>{
  if(sort==='pull'){
   const gap=pullOrder.indexOf(a.pull)-pullOrder.indexOf(b.pull);
   if(gap)return gap;
  }
  const primary=sort==='early'?'early':'late', secondary=primary==='late'?'early':'late';
  return tierGrades[a[primary]]-tierGrades[b[primary]] || tierGrades[a[secondary]]-tierGrades[b[secondary]];
 });
 const pages = Math.max(1,Math.ceil(rows.length/tierPageSize));
 tierPage=Math.min(tierPage,pages-1);
 const header=(key,label)=>'<th scope="col" '+(sort===key?'aria-sort="descending"':'')+'><a href="#roster/tiers/'+key+'" data-tier-sort="'+key+'" '+(sort===key?'aria-current="true"':'')+'>'+label+(sort===key?' ↓':'')+'</a></th>';
 const grade=value=>'<td><span class="tier-grade grade-'+(value==='?'?'unknown':value)+'">'+value+'</span></td>';
 const visible=rows.slice(tierPage*tierPageSize,(tierPage+1)*tierPageSize);
 const body=visible.map(item=>{
  const open=tierOpenNames.has(item.name);
  const name=encodeText(item.name), panelId='tier-info-'+people.indexOf(item);
  const art=artEntry('people',item.name);
  const isOwned=owned.has(item.name);
  const pull=isOwned?'已拥有':item.pull;
  const image=art?'<img src="'+encodeText(art.src)+'" alt="" width="28" height="28" loading="lazy">':'';
  const detail='<dl><dt>前期</dt><dd>'+encodeText(item.earlyWhy)+'</dd><dt>后期</dt><dd>'+encodeText(item.lateWhy)+'</dd><dt>获取</dt><dd>'+encodeText(item.how)+(isOwned?' 你已勾选该角色，可直接安排培养。':'')+'</dd></dl>'+roleRefs(item.refs);
  return '<tr><th scope="row"><button type="button" data-tier-name="'+name+'" aria-expanded="'+open+'" aria-controls="'+panelId+'">'+image+'<span>'+name+'</span></button></th>'+grade(item.early)+grade(item.late)+'<td>'+encodeText(pull)+'</td></tr>'+
   '<tr id="'+panelId+'" '+(open?'':'hidden')+' class="tier-detail"><td colspan="4">'+detail+'</td></tr>';
 }).join('');
 const pager=pages>1?'<div class="tier-pager"><button data-tier-page="-1" '+(tierPage===0?'disabled':'')+'>上一页</button><span>第 '+(tierPage+1)+' / '+pages+' 页</span><button data-tier-page="1" '+(tierPage===pages-1?'disabled':'')+'>下一页</button></div>':'';
 return '<table class="tier-table"><caption>按'+({early:'前期强度',late:'后期强度',pull:'缺本体时的抽取建议'}[sort])+'排序 · '+rows.length+' 位</caption><thead><tr><th scope="col">角色</th>'+header('early','前期')+header('late','后期')+header('pull','抽取')+'</tr></thead><tbody>'+body+'</tbody></table>'+
  (rows.length?'':'<p class="note">本表未收录这个名字。可以缩短关键词再查。</p>')+pager;
}
document.addEventListener('input',event=>{
 if(event.target.id!=='tier-search')return;
 tierQuery=event.target.value;tierPage=0;
 document.getElementById('tier-results').innerHTML=tierRows();
});
document.addEventListener('click',event=>{
 const sort=event.target.closest('[data-tier-sort]');
 if(sort){tierPage=0;if(sort.hash===location.hash)document.getElementById('tier-results').innerHTML=tierRows();return}
 const toggle=event.target.closest('[data-tier-name]');
 if(toggle){
  const name=toggle.dataset.tierName;
  const open=!tierOpenNames.has(name);
  if(open)tierOpenNames.add(name);else tierOpenNames.delete(name);
  toggle.setAttribute('aria-expanded',String(open));
  document.getElementById(toggle.getAttribute('aria-controls')).hidden=!open;
 }
 const page=event.target.closest('[data-tier-page]');
 if(page){
  tierPage+=Number(page.dataset.tierPage);
  const results=document.getElementById('tier-results');
  results.innerHTML=tierRows();
  results.querySelector('[data-tier-name]')?.focus({preventScroll:true});
  results.scrollIntoView({block:'start'});
 }
});
