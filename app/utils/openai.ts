import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  role: 'system' | 'user';
  content: string;
}

export async function findSynonyms(word: string) {
  const messages: Message[] = [
    {
      role: 'system',
      content:
        'You are a thesaurus. Help me find similar words / phrases / synonyms for the words or phrases that I provide. Return a comma seperated list of words / phrases.',
    },
    {
      role: 'user',
      content: word, // Make sure to use the word parameter here
    },
  ];
  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0]);
    return completion.choices[0];
  } catch (error) {
    console.error('Failed to find synonyms:', error);
    throw new Error('Error while fetching synonyms');
  }
}
