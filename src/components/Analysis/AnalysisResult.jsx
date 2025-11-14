import { useSelector } from 'react-redux'

const AnalysisResult = () => {
  const { analysisResult } = useSelector((state) => state.image)
  const { language } = useSelector((state) => state.app)

  if (!analysisResult) return null

  return (
    <div className="card mt-6">
      <div className="flex items-center gap-3 mb-4">
        <i className="fas fa-file-medical-alt text-success text-xl"></i>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {language === 'ar' ? 'نتيجة التحليل' : 'Analysis Result'}
        </h2>
      </div>
      
      <div className="bg-success/10 border-l-4 border-success p-4 rounded-lg">
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {analysisResult}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisResult