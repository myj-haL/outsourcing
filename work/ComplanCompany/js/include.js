document.addEventListener("DOMContentLoaded", function () {
    const includeElements = document.querySelectorAll("[data-include-path]");
  
    includeElements.forEach(el => {
      const includePath = el.getAttribute("data-include-path");
  
      if (includePath) {
        fetch(includePath)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to load ${includePath}: ${response.status}`);
            }
            return response.text();
          })
          .then(data => {
            el.innerHTML = data;
  
            // 동적으로 로드된 콘텐츠 내 스크립트 실행
            const scripts = el.querySelectorAll("script");
            scripts.forEach(script => {
              const newScript = document.createElement("script");
              if (script.src) {
                // 외부 스크립트(src가 있는 경우)
                newScript.src = script.src;
              } else {
                // 인라인 스크립트
                newScript.textContent = script.textContent;
              }
              document.body.appendChild(newScript);
              document.body.removeChild(newScript); // 실행 후 제거
            });
          })
          .catch(err => {
            console.error(err);
            el.innerHTML = `<p>Failed to load content from ${includePath}</p>`;
          });
      }
    });
    
  });
  