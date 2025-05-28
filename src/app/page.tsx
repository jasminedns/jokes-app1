'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import '@/app/globals.css';
import { JokesType } from '@/utils/types';
import { useState, useEffect } from 'react';

export default function Home() {
  const [joke, setJoke] = useState<JokesType | null>(null)
  const [hasSavedJoke, setHasSavedJoke] = useState<boolean>(false);
  const [isShowingSavedJoke, setIsShowingSavedJoke] = useState<boolean>(false);
    
  useEffect(() => {
    const savedJoke = localStorage.getItem('joke');
    if (savedJoke) {
      setHasSavedJoke(true);
    }
  }, []);

  const fetchJoke = async ():Promise<void> => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();

      const jokeData:JokesType = {
        setup: data.setup,
        punchline: data.punchline
      }

      setJoke(jokeData);
      setIsShowingSavedJoke(false);

    } catch (error) {
      console.log(`Ooops! Something went wrong: ${error}`)
    }
  }

  const saveJoke = () => {
    if (joke) {
      localStorage.setItem('savedJoke', JSON.stringify(joke));
      setHasSavedJoke(true);
    }
  }
  const loadSavedJoke = () => {
    const savedJoke:string | null = localStorage.getItem('savedJoke');
    if (savedJoke) {
      setJoke(JSON.parse(savedJoke))
      setIsShowingSavedJoke(true);
    }
  }

  return (
    <main>
      <Box sx={{ width: '50%' }}>
        <Card variant="soft">
          <CardContent>
            <Typography level="title-md" textAlign="center">
              {joke ? joke.setup : "Click the button to get a joke!"}
            </Typography>
            <Typography textAlign="center">
              {joke ? joke.punchline : "C'mon you know you want it"}
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', m: 4 }}>
          <Button size="md" onClick={fetchJoke} sx={{ backgroundColor: '#EDC9AF', color: 'black', minWidth: '108px' }}>
            Get joke
          </Button>
          {joke && !isShowingSavedJoke &&
            <Button size="md" onClick={saveJoke} sx={{ backgroundColor: '#EDC9AF', color: 'black', minWidth: '108px' }}>
              Save
            </Button>
          }
          {hasSavedJoke && !isShowingSavedJoke && 
            <Button size="md" onClick={loadSavedJoke} sx={{ backgroundColor: '#EDC9AF', color: 'black', minWidth: '108px' }}>
              Saved Joke
            </Button>
          }
        </Box>
      </Box>
    </main>
  );
}
