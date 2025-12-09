document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    const pre = codeBlock.parentNode;
    
    // Wrap pre in a container with a class
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";
    wrapper.style.position = "relative";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    
    // Create button
    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.innerText = "Copy";
    
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(codeBlock.textContent).then(() => {
        button.innerText = "Copied!";
        setTimeout(() => {
          button.innerText = "Copy";
        }, 1500);
      }).catch(() => {
        button.innerText = "Error";
      });
    });
    
    // Append button to wrapper
    wrapper.appendChild(button);
  });
});
