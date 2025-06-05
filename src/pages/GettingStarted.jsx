import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Book, HelpCircle, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import * as documentationService from '../services/api/documentationService';
import Title from '../components/atoms/Title';
import Text from '../components/atoms/Text';
import Card from '../components/atoms/Card';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';

export default function GettingStarted() {
  const [gettingStarted, setGettingStarted] = useState(null);
  const [faq, setFAQ] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState('what-is-apper');

  useEffect(() => {
    const loadDocumentation = async () => {
      setLoading(true);
      try {
        const [gettingStartedData, faqData, tipsData] = await Promise.all([
          documentationService.getGettingStarted(),
          documentationService.getFAQ(),
          documentationService.getTips()
        ]);
        
        setGettingStarted(gettingStartedData);
        setFAQ(faqData);
        setTips(tipsData);
      } catch (error) {
        toast.error('Failed to load documentation');
        console.error('Error loading documentation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocumentation();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const results = await documentationService.searchDocumentation(query);
      setSearchResults(results);
    } catch (error) {
      toast.error('Search failed');
      console.error('Search error:', error);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayData = searchResults || { gettingStarted, faq, tips };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <Text className="text-gray-600 mt-4">Loading documentation...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Title level="h1" className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
            Getting Started Guide
          </Title>
          <Text className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to start your learning journey with Apper Academy
          </Text>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="pl-10 w-full"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <Title level="h3" className="text-lg font-semibold mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-primary" />
                Quick Navigation
              </Title>
              <nav className="space-y-2">
                {displayData.gettingStarted?.sections?.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('faq')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'faq'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('tips')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'tips'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Learning Tips
                </button>
              </nav>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Getting Started Sections */}
            {displayData.gettingStarted?.sections?.map((section, index) => (
              <Card key={section.id} id={section.id} className="scroll-mt-8">
                <Title level="h2" className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </Title>
                <Text className="text-gray-700 mb-6 leading-relaxed">
                  {section.content}
                </Text>

                {/* Highlights */}
                {section.highlights && (
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {section.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                          <Text className="text-gray-700">{highlight}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Steps */}
                {section.steps && (
                  <div className="space-y-4">
                    {section.steps.map((step) => (
                      <div key={step.step} className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                          {step.step}
                        </div>
                        <div>
                          <Title level="h4" className="text-lg font-semibold text-gray-900 mb-2">
                            {step.title}
                          </Title>
                          <Text className="text-gray-700">{step.description}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Features */}
                {section.features && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">{feature.icon}</span>
                          <Title level="h4" className="text-lg font-semibold text-gray-900">
                            {feature.name}
                          </Title>
                        </div>
                        <Text className="text-gray-700 mb-3">{feature.description}</Text>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Text className="text-sm font-medium text-blue-800 mb-1">How to use:</Text>
                          <Text className="text-sm text-blue-700">{feature.howToUse}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation Tips */}
                {section.navigationTips && (
                  <div className="space-y-4">
                    {section.navigationTips.map((tip, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <Title level="h4" className="text-lg font-semibold text-gray-900 mb-2">
                          {tip.area}
                        </Title>
                        <Text className="text-gray-700">{tip.description}</Text>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}

            {/* FAQ Section */}
            <Card id="faq" className="scroll-mt-8">
              <Title level="h2" className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 mr-3 text-primary" />
                Frequently Asked Questions
              </Title>
              <div className="space-y-4">
                {(displayData.faq || []).map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <Text className="font-medium text-gray-900">{item.question}</Text>
                      {expandedFAQ === item.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4"
                      >
                        <Text className="text-gray-700 leading-relaxed">{item.answer}</Text>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Tips */}
            <Card id="tips" className="scroll-mt-8">
              <Title level="h2" className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-accent" />
                Learning Tips for Success
              </Title>
              <div className="grid md:grid-cols-2 gap-6">
                {(displayData.tips || []).map((tip) => (
                  <div key={tip.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
                    <Title level="h4" className="text-lg font-semibold text-gray-900 mb-3">
                      {tip.title}
                    </Title>
                    <Text className="text-gray-700 leading-relaxed">{tip.description}</Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* Call to Action */}
            <Card className="text-center bg-gradient-to-r from-primary to-primary-dark text-white">
              <Title level="h3" className="text-2xl font-bold text-white mb-4">
                Ready to Start Learning?
              </Title>
              <Text className="text-blue-100 mb-6">
                Now that you know how everything works, it's time to dive in and start your learning journey!
              </Text>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Go to Lessons
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}