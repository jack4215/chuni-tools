function displayFriendIdx() {
    const friendForms = document.querySelectorAll(".friend_btn_block form");
    const idxInput = friendForms[0].querySelector("input[name='idx']");
    const idxValue = idxInput.value;
    const userChoice = confirm(`Friend Code：${idxValue}\n是否複製？Copy?`);
    if (userChoice) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(idxValue).catch(err => {
                alert(err.message);
            });
        } else {
            try {
                const tempTextarea = document.createElement("textarea");
                tempTextarea.value = idxValue;
                document.body.appendChild(tempTextarea);
                tempTextarea.select();
                const successful = document.execCommand("copy");
                document.body.removeChild(tempTextarea);
                if (!successful) throw new Error("Error");
            } catch (err) {
                alert(err.message);
            }
        }
    }
}
displayFriendIdx();
