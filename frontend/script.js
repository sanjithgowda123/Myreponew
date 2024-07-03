document.getElementById('dataForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const enteredText = document.getElementById('enteredText').value;

  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, enteredText }),
    });

    if (response.ok) {
      alert('Data inserted successfully');
    } else {
      alert('Error inserting data');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error');
  }
});
