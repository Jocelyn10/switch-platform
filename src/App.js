import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

function App() {
  const [loading, setLoading] = useState(false);
  const [senderMSISDN, setSenderMSISDN] = useState(null);
  const [receiverMSISDN, setReceiverMSISDN] = useState(null);
  const [amount, setAmount] = useState(null);

  const headers = {
    "Content-Type": "application/json"
  };

  const handleClick = () => {
    setLoading(!loading);

    console.log("senderMSISDN : ", senderMSISDN)
    console.log("receiverMSISDN : ", receiverMSISDN)

    axios
      .get(`http://localhost:8080/payment`, {
        headers,
        params: {
          senderMSISDN,
          amount,
          receiverMSISDN
        }
      })
      .then((res) => {
        const request = res.data;
        setAmount('');
        setSenderMSISDN('');
        setReceiverMSISDN('');
        setLoading(false);
        console.log("request : ", request);
      });
  };

  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="tel"
          label="Numero de telephone Beneficiaire"
          variant="outlined"
          value={receiverMSISDN}
          onChange={(e) => setReceiverMSISDN(e.target.value)}
        />
        <TextField
          id="tel"
          label="Numero de telephone"
          variant="outlined"
          value={senderMSISDN}
          onChange={(e) => setSenderMSISDN(e.target.value)}
        />
        <TextField
          id="amount"
          label="Montant"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <LoadingButton
          size="small"
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Send</span>
        </LoadingButton>
      </Box>
    </div>
  );
}

export default App;
