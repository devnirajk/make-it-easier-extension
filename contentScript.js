
const root = document.createElement('div');

document.body.appendChild(designDiv(root));


async function callGemini(text) {
    const prompt = `Please make it simple & beginner friendly: ${text}? Please generate only simple text NO special characters like **, \n. just simple text and be precise under 150 words.`;

    const response = await fetch("http://localhost:8082/generate", {
        method: "POST",
        body: JSON.stringify({prompt: prompt}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    const data = await response.json();
    return data;
}

// Initial text
root.innerText = "AI will make it easy for you!!!";


// Detect mouseup event for text selection
// When mouse will be released method will be called
document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {

        copyToClipboard(selectedText);
    }
});




function designDiv(element) {
    element.style.position = "fixed";
    element.style.bottom = "10px";
    element.style.right = "10px";
    element.style.backgroundColor = "#7b35b8";
    element.style.padding = "10px";
    element.style.color = "white";
    element.style.borderRadius = "8px";
    element.style.fontFamily = "sans-serif";
    element.style.fontSize = "smaller";
    element.style.maxHeight = "200px";
    element.style.maxWidth = "200px";
    element.style.overflowY = "auto"; 
    element.style.overflowX = "hidden"; 
    return element;
}

function copyToClipboard(text) {
    root.innerText = "Fetching...";
    navigator.clipboard.writeText(text)
        .then(() => navigator.clipboard.readText())
        .then((data) => {
            return callGemini(data);  
        })
        .then((response) => {
            const message = response.message || "";
            root.innerHTML = "";
            const newContent = document.createElement('div');
            newContent.innerHTML = message; 
            root.appendChild(newContent); 
            designDiv(root);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}
