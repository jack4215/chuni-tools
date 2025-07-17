## honor url JS-bookmark

```js
javascript:(function(){const honors=document.querySelectorAll('.player_honor_short');const results=[];honors.forEach(el=>{const bg=el.style.backgroundImage;const name=el.querySelector('.player_honor_text span')?.innerText||'(unknown)';results.push(`${name}\n${bg}`);});alert(results.join('\n'));})();

```