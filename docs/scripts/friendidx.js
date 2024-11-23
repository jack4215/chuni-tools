async function displayFriendIdx() {
    const friendForms = document.querySelectorAll(".friend_btn_block form");
    const idxInput = friendForms[0]?.querySelector("input[name='idx']")
    const idxValue = idxInput.value;
    const userChoice = confirm(`Friend Code：${idxValue}\n是否複製？Copy?`);

    if (userChoice) {
        try {
            const resultText = await Promise.resolve(idxValue);
            setTimeout(() => {
                navigator.clipboard.writeText(resultText).catch(err => {
                    alert(`Error：${err.message}`);
                });
            }, 0);
        } catch (err) {
            alert(`Error：${err.message}`);
        }
    }
}
