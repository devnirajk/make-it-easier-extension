
const root = document.createElement('div');


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

    // Set maximum height and enable scrolling
    element.style.maxHeight = "fitContent"; // Adjust height as needed
    element.style.maxWidth = "200px";
    element.style.overflowY = "auto"; // Enable vertical scrolling
    element.style.overflowX = "hidden"; // Hide horizontal scrolling
    return element;
}


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


function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => navigator.clipboard.readText())
        .then((data) => {
            return callGemini(data);  // Return the promise from callGemini
        })
        .then((response) => {
            const text = response;
            const parser = new DOMParser();
            const doc = parser.parseFromString(text.message, "text/html");
            const newBody = doc.body;
            root.appendChild(designDiv(newBody));
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}


// Detect mouseup event for text selection
// When mouse will be released method will be called
document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {

        copyToClipboard(selectedText);
    }
});