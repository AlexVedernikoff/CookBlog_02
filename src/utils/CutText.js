function cutText(text) {
    let changedText;
    if (text.length > 100) {
        changedText = text.split('').slice(0, 20);
        changedText = `${changedText.join('')}...`;
        return changedText;
    } else return text;
}

export default cutText;