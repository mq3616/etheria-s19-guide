'use strict';

const heroSkillsUrl = './hero-skills.v1.json';
let skillsBook;
let skillsRequest;

function skillRoute(name) {
  const route = personRoute(name);
  return route ? '#' + route : '';
}

function skillProfileLink(name) {
  const href = skillRoute(name);
  return href ? '<a href="' + encodeText(href) + '">' + encodeText(name) + '的技能与加点 →</a>' : '';
}

function skillRefs(refs) {
  return refs?.length ? roleRefs(refs) : '';
}

function levelTable(levels) {
  if (!levels?.length) return '';
  const rows = levels.map(([level, change]) =>
    '<tr><th scope="row">Lv.' + encodeText(String(level)) + '</th><td>' + encodeText(change) + '</td></tr>'
  ).join('');
  return '<table class="skill-levels"><caption>每级强化</caption><tbody>' + rows + '</tbody></table>';
}

function confirmedSkillChanges(notes) {
  return notes.map(note => '<p class="skill-confirm"><b>' + encodeText([note.level,note.label,note.date].filter(Boolean).join(' · ')) +
    '</b><br>'+encodeText(note.text)+' <a href="'+encodeText(note.source)+'" target="_blank" rel="noopener">来源 ↗</a></p>').join('');
}

function skillCard(skill, profile) {
  const e = encodeText;
  const notes = profile.patches.filter(note => note.slot === skill.slot);
  const confirmed = confirmedSkillChanges(notes);
  const basis = skill.shownLevel ? '图鉴 Lv.' + skill.shownLevel : '图鉴展示值，等级未标';
  const effect = skill.fact ? '<p><small>'+e(notes.length?'技能作用':basis+' · '+profile.date)+'</small><br>'+e(skill.fact)+'</p>' : '';
  const effects = Object.entries(skill.effects||{}).map(([status, text]) =>
    '<p><b>'+e(status)+'</b>　'+e(text)+'</p>').join('');
  const levels = skill.levels?.length ? '<p class="note">'+e(skill.levelSource)+'</p>'+levelTable(skill.levels) :
    '<p class="note">当前来源未列逐级强化数值。</p>';
  return '<article class="hero-skill"><h5><b>'+e(skill.slot)+'</b>　'+e(skill.name)+
    (skill.cooldown>0&&!notes.length?' <small>图鉴冷却 '+e(String(skill.cooldown))+' 回合</small>':'')+'</h5><div class="hero-skill-body">'+
    effect+confirmed+effects+levels+(skill.warning?'<p class="note">'+e(skill.warning)+'</p>':'')+'</div></article>';
}

function showSkillProfile(profile) {
  if (!profile) return '<p class="note">该形态的技能资料尚待核实。</p>';
  const focus = profile.focus;
  const skills = profile.skills;
  const slots = new Set(skills.map(s => s.slot));
  const other = profile.patches.filter(note => !slots.has(note.slot));
  let html = '<h4>技能与升级</h4>';
  if (focus) html += '<p class="skill-focus"><b>先练什么</b>　'+encodeText(focus.advice)+
    (focus.source?' <a href="'+encodeText(focus.source)+'" target="_blank" rel="noopener">'+encodeText(focus.date||'')+' 加点出处 ↗</a>':'')+'</p>';
  html += '<p class="note">'+encodeText(profile.scope)+'</p>'+skills.map(skill=>skillCard(skill,profile)).join('');
  if(other.length) html += '<section class="hero-skill"><h5>被动与专属效果</h5>'+confirmedSkillChanges(other)+'</section>';
  if(profile.awake?.length) html += '<section class="hero-skill"><h5>源质觉醒后</h5>'+profile.awake.map(note=>
    '<p><b>'+encodeText(note.slot+' · '+note.name)+'</b>　'+encodeText(note.text)+' <a href="'+encodeText(note.source)+'" target="_blank" rel="noopener">觉醒面板 ↗</a></p>').join('')+'</section>';
  if(profile.refs.length) html += '<div class="skill-sources">'+skillRefs(profile.refs)+'</div>';
  return html;
}

function fetchSkillBook() {
  if (!skillsRequest) {
    skillsRequest = fetch(heroSkillsUrl).then(response => {
      if (!response.ok) throw new Error('Skill data unavailable');
      return response.json();
    }).then(book => { skillsBook = book; return book; }).catch(error => {
      skillsRequest = undefined;
      throw error;
    });
  }
  return skillsRequest;
}

function loadVisibleSkills() {
  const element = document.querySelector('[data-skill-for]');
  if (!element) return;
  const name = element.dataset.skillFor;
  const update = (html) => {
    if (element.isConnected && element.dataset.skillFor === name) element.innerHTML = html;
  };
  if (skillsBook) {
    update(showSkillProfile(skillsBook[name]));
    return;
  }
  fetchSkillBook().then(book => update(showSkillProfile(book[name]))).catch(() => {
    update('<h4>技能与升级</h4><p>技能资料加载失败。 <button type="button" data-skill-retry>重新加载</button></p>');
  });
}

function heroSkillPanel(name) {
  const key = pullCanonical(name);
  if (!skillsBook) queueMicrotask(loadVisibleSkills);
  return '<section class="hero-skills" data-skill-for="'+encodeText(key)+'">'+
    (skillsBook ? showSkillProfile(skillsBook[key]) : '<h4>技能与升级</h4><p class="note">正在读取技能资料…</p>')+'</section>';
}

document.addEventListener('click', event => {
  if (event.target.closest('[data-skill-retry]')) loadVisibleSkills();
});
