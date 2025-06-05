import documentationData from '../mockData/documentation.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getGettingStarted = async () => {
  await delay(300);
  return { ...documentationData.gettingStarted };
};

export const getFAQ = async () => {
  await delay(200);
  return [...documentationData.faq];
};

export const getTips = async () => {
  await delay(250);
  return [...documentationData.tips];
};

export const searchDocumentation = async (query) => {
  await delay(400);
  if (!query || query.trim() === '') {
    return {
      gettingStarted: { ...documentationData.gettingStarted },
      faq: [...documentationData.faq],
      tips: [...documentationData.tips]
    };
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Search FAQ
  const filteredFAQ = documentationData.faq.filter(item => 
    item.question.toLowerCase().includes(searchTerm) ||
    item.answer.toLowerCase().includes(searchTerm)
  );

  // Search Tips
  const filteredTips = documentationData.tips.filter(tip =>
    tip.title.toLowerCase().includes(searchTerm) ||
    tip.description.toLowerCase().includes(searchTerm)
  );

  // Search Getting Started sections
  const filteredSections = documentationData.gettingStarted.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm) ||
    section.content.toLowerCase().includes(searchTerm) ||
    (section.features && section.features.some(feature => 
      feature.name.toLowerCase().includes(searchTerm) ||
      feature.description.toLowerCase().includes(searchTerm)
    ))
  );

  return {
    gettingStarted: {
      ...documentationData.gettingStarted,
      sections: filteredSections
    },
    faq: filteredFAQ,
    tips: filteredTips
  };
};

export const getSectionById = async (sectionId) => {
  await delay(200);
  const section = documentationData.gettingStarted.sections.find(s => s.id === sectionId);
  return section ? { ...section } : null;
};