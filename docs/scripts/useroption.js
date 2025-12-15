(function () {
  if (!confirm("Update CHUNITHM User Option?")) return;
  const token = document.querySelector('input[name="token"]')?.value;
  if (!token) {
    alert("Cannot find token.");
    return;
  }
  const options = {
    optionSet: 3,
    speed: 34,
    mirrorFumen: 0,
    trackSkip: 0,
    playTimingOffset: 19,
    judgeTimingOffset: 5,
    matching: 2,
    playerLevel: 1,
    rating: 1,
    categoryDetail: 1,
    guideSound: 10,
    successTapTimbre: 3,
    soundEffect: 11,
    successTap: 10,
    successExTap: 4,
    successSlideHold: 0,
    successAir: 0,
    successFlick: 0,
    successSkill: 0,
    judgeAppendSe: 0,
    judgePos: 1,
    judgeCritical: 2,
    judgeJustice: 1,
    judgeAttack: 1,
    guideLine: 2,
    fieldColor: 0,
    fieldWallPosition: 1,
    bgInfo: 3
  };
  const form = document.createElement("form");
  form.method = "POST";
  form.action =
    "https://chunithm-net-eng.com/mobile/home/userOption/updateUserOption/update/";
  Object.entries(options).forEach(([key, value]) => {
    form.appendChild(
      Object.assign(document.createElement("input"), {
        type: "hidden",
        name: key,
        value: value
      })
    );
  });
  form.appendChild(
    Object.assign(document.createElement("input"), {
      type: "hidden",
      name: "token",
      value: token
    })
  );
  document.body.appendChild(form);
  form.submit();
})();
