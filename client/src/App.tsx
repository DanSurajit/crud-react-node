import { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  async function getData() {
    const response = await fetch("http://localhost:3001/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getData()
      .then(data => {
        console.log('Received data:', data);
        setJsonData(data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!jsonData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{JSON.stringify(jsonData.message)}</h1>
    </div>
  );
}

export default App;
