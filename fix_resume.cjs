const fs = require('fs');
const path = require('path');

const replaceResumeLink = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/href="https:\/\/drive\.google\.com\/file\/d\/1RN87HSbJbbLVsGDfqpd0RxK0JllZZrYx\/view"/g, 'href={import.meta.env.BASE_URL + "poftfolio images/Updated_Resume.pdf"}');
    fs.writeFileSync(filePath, content);
};

replaceResumeLink(path.join(__dirname, 'src', 'components', 'Navbar.tsx'));
replaceResumeLink(path.join(__dirname, 'src', 'components', 'Hero.tsx'));
console.log('Fixed Resume links');
