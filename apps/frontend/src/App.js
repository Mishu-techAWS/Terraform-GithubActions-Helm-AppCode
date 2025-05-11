import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@material-ui/core';
import axios from 'axios';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      await axios.post('/api/vote', { candidateId });
      fetchCandidates();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Voting Application
      </Typography>
      <Grid container spacing={3}>
        {candidates.map((candidate) => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {candidate.name}
                </Typography>
                <Typography color="textSecondary">
                  Votes: {candidate.votes}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleVote(candidate.id)}
                  style={{ marginTop: '1rem' }}
                >
                  Vote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App; 