import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnalysisResult from './components/Analysis/AnalysisResult'
import Header from './components/Layout/Header'
import ImageUploader from './components/ImageUpload/ImageUploader'
import ChatInterface from './components/Chat/ChatInterface'

function App() {
  const { darkMode, language } = useSelector((state) => state.app)
  const { analysisResult } = useSelector((state) => state.image)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        
        {/* استخدام Header المكون */}
        <Header />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          {/* Image Upload Section */}
          <ImageUploader />
          
          {/* Chat Section */}
          <ChatInterface />
        </div>

        {/* Analysis Result */}
        {analysisResult && <AnalysisResult />}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: 'fa-pills',
              title: language === 'ar' ? 'تحليل الأدوية' : 'Medication Analysis',
              description: language === 'ar'
                ? 'تعرف على الدواء من صورته واستعلم عن استخداماته وآثاره الجانبية'
                : 'Identify medications from images and learn about uses and side effects'
            },
            {
              icon: 'fa-x-ray',
              title: language === 'ar' ? 'تحليل الأشعة' : 'X-ray Analysis',
              description: language === 'ar'
                ? 'قم بتحليل صور الأشعة الطبية للحصول على تقييم أولي'
                : 'Analyze medical X-ray images for preliminary assessment'
            },
            {
              icon: 'fa-diagnoses',
              title: language === 'ar' ? 'تشخيص مساعد' : 'Assisted Diagnosis',
              description: language === 'ar'
                ? 'اطرح أعراضك واحصل على معلومات عن الأسباب المحتملة'
                : 'Describe your symptoms and get information about possible causes'
            },
            {
              icon: 'fa-language',
              title: language === 'ar' ? 'دعم اللغات' : 'Multi-language',
              description: language === 'ar'
                ? 'تفاعل مع التطبيق باللغة العربية أو الإنجليزية'
                : 'Interact with the app in Arabic or English'
            }
          ].map((feature, index) => (
            <div key={index} className={`card text-center hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <i className={`fas ${feature.icon} text-blue-500 text-4xl mb-4 block`}></i>
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App