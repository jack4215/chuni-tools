function displayFriendIdx() {
    const friendForms = document.querySelectorAll(".friend_btn_block form");
    const idxInput = friendForms[0].querySelector("input[name='idx']");
    const idxValue = idxInput.value;
    const userChoice = confirm(`Friend Code：${idxValue}\n是否複製？`);
    if (userChoice) {
        try {
            const tempTextarea = document.createElement("textarea");
            tempTextarea.value = idxValue;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
        } catch (err) {
            alert(err.message);
        }
    }
}
displayFriendIdx();
