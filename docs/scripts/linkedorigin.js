( function(){
  if(!confirm("Change to Linked GATE ORIGIN target songs?")) return;

  const token = document.querySelector('input[name="token"]')?.value;
  if(!token){
    alert("Cannot find token.");
    return;
  }

  const idx = "9999";
  const musics = [
  "100","151","65","75","63","80","140","152","71","59",
  "82","51","70","101","53","108","69","148","107","76",
  "105","147","74","64","163","180","67","95","141","79"];

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://chunithm-net-eng.com/mobile/home/favorite/updateMusic/set";

  form.appendChild(Object.assign(document.createElement("input"), {
    type:"hidden", name:"idx", value:idx
  }));

  musics.forEach(m => {
    form.appendChild(Object.assign(document.createElement("input"), {
      type:"hidden", name:"music[]", value:m
    }));
  });

  form.appendChild(Object.assign(document.createElement("input"), {
    type:"hidden", name:"token", value:token
  }));

  document.body.appendChild(form);
  form.submit();
})();
