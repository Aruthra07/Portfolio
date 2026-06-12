const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'CertVault.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update images
content = content.replace(/image:\s*'\/poftfolio images\/(.*?)'/g, "image: import.meta.env.BASE_URL + 'poftfolio images/$1'");

// Update links
content = content.replace(/link:\s*'https:\/\/drive\.google\.com\/file\/d\/1L8xuoN8dVhhzxFm3b7bDjfFQGKXBkDj-\/view'/, "link: import.meta.env.BASE_URL + 'poftfolio images/AWS_Cert.pdf'");
content = content.replace(/link:\s*'https:\/\/drive\.google\.com\/file\/d\/1RH_zjvVQDkDaGCOUnpq28PO7KlWgYfk4\/view'/, "link: import.meta.env.BASE_URL + 'poftfolio images/Snowflake_Cert.pdf'");
content = content.replace(/link:\s*'https:\/\/drive\.google\.com\/file\/d\/1Ohqh3oWiKBrpl9dsy0NavxYIuNbCQciA\/view'/, "link: import.meta.env.BASE_URL + 'poftfolio images/Salesforce_Cert.pdf'");
content = content.replace(/link:\s*'https:\/\/drive\.google\.com\/file\/d\/1xje33FYZ4tHF8cH-fS92ILkwheV9xu9O\/view'/, "link: import.meta.env.BASE_URL + 'poftfolio images/ServiceNow_Cert.pdf'");
content = content.replace(/link:\s*'https:\/\/drive\.google\.com\/file\/d\/1qLRRkv32_hn_U-KghWkgFvaoaCX3qfF-\/view'/g, "link: import.meta.env.BASE_URL + 'poftfolio images/Oracle_Cert.pdf'"); // This matches two of them, the second one should be oracle/eCertificate.pdf, but let's just make both Oracle_Cert for now or I can fix the second one
content = content.replace(/link:\s*'https:\/\/www\.linkedin\.com\/posts\/aruthra-sm_cybersecurity-digitalforensics-memoryforensics-activity-7311772796945055745-MYl9'/, "link: import.meta.env.BASE_URL + 'poftfolio images/Bootcamp.pdf'");

// Specifically fix the GenAI one which had the same drive link
content = content.replace(/credentialId:\s*'OCI-GENAI-PRO-1102'/g, "credentialId: 'OCI-GENAI-PRO-1102'"); // Wait, the replace above replaced BOTH Oracle links with Oracle_Cert.pdf. Let's fix the second one.
// We'll leave it as Oracle_Cert.pdf or we can just replace it specifically.
content = content.replace(/link:\s*import\.meta\.env\.BASE_URL \+ 'poftfolio images\/Oracle_Cert\.pdf',\s*credentialId:\s*'OCI-GENAI-PRO-1102'/g, "link: import.meta.env.BASE_URL + 'poftfolio images/oracle/eCertificate.pdf',\n    credentialId: 'OCI-GENAI-PRO-1102'");

fs.writeFileSync(filePath, content);
console.log('Fixed CertVault.tsx');
