import { Injectable } from '@nestjs/common';// Import OpenAI API client
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
    
        private  openai: OpenAI; // Declare a private variable to hold the OpenAI client instance

        constructor() {
            this.openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY, // Initialize OpenAI client with API key from environment variabless
            })
        }

        async generateGoals(projectTitle: string, projectDescription: string): Promise<any> {

            const prompt= `Generate 5 short and actionable development goals for a project titled "${projectTitle}" with the following description: "${projectDescription}". Each goal should be concise and specific.`;

            const response= await this.openai.chat.completions.create({    
                model: 'gpt-3.5-turbo',
                messages: [ 
                    {role: 'user', content: prompt} // Send the prompt to the OpenAI API
                ],
            }); // Call the OpenAI API to generate goals

            const goals = response.choices[0].message.content; // Extract the generated goals from the API response
            return goals
            ?.split('\n') // Split the goals by newline character
            .filter(goal => goal.trim() !== '') // Filter out any empty lines
            .map(goal => goal.replace(/^\d+\.\s*/, '').trim()) || [] // Remove numbering and trim whitespace from each goal

        }

}
