const forbiddenKeywords = ['spam', 'junk', 'block', 'admin', 'info', 'test'];
const forbiddenDomains = ['example.com', 'test.com'];

const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegex = /^(?!.*@outlook\.com$)[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  for (let keyword of forbiddenKeywords) {
    if (email.includes(keyword)) {
      return `${keyword} গ্রহণযোগ্য নয়।`;
    }
  }

  const domain = email.split('@')[1];
  if (forbiddenDomains.includes(domain)) {
    return `${domain} ডেমেনটি গ্রহণযোগ্য নয়।`;
  }

  if (!emailRegex.test(email)) {
    return 'ইমেইলটি বৈধ নয়';
  }

  return '';
};

export { validateEmail };
