import type { MetaFunction, LinksFunction } from '@remix-run/node';
import styles from '~/styles.css?url';
import { ActionFunction, json } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { findSynonyms } from '~/utils/openai';

interface ActionData {
  synonyms?: string;
  error?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Thesaurus' },
    { name: 'description', content: 'I can help you find similar words.' },
  ];
};
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const word = formData.get('word');

  if (typeof word === 'string') {
    console.log('word:', word);
    try {
      const synonymsResponse = await findSynonyms(word);
      return json({ synonyms: synonymsResponse.message.content });
    } catch (error) {
      console.error(error);
      return json({ error: 'Failed to fetch synonyms' }, { status: 500 });
    }
  }
  return json({ error: 'No word provided' }, { status: 400 });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  return (
    <div className='container'>
      <h1 className='title'>Thesaurus</h1>
      <p className='message'>Enter a word to find synonyms:</p>
      <div id='form_container'>
        <Form method='post'>
          <input
            name='word'
            type='text'
            className='inputField'
            placeholder='Type a word...'
          />
        </Form>
      </div>
      {actionData?.synonyms && (
        <div>
          <h2>Synonyms:</h2>
          <p>{actionData.synonyms}</p>
        </div>
      )}
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
    </div>
  );
}
