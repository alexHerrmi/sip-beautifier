import '../src/popup.scss';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('main-form__beautify')
    .addEventListener('click', () => {
      const orderedObject = {};

      const iframe = document.getElementById('sandbox');
      window.addEventListener('message', (event) => {
        console.log(event.data);
        let arrOfLines = event.data.split('\r\n').filter((e) => e.length > 0);
        arrOfLines.map((e) => {
          let key = e.substring(0, e.indexOf(':'));
          orderedObject[key] = e.substring(e.indexOf(':') + 1, e.length);
        });
        console.log(arrOfLines);

        const existingChild = document.getElementsByClassName('text-box')[0];
        if (existingChild)
          document.getElementById('render').removeChild(existingChild);

        const contentDiv = document.getElementById('render');
        const wholeTextDiv = document.createElement('div');
        wholeTextDiv.classList.add('text-box');
        contentDiv.style.display = 'block';

        Object.keys(orderedObject).forEach((e) => {
          const newFieldDiv = document.createElement('div');
          newFieldDiv.classList.add('newFieldDiv');
          const keySpan = document.createElement('span');
          keySpan.classList.add('keySpan');

          const valueSpan = document.createElement('span');
          valueSpan.classList.add('valueSpan');

          keySpan.innerText = e + ':';
          valueSpan.innerText = orderedObject[e];

          newFieldDiv.appendChild(keySpan);
          newFieldDiv.appendChild(valueSpan);
          wholeTextDiv.appendChild(newFieldDiv);
        });

        contentDiv.appendChild(wholeTextDiv);
      });

      const sipInvite = document.getElementById('main-form__input').value;
      iframe.contentWindow.postMessage("'" + sipInvite + "'", '*');
    });

  document.getElementById('copyToClipboard').addEventListener('click', () => {
    document.getElementById('copiedSpan').classList.add('clipboardFade');
    setTimeout(() => {
      document.getElementById('copiedSpan').classList.remove('clipboardFade');
    }, 1000);

    let textToCopy = '';
    document.querySelectorAll('.newFieldDiv').forEach((e) => {
      textToCopy += e.textContent + '\n';
    });
    let result = navigator.clipboard.writeText(textToCopy);
  });
});
