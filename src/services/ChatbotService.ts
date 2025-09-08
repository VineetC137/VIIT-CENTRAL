import { GoogleGenerativeAI } from '@google/generative-ai';

// Use environment variable or a secure method to store API key
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

const genAI = new GoogleGenerativeAI(API_KEY);

const VIT_KNOWLEDGE_BASE = `
You are an AI-powered educational assistant chatbot for Vishwakarma Institute of Technology (VIT Pune) and Vishwakarma Institute of Information Technology (VIIT Pune). 
Your purpose is to guide students, parents, and visitors with clear, accurate, and verified information about the college.

Knowledge Base Scope:
- College Introduction & History: VIT established in 1983, autonomous engineering institute affiliated with SPPU, managed by BRACT, focus on employability and industry alignment
- Academic Programs: 
  * UG (B.Tech): Computer Engg (720), CSE AI (360), CSE AI&ML (360), CSE Data Science (180), IT (360), E&TC (360), Mechanical (360), Civil (120), Chemical (60), etc.
  * Total UG intake: ~3,720
  * PG: M.Tech, MBA, MCA programs
  * PhD: Research programs across all engineering disciplines
- Admissions: MHT-CET (state quota), JEE Main (All-India), DSE (lateral entry), Institute quota, NRI/PIO seats
- Cutoffs 2020-2024: Merit ranks for CET, JEE scores in brackets for All-India category
- Fee Structure FY 2024-25:
  * OPEN: ₹192,945 (Tuition: ₹162,608, Development: ₹24,392, others)
  * OBC/EBC/EWS: ₹111,641
  * SC/ST: ₹5,945
  * TFWS: ₹30,337
- Departments: Computer, IT, E&TC, Mechanical, Civil, Chemical, Instrumentation with respective HODs and labs
- Placements AY 2024-25: Highest 45 LPA, Median 9.5 LPA, 86.3% placement rate
- Top recruiters: Amazon, NVIDIA, Tata Technologies, Infosys, TCS, Microsoft, etc.
- Infrastructure: Modern labs, library, hostels, sports facilities, Wi-Fi campus
- Student Life: Technical/cultural fests (Melange, Vishwacon), clubs (Robotics, E-Cell, NSS), hackathons
- Accreditations: NAAC, NBA (select programs), AICTE approved
- Official websites: https://www.vit.edu/ and https://www.viit.ac.in/

Response Guidelines:
- Provide structured, conversational answers with tables/bullet points where helpful
- Always mention source (official PDF/website) when quoting data
- For cutoffs: numbers before bracket = CET rank, numbers in brackets = JEE score (All-India)
- For fees: break down tuition, development, exam, misc components
- Include HOD names, emails, department intakes when asked
- If information unavailable, direct to official offices
- Maintain professional, student-friendly tone
- End responses with helpful suggestions or official links

Personality: Helpful, precise, approachable. Encourage students with career guidance and official resources.
`;

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export class ChatbotService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async sendMessage(userMessage: string): Promise<string> {
    try {
      const prompt = `${VIT_KNOWLEDGE_BASE}

User Query: ${userMessage}

Please provide a helpful, accurate response based on the VIT knowledge base. Format your response clearly with proper structure, and include relevant details like fees, cutoffs, contact information, or official links where appropriate.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again or contact the VIT admissions office directly at admissions@vit.edu for immediate assistance.";
    }
  }

  getQuickSuggestions(): string[] {
    return [
      "What are the admission requirements for B.Tech?",
      "Show me the fee structure for 2024-25",
      "What are the cutoffs for Computer Engineering?",
      "Tell me about placement statistics",
      "Which companies visit for campus recruitment?",
      "What are the hostel facilities?",
      "List all departments and their HODs",
      "Information about student clubs and activities",
      "How to apply for scholarships?",
      "Compare VIT with other colleges in Pune"
    ];
  }
}

export const chatbotService = new ChatbotService();