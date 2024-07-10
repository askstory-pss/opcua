const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/bcr_list', async (req, res) => {
    const modelId = req.body.modelId;

    let test_data = {
        "bcr_list": [
            {
                "BCR": "E1TE77A422461901",
                "CODE": "1",
                "id": 1
            },
            {
                "BCR": "E1TE77A422461401",
                "CODE": "1",
                "id": 2
            },
            {
                "BCR": "E1TE77A412461002",
                "CODE": "1",
                "id": 3
            },
            {
                "BCR": "E1TE77A412461001",
                "CODE": "1",
                "id": 4
            }
        ]
    
    }
    try{
        res.status(200).send(test_data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

const PORT = process.env.PORT || 3333;
const HOST = '0.0.0.0'
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}.`);
});