async function displayFriendIdx() {
    const friendForms = document.querySelectorAll(".friend_btn_block form");
    const idxInput = friendForms[0].querySelector("input[name='idx']");
    const resultText = idxInput.value.trim();
    const userChoice = confirm(`Friend Code：${resultText}\n是否複製？Copy?`);
    if (userChoice) {
        if (navigator.clipboard && navigator.clipboard.write) {
            try {
                const blob = new Blob([resultText], { type: "text/plain" });
                const clipboardItem = new ClipboardItem({ "text/plain": blob });
                await navigator.clipboard.write([clipboardItem]);
            } catch (err) {
                alert(`Error：${err.message}`);
            }
        } else {
            const tempInput = document.createElement("textarea");
            tempInput.value = resultText;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand("copy");
            } catch (err) {
                alert(`Error：${err.message}`);
            }
            document.body.removeChild(tempInput);
        }
    }
}
displayFriendIdx();
