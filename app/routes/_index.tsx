import type { MetaFunction, LinksFunction } from '@remix-run/node';
import styles from '~/styles.css?url';
import { ActionFunction, json } from '@remix-run/node';
import { Form } from '@remix-run/react';

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

  console.log(word); // This will log to the server console

  return json({ success: true });
};

export default function Index() {
  return (
    <div className='container'>
      <h1 className='title'>Thesaurus</h1>
      <p>Enter a word to find synonyms:</p>
      <Form method='post'>
        <input
          name='word'
          type='text'
          className='inputField'
          placeholder='Type a word...'
        />
      </Form>
    </div>
  );
}
