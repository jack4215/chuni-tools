async function displayFriendIdx() {
    const friendForms = document.querySelectorAll(".friend_btn_block form");
    const idxInput = friendForms[0].querySelector("input[name='idx']");
    const resultText = idxInput.value.trim();

    const userChoice = confirm(`Friend Code：${resultText}\n是否複製？Copy?`);
    if (userChoice) {
        setTimeout(async () => {
            try {
                await navigator.clipboard.writeText(resultText);
            } catch (err) {
                alert(`Error：${err.message}`);
            }
        }, 0);
    }
}
displayFriendIdx();
