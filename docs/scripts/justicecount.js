(()=>{
  const MAX=1010000;
  const diffMap={
    musiclevel_basic:'BAS',
    musiclevel_advanced:'ADV',
    musiclevel_expert:'EXP',
    musiclevel_master:'MAS',
    musiclevel_ultimate:'ULT'
  };

  const diffImg=document.querySelector('.course_musicdata_title_block .course_musicdata_diff img');
  if(!diffImg){alert('Error');return;}
  const diffKey=(diffImg.src.match(/musiclevel_(\w+)\.png/i)||[])[1];
  const diff=diffMap['musiclevel_'+(diffKey||'').toLowerCase()];
  if(!diff){alert('Error');return;}

  const titleBox=document.querySelector('.course_musicdata_title_block .course_musicdata_title_text');
  if(!titleBox){alert('Error');return;}
  const clone=titleBox.cloneNode(true);
  const star=clone.querySelector('.course_musiclist_we_star');
  if(star) star.remove();
  const title=(clone.textContent||'').trim();
  if(!title){alert('Error');return;}

  const parseScore=s=>parseInt(String(s).replace(/[^\d]/g,''),10)||0;
  const ensureStyleOnce=()=>{
    if(document.getElementById('rank-justice-style'))return;
    const style=document.createElement('style');
    style.id='rank-justice-style';
    style.textContent=`
      .rank_block_date_wrapper {
        position: relative;
      }
      .rank_block_justice {
        position: absolute;
        left: 3px;
        top: -4px;
        font-size: small;
        color: #ff8645;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);
  };

  const url='https://chuni.tsaibee.org/data/song-const/notes.json';
  fetch(url,{cache:'no-store'}).then(r=>{
    if(!r.ok)throw new Error('Could not load json.');
    return r.json();
  }).then(list=>{
    const song=(list||[]).find(x=>x&&x.title===title&&x.diff===diff);
    if(!song){alert(`Unknown song：${title}/${diff}`);return;}
    const notes=Number(song.notes)||0;
    if(!notes){alert('Unknown notes');return;}

    const hs=document.querySelector('.rank_playdata_highscore');
    if(hs && !document.querySelector('.rank_playdata_totalnotes')){
      const tn=document.createElement('div');
      tn.className='rank_playdata_highscore';
      tn.innerHTML=`<span class="font_75">TOTAL NOTES：</span><span class="text_b">${notes}</span>`;
      hs.parentNode.insertBefore(tn, hs.nextSibling);
    }
    ensureStyleOnce();

    document.querySelectorAll('.rank_block_text').forEach(block=>{
    const scoreEl=block.querySelector('.rank_score_block .rank_block_num');
    let dateEl=block.querySelector('.rank_block_date, .rank_block_date_new');
    if(!scoreEl)return;

    const score=parseScore(scoreEl.textContent);
    const justice=Math.floor(((MAX-score)*notes)/10000+1e-9);

    let wrapper;
    if(dateEl){
      if(!dateEl.parentElement.classList.contains('rank_block_date_wrapper')){
        wrapper=document.createElement('div');
        wrapper.className='rank_block_date_wrapper';
        dateEl.parentNode.insertBefore(wrapper,dateEl);
        wrapper.appendChild(dateEl);
      }else{
        wrapper=dateEl.parentElement;
      }
    }else{
      const scoreBlock=block.querySelector('.rank_score_block');
      if(!scoreBlock)return;
      if(!scoreBlock.parentElement.classList.contains('rank_block_date_wrapper')){
        wrapper=document.createElement('div');
        wrapper.className='rank_block_date_wrapper';
        scoreBlock.parentNode.insertBefore(wrapper,scoreBlock.nextSibling);
      }else{
        wrapper=scoreBlock.parentElement;
      }
    }

    let jEl=wrapper.querySelector('.rank_block_justice');
    if(justice<50){
      if(!jEl){
        jEl=document.createElement('span');
        jEl.className='rank_block_justice';
        wrapper.appendChild(jEl);
      }
      jEl.textContent=`Justice : ${Math.max(justice,0)}`;
      jEl.style.display="inline";
    }else{
      if(jEl) jEl.style.display="none";
    }
  });
  }).catch(err=>{
    console.error(err);
  });
})();