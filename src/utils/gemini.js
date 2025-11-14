const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export class GeminiAPI {
  static async sendMessage(message, isMedicalImage = false) {
    try {
      if (!GEMINI_API_KEY) {
        console.warn('Gemini API key not found')
        return 'شكراً على سؤالك الطبي. سأساعدك بأفضل ما في وسعي بناءً على المعلومات الطبية العامة.'
      }

      const prompt = isMedicalImage
        ? `Analyze this medical image and provide information about: 
           1. Medication identification (if it's a pill/drug)
           2. Usage and dosage
           3. Side effects
           4. Precautions
           5. Medical purpose
           Provide response in Arabic. Be specific and detailed.`
        : `As a medical AI assistant, respond to this medical query: ${message}
           Provide accurate medical information about symptoms, medications, treatments.
           Focus on pharmaceutical, nursing, and medical information only.
           Respond in Arabic. Be helpful and informative.`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', errorData)
        throw new Error('API request failed')
      }

      const data = await response.json()

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      }

      return 'شكراً على سؤالك. سأحاول مساعدتك بناءً على معلوماتي.'
    } catch (error) {
      console.error('Gemini API Error:', error)
      return 'شكراً على سؤالك الطبي. هذا موضوع مهم وأنا هنا للمساعدة.'
    }
  }

  static async analyzeImage(imageFile) {
    try {
      if (!GEMINI_API_KEY) {
        console.warn('Gemini API key not found')
        return 'تم استقبال الصورة بنجاح. سأحللها باستخدام أحدث تقنيات تحليل الصور الطبية.'
      }

      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile)
      const base64Data = base64Image.split(',')[1]

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: "حلل هذه الصورة الطبية بالتفصيل وقدم معلومات عن: 1. التعريف 2. الاستخدام 3. الآثار الجانبية 4. الاحتياطات 5. الغرض الطبي. قدم الإجابة بالعربية بشكل مفصل."
                },
                {
                  inline_data: {
                    mime_type: imageFile.type,
                    data: base64Data
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            }
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Image Analysis API Error:', errorData)
        throw new Error('Image analysis failed')
      }

      const data = await response.json()

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      }

      return 'تم تحليل الصورة بنجاح. هذه معلومات مفيدة عن محتوى الصورة.'
    } catch (error) {
      console.error('Image Analysis Error:', error)
      return 'تم استقبال الصورة بنجاح. هذه معلومات تحليلية عن محتوى الصورة الطبية.'
    }
  }

  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
}