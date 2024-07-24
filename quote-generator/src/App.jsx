import { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'

function App() {

  const api_list = [
    {
      name: 'Quotable',
      url: 'https://api.quotable.io/quotes/random'
    },
    {
      name: 'Kanye Quotes',
      url: 'https://api.kanye.rest/'
    },
    {
      name: 'Trump Quotes',
      url: 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
    },
    {
      name: 'South Park',
      url: 'https://southparkquotes.onrender.com/v1/quotes'
    },
    {
      name: 'Lucifer',
      url: 'https://lucifer-quotes.vercel.app/api/quotes'
    },
    {
      name: 'Quotes API',
      url: 'https://quotes-api-self.vercel.app/quote'
    },
    {
      name: 'The Simpsons',
      url: 'https://thesimpsonsquoteapi.glitch.me/quotes'
    },
    {
      name: 'Breaking Bad',
      url: 'https://api.breakingbadquotes.xyz/v1/quotes'
    },
    {
      name: 'Game of Thrones',
      url: 'https://api.gameofthronesquotes.xyz/v1/random'
    },
    {
      name: 'Ron Swanson Quotes',
      url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
    },
    {
      name: 'Programming Quotes',
      url: 'https://programming-quotesapi.vercel.app/api/random'
    },
    // {
    //   name: 'Video Game Quotes',
    //   url: 'https://ultima.rest/api/random'
    // },
    {
      name: 'Britney Spears Quotes',
      url: 'https://api.britney.rest/'
    }
  ];

  const colors = [
    'hsla(0, 69%, 52%, 0.84)',
    'hsla(39, 69%, 52%, 0.84)',
    'hsla(57, 69%, 52%, 0.84)',
    'hsla(120, 69%, 52%, 0.84)',
    'hsla(231, 69%, 52%, 0.84)',
    'hsla(273, 69%, 52%, 0.84)',
    'hsla(300, 69%, 52%, 0.84)'
  ];


  const [color, setColor] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [show, setShow] = useState('');


  const fetchQuote = () => {
    let randomColor = Math.floor(Math.random() * colors.length);
    let newColor = colors[randomColor];

    let randomIndex = Math.floor(Math.random() * api_list.length);

    let api = api_list[randomIndex];
    
    fetch(api.url)
      .then(response => response.json())
      .then(data => {
        let quoteText, quoteAuthor, showName = '';
        let apiName = api.name.toLowerCase();

        if (apiName.includes('britney spears')) {
          quoteText = data;
          quoteAuthor = 'Britney Spears';
          
        } else if (apiName.includes('kanye')) {
          quoteText = data.quote;
          quoteAuthor = 'Ye';
          
        } else if (apiName.includes('trump')) {
          quoteText = data.message;
          quoteAuthor = 'Donald Trump';

        } else if (apiName.includes('quotable')) {
          quoteText = data[0].content;
          quoteAuthor = data[0].author;

        } else if (apiName.includes('ron swanson')) {
          quoteText = data[0];
          quoteAuthor = 'Ron Swanson';
          showName = 'Parks and Recreation';

        } else if (apiName.includes('south park')) {
          quoteText = data[0].quote;
          quoteAuthor = data[0].character;
          showName = 'South Park';

        } else if (apiName.includes('lucifer')) {
          quoteText = data[0].quote;
          quoteAuthor = data[0].author;
          showName = 'Lucifer';

        } else if (apiName.includes('simpsons')) {
          quoteText = data[0].quote;
          quoteAuthor = data[0].character;
          showName = 'The Simpsons';

        } else if (apiName.includes('breaking bad')) {
          quoteText = data[0].quote;
          quoteAuthor = data[0].author;
          showName = 'Breaking Bad';

        } else if (apiName.includes('game of thrones')) {
          quoteText = data.sentence;
          quoteAuthor = data.character.name;
          showName = 'Game of Thrones';

        } else if (apiName.includes('video game')) {
          quoteText = data.quote;
          quoteAuthor = data.character;
          showName = `${data.title}`;

        } else {
          // Default case for other APIs
          quoteText = data.quote || 'Unknown quote';
          quoteAuthor = data.author || 'Unknown author';
        }

        console.log(apiName); // for error checking
        console.log(api.url); // for error checking

        setQuote(quoteText);
        setAuthor(quoteAuthor);
        setShow(showName);
        setColor(newColor);
  
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'color 0.32s ease';
  }, [color]);


  return (
    <div className='container'>

      <article id='quote-box'>

        <div id='quote-text'>
          <i 
          id='quote-left' 
          className="fa fa-quote-left" 
          style={{ color: color, transition: 'color 0.32s ease' }}
          > 
          </i> <span 
          id='text'
          className='fade-in'
          style={{ color: color, transition: 'color 0.32s ease', fontWeight: 'bolder' }}
          >
            {quote}
          </span> <i 
          id='quote-right' 
          className="fa fa-quote-right"
          style={{ color: color, transition: 'color 0.32s ease' }}
          > 
          </i>
        </div>

        <div id='quote-author' style={{ color: color, transition: 'color 0.32s ease' }}>
          - <span 
            id='author'
            className='fade-in'
            style={{ color: color, transition: 'color 0.32s ease' }}
            >
              {author}
              {show && <>, <em>("{show}")</em></>}
            </span>
        </div>

        <div className='button-container'>

          <button 
          id='new-quote' 
          onClick={fetchQuote}
          style={{ backgroundColor: color, transition:  'background-color 0.32s ease' }}
          >
            New Quote
          </button>

          <button 
          id='send-quote'
          style={{ backgroundColor: color, transition:  'background-color 0.32s ease' }}
          >
            <a id='tweet-quote' href='https://twitter.com/intent/tweet' target='_blank'>
              <i className="fa fa-twitter"></i>
            </a>
          </button>

        </div>

      </article>

      <footer style={{ color: 'white' }}>by <a href='https://github.com/kcpatt27'>Kalen Patterson</a>
      </footer>

    </div>
  )
}

export default App
