// import { Injectable } from '@nestjs/common';// Import OpenAI API client
// import OpenAI from 'openai';

// @Injectable()
// export class OpenaiService {
    
//         private  openai: OpenAI; // Declare a private variable to hold the OpenAI client instance

//         constructor() {
//             this.openai = new OpenAI({
//                 apiKey: process.env.OPENAI_API_KEY, // Initialize OpenAI client with API key from environment variabless
//             })
//         }

//         async generateGoals(projectTitle: string, projectDescription: string): Promise<any> {

//             const prompt= `Generate 5 short and actionable development goals for a project titled "${projectTitle}" with the following description: "${projectDescription}". Each goal should be concise and specific.`;

//             const response= await this.openai.chat.completions.create({    
//                 model: 'gpt-3.5-turbo',
//                 messages: [ 
//                     {role: 'user', content: prompt} // Send the prompt to the OpenAI API
//                 ],
//             }); // Call the OpenAI API to generate goals

//             const goals = response.choices[0].message.content; // Extract the generated goals from the API response
//             return goals
//             ?.split('\n') // Split the goals by newline character
//             .filter(goal => goal.trim() !== '') // Filter out any empty lines
//             .map(goal => goal.replace(/^\d+\.\s*/, '').trim()) || [] // Remove numbering and trim whitespace from each goal

//         }

// }

//Groq service code
// src/groq/groq.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GroqService { 
  private readonly API_KEY = process.env.GROQ_API_KEY;

  async generateGoals(title: string, description: string): Promise<any> {
    const prompt = `
Return exactly a JSON array of 5 goals for a project titled "${title}" with this description: "${description}".

Each goal must be an object with "title" and "description" fields only.

Example:
[
  {
    "title": "Improve UI/UX",
    "description": "Redesign the interface to enhance user experience."
  },
  ...
]

Respond with only the JSON array. Do not include any extra explanation or text.
`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let raw = response.data.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      throw new BadRequestException('Empty response from AI');
    }

    // Try to isolate the JSON content
    const firstBracket = raw.indexOf('[');
    const lastBracket = raw.lastIndexOf(']');
    if (firstBracket === -1 || lastBracket === -1) {
      throw new BadRequestException('Invalid format: JSON array not found');
    }

    const jsonText = raw.slice(firstBracket, lastBracket + 1);

    try {
      return JSON.parse(jsonText);
    } catch (err) {
      console.error('❌ Failed to parse JSON:\n', jsonText);
      throw new BadRequestException('AI returned invalid JSON');
    }
 
    //   ?.split('\n')
    //   .filter(g => g.trim())
    //   .map(g => g.replace(/^\d+\.\s*/, '').trim());
  }
}
